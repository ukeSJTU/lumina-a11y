const MODEL_NAME = 'gemini-2.5-flash';
const API_BASE = 'https://jp.duckcoding.com';
// const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const CAPTURE_DELAY_MS = 150;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[Background] Received message:', message.type, message);
  if (message.type === 'scan-active-tab') {
    handleScanOnly()
      .then(() => sendResponse({ ok: true }))
      .catch((error) => {
        console.error('Scan failed:', error);
        sendResponse({ ok: false, error: error.message || 'Scan failed' });
      });
    return true;
  }

  if (message.type === 'fix-active-tab') {
    handleFixRequest()
      .then(() => sendResponse({ ok: true }))
      .catch((error) => {
        console.error('Fix failed:', error);
        sendResponse({ ok: false, error: error.message || 'Fix failed' });
      });
    return true;
  }

  console.log('[Background] Ignoring non-scan message');
});

async function handleScanOnly() {
  console.log('[Background] Starting scan-only request handler');
  const activeTab = await getActiveTab();
  const scanResult = await ensureContentMessage(activeTab.id, { type: 'scan-start' });
  if (!scanResult || !scanResult.ok) {
    console.error('[Background] Scan failed:', scanResult);
    throw new Error(scanResult && scanResult.error ? scanResult.error : 'Scan failed.');
  }
  console.log('[Background] Scan preview complete, found', scanResult.mapping?.count, 'elements');
}

async function handleFixRequest() {
  console.log('[Background] Starting fix request handler');
  const { apiKey } = await chrome.storage.local.get(['apiKey']);
  if (!apiKey) {
    console.error('[Background] No API key found in storage');
    throw new Error('Missing API key.');
  }
  console.log('[Background] API key found');

  const activeTab = await getActiveTab();
  const mapping = await getOrCreateScanMapping(activeTab.id);
  console.log('[Background] Fix mapping ready, found', mapping?.count ?? 0, 'elements');

  await delay(CAPTURE_DELAY_MS);
  console.log('[Background] Capturing screenshot after', CAPTURE_DELAY_MS, 'ms delay');

  const screenshotUrl = await chrome.tabs.captureVisibleTab(activeTab.windowId, { format: 'png' });
  const base64Image = screenshotUrl.replace(/^data:image\/png;base64,/, '');
  console.log('[Background] Screenshot captured, size:', base64Image.length, 'chars');

  const geminiResponse = await requestGemini(apiKey, base64Image, mapping);
  console.log('[Background] Gemini raw response:', geminiResponse.rawResponse);
  console.log('[Background] Gemini raw text:', geminiResponse.rawText);

  const labels = extractLabels(geminiResponse.rawText);
  console.log('[Background] Extracted labels:', labels);
  console.log('[Background] Sending labels to content script...');
  await chrome.tabs.sendMessage(activeTab.id, {
    type: 'apply-labels',
    rawText: geminiResponse.rawText,
    labels
  });
}

async function getActiveTab() {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log('[Background] Active tab:', activeTab ? `id=${activeTab.id}, url=${activeTab.url}` : 'none');
  if (!activeTab || typeof activeTab.id !== 'number') {
    console.error('[Background] No active tab found or invalid tab ID');
    throw new Error('No active tab found.');
  }
  return activeTab;
}

async function getOrCreateScanMapping(tabId) {
  const existing = await ensureContentMessage(tabId, { type: 'scan-get' });
  if (existing && existing.ok && existing.mapping && Array.isArray(existing.mapping.items)) {
    console.log('[Background] Using existing scan mapping');
    return existing.mapping;
  }

  console.log('[Background] No prior scan mapping found; auto-scanning before repair.');
  const scanResult = await ensureContentMessage(tabId, { type: 'scan-start' });
  if (!scanResult || !scanResult.ok) {
    console.error('[Background] Scan failed:', scanResult);
    throw new Error(scanResult && scanResult.error ? scanResult.error : 'Scan failed.');
  }
  return scanResult.mapping;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestGemini(apiKey, base64Image, mapping) {
  console.log('[Background] Requesting Gemini API...');
  const endpoint = buildEndpoint(apiKey);
  console.log('[Background] Endpoint:', endpoint);
  const prompt = buildPrompt(mapping);
  console.log('[Background] Prompt:', prompt);

  const body = {
    contents: [
      {
        role: 'user',
        parts: [
          { text: prompt },
          {
            inline_data: {
              mime_type: 'image/png',
              data: base64Image
            }
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 512
    }
  };

  console.log('[Background] Sending fetch request to Gemini...');
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  console.log('[Background] Fetch response status:', response.status, response.statusText);
  const responseText = await response.text();
  console.log('[Background] Response text length:', responseText.length);
  if (!response.ok) {
    console.error('[Background] Gemini request failed:', response.status, trimResponse(responseText));
    throw new Error(`Gemini error ${response.status}: ${trimResponse(responseText)}`);
  }

  let rawResponse;
  try {
    rawResponse = JSON.parse(responseText);
    console.log('[Background] Successfully parsed Gemini JSON response');
  } catch (error) {
    console.error('[Background] Failed to parse Gemini response as JSON:', error);
    throw new Error(`Gemini returned non-JSON response: ${trimResponse(responseText)}`);
  }
  const rawText = extractResponseText(rawResponse);
  console.log('[Background] Extracted text from response, length:', rawText?.length || 0);

  return { rawResponse, rawText };
}

async function sendContentMessage(tabId, message) {
  console.log('[Background] Sending message to tab', tabId, message.type);
  try {
    const result = await chrome.tabs.sendMessage(tabId, message);
    console.log('[Background] Message response:', result);
    return result;
  } catch (error) {
    console.log('[Background] Message error:', error.message);
    if (isNoReceiverError(error)) {
      console.log('[Background] No receiver found (content script not loaded)');
      return null;
    }
    console.error('[Background] Unexpected message error:', error);
    throw error;
  }
}

async function ensureContentMessage(tabId, message) {
  let result = await sendContentMessage(tabId, message);
  if (result === null) {
    console.log('[Background] Content script not present, injecting...');
    await injectContentScript(tabId);
    console.log('[Background] Content script injected, retrying message...');
    result = await sendContentMessage(tabId, message);
  }
  return result;
}

async function injectContentScript(tabId) {
  console.log('[Background] Injecting content script into tab', tabId);
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ['content.js']
    });
    console.log('[Background] Content script injection successful');
  } catch (error) {
    console.error('[Background] Content script injection failed:', error);
    throw error;
  }
}

function buildEndpoint(apiKey) {
  const baseUrl = new URL(API_BASE);
  let basePath = baseUrl.pathname.replace(/\/+$/, '');
  if (!basePath || basePath === '/') {
    basePath = '/v1beta/models';
  }
  baseUrl.pathname = `${basePath}/${MODEL_NAME}:generateContent`;
  baseUrl.search = '';
  baseUrl.searchParams.set('key', apiKey);
  return baseUrl.toString();
}

function trimResponse(text) {
  const trimmed = text ? text.trim() : '';
  if (!trimmed) {
    return '(empty response)';
  }
  if (trimmed.length > 500) {
    return `${trimmed.slice(0, 500)}...`;
  }
  return trimmed;
}

function isNoReceiverError(error) {
  if (!error || !error.message) {
    return false;
  }
  return /receiving end does not exist|could not establish connection/i.test(error.message);
}

function buildPrompt(mapping) {
  const header = [
    'You are labeling UI controls and images marked with numeric overlays in the screenshot.',
    'Return a JSON object mapping each id to a short accessible label.',
    'For images, provide concise alt text.',
    'Use only the ids provided. Respond with JSON only, no markdown or commentary.'
  ].join('\n');

  const lines = mapping.items
    .map((item) => `#${item.id}: ${item.description}`)
    .join('\n');

  return `${header}\n\nElements:\n${lines}`;
}

function extractResponseText(rawResponse) {
  const parts = rawResponse?.candidates?.[0]?.content?.parts || [];
  return parts.map((part) => part.text || '').join('');
}

function extractLabels(text) {
  console.log('[Background] Extracting labels from text, length:', text?.length || 0);
  if (!text) {
    console.log('[Background] No text to extract labels from');
    return {};
  }

  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    console.warn('[Background] No JSON object found in text');
    return {};
  }
  console.log('[Background] Found JSON match:', match[0]);

  try {
    const parsed = JSON.parse(match[0]);
    console.log('[Background] Parsed JSON:', parsed);
    if (Array.isArray(parsed)) {
      return parsed.reduce((acc, item) => {
        if (!item || item.id == null || !item.label) {
          return acc;
        }
        acc[String(item.id)] = String(item.label).trim();
        return acc;
      }, {});
    }
    return Object.entries(parsed).reduce((acc, [key, value]) => {
      if (!value) {
        return acc;
      }
      acc[String(key)] = String(value).trim();
      return acc;
    }, {});
  } catch (error) {
    console.warn('Failed to parse Gemini response JSON:', error);
    return {};
  }
}
