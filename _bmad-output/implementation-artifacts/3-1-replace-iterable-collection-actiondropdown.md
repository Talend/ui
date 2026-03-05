# Story 3.1: Replace Iterable with Collection in ActionDropdown

Status: ready-for-dev

## Story

As a developer,
I want `ActionDropdown.component.jsx` to use `Collection` instead of `Iterable`,
so that it is compatible with Immutable v4 where `Iterable` was renamed to `Collection`.

## Acceptance Criteria

1. `import { Iterable } from 'immutable'` is replaced with an appropriate v4 import
2. `Iterable.isIterable(x)` calls are replaced with the v4 equivalent
3. `yarn workspace @talend/react-components test` passes

## Tasks / Subtasks

- [ ] Update import in `packages/components/src/Actions/ActionDropdown/ActionDropdown.component.jsx` (AC: #1)
  - [ ] Replace `import { Iterable } from 'immutable'` → `import { isImmutable } from 'immutable'`
- [ ] Replace usage (AC: #2)
  - [ ] Replace `Iterable.isIterable(x)` → `isImmutable(x)` (simpler API available since v4)
- [ ] Run tests (AC: #3)

## Dev Notes

- `Iterable` was renamed to `Collection` in Immutable v4. However, `isImmutable()` is a simpler replacement that was also added in v4 and works in v5.
- Using `isImmutable()` directly is preferred over `Collection` because it avoids a second migration in the v5 phase.
- The component uses `Iterable.isIterable()` to check if children are Immutable data structures before calling `.toJS()`.

### References

- [Source: packages/components/src/Actions/ActionDropdown/ActionDropdown.component.jsx#L7]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
