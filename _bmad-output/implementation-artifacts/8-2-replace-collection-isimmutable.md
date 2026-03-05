# Story 8.2: Replace Collection with isImmutable in components

Status: ready-for-dev

## Story

As a developer,
I want `ActionDropdown.component.jsx` to use `isImmutable()` instead of the v4 `Collection` pattern,
so that the check is simplified and fully v5-compatible.

## Acceptance Criteria

1. The Immutable type check in `ActionDropdown.component.jsx` uses `isImmutable()` from immutable
2. `yarn workspace @talend/react-components test` passes

## Tasks / Subtasks

- [ ] Verify `ActionDropdown.component.jsx` already uses `isImmutable()` from Story 3.1 (AC: #1)
  - [ ] If Story 3.1 used `isImmutable()` directly (recommended path), this story is a no-op verification
  - [ ] If Story 3.1 used `Collection`, replace with `import { isImmutable } from 'immutable'`
- [ ] Run tests (AC: #2)

## Dev Notes

- Story 3.1 was designed to use `isImmutable()` directly (available since v4) to avoid a second migration.
- If that recommendation was followed, this story is purely a verification step.
- If `Collection` was used instead, the migration is: `Collection.isKeyed(x) || Collection.isIndexed(x)` → `isImmutable(x)`.

### References

- [Source: packages/components/src/Actions/ActionDropdown/ActionDropdown.component.jsx#L7]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
