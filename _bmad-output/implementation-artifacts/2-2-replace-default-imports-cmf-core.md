# Story 2.2: Replace default imports in cmf core files

Status: ready-for-dev

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

- [ ] Update `packages/cmf/src/componentState.js` (AC: #1, #2, #3)
  - [ ] Replace `import Immutable from 'immutable'` → `import { Map, fromJS } from 'immutable'`
  - [ ] Replace `Immutable.Map.isMap(initialState)` → `Map.isMap(initialState)`
  - [ ] Replace `Immutable.fromJS(initialState)` → `fromJS(initialState)`
- [ ] Update `packages/cmf/src/onEvent.js` (AC: #4)
  - [ ] Replace `import Immutable from 'immutable'` → `import { Map } from 'immutable'`
  - [ ] Replace all `Immutable.Map` references with `Map`
- [ ] Update `packages/cmf/src/localStorage.js` (AC: #5)
  - [ ] Replace `import Immutable from 'immutable'` → `import { fromJS } from 'immutable'`
  - [ ] Replace `Immutable.fromJS()` → `fromJS()`
- [ ] Verify `packages/cmf/src/selectors/toJS.js` (AC: #6)
  - [ ] Confirm it uses duck-typing (`typeof data.toJS === 'function'`), no import change needed
- [ ] Run tests (AC: #7)

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

### Debug Log References

### Completion Notes List

### File List
