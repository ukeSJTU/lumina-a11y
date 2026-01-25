## ADDED Requirements
### Requirement: Shadow DOM example pages
The project SHALL include three example pages under `examples/` that demonstrate accessibility anti-patterns inside open Shadow DOM:
- `web-components-shallow` with a single-level shadow root,
- `web-components-deep` with multiple nested shadow roots,
- `web-components-mixed` that includes both shallow and deep components.

Each example SHALL render icon-only interactive controls lacking accessible names and images missing `alt` text inside open shadow roots.

#### Scenario: Review Shadow DOM example folders
- **WHEN** a developer lists `examples/`
- **THEN** `web-components-shallow`, `web-components-deep`, and `web-components-mixed` are present

#### Scenario: Open a Shadow DOM example page
- **WHEN** a developer opens any `examples/web-components-*/index.html`
- **THEN** the page renders Shadow DOM components with at least one unlabeled control and one image missing `alt` inside open shadow roots
