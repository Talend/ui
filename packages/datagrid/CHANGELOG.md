# @talend/react-datagrid

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
