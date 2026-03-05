# Story 2.3: Validate cmf test suite with v4

Status: done

## Story

As a developer,
I want the full cmf test suite to pass after the import migrations,
so that the core framework is certified v4-compatible.

## Acceptance Criteria

1. `yarn workspace @talend/react-cmf test` passes with zero failures
2. No Immutable-related deprecation warnings in test output
3. All reducers (componentsReducers, collectionsReducers) pass — they already use named imports
4. All selectors (collections.js) pass — already uses named import

## Tasks / Subtasks

- [x] Run full cmf test suite (AC: #1)
- [x] Review test output for deprecation warnings (AC: #2)
- [x] Fix any unexpected failures in reducers (AC: #3)
- [x] Fix any unexpected failures in selectors (AC: #4)

## Dev Notes

- Stories 2.1 and 2.2 must be completed first.
- The reducers (`componentsReducers.js`, `collectionsReducers.js`) already use `import { Map, fromJS } from 'immutable'` — no changes expected.
- The selector `collections.js` already uses `import { List } from 'immutable'` — no changes expected.
- This story is primarily a validation gate.

### References

- [Source: packages/cmf/src/reducers/componentsReducers.js#L6]
- [Source: packages/cmf/src/reducers/collectionsReducers.js#L4]
- [Source: packages/cmf/src/selectors/collections.js#L1]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6

### Debug Log References

- Ran `yarn test` in `packages/cmf` — 52 suites, 417 tests, 18 snapshots — all pass (exit 0).
- Grep for Immutable/deprecation warnings: no Immutable.js-specific warnings found; only Node.js DEP0169 (`url.parse`) and React `defaultProps` warnings unrelated to this migration.
- Confirmed named imports in all three referenced source files.

### Completion Notes List

- **AC #1**: `yarn test` in `packages/cmf` — 52 suites, 417 tests, 0 failures ✅
- **AC #2**: No Immutable-related deprecation warnings in test output ✅
- **AC #3**: `componentsReducers.js` uses `import { Map, fromJS } from 'immutable'` — all 417 tests pass, no reducer failures ✅
- **AC #4**: `collections.js` selector uses `import { List } from 'immutable'` — all selector tests pass ✅
- This story was a pure validation gate — no source files were modified.

### File List

- packages/cmf/__tests__/expressions/index.test.js (review fix: default→named imports)
- packages/cmf/__tests__/selectors/toJS.test.js (review fix: default→named imports)
- packages/cmf/__tests__/sagas/collection.test.js (review fix: default→named imports)

## Change Log

- 2026-03-05: Validated cmf test suite with immutable v4 named imports — 52 suites / 417 tests pass, zero Immutable deprecation warnings (story 2-3-validate-cmf-tests-v4)
- 2026-03-05: [Code Review] Migrated 3 test files from `import Immutable from 'immutable'` to named imports (`{ Map }`, `{ Map, List }`): `__tests__/expressions/index.test.js`, `__tests__/selectors/toJS.test.js`, `__tests__/sagas/collection.test.js` — all 417 tests still pass
