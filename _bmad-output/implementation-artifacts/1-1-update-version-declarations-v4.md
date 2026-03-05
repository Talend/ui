# Story 1.1: Update version declarations to Immutable v4

Status: ready-for-dev

## Story

As a developer,
I want all Immutable.js version constraints updated to `^4.3.7`,
so that Yarn resolves a single v4.x version across the monorepo.

## Acceptance Criteria

1. `versions/dependencies.json` has `"immutable": "^4.3.7"`
2. `packages/cmf/package.json` dependencies has `"immutable": "^4.3.7"`
3. `packages/cmf-cqrs/package.json` dependencies has `"immutable": "^4.3.7"`
4. `packages/components/package.json` dependencies has `"immutable": "^4.3.7"`
5. `packages/containers/package.json` dependencies has `"immutable": "^4.3.7"`
6. `packages/sagas/package.json` dependencies has `"immutable": "^4.3.7"`
7. `packages/flow-designer/package.json` peerDependencies has `"immutable": "^4.0.0"`
8. `yarn install` succeeds without conflict
9. `yarn.lock` resolves a single immutable v4.x version

## Tasks / Subtasks

- [ ] Update `versions/dependencies.json` (AC: #1)
- [ ] Update `packages/cmf/package.json` (AC: #2)
- [ ] Update `packages/cmf-cqrs/package.json` (AC: #3)
- [ ] Update `packages/components/package.json` (AC: #4)
- [ ] Update `packages/containers/package.json` (AC: #5)
- [ ] Update `packages/sagas/package.json` (AC: #6)
- [ ] Update `packages/flow-designer/package.json` peerDependencies (AC: #7)
- [ ] Run `yarn install` and verify resolution (AC: #8, #9)

## Dev Notes

- This is the first step of the v3→v4 migration. All packages must be bumped simultaneously because Yarn workspaces hoists a single version.
- The version `^4.3.7` is the latest v4.x at time of planning.
- `flow-designer` uses `peerDependencies` (not `dependencies`), so set to `^4.0.0` for broader compatibility.
- After this story, tests will likely fail until Epics 2–4 fix v4 breaking changes.

### References

- [Source: _bmad-output/planning-artifacts/migration-immutable-v5.md#Phase 1 Step 1.0]
- [Source: versions/dependencies.json]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
