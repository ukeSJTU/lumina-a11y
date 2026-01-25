# Change: Publish research reports via GitHub Pages workflow

## Why
The project currently deploys Pages from the main branch docs folder. We need a dedicated workflow that publishes only the research report docs and improves their readability.

## What Changes
- Add a GitHub Actions workflow that builds and deploys Pages from the research report docs.
- Render docs/index.md, docs/en_us.md, and docs/zh_cn.md as HTML with a Pages theme for improved presentation.
- Publish only those three pages in the Pages artifact.
- Trigger on push to main for those files and workflow_dispatch.

## Impact
- Affected specs: publish-research-reports (new)
- Affected code: .github/workflows (new workflow), docs/ (Pages config, front matter), repository Pages settings
