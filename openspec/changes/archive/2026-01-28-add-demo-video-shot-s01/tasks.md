## 1. Implementation
- [x] 1.1 Build the S01 hook shot component with waveform, ghosted icons, and bottom captions using frame-driven animations.
- [x] 1.2 Route the demo-video shot renderer to use the S01 component for `spec.id === "S01"`, keeping the scaffold for other shots.
- [x] 1.3 Remove the HelloWorld/OnlyLogo template compositions and update Remotion entry points to render the demo master composition.
- [x] 1.4 Update the demo video release workflow and `just demo-render` default to render the demo master composition.
- [x] 1.5 Update the `release-demo-video` spec to reflect the demo master composition render target.

## 2. Validation
- [x] 2.1 Run `pnpm exec remotion render src/index.ts DemoShot-S01 out/s01.mp4` (or render `DemoMaster` if a full preview is needed).
