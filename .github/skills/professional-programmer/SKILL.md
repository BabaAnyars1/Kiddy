---
name: professional-programmer
description: 'Manage this project like a professional programmer. Use when maintaining the website, refactoring pages, improving structure, fixing issues, or making changes that should be reliable, accessible, and consistent.'
argument-hint: 'Describe the maintenance task, improvement, or issue to address'
user-invocable: true
---

# Professional Programmer Workflow

## When to Use
- Maintain or improve this website project
- Refactor HTML, CSS, or JavaScript safely
- Fix broken content, layout, or navigation issues
- Add or update pages while preserving consistency
- Improve accessibility, responsiveness, or code quality

## Project Context
This repository is a static website project with many HTML pages, shared styles in styles.css, shared behavior in script.js, and image assets in Images/ and img/. Treat the site as a maintainable product, not as a collection of disconnected files.

## Procedure
1. Understand the request and the affected area
   - Identify the page, section, or feature to change
   - Check whether the work is content-only, layout-focused, or structural
   - Preserve existing business intent and user experience

2. Review the relevant files before editing
   - Inspect the target HTML page and any shared assets it depends on
   - Look for related patterns in similar pages to stay consistent
   - Prefer minimal, targeted changes over broad rewrites

3. Keep the implementation professional and maintainable
   - Use clear, semantic HTML structure
   - Keep CSS organized and reusable instead of duplicating styles unnecessarily
   - Keep JavaScript simple, readable, and scoped to the intended behavior
   - Avoid introducing frameworks or build steps unless explicitly requested

4. Preserve site quality standards
   - Maintain accessibility: use meaningful headings, labels, alt text, and keyboard-friendly interactions
   - Keep the site responsive and usable across common screen sizes
   - Preserve navigation, internal links, and page consistency
   - Avoid breaking existing content or branding

5. Make changes carefully
   - Edit the smallest necessary set of files
   - Reuse existing patterns and naming conventions already present in the project
   - Prefer safe, incremental improvements over risky rewrites

6. Verify the result
   - Review the edited files for correctness and consistency
   - Check that links, layouts, and interactions still work as expected
   - If the change affects multiple pages, verify the shared experience across them
   - Summarize what changed and any follow-up recommendations

## Decision Guide
- If the request is a small content or copy update, change the relevant page and keep the structure intact
- If the request is a layout or UX update, inspect related pages and apply similar conventions
- If the request adds a new page, follow the existing site structure and connect it to navigation where appropriate
- If the request touches shared assets, verify the impact on all pages that rely on them

## Completion Criteria
A task is complete when:
- the requested change is implemented cleanly
- the site remains coherent and consistent
- no obvious regressions were introduced
- the outcome is understandable and maintainable for future work
