# Project Context

## Purpose
WebIlluminator is a browser extension that repairs accessibility gaps on the modern web. It uses Gemini 3 to infer the meaning of unlabeled UI elements from a visual snapshot, then injects missing ARIA labels (and related attributes) into the DOM to improve screen reader output.

## Tech Stack
- HTML, CSS, vanilla JavaScript
- Chrome Extension (Manifest V3)
- Google Gemini 3.0 Flash via REST API
- Chrome extension APIs (storage, messaging, scripting)

## Project Conventions

### Code Style
- Keep code minimal and dependency-free; prefer small, named functions over large handlers.
- Use `const`/`let`, camelCase for JS identifiers, and kebab-case for filenames.
- DOM mutations should be explicit and limited to adding accessibility attributes.

### Architecture Patterns
- Content script scans the DOM for unlabeled interactive elements and injects accessibility labels.
- Background/service worker handles API calls to Gemini and centralizes secrets.
- Popup UI manages configuration (API key) and triggers scans.
- Components communicate via Chrome message passing; no backend server.

### Testing Strategy
- Manual smoke tests in Chrome using the example "broken" pages.
- Verify `aria-label`/`alt` injection, no functional regressions, and correct key storage.

### Documentation
- For significant feature or code changes, update related docs (README, examples, specs) in the same change.

### Git Workflow
- Use short-lived feature branches when working on non-trivial changes.
- Keep commits small and descriptive; prefer one change per commit.

## Domain Context
- Accessibility domain: ARIA labels/roles, alt text, and screen reader behavior (NVDA, VoiceOver).
- "Semantic repair agent" that augments web pages rather than replacing screen readers.
- Visual Indexing (Set-of-Marks): overlay IDs on elements, capture a snapshot, map Gemini results back to the DOM.

## Important Constraints
- BYOK and privacy-first: no backend, no data collection; snapshots are sent only to Gemini for analysis.
- Must comply with Manifest V3 extension constraints and permissions.
- Avoid breaking page behavior; only add accessibility attributes and keep DOM churn minimal.

## External Dependencies
- Google Gemini API (Gemini 3.0 Flash)
- Chrome/Chromium extension APIs
