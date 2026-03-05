# Story 5.1: Run full test suite for v4 validation

Status: ready-for-dev

## Story

As a developer,
I want all unit tests across the entire monorepo to pass with Immutable v4,
so that I can confirm no regressions.

## Acceptance Criteria

1. `yarn test` at the root passes with zero failures
2. No Immutable-related warnings or errors across any package

## Tasks / Subtasks

- [ ] Run `yarn test` at root (AC: #1)
- [ ] Review any failures and fix (AC: #1)
- [ ] Verify no Immutable warnings (AC: #2)

## Dev Notes

- This is a validation gate — all per-package stories from Epics 1–4 must be complete.
- Expect no failures if Epics 2–4 were successful.
- If failures occur, trace back to the specific package and fix before proceeding.

### References

- [Source: _bmad-output/planning-artifacts/migration-immutable-v5.md#Étape 1.6]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
