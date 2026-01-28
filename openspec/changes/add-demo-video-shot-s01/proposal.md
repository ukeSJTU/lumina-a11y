# Change: Add S01 hook shot and replace Remotion placeholders

## Why
The demo video still relies on the default Remotion placeholders, which blocks progress on the scripted storyboard. We need a real first shot to align the demo with the approved script and visual direction.

## What Changes
- Add the S01 hook shot visuals (waveform, ghost icon cloud, bottom captions) based on the scripted shot list.
- Render S01 through the demo-video shot pipeline while keeping scaffolds for remaining shots.
- Remove the HelloWorld/OnlyLogo placeholders and update render entry points to the demo master composition.
- Update the demo video release workflow to render the demo master composition.

## Impact
- Affected specs: release-demo-video
- Affected code: demo/src/demo-video/**, demo/src/Root.tsx, demo/src/index.ts, justfile, .github/workflows/release-demo-video.yml
