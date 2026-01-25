## 1. Workflow and pages setup
- [ ] 1.1 Add a GitHub Actions workflow to build and deploy Pages with path filters for docs/index.md, docs/en_us.md, docs/zh_cn.md, plus workflow_dispatch.

## 2. Docs site configuration
- [ ] 2.1 Add a docs/_config.yml with a Pages theme and excludes for non-report docs.
- [ ] 2.2 Add minimal YAML front matter to docs/index.md, docs/en_us.md, and docs/zh_cn.md so the theme applies.

## 3. Repository settings
- [ ] 3.1 Switch the repository Pages source to GitHub Actions after the workflow merges.

## 4. Validation
- [ ] 4.1 Run openspec validate add-research-report-pages --strict --no-interactive.
- [ ] 4.2 Trigger workflow_dispatch and confirm the Pages site renders only the three reports with theme styling.
