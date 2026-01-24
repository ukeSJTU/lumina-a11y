const MODEL_NAME = 'gemini-2.5-flash';
const API_BASE = 'https://jp.duckcoding.com';
// const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const CAPTURE_DELAY_MS = 150;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type !== 'scan-active-tab') {
    return;
  }

  handleScanRequest()
    .then(() => sendResponse({ ok: true }))
    .catch((error) => {
      console.error('Scan failed:', error);
      sendResponse({ ok: false, error: error.message || 'Scan failed' });
    });

  return true;
});

async function handleScanRequest() {
  const { apiKey } = await chrome.storage.local.get(['apiKey']);
  if (!apiKey) {
    throw new Error('Missing API key.');
  }

  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!activeTab || typeof activeTab.id !== 'number') {
    throw new Error('No active tab found.');
  }

  let scanResult = await sendScanMessage(activeTab.id);
  if (!scanResult) {
    await injectContentScript(activeTab.id);
    scanResult = await sendScanMessage(activeTab.id);
  }
  if (!scanResult || !scanResult.ok) {
    throw new Error(scanResult && scanResult.error ? scanResult.error : 'Scan failed.');
  }

  await delay(CAPTURE_DELAY_MS);

  const screenshotUrl = await chrome.tabs.captureVisibleTab(activeTab.windowId, { format: 'png' });
  const base64Image = screenshotUrl.replace(/^data:image\/png;base64,/, '');

  const geminiResponse = await requestGemini(apiKey, base64Image, scanResult.mapping);
  console.log('Gemini raw response:', geminiResponse.rawResponse);

  const labels = extractLabels(geminiResponse.rawText);
  await chrome.tabs.sendMessage(activeTab.id, {
    type: 'apply-labels',
    rawText: geminiResponse.rawText,
    labels
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestGemini(apiKey, base64Image, mapping) {
  const endpoint = buildEndpoint(apiKey);
  const prompt = buildPrompt(mapping);

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

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const responseText = await response.text();
  if (!response.ok) {
    throw new Error(`Gemini error ${response.status}: ${trimResponse(responseText)}`);
  }

  let rawResponse;
  try {
    rawResponse = JSON.parse(responseText);
  } catch (error) {
    throw new Error(`Gemini returned non-JSON response: ${trimResponse(responseText)}`);
  }
  const rawText = extractResponseText(rawResponse);

  return { rawResponse, rawText };
}

async function sendScanMessage(tabId) {
  try {
    return await chrome.tabs.sendMessage(tabId, { type: 'scan-start' });
  } catch (error) {
    if (isNoReceiverError(error)) {
      return null;
    }
    throw error;
  }
}

async function injectContentScript(tabId) {
  await chrome.scripting.executeScript({
    target: { tabId },
    files: ['content.js']
  });
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
  if (!text) {
    return {};
  }

  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    return {};
  }

  try {
    const parsed = JSON.parse(match[0]);
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
