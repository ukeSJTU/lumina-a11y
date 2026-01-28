# Tests

## E2E Regression Runner (Playwright + Mock Gemini)

This project ships a Playwright-based runner that automatically exercises every example page, triggers the extension, and validates that missing labels are repaired. All Gemini calls are mocked so results are stable and reproducible.

### Prerequisites

- Node.js 18+
- Playwright browsers (first-time install)

### Install

```bash
cd tests/e2e
npm install
npx playwright install
```

### Run

```bash
# Default run (headed Chromium, mock Gemini)
node run.mjs

# Headless (if your environment supports extensions in headless mode)
HEADLESS=1 node run.mjs

# Verbose logging (writes artifacts/e2e/<run>/run.log)
node run.mjs --verbose
```

Or from the repo root:

```bash
just e2e
just e2e-verbose
```

### Options

```bash
node run.mjs --examples icon-only-buttons,spa-async-content
node run.mjs --port 5510
node run.mjs --artifacts ./artifacts/e2e
node run.mjs --config ./tests/e2e/scenarios.json
node run.mjs --capture-interval 1500
```

### Browser Overrides

If the bundled Chromium cannot launch, point the runner at an installed browser:

```bash
E2E_CHANNEL=chrome node run.mjs
E2E_CHROME_PATH="/usr/bin/google-chrome" node run.mjs
```

### Capture Throttling

The default capture interval is 1500ms. If Chrome enforces capture quotas, increase the interval between fixes:

```bash
E2E_CAPTURE_INTERVAL_MS=1500 node run.mjs
```

### Output

Each run produces a timestamped folder under `artifacts/e2e/`:

- `issues-before.json` / `issues-after.json`
- `prompt.txt` / `labels.json`
- `before.png` / `after.png`
- `result.json` per scenario
- `report.json` summary

### Notes

- The runner uses the extension background service worker to trigger scans/fixes.
- Gemini calls are intercepted and replaced with deterministic labels derived from the prompt.
- Scenario actions live in `tests/e2e/scenarios.json`.
- If the environment blocks local ports, the runner falls back to a routed host (`http://webilluminator.test`) without binding a socket.
