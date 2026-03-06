# Story 6.5: Replace react-immutable-proptypes in flow-designer

Status: done

## Story

As a developer,
I want `flowdesigner.proptypes.ts` to use `PropTypes.object` instead of `recordOf()`,
so that flow-designer no longer depends on `react-immutable-proptypes`.

## Acceptance Criteria

1. `import { recordOf } from 'react-immutable-proptypes'` is removed from `flowdesigner.proptypes.ts`
2. All `recordOf()` calls at L4, L6, L12, L15, L21 are replaced with `PropTypes.object`
3. `yarn workspace @talend/react-flow-designer test` passes

## Tasks / Subtasks

- [x] Remove `recordOf` import (AC: #1)
- [x] Replace `recordOf({...})` calls with `PropTypes.object` (AC: #2)
  - [x] L4: node record prop type
  - [x] L6: node record prop type
  - [x] L12: link record prop type
  - [x] L15: port record prop type
  - [x] L21: port record prop type
- [x] Run tests (AC: #3)

## Dev Notes

- `recordOf()` provided deep validation of Immutable Record shapes — `PropTypes.object` is less strict but sufficient since TypeScript types provide the real validation.
- The TypeScript types in `customTypings/index.d.ts` already define the Record shapes, making runtime PropType validation redundant for type safety.

### References

- [Source: packages/flow-designer/src/constants/flowdesigner.proptypes.ts#L2]

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6

### Debug Log References

- All 321 tests passed (3 pre-existing skips).

### Completion Notes List

- Removed `import { recordOf } from 'react-immutable-proptypes'`.
- Replaced all 3 exported types (`NodeType`, `PortType`, `LinkType`) — each previously defined via nested `recordOf()` calls — with `PropTypes.object`.
- TypeScript types in `customTypings/index.d.ts` provide the real type-safety; runtime PropType validation is now intentionally loose as noted in Dev Notes.
- 321/321 tests pass, no regressions.

### File List

- `packages/flow-designer/src/constants/flowdesigner.proptypes.ts` (modified)

## Senior Developer Review (AI)

**Reviewer:** Smouillour — 2026-03-06
**Outcome:** Approved (with fixes applied)

- All ACs verified: `recordOf` import removed, 3 types replaced with `PropTypes.object`, 321/321 tests pass.
- **M1 FIXED**: Added explanatory comment documenting the intentional trade-off (loss of runtime `recordOf()` validation, compensated by TypeScript types in `customTypings/index.d.ts`).
