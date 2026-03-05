# Story 6.4: Replace react-immutable-proptypes in containers

Status: ready-for-dev

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

- [ ] Update `ActionDropdown.connect.jsx` (AC: #1, #5)
  - [ ] Replace `ImmutablePropTypes.list` at L53 with custom validator
- [ ] Update `List.container.jsx` (AC: #2, #5)
  - [ ] Replace `ImmutablePropTypes.list.isRequired` at L356 with `immutableListPropType.isRequired`
- [ ] Update `SelectObject.component.jsx` (AC: #3, #5)
  - [ ] Replace `ImmutablePropTypes.List` at L83, L88 with custom validator
- [ ] Update `TreeView.container.jsx` (AC: #4, #5)
  - [ ] Replace `ImmutablePropTypes.list` at L106 with custom validator
- [ ] Run tests (AC: #6)

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

### Debug Log References

### Completion Notes List

### File List
