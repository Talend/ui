# Migration Plan: Replace `talend-scripts build` with `tsup` (ESM-only)

## Overview

Migrate all library packages from the current `talend-scripts build` pipeline
(Babel + tsc) to **tsup** while simultaneously dropping CommonJS support.
Output will be ESM-only.

A parallel `build:libx` script outputting to `libx/` allows side-by-side comparison
with the current `lib-esm/` before cutting over.

## Key Decisions

| Decision                                                   | Choice                                                        |
| ---------------------------------------------------------- | ------------------------------------------------------------- |
| Module format                                              | **ESM-only** — no more `lib/` (CJS)                           |
| Build tool                                                 | **tsup** (esbuild-based, ~10× faster than Babel)              |
| TypeScript declarations                                    | **tsup `dts: true`** (Phase 3, after comparison)              |
| CSS/SCSS/JSON assets                                       | **Copied as-is** via `onSuccess` — not bundled                |
| Babel custom plugins (`import-from-index`, `assets-api`)   | **Dropped** — no longer needed                                |
| Fork packages (`react-bootstrap`, `json-schema-form-core`) | **Out of scope** — stay on talend-scripts                     |
| `icons` (Vite), `theme` (Webpack)                          | **Out of scope** — already use other tools                    |
| Comparison directory                                       | `libx/` (tsup Phase 1 output) vs `lib-esm/` (current)         |
| Shared config package                                      | `@talend/scripts-config-tsup` in `tools/scripts-config-tsup/` |

---

## Phases

### Phase 0 — Setup ✅ DONE

- [x] Add `tsup` as `devDependency` to each consumer package (not the root — pnpm-compatible explicit deps)
- [x] Create `tools/scripts-config-tsup/` workspace package
  - [x] Exports `baseConfig()` helper — common tsup options
  - [x] Exports `copyAssets()` helper — replaces `cpx2` copy step
  - [x] Exports `SOURCE_PATTERNS` and `EXCLUDE_PATTERNS` glob arrays

### Phase 1 — Add `build:libx` per package (in progress)

For each package: created `tsup.config.ts` + added `"build:libx": "tsup"` script.

Run `yarn workspace <pkg> run build:libx` to produce `libx/` output for comparison.

#### Batch 1 — Pure TS, no assets

| Package               | tsup.config.ts | build:libx script | Compare | Validate |
| --------------------- | :------------: | :---------------: | :-----: | :------: |
| `packages/a11y`       |       ✅       |        ✅         |   ⬜    |    ⬜    |
| `packages/assets-api` |       ✅       |        ✅         |   ⬜    |    ⬜    |
| `packages/http`       |       ✅       |        ✅         |   ⬜    |    ⬜    |
| `packages/utils`      |       ✅       |        ✅         |   ⬜    |    ⬜    |
| `packages/cmf-cqrs`   |       ✅       |        ✅         |   ⬜    |    ⬜    |

#### Batch 2 — JS/JSX, no assets

| Package                                | tsup.config.ts | build:libx script | Compare | Validate |
| -------------------------------------- | :------------: | :---------------: | :-----: | :------: |
| `packages/cmf`                         |       ✅       |        ✅         |   ⬜    |    ⬜    |
| `packages/cmf-router`                  |       ✅       |        ✅         |   ⬜    |    ⬜    |
| `packages/sagas`                       |       ✅       |        ✅         |   ⬜    |    ⬜    |
| `packages/router-bridge`               |       ✅       |        ✅         |   ⬜    |    ⬜    |
| `packages/storybook-cmf`               |       ✅       |        ✅         |   ⬜    |    ⬜    |
| `packages/faceted-search-query-client` |       ✅       |        ✅         |   ⬜    |    ⬜    |

#### Batch 3 — TS + CSS assets

| Package                  | tsup.config.ts | build:libx script | Compare | Validate |
| ------------------------ | :------------: | :---------------: | :-----: | :------: |
| `packages/stepper`       |       ✅       |        ✅         |   ⬜    |    ⬜    |
| `packages/forms`         |       ✅       |        ✅         |   ⬜    |    ⬜    |
| `packages/dataviz`       |       ✅       |        ✅         |   ⬜    |    ⬜    |
| `packages/containers`    |       ✅       |        ✅         |   ⬜    |    ⬜    |
| `packages/flow-designer` |       ✅       |        ✅         |   ⬜    |    ⬜    |

#### Batch 4 — CSS/SCSS assets

| Package                   | tsup.config.ts | build:libx script | Compare | Validate |
| ------------------------- | :------------: | :---------------: | :-----: | :------: |
| `packages/components`     |       ✅       |        ✅         |   ⬜    |    ⬜    |
| `packages/faceted-search` |       ✅       |        ✅         |   ⬜    |    ⬜    |

#### Batch 5 — Special cases

| Package                   | tsup.config.ts | build:libx script | Compare | Validate | Notes                                          |
| ------------------------- | :------------: | :---------------: | :-----: | :------: | ---------------------------------------------- |
| `packages/design-system`  |       ✅       |        ✅         |   ⬜    |    ⬜    | Also copies SVG images from `src/images/`      |
| `packages/design-tokens`  |       ✅       |        ✅         |   ⬜    |    ⬜    | `build:css` (SCSS→CSS) remains a separate step |
| `packages/storybook-docs` |       ✅       |        ✅         |   ⬜    |    ⬜    | `build:styles` remains a separate step         |

---

### Phase 2 — Validate & fix (TODO)

For each package above, check `✅` when done:

- [ ] Run `yarn workspace <pkg> run build:libx` — build succeeds
- [ ] `diff -rq lib-esm/ libx/` — compare current vs tsup output
  - [ ] JS files use ESM syntax (`import`/`export`)
  - [ ] `.css`, `.scss`, `.json` assets are present
  - [ ] Source maps (`.js.map`) are present
  - [ ] Package content is equivalent (no missing/extra files)
- [ ] Run `yarn workspace <pkg> test` to confirm no regressions
- [ ] Confirm the two dropped Babel plugins have no runtime impact:
  - `babel-plugin-import-from-index` — consumers import from package root
  - `babel-plugin-assets-api` — CDN version injection no longer needed
- [ ] Compare bundle sizes (`lib-esm/` vs `libx/`)

### Phase 3 — Cutover (TODO)

For each package:

- [ ] Enable `dts: true` in `tsup.config.ts` (TypeScript declarations via tsup)
- [ ] Verify `.d.ts` files are generated correctly in `libx/`
- [ ] Update `package.json`:
  - Change `outDir` from `libx` to the final directory (`lib` after dropping CJS)
  - Change `"build:lib"` script to `"tsup"` (or keep alias)
  - Remove `"build:lib:esm"` script
  - Update `"main"` → ESM output path
  - Update `"types"` → new declaration file path
  - Remove `"module"` (redundant once ESM is main)
  - Update `"exports"` → single ESM entry:
    ```json
    "exports": {
      ".": {
        "import": "./lib/index.js",
        "types": "./lib/index.d.ts"
      }
    }
    ```
  - Add `"type": "module"` if needed
- [ ] Remove `@talend/scripts-config-babel` from `devDependencies` (if only used for build)
- [ ] Remove `@talend/scripts-core` from `devDependencies` (if only used for `build:lib`)

After all packages are migrated:

- [ ] Update root `package.json` `postinstall` — single `talend-yarn-workspace run build:lib`
- [ ] Remove `libx/` from `.gitignore` (or add it if not there already)
- [ ] Run full monorepo test suite: `yarn test`
- [ ] Verify Storybook builds (`yarn start-storybook`)
- [ ] Verify playground apps work
- [ ] Submit PR and add a changeset with `@changesets/cli`

---

## How to Compare Outputs

```bash
# Build current output (if lib-esm/ doesn't exist yet):
yarn workspace @talend/react-a11y run build:lib:esm

# Build tsup output:
yarn workspace @talend/react-a11y run build:libx

# Compare:
diff -rq packages/a11y/lib-esm/ packages/a11y/libx/
```

---

## Relevant Files

| File                                            | Purpose                                 |
| ----------------------------------------------- | --------------------------------------- |
| `tools/scripts-config-tsup/src/index.ts`        | Shared `baseConfig()` + `copyAssets()`  |
| `tools/scripts-core/src/scripts/build-lib.js`   | Legacy build (reference)                |
| `tools/scripts-config-babel/babel.config.js`    | Legacy Babel config (reference)         |
| `tools/scripts-config-typescript/tsconfig.json` | Base TS config used by packages         |
| Root `package.json`                             | `postinstall` / workspace orchestration |

---

## Notes

- **`bundle: false`** (file-per-file transform) matches current Babel behavior and
  preserves tree-shaking for consumers. With `bundle: true`, all entry points would
  need to be explicitly listed.
- **Deep imports** (`exports["./lib/*"]`) continue to work with file-per-file output.
  The `exports` map will need updating in Phase 3 to point to the new directory.
- **`design-tokens`** and **`storybook-docs`** have secondary build steps (`build:css`,
  `build:styles`) that are independent from the JS compilation and should be kept.
- **`utils`** previously used `build:lib: "talend-scripts build --tsc"` (TypeScript-only,
  no Babel). tsup/esbuild handles TypeScript natively — no special treatment needed.
