# Story 6.2: Replace react-immutable-proptypes in cmf

Status: done

## Story

As a developer,
I want `packages/cmf/src/cmfConnect.jsx` to use custom validators,
so that cmf no longer depends on `react-immutable-proptypes`.

## Acceptance Criteria

1. `import ImmutablePropTypes from 'react-immutable-proptypes'` is removed from `cmfConnect.jsx`
2. `ImmutablePropTypes.map` at L395 is replaced with the custom `immutableMapPropType` validator
3. `ImmutablePropTypes.map` at L396 (for `initialState`) is replaced appropriately
4. `yarn workspace @talend/react-cmf test` passes

## Tasks / Subtasks

- [x] Import custom validator in `cmfConnect.jsx` (AC: #1)
- [x] Replace `ImmutablePropTypes.map` usage at L395-396 (AC: #2, #3)
  - [x] `state: ImmutablePropTypes.map` → `state: immutableMapPropType`
  - [x] `initialState: PropTypes.oneOfType([ImmutablePropTypes.map, PropTypes.object])` → custom
- [x] Remove `react-immutable-proptypes` import (AC: #1)
- [x] Run tests (AC: #4)

## Dev Notes

- `cmfConnect.jsx` is the core HOC that connects React components to the CMF framework.
- The `state` propType validates that the component state is an Immutable.Map.
- The `initialState` propType accepts either an Immutable.Map or a plain object.
- Story 6.1 must be completed first to have the custom validators available.

### References

- [Source: packages/cmf/src/cmfConnect.jsx#L27]
- [Source: packages/cmf/src/cmfConnect.jsx#L395-L396]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6

### Debug Log References

- All 40 cmfConnect tests passed after import swap.

### Completion Notes List

- Replaced `import ImmutablePropTypes from 'react-immutable-proptypes'` with `import { immutableMapPropType } from './propTypes/immutable'`.
- Replaced both `ImmutablePropTypes.map` usages in `cmfConnect.propTypes` with `immutableMapPropType`.
- 40/40 tests pass, no regressions.

### File List

- `packages/cmf/src/cmfConnect.jsx` (modified)

## Senior Developer Review (AI)

**Reviewer:** Smouillour — 2026-03-06
**Outcome:** Approved

- All ACs verified against git diff: import removed, both `ImmutablePropTypes.map` usages replaced, 40/40 tests pass.
- No issues found. Clean, minimal change.
