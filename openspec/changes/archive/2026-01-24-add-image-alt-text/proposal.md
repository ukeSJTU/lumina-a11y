# Change: Add image alt text inference

## Why
Images without alternative text are currently ignored by the scan, leaving screen readers with missing context. Adding image coverage and a demo page makes the feature visible and testable.

## What Changes
- Extend scanning to include `<img>` elements missing `alt`, while skipping decorative or hidden images.
- Improve image marking so numeric overlays remain visible in snapshots for Gemini.
- Add a new example page that contrasts missing-alt images with decorative and hidden images.
- Update prompt/context building to include image-specific details when needed.

## Impact
- Affected specs: `semantic-repair-extension`, `demonstrate-aria-antipatterns`
- Affected code: `extension/content.js`, `extension/background.js`, `examples/<new>`, `README.md`
