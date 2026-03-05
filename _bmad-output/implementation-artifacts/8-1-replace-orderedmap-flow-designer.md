# Story 8.1: Replace OrderedMap with Map in flow-designer

Status: ready-for-dev

## Story

As a developer,
I want all `OrderedMap` usage replaced with `Map`,
so that flow-designer is compatible with Immutable v5 which removed `OrderedMap`.

## Acceptance Criteria

1. `import { OrderedMap }` replaced with `import { Map }` in `nodeSelectors.test.ts`
2. `import { OrderedMap }` replaced with `import { Map }` in `port.reducer.test.ts`
3. `import { OrderedMap }` replaced with `import { Map }` in `node.actions.test.ts`
4. `import { OrderedMap }` replaced with `import { Map }` in `LinksRenderer.test.tsx`
5. All `OrderedMap()` calls replaced with `Map()` calls
6. `yarn workspace @talend/react-flow-designer test` passes

## Tasks / Subtasks

- [ ] Update `packages/flow-designer/src/selectors/nodeSelectors.test.ts` (AC: #1, #5)
  - [ ] Replace `OrderedMap` import and usages at L1, L192, L280
- [ ] Update `packages/flow-designer/src/reducers/port.reducer.test.ts` (AC: #2, #5)
  - [ ] Replace `OrderedMap` import and usages at L1, L13
- [ ] Update `packages/flow-designer/src/actions/node.actions.test.ts` (AC: #3, #5)
  - [ ] Replace `OrderedMap` import and usages at L4, L44
- [ ] Update `packages/flow-designer/src/components/link/LinksRenderer.test.tsx` (AC: #4, #5)
  - [ ] Replace `OrderedMap` import and usages at L3, L28
- [ ] Run tests (AC: #6)

## Dev Notes

- `OrderedMap` was removed in Immutable v5 because `Map` now preserves insertion order natively.
- This is a safe 1:1 replacement — `Map()` in v5 has the same insertion-order behavior as `OrderedMap()` in v3/v4.
- These changes are all in test files, no production code changes needed.

### References

- [Source: packages/flow-designer/src/selectors/nodeSelectors.test.ts#L1]
- [Source: packages/flow-designer/src/reducers/port.reducer.test.ts#L1]
- [Source: packages/flow-designer/src/actions/node.actions.test.ts#L4]
- [Source: packages/flow-designer/src/components/link/LinksRenderer.test.tsx#L3]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
