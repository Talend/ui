# Story 4.1: Validate containers test suite with v4

Status: ready-for-dev

## Story

As a developer,
I want to confirm all `.toJS()` and `fromJS()` patterns in `packages/containers` work with Immutable v4,
so that the containers package is v4-certified.

## Acceptance Criteria

1. `yarn workspace @talend/react-containers test` passes with zero failures
2. All 40+ `.toJS()` calls behave identically (v4 does not change `.toJS()`)
3. All `fromJS()` calls in ComponentForm tests work correctly
4. No Immutable-related deprecation warnings appear

## Tasks / Subtasks

- [ ] Run containers test suite (AC: #1)
- [ ] Verify `.toJS()` behavior is unchanged (AC: #2)
- [ ] Verify `fromJS()` in ComponentForm tests (AC: #3)
- [ ] Review output for warnings (AC: #4)
- [ ] Fix any unexpected failures

## Dev Notes

- `containers` is a high-complexity package with 40+ `.toJS()` calls and 15+ files importing immutable.
- Key files: `Form.container.jsx` (8 `.toJS()` calls), `List.container.jsx`, `TreeView.container.jsx`.
- `.toJS()` and `fromJS()` behavior is unchanged between v3 and v4.
- `react-immutable-proptypes` remains compatible with v4 — will be removed in Epic 6.
- This is primarily a validation story — no code changes expected.

### References

- [Source: packages/containers/src/Form/Form.container.jsx]
- [Source: packages/containers/src/ComponentForm/ComponentForm.saga.test.js]
- [Source: packages/containers/src/ComponentForm/ComponentForm.test.js]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
