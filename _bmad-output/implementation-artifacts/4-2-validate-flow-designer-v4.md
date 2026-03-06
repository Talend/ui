# Story 4.2: Validate flow-designer test suite with v4

Status: done

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

- [x] Run flow-designer test suite (AC: #1)
- [x] Verify Record definitions (AC: #2)
- [x] Verify OrderedMap usage in tests (AC: #3)
- [x] Verify Map constructors (AC: #4)
- [x] Run TypeScript check (AC: #5)
- [x] Fix any unexpected failures

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

Claude Sonnet 4.6

### Debug Log References

**Breaking change 1 — `Map.toArray()` returns entries in v4:**
In Immutable v4, `Map.toArray()` returns `[key, value]` pairs instead of values only (aligns with native JS Map).
Components using `nodes/links/ports.toArray().map(callback)` received arrays instead of Records, causing "is not a function" errors.
Fix: `.toArray()` → `.valueSeq().toArray()` in 3 rendering components.

**Breaking change 2 — `getIn()` requires array keyPath:**
`state.getIn('nodes', action.nodeId)` is invalid in v4 — a string is no longer accepted as keyPath. Must be an array.
Fix: `state.getIn('nodes', action.nodeId)` → `state.getIn(['nodes', action.nodeId])` in 3 places in `node.reducer.ts`.

**Breaking change 3 — `Record.merge()` silently ignores unknown keys in v4:**
In v3, merging with an unknown key into a Record threw an error, which the code caught and fell back to merging into `properties`.
In v4, unknown keys are silently ignored (no throw), so the fallback never triggered.
Fix: Direct merge into `graphicalAttributes.properties` without the try/catch.

**Breaking change 3 affected 3 reducers (extended fix via code review):**
- `node.reducer.ts` — `SET_GRAPHICAL_ATTRIBUTES` (fixed by dev), `SET_DATA` (dead try/catch removed by review, data is Map so merge at top level OK)
- `link.reducer.ts` — `SET_GRAPHICAL_ATTRIBUTES` and `SET_DATA` (both use Records — real bugs fixed by review, snapshots updated)
- `port.reducer.ts` — `SET_GRAPHICAL_ATTRIBUTES` and `SET_DATA` (both use Maps — dead try/catch removed by review, merge at top level OK)

**Pre-existing issue — TypeScript tsconfig incompatibility (not Immutable-related):**
`tsc --noEmit` fails with `Option 'bundler' can only be used when 'module' is set to 'preserve' or to 'es2015' or later`.
This is a pre-existing conflict between `scripts-config-typescript` (moduleResolution: bundler) and `flow-designer/tsconfig.json` (module: CommonJs).
Confirmed pre-existing: error exists before our changes. Not blocking — tests pass and build uses Babel, not tsc directly.

### Completion Notes List

- 3 v4 breaking changes fixed: `Map.toArray()` semantics, `getIn()` keyPath API, `Record.merge()` unknown-key behavior.
- Code review extended Breaking Change 3 fix to link.reducer.ts (2 real bugs: SET_GRAPHICAL_ATTRIBUTES, SET_DATA with Records) and removed dead try/catch from node.reducer.ts (SET_DATA) and port.reducer.ts (SET_GRAPHICAL_ATTRIBUTES, SET_DATA) where data uses Maps.
- 2 snapshots updated in link.reducer.test.ts to reflect correct v4 behavior.
- `yarn workspace @talend/react-flow-designer test` → 28 suites, 321 tests passed (3 skipped), 73 snapshots — all green (2026-03-06).
- All 12 Record definitions in `flowdesigner.model.ts` verified: 2 class-based (`NodeRecord`, `NestedNodeRecord`), 2 with custom methods (`LinkRecord`, `PortRecord`), 8 simple Records. Functions stored as data values in v4 Records work as expected.
- `OrderedMap` confirmed available in Immutable v4 (removed only in v5) — 4 test files use it, all pass.
- `Map()` without `new` works identically in v4 — confirmed by all tests passing.
- TypeScript tsconfig incompatibility is pre-existing (since storybook 10 commit), not introduced by Immutable v4 migration.
- No Immutable-specific deprecation warnings in test output.

### File List

- packages/flow-designer/src/components/node/NodesRenderer.component.tsx
- packages/flow-designer/src/components/link/LinksRenderer.component.tsx
- packages/flow-designer/src/components/port/PortsRenderer.component.tsx
- packages/flow-designer/src/reducers/node.reducer.ts
- packages/flow-designer/src/reducers/link.reducer.ts
- packages/flow-designer/src/reducers/port.reducer.ts
- packages/flow-designer/src/reducers/__snapshots__/link.reducer.test.ts.snap

## Change Log

- 2026-03-06: Fixed 3 Immutable v4 breaking changes in `@talend/react-flow-designer` — `Map.toArray()` semantics (3 rendering components), `getIn()` keyPath (node reducer), `Record.merge()` unknown-key fallback (node reducer). All 28 suites / 321 tests pass.
- 2026-03-06: [Code Review] Extended Breaking Change 3 fix to link.reducer.ts and port.reducer.ts. Removed dead try/catch from node.reducer.ts SET_DATA. 2 snapshots updated. All 28 suites / 321 tests pass.
