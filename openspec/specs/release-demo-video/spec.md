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

