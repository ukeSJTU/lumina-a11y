const overlayState = {
  overlays: [],
  idToElement: new Map()
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[Content] Received message:', message.type);
  if (message.type === 'scan-start') {
    console.log('[Content] Starting scan...');
    const mapping = runScan();
    console.log('[Content] Scan complete, found', mapping.count, 'elements');
    sendResponse({ ok: true, mapping });
    return;
  }

  if (message.type === 'apply-labels') {
    console.log('[Content] Applying labels:', message.labels);
    if (message.rawText) {
      console.log('[Content] Gemini response:', message.rawText);
    }
    applyLabels(message.labels || {});
    console.log('[Content] Labels applied successfully');
    sendResponse({ ok: true });
  }
});

function runScan() {
  console.log('[Content] Running scan...');
  clearOverlays();

  const candidates = findCandidates();
  console.log('[Content] Found', candidates.length, 'candidate elements');
  const items = [];
  let nextId = 1;

  for (const candidate of candidates) {
    const { element, hostChain } = candidate;
    if (!isVisible(element) || isIgnoredImage(element) || hasAccessibleName(element)) {
      continue;
    }

    const id = nextId++;
    element.setAttribute('data-webilluminator-id', String(id));
    overlayState.idToElement.set(id, element);
    console.log('[Content] Added element', id, ':', element.tagName, buildDescription(element, hostChain));

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
      description: buildDescription(element, hostChain)
    });
  }

  console.log('[Content] Scan complete, returning', items.length, 'items');
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

  const candidates = [];
  const seen = new Set();
  const roots = collectScanRoots();

  roots.forEach(({ root, hostChain }) => {
    const elements = Array.from(root.querySelectorAll(selector));
    elements.forEach((element) => {
      if (seen.has(element) || element.closest('.webilluminator-overlay')) {
        return;
      }
      seen.add(element);
      candidates.push({ element, hostChain });
    });
  });

  return candidates;
}

function collectScanRoots() {
  const roots = [];
  const visited = new Set();

  function walk(root, hostChain) {
    if (!root || visited.has(root)) {
      return;
    }
    visited.add(root);
    roots.push({ root, hostChain });

    const elements = root.querySelectorAll ? root.querySelectorAll('*') : [];
    elements.forEach((element) => {
      if (element.shadowRoot) {
        walk(element.shadowRoot, hostChain.concat(element));
      }
    });
  }

  walk(document, []);
  return roots;
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

function buildDescription(element, hostChain = []) {
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

  const shadowHostPath = buildShadowHostPath(hostChain);
  if (shadowHostPath) {
    parts.push(`shadowHost=${shadowHostPath}`);
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

function buildShadowHostPath(hostChain) {
  if (!hostChain.length) {
    return '';
  }
  return hostChain.map(describeShadowHost).join('>');
}

function describeShadowHost(host) {
  const tag = host.tagName.toLowerCase();
  const id = host.id ? `#${host.id}` : '';
  let classHint = '';
  if (typeof host.className === 'string') {
    const classes = host.className.trim().split(/\s+/).filter(Boolean);
    if (classes.length) {
      classHint = `.${classes[0]}`;
    }
  }
  return `${tag}${id}${classHint}`;
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
  console.log('[Content] Applying', Object.keys(labels).length, 'labels');
  Object.entries(labels).forEach(([id, label]) => {
    const element = overlayState.idToElement.get(Number(id));
    if (!element) {
      console.warn('[Content] Element not found for id:', id);
      return;
    }
    const trimmed = String(label || '').trim();
    if (!trimmed) {
      console.warn('[Content] Empty label for id:', id);
      return;
    }
    if (element.tagName === 'IMG') {
      console.log('[Content] Setting alt text for', id, ':', trimmed);
      element.setAttribute('alt', trimmed);
      return;
    }
    console.log('[Content] Setting aria-label for', id, ':', trimmed);
    element.setAttribute('aria-label', trimmed);
  });

  console.log('[Content] Clearing overlays');
  clearOverlays();
}

function clearOverlays() {
  console.log('[Content] Clearing', overlayState.overlays.length, 'overlays');
  overlayState.overlays.forEach((overlay) => overlay.remove());
  overlayState.overlays = [];
  overlayState.idToElement.clear();

  const roots = collectScanRoots();
  let markerCount = 0;
  roots.forEach(({ root }) => {
    const markedElements = root.querySelectorAll('[data-webilluminator-id]');
    markerCount += markedElements.length;
    markedElements.forEach((element) => {
      element.removeAttribute('data-webilluminator-id');
    });
  });
  console.log('[Content] Removing', markerCount, 'element markers');
}
