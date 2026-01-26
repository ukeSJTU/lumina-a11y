# WebIlluminator Pipeline (Concise)

[Detect missing semantics (DOM + AX heuristics)]
  - Candidate roles: controls + images, incl. open Shadow DOM.
  - Exclude hidden/inert/disabled subtrees and decorative images.
  - Accessible name check: aria-label/labelledby, label/for, title, placeholder/value.
            |
[Context package (attrs + nearby text + structure)]
  - Nearby text: label/legend, aria-describedby, closest headings.
  - Structure: role/landmark chain, list position, parent container hints.
  - State: aria-checked/pressed/expanded/selected, input type.
  - Images: src hint, title, figcaption/longdesc (if present).
  - Length-budgeted, stable field order for prompt consistency.
            |
[SoM overlay + screenshot]
            |
[Gemini step 1: infer intent/type]
            |
[Gemini step 2: generate labels/alt]
            |
[Validate + repair loop]
  - Reject empty/generic/duplicate labels, or mismatched image intent.
            |
[Apply aria-label/alt]
            |
[Cache results + monitor mutations]
  - Fingerprint elements for reuse; re-run on DOM changes.
