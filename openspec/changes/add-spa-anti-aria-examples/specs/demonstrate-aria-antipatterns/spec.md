## ADDED Requirements
### Requirement: SPA anti-pattern example pages
The project SHALL include three SPA-style example pages under `examples/` that simulate common single-page app behaviors:
- `spa-route-navigation` using the History API to swap views without full page reloads,
- `spa-async-content` that renders new content asynchronously after initial load,
- `spa-infinite-scroll` that appends content during scrolling or virtualized list updates.

Each SPA example SHALL include icon-only interactive controls lacking accessible names and at least one image missing `alt` text within the dynamically rendered content.

#### Scenario: Review the SPA examples directory
- **WHEN** a developer lists the contents of `examples/`
- **THEN** the three SPA example folders are present

#### Scenario: Trigger SPA behaviors
- **WHEN** a developer opens each SPA example and triggers its dynamic behavior (navigation, async load, or scrolling)
- **THEN** the page reveals icon-only controls and images missing `alt` in the dynamic content
