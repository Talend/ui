# Story 6.3: Replace react-immutable-proptypes in components

Status: done

## Story

As a developer,
I want `ActionDropdown.component.jsx` to use custom validators,
so that components no longer depends on `react-immutable-proptypes`.

## Acceptance Criteria

1. `import ImmutablePropTypes from 'react-immutable-proptypes'` is removed from `ActionDropdown.component.jsx`
2. `ImmutablePropTypes.list` at L326 is replaced with the custom `immutableListPropType` validator
3. `yarn workspace @talend/react-components test` passes

## Tasks / Subtasks

- [x] Import custom validator in `ActionDropdown.component.jsx` (AC: #1)
- [x] Replace `ImmutablePropTypes.list` usage (AC: #2)
- [x] Remove `react-immutable-proptypes` import (AC: #1)
- [x] Run tests (AC: #3)

## Dev Notes

- This file also had `Iterable` replaced in Story 3.1 — ensure both changes are compatible.
- The `items` prop accepts an Immutable List for dropdown menu items.

### References

- [Source: packages/components/src/Actions/ActionDropdown/ActionDropdown.component.jsx#L4]
- [Source: packages/components/src/Actions/ActionDropdown/ActionDropdown.component.jsx#L326]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6

### Debug Log References

- `packages/components` does not depend on `@talend/react-cmf` (flagged in story 6.1 review). Created a local `immutableListPropType` in `packages/components/src/propTypes/immutable.js`.
- 25/25 tests passed.

### Completion Notes List

- Created `packages/components/src/propTypes/immutable.js` with local `immutableListPropType` (mirrors the cmf version, same `List.isList()` check).
- Replaced `import ImmutablePropTypes from 'react-immutable-proptypes'` with `import { immutableListPropType } from '../../propTypes/immutable'`.
- Replaced `ImmutablePropTypes.list` with `immutableListPropType` in `ActionDropdown.propTypes.items`.
- 25/25 tests pass, no regressions.

### File List

- `packages/components/src/Actions/ActionDropdown/ActionDropdown.component.jsx` (modified)
- `packages/components/src/propTypes/immutable.js` (created)
- `packages/components/src/propTypes/immutable.test.js` (created — review fix)

## Senior Developer Review (AI)

**Reviewer:** Smouillour — 2026-03-06
**Outcome:** Approved (with fixes applied)

- All ACs verified: import removed, `ImmutablePropTypes.list` replaced, 25/25 tests pass.
- **H1 FIXED**: Added 10 unit tests for the new `immutableListPropType` local module (was untested).
- **L1 FIXED**: Added cross-reference comment in `immutable.js` pointing to the canonical version in cmf.
