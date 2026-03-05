# Story 8.4: Verify flow-designer TypeScript custom typings with v5

Status: ready-for-dev

## Story

As a developer,
I want to confirm `customTypings/index.d.ts` type patterns are compatible with Immutable v5 generics,
so that no TypeScript compilation errors occur.

## Acceptance Criteria

1. `tsc --noEmit` passes for flow-designer
2. No TypeScript errors related to Immutable types in `customTypings/index.d.ts`
3. If adjustments are needed, types are updated to match v5's generic patterns

## Tasks / Subtasks

- [ ] Run `tsc --noEmit` in flow-designer (AC: #1)
- [ ] Review any Immutable type errors in `customTypings/index.d.ts` (AC: #2)
- [ ] Update `Record<T> & T` patterns to v5 `RecordOf<T>` if needed (AC: #3)

## Dev Notes

- `packages/flow-designer/src/customTypings/index.d.ts` defines custom type interfaces at L88, L90, L92, L102, L108, L114.
- The pattern `Record<T> & T` used in v3/v4 may need to become `RecordOf<T>` in v5 if types change.
- Immutable v5 ships updated TypeScript definitions — check compatibility.

### References

- [Source: packages/flow-designer/src/customTypings/index.d.ts#L88-L114]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
