# publish-research-reports Specification

## Purpose
TBD - created by archiving change add-research-report-pages. Update Purpose after archive.
## Requirements
### Requirement: Research report pages workflow
The system SHALL provide a GitHub Actions workflow that builds and deploys GitHub Pages from the research report docs.

#### Scenario: Deploy on push
- **WHEN** docs/index.md, docs/en_us.md, or docs/zh_cn.md changes on main
- **THEN** the workflow runs and deploys the Pages site

#### Scenario: Manual deployment
- **WHEN** a maintainer triggers workflow_dispatch
- **THEN** the workflow runs and deploys the Pages site

### Requirement: Publish selected reports only
The Pages artifact SHALL include only the rendered versions of docs/index.md, docs/en_us.md, and docs/zh_cn.md.

#### Scenario: Exclude other docs
- **WHEN** docs/resources.md exists in the repository
- **THEN** it is not present in the published Pages output

### Requirement: Styled research reports
The published pages SHALL render the Markdown reports as HTML using a GitHub Pages supported theme to improve readability.

#### Scenario: Theme applied
- **WHEN** a viewer opens the Pages site
- **THEN** the reports are rendered with the selected theme styling and normal Markdown formatting

