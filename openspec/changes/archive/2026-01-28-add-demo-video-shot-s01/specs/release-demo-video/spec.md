## MODIFIED Requirements
### Requirement: Demo video render release
The system SHALL provide a GitHub Actions workflow that renders the Remotion `DemoMaster` composition from `demo/` and uploads `webilluminator-demo.mp4` as a GitHub Release asset.

#### Scenario: Render and upload demo video
- **WHEN** the workflow runs
- **THEN** a release asset named `webilluminator-demo.mp4` is uploaded for the target release tag, rendered from the `DemoMaster` composition
