# Story 6.3: Replace react-immutable-proptypes in components

Status: ready-for-dev

## Story

As a developer,
I want `ActionDropdown.component.jsx` to use custom validators,
so that components no longer depends on `react-immutable-proptypes`.

## Acceptance Criteria

1. `import ImmutablePropTypes from 'react-immutable-proptypes'` is removed from `ActionDropdown.component.jsx`
2. `ImmutablePropTypes.list` at L326 is replaced with the custom `immutableListPropType` validator
3. `yarn workspace @talend/react-components test` passes

## Tasks / Subtasks

- [ ] Import custom validator in `ActionDropdown.component.jsx` (AC: #1)
- [ ] Replace `ImmutablePropTypes.list` usage (AC: #2)
- [ ] Remove `react-immutable-proptypes` import (AC: #1)
- [ ] Run tests (AC: #3)

## Dev Notes

- This file also had `Iterable` replaced in Story 3.1 — ensure both changes are compatible.
- The `items` prop accepts an Immutable List for dropdown menu items.

### References

- [Source: packages/components/src/Actions/ActionDropdown/ActionDropdown.component.jsx#L4]
- [Source: packages/components/src/Actions/ActionDropdown/ActionDropdown.component.jsx#L326]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
