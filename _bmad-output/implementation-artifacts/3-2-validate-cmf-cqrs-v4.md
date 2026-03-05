# Story 3.2: Validate cmf-cqrs tests with v4

Status: ready-for-dev

## Story

As a developer,
I want to confirm `packages/cmf-cqrs` test suite passes with Immutable v4,
so that I can certify this package requires no code changes.

## Acceptance Criteria

1. `yarn workspace @talend/react-cmf-cqrs test` passes with zero failures
2. No Immutable-related deprecation warnings appear

## Tasks / Subtasks

- [ ] Run cmf-cqrs test suite (AC: #1)
- [ ] Review output for warnings (AC: #2)
- [ ] Fix any unexpected failures if needed

## Dev Notes

- `cmf-cqrs` has minimal Immutable usage (1 file, 1 `.toJS()` call in `ACKDispatcher.test.js`).
- No API changes expected — this is a validation-only story.

### References

- [Source: packages/cmf-cqrs/src/components/ACKDispatcher/ACKDispatcher.test.js#L145]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
