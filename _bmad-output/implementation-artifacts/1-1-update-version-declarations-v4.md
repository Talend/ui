# Story 1.1: Update version declarations to Immutable v4

Status: done

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
8. `packages/stepper/package.json` no longer declares `immutable` (unused devDependency removed)
9. `yarn install` succeeds without conflict
10. `yarn.lock` adds an `immutable@^4.3.7` entry resolving to v4.3.8 as the hoisted version for all project packages (pre-existing `connected-react-router#immutable@4.3.7` resolution is not introduced by this story)

## Tasks / Subtasks

- [x] Update `versions/dependencies.json` (AC: #1)
- [x] Update `packages/cmf/package.json` (AC: #2)
- [x] Update `packages/cmf-cqrs/package.json` (AC: #3)
- [x] Update `packages/components/package.json` (AC: #4)
- [x] Update `packages/containers/package.json` (AC: #5)
- [x] Update `packages/sagas/package.json` (AC: #6)
- [x] Update `packages/flow-designer/package.json` devDependencies to `^4.3.7` and peerDependencies to `^4.0.0` (AC: #7)
- [x] Remove unused `immutable` devDependency from `packages/stepper/package.json` (AC: #8)
- [x] Run `yarn install` and verify resolution (AC: #9, #10)

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

Claude Opus 4.6 (GitHub Copilot)

### Debug Log References

- `yarn why immutable` confirmed v4.3.8 hoisted as primary version
- Residual v3 entries from `browser-sync` / `browser-sync-ui` (external transitive dep, not in project scope)
- `connected-react-router` (used by `@talend/react-cmf-router`) brings its own `immutable@^3.8.1 || ^4.0.0` constraint resolved to v4.3.7 — isolated non-hoisted node, pre-exists this story, not in project scope
- `sass` brings immutable v5 as its own dependency (unrelated)

### Completion Notes List

- Updated `versions/dependencies.json` from `^3.8.1` to `^4.3.7`
- Updated 5 packages `dependencies` from `^3.8.2` to `^4.3.7`: cmf, cmf-cqrs, components, containers, sagas
- Updated `flow-designer` devDependencies from `^3.8.2` to `^4.3.7` and peerDependencies from `"3"` to `"^4.0.0"`
- Removed unused `immutable` devDependency from `stepper` (no source code uses it)
- `yarn install` succeeded (128.65s), all workspace builds passed
- Hoisted immutable resolves to v4.3.8

### File List

- versions/dependencies.json (modified)
- packages/cmf/package.json (modified)
- packages/cmf-cqrs/package.json (modified)
- packages/components/package.json (modified)
- packages/containers/package.json (modified)
- packages/sagas/package.json (modified)
- packages/flow-designer/package.json (modified)
- packages/stepper/package.json (modified)
- yarn.lock (modified)

### Change Log

- 2026-03-05: Updated all immutable version declarations from v3 to v4 (^4.3.7 in dependencies, ^4.0.0 in flow-designer peerDependencies). yarn install resolves v4.3.8 as hoisted version.
- 2026-03-05: Added @talend/react-stepper to scope (was missing). Removed unused immutable devDependency entirely.
- 2026-03-05: [AI-Review] Fixed AC#10 wording (two v4.x nodes in lock, v4.3.7 pre-existing from connected-react-router — not introduced by this story). Added yarn.lock to File List. Clarified Task#7 (devDependency also updated). Documented connected-react-router v4.3.7 node in Debug Log.
