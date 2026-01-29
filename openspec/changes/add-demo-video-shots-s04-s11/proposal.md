# Change: Add demo video shots S04-S11

## Why
The demo video still uses scaffolds for S04-S11, leaving the reveal, walkthrough, live demo, privacy, benefits, and close segments unimplemented. We need these shots to match the approved script and timing for the hackathon submission.

## What Changes
- Implement Remotion shots S04-S11 per `docs/demo-video-timing.csv` with scripted layouts and motion.
- Add shared components for logo lockup, step rail, scanning beam, SoM tags, callouts, demo UI overlays, flow diagram, and benefit cards.
- Use vector/typographic placeholders for the logo, extension icon, and "Google Hackathon" badge until assets are provided.

## Impact
- Affected specs: release-demo-video
- Affected code: `demo/src/demo-video/shots/*`, `demo/src/demo-video/components/*`, `demo/src/demo-video/Shot.tsx`
