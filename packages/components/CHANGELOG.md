# @talend/react-components

## 17.3.3

### Patch Changes

- 760db2b: fix: wrap reset css into reset layer
- Updated dependencies [d80737c]
  - @talend/icons@7.11.0

## 17.3.2

### Patch Changes

- f9c62f6: TMC-160 - Improve absolute footer buttons compatibility for all drawers
- 09807b1: fix(security): Re-write regexes to fix re-dos threat

## 17.3.1

### Patch Changes

- 5168318: fix: update floating-ui lib

## 17.3.0

### Minor Changes

- d4da631: fix(QualityBar): fix tooltip label typo

## 17.2.1

### Patch Changes

- c3b6358: docs: update links from surge to github.io

## 17.2.0

### Minor Changes

- 2a7fe08: chore: Remove ally.js

### Patch Changes

- d1f8b6b: Upgrade react-is to v18.3.1 and set as dependency (not peerDep) in design-system
- Updated dependencies [2a7fe08]
  - @talend/bootstrap-theme@9.3.0

## 17.1.3

### Patch Changes

- 7121ad1: fix InputDateTimeRangePicker gets wrong error message for multiple errors

## 17.1.2

### Patch Changes

- 7ebe036: Revert "fix: Fix exports to allow deep imports"
- Updated dependencies [7ebe036]
  - @talend/utils@3.2.3

## 17.1.1

### Patch Changes

- f321a0d: Remove unused tsconfig.esm.json (initially added to use TSC but we stay with babel at the end)
- Updated dependencies [f321a0d]
  - @talend/design-tokens@3.4.1
  - @talend/react-bootstrap@3.0.2
  - @talend/assets-api@1.5.1
  - @talend/icons@7.10.2
  - @talend/utils@3.2.2
  - @talend/react-a11y@4.0.1

## 17.1.0

### Minor Changes

- ca1734c: feat(TMC-28838/tags): add beta styled tag to the Tag component

## 17.0.1

### Patch Changes

- 94aad7d: fix: Fix exports to allow deep imports
- Updated dependencies [94aad7d]
  - @talend/utils@3.2.1

## 17.0.0

### Major Changes

- c3750a1: chore: upgrade dependencies

  Major upgrade for all packages that have a peerDependency on react or react-dom. Those packages now ask for react@18 and react-dom@18.

### Patch Changes

- Updated dependencies [c3750a1]
  - @talend/design-system@11.0.0
  - @talend/react-bootstrap@3.0.0
  - @talend/react-a11y@4.0.0
  - @talend/design-tokens@3.4.0
  - @talend/assets-api@1.5.0
  - @talend/icons@7.10.0
  - @talend/bootstrap-theme@9.2.0
  - @talend/utils@3.2.0

## 16.2.0

### Minor Changes

- 3bd16fc: Add support to ESM

### Patch Changes

- ced37a2: fix(TMC-27619/cellDate): enable tz offset conversion with sourceTz
- Updated dependencies [3bd16fc]
- Updated dependencies [3bd16fc]
- Updated dependencies [d053412]
- Updated dependencies [9b66a09]
  - @talend/design-tokens@3.3.0
  - @talend/react-bootstrap@2.3.0
  - @talend/assets-api@1.4.0
  - @talend/icons@7.9.0
  - @talend/utils@3.1.0
  - @talend/react-a11y@3.1.0
  - @talend/bootstrap-theme@9.1.4

## 16.1.4

### Patch Changes

- 50801bd: Reset currentStep to 0 when tour is reopened

## 16.1.3

### Patch Changes

- 003c7a4: fix(TDC-7452/Tour): Fix tour is changing to first step when closing

## 16.1.2

### Patch Changes

- b502805: Fix translation for date range

## 16.1.1

### Patch Changes

- a10f800: Fix: remove tilde for @use in sass files
- ceb4faf: Timer Picker overlay will now close when time is valid using keyboard
- f546896: Fix: improve call of use in sass files + fix ts lint
- Updated dependencies [a10f800]
- Updated dependencies [e521344]
- Updated dependencies [f546896]
  - @talend/bootstrap-theme@9.1.3
  - @talend/icons@7.7.2

## 16.1.0

### Minor Changes

- 8bf0dd5: feat(DGT-342): Moved QualityBar and RatioBar components to the Design System and use those components on @talend/react-components

### Patch Changes

- 9225a2d: TMC-27480 - Fix wording on invalid date range for date time picker

## 16.0.1

### Patch Changes

- 6a69c4c: Fix Drawer z-index that could prevent headerbar to display sub-menu

## 16.0.0

### Patch Changes

- Updated dependencies [ce93823]
  - @talend/design-system@10.0.0

## 15.3.2

### Patch Changes

- 2d7861a: fix: tooltip alignement for buttons in list component

## 15.3.1

### Patch Changes

- 1abc22f: chore: upgrade dependencies
- 5cedaf1: TMC-26238 - Fix JSON object viewer style on safari with word-break
- Updated dependencies [1abc22f]
  - @talend/design-tokens@3.1.1
  - @talend/react-bootstrap@2.2.2
  - @talend/assets-api@1.3.2
  - @talend/icons@7.7.1
  - @talend/bootstrap-theme@9.1.1
  - @talend/utils@3.0.4
  - @talend/react-a11y@3.0.1

## 15.3.0

### Minor Changes

- 5a621b1: Components - Switch components dates to use design system inputs

## 15.2.6

### Patch Changes

- 6305ea9: fix: enlarge drawer using back breakpoints

## 15.2.5

### Patch Changes

- c0c434c: fix: loadash imports
- Updated dependencies [c0c434c]
  - @talend/utils@3.0.2

## 15.2.4

### Patch Changes

- dbc290d: fix: Datalist hightligted element (keyboard navigation)

## 15.2.3

### Patch Changes

- 63ec624: fix: element does not goes over the box shadow in large mode for the list
- 788e8a0: Components Drawer - Fix styling when no actions in footer and remove bootstrap styles

## 15.2.2

### Patch Changes

- eece40c: fix: sort option not interactive with legacy list while in expanded view

## 15.2.1

### Patch Changes

- 52563ff: fix(TDOPS-5510/inlineEdit): add data attributes from props
- a73338d: Fix ListView virtual list calculation when having a lot of items
- Updated dependencies [52563ff]
  - @talend/utils@3.0.1

## 15.2.0

### Minor Changes

- 56d0d0a: TDOPS-448 - Enhance date picker controls to reduce number of clicks needed

## 15.1.0

### Minor Changes

- 9568363: Use include instead of same-origin in the credentials option of fetch.

### Patch Changes

- Updated dependencies [9568363]
  - @talend/design-tokens@3.1.0
  - @talend/icons@7.7.0
  - @talend/bootstrap-theme@9.1.0

## 15.0.2

### Patch Changes

- 1964aac: fix: rem values for JS files

## 15.0.1

### Patch Changes

- Updated dependencies [b1c72a1]
  - @talend/design-tokens@3.0.0
  - @talend/bootstrap-theme@9.0.0

## 15.0.0

### Major Changes

- 18c1d97: `rem` values have been updated to correspond to the new `rem` base (16px) define by the design system

### Patch Changes

- Updated dependencies [18c1d97]
  - @talend/design-system@9.0.0

## 14.3.0

### Minor Changes

- 3022b60: deps: bump simplebar to 6.x

### Patch Changes

- 3dc3100: fix(DFD-491): Fix header bar and layout styles
- Updated dependencies [8878c6c]
- Updated dependencies [3dc3100]
  - @talend/bootstrap-theme@8.5.0
  - @talend/icons@7.6.0

## 14.2.3

### Patch Changes

- fa6ca55: fix(DFD-491): Fix header bar and layout styles
- Updated dependencies [c317063]
- Updated dependencies [c317063]
- Updated dependencies [c317063]
  - @talend/icons@7.5.0
  - @talend/bootstrap-theme@8.4.2

## 14.2.2

### Patch Changes

- bfe3b20: TDOPS-5968 - Fix ListView checkbox alignement
- 941ff4f: feat: add BadgePeriod in faceted search

## 14.2.1

### Patch Changes

- 3c5082b: TDOPS-5733 - Notification long messages should break on words and not characters
- e8956e6: TDOPS-5872 - Allow subheader subtitle to display long labels
- e08217c: fix: dropdown with image display
- Updated dependencies [e08217c]
  - @talend/bootstrap-theme@8.4.1

## 14.2.0

### Minor Changes

- 1a3cdeb: Add an empty state to Typeahead

## 14.1.0

### Minor Changes

- 076147b: feat: update qlik theme

### Patch Changes

- Updated dependencies [076147b]
  - @talend/design-tokens@2.12.0
  - @talend/icons@7.4.0

## 14.0.0

### Major Changes

- 922e3eb: deps: bump date-fns to 3.X

### Patch Changes

- e095335: fix: elevation layer on headerbar
- Updated dependencies [922e3eb]
  - @talend/utils@3.0.0
  - @talend/react-a11y@3.0.0

## 13.1.6

### Patch Changes

- c023eb6: fix: help icon color in the header bar

## 13.1.5

### Patch Changes

- bb106bc: fix: adjustments for qlik-light theme
- Updated dependencies [bb106bc]
  - @talend/design-tokens@2.11.2

## 13.1.4

### Patch Changes

- dce3585: fix: back button tooltip position

## 13.1.3

### Patch Changes

- d479c75: fix: header bar help link style in qlik-light mode

## 13.1.2

### Patch Changes

- f172fa8: fix: Header bar border bottom in light mode

## 13.1.1

### Patch Changes

- 08bb2c1: fix: qlik theme fixes
- Updated dependencies [08bb2c1]
  - @talend/design-tokens@2.11.1

## 13.1.0

### Minor Changes

- b2d93a4: feat: add @qlik-light theme

### Patch Changes

- Updated dependencies [b2d93a4]
  - @talend/design-tokens@2.11.0

## 13.0.0

### Major Changes

- 7de44f9: Typeahead - Changed input to DS Form.Text

  #### BREAKING CHANGE

  Some props and styles that were previously working on bootstrap input might no longer work. Check classNames and overriding styles passed to Typeahead to check that it still integrates well within your pages

## 12.4.2

### Patch Changes

- bf0caf3: fix: empty date cell renderer

## 12.4.1

### Patch Changes

- 3ea63ce: fix: date-fns compatibility with Date Cell renderer while passing string date

## 12.4.0

### Minor Changes

- 424544a: chore: upgrade date-fns to 2.x and fix

### Patch Changes

- Updated dependencies [1bc49cd]
- Updated dependencies [424544a]
  - @talend/utils@2.9.0
  - @talend/react-a11y@2.3.0

## 12.3.1

### Patch Changes

- c468f2f: chore: upgrade dependencies
- 6c2df2b: Upgrade dependencies using talend-scripts upgrade:deps
- Updated dependencies [c468f2f]
- Updated dependencies [6c2df2b]
  - @talend/design-tokens@2.10.1
  - @talend/react-bootstrap@2.2.1
  - @talend/assets-api@1.3.1
  - @talend/icons@7.3.1
  - @talend/bootstrap-theme@8.3.1
  - @talend/react-a11y@2.2.1

## 12.3.0

### Minor Changes

- 24bcb177f: Remove usage of lib keyCode

### Patch Changes

- 795a12e2d: fix: security issue on regexp
- Updated dependencies [24bcb177f]
  - @talend/react-bootstrap@2.2.0
  - @talend/react-a11y@2.2.0

## 12.2.0

### Minor Changes

- e87f8e091: feat(TDP-12694): add pendo trackers to guided-tour actions

### Patch Changes

- 8b1dc1fac: TDOPS-5671 - Fix tooltip display on date time ranger picker
- Updated dependencies [f14ebbe23]
- Updated dependencies [02e2d012c]
  - @talend/react-bootstrap@2.1.1
  - @talend/icons@7.3.0

## 12.1.0

### Minor Changes

- 3f9c8a7bb: update babel config to use babel.config.js instead of .babelrc.json
  add missing deps
  add a tsconfig.build.json to exclude test files

### Patch Changes

- 2177ddfb3: PlainTextTitle component: pass data atrributes
- Updated dependencies [3f9c8a7bb]
- Updated dependencies [3f9c8a7bb]
  - @talend/icons@7.1.0
  - @talend/react-bootstrap@2.1.0

## 12.0.0

### Major Changes

- 96d688489: React: Upgrade to react 18 and @types/react 18
- 4044f6198: ARCH-662 - Bump i18next from v20 to v23 and react-i18next from v11 to v13

### Minor Changes

- 9a0732ec5: feat: upgrade react-is

### Patch Changes

- da4cf2971: TDOPS-762 - Allow notification message to have long labels with proper overflow
- Updated dependencies [96d688489]
- Updated dependencies [9a0732ec5]
- Updated dependencies [9a0732ec5]
- Updated dependencies [bacaa4b31]
- Updated dependencies [4044f6198]
- Updated dependencies [9a0732ec5]
  - @talend/design-system@8.0.0
  - @talend/react-bootstrap@2.0.0
  - @talend/icons@7.0.0
  - @talend/react-a11y@2.0.0
  - @talend/bootstrap-theme@8.2.1

## 11.4.5

### Patch Changes

- b0f7bbf70: fix(TDC-7364): FormatValue component - fix content not appearing when there were leading whitespaces

## 11.4.4

### Patch Changes

- 1cb4b7b29: fix(TFD-16296): Add ellipsis on collapsible panel header
- Updated dependencies [9d137cb98]
  - @talend/bootstrap-theme@8.2.0

## 11.4.3

### Patch Changes

- 941231e01: fix(TDP-12616): fix checkbox mark style on multi-select

## 11.4.2

### Patch Changes

- 4f8429b41: TDOPS-1878 - Notification container now has a max height to handle long and multiple notifications not overflowing the screen
- Updated dependencies [6af561463]
  - @talend/icons@6.60.0

## 11.4.1

### Patch Changes

- b60f5b5c1: TDOPS-2619 - Align column chooser style with Design System
- a5e724a5b: TDOPS-5105 - Components badge now have the right separator color
- 387afd9fd: TDOPS-872 - VList cell content should display a tooltip for 0 value as well

## 11.4.0

### Minor Changes

- f0c98a7e6: Components - Layout can now be given a theme directly from props by parent app

## 11.3.3

### Patch Changes

- a958d95ae: TDOPS-4488 - Components VList can handle data attributes for Link column
- 8f1196fb0: fix(TDC-7310) - fixed select all checkbox disappearing by replacing with TUI Checkbox

## 11.3.2

### Patch Changes

- f73fdbc46: fix: change drawer header color

## 11.3.1

### Patch Changes

- 8277e1f39: TDOPS-4488: Add VList Link column to disctionary

## 11.3.0

### Minor Changes

- a6ac16f28: TDOPS-4488 - Allow to have links in VirtualList in Title cell and dedicated Link cell

## 11.2.3

### Patch Changes

- fbce059c2: Improve usage of design tokens for info variants
- 72b95c880: TDOPS-5081 - Fixed FilterBar in VList header having wrong style on hover
- Updated dependencies [fbce059c2]
  - @talend/bootstrap-theme@8.1.2

## 11.2.2

### Patch Changes

- 79cc47c03: Use elevation token for headerbar to be in line with other components

## 11.2.1

### Patch Changes

- 58f8ff666: Fix button style for filter bar clear button
- a5348a439: TDOPS-4964 - Fix SidePanel colors
- 82e08d6e5: TDOPS-4890 - Fix Notifications text color
- Updated dependencies [58f8ff666]
- Updated dependencies [a5348a439]
  - @talend/bootstrap-theme@8.1.1

## 11.2.0

### Minor Changes

- c65edb127: fix(TDP-12557): use lighter gray for format value whitespace

## 11.1.3

### Patch Changes

- 3345262d2: fix: tokens on the Slider component and migration to typescript
- Updated dependencies [b36165add]
  - @talend/design-tokens@2.8.0

## 11.1.2

### Patch Changes

- 62bcde608: fix: setup the interactive stuff in accent color for the subheader bar

## 11.1.1

### Patch Changes

- a38d7b28a: fix: change icon color to neutral in subheader as it's not an interactive component
  fix: change the border color of the grid layout to be weaker

## 11.1.0

### Minor Changes

- c15088d3b: TDOPS-4856 - Fix List colors taken from DS tokens

## 11.0.0

### Major Changes

- bfc02c4fb: Style now use design tokens instead of bootstrap sass variables

  We have updated the following components:

  - ActionBar
  - ActionIconToggle
  - AppLoader
  - Badge
  - CollapsiblePanel
  - Datalist
  - DataViewer
  - DateTimePickers + Legacy
  - Drawer
  - EditableText
  - Enumeration (bug on buttons)
  - FilterBar
  - FormatValue
  - GuidedTour
  - GridLayout aka Dashboard
  - HeaderBar
  - List (Virtualized and Composition)
  - ListView
  - MultiSelect
  - Notification
  - ObjectViewer
  - PieChart
  - Progress
  - RadarChart
  - ResourceList
  - ResourcePicker
  - RichLayout
  - Skeleton
  - Slider
  - Status
  - SubHeaderBar
  - Toggle
  - Tooltip
  - TreeView
  - Typeahead

### Patch Changes

- 40e70c055: chore: remove devDependencies to typescript
- Updated dependencies [bfc02c4fb]
  - @talend/bootstrap-theme@8.0.0

## 10.3.5

### Patch Changes

- fcd8daf3c: fix: VirtualizedList.CellLabel support empty CellData
- c7f316d7c: - chore: remove enzyme devDependencies
  - chore: remove **mocks**/props-without-i18n.js
- b8c4161d2: - fix: add missing proptypes on Inject
  - fix(dropdown): propagate missing id for a11y
  - chore: treeview remove unknow props key
- 3099c427a: fix: remove wrong propTypes from Checkbox component

  fix: remove active props to Button which was responsible for the following error:

  ```
  Warning: Received `true` for a non-boolean attribute `active`.

      If you want to write it to the DOM, pass a string instead: active="true" or active={value.toString()}.
  ```

  fix: Columns fieldset propTypes
  fix: Fieldset propTypes
  fix: omit isDisabledChecker from input in Date/Time pickers

## 10.3.4

### Patch Changes

- b99957a47: test: rewrite all tests using react-testing-library
- 0ccc2592e: test: rewrite using react testing-library the following components:

  - TabBar
  - Tag
  - Toggle
  - TooltipTrigger
  - TreeView
  - Typeahead
  - withDrawer

  Rewrite theme utility in Typescript

## 10.3.3

### Patch Changes

- 52d4f2df3: test: rewrite tests using testing-library of the following components:

  - ResourceList
  - ResourcePicker
  - Rich
  - SidePanel
  - Skeleton
  - Slider
  - SubHeaderBar

- b326091d2: Fix config of i18n in packages/storybook and upgrade versions of locales in others packages
- 85b04cc81: test(List): rewrite using RTL
- 9719af7af: test: rewrite test using RTL of the following components:

  - ObjectViewer
  - OverlayTrigger
  - PieChart
  - RadarChart
  - RatioBar

- Updated dependencies [fca736c31]
- Updated dependencies [fca736c31]
  - @talend/icons@6.58.1

## 10.3.2

### Patch Changes

- b96328ad4: - chore: rewrite Skeleton & GridLayout in TS
  - test rewrite tests from enzyme to RTL of FocusManager, GridLayout
- d44f9deb3: fix(ResourceList): fix some sizing issue
- 2fa0bd46c: test: rewrite tests using RTL of:

  - JSONSchemaRenderer
  - Layout
  - Loader

  chore(Link): rename index.js into index.ts

  chore(Layout): migrate to TS part of internals

- 56948ce94: - rewrite tests using RTL of Dialog, Drawer, EditableText, Enumeration
  - refactor the EditableText component
  - refactor Enumeration
- c94aceb65: - fix: Remove wrong proptypes from Action (overlay).
  Make a lots of noise for nothing the overlay is not required on Action.

  - chore: refactor HeaderBar. move into private primitives each internal components
  - tests: rewrite tests of Inject and HTTPError
  - chore: rewrite Inject using Typescript
  - chore: rename index files of Icons and IconsProvider to index.ts

- Updated dependencies [49d174081]
- Updated dependencies [49d174081]
- Updated dependencies [49d174081]
- Updated dependencies [49d174081]
- Updated dependencies [49d174081]
- Updated dependencies [49d174081]
  - @talend/icons@6.58.0

## 10.3.1

### Patch Changes

- 37f6f9f14: chore: rewrite tests of DateTimePickers

## 10.3.0

### Minor Changes

- ae37dc329: feat: update peerDependencies to accept react-18

### Patch Changes

- Updated dependencies [ae37dc329]
  - @talend/react-a11y@1.1.0

## 10.2.4

### Patch Changes

- 96194d436: rewrite test using RTL and add some data-testid

## 10.2.3

### Patch Changes

- cf697de02: chore: clean React imports to only used properties
- 708589ad4: chore: Move Gesture into a dedicated package written in typescript
- Updated dependencies [cf697de02]
- Updated dependencies [9a5d93e5b]
- Updated dependencies [9a5d93e5b]
- Updated dependencies [9a5d93e5b]
- Updated dependencies [9a5d93e5b]
- Updated dependencies [9a5d93e5b]
- Updated dependencies [9a5d93e5b]
- Updated dependencies [9a5d93e5b]
- Updated dependencies [9a5d93e5b]
- Updated dependencies [9a5d93e5b]
- Updated dependencies [9a5d93e5b]
- Updated dependencies [9a5d93e5b]
- Updated dependencies [9a5d93e5b]
- Updated dependencies [9a5d93e5b]
  - @talend/icons@6.57.0

## 10.2.2

### Patch Changes

- e7d785a6a: fix: rewrite wrap fn using typescript
- 7a097213f: chore: add some data-test to rewrite test using RTL
- 616601fda: chore: clean unnecessary react imports after React v17

  removed by running script `npx react-codemod update-react-imports`

  see doc https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports

- 7a097213f: test: add data-test to circular-progress
- Updated dependencies [9db7ef2fe]
- Updated dependencies [9db7ef2fe]
- Updated dependencies [9db7ef2fe]
- Updated dependencies [9db7ef2fe]
- Updated dependencies [9db7ef2fe]
- Updated dependencies [b0193afbd]
- Updated dependencies [616601fda]
- Updated dependencies [9db7ef2fe]
- Updated dependencies [9db7ef2fe]
  - @talend/icons@6.55.0

## 10.2.1

### Patch Changes

- 6d2d52b79: fix(stepper): bring back a css selector and setup a width

## 10.2.0

### Minor Changes

- 3604ba4f6: feat(components): add disabled mode for the quality bar
- 691e07a11: feat(components): use ErrorState in the Stepper
- 3604ba4f6: feat(components): change the color for the non applicables elements in the quality bar

## 10.1.1

### Patch Changes

- 20f8526e9: test: rewrite using RTL

## 10.1.0

### Minor Changes

- 44b408dc4: feat(components): List - disable item selection & disable "select all"

## 10.0.0

### Major Changes

- 4dfe7b010: feat(TDOPS-3849): add Generic action in HeaderBar component

## 9.6.0

### Minor Changes

- d2f5bd835: feat(TDP-11751): adding the possibility to set a specific height to the table and disable autosizer

### Patch Changes

- Updated dependencies [9d8506a82]
- Updated dependencies [9d8506a82]
- Updated dependencies [9d8506a82]
- Updated dependencies [9d8506a82]
- Updated dependencies [9d8506a82]
- Updated dependencies [9d8506a82]
- Updated dependencies [9d8506a82]
- Updated dependencies [9d8506a82]
  - @talend/icons@6.54.0

## 9.5.0

### Minor Changes

- 120d02173: Supports hiding tooltip for ObjectViewer(JSONLike)

## 9.4.2

### Patch Changes

- e79dfc100: update default values of locales

## 9.4.1

### Patch Changes

- 21d87a111: fix: apply code style
- Updated dependencies [ab0bd21cf]
  - @talend/bootstrap-theme@7.0.1

## 9.4.0

### Minor Changes

- 703133e82: feat(Datalist): add new value available directly in the datalist while been in the add new value mode

### Patch Changes

- ce84cd6ad: fix(TDP-11750): WithDrawer content hidden on safari due to hidden overflow
- Updated dependencies [76c15bf5e]
- Updated dependencies [76c15bf5e]
  - @talend/icons@6.52.0

## 9.3.0

### Minor Changes

- 012d6fe31: Add data-test attribute

### Patch Changes

- bb92ff4bd: fix not translated "select all" in list component

## 9.2.1

### Patch Changes

- 8a3537827: TDOPS-3399 - Fix HeaderBar button style on hover

## 9.2.0

### Minor Changes

- a3ac5792b: fix not translated "select all" in list component

## 9.1.0

### Minor Changes

- 898ffafc2: fix(TDP-11600): allow the datalist to create new value with a better ux

  On the datalist, new props called

  - `allowAddNewElements` can be passed to let the user create new value with a hint to tell him that the value was not existing in the current titlemap.
  - `allowAddNewElementsSuffix` allow to override the "(new)" suffix by another one.

### Patch Changes

- 0110ae76f: TDOPS-2650 - Datalist icon size should be restricted to inline buttons

## 9.0.1

### Patch Changes

- f0a97113e: fix: use randomUUID from talend/utils
- Updated dependencies [f0a97113e]
- Updated dependencies [784fe3919]
  - @talend/utils@2.5.0
  - @talend/icons@6.51.1

## 9.0.0

### Major Changes

- 9c44d724f: ## Breaking changes :
  Specific application themes are beeing removed. They were no longer imported by the webpack config, and now we won't be able to import them manually.

  - SidePanel icon is no more handled by the application theme
  - HeaderBar icon is no more handled by the application theme

  ### HeaderBar

  Use either `icon` or `iconUrl` in the header `brand` property

  ```diff
  <HeaderBar
      ...
  	brand={{
  		...props.brand,
  +       icon: 'talend-tmc-positive',
  	}}
      ...
  };
  ```

  ### SidePanel

  Use `backgroundIcon` in the sidepanel properties

  ```diff
  +import assetsApi from '@talend/assets-api';

  <SidePanel
      ...
  +    backgroundIcon={assetsApi.getURL('/src/svg/products/tmc-negative.svg', '@talend/icons')}
      ...
  />
  ```

### Minor Changes

- 1200c70f8: feat: remove uuid dependencies

### Patch Changes

- 14b462534: fix(SubHeader): editable text size
- Updated dependencies [9c44d724f]
- Updated dependencies [e83d88f83]
  - @talend/bootstrap-theme@7.0.0

## 8.0.1

### Patch Changes

- 8b4502c98: fix: put types in a /types folder

  If you want to give a try on generated types you can use the following configuration in a `types.d.ts` file:

  ```
  declare module '@talend/react-components' {
  	export * from '@talend/react-components/types';
  }
  ```

## 8.0.0

### Major Changes

- 105990b24: feat(SubHeaderBar): replace `EditableText` legacy component by `InlineEditing` Coral component.

  Breaking:

  - `onEdit` and `onCancel` props has been removed. They are now directly handled by the `InlineEditing` component.
  - `onSubmit` callback signature changed from `onSubmit(event: JSEvent, { value: string })` to `onSubmit(event: JSEvent, value: string)` the returned value from the `InlineEditing` component is not wrapped within an object containing only one `value` property. You now have the `value` directly.

### Minor Changes

- 2be2c3f47: feat: add typings

### Patch Changes

- ef3977697: fix(List): separator alignment for persistent actions
- c0ed60ee5: chore(TDS-6840): use DS ButtonIcon in collapsible and legacy datepicker

## 7.11.3

### Patch Changes

- 5d36d7e6c: fix(TDS-6837): not using submit type button in legacy date picker

## 7.11.2

### Patch Changes

- efc5c2d8e: fix(components): QualityBar in split mode

## 7.11.1

### Patch Changes

- be965094a: fix(components): sidepanel reversed color in gray
- Updated dependencies [5cb57bbee]
- Updated dependencies [5cb57bbee]
- Updated dependencies [5cb57bbee]
- Updated dependencies [5cb57bbee]
- Updated dependencies [5cb57bbee]
- Updated dependencies [5cb57bbee]
- Updated dependencies [5cb57bbee]
- Updated dependencies [5cb57bbee]
- Updated dependencies [5cb57bbee]
- Updated dependencies [5cb57bbee]
- Updated dependencies [5cb57bbee]
- Updated dependencies [5cb57bbee]
- Updated dependencies [5cb57bbee]
- Updated dependencies [5cb57bbee]
- Updated dependencies [0260a77b8]
- Updated dependencies [5cb57bbee]
  - @talend/icons@6.50.0
  - @talend/bootstrap-theme@6.39.1

## 7.11.0

### Minor Changes

- c1bb5178f: feat: add SidePanel backgroundIcon props

### Patch Changes

- e2e3ec77b: fix: explicit import of sass-data

## 7.10.3

### Patch Changes

- e2174b30b: fix: scss filename now follow css module filename pattern
- 6fd16be45: fix: use flex-start instead of start

## 7.10.2

### Patch Changes

- 561018c26: fix(TFD-14580): Fix DataViewer click on icons

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
