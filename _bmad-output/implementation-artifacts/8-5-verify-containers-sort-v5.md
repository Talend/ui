# Story 8.5: Verify containers sort behavior with v5

Status: done

## Story

As a developer,
I want to confirm that custom comparators on Immutable List `.sort()` work identically in v5,
so that List sorting in containers is not affected.

## Acceptance Criteria

1. `yarn workspace @talend/react-containers test` passes
2. All sorting-related tests in `List/selector.test.js` pass without behavioral changes

## Tasks / Subtasks

- [x] Run containers test suite (AC: #1)
- [x] Focus on sorting tests in `packages/containers/src/List/selector.test.js` (AC: #2)
- [x] Fix any sort-related regressions if needed

## Dev Notes

- `packages/containers/src/List/selector.js` uses `.sort()` with custom comparators at L107, L111.
- Immutable v5 may have subtle differences in sort stability or comparator handling.
- Tests at `packages/containers/src/List/selector.test.js` L110 (`should sort a different column type correctly`) and L158 (`should test the getSortedResults method`) directly cover sort behavior.

### References

- [Source: packages/containers/src/List/selector.js#L107-L111]
- [Source: packages/containers/src/List/selector.test.js#L110-L156] (sort column types)
- [Source: packages/containers/src/List/selector.test.js#L158-L218] (getSortedResults)

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6

### Debug Log References

- No code changes required. Tests passed on first run.

### Completion Notes List

- AC #1 ✅: `yarn test` in `packages/containers` → 57 suites / 378 tests / 30 snapshots all green (immutable@5.1.4, declared `^5.0.2`).
- AC #2 ✅: 2 sort-specific tests in `List/selector.test.js` pass without behavioral changes:
  - `should sort a different column type correctly` (L110) — covers string lexicographic, integer numeric, and mixed-type comparisons via `compare()`
  - `should test the getSortedResults method` (L158) — covers custom `sortFunction`, asc/desc, empty state, null list, and edge-case inputs via `getSortedResults()`
- The full test suite (57 suites, 378 tests) additionally passes, confirming no wider regressions.
- Immutable v5 `.sort()` with custom comparators behaves identically to v4 — no behavioral regression.
- No code fixes required.

### File List

(no files modified — verification-only story)

### Change Log

| Date | Version | Description | Author |
|---|---|---|---|
| 2026-03-09 | 1.1 | Code review: corrected Completion Notes (2 sort tests, not 6), fixed Dev Notes line references (L110, L158), added Change Log, noted immutable@5.1.4 | Reviewer (AI) |
