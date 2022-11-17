# @talend/scripts-preset-react-lib

## 14.0.0

### Major Changes

- 0260a77b8: fix: No more implicit sass data injected in scss files

  This is BREAKING CHANGE:

  ```diff
  +++@use '~@talend/bootstrap-theme/src/theme/guidelines' as *;
  ```

  You have to

  - use `addSassData.js` from https://gist.github.com/jmfrancois/402c32c22fba98f1e35599f1e0dab2c2
  - rewrite your sass using @talend/design-tokens on the long and remove this bootstrap-theme guidelines from all your scss

- f4db1eeb1: feat: upgrade webpack configuration

  BREAKING CHANGE: In the context of talend package you now have to rename your file using the pattern `.module.scss`. A script has been built at this occasion for you on gist: https://gist.github.com/jmfrancois/402c32c22fba98f1e35599f1e0dab2c2

### Patch Changes

- Updated dependencies [0260a77b8]
- Updated dependencies [f4db1eeb1]
  - @talend/scripts-config-react-webpack@15.0.0

## 13.0.0

### Major Changes

- 6fbd20305: fix(talend-scripts): update common webpack config for ng config compatibility and bump to postcss v8

  Breaking: html-loader has been removed and its webpack config too which means no automatic support of html import in webapp

### Patch Changes

- Updated dependencies [e22e3c952]
- Updated dependencies [e22e3c952]
- Updated dependencies [e22e3c952]
  - @talend/scripts-config-react-webpack@14.0.0
  - @talend/scripts-config-storybook-lib@2.1.2
  - @talend/scripts-config-stylelint@2.0.0

## 12.0.2

### Patch Changes

- fix: ugprade deps
- Updated dependencies
  - @talend/scripts-config-prettier@11.0.0

## 12.0.1

### Patch Changes

- Updated dependencies [2a8de8a55]
- Updated dependencies [b16efa779]
  - @talend/scripts-config-react-webpack@13.0.1
  - @talend/scripts-config-jest@11.0.0
  - @talend/scripts-config-cdn@10.5.2
  - @talend/scripts-config-storybook-lib@2.0.1
  - @talend/scripts-config-eslint@9.9.3

## 12.0.0

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

- Updated dependencies [4776213b0]
- Updated dependencies [823242adf]
- Updated dependencies [202b4daf2]
  - @talend/scripts-config-storybook-lib@2.0.0
  - @talend/scripts-config-react-webpack@13.0.0
  - @talend/scripts-config-cdn@10.5.1

## 11.0.4

### Patch Changes

- 3f4ad5e30: fix: url of repository in package.json
- Updated dependencies [3f4ad5e30]
  - @talend/scripts-config-babel@9.9.1
  - @talend/scripts-config-eslint@9.9.2
  - @talend/scripts-config-jest@10.2.2
  - @talend/scripts-config-prettier@9.7.1
  - @talend/scripts-config-react-webpack@12.1.3
  - @talend/scripts-config-storybook-lib@1.2.3
  - @talend/scripts-config-stylelint@1.0.2
  - @talend/scripts-config-typescript@9.11.2

## 11.0.3

### Patch Changes

- Updated dependencies [2875eb2ce]
  - @talend/scripts-config-jest@10.0.0

## 11.0.2

### Patch Changes

- Updated dependencies [4753696]
  - @talend/scripts-config-storybook-lib@1.0.0

## 11.0.1

### Patch Changes

- Updated dependencies [ce8a7ac]
- Updated dependencies [415efca]
  - @talend/scripts-config-storybook-lib@0.10.0

## 11.0.0

### Major Changes

- b7d571c: Breaking change: remove private package supports from config-cdn

  You are pleased to move use private preset if you need to support private configs.

### Patch Changes

- Updated dependencies [b7d571c]
- Updated dependencies [b7d571c]
  - @talend/scripts-config-cdn@10.0.0
  - @talend/scripts-config-react-webpack@12.0.0

## 10.1.0

Old release cancelled

## 9.12.5

### Patch Changes

- Updated dependencies [bd6afb9]
  - @talend/scripts-config-storybook-lib@0.9.0

## 9.12.4

### Patch Changes

- Updated dependencies [0a831ce]
  - @talend/scripts-config-cdn@9.12.0
  - @talend/scripts-config-react-webpack@11.5.0
  - @talend/scripts-config-storybook-lib@0.8.0

## 9.12.3

### Patch Changes

- Updated dependencies [ab17e60]
- Updated dependencies [95afd73]
- Updated dependencies [951667a]
  - @talend/scripts-config-storybook-lib@0.7.0
  - @talend/scripts-config-cdn@9.11.5
  - @talend/scripts-config-react-webpack@11.4.1

## 9.12.2

### Patch Changes

- Updated dependencies [a714e5e]
  - @talend/scripts-config-storybook-lib@0.6.0

## 9.12.1

### Patch Changes

- Updated dependencies [fbe0807]
  - @talend/scripts-config-storybook-lib@0.5.0

## 9.12.0

### Minor Changes

- f0e1435: feat(storybook): merge loaders conf and add api mock plugin

### Patch Changes

- Updated dependencies [a756f59]
- Updated dependencies [f0e1435]
- Updated dependencies [33dcfee]
  - @talend/scripts-config-eslint@9.8.0
  - @talend/scripts-config-storybook-lib@0.4.0
  - @talend/scripts-config-react-webpack@11.4.0

## 9.11.3

### Patch Changes

- f3c3b2b: feat(storybook): add build-storybook script

## 9.11.2

### Patch Changes

- Updated dependencies [44b4a7c]
- Updated dependencies [b737ae9]
  - @talend/scripts-config-storybook-lib@0.3.0
  - @talend/scripts-config-react-webpack@11.2.2

## 9.11.1

### Patch Changes

- 77af1fc: chore(dependencies): auto update for maintenance purpose

  ```diff
  -    "@talend/scripts-config-babel": "^9.7.0"
  +    "@talend/scripts-config-babel": "^9.7.2"
  -    "@talend/scripts-config-cdn": "^9.11.1"
  +    "@talend/scripts-config-cdn": "^9.11.2"
  -    "@talend/scripts-config-eslint": "^9.6.4"
  +    "@talend/scripts-config-eslint": "^9.7.1"
  -    "@talend/scripts-config-jest": "^9.6.4"
  +    "@talend/scripts-config-jest": "^9.7.0"
  -    "@talend/scripts-config-react-webpack": "^11.1.1"
  +    "@talend/scripts-config-react-webpack": "^11.2.0"
  -    "@talend/scripts-config-storybook-lib": "^0.2.0"
  +    "@talend/scripts-config-storybook-lib": "^0.2.1"
  ```

- Updated dependencies [77af1fc]
- Updated dependencies [77af1fc]
- Updated dependencies [77af1fc]
- Updated dependencies [9cf2a86]
- Updated dependencies [77af1fc]
- Updated dependencies [77af1fc]
- Updated dependencies [77af1fc]
  - @talend/scripts-config-eslint@9.7.2
  - @talend/scripts-config-cdn@9.11.3
  - @talend/scripts-config-storybook-lib@0.2.2
  - @talend/scripts-config-babel@9.7.3
  - @talend/scripts-config-jest@9.7.1
  - @talend/scripts-config-react-webpack@11.2.1

## 9.11.0

### Minor Changes

- 8be41ee: feat(storybook): allow customisation

### Patch Changes

- Updated dependencies [8be41ee]
  - @talend/scripts-config-storybook-lib@0.2.0

## 9.10.1

### Patch Changes

- a30d9ba: fix(preset-react-lib): storyboof config js errors
- Updated dependencies [a30d9ba]
  - @talend/scripts-config-storybook-lib@0.1.1

## 9.10.0

### Minor Changes

- 5c27d1f: feat(react-lib): start-storybook

## 9.9.3

### Patch Changes

- 57ee6e0: Support multiple UMD in the same package
- Updated dependencies [40b7a40]
- Updated dependencies [57ee6e0]
  - @talend/scripts-config-cdn@9.11.1
  - @talend/scripts-config-react-webpack@11.1.1

## 9.9.2

### Patch Changes

- 5a64101: fix(dynamic-cdn-webpack-plugin): take peer deps meta into account
- Updated dependencies [5a64101]
- Updated dependencies [618308b]
  - @talend/scripts-config-react-webpack@11.0.3

## 9.9.1

### Patch Changes

- Updated dependencies [d4d2f2e]
  - @talend/scripts-config-react-webpack@11.0.0

## 9.9.0

### Minor Changes

- e4a6e7e: feat(typescript): compile typescript via babel

### Patch Changes

- Updated dependencies [e4a6e7e]
  - @talend/scripts-config-babel@9.7.0

## 9.8.4

### Patch Changes

- 9ef83c5: Upgrade dependencies to be aligned with what is used in dev mode
- Updated dependencies [9ef83c5]
- Updated dependencies [446b8f0]
  - @talend/scripts-config-babel@9.6.3
  - @talend/scripts-config-cdn@9.10.5
  - @talend/scripts-config-eslint@9.6.4
  - @talend/scripts-config-jest@9.6.4
  - @talend/scripts-config-prettier@9.6.3
  - @talend/scripts-config-react-webpack@9.10.5
  - @talend/scripts-config-stylelint@1.0.1
  - @talend/scripts-config-typescript@9.11.1

## 9.8.3

### Patch Changes

- 40ba52b: fix(jest): i18next.t mock default value as only option support
- Updated dependencies [40ba52b]
  - @talend/scripts-config-jest@9.6.3

## 9.8.2

### Patch Changes

- 643022c: fix(config-webpack-plugin): adapt inject to terser 5
- Updated dependencies [643022c]
  - @talend/scripts-config-react-webpack@9.9.6

## 9.8.1

### Patch Changes

- 073ad93: fix(config-react-webpack): add terser explicitly to fix version
- Updated dependencies [4613332]
- Updated dependencies [073ad93]
  - @talend/scripts-config-cdn@9.9.1
  - @talend/scripts-config-react-webpack@9.9.5

## 9.8.0

### Minor Changes

- 0a5a90f: Add new `lint:style` command.
  Create new shared configuration `config-style` to share Stylelint configuration.
  Update `preset-react`, `preset-react-lib` and `preset-react-ng` to include the new Stylelint configuration.

### Patch Changes

- b4b5b8f: Add missing dependency to stylelint
- Updated dependencies [0a5a90f]
  - @talend/scripts-config-stylelint@1.0.0

## 9.7.0

### Patch Changes

- ef8a9fb: Remove unecessary peer dependencies here
- Updated dependencies [f59e70f]
  - @talend/scripts-config-react-webpack@9.7.0
