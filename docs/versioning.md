# Versioning

## Source of truth

The project version is read from `extension/manifest.json` (the `version` field).

## Demo video releases

Demo video release tags use the format `demo-video-v<version>`, where `<version>`
comes from `extension/manifest.json` at render time.

## README demo link

The README demo thumbnail links to the release asset for the demo release version
recorded below. This link may lag behind the current project version when the
video has not been re-rendered yet.

## Current demo video release

- Demo video version: 0.1.0
- Release tag: demo-video-v0.1.0
- Asset URL: https://github.com/ukeSJTU/lumina-a11y/releases/download/demo-video-v0.1.0/webilluminator-demo.mp4

## Updating the demo link

1. Run the demo render workflow to publish a new release asset.
2. Update the demo video version above if it changes.
3. Update the README demo thumbnail link to match the new release tag.
