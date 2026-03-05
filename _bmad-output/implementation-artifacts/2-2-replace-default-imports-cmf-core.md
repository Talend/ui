# Story 2.2: Replace default imports in cmf core files

Status: review

## Story

As a developer,
I want `componentState.js`, `onEvent.js`, and `localStorage.js` to use named imports,
so that the cmf core module is fully v4-compatible.

## Acceptance Criteria

1. `componentState.js` uses `import { Map, fromJS } from 'immutable'` instead of default import
2. All `Immutable.Map.isMap()` calls become `Map.isMap()` in componentState.js
3. All `Immutable.fromJS()` calls become `fromJS()` in componentState.js
4. `onEvent.js` uses named imports instead of default import
5. `localStorage.js` uses named imports instead of default import
6. `selectors/toJS.js` is verified (already uses duck-typing, no Immutable import needed)
7. `yarn workspace @talend/react-cmf test` passes

## Tasks / Subtasks

- [x] Update `packages/cmf/src/componentState.js` (AC: #1, #2, #3)
  - [x] Replace `import Immutable from 'immutable'` → `import { Map, fromJS } from 'immutable'`
  - [x] Replace `Immutable.Map.isMap(initialState)` → `Map.isMap(initialState)`
  - [x] Replace `Immutable.fromJS(initialState)` → `fromJS(initialState)`
- [x] Update `packages/cmf/src/onEvent.js` (AC: #4)
  - [x] Replace `import Immutable from 'immutable'` → `import { Map } from 'immutable'`
  - [x] Replace all `Immutable.Map` references with `Map`
- [x] Update `packages/cmf/src/localStorage.js` (AC: #5)
  - [x] Replace `import Immutable from 'immutable'` → `import { fromJS } from 'immutable'`
  - [x] Replace `Immutable.fromJS()` → `fromJS()`
- [x] Verify `packages/cmf/src/selectors/toJS.js` (AC: #6)
  - [x] Confirm it uses duck-typing (`typeof data.toJS === 'function'`), no import change needed
- [x] Run tests (AC: #7)

## Dev Notes

- `componentState.js` is the most complex — it uses both `Map.isMap()` and `fromJS()`.
- `onEvent.js` uses `Immutable.Map` for creating event payloads.
- `localStorage.js` uses `fromJS()` to deserialize state from localStorage.
- `selectors/toJS.js` does NOT import immutable — it uses duck-typing to check for `.toJS()` method. No changes needed.
- Mock files (`mock/collections.js`, `mock/components.js`) already use named imports — no changes needed.

### References

- [Source: packages/cmf/src/componentState.js#L2]
- [Source: packages/cmf/src/onEvent.js#L2]
- [Source: packages/cmf/src/localStorage.js#L1]
- [Source: packages/cmf/src/selectors/toJS.js#L1]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6

### Debug Log References

No issues encountered. All replacements were straightforward identifier substitutions.

### Completion Notes List

- `componentState.js`: Replaced default `Immutable` import with `{ Map, fromJS }`. Updated `Immutable.Map.isMap()` → `Map.isMap()` and `Immutable.fromJS()` → `fromJS()` in `getStateAccessors.initState()`.
- `onEvent.js`: Replaced default `Immutable` import with `{ Map }`. Updated `new Immutable.Map()` → `new Map()` for `INITIAL_STATE`.
- `localStorage.js`: Replaced default `Immutable` import with `{ fromJS }`. Updated both `Immutable.fromJS()` calls to `fromJS()`.
- `selectors/toJS.js`: Verified — uses duck-typing (`typeof data.toJS === 'function'`), no Immutable import present, no changes needed.
- All 52 test suites passed (417 tests, 18 snapshots) with `yarn workspace @talend/react-cmf test`.

### File List

- packages/cmf/src/componentState.js
- packages/cmf/src/onEvent.js
- packages/cmf/src/localStorage.js
- packages/cmf/__tests__/componentState.test.js (review fix)
- packages/cmf/__tests__/onEvent.test.js (review fix)
- packages/cmf/__tests__/localStorage.test.js (review fix)
- packages/cmf/src/cmfConnect.md (review fix)

## Senior Developer Review (AI)

**Reviewer:** Smouillour — 2026-03-05
**Outcome:** Approved with fixes applied

### Findings & Fixes

| #        | Severity | Issue                                                                               | Status                    |
| -------- | -------- | ----------------------------------------------------------------------------------- | ------------------------- |
| MEDIUM-1 | 🟡       | Changes staged but not committed — not visible in git log                           | ⚠️ User action needed     |
| MEDIUM-2 | 🟡       | `cmfConnect.md` documentation used old `Immutable.Map` / `Immutable.fromJS` pattern | ✅ Fixed                  |
| MEDIUM-3 | 🟡       | Test files still used `import Immutable from 'immutable'` default import pattern    | ✅ Fixed                  |
| LOW-1    | 🟢       | `onEvent.md` mentions immutable in narrative context                                | Accepted (no code impact) |

### AC Validation

All 7 Acceptance Criteria verified as IMPLEMENTED. All 16 tests pass (4 snapshots).

## Change Log

- 2026-03-05: Replace default Immutable imports with named imports in componentState.js, onEvent.js, localStorage.js (Story 2.2)
- 2026-03-05: [Review] Fix named imports in test files and update cmfConnect.md documentation
