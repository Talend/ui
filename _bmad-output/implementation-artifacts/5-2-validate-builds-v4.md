# Story 5.2: Validate CJS and ESM builds

Status: ready-for-dev

## Story

As a developer,
I want all packages to compile successfully in both CJS and ESM formats,
so that the build pipeline is unbroken.

## Acceptance Criteria

1. `yarn build:lib` succeeds without errors
2. `yarn build:lib:esm` succeeds without errors
3. No Immutable-related build warnings

## Tasks / Subtasks

- [ ] Run `yarn build:lib` (AC: #1)
- [ ] Run `yarn build:lib:esm` (AC: #2)
- [ ] Review build output for warnings (AC: #3)

## Dev Notes

- CJS and ESM builds use different Babel configs — both must be tested.
- Named imports (`import { Map } from 'immutable'`) are compatible with both CJS and ESM.

### References

- [Source: _bmad-output/planning-artifacts/migration-immutable-v5.md#Étape 1.6]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
