# Change: Add Shadow DOM examples and scanning requirements

## Why
Web Components (Shadow DOM) often hide unlabeled controls and images from the current scan, which leads to weaker accessibility repairs. Adding concrete examples and explicit requirements will make the gap visible and guide a more accurate scan approach.

## What Changes
- Add three example pages demonstrating accessibility anti-patterns inside open Shadow DOM: shallow nesting, deep nesting, and a mixed page with both.
- Add requirements for Shadow DOM example coverage.
- Add requirements for scanning open Shadow DOM and skipping closed roots.
- Update README example list to include the new pages.

## Impact
- Affected specs: demonstrate-aria-antipatterns, semantic-repair-extension
- Affected code: examples/, extension/content.js, README.md
