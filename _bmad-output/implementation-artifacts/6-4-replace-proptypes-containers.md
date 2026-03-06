# Story 6.4: Replace react-immutable-proptypes in containers

Status: done

## Story

As a developer,
I want all 4 container files to use custom validators,
so that containers no longer depends on `react-immutable-proptypes`.

## Acceptance Criteria

1. `ImmutablePropTypes` import removed from `ActionDropdown/ActionDropdown.connect.jsx`
2. `ImmutablePropTypes` import removed from `List/List.container.jsx`
3. `ImmutablePropTypes` import removed from `SelectObject/SelectObject.component.jsx`
4. `ImmutablePropTypes` import removed from `TreeView/TreeView.container.jsx`
5. All `ImmutablePropTypes.list` usages replaced with `immutableListPropType`
6. `yarn workspace @talend/react-containers test` passes

## Tasks / Subtasks

- [x] Update `ActionDropdown.connect.jsx` (AC: #1, #5)
  - [x] Replace `ImmutablePropTypes.list` at L53 with custom validator
- [x] Update `List.container.jsx` (AC: #2, #5)
  - [x] Replace `ImmutablePropTypes.list.isRequired` at L356 with `immutableListPropType.isRequired`
- [x] Update `SelectObject.component.jsx` (AC: #3, #5)
  - [x] Replace `ImmutablePropTypes.List` at L83, L88 with custom validator
- [x] Update `TreeView.container.jsx` (AC: #4, #5)
  - [x] Replace `ImmutablePropTypes.list` at L106 with custom validator
- [x] Run tests (AC: #6)

## Dev Notes

- Note: `SelectObject.component.jsx` uses capitalized `ImmutablePropTypes.List` (not `.list`) — check if this is intentional or a bug.
- 4 independent file changes — can be done in parallel.

### References

- [Source: packages/containers/src/ActionDropdown/ActionDropdown.connect.jsx#L2]
- [Source: packages/containers/src/List/List.container.jsx#L2]
- [Source: packages/containers/src/SelectObject/SelectObject.component.jsx#L1]
- [Source: packages/containers/src/TreeView/TreeView.container.jsx#L5]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6

### Debug Log References

- Initial test run failed: `immutableListPropType` was `undefined` — the cmf `lib/` build was stale (story 6.1 added new exports but `lib` had not been rebuilt). Fixed by running `yarn workspace @talend/react-cmf build:lib`.
- `SelectObject.component.jsx` used capitalized `ImmutablePropTypes.List` (not `.list`) — confirmed bug in original code, replaced with `immutableListPropType` (lowercase-consistent).
- 378/378 tests passed after rebuild.

### Completion Notes List

- `ActionDropdown.connect.jsx`: added `immutableListPropType` to the `@talend/react-cmf` named import, removed `react-immutable-proptypes` import.
- `List.container.jsx`: added `immutableListPropType` to cmf import, removed `react-immutable-proptypes` import, replaced `.list.isRequired` usage.
- `SelectObject.component.jsx`: replaced `import ImmutablePropTypes` with `import { immutableListPropType } from '@talend/react-cmf'`, replaced two `ImmutablePropTypes.List` usages.
- `TreeView.container.jsx`: added `immutableListPropType` to cmf import, removed `react-immutable-proptypes` import, replaced `.list` usage.
- Had to rebuild `@talend/react-cmf` (`build:lib`) because `lib/index.js` was stale. Added `packages/cmf/lib/**` to changed file list.
- 378/378 tests pass, no regressions.

### File List

- `packages/containers/src/ActionDropdown/ActionDropdown.connect.jsx` (modified)
- `packages/containers/src/List/List.container.jsx` (modified)
- `packages/containers/src/SelectObject/SelectObject.component.jsx` (modified)
- `packages/containers/src/TreeView/TreeView.container.jsx` (modified)
- `packages/cmf/lib/` (rebuilt — run `yarn workspace @talend/react-cmf build:lib` to regenerate)

## Senior Developer Review (AI)

**Reviewer:** Smouillour — 2026-03-06
**Outcome:** Approved

- All 6 ACs verified: 4 imports removed, all `.list` / `.List` usages replaced, 378/378 tests pass.
- Capitalized `ImmutablePropTypes.List` bug in SelectObject correctly normalized to lowercase.
- No issues found.
