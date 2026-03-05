---
stepsCompleted: [step-01, step-02, step-03, step-04]
inputDocuments:
  - _bmad-output/planning-artifacts/migration-immutable-v5.md
---

# Immutable.js v3 → v5 Migration — Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for the Immutable.js migration in the talend-ui monorepo, decomposing the migration plan into implementable stories organized by progressive delivery milestones.

## Requirements Inventory

### Functional Requirements

- **FR-1**: Upgrade Immutable.js from v3.8.2 to v4.3.7 (intermediate step)
- **FR-2**: Upgrade Immutable.js from v4.3.7 to v5.x (final target)
- **FR-3**: Replace `react-immutable-proptypes` with manual PropType validators (incompatible with v5)
- **FR-4**: Replace all default imports (`import Immutable from 'immutable'`) with named imports
- **FR-5**: Replace `Iterable` usage with v4/v5 equivalents
- **FR-6**: Replace `OrderedMap` with `Map` (removed in v5)
- **FR-7**: All existing unit tests must pass after migration
- **FR-8**: All packages must compile (CJS + ESM) after migration

### Non-Functional Requirements

- **NFR-1**: Migration must be incremental (v3→v4→v5) with validation gates between phases
- **NFR-2**: No runtime behavior change — existing functionality must remain identical
- **NFR-3**: TypeScript type-safety must be preserved (no new `any` or `@ts-ignore`)
- **NFR-4**: Yarn workspace hoisting means all packages must use the same Immutable version simultaneously

### Additional Requirements

- **AR-1**: Changesets must be created for each modified package
- **AR-2**: Breaking changes must be documented

### FR Coverage Map

| FR   | Epic 1 | Epic 2 | Epic 3 | Epic 4 | Epic 5 | Epic 6 | Epic 7 | Epic 8 | Epic 9 |
| ---- | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| FR-1 | ✅     |        |        |        |        |        |        |        |        |
| FR-2 |        |        |        |        |        |        | ✅     |        |        |
| FR-3 |        |        |        |        |        | ✅     |        |        |        |
| FR-4 |        | ✅     |        |        |        |        |        |        |        |
| FR-5 |        |        | ✅     |        |        |        |        | ✅     |        |
| FR-6 |        |        |        |        |        |        |        | ✅     |        |
| FR-7 |        |        |        | ✅     | ✅     |        |        |        | ✅     |
| FR-8 |        |        |        |        | ✅     |        |        |        | ✅     |

## Epic List

1. **Epic 1: Version Bump to Immutable v4** — Update all dependency declarations to v4.3.7 across the monorepo
2. **Epic 2: CMF Core Migration (v4)** — Replace all v3-incompatible patterns in the cmf package (default imports)
3. **Epic 3: Components & Lightweight Packages Migration (v4)** — Migrate components (Iterable→Collection), cmf-cqrs, cmf-router, sagas
4. **Epic 4: Containers & Flow-Designer Migration (v4)** — Validate and fix v4 compatibility in the two highest-complexity packages
5. **Epic 5: V4 Validation & Stabilization** — Full test suite, build validation, changesets
6. **Epic 6: Replace react-immutable-proptypes** — Remove the v5-incompatible dependency and replace with manual validators
7. **Epic 7: Version Bump to Immutable v5** — Update all dependency declarations to v5.x
8. **Epic 8: V5 Breaking Changes Migration** — Migrate OrderedMap→Map, Collection→isImmutable, verify Records and TypeScript types
9. **Epic 9: V5 Validation & Release** — Full test suite, build validation, Storybook verification, changesets, documentation

---

## Epic 1: Version Bump to Immutable v4

**Goal:** Update all Immutable.js dependency declarations from `^3.8.2` to `^4.3.7` across the monorepo and verify resolution.

### Story 1.1: Update version declarations in all package.json files

As a developer,
I want all Immutable.js version constraints updated to `^4.3.7`,
So that Yarn resolves a single v4.x version across the monorepo.

**Acceptance Criteria:**

**Given** the current monorepo declares `"immutable": "^3.8.2"` in 5 packages (dependencies) and `"3"` in 1 peerDependency (stepper removed — unused devDependency)
**When** I update each package.json and versions/dependencies.json
**Then** the following files are updated:

- `versions/dependencies.json`: `"immutable": "^4.3.7"`
- `packages/cmf/package.json`: dependencies `"immutable": "^4.3.7"`
- `packages/cmf-cqrs/package.json`: dependencies `"immutable": "^4.3.7"`
- `packages/components/package.json`: dependencies `"immutable": "^4.3.7"`
- `packages/containers/package.json`: dependencies `"immutable": "^4.3.7"`
- `packages/sagas/package.json`: dependencies `"immutable": "^4.3.7"`
- `packages/flow-designer/package.json`: peerDependencies `"immutable": "^4.0.0"`
  **And** `yarn install` succeeds without conflict
  **And** `yarn.lock` resolves a single immutable v4.x version

---

## Epic 2: CMF Core Migration (v4)

**Goal:** Replace all Immutable v3-specific patterns in `packages/cmf` — the core framework that all other packages depend on.

### Story 2.1: Replace default imports in cmf expression files

As a developer,
I want the 4 expression files to use named imports instead of `import Immutable from 'immutable'`,
So that they are compatible with Immutable v4 which removed the default export.

**Acceptance Criteria:**

**Given** the files `getInState.js`, `allOf.js`, `includes.js`, `oneOf.js` in `packages/cmf/src/expressions/` use `import Immutable from 'immutable'`
**When** I replace each with the specific named imports used (e.g., `import { Map } from 'immutable'`)
**Then** all `Immutable.Map` references become `Map`, `Immutable.fromJS` becomes `fromJS`, etc.
**And** `yarn workspace @talend/react-cmf test` passes for expression-related tests

### Story 2.2: Replace default imports in cmf core files

As a developer,
I want `componentState.js`, `onEvent.js`, `localStorage.js`, and `selectors/toJS.js` to use named imports,
So that the cmf core module is fully v4-compatible.

**Acceptance Criteria:**

**Given** `componentState.js` uses `import Immutable from 'immutable'` with `Immutable.Map.isMap()`, `Immutable.fromJS()`
**When** I replace with `import { Map, fromJS } from 'immutable'`
**Then** `Map.isMap()` and `fromJS()` are used directly
**And** the same transformation is applied to `onEvent.js`, `localStorage.js`, `selectors/toJS.js`
**And** `yarn workspace @talend/react-cmf test` passes

### Story 2.3: Replace default imports in cmf mock files

As a developer,
I want `mock/collections.js` and `mock/components.js` to use named imports,
So that all cmf test mocks are v4-compatible.

**Acceptance Criteria:**

**Given** `packages/cmf/src/mock/collections.js` and `packages/cmf/src/mock/components.js` use default Immutable import
**When** I replace with named imports
**Then** all references to `Immutable.X` become direct named references
**And** `yarn workspace @talend/react-cmf test` passes with no regressions

---

## Epic 3: Components & Lightweight Packages Migration (v4)

**Goal:** Migrate `packages/components` (Iterable→Collection) and validate the three lightweight packages (cmf-cqrs, cmf-router, sagas).

### Story 3.1: Replace Iterable with Collection in ActionDropdown

As a developer,
I want `ActionDropdown.component.jsx` to use `Collection` instead of `Iterable`,
So that it is compatible with Immutable v4 where `Iterable` was renamed to `Collection`.

**Acceptance Criteria:**

**Given** `packages/components/src/Actions/ActionDropdown/ActionDropdown.component.jsx` imports `{ Iterable }` from immutable (L7)
**When** I replace with `import { Collection } from 'immutable'`
**Then** `Iterable.isIterable(x)` is replaced with the appropriate `Collection` equivalent (e.g., `Collection.isKeyed(x) || Collection.isIndexed(x)` or a simpler check)
**And** `yarn workspace @talend/react-components test` passes

### Story 3.2: Validate cmf-cqrs tests with v4

As a developer,
I want to confirm `packages/cmf-cqrs` test suite passes with Immutable v4,
So that I can certify this package requires no code changes.

**Acceptance Criteria:**

**Given** `packages/cmf-cqrs` has 1 file importing immutable
**When** I run `yarn workspace @talend/react-cmf-cqrs test`
**Then** all tests pass without modification
**And** no deprecation warnings related to Immutable appear

### Story 3.3: Validate cmf-router tests with v4

As a developer,
I want to confirm `packages/cmf-router` test suite passes with Immutable v4,
So that I can certify this package requires no code changes.

**Acceptance Criteria:**

**Given** `packages/cmf-router` uses `new Map()` in 2 files (indirect dependency)
**When** I run the test suite
**Then** all tests pass without modification

### Story 3.4: Validate sagas tests with v4

As a developer,
I want to confirm `packages/sagas` test suite passes with Immutable v4,
So that I can certify this package requires no code changes.

**Acceptance Criteria:**

**Given** `packages/sagas` has 1-2 files importing immutable
**When** I run the test suite
**Then** all tests pass without modification

---

## Epic 4: Containers & Flow-Designer Migration (v4)

**Goal:** Validate and fix v4 compatibility in the two highest-complexity packages.

### Story 4.1: Validate containers test suite with v4

As a developer,
I want to confirm all 40+ `.toJS()` calls and `fromJS()` patterns in `packages/containers` work with Immutable v4,
So that the containers package is v4-certified.

**Acceptance Criteria:**

**Given** `packages/containers` has 40+ `.toJS()` calls and extensive `fromJS()` usage in tests
**When** I run `yarn workspace @talend/react-containers test`
**Then** all tests pass
**And** any failures are fixed (`.toJS()` behavior is unchanged in v4, so failures would indicate other issues)

### Story 4.2: Validate flow-designer test suite with v4

As a developer,
I want to confirm all Record definitions, OrderedMap usage, and Map constructors in `packages/flow-designer` work with Immutable v4,
So that the flow-designer package is v4-certified.

**Acceptance Criteria:**

**Given** `packages/flow-designer` has 12 Record definitions in `flowdesigner.model.ts`, OrderedMap usage in 4 test files, and `Map()` constructors without `new` in selectors/reducers
**When** I run `yarn workspace @talend/react-flow-designer test`
**Then** all tests pass (all these patterns are unchanged in v4)
**And** TypeScript compilation succeeds (`tsc --noEmit`)

---

## Epic 5: V4 Validation & Stabilization

**Goal:** Full monorepo validation confirming Immutable v4 migration is complete and stable.

### Story 5.1: Run full test suite

As a developer,
I want all unit tests across the entire monorepo to pass with Immutable v4,
So that I can confirm no regressions.

**Acceptance Criteria:**

**Given** all per-package migrations from Epics 1–4 are complete
**When** I run `yarn test` at the root
**Then** all tests pass across all packages

### Story 5.2: Validate CJS and ESM builds

As a developer,
I want all packages to compile successfully in both CJS and ESM formats,
So that the build pipeline is unbroken.

**Acceptance Criteria:**

**Given** the Immutable v4 migration is code-complete
**When** I run `yarn build:lib && yarn build:lib:esm`
**Then** all packages build without errors

### Story 5.3: Create changesets for v4 migration

As a developer,
I want changesets created for each modified package,
So that version bumps and changelogs are properly tracked.

**Acceptance Criteria:**

**Given** the following packages were modified: cmf, components (at minimum)
**When** I create a changeset for each
**Then** each changeset references the Immutable v4 migration
**And** the changeset type is `minor` (non-breaking for consumers)

---

## Epic 6: Replace react-immutable-proptypes

**Goal:** Remove the `react-immutable-proptypes` dependency (incompatible with v5, last release 2017) and replace with manual PropType validators.

### Story 6.1: Create reusable immutable PropType validators

As a developer,
I want a set of custom PropType validator functions for Immutable types (Map, List),
So that they can replace `react-immutable-proptypes` across all packages.

**Acceptance Criteria:**

**Given** `react-immutable-proptypes` provides `ImmutablePropTypes.map`, `ImmutablePropTypes.list`, and `recordOf()`
**When** I create custom validators using `Map.isMap()` and `List.isList()`
**Then** each validator follows the standard PropTypes function signature `(props, propName, componentName) => Error | null`
**And** validators support `.isRequired` chaining

### Story 6.2: Replace react-immutable-proptypes in cmf

As a developer,
I want `packages/cmf/src/cmfConnect.jsx` to use custom validators,
So that cmf no longer depends on `react-immutable-proptypes`.

**Acceptance Criteria:**

**Given** `cmfConnect.jsx` imports `ImmutablePropTypes` (L27) and uses `ImmutablePropTypes.map` (L395-396)
**When** I replace with the custom `immutableMapPropType` validator
**Then** the import of `react-immutable-proptypes` is removed
**And** `yarn workspace @talend/react-cmf test` passes

### Story 6.3: Replace react-immutable-proptypes in components

As a developer,
I want `ActionDropdown.component.jsx` to use custom validators,
So that components no longer depends on `react-immutable-proptypes`.

**Acceptance Criteria:**

**Given** `ActionDropdown.component.jsx` uses `ImmutablePropTypes.list` (L4, L326)
**When** I replace with a custom `immutableListPropType` validator
**Then** the import of `react-immutable-proptypes` is removed
**And** `yarn workspace @talend/react-components test` passes

### Story 6.4: Replace react-immutable-proptypes in containers

As a developer,
I want all 4 container files to use custom validators,
So that containers no longer depends on `react-immutable-proptypes`.

**Acceptance Criteria:**

**Given** 4 files use `ImmutablePropTypes.list`:

- `ActionDropdown/ActionDropdown.connect.jsx` (L2, L53)
- `List/List.container.jsx` (L2, L356)
- `SelectObject/SelectObject.component.jsx` (L1, L83, L88)
- `TreeView/TreeView.container.jsx` (L5, L106)
  **When** I replace each with custom validators
  **Then** all imports of `react-immutable-proptypes` are removed
  **And** `yarn workspace @talend/react-containers test` passes

### Story 6.5: Replace react-immutable-proptypes in flow-designer

As a developer,
I want `flowdesigner.proptypes.ts` to use `PropTypes.object` instead of `recordOf()`,
So that flow-designer no longer depends on `react-immutable-proptypes`.

**Acceptance Criteria:**

**Given** `packages/flow-designer/src/constants/flowdesigner.proptypes.ts` imports `recordOf` from `react-immutable-proptypes` (L2) and uses it on L4, L6, L12, L15, L21
**When** I replace `recordOf()` calls with `PropTypes.object`
**Then** the import of `react-immutable-proptypes` is removed
**And** `yarn workspace @talend/react-flow-designer test` passes

### Story 6.6: Remove react-immutable-proptypes from all package.json and versions

As a developer,
I want `react-immutable-proptypes` completely removed from the dependency tree,
So that it does not block the v5 upgrade.

**Acceptance Criteria:**

**Given** `react-immutable-proptypes` appears in:

- `packages/cmf/package.json`
- `packages/components/package.json`
- `packages/containers/package.json`
- `packages/flow-designer/package.json`
- `versions/dependencies.json`
  **When** I remove the dependency from each file
  **Then** `yarn install` succeeds
  **And** `grep -r "react-immutable-proptypes" packages/ versions/` returns no results

---

## Epic 7: Version Bump to Immutable v5

**Goal:** Update all Immutable.js dependency declarations from `^4.3.7` to `^5.0.2` across the monorepo.

### Story 7.1: Update version declarations to v5

As a developer,
I want all Immutable.js version constraints updated to `^5.0.2`,
So that Yarn resolves a single v5.x version across the monorepo.

**Acceptance Criteria:**

**Given** the monorepo currently declares `"immutable": "^4.3.7"` in 5 packages
**When** I update each package.json and versions/dependencies.json to `"^5.0.2"`
**Then** `packages/flow-designer/package.json` peerDependencies is set to `"immutable": "^5.0.0"`
**And** `yarn install` succeeds without conflict
**And** `yarn.lock` resolves a single immutable v5.x version

---

## Epic 8: V5 Breaking Changes Migration

**Goal:** Migrate all v5 breaking changes: OrderedMap removal, Collection→isImmutable, verify Records and TypeScript types.

### Story 8.1: Replace OrderedMap with Map in flow-designer tests

As a developer,
I want all `OrderedMap` usage replaced with `Map`,
So that flow-designer is compatible with Immutable v5 which removed `OrderedMap`.

**Acceptance Criteria:**

**Given** 4 test files import and use `OrderedMap`:

- `packages/flow-designer/src/selectors/nodeSelectors.test.ts` (L1, L192, L280)
- `packages/flow-designer/src/reducers/port.reducer.test.ts` (L1, L13)
- `packages/flow-designer/src/actions/node.actions.test.ts` (L4, L44)
- `packages/flow-designer/src/components/link/LinksRenderer.test.tsx` (L3, L28)
  **When** I replace `import { OrderedMap }` with `import { Map }` and `OrderedMap()` calls with `Map()`
  **Then** `Map` in v5 preserves insertion order (same behavior as `OrderedMap`)
  **And** `yarn workspace @talend/react-flow-designer test` passes

### Story 8.2: Replace Collection with isImmutable in components

As a developer,
I want `ActionDropdown.component.jsx` to use `isImmutable()` instead of the v4 `Collection` pattern,
So that the check is simplified and fully v5-compatible.

**Acceptance Criteria:**

**Given** `ActionDropdown.component.jsx` uses a `Collection`-based check from the v4 migration
**When** I replace with `import { isImmutable } from 'immutable'` and use `isImmutable(x)`
**Then** the behavior is equivalent (detects any Immutable.js data structure)
**And** `yarn workspace @talend/react-components test` passes

### Story 8.3: Verify flow-designer Record definitions with v5

As a developer,
I want to confirm all 12 Record definitions in `flowdesigner.model.ts` work correctly with Immutable v5,
So that the flow-designer data model is v5-certified.

**Acceptance Criteria:**

**Given** `packages/flow-designer/src/constants/flowdesigner.model.ts` defines:

- 8 simple Records (PositionRecord, SizeRecord, NodeGraphicalAttributes, etc.)
- 2 class-based Records (NodeRecord extends Record, NestedNodeRecord extends Record)
- 2 additional Records (LinkRecord, PortRecord)
  **When** I run `tsc --noEmit` and the full test suite
  **Then** all Record constructions compile and pass tests
  **And** property access via `.get('key')` and constructor via `new XRecord({...})` work correctly

### Story 8.4: Verify flow-designer TypeScript custom typings with v5

As a developer,
I want to confirm `customTypings/index.d.ts` type patterns are compatible with Immutable v5 generics,
So that no TypeScript compilation errors occur.

**Acceptance Criteria:**

**Given** `packages/flow-designer/src/customTypings/index.d.ts` uses `Record<T> & T` type patterns
**When** I run `tsc --noEmit`
**Then** no TypeScript errors related to Immutable types
**And** if adjustments are needed, the types are updated to match v5's `RecordOf<T>` patterns

### Story 8.5: Verify containers sort behavior with v5

As a developer,
I want to confirm that custom comparators on Immutable List `.sort()` work identically in v5,
So that List sorting in containers is not affected.

**Acceptance Criteria:**

**Given** `packages/containers/src/List/selector.js` uses `.sort()` with custom comparators (L107, L111)
**When** I run `yarn workspace @talend/react-containers test`
**Then** all sorting-related tests pass without behavioral changes

### Story 8.6: Validate all packages with v5

As a developer,
I want to run the test suite for every package that uses Immutable,
So that all v5 breaking changes have been addressed.

**Acceptance Criteria:**

**Given** all v5 migration changes from Stories 8.1–8.5 are applied
**When** I run tests for cmf, cmf-cqrs, cmf-router, components, containers, sagas, flow-designer
**Then** all tests pass
**And** no Immutable-related deprecation warnings appear

---

## Epic 9: V5 Validation & Release

**Goal:** Full monorepo validation, Storybook verification, changesets, and documentation for the v5 release.

### Story 9.1: Run full test suite and build validation

As a developer,
I want all unit tests and builds to pass across the entire monorepo,
So that the v5 migration is confirmed stable.

**Acceptance Criteria:**

**Given** all Epics 6–8 are complete
**When** I run `yarn test` at the root
**Then** all tests pass
**And** `yarn build:lib && yarn build:lib:esm` succeed without errors
**And** `tsc --noEmit` succeeds in all TypeScript packages

### Story 9.2: Storybook visual verification

As a developer,
I want to verify that Storybook renders correctly for components using Immutable data,
So that no visual regressions exist.

**Acceptance Criteria:**

**Given** components like HeaderBar, ActionDropdown, and List use Immutable structures in their stories
**When** I start Storybook via `yarn workspace @talend/storybook-one start`
**Then** all relevant stories render without errors
**And** no console errors related to Immutable appear

### Story 9.3: Verify CMF localStorage round-trip

As a developer,
I want to verify that CMF's localStorage serialization/deserialization works with v5,
So that state persistence is not broken.

**Acceptance Criteria:**

**Given** `packages/cmf/src/localStorage.js` uses `.toJS()` for serialization and `fromJS()` for deserialization
**When** I test the round-trip (serialize → store → retrieve → deserialize)
**Then** the resulting Immutable structure is identical to the original
**And** nested Maps and Lists are properly restored

### Story 9.4: Create changesets and documentation

As a developer,
I want changesets and breaking change documentation created for the v5 migration,
So that consumers are informed of the upgrade.

**Acceptance Criteria:**

**Given** the following packages have breaking changes: cmf, components, containers, flow-designer, cmf-cqrs, sagas
**When** I create a changeset for each modified package
**Then** each changeset is typed `major` (breaking change: Immutable v5)
**And** a BREAKING-CHANGE section documents:

- Immutable.js upgraded from v3 to v5
- `react-immutable-proptypes` removed
- `OrderedMap` replaced with `Map`
- Default import `import Immutable from 'immutable'` no longer supported
