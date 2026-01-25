## ADDED Requirements
### Requirement: Open Shadow DOM scanning
The content script SHALL include candidate elements inside open shadow roots when generating overlay IDs and mappings. The scan SHALL ignore closed shadow roots.

#### Scenario: Overlay IDs inside open shadow root
- **WHEN** a page contains unlabeled controls or images missing `alt` inside open shadow roots
- **THEN** overlay IDs and mapping entries are created for those elements

#### Scenario: Closed shadow roots are skipped
- **WHEN** a page uses closed shadow roots
- **THEN** elements inside those roots are not scanned or labeled
