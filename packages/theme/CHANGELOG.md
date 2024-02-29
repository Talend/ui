# @talend/bootstrap-theme

## 9.1.1

### Patch Changes

- 1abc22f: chore: upgrade dependencies
- Updated dependencies [1abc22f]
  - @talend/design-tokens@3.1.1
  - @talend/bootstrap-sass@5.2.1

## 9.1.0

### Minor Changes

- 9568363: Use include instead of same-origin in the credentials option of fetch.

### Patch Changes

- Updated dependencies [9568363]
  - @talend/design-tokens@3.1.0
  - @talend/bootstrap-sass@5.2.0

## 9.0.0

### Major Changes

- b1c72a1: `rem` values have been updated to correspond to the new `rem` base (16px) define by the design system

### Patch Changes

- Updated dependencies [b1c72a1]
  - @talend/design-tokens@3.0.0

## 8.5.0

### Minor Changes

- 8878c6c: deps: bump css-minimizer-webpack-plugin

### Patch Changes

- Updated dependencies [3dc3100]
  - @talend/bootstrap-sass@5.0.0

## 8.4.2

### Patch Changes

- Updated dependencies [9f9fc07]
  - @talend/bootstrap-sass@4.0.0

## 8.4.1

### Patch Changes

- e08217c: fix: dropdown with image display

## 8.4.0

### Minor Changes

- 89f7250: fix(DFD-502): Update toggle active hover background color with coral tokens

## 8.3.1

### Patch Changes

- c468f2f: chore: upgrade dependencies
- Updated dependencies [c468f2f]
  - @talend/design-tokens@2.10.1

## 8.3.0

### Minor Changes

- b9cc5b097: Add missing deps and fix webpack.config file

### Patch Changes

- Updated dependencies [b9cc5b097]
  - @talend/design-tokens@2.10.0

## 8.2.1

### Patch Changes

- Updated dependencies [96d688489]
  - @talend/icons@7.0.0

## 8.2.0

### Minor Changes

- 9d137cb98: feat: upgrade some webpack loader

### Patch Changes

- Updated dependencies [9d137cb98]
  - @talend/bootstrap-sass@3.5.0

## 8.1.3

### Patch Changes

- a7eb1a831: fix(TDOPS-5103): Fix the notification is covered by detail drawer

## 8.1.2

### Patch Changes

- fbce059c2: Improve usage of design tokens for info variants

## 8.1.1

### Patch Changes

- 58f8ff666: Fix focus and active state colors for bootstrap buttons
- a5348a439: TDOPS-4964 - Fix SidePanel colors

## 8.1.0

### Minor Changes

- 275e7da72: feat: use design-tokens for elevation

## 8.0.1

### Patch Changes

- ae4916894: Bootstrap Theme : Fix various button border issues using Design System tokens

## 8.0.0

### Major Changes

- bfc02c4fb: Use @talend/design-tokens for all colors

  This is considered as a BREAKING CHANGE.

  To be aligned with this theme you should:

  - replace all hardcoded colors used in your project and use `@talend/design-tokens`
  - test your application with the dark theme

  We have updated the following bootstrap styles:

  - Button
  - Table
  - Form (control)
  - Navbar
  - Modal
  - Tooltip
  - Popover
  - Alert
  - Label
  - Breadcrumb
  - Tabs
  - Progress bar
  - Panel
  - Weel
  - List group
  - Pagination
  - Badge
  - Pills

## 7.0.1

### Patch Changes

- ab0bd21cf: chore: apply code style

## 7.0.0

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

### Patch Changes

- e83d88f83: chore: upgrade postcss-preset-env devDependency with major version

## 6.39.1

### Patch Changes

- 0260a77b8: fix: add sassdata to variations
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
- Updated dependencies [5cb57bbee]
  - @talend/icons@6.50.0

## 6.39.0

### Minor Changes

- 47b758112: feat(ARCH-482): use React 17 internally and extend react peer dep version

### Patch Changes

- Updated dependencies [47b758112]
  - @talend/icons@6.42.0

## 6.38.6

### Patch Changes

- 86f208189: chore: upgrade dependencies and align @talend scoped packages to latest

## 6.38.5

### Patch Changes

- 667cd0a50: chore: upgrade dependencies and align @talend scoped packages to latest
- Updated dependencies [667cd0a50]
  - @talend/icons@6.36.3

## 6.38.4

### Patch Changes

- 809c30848: fix(boostrap-sass): use calc instead of math.div
- Updated dependencies [809c30848]
  - @talend/bootstrap-sass@3.4.8

## 6.38.3

### Patch Changes

- ca60841df: revert usage of @use sass:math
- Updated dependencies [ca60841df]
  - @talend/bootstrap-sass@3.4.7

## 6.38.2

### Patch Changes

- f1f4ec5bc: fix(workspace-run): package run order
- Updated dependencies [f1f4ec5bc]
  - @talend/bootstrap-sass@3.4.6
  - @talend/icons@6.36.2

## 6.38.1

### Patch Changes

- 3e9121287: chore(build): order packages on pre-release hook
- Updated dependencies [3e9121287]
  - @talend/bootstrap-sass@3.4.5
  - @talend/icons@6.36.1

## 6.38.0

### Minor Changes

- 274771710: Forms style to be more readable

## 6.37.2

### Patch Changes

- 0bd4c26f8: Fix pre-release script: remove display=none option

## 6.37.1

### Patch Changes

- 6cd686e30: fix(theme): resolve font url

## 6.37.0

### Minor Changes

- a0c468bb3: fix(theme): Fix chevron rotation on firefox
- 533cde920: feat(theme/modals): Remove modal max height

## 6.36.1

### Patch Changes

- 2be90ec26: Integrate @talend/bootstrap-sass fork and update theme to fix deprecation warning
