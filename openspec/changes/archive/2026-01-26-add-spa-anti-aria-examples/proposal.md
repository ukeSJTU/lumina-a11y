# Change: Add SPA anti-ARIA example pages

## Why
Single-page apps introduce dynamic DOM updates that can hide unlabeled elements from one-time scans. Concrete SPA examples make these gaps visible and provide consistent test pages for verifying WebIlluminator behavior.

## What Changes
- Add three SPA-style example pages under `examples/` that simulate route changes, async content updates, and infinite scroll.
- Ensure each SPA example includes icon-only controls and images missing `alt` text in dynamic content.
- Update example documentation to list the new SPA pages and how to exercise them.
- Add a spec requirement for SPA anti-pattern examples.

## Impact
- Affected specs: `demonstrate-aria-antipatterns`
- Affected code/docs: `examples/`, `examples/README.md`, `README.md`
