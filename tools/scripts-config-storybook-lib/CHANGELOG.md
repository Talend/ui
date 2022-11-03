# @talend/scripts-config-storybook-lib

## 2.2.0

### Minor Changes

- a23396460: feat: add id on bootstrap.css link tag

## 2.1.4

### Patch Changes

- 26777dbe7: deps: bump msw to 0.47.3

## 2.1.3

### Patch Changes

- 39f292531: fix: update setup of msw
- 8796308e5: chore(talend-scripts): disable storybook telemetry

## 2.1.2

### Patch Changes

- e22e3c952: chore(deps): bump storybook deps

## 2.1.1

### Patch Changes

- 7856e6961: angular xlts packages can't be fetched from unpkg.com

## 2.1.0

### Minor Changes

- e6fb534c2: Disable bundle-analyze-plugin to speed up build
- 55e65015a: Add @storybook/jest dependency

## 2.0.1

### Patch Changes

- Updated dependencies [b16efa779]
  - @talend/dynamic-cdn-webpack-plugin@13.0.0

## 2.0.0

### Major Changes

- 202b4daf2: Webpack major upgrade (4 to 5).

  ## Breaking changes

  @talend/bootstrap-theme is not imported anymore for you. You have to import it first in your project

  ```diff
  +import '@talend/bootstrap-theme';
  ```

  No more polyfills loaded for you. We have removed the folliwng packages:

  - `regenerator-runtime`
  - `core-js-bundle`

### Patch Changes

- 4776213b0: fix: add ThemeProvider import
- Updated dependencies [202b4daf2]
  - @talend/dynamic-cdn-webpack-plugin@12.0.0

## 1.2.3

### Patch Changes

- 3f4ad5e30: fix: url of repository in package.json

## 1.2.2

### Patch Changes

- 2f40e092e: fix: remove bundles props of IconsProvider

## 1.2.1

### Patch Changes

- 29302bc1f: chore(storybook): without i18n config

## 1.2.0

### Minor Changes

- a20e7673d: Add design-system providers if available

## 1.1.0

### Minor Changes

- bc22c11ee: Support apps

## 1.0.6

### Patch Changes

- Updated dependencies [4589878a9]
  - @talend/dynamic-cdn-webpack-plugin@11.0.0

## 1.0.5

### Patch Changes

- Updated dependencies [b199a79e5]
  - @talend/dynamic-cdn-webpack-plugin@10.0.0

## 1.0.4

### Patch Changes

- 1e6f1c6: fix(storybook-lib): Leftover typo

## 1.0.3

### Patch Changes

- db68250: fix(storybook-lib): Broken Storybook config on Windows

## 1.0.2

### Patch Changes

- 77f29bc: fix(webpack): set back @talend in meta

## 1.0.1

### Patch Changes

- 3905794: fix(ARCH-466/Storybook): bootstrap cmf only once

## 1.0.0

### Major Changes

- 4753696: chore(ARCH-466/Storybook): v1.0

## 0.10.0

### Minor Changes

- 415efca: feat(ARCH-466/Storybook): support cmf modules init

### Patch Changes

- ce8a7ac: fix(ARCH-466/Storybook): decorators order

## 0.9.1

### Patch Changes

- d19919a: fix(ARCH-466)/Storybook): add missing key in react elements

## 0.9.0

### Minor Changes

- bd6afb9: feat(ARCH-466/Storybook): add addon-a11y and fix warnings/errors
  - add msw service worker file directly into ui-scripts - no need to iniitialise it at project level
  - add missing keys in react elements in storybook decorators
  - take storybook "preview > webpackFinal" user configuration

## 0.8.0

### Minor Changes

- 0a831ce: feat(ARCH-466/storybook): no @talend from cdn

## 0.7.0

### Minor Changes

- 95afd73: feat(ARCH-466/storybook): move i18n conf in preview

### Patch Changes

- ab17e60: fix(config-storybook): Remove useless conf

## 0.6.0

### Minor Changes

- a714e5e: add support for remote locales

## 0.5.1

### Patch Changes

- 9ec2cf6: fix(ARCH-466/storybook): remove old addon from sb config

## 0.5.0

### Minor Changes

- fbe0807: feat(storybook): use msw addon instead of mock addon

## 0.4.0

### Minor Changes

- f0e1435: feat(storybook): merge loaders conf and add api mock plugin

## 0.3.0

### Minor Changes

- 44b4a7c: feat(storybook): use @talend/scripts preset webpack config

## 0.2.2

### Patch Changes

- 77af1fc: chore(dependencies): auto update for maintenance purpose

  ```diff
  -    "@storybook/addon-essentials": "^6.4.13"
  +    "@storybook/addon-essentials": "^6.4.15"
  -    "@storybook/addon-links": "^6.4.13"
  +    "@storybook/addon-links": "^6.4.15"
  -    "@storybook/react": "^6.4.13"
  +    "@storybook/react": "^6.4.15"
  ```

- Updated dependencies [9cf2a86]
  - @talend/dynamic-cdn-webpack-plugin@9.7.15

## 0.2.1

### Patch Changes

- 6e37c63: fix(storybook): change config location to enable multiple instances

## 0.2.0

### Minor Changes

- 8be41ee: feat(storybook): allow customisation

## 0.1.2

### Patch Changes

- 65ac1f2: fix(config-storybook-lib): remove jsx

## 0.1.1

### Patch Changes

- a30d9ba: fix(preset-react-lib): storyboof config js errors

## 0.1.0

### Minor Changes

- 5c27d1f: feat(react-lib): start-storybook
