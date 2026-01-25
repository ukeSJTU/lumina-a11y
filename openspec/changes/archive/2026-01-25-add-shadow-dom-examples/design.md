## Context
The current scan relies on `document.querySelectorAll`, which does not cross Shadow DOM boundaries. As a result, unlabeled controls and images inside Web Components are missed, weakening accessibility repairs.

## Goals / Non-Goals
- Goals:
  - Include candidate elements inside open shadow roots for overlays and label injection.
  - Provide extra context for model inference when elements live inside Shadow DOM.
  - Keep DOM mutations minimal and avoid breaking page behavior.
- Non-Goals:
  - Do not attempt to access closed shadow roots.
  - Do not alter component internals beyond adding accessibility attributes.
  - Do not introduce new dependencies or background services.

## Decisions
- Decision: Recursively collect open shadow roots by walking the element tree and checking `element.shadowRoot`. For each root (document and shadow root), run the same candidate query and filters.
- Decision: Keep overlays appended to `document.body` and rely on `getBoundingClientRect()` for positioning across shadow roots.
- Decision: When describing elements inside shadow roots, include a shadow-host path (tag/id/class) for each host in the chain, for example `shadowHost=app-shell>toolbar`. This adds structure without dumping full DOM.
- Decision: Skip closed roots by design; no special handling beyond not discovering them.

## Risks / Trade-offs
- Scanning many shadow roots may add overhead; mitigate by reusing the existing selector and avoiding duplicate scans.
- Elements can be dynamic; the scan remains point-in-time, consistent with current behavior.

## Migration Plan
No data migration. Implement within the existing scan flow.

## Open Questions
None.
