# Story 6.6: Remove react-immutable-proptypes from dependency tree

Status: done

## Story

As a developer,
I want `react-immutable-proptypes` completely removed from the dependency tree,
so that it does not block the v5 upgrade.

## Acceptance Criteria

1. `react-immutable-proptypes` removed from `packages/cmf/package.json`
2. `react-immutable-proptypes` removed from `packages/components/package.json`
3. `react-immutable-proptypes` removed from `packages/containers/package.json`
4. `react-immutable-proptypes` removed from `packages/flow-designer/package.json`
5. `react-immutable-proptypes` removed from `versions/dependencies.json`
6. `yarn install` succeeds
7. `grep -r "react-immutable-proptypes" packages/ versions/` returns no results

## Tasks / Subtasks

- [x] Remove from `packages/cmf/package.json` (AC: #1)
- [x] Remove from `packages/components/package.json` (AC: #2)
- [x] Remove from `packages/containers/package.json` (AC: #3)
- [x] Remove from `packages/flow-designer/package.json` (AC: #4)
- [x] Remove from `versions/dependencies.json` (AC: #5)
- [x] Run `yarn install` (AC: #6)
- [x] Verify no remaining references (AC: #7)

## Dev Notes

- This story must be done AFTER stories 6.2–6.5 (all code references removed first).
- After this, the monorepo is ready for the Immutable v5 bump.

### References

- [Source: versions/dependencies.json]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6

### Debug Log References

### Completion Notes List

- Removed `react-immutable-proptypes` dependency from all 4 package.json files (cmf, components, containers, flow-designer) and from versions/dependencies.json.
- `yarn install` completed successfully (exit 0, Done in 138s).
- Updated comment in `packages/flow-designer/src/constants/flowdesigner.proptypes.ts` to remove the package name reference, ensuring `grep -r "react-immutable-proptypes" packages/ versions/` returns clean.
- Rebuilt flow-designer lib/ and lib-esm/ artifacts via `build:lib` + `build:lib:esm` to propagate the comment change to compiled outputs.
- Pre-existing TypeScript `bundler` module error in flow-designer tsconfig is unrelated to this story.
- All 7 acceptance criteria satisfied.

**Code Review Fixes (Claude Opus 4.6):**
- Removed `react-immutable-proptypes` UMD entry from `tools/scripts-config-cdn/umds.json` (dead CDN reference).
- Unstaged unrelated `.vscode/settings.json` change from the commit.
- Cleaned up File List: added `yarn.lock` and `tools/scripts-config-cdn/umds.json`, removed gitignored `lib/` and `lib-esm/` artifacts.

### File List

- `packages/cmf/package.json`
- `packages/components/package.json`
- `packages/containers/package.json`
- `packages/flow-designer/package.json`
- `versions/dependencies.json`
- `packages/flow-designer/src/constants/flowdesigner.proptypes.ts`
- `tools/scripts-config-cdn/umds.json`
- `yarn.lock`

## Change Log

- 2026-03-06: Removed `react-immutable-proptypes` from package.json of cmf, components, containers, flow-designer, and versions/dependencies.json. Verified yarn install and no remaining references. Rebuilt flow-designer artifacts.
- 2026-03-06: [Code Review] Removed dead UMD entry from `tools/scripts-config-cdn/umds.json`. Unstaged unrelated `.vscode/settings.json`. Fixed File List accuracy.
