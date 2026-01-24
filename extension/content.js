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
    if (!isVisible(element) || isIgnoredImage(element) || hasAccessibleName(element)) {
      continue;
    }

    const id = nextId++;
    element.setAttribute('data-webilluminator-id', String(id));
    overlayState.idToElement.set(id, element);

    const rect = element.getBoundingClientRect();
    const badgeOffset = element.tagName === 'IMG' ? { x: 4, y: 4 } : { x: 0, y: 0 };
    const overlay = createBadgeOverlay(id, rect, badgeOffset);
    overlayState.overlays.push(overlay);
    document.body.appendChild(overlay);

    if (element.tagName === 'IMG') {
      const outline = createImageOutline(rect);
      overlayState.overlays.push(outline);
      document.body.appendChild(outline);
    }

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
    'img',
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

function isIgnoredImage(element) {
  if (element.tagName !== 'IMG') {
    return false;
  }

  if (element.getAttribute('alt') === '') {
    return true;
  }

  const role = element.getAttribute('role');
  if (role === 'presentation') {
    return true;
  }

  if (element.getAttribute('aria-hidden') === 'true') {
    return true;
  }

  return false;
}

function hasAccessibleName(element) {
  if (element.hasAttribute('aria-label') || element.hasAttribute('aria-labelledby')) {
    return true;
  }

  if (element.tagName === 'IMG' && element.hasAttribute('alt')) {
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

  if (tag === 'img') {
    const srcHint = getImageSourceHint(element.getAttribute('src'));
    if (srcHint) {
      parts.push(`src=${srcHint}`);
    }
    const title = normalizeText(element.getAttribute('title'), 60);
    if (title) {
      parts.push(`title=${title}`);
    }
    const caption = getImageCaption(element);
    if (caption) {
      parts.push(`caption=${caption}`);
    }
  }

  return parts.join(' ');
}

function getImageSourceHint(src) {
  if (!src) {
    return '';
  }
  if (src.startsWith('data:')) {
    return 'inline-image';
  }
  const trimmed = src.split('#')[0].split('?')[0];
  const segments = trimmed.split('/');
  return segments[segments.length - 1] || '';
}

function getImageCaption(image) {
  const figure = image.closest('figure');
  if (!figure) {
    return '';
  }
  const caption = figure.querySelector('figcaption');
  if (!caption) {
    return '';
  }
  return normalizeText(caption.textContent, 80);
}

function normalizeText(text, maxLength) {
  if (!text) {
    return '';
  }
  const trimmed = text.trim().replace(/\s+/g, ' ');
  if (!trimmed) {
    return '';
  }
  if (trimmed.length <= maxLength) {
    return trimmed;
  }
  return `${trimmed.slice(0, Math.max(0, maxLength - 3))}...`;
}

function createBadgeOverlay(id, rect, offset = { x: 0, y: 0 }) {
  const overlay = document.createElement('div');
  overlay.className = 'webilluminator-overlay';
  overlay.textContent = String(id);
  overlay.setAttribute('aria-hidden', 'true');
  overlay.style.position = 'absolute';
  overlay.style.left = `${Math.max(0, rect.left + window.scrollX + (offset.x || 0))}px`;
  overlay.style.top = `${Math.max(0, rect.top + window.scrollY + (offset.y || 0))}px`;
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

function createImageOutline(rect) {
  const outline = document.createElement('div');
  outline.className = 'webilluminator-overlay webilluminator-outline';
  outline.setAttribute('aria-hidden', 'true');
  outline.style.position = 'absolute';
  outline.style.left = `${Math.max(0, rect.left + window.scrollX)}px`;
  outline.style.top = `${Math.max(0, rect.top + window.scrollY)}px`;
  outline.style.width = `${Math.max(0, rect.width)}px`;
  outline.style.height = `${Math.max(0, rect.height)}px`;
  outline.style.border = '2px solid #38bdf8';
  outline.style.borderRadius = '8px';
  outline.style.boxSizing = 'border-box';
  outline.style.background = 'transparent';
  outline.style.zIndex = '2147483646';
  outline.style.pointerEvents = 'none';
  return outline;
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
