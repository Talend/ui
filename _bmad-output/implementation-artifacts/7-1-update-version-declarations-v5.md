# Story 7.1: Update version declarations to Immutable v5

Status: done

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

- [x] Update `versions/dependencies.json` (AC: #1)
- [x] Update all 5 package.json dependencies (AC: #2–6)
- [x] Update flow-designer peerDependencies (AC: #7)
- [x] Run `yarn install` (AC: #8, #9)

## Dev Notes

- Epic 6 (react-immutable-proptypes removal) must be complete before this story.
- Tests will likely fail after this bump until Epic 8 addresses v5 breaking changes.

### References

- [Source: _bmad-output/planning-artifacts/migration-immutable-v5.md#Étape 2.0]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6

### Debug Log References

N/A

### Completion Notes List

- Updated `versions/dependencies.json`: `immutable` `^4.3.7` → `^5.0.2`
- Updated 5 package dependencies to `^5.0.2`: cmf, cmf-cqrs, components, containers, sagas
- Updated `packages/flow-designer` peerDependencies: `^4.0.0` → `^5.0.0`
- Updated `packages/flow-designer` devDependencies: `^4.3.7` → `^5.0.2` (required to remove the v4 yarn.lock entry and satisfy AC #9)
- `yarn install` succeeded (`success Saved lockfile`)
- yarn.lock now resolves `immutable@^5.0.2` → v5.1.4 (single v5.x resolution for all controlled packages)
- Residual `immutable@^3` (v3.8.2) entry in yarn.lock is from `browser-sync` (transitive dependency of `@talend/design-system`, outside scope)
- Residual `"immutable@^3.8.1 || ^4.0.0"` (v4.3.7) entry in yarn.lock is from `connected-react-router@^6.9.3` (transitive dependency of `@talend/react-cmf-router`, outside scope)
- ⚠️ Per Dev Notes: tests are expected to fail until Epic 8 addresses v5 breaking changes

### File List

- versions/dependencies.json
- packages/cmf/package.json
- packages/cmf-cqrs/package.json
- packages/components/package.json
- packages/containers/package.json
- packages/sagas/package.json
- packages/flow-designer/package.json
- yarn.lock

## Change Log

- 2026-03-06: Updated all immutable version declarations from v4 to v5 (^5.0.2 for dependencies, ^5.0.0 for flow-designer peerDependencies). yarn.lock updated, resolves single v5.x entry for all controlled packages.
- 2026-03-06: [Code Review] Corrected residual yarn.lock entry attribution in Completion Notes (M1).
