# Story 2.1: Replace default imports in cmf expression files

Status: done

## Story

As a developer,
I want the 4 expression files to use named imports instead of `import Immutable from 'immutable'`,
so that they are compatible with Immutable v4 which removed the default export.

## Acceptance Criteria

1. `getInState.js` uses `import { Map } from 'immutable'` instead of default import
2. `allOf.js` uses `import { Map, List } from 'immutable'` instead of default import
3. `includes.js` uses `import { Map, List } from 'immutable'` instead of default import
4. `oneOf.js` uses `import { Map, List } from 'immutable'` instead of default import
5. All `Immutable.Map` references become `Map`, `Immutable.List` becomes `List`
6. `yarn workspace @talend/react-cmf test` passes for expression-related tests

## Tasks / Subtasks

- [x] Update `packages/cmf/src/expressions/getInState.js` (AC: #1, #5)
  - [x] Replace `import Immutable from 'immutable'` → `import { Map } from 'immutable'`
  - [x] Replace `new Immutable.Map()` → `new Map()`
- [x] Update `packages/cmf/src/expressions/allOf.js` (AC: #2, #5)
  - [x] Replace `import Immutable from 'immutable'` → `import { Map, List } from 'immutable'`
  - [x] Replace `new Immutable.Map()` → `new Map()`, `new Immutable.List()` → `new List()`
- [x] Update `packages/cmf/src/expressions/includes.js` (AC: #3, #5)
  - [x] Replace `import Immutable from 'immutable'` → `import { Map, List } from 'immutable'`
  - [x] Replace `new Immutable.Map()` → `new Map()`, `new Immutable.List()` → `new List()`
- [x] Update `packages/cmf/src/expressions/oneOf.js` (AC: #4, #5)
  - [x] Replace `import Immutable from 'immutable'` → `import { Map, List } from 'immutable'`
  - [x] Replace `new Immutable.Map()` → `new Map()`, `new Immutable.List()` → `new List()`
- [x] Run tests (AC: #6)

## Dev Notes

- Each expression file follows the same pattern: imports `Immutable` as default, uses `new Immutable.Map()` as fallback value in `_get()` calls.
- `allOf.js`, `oneOf.js`, and `includes.js` also use `new Immutable.List()` — they need both `Map` and `List` imports.
- The expression functions are registered via CMF's expression system and tested via `packages/cmf/__tests__/expressions/`.

### References

- [Source: packages/cmf/src/expressions/getInState.js#L2]
- [Source: packages/cmf/src/expressions/allOf.js#L2]
- [Source: packages/cmf/src/expressions/includes.js#L2]
- [Source: packages/cmf/src/expressions/oneOf.js#L2]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6

### Debug Log References

_None._

### Completion Notes List

- Replaced default `import Immutable from 'immutable'` with named imports in all 4 expression files.
- `allOf.js` and `oneOf.js` also used `Immutable.List` (not explicitly noted in subtasks but required by AC #5) — added `List` to their imports as well.
- All 18 expression tests pass with no regressions.

### File List

- packages/cmf/src/expressions/getInState.js
- packages/cmf/src/expressions/allOf.js
- packages/cmf/src/expressions/includes.js
- packages/cmf/src/expressions/oneOf.js

### Change Log

- Replace default Immutable imports with named imports in cmf expression files (Date: 2026-03-05)
- [Code Review] Fixed ACs #2/#4, subtasks for allOf/oneOf to reflect List import; updated index.md docs (Date: 2026-03-05)
