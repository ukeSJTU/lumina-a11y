# release-demo-video Specification

## Purpose
TBD - created by archiving change add-demo-video-release. Update Purpose after archive.
## Requirements
### Requirement: Project version source-of-truth
The system SHALL use `extension/manifest.json` as the source-of-truth for the project version.

#### Scenario: Read the project version
- **WHEN** the manifest version is `0.1.0`
- **THEN** the project version is treated as `0.1.0`

### Requirement: Versioning documentation
The system SHALL document versioning policy in `docs/versioning.md`, including that demo video release tags are derived from the project version at render time and that the README demo link may lag behind the current project version.

#### Scenario: Review versioning policy
- **WHEN** a contributor reads `docs/versioning.md`
- **THEN** they see how demo video releases map to project versions and that the demo link may lag behind the project version

### Requirement: Demo video render release
The system SHALL provide a GitHub Actions workflow that renders the Remotion `DemoMaster` composition from `demo/` and uploads `webilluminator-demo.mp4` as a GitHub Release asset.

#### Scenario: Render and upload demo video
- **WHEN** the workflow runs
- **THEN** a release asset named `webilluminator-demo.mp4` is uploaded for the target release tag, rendered from the `DemoMaster` composition

### Requirement: Demo video version tagging
The workflow SHALL create or update a release tagged `demo-video-v<version>` with title `Demo Video v<version>`, where `<version>` is read from `extension/manifest.json` at render time.

#### Scenario: Bump demo video version
- **WHEN** `extension/manifest.json` is set to `0.1.1`
- **THEN** the workflow publishes the asset under the `demo-video-v0.1.1` release tag

### Requirement: README demo video link
The root README SHALL include a thumbnail image at `assets/demo-video-thumbnail.png` that links to the release MP4 for the demo release tag documented in `docs/versioning.md`.

#### Scenario: View README demo video
- **WHEN** the project version is `0.2.0` and `docs/versioning.md` lists the demo release as `0.1.0`
- **THEN** the thumbnail links to the MP4 release asset for `demo-video-v0.1.0`

### Requirement: Workflow triggers and caching
The workflow SHALL support `workflow_dispatch` and `push` triggers on `main` for `demo/**` changes, and SHALL cache pnpm dependencies and the Remotion browser download directory.

#### Scenario: Re-run rendering workflow
- **WHEN** the workflow runs after a previous successful run
- **THEN** the dependency and browser caches are restored

### Requirement: S02 problem shot visuals
The demo video SHALL render the S02 "Problem / Unlabeled icons" segment using the scripted layout from `docs/demo-video-timing.csv`, including a mock browser with icon-only buttons, outline pulses highlighting unlabeled controls, a right-side screen reader stack that repeats "Button.", and on-screen text calling out unlabeled icons and the screen reader output.

#### Scenario: Render the S02 problem shot
- **WHEN** `DemoShot-S02` is rendered
- **THEN** the scene shows the mock browser with unlabeled icon buttons and outline pulses alongside a screen reader stack repeating "Button." with the scripted on-screen text

### Requirement: S03 impact shot visuals
The demo video SHALL render the S03 "Impact / Guessing game" segment as three stacked cards that slide in and out sequentially with snap transitions, each card showing an icon, keyword, and one-line description.

#### Scenario: Render the S03 impact shot
- **WHEN** DemoShot-S03 is rendered
- **THEN** the scene displays three cards in sequence labeled "Friction", "Lost time", and "Exclusion" with sublines "Basic actions feel hard.", "Seconds turn into minutes.", and "Some users cannot proceed.", with each card sliding in as the previous slides out

### Requirement: S04 reveal shot visuals
The demo video SHALL render the S04 "Reveal / Logo intro" segment using the scripted layout from `docs/demo-video-timing.csv`, featuring a centered typographic WebIlluminator logotype, the tagline "Illuminate the dark corners of the web.", a vector extension badge that pops in, and a small "One click." badge.

#### Scenario: Render the S04 reveal shot
- **WHEN** `DemoShot-S04` is rendered
- **THEN** the scene shows the logotype, tagline, extension badge pop-in, and "One click." badge on the dark background

### Requirement: S05 how-it-works shot visuals
The demo video SHALL render the S05 "How it works / Scan to repair" segment using the scripted layout from `docs/demo-video-timing.csv`, including a left step rail listing "1 Scan", "2 Tag", "3 See", "4 Repair" with an active highlight, a right MockBrowser with a scanning beam, SoM tags, Gemini callout, and label pill, plus an upper-right tech chip stack reading "Intent Recognition", "SPA Focus Management", and "Shadow DOM Piercing".

#### Scenario: Render the S05 how-it-works shot
- **WHEN** `DemoShot-S05` is rendered
- **THEN** the scene shows the step rail, scan beam, SoM tags, Gemini callout, label pill, and tech chips as scripted

### Requirement: S06 demo-before shot visuals
The demo video SHALL render the S06 "Demo (before) / Unlabeled state" segment using the scripted layout from `docs/demo-video-timing.csv`, with a 50/50 split screen of two MockBrowser panels, the left panel showing skeleton content and three unlabeled icon buttons (search, cart, close) with highlight rings and the right panel reserved for the comparison state with labels hidden.

#### Scenario: Render the S06 demo-before shot
- **WHEN** `DemoShot-S06` is rendered
- **THEN** the scene shows the split screen with the unlabeled icon buttons and highlight rings on the left panel

### Requirement: S07 demo-action shot visuals
The demo video SHALL render the S07 "Demo (action) / Activation" segment using the scripted layout from `docs/demo-video-timing.csv`, showing a keystroke overlay "Alt+R", a scanning beam sweep, SoM tags numbered 1-3, a Gemini callout listing "#1 Search", "#2 Cart", and "#3 Close", and label pills that pop in with a heavy spring.

#### Scenario: Render the S07 demo-action shot
- **WHEN** `DemoShot-S07` is rendered
- **THEN** the scene shows the keystroke overlay, scan beam, SoM tags, Gemini callout, and label pills as scripted

### Requirement: S08 demo-after shot visuals
The demo video SHALL render the S08 "Demo (after) / Labeled state" segment using the scripted layout from `docs/demo-video-timing.csv`, showing a full-frame MockBrowser labeled state with label pills visible and a caption stack that displays "Search", "Cart", and "Close".

#### Scenario: Render the S08 demo-after shot
- **WHEN** `DemoShot-S08` is rendered
- **THEN** the scene shows the labeled MockBrowser with label pills and the caption stack for the spoken words

### Requirement: S09 privacy shot visuals
The demo video SHALL render the S09 "Privacy / BYOK flow" segment using the scripted layout from `docs/demo-video-timing.csv`, showing a flow diagram of rounded nodes labeled "Browser", "Gemini", "Labels", and "DOM" with connectors, plus on-screen chips reading "BYOK", "No backend", and "No data stored".

#### Scenario: Render the S09 privacy shot
- **WHEN** `DemoShot-S09` is rendered
- **THEN** the scene shows the flow diagram and privacy chips as scripted

### Requirement: S10 benefits shot visuals
The demo video SHALL render the S10 "Benefits / Who wins" segment using the scripted layout from `docs/demo-video-timing.csv`, showing three horizontal icon cards with soft glow labeled "Instant repair", "Developer-friendly", and "User-first".

#### Scenario: Render the S10 benefits shot
- **WHEN** `DemoShot-S10` is rendered
- **THEN** the scene shows the three benefit cards with icons and labels

### Requirement: S11 close shot visuals
The demo video SHALL render the S11 "Close / Final lockup" segment using the scripted layout from `docs/demo-video-timing.csv`, featuring a centered typographic WebIlluminator lockup, the tagline "Illuminate the dark corners of the web.", the repo URL "https://github.com/ukeSJTU/lumina-a11y", and a "Google Hackathon" badge placeholder with a fade to black.

#### Scenario: Render the S11 close shot
- **WHEN** `DemoShot-S11` is rendered
- **THEN** the scene shows the lockup, repo URL, and "Google Hackathon" badge placeholder before fading out

