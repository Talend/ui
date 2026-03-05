# Story 7.1: Update version declarations to Immutable v5

Status: ready-for-dev

## Story

As a developer,
I want all Immutable.js version constraints updated to `^5.0.2`,
so that Yarn resolves a single v5.x version across the monorepo.

## Acceptance Criteria

1. `versions/dependencies.json` has `"immutable": "^5.0.2"`
2. `packages/cmf/package.json` dependencies has `"immutable": "^5.0.2"`
3. `packages/cmf-cqrs/package.json` dependencies has `"immutable": "^5.0.2"`
4. `packages/components/package.json` dependencies has `"immutable": "^5.0.2"`
5. `packages/containers/package.json` dependencies has `"immutable": "^5.0.2"`
6. `packages/sagas/package.json` dependencies has `"immutable": "^5.0.2"`
7. `packages/flow-designer/package.json` peerDependencies has `"immutable": "^5.0.0"`
8. `yarn install` succeeds without conflict
9. `yarn.lock` resolves a single immutable v5.x version

## Tasks / Subtasks

- [ ] Update `versions/dependencies.json` (AC: #1)
- [ ] Update all 5 package.json dependencies (AC: #2–6)
- [ ] Update flow-designer peerDependencies (AC: #7)
- [ ] Run `yarn install` (AC: #8, #9)

## Dev Notes

- Epic 6 (react-immutable-proptypes removal) must be complete before this story.
- Tests will likely fail after this bump until Epic 8 addresses v5 breaking changes.

### References

- [Source: _bmad-output/planning-artifacts/migration-immutable-v5.md#Étape 2.0]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
