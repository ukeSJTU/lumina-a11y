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
  chrome.storage.local.get(['apiKey'], (result) => {
    if (chrome.runtime.lastError) {
      setStatus('Failed to load key.');
      return;
    }
    apiKeyInput.value = result.apiKey || '';
  });
}

function saveApiKey() {
  const apiKey = apiKeyInput.value.trim();
  chrome.storage.local.set({ apiKey }, () => {
    if (chrome.runtime.lastError) {
      setStatus('Failed to save key.');
      return;
    }
    setStatus('Key saved.');
  });
}

function startScan() {
  setStatus('Starting scan...');
  chrome.runtime.sendMessage({ type: 'scan-active-tab' }, (response) => {
    if (chrome.runtime.lastError) {
      setStatus(chrome.runtime.lastError.message || 'Scan failed to start.');
      return;
    }
    if (!response || !response.ok) {
      setStatus(response && response.error ? response.error : 'Scan failed.');
      return;
    }
    setStatus('Scan running. Check console logs.');
  });
}

saveButton.addEventListener('click', saveApiKey);
scanButton.addEventListener('click', startScan);

loadApiKey();
