---
'@talend/storybook-docs': minor
'@talend/design-system': patch
'@talend/design-tokens': patch
---

chore: remove all Figma integrations and references

- Deleted `FigmaImage`, `FigmaIframe` and `FigmaContext` components from `@talend/storybook-docs`, along with their `@figma/rest-api-spec` devDependency.
- Removed the `figma` status type/badge from the component status overview (`StatusType`, `Statuses`, `status.json` in both `design-system` and `design-docs`).
- Removed the `## Zoning` sections and Figma embeds from all Design System MDX stories and from `DOCTEMPLATE.md`.
- Removed Figma links/mentions from docs prose (`GettingStarted.mdx`, `Principles.mdx`, `SizedIcon.mdx`, `A-About.mdx`, `design-tokens/README.md`, `CONTRIBUTING.md`).
- Deleted the Figma-asset caching service worker (`design-system/static/sw.js`).
- Deleted the `.github/workflows/icons.yml` workflow that downloaded icons from Figma via `@talend/figma-icons-downloader`.

No functional change for component consumers; this is a documentation/tooling cleanup to drop the Figma dependency end-to-end.
