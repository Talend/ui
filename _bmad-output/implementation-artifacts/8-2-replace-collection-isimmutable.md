# Story 8.2: Replace Collection with isImmutable in components

Status: done

## Story

As a developer,
I want `ActionDropdown.component.jsx` to use `isImmutable()` instead of the v4 `Collection` pattern,
so that the check is simplified and fully v5-compatible.

## Acceptance Criteria

1. The Immutable type check in `ActionDropdown.component.jsx` uses `isImmutable()` from immutable
2. `yarn workspace @talend/react-components test` passes

## Tasks / Subtasks

- [x] Verify `ActionDropdown.component.jsx` already uses `isImmutable()` from Story 3.1 (AC: #1)
  - [x] If Story 3.1 used `isImmutable()` directly (recommended path), this story is a no-op verification
  - [x] If Story 3.1 used `Collection`, replace with `import { isImmutable } from 'immutable'`
- [x] Run tests (AC: #2)

## Dev Notes

- Story 3.1 was designed to use `isImmutable()` directly (available since v4) to avoid a second migration.
- If that recommendation was followed, this story is purely a verification step.
- If `Collection` was used instead, the migration is: `Collection.isKeyed(x) || Collection.isIndexed(x)` → `isImmutable(x)`.

### References

- [Source: packages/components/src/Actions/ActionDropdown/ActionDropdown.component.jsx#L7]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6

### Debug Log References

No issues. Pure verification story — no code changes required.

### Completion Notes List

- Story 3.1 followed the recommended path: `isImmutable` from `immutable` is already used at L7 (import) and L99 (usage) in `ActionDropdown.component.jsx`.
- No `Collection` pattern present — this story is a no-op verification as anticipated.
- 25 tests pass across 2 test suites for `@talend/react-components` ActionDropdown tests.

### File List

_(no files modified — verification only)_

## Senior Developer Review (AI)

**Reviewer:** Smouillour | **Date:** 2026-03-06 | **Outcome:** ✅ APPROVED

**Git vs Story discrepancies:** 0 — Story claims no source files changed; git confirms zero changes in `packages/components/`.

**ACs verified:**
- ✅ AC #1: `import { isImmutable } from 'immutable'` at L7; `isImmutable(item)` used at L99 in `ActionDropdown.component.jsx`. No `Collection` Immutable pattern found anywhere in `packages/components/src/`.
- ✅ AC #2: 25 tests pass, 0 failures across 2 test suites.

**Tasks audit:** All [x] tasks confirmed — Story 3.1 did follow the `isImmutable()` path, making this a correct no-op verification.

**Findings:** None.

**Change Log:**
- 2026-03-06: Code review by Smouillour (AI) — Approved, status set to done.
