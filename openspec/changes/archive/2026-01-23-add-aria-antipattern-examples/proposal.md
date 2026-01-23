# Change: Add ARIA Anti-Pattern Example Pages

## Why
The extension needs multiple, focused demo pages that reproduce common ARIA anti-patterns so fixes can be tested and showcased consistently.

## What Changes
- Add three self-contained example pages under `examples/`, each in its own subfolder and each demonstrating a distinct ARIA anti-pattern.
- Add a `just` recipe to serve a selected example folder via a local HTTP server.

## Impact
- Affected specs: `demonstrate-aria-antipatterns` (new)
- Affected code/docs: `examples/` (new content), `justfile` (new recipe). The README currently references a single `examples/index.html`.
