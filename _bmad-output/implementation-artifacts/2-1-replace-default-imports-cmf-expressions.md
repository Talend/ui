# Story 2.1: Replace default imports in cmf expression files

Status: ready-for-dev

## Story

As a developer,
I want the 4 expression files to use named imports instead of `import Immutable from 'immutable'`,
so that they are compatible with Immutable v4 which removed the default export.

## Acceptance Criteria

1. `getInState.js` uses `import { Map } from 'immutable'` instead of default import
2. `allOf.js` uses `import { Map } from 'immutable'` instead of default import
3. `includes.js` uses `import { Map, List } from 'immutable'` instead of default import
4. `oneOf.js` uses `import { Map } from 'immutable'` instead of default import
5. All `Immutable.Map` references become `Map`, `Immutable.List` becomes `List`
6. `yarn workspace @talend/react-cmf test` passes for expression-related tests

## Tasks / Subtasks

- [ ] Update `packages/cmf/src/expressions/getInState.js` (AC: #1, #5)
  - [ ] Replace `import Immutable from 'immutable'` → `import { Map } from 'immutable'`
  - [ ] Replace `new Immutable.Map()` → `new Map()`
- [ ] Update `packages/cmf/src/expressions/allOf.js` (AC: #2, #5)
  - [ ] Replace `import Immutable from 'immutable'` → `import { Map } from 'immutable'`
  - [ ] Replace `new Immutable.Map()` → `new Map()`
- [ ] Update `packages/cmf/src/expressions/includes.js` (AC: #3, #5)
  - [ ] Replace `import Immutable from 'immutable'` → `import { Map, List } from 'immutable'`
  - [ ] Replace `new Immutable.Map()` → `new Map()`, `new Immutable.List()` → `new List()`
- [ ] Update `packages/cmf/src/expressions/oneOf.js` (AC: #4, #5)
  - [ ] Replace `import Immutable from 'immutable'` → `import { Map } from 'immutable'`
  - [ ] Replace `new Immutable.Map()` → `new Map()`
- [ ] Run tests (AC: #6)

## Dev Notes

- Each expression file follows the same pattern: imports `Immutable` as default, uses `new Immutable.Map()` as fallback value in `_get()` calls.
- `includes.js` also uses `new Immutable.List()` — needs both `Map` and `List` imports.
- The expression functions are registered via CMF's expression system and tested via `packages/cmf/__tests__/expressions/`.

### References

- [Source: packages/cmf/src/expressions/getInState.js#L2]
- [Source: packages/cmf/src/expressions/allOf.js#L2]
- [Source: packages/cmf/src/expressions/includes.js#L2]
- [Source: packages/cmf/src/expressions/oneOf.js#L2]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
