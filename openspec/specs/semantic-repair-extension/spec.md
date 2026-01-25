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
The extension SHALL provide separate Scan and Fix actions in the popup. Scan SHALL overlay visual IDs for unlabeled elements without applying labels. Fix SHALL run a semantic repair pass on the active tab and SHALL use the most recent scan mapping when available. If no prior scan mapping exists, Fix SHALL initiate a scan before repairing labels and log a console message indicating it is auto-scanning before repair. The popup SHALL display Save on its own row, and Scan and Fix as equal-width buttons on a second row.

#### Scenario: User runs Scan preview
- **WHEN** the user clicks Scan in the popup
- **THEN** the active tab overlays visual IDs without applying labels

#### Scenario: User runs Fix directly
- **WHEN** the user clicks Fix in the popup
- **THEN** the extension runs a semantic repair pass
- **AND** the extension uses the most recent scan mapping if available

#### Scenario: Fix auto-scans without prior scan
- **WHEN** the user clicks Fix in the popup without having run Scan
- **THEN** the extension scans the active tab before repairing labels
- **AND** the console logs indicate Fix is auto-scanning before repair

#### Scenario: Popup action layout
- **WHEN** the popup is opened
- **THEN** Save appears on its own row
- **AND** Scan and Fix appear on a second row with equal widths

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

### Requirement: Open Shadow DOM scanning
The content script SHALL include candidate elements inside open shadow roots when generating overlay IDs and mappings. The scan SHALL ignore closed shadow roots.

#### Scenario: Overlay IDs inside open shadow root
- **WHEN** a page contains unlabeled controls or images missing `alt` inside open shadow roots
- **THEN** overlay IDs and mapping entries are created for those elements

#### Scenario: Closed shadow roots are skipped
- **WHEN** a page uses closed shadow roots
- **THEN** elements inside those roots are not scanned or labeled

