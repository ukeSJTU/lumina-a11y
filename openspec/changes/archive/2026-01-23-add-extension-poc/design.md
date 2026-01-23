## Context
WebIlluminator needs a minimal MV3 extension that demonstrates the end-to-end semantic repair workflow without a backend.

## Goals / Non-Goals
- Goals: End-to-end scan, overlay, snapshot, Gemini inference, and ARIA label injection with dev-mode install.
- Non-Goals: Production UX polish, latency optimization, and high label coverage.

## Decisions
- Use the popup for API key entry and a Scan button to trigger the pipeline.
- Use a content script for DOM scanning, overlay rendering, and label injection.
- Use the background service worker for screenshot capture and Gemini API calls.

## Risks / Trade-offs
- `captureVisibleTab` only captures the visible viewport and may miss off-screen elements.
- Overlay IDs are temporary DOM nodes and must avoid affecting page layout or input handling.

## Migration Plan
- None (new capability).

## Open Questions
- Final prompt/schema for Gemini response may evolve as we tune labeling accuracy.
