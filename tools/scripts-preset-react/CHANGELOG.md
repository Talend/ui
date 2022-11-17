# @talend/scripts-preset-react

## 15.0.0

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

## 14.0.0

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

## 13.0.2

### Patch Changes

- fix: ugprade deps
- Updated dependencies
  - @talend/scripts-config-prettier@11.0.0

## 13.0.1

### Patch Changes

- Updated dependencies [2a8de8a55]
- Updated dependencies [b16efa779]
  - @talend/scripts-config-react-webpack@13.0.1
  - @talend/scripts-config-jest@11.0.0
  - @talend/scripts-config-cdn@10.5.2
  - @talend/scripts-config-storybook-lib@2.0.1
  - @talend/scripts-config-eslint@9.9.3

## 13.0.0

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

## 12.0.4

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

## 12.0.3

### Patch Changes

- Updated dependencies [2875eb2ce]
  - @talend/scripts-config-jest@10.0.0

## 12.0.2

### Patch Changes

- Updated dependencies [4753696]
  - @talend/scripts-config-storybook-lib@1.0.0

## 12.0.1

### Patch Changes

- Updated dependencies [ce8a7ac]
- Updated dependencies [415efca]
  - @talend/scripts-config-storybook-lib@0.10.0

## 12.0.0

### Major Changes

- b7d571c: Breaking change: remove private package supports from config-cdn

  You are pleased to move use private preset if you need to support private configs.

### Patch Changes

- Updated dependencies [b7d571c]
- Updated dependencies [b7d571c]
  - @talend/scripts-config-cdn@10.0.0
  - @talend/scripts-config-react-webpack@12.0.0

## 11.2.2

### Patch Changes

- Updated dependencies [bd6afb9]
  - @talend/scripts-config-storybook-lib@0.9.0

## 11.2.1

### Patch Changes

- Updated dependencies [0a831ce]
  - @talend/scripts-config-cdn@9.12.0
  - @talend/scripts-config-react-webpack@11.5.0
  - @talend/scripts-config-storybook-lib@0.8.0

## 11.2.0

### Minor Changes

- 0a71d58: Add config-storybook to preset

## 11.1.4

### Patch Changes

- f3c3b2b: feat(storybook): add build-storybook script

## 11.1.3

### Patch Changes

- 77af1fc: chore(dependencies): auto update for maintenance purpose

  ```diff
  -    "@talend/scripts-config-babel": "^9.6.3"
  +    "@talend/scripts-config-babel": "^9.7.2"
  -    "@talend/scripts-config-cdn": "^9.11.1"
  +    "@talend/scripts-config-cdn": "^9.11.2"
  -    "@talend/scripts-config-jest": "^9.6.4"
  +    "@talend/scripts-config-jest": "^9.7.0"
  -    "@talend/scripts-config-react-webpack": "^11.1.2"
  +    "@talend/scripts-config-react-webpack": "^11.2.0"
  ```

- Updated dependencies [77af1fc]
- Updated dependencies [77af1fc]
- Updated dependencies [9cf2a86]
- Updated dependencies [77af1fc]
- Updated dependencies [77af1fc]
- Updated dependencies [77af1fc]
  - @talend/scripts-config-eslint@9.7.2
  - @talend/scripts-config-cdn@9.11.3
  - @talend/scripts-config-babel@9.7.3
  - @talend/scripts-config-jest@9.7.1
  - @talend/scripts-config-react-webpack@11.2.1

## 11.1.2

### Patch Changes

- 81fbe37: chore: Upgrade @talend/scripts-config-react-webpack to 11.1.2
- Updated dependencies [d652d9d]
  - @talend/scripts-config-eslint@9.7.1

## 11.1.1

### Patch Changes

- 57ee6e0: Support multiple UMD in the same package
- Updated dependencies [40b7a40]
- Updated dependencies [57ee6e0]
  - @talend/scripts-config-cdn@9.11.1
  - @talend/scripts-config-react-webpack@11.1.1

## 11.1.0

### Minor Changes

- 494d81e: feat(webpack): support route basename

### Patch Changes

- Updated dependencies [494d81e]
  - @talend/scripts-config-react-webpack@11.1.0

## 11.0.2

### Patch Changes

- 5a64101: fix(dynamic-cdn-webpack-plugin): take peer deps meta into account
- Updated dependencies [5a64101]
- Updated dependencies [618308b]
  - @talend/scripts-config-react-webpack@11.0.3

## 11.0.1

### Patch Changes

- a22e2d6: fix(webpack): devServer watches src and dist
- Updated dependencies [a22e2d6]
  - @talend/scripts-config-react-webpack@11.0.1

## 11.0.0

### Major Changes

- d4d2f2e: feat: upgrade webpack-cli and remove deasync

### Patch Changes

- Updated dependencies [d4d2f2e]
  - @talend/scripts-config-react-webpack@11.0.0

## 9.8.7

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

## 9.8.6

### Patch Changes

- 1802d02: fix(cdn): sri computation on right version
- Updated dependencies [1802d02]
  - @talend/scripts-config-cdn@9.10.4
  - @talend/scripts-config-react-webpack@9.10.4

## 9.8.5

### Patch Changes

- 40ba52b: fix(jest): i18next.t mock default value as only option support
- Updated dependencies [40ba52b]
  - @talend/scripts-config-jest@9.6.3

## 9.8.4

### Patch Changes

- fcccad6: fix(config-cdn): find package for copy takes scope into account
- Updated dependencies [fcccad6]
  - @talend/scripts-config-cdn@9.10.2
  - @talend/scripts-config-react-webpack@9.10.3

## 9.8.3

### Patch Changes

- b07ac88: fix(webpack): no copy of libs to /cdn in cdn mode
- Updated dependencies [b07ac88]
- Updated dependencies [b07ac88]
  - @talend/scripts-config-cdn@9.10.1
  - @talend/scripts-config-react-webpack@9.10.2

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
