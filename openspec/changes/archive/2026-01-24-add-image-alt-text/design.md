## Context
The current overlay marking uses a small numeric badge placed near each unlabeled interactive element. For images, the badge can blend into the artwork or be cropped in screenshots, making it harder for Gemini to associate IDs with images. We also need to avoid labeling decorative or hidden images.

## Goals / Non-Goals
- Goals: detect `<img>` elements missing `alt`, skip decorative/hidden images, and make image IDs clearly visible in screenshots.
- Non-Goals: labeling CSS background images, inline SVGs, or generating long-form captions beyond short alt text.

## Decisions
- Decision: Treat `<img>` as candidates only when the `alt` attribute is absent. Skip images with `alt=""`, `role="presentation"`, or `aria-hidden="true"`.
- Decision: Use a two-part marker for images: a high-contrast numeric badge placed near the top-left corner plus a thin outline overlay around the image bounds. This keeps IDs visible without obscuring key pixels.
- Decision: Extend element descriptions for images with lightweight context (e.g., `src` basename, `title`, or nearby `<figcaption>` text) to improve Gemini labeling accuracy while keeping prompts concise.
- Decision: Keep the response format unchanged (JSON id → label) and reuse the existing label-application path to set `alt` for images.

## Alternatives Considered
- Centered badge overlay only (rejected: covers important image details).
- Large semi-transparent overlay with ID (rejected: obscures the image and reduces model accuracy).
- Outline-only markers (rejected: IDs are harder to read in screenshots).

## Risks / Trade-offs
- Busy images may still reduce badge legibility; the outline mitigates this by clarifying the target bounds.
- Overlay elements must remain non-interactive and avoid layout shifts.

## Migration Plan
- Add the new example page and update documentation to point to it.

## Open Questions
- None.
