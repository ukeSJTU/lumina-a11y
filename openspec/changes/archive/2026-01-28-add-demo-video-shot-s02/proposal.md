# Change: Add S02 problem shot to demo video

## Why
The demo video still uses scaffolds for the S02 segment, leaving the scripted problem beat unimplemented. We need the S02 visuals to align the demo with the approved storyboard.

## What Changes
- Build the S02 "Problem / Unlabeled icons" shot visuals based on the script and shot list.
- Add mock UI primitives (MockBrowser, SkeletonBlock, IconButton, OutlinePulse, ScreenReaderStack) for this shot and future shots if needed.
- Route the demo shot renderer to use the S02 component for spec.id === "S02".

## Impact
- Affected specs: release-demo-video
- Affected code: demo/src/demo-video/shots, demo/src/demo-video/Shot.tsx
