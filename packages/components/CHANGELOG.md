# @talend/react-components

## 7.10.1

### Patch Changes

- e6efa126f: fix(TDP-11342): do not reset Datalist filter on titleMap change

## 7.10.0

### Minor Changes

- 0f4721375: feat(TDC-6381): QualityBar design adjustments

## 7.9.0

### Minor Changes

- 06915b812: Allow to customize drawer's subtitle tag

  **Breaking change :**

  Props `subtitleTagLabel` and `subtitleTagTooltip` are replaced by a props `subtitleTag`.

  Props `subtitleTag` has following shape :

  ```
  {
      label: PropTypes.string,
      tooltip: PropTypes.string,
      variant: PropTypes.oneOf(TagVariantsNames),
  }
  ```

  _NOTE: While this props are only used by TPD this breaking change is passed as minor change to avoid waiting dataset release_

## 7.8.0

### Minor Changes

- b02eb9ef4: feat: upgrade d3 to 7

### Patch Changes

- 5e0148797: fix(Datalist/TDOPS-2632): update data list entry if name is not the same

## 7.7.0

### Minor Changes

- 4248c2e69: feat(TDC-6290): add List visible columns persistance and columns chooser UX improvements

### Patch Changes

- f4ba0ef47: fix: move ds as peerDependencies

## 7.6.0

### Minor Changes

- eba1ac047: feat: add HeaderBar and AppSwitcher icon props

## 7.5.0

### Minor Changes

- a99154a7d: generate minified css using dot min in the name of it

### Patch Changes

- Updated dependencies [617ec14f0]
- Updated dependencies [a99154a7d]
  - @talend/design-system@4.0.0

## 7.4.0

### Minor Changes

- 0ff3ba098: Update Drawer's subtitle placement

## 7.3.1

### Patch Changes

- 70e6d1c9a: fix(component): don't spread row data to cellTitle action
- Updated dependencies [03010b19b]
- Updated dependencies [c584eaaeb]
- Updated dependencies [c584eaaeb]
- Updated dependencies [c584eaaeb]
- Updated dependencies [c584eaaeb]
- Updated dependencies [c584eaaeb]
- Updated dependencies [c584eaaeb]
  - @talend/design-system@3.5.1
  - @talend/icons@6.46.0

## 7.3.0

### Minor Changes

- 8f396f7d5: feat(TDC-6337): allow multiple values in Emphasis

### Patch Changes

- f8a5555eb: fix(TDC-6368): no ellipsis on long subheaderbar titles

## 7.2.1

### Patch Changes

- eeda8a18a: feat(components): align new and old icons in the sidepanel
- Updated dependencies [4219dd686]
- Updated dependencies [4219dd686]
- Updated dependencies [4219dd686]
- Updated dependencies [4219dd686]
- Updated dependencies [4219dd686]
- Updated dependencies [4219dd686]
- Updated dependencies [4219dd686]
- Updated dependencies [4219dd686]
- Updated dependencies [4219dd686]
- Updated dependencies [4219dd686]
- Updated dependencies [4219dd686]
- Updated dependencies [4219dd686]
- Updated dependencies [4219dd686]
- Updated dependencies [4219dd686]
- Updated dependencies [4219dd686]
- Updated dependencies [4219dd686]
- Updated dependencies [4219dd686]
- Updated dependencies [4219dd686]
- Updated dependencies [4219dd686]
- Updated dependencies [4219dd686]
  - @talend/icons@6.44.1

## 7.2.0

### Minor Changes

- 3422f271f: feat(components): allow to use new icons in legacy buttons

## 7.1.0

### Minor Changes

- 252e346b1: feat(components/sidepanel): allow beta tag

### Patch Changes

- Updated dependencies [21189557e]
  - @talend/design-system@3.4.0

## 7.0.5

### Patch Changes

- cc9b1083f: fix(AMG-202): VList with single column crash

## 7.0.4

### Patch Changes

- 4fb50ba78: FormatValue: `key` attribute can be duplicated
- Updated dependencies [a90ec3748]
- Updated dependencies [a90ec3748]
  - @talend/design-system@3.2.0

## 7.0.3

### Patch Changes

- 85b73cb64: fix(TDC-6341): improve RatioBarComposition accessibility

## 7.0.2

### Patch Changes

- d4b21e191: fix(TDC-6341): quality bars should use Tooltip from DS
- Updated dependencies [8b9a8b5da]
  - @talend/design-system@3.1.0

## 7.0.1

### Patch Changes

- 1770e701b: fix: include peerDependencies in UMD manifest
- Updated dependencies [1770e701b]
  - @talend/design-system@3.0.1

## 7.0.0

### Major Changes

- 1160ec1f6: InlineMessage component is now only coming from design system. No more classnames. No more Link as components.
  Breaking changes:
  - No more `as`, `className` nor `style` props
  - `link` prop now is an object (based on the `Link` component props)

### Minor Changes

- c8fbf0130: feat(TDC-6235): pass input reference to datalist rendering function

### Patch Changes

- 9a581a4bc: Datalist: keep user filter when suggestion changes
- Updated dependencies [5a30f1f0e]
- Updated dependencies [051dfd9fb]
- Updated dependencies [1160ec1f6]
  - @talend/design-system@3.0.0

## 6.49.0

### Minor Changes

- 47b758112: feat(ARCH-482): use React 17 internally and extend react peer dep version

### Patch Changes

- 6562e397f: fix(components): datalist selection by id should allow all types
- Updated dependencies [47b758112]
  - @talend/react-bootstrap@1.35.0
  - @talend/design-system@2.7.0
  - @talend/icons@6.42.0
  - @talend/bootstrap-theme@6.39.0
  - @talend/utils@2.3.0

## 6.48.0

### Minor Changes

- bdf23018f: Add a tooltip to the tag

## 6.47.0

### Minor Changes

- 7d1f9f509: Add a Feature tag on drawer subtitle
- 66fa02548: move from react-bootstrap to @talend/react-bootstrap

### Patch Changes

- Updated dependencies [66fa02548]
  - @talend/react-bootstrap@1.34.0

## 6.46.7

### Patch Changes

- ecd3b81ae: fix(components): datalist should show selected item by id

## 6.46.6

### Patch Changes

- 0332ed371: Datalist : Blur should persist value only if the filter value is different from the selected one

## 6.46.5

### Patch Changes

- c834a7ec6: fix(Notification): remove this in functional component
- Updated dependencies [453802c72]
- Updated dependencies [6f68d11f4]
  - @talend/design-system@2.6.0
  - @talend/icons@6.41.0

## 6.46.4

### Patch Changes

- 344a7551f: fix: proptypes of VList

## 6.46.3

### Patch Changes

- 3be3e132d: Datalist should update its value when the titleMap changes

## 6.46.2

### Patch Changes

- e04e3910f: feat(components/QualityBar): rework quality bar with design tokens

## 6.46.1

### Patch Changes

- bcc5e70ed: fix(VList): handle VList without columns

## 6.46.0

### Minor Changes

- b375a5ba7: feat(List): add column chooser for VList and change toolbar buttons aspect

### Patch Changes

- d514bd8ea: fix DataList component error when int type

## 6.45.1

### Patch Changes

- f5e8188f1: FormatValue: Handle string without whitespaces

## 6.45.0

### Minor Changes

- 9522692fa: chore(Datalist): Allow reset to empty in restricted mode

### Patch Changes

- Updated dependencies [59a16bfa7]
  - @talend/design-system@2.4.0

## 6.44.14

### Patch Changes

- 80a15c11a: fix(Datalist): keep suggestions when clicking inside the suggestion box

## 6.44.13

### Patch Changes

- 5ff371756: fix(MultiSelect): add height for the dropdown if there is no option available
- Updated dependencies [2b355ac2e]
- Updated dependencies [2e19164bf]
  - @talend/design-system@2.3.0

## 6.44.12

### Patch Changes

- aa1db9881: fix(AboutModal): rendering fail while no values was given everywhere

## 6.44.11

### Patch Changes

- aaba017d2: fix(Datalist): focus management on inside element click

## 6.44.10

### Patch Changes

- a2210ebc2: fix(TDOPS-963/Typeahead): wrong positioning on first opening
- 2ee202538: fix(List): add back tc-list-item for some hover behaviour

## 6.44.9

### Patch Changes

- 1ae188285: fix(WithDrawer): Drawer is rendering below the Typeahead icon
- Updated dependencies [ed98b0840]
  - @talend/design-system@2.2.0

## 6.44.8

### Patch Changes

- 66a9b86bc: fix(ListTable): remove box-shadow on each item
- 0f848b415: chore(ARCH-482/FilterBar): remove deprecated lifecycle and use RTL for tests
- Updated dependencies [3aa82e6be]
  - @talend/design-system@2.1.2

## 6.44.7

### Patch Changes

- fd3f5442e: chore(ARCH-482/DateTimePickers): remove deprecated lifecycle
- a44e4d55b: fix(Typeahead): removed extra listbox role on container div
- a835c8ce5: AboutDialog: Unnecessary div in markup

## 6.44.6

### Patch Changes

- 96c51cd49: fix(Datalist): Allow to open the datalist clicking the caret icon
- 8118231d6: update simplebar dependency
- cf3a08f50: update rc-slider dependency
- 95ebe8e3b: fix(components/VirtualizedList): shrink column headers to fit with cells width and ellipsis
- Updated dependencies [c891f780a]
- Updated dependencies [e4fb9b78d]
- Updated dependencies [cb8f55ef0]
  - @talend/design-system@2.1.0

## 6.44.5

### Patch Changes

- Updated dependencies [7af0ef8f6]
  - @talend/design-system@2.0.0

## 6.44.4

### Patch Changes

- a0cbbb968: convertToTimeZone function with specific timezone and summertime
- Updated dependencies [9f87b591a]
- Updated dependencies [a98bf3ede]
  - @talend/utils@2.2.0
  - @talend/design-system@1.17.0

## 6.44.3

### Patch Changes

- 832d82673: upgrade build to expose stylePath from design-system

## 6.44.2

### Patch Changes

- 2e22151be: WithDrawer: Drawer is rendering below Switcher buttons

## 6.44.1

### Patch Changes

- 275c25ee0: chore(dependencies): auto update for maintenance purpose

  ```diff
  -    "@talend/design-system": "^1.14.4"
  +    "@talend/design-system": "^1.15.0"
  ```

- Updated dependencies [3bf0f1f18]
- Updated dependencies [275c25ee0]
- Updated dependencies [3bf0f1f18]
  - @talend/icons@6.39.0
  - @talend/utils@2.1.1
  - @talend/design-system@1.15.1

## 6.44.0

### Minor Changes

- aff6d1de5: WithDrawer: Support appear/exit animations

### Patch Changes

- 6d48f0ba0: fix: update withDrawer z-index
- Updated dependencies [277ad2977]
- Updated dependencies [07b5d6fc5]
  - @talend/design-system@1.14.4

## 6.43.5

### Patch Changes

- 618951c8b: chore(deps): auto update for maintenance purpose
- Updated dependencies [618951c8b]
- Updated dependencies [b268c0c43]
  - @talend/design-system@1.14.0

## 6.43.4

### Patch Changes

- 9aada93d4: fix: OverlayTrigger fork to use portal so the overlay is attached in current VirtualDOM to have access to new style React Providers.
- Updated dependencies [99f880903]
  - @talend/design-system@1.13.0

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
