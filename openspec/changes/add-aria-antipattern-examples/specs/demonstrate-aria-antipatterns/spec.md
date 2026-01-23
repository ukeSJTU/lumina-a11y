## ADDED Requirements
### Requirement: Anti-pattern example pages
The project SHALL include at least three example pages under `examples/`, each demonstrating a single, common ARIA anti-pattern:
- icon-only buttons missing accessible names,
- form fields missing associated labels,
- custom interactive elements without semantic roles or keyboard support.

#### Scenario: Review the examples directory
- **WHEN** a developer lists the contents of `examples/`
- **THEN** at least three subfolders exist that correspond to the specified anti-patterns

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
