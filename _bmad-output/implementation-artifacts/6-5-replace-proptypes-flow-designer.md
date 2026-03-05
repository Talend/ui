# Story 6.5: Replace react-immutable-proptypes in flow-designer

Status: ready-for-dev

## Story

As a developer,
I want `flowdesigner.proptypes.ts` to use `PropTypes.object` instead of `recordOf()`,
so that flow-designer no longer depends on `react-immutable-proptypes`.

## Acceptance Criteria

1. `import { recordOf } from 'react-immutable-proptypes'` is removed from `flowdesigner.proptypes.ts`
2. All `recordOf()` calls at L4, L6, L12, L15, L21 are replaced with `PropTypes.object`
3. `yarn workspace @talend/react-flow-designer test` passes

## Tasks / Subtasks

- [ ] Remove `recordOf` import (AC: #1)
- [ ] Replace `recordOf({...})` calls with `PropTypes.object` (AC: #2)
  - [ ] L4: node record prop type
  - [ ] L6: node record prop type
  - [ ] L12: link record prop type
  - [ ] L15: port record prop type
  - [ ] L21: port record prop type
- [ ] Run tests (AC: #3)

## Dev Notes

- `recordOf()` provided deep validation of Immutable Record shapes — `PropTypes.object` is less strict but sufficient since TypeScript types provide the real validation.
- The TypeScript types in `customTypings/index.d.ts` already define the Record shapes, making runtime PropType validation redundant for type safety.

### References

- [Source: packages/flow-designer/src/constants/flowdesigner.proptypes.ts#L2]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
