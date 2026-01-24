# semantic-repair-extension Specification

## Purpose
TBD - created by archiving change add-extension-poc. Update Purpose after archive.
## Requirements
### Requirement: Popup API key storage
The extension SHALL allow a user to enter a Gemini API key in the popup and persist it in `chrome.storage.local`. The popup SHALL prefill the stored key when reopened.

#### Scenario: Save and reload API key
- **WHEN** a user enters an API key and reopens the popup
- **THEN** the previously stored key is shown without re-entry

### Requirement: Scan trigger
The extension SHALL provide a popup Scan action that initiates a semantic repair run on the active tab.

#### Scenario: User starts a scan
- **WHEN** the user clicks the Scan action in the popup
- **THEN** the active tab begins a semantic repair run

### Requirement: Overlay visual IDs
The content script SHALL identify interactive elements missing accessible names and `<img>` elements missing an `alt` attribute, excluding images that are decorative (`alt=""` or `role="presentation"`) or hidden from accessibility (`aria-hidden="true"`), and overlay temporary visual IDs that map to those elements for snapshot analysis.

#### Scenario: Overlay IDs appear on unlabeled elements
- **WHEN** a page contains unlabeled interactive elements or images missing alt text
- **THEN** each such element receives a visible numeric overlay ID

#### Scenario: Decorative or hidden images are ignored
- **WHEN** an image has `alt=""`, `role="presentation"`, or `aria-hidden="true"`
- **THEN** no overlay ID is added for that image

### Requirement: Snapshot and model response logging
During a scan, the extension SHALL capture a snapshot of the active tab and send it with the overlay mapping to Gemini. The extension SHALL log the raw model response to the console.

#### Scenario: Debug the model response
- **WHEN** a scan completes model inference
- **THEN** the raw response is available in the extension console logs

### Requirement: Apply inferred labels
After receiving the model response, the extension SHALL apply inferred labels as `aria-label` or `alt` attributes on the mapped elements.

#### Scenario: Labels are injected
- **WHEN** the model response includes labels for overlay IDs
- **THEN** the corresponding elements receive `aria-label` or `alt` values

