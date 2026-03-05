# Story 8.5: Verify containers sort behavior with v5

Status: ready-for-dev

## Story

As a developer,
I want to confirm that custom comparators on Immutable List `.sort()` work identically in v5,
so that List sorting in containers is not affected.

## Acceptance Criteria

1. `yarn workspace @talend/react-containers test` passes
2. All sorting-related tests in `List/selector.test.js` pass without behavioral changes

## Tasks / Subtasks

- [ ] Run containers test suite (AC: #1)
- [ ] Focus on sorting tests in `packages/containers/src/List/selector.test.js` (AC: #2)
- [ ] Fix any sort-related regressions if needed

## Dev Notes

- `packages/containers/src/List/selector.js` uses `.sort()` with custom comparators at L107, L111.
- Immutable v5 may have subtle differences in sort stability or comparator handling.
- Tests at `packages/containers/src/List/selector.test.js` L112, L124, L134, L137 cover sorting.

### References

- [Source: packages/containers/src/List/selector.js#L107-L111]
- [Source: packages/containers/src/List/selector.test.js#L112-L137]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
