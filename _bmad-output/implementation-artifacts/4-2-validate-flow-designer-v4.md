# Story 4.2: Validate flow-designer test suite with v4

Status: ready-for-dev

## Story

As a developer,
I want to confirm all Record definitions, OrderedMap usage, and Map constructors in `packages/flow-designer` work with Immutable v4,
so that the flow-designer package is v4-certified.

## Acceptance Criteria

1. `yarn workspace @talend/react-flow-designer test` passes with zero failures
2. All 12 Record definitions in `flowdesigner.model.ts` compile and work correctly
3. OrderedMap usage (4 test files) works correctly (still available in v4)
4. `Map()` constructors without `new` work correctly
5. TypeScript compilation succeeds (`tsc --noEmit`)

## Tasks / Subtasks

- [ ] Run flow-designer test suite (AC: #1)
- [ ] Verify Record definitions (AC: #2)
- [ ] Verify OrderedMap usage in tests (AC: #3)
- [ ] Verify Map constructors (AC: #4)
- [ ] Run TypeScript check (AC: #5)
- [ ] Fix any unexpected failures

## Dev Notes

- `flow-designer` is the most complex package with 20+ files importing immutable.
- Records: 8 simple + 2 class-based + 2 additional in `flowdesigner.model.ts` — all patterns are valid in v4.
- `OrderedMap` is still available in v4 (removed only in v5) — no changes expected.
- `Map()` without `new` works identically in v4.
- TypeScript types may need verification — v4 ships its own `.d.ts` files.

### References

- [Source: packages/flow-designer/src/constants/flowdesigner.model.ts]
- [Source: packages/flow-designer/src/customTypings/index.d.ts]
- [Source: packages/flow-designer/src/selectors/nodeSelectors.test.ts]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
