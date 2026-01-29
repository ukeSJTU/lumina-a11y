# Change: Add S03 impact shot visuals

## Why
S03 still renders as a scaffold. The demo video needs the scripted impact cards to match the narrative and provide a polished segment before the product reveal.

## What Changes
- Implement the S03 "Impact / Guessing game" shot with sequential sliding cards.
- Add a reusable ImpactCardRow component for the stacked cards with icon, keyword, and subline.
- Wire S03 into the Remotion shot router so the master sequence renders the visuals.

## Impact
- Affected specs: release-demo-video
- Affected code: demo/src/demo-video/Shot.tsx, demo/src/demo-video/shots/S03Impact.tsx (new), demo/src/demo-video/components/ImpactCardRow.tsx (new)
