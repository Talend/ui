# @talend/scripts-build-cdn

## 11.2.0

### Minor Changes

- c3750a1: chore: upgrade dependencies

  Major upgrade for all packages that have a peerDependency on react or react-dom. Those packages now ask for react@18 and react-dom@18.

### Patch Changes

- Updated dependencies [c3750a1]
  - @talend/babel-plugin-import-d3@0.5.0
  - @talend/scripts-config-cdn@10.12.0
  - @talend/module-to-cdn@9.11.0

## 11.1.3

### Patch Changes

- af0ac2d: Upgrade rimraf to version 5.0.5

## 11.1.2

### Patch Changes

- 1abc22f: chore: upgrade dependencies
- Updated dependencies [1abc22f]
  - @talend/babel-plugin-import-d3@0.4.1
  - @talend/scripts-config-cdn@10.11.1
  - @talend/module-to-cdn@9.10.1

## 11.1.1

### Patch Changes

- Updated dependencies [9568363]
  - @talend/babel-plugin-import-d3@0.4.0
  - @talend/scripts-config-cdn@10.11.0

## 11.1.0

### Minor Changes

- 673984929: Add missing deps, remove dependency with scripts-core (circular dependency) and adapt code for PNPM

### Patch Changes

- f2ef85811: Update dependencies
- Updated dependencies [673984929]
- Updated dependencies [f2ef85811]
- Updated dependencies [673984929]
  - @talend/babel-plugin-import-d3@0.3.0
  - @talend/scripts-config-cdn@10.9.0

## 11.0.1

### Patch Changes

- b0193afbd: chore: upgrade webpack

## 11.0.0

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

- @talend/scripts-config-cdn@10.5.1

## 10.0.1

### Patch Changes

- 3f4ad5e30: fix: url of repository in package.json
- Updated dependencies [3f4ad5e30]
  - @talend/module-to-cdn@9.8.3
  - @talend/babel-plugin-import-d3@0.2.1

## 10.0.0

### Major Changes

- b7d571c: Breaking change: remove private package supports from config-cdn

  You are pleased to move use private preset if you need to support private configs.

### Patch Changes

- Updated dependencies [b7d571c]
  - @talend/scripts-config-cdn@10.0.0

## 9.7.6

### Patch Changes

- 9cf2a86: chore(dependencies): auto update for maintenance purpose

  ```diff
  -    "@talend/module-to-cdn": "^9.7.5"
  +    "@talend/module-to-cdn": "^9.7.6"
  ```

- 77af1fc: chore(dependencies): auto update for maintenance purpose

  ```diff
  -    "@talend/module-to-cdn": "^9.7.2"
  +    "@talend/module-to-cdn": "^9.7.5"
  -    "@talend/scripts-config-cdn": "^9.10.5"
  +    "@talend/scripts-config-cdn": "^9.11.2"
  -    "webpack-bundle-analyzer": "^4.4.2"
  +    "webpack-bundle-analyzer": "^4.5.0"
  -    "webpack-cli": "^4.8.0"
  +    "webpack-cli": "^4.9.2"
  ```

- Updated dependencies [77af1fc]
- Updated dependencies [9cf2a86]
  - @talend/scripts-config-cdn@9.11.3

## 9.7.5

### Patch Changes

- 52527bd: upgrade webpack-cli

## 9.7.4

### Patch Changes

- a6201b3: Revert upgrade of webpack-cli and dev-server

## 9.7.3

### Patch Changes

- 3e942de: Remove axios from dependencies for security reasons
- Updated dependencies [3e942de]
  - @talend/module-to-cdn@9.7.2

## 9.7.2

### Patch Changes

- 9ef83c5: Upgrade dependencies to be aligned with what is used in dev mode
- Updated dependencies [9ef83c5]
  - @talend/scripts-config-cdn@9.10.5
  - @talend/module-to-cdn@9.7.1

## 9.7.1

### Patch Changes

- fe505ee: upgrade dependencies for security issues

## 9.7.0

### Minor Changes

- 9a051a3: Add support for NPM_TOKEN to be used to download private packages

### Patch Changes

- Updated dependencies [9a051a3]
  - @talend/scripts-config-cdn@9.8.0
