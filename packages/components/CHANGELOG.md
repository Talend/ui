# @talend/react-components

## 6.43.3

### Patch Changes

- 86f208189: chore: upgrade dependencies and align @talend scoped packages to latest
- Updated dependencies [86f208189]
- Updated dependencies [8b6fc43c8]
- Updated dependencies [4a9c460c7]
  - @talend/design-system@1.12.1
  - @talend/bootstrap-theme@6.38.6

## 6.43.2

### Patch Changes

- b2e5903e4: fix(components): Toggle should reuse Checkbox

## 6.43.1

### Patch Changes

- 4b5392adf: fix: remove margin on typehead
- 26ca9781d: fix(components): style for multiselect component
- Updated dependencies [8a540fc3f]
  - @talend/design-system@1.11.3

## 6.43.0

### Minor Changes

- 085d0d3a4: feat(Inject): Support components as props when not cmfConnected

### Patch Changes

- de74c0e04: fix(components/Toggle): Default class
- Updated dependencies [583ac0059]
- Updated dependencies [c73332a32]
- Updated dependencies [0b8fd0d5c]
  - @talend/design-system@1.11.2
  - @talend/utils@2.1.0

## 6.42.1

### Patch Changes

- 3bbf55610: fix(components/dataviz): recharts path in dependencies.json
- Updated dependencies [7a8e6e193]
  - @talend/design-system@1.10.1

## 6.42.0

### Minor Changes

- 2e5511f79: feat: make possible to project to upgrade virtualized list
- 42efdca45: Upgrade to recharts 2 and ensure everything is working well

### Patch Changes

- cfa90496c: Translate date string displayed in CellDatetime.

## 6.41.4

### Patch Changes

- d353a0a3c: i18n - add translation for colon
- Updated dependencies [959a0e21b]
  - @talend/icons@6.38.0

## 6.41.3

### Patch Changes

- 039b85775: chore: upgrade dependencies and align @talend scoped packages to latest
- Updated dependencies [039b85775]
- Updated dependencies [c0d9c2c30]
  - @talend/icons@6.37.0
  - @talend/utils@2.0.1

## 6.41.2

### Patch Changes

- 8c8d8e3eb: add link props for password field
  add index for dataTest prop
- 8e71b59a4: List checkbox should not be wrapped in a form

## 6.41.1

### Patch Changes

- d5f261f49: utils: remove default export, use named exports instead
  - WHAT the breaking change is
    Remove default export of @talend/utils package, use named exports instead
  - WHY the change was made
    The utils package used a default export. so we can't do a destruction import as readme described:
  ```
  import { validation } from '@talend/utils';
  ```
  - HOW a consumer should update their code
    Use destruction import like `import { validation, date } from '@talend/utils';` to replace default import.
- Updated dependencies [d5f261f49]
  - @talend/utils@2.0.0

## 6.41.0

### Minor Changes

- 7b9a15097: feat: add custom classname for model in the modelViewer

### Patch Changes

- 324c07420: fix Column chooser label for displaying total columns
- bc3ff67f6: chore: Upgrade react-use to 17 to be aligned with other libs
  chore: fix date-fns imports to not embed every date-fns in it

## 6.40.2

### Patch Changes

- 740645821: Republish patch versions due to npm publish issue

## 6.40.1

### Patch Changes

- 9b9faebe8: Fix: style issues caused by the recent form style changes
- 715f615a8: Fix: align styled-components peerDeps with design system consumer
- 5cb420c29: Make ColumnChooser search in the TUI i18n namespace for localization

## 6.40.0

### Minor Changes

- 7dde61e46: Add custom xpath props support for listView, MultiselectTag, Bage components

### Patch Changes

- 667cd0a50: chore: upgrade dependencies and align @talend scoped packages to latest
- Updated dependencies [667cd0a50]
  - @talend/icons@6.36.3
  - @talend/bootstrap-theme@6.38.5
  - @talend/utils@1.4.5

## 6.39.6

### Patch Changes

- cbb98bdc9: fix(list): align checkbox in list component

## 6.39.5

### Patch Changes

- a2dee6afb: fix(IconToggle/Drawer/Slider/ObjectViewer): calc with sass vars

## 6.39.4

### Patch Changes

- 603785022: chore(components+forms): Bump @talend/design-system

## 6.39.3

### Patch Changes

- ca60841df: revert usage of @use sass:math
- Updated dependencies [ca60841df]
  - @talend/bootstrap-theme@6.38.3

## 6.39.2

### Patch Changes

- f1f4ec5bc: fix(workspace-run): package run order
- Updated dependencies [f1f4ec5bc]
  - @talend/icons@6.36.2
  - @talend/bootstrap-theme@6.38.2
  - @talend/utils@1.4.4

## 6.39.1

### Patch Changes

- 3e9121287: chore(build): order packages on pre-release hook
- 80ca14323: chore: use sass math.div
- Updated dependencies [3e9121287]
  - @talend/icons@6.36.1
  - @talend/bootstrap-theme@6.38.1
  - @talend/utils@1.4.3

## 6.39.0

### Minor Changes

- f9c1acb3e: chore(Components): remove DraggableComponent
- 274771710: Forms style to be more readable

### Patch Changes

- Updated dependencies [274771710]
  - @talend/bootstrap-theme@6.38.0

## 6.38.1

### Patch Changes

- 0bd4c26f8: Fix pre-release script: remove display=none option
- Updated dependencies [0bd4c26f8]
  - @talend/bootstrap-theme@6.37.2

## 6.38.0

### Minor Changes

- d21c969fe: QualityBar : Allow to add a placeholder space in order to display only one "quality" type at the time
- 08fdc0b51: fix(components/IconToggle): Disabled IconToggle disappears on hover
- 012dea47d: feat(components/ModelViewer): update on semantic awareness

### Patch Changes

- Updated dependencies [a0c468bb3]
- Updated dependencies [533cde920]
  - @talend/bootstrap-theme@6.37.0

## 6.37.0

### Minor Changes

- 477f2e3fc: VirtualizedList: MappedCellData (#3393)
- 477f2e3fc: Add tooltip for Status component (#3399)
