# Change: Add extension MVP pipeline

## Why
We need a proof-of-concept that the end-to-end semantic repair loop works inside a dev-mode Chrome extension.

## What Changes
- Add a Manifest V3 extension scaffold (manifest, background service worker, content script, popup UI).
- Provide popup API key storage and a Scan trigger.
- Implement the scan -> overlay -> snapshot -> Gemini request -> console log -> apply ARIA labels pipeline.

## Impact
- Affected specs: semantic-repair-extension (new)
- Affected code: extension/ (new)
