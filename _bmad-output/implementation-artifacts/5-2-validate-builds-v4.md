# Story 5.2: Validate CJS and ESM builds

Status: done

## Story

As a developer,
I want all packages to compile successfully in both CJS and ESM formats,
so that the build pipeline is unbroken.

## Acceptance Criteria

1. `yarn build:lib` succeeds without errors (via `talend-yarn-workspace run build:lib`)
2. `yarn build:lib:esm` succeeds without errors (via `talend-yarn-workspace run build:lib:esm`)
3. No Immutable-related build warnings

## Tasks / Subtasks

- [x] Run `yarn build:lib` (AC: #1)
- [x] Run `yarn build:lib:esm` (AC: #2)
- [x] Review build output for warnings (AC: #3)

## Dev Notes

- CJS and ESM builds use different Babel configs — both must be tested.
- Named imports (`import { Map } from 'immutable'`) are compatible with both CJS and ESM.

### References

- [Source: _bmad-output/planning-artifacts/migration-immutable-v5.md#Étape 1.6]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6

### Debug Log References

N/A — All builds succeeded on first run, no debugging required.

### Completion Notes List

- Ran `./node_modules/.bin/talend-yarn-workspace run build:lib` (2026-03-06). All 26 packages with `build:lib` script returned exit code 0.
- Ran `./node_modules/.bin/talend-yarn-workspace run build:lib:esm` (2026-03-06). All 21 packages with `build:lib:esm` script returned exit code 0.
- Named imports (`import { Map, List, ... } from 'immutable'`) are compatible with both CJS (ESM=false) and ESM (ESM=true) Babel configs as confirmed.
- No Immutable-related build warnings found. Only pre-existing Node.js DEP0169 (`url.parse()`) warning observed — unrelated to Immutable v4.
- Note: `yarn workspaces run build:lib` (flat mode) shows a TypeScript config issue in `@talend/react-dataviz` (`Option 'bundler'`), but this is a pre-existing issue unrelated to the Immutable migration and does not affect the `talend-yarn-workspace` orchestrated build. This pre-existing issue should be tracked separately.

### File List

No source files modified — validation story only.
