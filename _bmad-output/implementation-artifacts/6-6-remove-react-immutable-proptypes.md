# Story 6.6: Remove react-immutable-proptypes from dependency tree

Status: ready-for-dev

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

- [ ] Remove from `packages/cmf/package.json` (AC: #1)
- [ ] Remove from `packages/components/package.json` (AC: #2)
- [ ] Remove from `packages/containers/package.json` (AC: #3)
- [ ] Remove from `packages/flow-designer/package.json` (AC: #4)
- [ ] Remove from `versions/dependencies.json` (AC: #5)
- [ ] Run `yarn install` (AC: #6)
- [ ] Verify no remaining references (AC: #7)

## Dev Notes

- This story must be done AFTER stories 6.2–6.5 (all code references removed first).
- After this, the monorepo is ready for the Immutable v5 bump.

### References

- [Source: versions/dependencies.json]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
