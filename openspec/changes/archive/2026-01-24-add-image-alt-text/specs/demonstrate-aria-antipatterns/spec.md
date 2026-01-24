## MODIFIED Requirements
### Requirement: Anti-pattern example pages
The project SHALL include at least four example pages under `examples/`, each demonstrating a single, common accessibility anti-pattern:
- icon-only buttons missing accessible names,
- form fields missing associated labels,
- custom interactive elements without semantic roles or keyboard support,
- images missing alternative text.

#### Scenario: Review the examples directory
- **WHEN** a developer lists the contents of `examples/`
- **THEN** at least four subfolders exist that correspond to the specified anti-patterns

## ADDED Requirements
### Requirement: Image alt-text example coverage
The example page that demonstrates images missing alternative text SHALL include:
- at least one `<img>` with no `alt` attribute,
- at least one `<img alt="">` decorative image,
- at least one `<img>` hidden from accessibility with `aria-hidden="true"` or `role="presentation"`.

#### Scenario: Compare labeled vs skipped images
- **WHEN** a developer opens the missing-alt-text example page
- **THEN** the page presents missing-alt, decorative, and hidden images for comparison
