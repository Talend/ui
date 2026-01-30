# @talend/scripts-config-storybook-lib

## 5.8.3

### Patch Changes

- fix: msw template update to 2.12.7

## 5.8.2

### Patch Changes

- fix: path to cjs was not enough now it works !

## 5.8.1

### Patch Changes

- fix: support @talend/icons 8 (still SB 7)

## 5.8.0

### Minor Changes

- ed37213: Update dependencies

### Patch Changes

- Updated dependencies [ed37213]
  - @talend/scripts-config-react-webpack@16.11.0
  - @talend/dynamic-cdn-webpack-plugin@14.3.0

## 5.7.0

### Minor Changes

- 3a513cb: Update deps

### Patch Changes

- Updated dependencies [3a513cb]
  - @talend/scripts-config-react-webpack@16.10.0
  - @talend/dynamic-cdn-webpack-plugin@14.2.0

## 5.6.0

### Minor Changes

- 00e4dde: Bump deps and set RHF to latest with caret

### Patch Changes

- Updated dependencies [00e4dde]
  - @talend/scripts-config-react-webpack@16.9.0
  - @talend/dynamic-cdn-webpack-plugin@14.1.0

## 5.5.2

### Patch Changes

- de6ae38: Bump dependencies
- Updated dependencies [de6ae38]
  - @talend/scripts-config-react-webpack@16.8.5
  - @talend/dynamic-cdn-webpack-plugin@14.0.3

## 5.5.1

### Patch Changes

- 4f5cc5c: Bump security CVE
- Updated dependencies [4f5cc5c]
  - @talend/dynamic-cdn-webpack-plugin@14.0.1
  - @talend/scripts-config-react-webpack@16.8.3

## 5.5.0

### Minor Changes

- ea14b87: Fix Dependabot alerts

## 5.4.0

### Minor Changes

- c3750a1: chore: upgrade dependencies

  Major upgrade for all packages that have a peerDependency on react or react-dom. Those packages now ask for react@18 and react-dom@18.

### Patch Changes

- Updated dependencies [c3750a1]
  - @talend/scripts-config-react-webpack@16.8.0
  - @talend/dynamic-cdn-webpack-plugin@14.0.0

## 5.3.2

### Patch Changes

- 3bd16fc: Make it compatible with ESM
- Updated dependencies [3bd16fc]
  - @talend/scripts-config-react-webpack@16.7.0

## 5.3.1

### Patch Changes

- 1abc22f: chore: upgrade dependencies
- Updated dependencies [1abc22f]
  - @talend/scripts-config-react-webpack@16.5.1
  - @talend/dynamic-cdn-webpack-plugin@13.1.1

## 5.3.0

### Minor Changes

- b2d93a4: feat: add @qlik-light theme

## 5.2.1

### Patch Changes

- 6c2df2b: add a workaround waiting a fix for https://github.com/storybookjs/storybook/issues/25071
- c468f2f: chore: upgrade dependencies
- 6c2df2b: Upgrade dependencies using talend-scripts upgrade:deps
- Updated dependencies [c468f2f]
  - @talend/scripts-config-react-webpack@16.3.3

## 5.2.0

### Minor Changes

- 673984929: Add missing deps, upgrade msw to v1.3.2

### Patch Changes

- f2ef85811: Update dependencies and fix script for lint
- Updated dependencies [673984929]
  - @talend/scripts-config-react-webpack@16.3.0

## 5.1.0

### Minor Changes

- 6efd54301: feat: use icons from talend/icons and not from unpkg

### Patch Changes

- 9a0732ec5: fix: add keys on all items in the decorators
  fix: improve build performance copy/pasted from #4931
- 35263dfcb: fix: icon url to support prefix

## 5.0.0

### Major Changes

- 3b058ef7d: feat: upgrade configuration to run storybook 7.
  So once you have upgrade you can remove the resolution.

### Patch Changes

- Updated dependencies [3b058ef7d]
  - @talend/scripts-config-react-webpack@16.0.0

## 4.1.0

### Minor Changes

- bfc02c4fb: feat: add design token update in the toolbar

### Patch Changes

- Updated dependencies [bfc02c4fb]
  - @talend/scripts-config-react-webpack@15.4.1

## 4.0.3

### Patch Changes

- 05043227a: fix(msw): add option onUnhandledRequest: 'bypass' to forward calls if not match
- fcd8daf3c: fix: use bootstrap.css at build instead of rely on surge
- fcd8daf3c: fix: add missing dependencies
- Updated dependencies [ee828e0b0]
- Updated dependencies [5fd268ed6]
  - @talend/scripts-config-react-webpack@15.4.0

## 4.0.2

### Patch Changes

- b1cb432e5: fix: support for import of scss file without css module

## 4.0.1

### Patch Changes

- c7152471f: fix: msw is broken

## 4.0.0

### Major Changes

- c18aabb97: chore: simplify it, it just hold the configuration

  BREAKING CHANGE: it do not expose anything from outside.

  This new version do not work with previous talend-scripts version

## 3.0.2

### Patch Changes

- d474e873f: fix: storybook crash trying to load react-cmf module

## 3.0.1

### Patch Changes

- 5e72003aa: fix: make storybook config when there is no cmf package installed

## 3.0.0

### Major Changes

- fe430c316: fix: stories override default stories

  Breaking Change: stories is supposed to give blob to get all the story you need.
  If the user specify this it is to be able to override it.

  This is a fix to be able to use this configuration to document @talend/design-system package.

### Patch Changes

- 784fe3919: fix: update msw for security reason

## 2.3.1

### Patch Changes

- aeb1245b6: chore(storybook-lib): Broken Windows filepath

## 2.3.0

### Minor Changes

- e66ecb955: feat: simplify configuration as part of the current changes in all talend-scripts.

  Now talend-scripts only work with mainstream approach of file names.

## 2.2.1

### Patch Changes

- 0f05e9b1e: fix: add missing dependency on @storybook/preset-scss

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
