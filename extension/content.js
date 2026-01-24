const overlayState = {
  overlays: [],
  idToElement: new Map()
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'scan-start') {
    const mapping = runScan();
    sendResponse({ ok: true, mapping });
    return;
  }

  if (message.type === 'apply-labels') {
    if (message.rawText) {
      console.log('Gemini response:', message.rawText);
    }
    applyLabels(message.labels || {});
    sendResponse({ ok: true });
  }
});

function runScan() {
  clearOverlays();

  const candidates = findCandidates();
  const items = [];
  let nextId = 1;

  for (const element of candidates) {
    if (!isVisible(element) || hasAccessibleName(element)) {
      continue;
    }

    const id = nextId++;
    element.setAttribute('data-webilluminator-id', String(id));
    overlayState.idToElement.set(id, element);

    const rect = element.getBoundingClientRect();
    const overlay = createOverlay(id, rect);
    overlayState.overlays.push(overlay);
    document.body.appendChild(overlay);

    items.push({
      id,
      description: buildDescription(element)
    });
  }

  return { items, count: items.length };
}

function findCandidates() {
  const selector = [
    'button',
    'a[href]',
    'input',
    'select',
    'textarea',
    '[role="button"]',
    '[role="link"]',
    '[role="checkbox"]',
    '[role="switch"]',
    '[role="tab"]'
  ].join(',');

  const elements = Array.from(document.querySelectorAll(selector));
  return elements.filter((element) => !element.closest('.webilluminator-overlay'));
}

function isVisible(element) {
  const style = window.getComputedStyle(element);
  if (style.display === 'none' || style.visibility === 'hidden') {
    return false;
  }
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

function hasAccessibleName(element) {
  if (element.hasAttribute('aria-label') || element.hasAttribute('aria-labelledby')) {
    return true;
  }

  if (element.tagName === 'IMG' && element.getAttribute('alt')) {
    return true;
  }

  if (element.labels && element.labels.length > 0) {
    return true;
  }

  const text = element.textContent ? element.textContent.trim() : '';
  if (text) {
    return true;
  }

  if (element.tagName === 'INPUT') {
    const type = (element.getAttribute('type') || '').toLowerCase();
    if (['button', 'submit', 'reset'].includes(type)) {
      return Boolean(element.value && element.value.trim());
    }
  }

  return false;
}

function buildDescription(element) {
  const tag = element.tagName.toLowerCase();
  const parts = [`tag=${tag}`];
  const role = element.getAttribute('role');
  const type = element.getAttribute('type');
  const name = element.getAttribute('name');
  const placeholder = element.getAttribute('placeholder');
  const id = element.id;
  const className = typeof element.className === 'string' ? element.className.trim() : '';

  if (role) {
    parts.push(`role=${role}`);
  }
  if (type) {
    parts.push(`type=${type}`);
  }
  if (name) {
    parts.push(`name=${name}`);
  }
  if (placeholder) {
    parts.push(`placeholder=${placeholder}`);
  }
  if (id) {
    parts.push(`id=${id}`);
  }
  if (className) {
    parts.push(`class=${className.split(/\s+/).slice(0, 3).join(' ')}`);
  }

  return parts.join(' ');
}

function createOverlay(id, rect) {
  const overlay = document.createElement('div');
  overlay.className = 'webilluminator-overlay';
  overlay.textContent = String(id);
  overlay.setAttribute('aria-hidden', 'true');
  overlay.style.position = 'absolute';
  overlay.style.left = `${Math.max(0, rect.left + window.scrollX)}px`;
  overlay.style.top = `${Math.max(0, rect.top + window.scrollY)}px`;
  overlay.style.padding = '2px 6px';
  overlay.style.background = '#0f172a';
  overlay.style.color = '#f8fafc';
  overlay.style.borderRadius = '10px';
  overlay.style.fontSize = '12px';
  overlay.style.fontFamily = 'Arial, sans-serif';
  overlay.style.zIndex = '2147483647';
  overlay.style.pointerEvents = 'none';
  overlay.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.35)';
  return overlay;
}

function applyLabels(labels) {
  Object.entries(labels).forEach(([id, label]) => {
    const element = overlayState.idToElement.get(Number(id));
    if (!element) {
      return;
    }
    const trimmed = String(label || '').trim();
    if (!trimmed) {
      return;
    }
    if (element.tagName === 'IMG') {
      element.setAttribute('alt', trimmed);
      return;
    }
    element.setAttribute('aria-label', trimmed);
  });

  clearOverlays();
}

function clearOverlays() {
  overlayState.overlays.forEach((overlay) => overlay.remove());
  overlayState.overlays = [];
  overlayState.idToElement.clear();

  document.querySelectorAll('[data-webilluminator-id]').forEach((element) => {
    element.removeAttribute('data-webilluminator-id');
  });
}
