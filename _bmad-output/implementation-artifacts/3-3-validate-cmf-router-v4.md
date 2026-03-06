# Story 3.3: Validate cmf-router tests with v4

Status: done

## Story

As a developer,
I want to confirm `packages/cmf-router` test suite passes with Immutable v4,
so that I can certify this package requires no code changes.

## Acceptance Criteria

1. cmf-router test suite passes with zero failures
2. No Immutable-related deprecation warnings appear

## Tasks / Subtasks

- [x] Run cmf-router test suite (AC: #1)
- [x] Review output for warnings (AC: #2)
- [x] Fix any unexpected failures if needed

## Dev Notes

- `cmf-router` uses native JavaScript `new Map()` (not Immutable's Map) in `documentTitle.js` and its test file — this pattern is unchanged in v4.
- Immutable is an indirect dependency via `@talend/react-cmf` (not declared in cmf-router's own package.json).

### References

- [packages/cmf-router/src/sagas/documentTitle.js](packages/cmf-router/src/sagas/documentTitle.js)
- [packages/cmf-router/src/sagas/documentTitle.test.js](packages/cmf-router/src/sagas/documentTitle.test.js)

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6

### Debug Log References

- VS Code Jest extension ran tests with `jest-environment-node` (no jsdom), causing false `document is not defined` failure in `index.test.js`. The authoritative `talend-scripts test` run with `jest-environment-jsdom-global` passes all 41 tests.

### Completion Notes List

- ✅ AC #1: All 41 tests pass (6 suites: expressions, index, middleware, sagaRouter, selectors, documentTitle) via `yarn test` in `packages/cmf-router`.
- ✅ AC #2: Zero Immutable-related deprecation warnings in test output. `cmf-router` uses native `new Map()` (unchanged in Immutable v4), and Immutable is only an indirect dependency.
- No code changes required — package is fully compatible with Immutable v4 as-is.

### File List

_No source files modified — validation-only story._

## Change Log

- 2026-03-06: Validated cmf-router test suite (41/41) with Immutable v4. No failures, no deprecation warnings. No code changes needed.
- 2026-03-06: Code review — clarified native JS Map vs Immutable Map, fixed reference links.
