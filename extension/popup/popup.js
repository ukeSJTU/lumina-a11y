const apiKeyInput = document.getElementById('apiKey');
const saveButton = document.getElementById('saveKey');
const scanButton = document.getElementById('scanPage');
const statusEl = document.getElementById('status');

const STATUS_CLEAR_DELAY_MS = 2500;

function setStatus(message) {
  statusEl.textContent = message;
  if (!message) {
    return;
  }
  window.clearTimeout(setStatus.timeoutId);
  setStatus.timeoutId = window.setTimeout(() => {
    statusEl.textContent = '';
  }, STATUS_CLEAR_DELAY_MS);
}

function loadApiKey() {
  console.log('[Popup] Loading API key from storage...');
  chrome.storage.local.get(['apiKey'], (result) => {
    if (chrome.runtime.lastError) {
      console.error('[Popup] Failed to load API key:', chrome.runtime.lastError);
      setStatus('Failed to load key.');
      return;
    }
    console.log('[Popup] API key loaded:', result.apiKey ? '***' + result.apiKey.slice(-4) : 'none');
    apiKeyInput.value = result.apiKey || '';
  });
}

function saveApiKey() {
  const apiKey = apiKeyInput.value.trim();
  console.log('[Popup] Saving API key:', apiKey ? '***' + apiKey.slice(-4) : 'empty');
  chrome.storage.local.set({ apiKey }, () => {
    if (chrome.runtime.lastError) {
      console.error('[Popup] Failed to save API key:', chrome.runtime.lastError);
      setStatus('Failed to save key.');
      return;
    }
    console.log('[Popup] API key saved successfully');
    setStatus('Key saved.');
  });
}

function startScan() {
  console.log('[Popup] Starting scan...');
  setStatus('Starting scan...');
  chrome.runtime.sendMessage({ type: 'scan-active-tab' }, (response) => {
    if (chrome.runtime.lastError) {
      console.error('[Popup] Scan error:', chrome.runtime.lastError);
      setStatus(chrome.runtime.lastError.message || 'Scan failed to start.');
      return;
    }
    console.log('[Popup] Scan response:', response);
    if (!response || !response.ok) {
      console.error('[Popup] Scan failed:', response);
      setStatus(response && response.error ? response.error : 'Scan failed.');
      return;
    }
    console.log('[Popup] Scan completed successfully');
    setStatus('Scan running. Check console logs.');
  });
}

saveButton.addEventListener('click', saveApiKey);
scanButton.addEventListener('click', startScan);

loadApiKey();
