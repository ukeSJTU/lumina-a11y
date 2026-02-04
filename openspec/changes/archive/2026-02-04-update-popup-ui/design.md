## Context
The popup UI is utilitarian and visually flat. Improving hierarchy, spacing, and action emphasis will make it easier to use while keeping the existing behavior intact.

## Goals / Non-Goals
- Goals: clearer visual hierarchy, faster scanning of actions, minimal friction to save the API key, consistent styling, accessible contrast.
- Non-Goals: new features, behavior changes to Scan/Fix, new dependencies.

## Decision
Adopt an accent header layout to improve polish while keeping the UI compact.

- Slim accent header band for branding.
- Key + actions in a clean single column with generous spacing.
- Primary Fix button emphasized; Scan secondary below.

## Risks / Trade-offs
- Over-styling could reduce clarity; keep visuals minimal and readable.
- Too-compact layout could harm scannability; maintain comfortable spacing.

## Migration Plan
- HTML/CSS updates only; no data or storage changes.

## Open Questions
- None.
