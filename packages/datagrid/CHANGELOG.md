# @talend/react-datagrid

## 12.0.0

### Major Changes

- c815ba11f: - Support multi column selection.

  - The main components were migrated to typescript
  - Better separation of concern between data mapping & grid rendering
    - To render a dataset sample, use `DatasetSerializer.getColumnDefs`
    - To render data from another source, build your own `columnDefs`
  - Replaced enzyme by RTL

  Lots of breaking changes on this one, to have a cleaner API and a faster grid.

  **API changes:**

  1. [Props] `columnSelection`: defaults to single
  2. [Props] `onColumnSelectionChanged`: triggered when selected column(s) changed
  3. [Props] `selection.columnIds`: controlled column selection

  **API breaking changes:**

  1. [Props] `avroRenderer` removed (not used)
  2. [Props] `data` and `getRowDataFn` removed: use `rowData` instead (less parsing + cleaner API)
  3. [Props] `cellRenderer`, `headerRenderer`, `pinHeaderRenderer` removed: set `columnDef.cellRenderer` and `columnDef.headerComponent` instead
  4. [Props] `getPinnedColumnDefsFn`, `getColumnDefsFn`, `getValueByCellFn` removed: use `columnDefs` instead
  5. [Export] `DatasetSerializer` is no longer export as `Datagrid.components.DatasetSerializer`, use `import { DatasetSerializer } from '@talend/react-datagrid'`

  **Deprecations:**

  1. Replace default cmfModule import (`Datagrid.components.MyComponent`) by named imports

### Minor Changes

- 2a7278a95: Allow column size persistence to local storage
- 1df17ebbc: Highlight cells with same values
- a99154a7d: generate minified css using dot min in the name of it

### Patch Changes

- Updated dependencies [617ec14f0]
- Updated dependencies [a99154a7d]
  - @talend/design-system@4.0.0
  - @talend/react-components@7.5.0
  - @talend/design-tokens@2.7.0

## 11.1.0

### Minor Changes

- 2b1ff2f48: Bump ag-grid to v28

## 11.0.1

### Patch Changes

- cb1e06f2f: fix(datagrid): export parseRow from serializer
- Updated dependencies [6944f72fc]
- Updated dependencies [6944f72fc]
- Updated dependencies [6944f72fc]
- Updated dependencies [6944f72fc]
- Updated dependencies [6944f72fc]
  - @talend/icons@6.47.0

## 11.0.0

### Major Changes

- df3460428: Rewrite header cell renderer to include all projects use cases + cleanup its API:

  - Custom properties (type, column description, style...) are now provided in `colDef.headerComponentParams` field.
    - See `HeaderComponentParams`for available fields
  - Quality information is simplified (see: `HeaderComponentParams`)

  Please remove custom renderers from projects

### Patch Changes

- Updated dependencies [6887f0fcf]
- Updated dependencies [6887f0fcf]
  - @talend/icons@6.44.0

## 10.0.1

### Patch Changes

- 1770e701b: fix: include peerDependencies in UMD manifest
- Updated dependencies [1770e701b]
  - @talend/react-components@7.0.1

## 10.0.0

### Patch Changes

- Updated dependencies [9a581a4bc]
- Updated dependencies [5a30f1f0e]
- Updated dependencies [c8fbf0130]
- Updated dependencies [051dfd9fb]
- Updated dependencies [1160ec1f6]
  - @talend/react-components@7.0.0
  - @talend/design-system@3.0.0

## 9.3.1

### Patch Changes

- 07e270241: fix: use assets-api back to lazy load aggrid assets
- Updated dependencies [eec63a996]
  - @talend/assets-api@1.2.1

## 9.3.0

### Minor Changes

- 47b758112: feat(ARCH-482): use React 17 internally and extend react peer dep version

### Patch Changes

- Updated dependencies [6562e397f]
- Updated dependencies [47b758112]
  - @talend/react-components@6.49.0
  - @talend/assets-api@1.2.0
  - @talend/icons@6.42.0

## 9.2.3

### Patch Changes

- f1c69c2e3: Translations not loaded in storybook & not configured for typescript
- Updated dependencies [293a4ebd9]
  - @talend/icons@6.41.1

## 9.2.2

### Patch Changes

- 5475efd58: Cleanup internal renderer API: remove usage of `frameworkComponents` to stick to ag-grid API & documentation
- Updated dependencies [7d1f9f509]
- Updated dependencies [66fa02548]
  - @talend/react-components@6.47.0

## 9.2.1

### Patch Changes

- d1273605b: int cell doesn't display text align right
- Updated dependencies [ecd3b81ae]
  - @talend/react-components@6.46.7

## 9.2.0

### Minor Changes

- 4119033fd: - Boot rtl config
  - Rewrite QualityIndicator in typescript

### Patch Changes

- Updated dependencies [c834a7ec6]
- Updated dependencies [6f68d11f4]
  - @talend/react-components@6.46.5
  - @talend/icons@6.41.0

## 9.1.1

### Patch Changes

- d6d8cd78d: Broken selection since v9.1.0

## 9.1.0

### Minor Changes

- ea6f0874a: - Bump ag-grid to v27
  - Drop assets-api as it's too painful to use ATM

### Patch Changes

- Updated dependencies [344a7551f]
  - @talend/react-components@6.46.4

## 9.0.1

### Patch Changes

- 9222aa7fc: fix: use assets-api from CDN
- Updated dependencies [9222aa7fc]
  - @talend/assets-api@1.1.0

## 9.0.0

### Major Changes

- 9f84c4ad7: - Remove cmf module

  - Immutable data support is no longer tested & documented

  Migration: renderer are no longer provided through CMF registry using their id, they have to be provided as props;

  ```
  BEFORE
  <Datagrid headerRenderer="myComponentIdInRegistry" />
  AFTER
  <Datagrid headerRenderer={MyComponent} />
  ```

- 65599e1a5: chore(datagrid): Drop deprecated `forceRedrawRows` prop
- e04e3910f: feat(datagrid): replace internal quality bar with react-component one
  Breaking change: previous internal datagrid/QualityBar export has been removed

### Patch Changes

- Updated dependencies [e04e3910f]
  - @talend/react-components@6.46.2

## 8.0.0

### Major Changes

- 4605d2ce4: Design-system migration + add typescript config

  Migration: @talend/design-system is added as peer dep + `ThemeProvider` is required

### Minor Changes

- d1815c0af: feat: use @talend/assets-api to load datagrid umds on demand

## 7.0.3

### Patch Changes

- 3ddca68d1: Support empty selection in controlled mode

## 7.0.2

### Patch Changes

- 275c25ee0: chore(dependencies): auto update for maintenance purpose

  ```diff
  -    "@talend/react-components": "^6.43.5"
  +    "@talend/react-components": "^6.44.0"
  ```

- Updated dependencies [275c25ee0]
- Updated dependencies [3bf0f1f18]
  - @talend/react-components@6.44.1
  - @talend/icons@6.39.0

## 7.0.1

### Patch Changes

- 618951c8b: chore(deps): auto update for maintenance purpose
- Updated dependencies [618951c8b]
- Updated dependencies [f5e3a7ead]
  - @talend/react-cmf@7.0.1
  - @talend/react-components@6.43.5

## 7.0.0

### Major Changes

- 593026b37: Redux major upgrade with saga

### Patch Changes

- Updated dependencies [593026b37]
  - @talend/react-cmf@7.0.0

## 6.37.2

### Patch Changes

- 86f208189: chore: upgrade dependencies and align @talend scoped packages to latest
- Updated dependencies [86f208189]
  - @talend/react-cmf@6.39.1
  - @talend/react-components@6.43.3

## 6.37.1

### Patch Changes

- ac1ecd682: fix(DataGrid): Local state is updated on click in controlled mode
- 4739b74a0: fix(DataGrid): Scroll to controlled focused column
- Updated dependencies [4b5392adf]
- Updated dependencies [26ca9781d]
  - @talend/react-components@6.43.1

## 6.37.0

### Minor Changes

- e60cea8e1: feat(DataGrid): Set focused column from props

### Patch Changes

- Updated dependencies [085d0d3a4]
- Updated dependencies [de74c0e04]
  - @talend/react-components@6.43.0

## 6.36.5

### Patch Changes

- 039b85775: chore: upgrade dependencies and align @talend scoped packages to latest
- Updated dependencies [039b85775]
- Updated dependencies [c0d9c2c30]
  - @talend/react-cmf@6.38.5
  - @talend/react-components@6.41.3
  - @talend/icons@6.37.0

## 6.36.4

### Patch Changes

- 667cd0a50: chore: upgrade dependencies and align @talend scoped packages to latest
- Updated dependencies [667cd0a50]
- Updated dependencies [7dde61e46]
  - @talend/react-cmf@6.38.4
  - @talend/react-components@6.40.0
  - @talend/icons@6.36.3

## 6.36.3

### Patch Changes

- f1f4ec5bc: fix(workspace-run): package run order
- Updated dependencies [f1f4ec5bc]
  - @talend/react-cmf@6.38.3
  - @talend/react-components@6.39.2
  - @talend/icons@6.36.2

## 6.36.2

### Patch Changes

- 3e9121287: chore(build): order packages on pre-release hook
- Updated dependencies [3e9121287]
- Updated dependencies [80ca14323]
  - @talend/react-cmf@6.38.2
  - @talend/react-components@6.39.1
  - @talend/icons@6.36.1

## 6.36.1

### Patch Changes

- 0bd4c26f8: Fix pre-release script: remove display=none option
- Updated dependencies [0bd4c26f8]
  - @talend/react-cmf@6.38.1
  - @talend/react-components@6.38.1
