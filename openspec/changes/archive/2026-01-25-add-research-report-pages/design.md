## Context
GitHub Pages currently deploys from main/docs. We want to switch to a workflow-based deployment that publishes only the three research report docs and makes them look more polished.

## Goals / Non-Goals
- Goals:
  - Use GitHub Actions to build and deploy GitHub Pages.
  - Publish only docs/index.md, docs/en_us.md, and docs/zh_cn.md.
  - Improve report readability with a supported Pages theme.
  - Keep configuration minimal and easy to extend later.
- Non-Goals:
  - Publish all docs under docs/.
  - Add new site features such as search or navigation beyond existing links.
  - Introduce new translations in this change.

## Decisions
- Use the official GitHub Pages actions (configure-pages, jekyll-build-pages, upload-pages-artifact, deploy-pages).
- Build from docs/ with a Jekyll config and a built-in theme (proposed: jekyll-theme-cayman).
- Add minimal front matter to the three report docs so the theme applies.
- Exclude other docs from the published output until they are explicitly added later.

## Risks / Trade-offs
- Jekyll themes require front matter, so the reports need small edits.
- Restricting output to three docs means new translations need config updates to publish.

## Migration Plan
- Add the workflow and docs Pages config.
- Switch repository Pages settings to GitHub Actions after merge.
- Run workflow_dispatch to confirm the deployment.

## Open Questions
- None.
