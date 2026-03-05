# Story 9.3: Verify CMF localStorage round-trip

Status: ready-for-dev

## Story

As a developer,
I want to verify that CMF's localStorage serialization/deserialization works with v5,
so that state persistence is not broken.

## Acceptance Criteria

1. `.toJS()` serialization produces valid JSON
2. `fromJS()` deserialization restores Immutable structures correctly
3. Nested Maps and Lists are properly restored
4. CMF localStorage tests pass

## Tasks / Subtasks

- [ ] Run localStorage-related tests in cmf (AC: #1, #2, #3, #4)
- [ ] Manually verify round-trip if needed
- [ ] Fix any serialization issues

## Dev Notes

- `packages/cmf/src/localStorage.js` uses `.toJS()` for serialization and `fromJS()` for deserialization.
- `.toJS()` and `fromJS()` behavior is unchanged in v5 — this is a verification story.

### References

- [Source: packages/cmf/src/localStorage.js]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
