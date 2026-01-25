# demonstrate-aria-antipatterns Specification

## Purpose
TBD - created by archiving change add-aria-antipattern-examples. Update Purpose after archive.
## Requirements
### Requirement: Anti-pattern example pages
The project SHALL include at least four example pages under `examples/`, each demonstrating a single, common accessibility anti-pattern:
- icon-only buttons missing accessible names,
- form fields missing associated labels,
- custom interactive elements without semantic roles or keyboard support,
- images missing alternative text.

#### Scenario: Review the examples directory
- **WHEN** a developer lists the contents of `examples/`
- **THEN** at least four subfolders exist that correspond to the specified anti-patterns

### Requirement: Self-contained example folders
Each example page SHALL be stored in its own subfolder under `examples/` and include an `index.html` with any supporting assets located in the same folder.

#### Scenario: Open an example page directly
- **WHEN** a developer opens `examples/<example>/index.html`
- **THEN** the page renders without relying on assets outside that example folder

### Requirement: Serve examples via just
The project SHALL provide a `just` recipe named `server` that serves a selected example subfolder on port 5500.

#### Scenario: Start a local server for an example
- **WHEN** a developer runs `just server <example-name>`
- **THEN** a local HTTP server starts for `examples/<example-name>` on port 5500

### Requirement: Image alt-text example coverage
The example page that demonstrates images missing alternative text SHALL include:
- at least one `<img>` with no `alt` attribute,
- at least one `<img alt="">` decorative image,
- at least one `<img>` hidden from accessibility with `aria-hidden="true"` or `role="presentation"`.

#### Scenario: Compare labeled vs skipped images
- **WHEN** a developer opens the missing-alt-text example page
- **THEN** the page presents missing-alt, decorative, and hidden images for comparison

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

