# Copilot helper for this repo

**Scope**: Talend UI monorepo (React, Storybook, Sass modules). Prefer Yarn workspaces and `talend-scripts` helpers. Keep changes isolated to the relevant package under `packages/`.

This repository is in maintenance mode.

## Commands

- Install deps: `yarn` at repo root.
- Lint all: `yarn lint`. Tests all: `yarn test`. Playground: `yarn start` (opens packages/playground dev server).
- Package-specific: `yarn workspace <pkg> test|lint|build|start` (e.g., `yarn workspace @talend/react-components test`).
- Build components: from `packages/components`, use `yarn build:lib` or `yarn build:lib:esm`.
- Formatting: `npx prettier --write "**/*.module.css"` or `yarn prettier --write` if configured. Avoid running `prettier --write` via Yarn scripts that start dev servers.

## Code conventions

- React components: stateless where possible; avoid `{children}` for leaf components (see `packages/components/README.md`).
- Styles: SCSS modules compiled to sibling `.module.css` when using the package script (`packages/components/css.js`). Keep CSS custom properties (coral tokens) and avoid global leakage.
- Imports: prefer relative module imports within a package; use workspace package names between packages.
- Tests: Jest + Testing Library snapshot/DOM tests dominate. Keep new tests colocated with components.
- Storybook: stories live under `.stories.js`/`.mdx`; keep props documented.

## HTTP / security tokens

- CSRF handling is centralized in `packages/cmf/src/middlewares/http/csrfHandling.js` and reused in sagas. Tokens: `CSRFTokenCookieKey` (default `csrfToken`), `CSRFTokenHeaderKey` (default `X-CSRF-Token`).

## Frontend patterns

- Use `Icon` components instead of raw `<i>` tags; follow Talend design tokens and guidelines.
- Avoid anchors for navigation; prefer Action components or router links.
- State naming follows guidelines: `default`, `loading`, `inProgress`.

## PR hygiene

- Run lint/tests for the touched package. Avoid touching other packages unless necessary.
- Keep generated outputs out of commits unless explicitly required (e.g., compiled CSS for release builds).
- Note breaking changes via changesets when needed.
