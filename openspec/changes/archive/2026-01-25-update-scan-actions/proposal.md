# Change: Split Scan into Scan and Fix actions

## Why
Users need to preview scan overlays before applying labels and have a dedicated Fix action for the full repair flow.

## What Changes
- Add a Fix action to the popup and separate Scan into a scan-only action.
- Fix reuses the most recent scan mapping; if none exists, it auto-scans before repair and logs a console message to inform developers.
- Adjust popup layout so Save is on its own row, with Scan/Fix on a second row at equal width.

## Impact
- Affected specs: semantic-repair-extension
- Affected code: extension/popup/popup.html, extension/popup/popup.css, extension/popup/popup.js, extension/background.js, extension/content.js
