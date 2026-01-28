## ADDED Requirements
### Requirement: S02 problem shot visuals
The demo video SHALL render the S02 "Problem / Unlabeled icons" segment using the scripted layout from `docs/demo-video-timing.csv`, including a mock browser with icon-only buttons, outline pulses highlighting unlabeled controls, a right-side screen reader stack that repeats "Button.", and on-screen text calling out unlabeled icons and the screen reader output.

#### Scenario: Render the S02 problem shot
- **WHEN** `DemoShot-S02` is rendered
- **THEN** the scene shows the mock browser with unlabeled icon buttons and outline pulses alongside a screen reader stack repeating "Button." with the scripted on-screen text
