# Story 3.1: Replace Iterable with Collection in ActionDropdown

Status: done

## Story

As a developer,
I want `ActionDropdown.component.jsx` to use `Collection` instead of `Iterable`,
so that it is compatible with Immutable v4 where `Iterable` was renamed to `Collection`.

## Acceptance Criteria

1. `import { Iterable } from 'immutable'` is replaced with an appropriate v4 import
2. `Iterable.isIterable(x)` calls are replaced with the v4 equivalent
3. `yarn workspace @talend/react-components test` passes

## Tasks / Subtasks

- [x] Update import in `packages/components/src/Actions/ActionDropdown/ActionDropdown.component.jsx` (AC: #1)
  - [x] Replace `import { Iterable } from 'immutable'` → `import { isImmutable } from 'immutable'`
- [x] Replace usage (AC: #2)
  - [x] Replace `Iterable.isIterable(x)` → `isImmutable(x)` (simpler API available since v4)
- [x] Run tests (AC: #3)
- [x] Code review fixes applied (2026-03-05)
  - [x] Corrected test suite name in Completion Notes (was ActionDropdownItems.test.js → ActionDropdown.snapshot.test.js)
  - [x] Added direct `getMenuItem` unit test with Immutable Map argument in ActionDropdown.test.js

## Dev Notes

- `Iterable` was renamed to `Collection` in Immutable v4. However, `isImmutable()` is a simpler replacement that was also added in v4 and works in v5.
- Using `isImmutable()` directly is preferred over `Collection` because it avoids a second migration in the v5 phase.
- The component uses `Iterable.isIterable()` to check if children are Immutable data structures before calling `.toJS()`.

### References

- [Source: packages/components/src/Actions/ActionDropdown/ActionDropdown.component.jsx#L7]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6 (GitHub Copilot)

### Debug Log References

None — implementation straightforward, no debug issues encountered.

### Completion Notes List

- Replaced `import { Iterable } from 'immutable'` with `import { isImmutable } from 'immutable'` in `ActionDropdown.component.jsx` (line 7)
- Replaced `Iterable.isIterable(item)` with `isImmutable(item)` in `getMenuItem()` function (line 99)
- `isImmutable()` is preferred over `Collection.isCollection()` as it works in both v4 and v5, avoiding a second migration
- All 24 tests passed across 2 test suites (ActionDropdown.test.js, ActionDropdown.snapshot.test.js)
- Code review [M2] fix: added direct `getMenuItem` test with Immutable Map to [ActionDropdown.test.js](packages/components/src/Actions/ActionDropdown/ActionDropdown.test.js) → 15 tests pass in ActionDropdown.test.js

### File List

- packages/components/src/Actions/ActionDropdown/ActionDropdown.component.jsx
- packages/components/src/Actions/ActionDropdown/ActionDropdown.test.js

## Change Log

- 2026-03-05: Replaced `Iterable` import and `Iterable.isIterable()` call with `isImmutable()` for Immutable v4 compatibility (Story 3.1)
- 2026-03-05: Code review — corrected test file name in notes; added direct Immutable Map test for `getMenuItem` (Story 3.1 post-review)
