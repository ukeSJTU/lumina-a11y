## 1. Implementation
- [x] 1.1 Add `docs/versioning.md` to document the project version source-of-truth (`extension/manifest.json`) and that demo video releases can lag behind project version updates.
- [x] 1.2 Add `assets/demo-video-thumbnail.png` with descriptive alt text for README usage.
- [x] 1.3 Add a GitHub Actions workflow to render the `HelloWorld` composition in `demo/` to `webilluminator-demo.mp4` and upload it to a release tag `demo-video-v<version>` derived from `extension/manifest.json`, with pnpm and Remotion browser caching; trigger on `workflow_dispatch` and on `push` to `main` for `demo/**`.
- [x] 1.4 Update the root README to link to `docs/versioning.md`, display the thumbnail, and link the thumbnail to the demo release tag recorded in the versioning doc.
- [x] 1.5 Validate by running the workflow_dispatch and confirming the release asset link works.
