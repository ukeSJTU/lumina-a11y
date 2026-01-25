## MODIFIED Requirements
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
