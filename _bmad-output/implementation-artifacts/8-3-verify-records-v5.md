# Story 8.3: Verify flow-designer Record definitions with v5

Status: ready-for-dev

## Story

As a developer,
I want to confirm all 12 Record definitions in `flowdesigner.model.ts` work correctly with Immutable v5,
so that the flow-designer data model is v5-certified.

## Acceptance Criteria

1. All 8 simple Record factory calls compile with v5
2. Both class-based Records (`NodeRecord extends Record`, `NestedNodeRecord extends Record`) compile
3. `LinkRecord` and `PortRecord` compile
4. `tsc --noEmit` passes for flow-designer
5. `yarn workspace @talend/react-flow-designer test` passes
6. Property access via `.get('key')` works correctly
7. Construction via `new XRecord({...})` works correctly

## Tasks / Subtasks

- [ ] Run TypeScript check (AC: #1, #2, #3, #4)
- [ ] Run test suite (AC: #5, #6, #7)
- [ ] Fix any Record-related compilation errors if needed

## Dev Notes

- Record definitions in v5:
  - `Record({...})` factory pattern is unchanged
  - `class X extends Record({...})` pattern is unchanged
  - Property access via `.get('key')` is unchanged
  - Construction via `new X({...})` is unchanged
- The 12 Records in `flowdesigner.model.ts`:
  - Simple: PositionRecord, SizeRecord, NodeGraphicalAttributes, NodeData, LinkGraphicalAttributes, LinkData, PortGraphicalAttributes, PortData
  - Class-based: NodeRecord, NestedNodeRecord
  - Additional: LinkRecord, PortRecord

### References

- [Source: packages/flow-designer/src/constants/flowdesigner.model.ts#L15-L167]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
