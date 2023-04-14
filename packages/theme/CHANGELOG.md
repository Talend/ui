# @talend/bootstrap-theme

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
