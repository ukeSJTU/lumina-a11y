# Change: Update popup UI for usability and polish

## Why
The popup is functional but visually dense and lacks clear hierarchy, which makes key actions harder to scan quickly. A more structured layout and refined styling will improve ease of use without changing core behavior.

## What Changes
- Refresh the popup layout with clear sections (API key, actions, status) and improved spacing/typography.
- Introduce visual hierarchy for actions (Fix as primary, Scan as secondary, Save as utility).
- Keep copy in English while improving clarity and affordances where needed.

## Impact
- Affected specs: semantic-repair-extension (popup layout requirement)
- Affected code: extension/popup/popup.html, extension/popup/popup.css (popup.js only if minor status wiring is needed)
