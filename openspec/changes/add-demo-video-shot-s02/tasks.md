## 1. Implementation
- [ ] 1.1 Build the S02 problem shot component with a mock browser layout, skeleton blocks, icon-only buttons, outline pulses, and a screen reader stack that repeats "Button." alongside the scripted on-screen text.
- [ ] 1.2 Add or refactor mock UI primitives (MockBrowser, SkeletonBlock, IconButton, OutlinePulse, ScreenReaderStack) so S02 can reuse them without duplicating layout logic.
- [ ] 1.3 Route the shot renderer to use the S02 component when spec.id is "S02".

## 2. Validation
- [ ] 2.1 Render `DemoShot-S02` with `just demo-render DemoShot-S02 out/s02.mp4` to confirm the timing and visuals.
