# Change: Add demo video release pipeline

## Why
Provide a reproducible Remotion demo video with a shareable release asset and surface it in the root README.

## What Changes
- Add a GitHub Actions workflow that renders the demo Remotion video and uploads it to a versioned GitHub Release.
- Add a repo-committed thumbnail under assets/ and link it in the root README to the release MP4.
- Use the project version (stored in `extension/manifest.json`) as the source-of-truth for demo video release tags, starting at 0.1.0, while allowing the README demo link to lag behind the project version.
- Document versioning policy in `docs/versioning.md` and link it from the root README.

## Impact
- Affected specs: release-demo-video (new)
- Affected code: .github/workflows, README.md, assets/, demo/
