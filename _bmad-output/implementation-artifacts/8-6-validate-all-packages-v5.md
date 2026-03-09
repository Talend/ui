# Story 8.6: Validate all packages with v5

Status: done

## Story

As a developer,
I want to run the test suite for every package that uses Immutable,
so that all v5 breaking changes have been addressed.

## Acceptance Criteria

1. `yarn workspace @talend/react-cmf test` passes
2. `yarn workspace @talend/react-cmf-cqrs test` passes
3. cmf-router tests pass
4. `yarn workspace @talend/react-components test` passes
5. `yarn workspace @talend/react-containers test` passes
6. sagas tests pass
7. `yarn workspace @talend/react-flow-designer test` passes
8. No Immutable-related deprecation warnings in any package

## Tasks / Subtasks

- [x] Run cmf tests (AC: #1)
- [x] Run cmf-cqrs tests (AC: #2)
- [x] Run cmf-router tests (AC: #3)
- [x] Run components tests (AC: #4)
- [x] Run containers tests (AC: #5)
- [x] Run sagas tests (AC: #6)
- [x] Run flow-designer tests (AC: #7)
- [x] Review all outputs for warnings (AC: #8)
- [x] Fix any remaining failures

## Dev Notes

- This is the comprehensive per-package validation before the final global test suite.
- All stories 8.1–8.5 must be complete.
- Running per-package allows targeted debugging of any remaining issues.
- `fromJS` is still used in production code (`localStorage.js`, `componentState.js`, `collectionsReducers.js`, `componentsReducers.js`, `ComponentForm.sagas.js`). It is available in Immutable v5.1.4 and currently functioning correctly. Edge-case round-trip behavior (nested objects with `undefined` values or custom class instances) is intentionally deferred to Story 9.3 (`verify-localstorage-roundtrip`).
- 4 pre-existing `xit()` tests exist in non-migration files (3 in `AbstractNode.test.tsx` for drag events, 1 in `ActionButton.test.js` for overlay mouse events). These were skipped before this migration and are unrelated to Immutable v5. They are tracked below under Review Follow-ups.

### References

- [Source: _bmad-output/planning-artifacts/migration-immutable-v5.md#Étape 2.8]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6

### Debug Log References

No failures encountered. All packages passed on first run.

Commands executed (all from workspace root):
- `yarn workspace @talend/react-cmf test`
- `yarn workspace @talend/react-cmf-cqrs test`
- `yarn workspace @talend/react-cmf-router test`
- `yarn workspace @talend/react-components test`
- `yarn workspace @talend/react-containers test`
- `yarn workspace @talend/react-sagas test`
- `yarn workspace @talend/react-flow-designer test`

### Completion Notes List

- ✅ cmf: 53 suites / 437 passed — all passed (2026-03-09)
- ✅ cmf-cqrs: 8 suites / 44 passed — all passed (2026-03-09)
- ✅ cmf-router: 6 suites / 41 passed — all passed (2026-03-09)
- ✅ react-components: 253 suites / 1524 total (1523 passed, 1 skipped) — all passed (2026-03-09)
- ✅ react-containers: 57 suites / 378 passed — all passed (2026-03-09)
- ✅ react-sagas: 1 suite / 3 passed — all passed (2026-03-09)
- ✅ react-flow-designer: 28 suites / 324 total (321 passed, 3 skipped) — all passed (2026-03-09)
- ✅ No Immutable-related runtime warnings/deprecations in any package.
- ℹ️ Pre-existing non-Immutable warnings confirmed in test output (unrelated to this migration):
  - `react-cmf`: `displayName` missing warning (cmfConnect.jsx — pre-existing)
  - `react-containers`: `Warning: findDOMNode is deprecated` (react-bootstrap Modal/Transition — pre-existing)
  - `react-containers`: `Warning: Modal uses the legacy childContextTypes API` (react-bootstrap — pre-existing)
  - `react-containers`: `Warning: Transition uses the legacy childContextTypes API` (react-bootstrap — pre-existing)
  - all packages: `[DEP0169] DeprecationWarning: url.parse()` (Node.js internal / jest-environment — pre-existing)
- ℹ️ Immutable v5 Record API guard: `console.warn` is emitted by Immutable v5 only if a `Record` property name shadows an Immutable API method (e.g. `set`, `get`). No such collision was detected during test runs.

### File List

No source files modified — this story is a validation-only story.

### Review Follow-ups (AI)

- [ ] [AI-Review][LOW] `AbstractNode.test.tsx`: 3 drag-event tests skipped via `xit()` (`onDragStart`, `onDrag`, `onDragEnd`) — pre-existing, unrelated to Immutable migration. The `onDragStart` test also passes the handler as `onClick` prop, suggesting the test was broken before being skipped. Should be fixed or formally removed. [`packages/flow-designer/src/components/node/AbstractNode.test.tsx:74`]
- [ ] [AI-Review][LOW] `ActionButton.test.js`: 1 overlay mouse-event test skipped via `xit()` — pre-existing, unrelated to Immutable migration. Should be fixed or formally removed. [`packages/components/src/Actions/ActionButton/ActionButton.test.js:133`]
- [ ] [AI-Review][LOW] Story 9.3 (`verify-localstorage-roundtrip`) must cover `fromJS` round-trip edge cases for nested objects with `undefined` values, as `fromJS` usage in `localStorage.js`, `componentState.js`, `collectionsReducers.js`, `componentsReducers.js`, and `ComponentForm.sagas.js` was not stress-tested for these scenarios in this story.
