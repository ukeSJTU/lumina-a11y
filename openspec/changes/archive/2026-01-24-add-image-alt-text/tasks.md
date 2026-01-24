## 1. Implementation
- [x] 1.1 Expand candidate discovery to include `<img>` elements missing `alt`, skipping decorative/hidden images.
- [x] 1.2 Add image-specific overlay marking (badge + outline) without affecting layout or interactivity.
- [x] 1.3 Extend prompt/context building with image details (e.g., `src` basename, `title`, nearby `<figcaption>`).
- [x] 1.4 Apply inferred labels as `alt` for images and keep existing `aria-label` behavior for other elements.
- [x] 1.5 Add a new example page under `examples/` showing missing-alt, decorative (`alt=""`), and hidden images.
- [x] 1.6 Update README to mention the new example page and expected behavior.

## 2. Validation
- [x] 2.1 Manual smoke test the new example page to confirm overlays, `alt` injection, and skip behavior.
- [x] 2.2 Run `openspec validate add-image-alt-text --strict --no-interactive`.
