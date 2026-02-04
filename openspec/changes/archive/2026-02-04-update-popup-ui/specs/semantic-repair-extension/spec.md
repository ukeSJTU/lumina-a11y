## MODIFIED Requirements
### Requirement: Scan trigger
The extension SHALL provide separate Scan and Fix actions in the popup. Scan SHALL overlay visual IDs for unlabeled elements without applying labels. Fix SHALL run a semantic repair pass on the active tab and SHALL use the most recent scan mapping when available. If no prior scan mapping exists, Fix SHALL initiate a scan before repairing labels and log a console message indicating it is auto-scanning before repair. The popup SHALL present action buttons with a clear hierarchy, with Fix as the primary action and Scan as a secondary action. The popup SHALL include a slim accent header band above the main content. The popup SHALL place Save adjacent to the API key input and group the API key entry, actions, and status into distinct sections with consistent spacing.

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
- **THEN** the API key entry appears in its own section with Save adjacent to the input
- **AND** a slim accent header band is visible above the content
- **AND** Fix is visually emphasized as the primary action
- **AND** Scan is presented as a secondary action nearby
- **AND** the status message area is visible without shifting layout
