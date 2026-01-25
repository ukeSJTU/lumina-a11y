## ADDED Requirements
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
The system SHALL provide a GitHub Actions workflow that renders the Remotion `HelloWorld` composition from `demo/` and uploads `webilluminator-demo.mp4` as a GitHub Release asset.

#### Scenario: Render and upload demo video
- **WHEN** the workflow runs
- **THEN** a release asset named `webilluminator-demo.mp4` is uploaded for the target release tag

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
