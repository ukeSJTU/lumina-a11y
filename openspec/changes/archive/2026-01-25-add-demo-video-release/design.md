## Context
We need an automated way to render the Remotion demo video and share it from the root README. GitHub Release assets provide a stable, public download target that works well for README links.

## Goals / Non-Goals
- Goals: automated rendering of the demo video, versioned release assets, README thumbnail linking, and caching to keep CI render times reasonable.
- Non-Goals: building the final production composition, auto-bumping versions, or embedding a playable video tag in the README.

## Decisions
- Use GitHub Release assets with versioned tags in the format `demo-video-v<semver>`. The project version is read from `extension/manifest.json` (starting at 0.1.0).
- Render MP4 (H.264) for broad browser compatibility. Use a stable asset name (e.g., `webilluminator-demo.mp4`).
- Commit a PNG thumbnail under `assets/` and link it in `README.md` to the release asset URL.
- Document versioning in `docs/versioning.md`, including that the README demo link may point to a demo release tag older than the current project version.
- Trigger the workflow via `workflow_dispatch` and on `push` to `main` when files under `demo/` change.
- Cache pnpm dependencies and the Remotion browser download directory to reduce CI render time.

## Alternatives considered
- GitHub Actions artifacts: expire by default and often require authentication, making them poor README targets.
- HTML `<video>` tags in README: inconsistent rendering on GitHub.
- WebM-only output: smaller but not supported in Safari.

## Risks / Trade-offs
- The README demo link is allowed to lag behind project version changes and must be updated intentionally when a new demo render is ready.
- The Remotion browser cache directory must be verified to ensure the cache step is effective.

## Migration Plan
- Confirm `extension/manifest.json` as the project version source-of-truth and define the release tag scheme.
- Add `docs/versioning.md` describing how the demo release tag can lag behind project version updates.
- Add the thumbnail image and update the README link.
- Add the workflow for rendering and release asset upload with caching.

## Open Questions
- Confirm the Remotion browser cache directory to use in GitHub Actions.
