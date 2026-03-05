# Story 3.3: Validate cmf-router tests with v4

Status: ready-for-dev

## Story

As a developer,
I want to confirm `packages/cmf-router` test suite passes with Immutable v4,
so that I can certify this package requires no code changes.

## Acceptance Criteria

1. cmf-router test suite passes with zero failures
2. No Immutable-related deprecation warnings appear

## Tasks / Subtasks

- [ ] Run cmf-router test suite (AC: #1)
- [ ] Review output for warnings (AC: #2)
- [ ] Fix any unexpected failures if needed

## Dev Notes

- `cmf-router` uses `new Map()` in `documentTitle.js` and its test file — this pattern is unchanged in v4.
- Immutable is an indirect dependency (not declared in cmf-router's package.json).

### References

- [Source: packages/cmf-router/src/sagas/documentTitle.js#L72]
- [Source: packages/cmf-router/src/sagas/documentTitle.test.js]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
