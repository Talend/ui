# Story 9.1: Run full test suite and build validation

Status: ready-for-dev

## Story

As a developer,
I want all unit tests and builds to pass across the entire monorepo,
so that the v5 migration is confirmed stable.

## Acceptance Criteria

1. `yarn test` at the root passes with zero failures
2. `yarn build:lib` succeeds without errors
3. `yarn build:lib:esm` succeeds without errors
4. `tsc --noEmit` succeeds in all TypeScript packages

## Tasks / Subtasks

- [ ] Run `yarn test` at root (AC: #1)
- [ ] Run `yarn build:lib` (AC: #2)
- [ ] Run `yarn build:lib:esm` (AC: #3)
- [ ] Run TypeScript checks in TS packages (AC: #4)
- [ ] Fix any remaining issues

## Dev Notes

- This is the final validation gate for the entire v5 migration.
- All Epics 6–8 must be complete.

### References

- [Source: _bmad-output/planning-artifacts/migration-immutable-v5.md#Étape 2.8]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
