# Minimatch < 9.0.7 — Remediation Plan

Security vulnerability in `minimatch` versions below 9.0.7. Each step = one dedicated PR.

---

## PR 1 — Remove `codecov` from fork/dynamic-cdn-webpack-plugin

- **File**: `fork/dynamic-cdn-webpack-plugin/package.json`
- **Action**: Remove `codecov@^3.8.3` from `devDependencies`
- **Why**: `codecov` npm package is deprecated (Codecov migrated to GitHub Actions). No usage in code or scripts.
- **Eliminates**: minimatch@3.1.2 (via `codecov → ignore-walk → minimatch`)
- **Effort**: trivial
- **Verify**: `yarn why minimatch` — `codecov` chain gone

---

## PR 2 — Remove `browser-sync` from packages/design-system

- **File**: `packages/design-system/package.json`
- **Action**: Remove `browser-sync@^3.0.4` and `browser-sync-webpack-plugin@^2.4.0` from `devDependencies`
- **Why**: Both are unused — no imports, no script references, no webpack config usage anywhere in the design-system package
- **Eliminates**: minimatch@3.1.2 (via `browser-sync → resp-modifier → minimatch`)
- **Effort**: trivial
- **Verify**: `yarn why minimatch` — `browser-sync` chain gone

---

## PR 3 — Upgrade `glob` in tools/scripts-utils (v8 → v11)

- **File**: `tools/scripts-utils/package.json` — update `glob` from `^8.1.0` to `^11.0.0`
- **Code change**: `tools/scripts-utils/src/glob.js` — rewrite `globMatch()` from callback API to glob v11 native async API:

  ```js
  // Before (glob@8 callback)
  glob(pattern, (error, files) => { ... })

  // After (glob@11 async)
  const { glob } = require('glob');
  const files = await glob(pattern);
  return files.length > 0;
  ```

- **Eliminates**: minimatch@5.1.6 (via `glob@8 → minimatch@5`)
- **Effort**: low — single function, ~5 lines
- **Verify**: `yarn workspace @talend/scripts-utils test`

---

## PR 4 — Upgrade Storybook deps in packages/forms (v7 → v10)

- **File**: `packages/forms/package.json`
- **Action**: Update `@storybook/addon-actions` and `@storybook/addon-controls` from `^7.6.21` to `^10.2.1` (aligns with rest of repo already on Storybook 10.2)
- **Eliminates**: minimatch@9.0.5 (via `@storybook/core-common → glob → minimatch`)
- **Effort**: medium — Storybook 7→10 is a major jump; check addon API and story format changes
- **Verify**: `yarn workspace @talend/react-forms build-storybook`

---

## PR 5 — Upgrade `eslint-plugin-mdx` in tools/scripts-config-eslint (v2 → v3)

- **File**: `tools/scripts-config-eslint/package.json` — update `eslint-plugin-mdx` from `^2.3.4` to `^3.x`
- **Compat**: v3 works with ESLint 8+; `"plugin:mdx/recommended"` extends syntax still supported
- **Eliminates**: minimatch@5.1.6 (via `eslint-mdx → unified-engine → glob`) + minimatch@9.0.5 (via `load-plugin → @npmcli/config → @npmcli/map-workspaces → glob`)
- **Effort**: medium — verify MDX linting across packages
- **Note**: could alternatively fold into the ESLint 9 migration
- **Verify**: lint a package that contains MDX files

---

## PR 6 — Replace or upgrade `fantasticon` in packages/icons

- **File**: `packages/icons/package.json` — `fantasticon@^3.0.0` (devDependency)
- **Problem**: Already on latest major (v3). No upstream fix. Used as CLI only via `npx fantasticon` in `packages/icons/scripts/build-webfont.mjs`
- **Pulls**: minimatch@3.1.2, @5.1.6, @9.0.5 (triple offender — via svgicons2svgfont, cacache/rimraf, own glob)
- **Options**:
  - a) Replace with alternative (`svgtofont`, `webfonts-generator`, custom script)
  - b) File upstream issue and wait
  - c) Vendor/fork fantasticon with updated deps
- **Effort**: high — must validate font output (EOT, WOFF, WOFF2, TTF, SVG) + CSS generation with custom HBS templates + codepoint mappings
- **Verify**: `yarn workspace @talend/icons build` — compare generated font files

---

## PR 7 — Replace or upgrade `fork-ts-checker-webpack-plugin` in tools/scripts-config-react-webpack

- **File**: `tools/scripts-config-react-webpack/package.json` — `fork-ts-checker-webpack-plugin@^9.1.0`
- **Problem**: Already on latest major (v9). No upstream fix. Used with default options.
- **Code**: `webpack.config.js` and `webpack.config.common.js` — `useTypescript && new ForkTsCheckerWebpackPlugin()`
- **Pulls**: minimatch@3.1.2
- **Options**:
  - a) Replace with `ts-checker-rspack-plugin` or `tsc --noEmit` script
  - b) File upstream issue and wait
  - c) Accept risk (build-time-only devDependency)
- **Effort**: medium
- **Verify**: Full webpack build on a TypeScript project using this config

---

## Blocked — `babel-jest` / `test-exclude` chain

- **Package**: `tools/babel-plugin-assets-api/package.json` — `babel-jest@^29.7.0`
- **Chain**: `babel-jest → babel-plugin-istanbul → test-exclude@6 → minimatch@3.1.2`
- **Status**: No fix available. Jest 30 not yet released. `test-exclude@7` uses `minimatch@^9` but `babel-plugin-istanbul@6` pins `test-exclude@^6`.
- **Action**: Monitor upstream. Re-evaluate when Jest 30 ships.

---

## Deferred — Covered by ESLint 9 migration (already in progress)

These all pull minimatch@3.1.2 and will be resolved by the ESLint 8→9 migration:

| Dependency                         | Version   | Packages                       |
| ---------------------------------- | --------- | ------------------------------ |
| `eslint`                           | `^8.57.1` | 13 workspace packages (devDep) |
| `@typescript-eslint/parser`        | `^6.21.0` | tools/scripts-config-eslint    |
| `@typescript-eslint/eslint-plugin` | `^6.21.0` | tools/scripts-config-eslint    |
| `eslint-plugin-import`             | `^2.32.0` | tools/scripts-config-eslint    |
| `eslint-plugin-jsx-a11y`           | `^6.10.2` | tools/scripts-config-eslint    |
| `eslint-plugin-react`              | `^7.37.5` | tools/scripts-config-eslint    |

---

## Already safe (≥ 9.0.7) — no action needed

| Resolved version | Source                                                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| minimatch@10.2.4 | cpx2 (via @talend/scripts-core), rimraf@6.x (root), @joshwooding/vite-plugin-react-docgen-typescript, @types/minimatch |

---

## Constraints

- **No yarn `resolutions` overrides** — each fix is a direct dependency upgrade or removal
- **No ESLint ecosystem changes** — deferred to the ongoing ESLint 9 migration
- **`babel-jest` chain blocked** until Jest 30 — accepted as deferred risk
