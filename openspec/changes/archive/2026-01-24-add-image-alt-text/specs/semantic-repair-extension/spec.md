## MODIFIED Requirements
### Requirement: Overlay visual IDs
The content script SHALL identify interactive elements missing accessible names and `<img>` elements missing an `alt` attribute, excluding images that are decorative (`alt=""` or `role="presentation"`) or hidden from accessibility (`aria-hidden="true"`), and overlay temporary visual IDs that map to those elements for snapshot analysis.

#### Scenario: Overlay IDs appear on unlabeled elements
- **WHEN** a page contains unlabeled interactive elements or images missing alt text
- **THEN** each such element receives a visible numeric overlay ID

#### Scenario: Decorative or hidden images are ignored
- **WHEN** an image has `alt=""`, `role="presentation"`, or `aria-hidden="true"`
- **THEN** no overlay ID is added for that image
