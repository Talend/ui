# Story 8.6: Validate all packages with v5

Status: ready-for-dev

## Story

As a developer,
I want to run the test suite for every package that uses Immutable,
so that all v5 breaking changes have been addressed.

## Acceptance Criteria

1. `yarn workspace @talend/react-cmf test` passes
2. `yarn workspace @talend/react-cmf-cqrs test` passes
3. cmf-router tests pass
4. `yarn workspace @talend/react-components test` passes
5. `yarn workspace @talend/react-containers test` passes
6. sagas tests pass
7. `yarn workspace @talend/react-flow-designer test` passes
8. No Immutable-related deprecation warnings in any package

## Tasks / Subtasks

- [ ] Run cmf tests (AC: #1)
- [ ] Run cmf-cqrs tests (AC: #2)
- [ ] Run cmf-router tests (AC: #3)
- [ ] Run components tests (AC: #4)
- [ ] Run containers tests (AC: #5)
- [ ] Run sagas tests (AC: #6)
- [ ] Run flow-designer tests (AC: #7)
- [ ] Review all outputs for warnings (AC: #8)
- [ ] Fix any remaining failures

## Dev Notes

- This is the comprehensive per-package validation before the final global test suite.
- All stories 8.1–8.5 must be complete.
- Running per-package allows targeted debugging of any remaining issues.

### References

- [Source: _bmad-output/planning-artifacts/migration-immutable-v5.md#Étape 2.8]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
