# @talend/scripts-config-prettier

## 12.6.0

### Minor Changes

- bb95e38: Fix CVE's by upgrading sq to v6.14.1, tar to 7.5.4 and eslint to 9.39.2

### Patch Changes

- f043b64: fix: remove prettier import order

## 12.5.0

### Minor Changes

- ed37213: Update dependencies

## 12.4.0

### Minor Changes

- 3a513cb: Update deps

## 12.3.0

### Minor Changes

- 00e4dde: Bump deps and set RHF to latest with caret

## 12.2.2

### Patch Changes

- de6ae38: Bump dependencies

## 12.2.1

### Patch Changes

- 4f5cc5c: Bump security CVE

## 12.2.0

### Minor Changes

- c3750a1: chore: upgrade dependencies

  Major upgrade for all packages that have a peerDependency on react or react-dom. Those packages now ask for react@18 and react-dom@18.

## 12.1.3

### Patch Changes

- 1abc22f: chore: upgrade dependencies

## 12.1.2

### Patch Changes

- 5455b6517: fix: prettier configuration for sort imports

## 12.1.1

### Patch Changes

- f14ebbe23: Add missing deps

## 12.1.0

### Minor Changes

- 673984929: Add missing deps, remove link with scripts-core (circular dependency) and fix prettier config to be compatible with prettier 3

### Patch Changes

- f2ef85811: Update dependencies

## 12.0.0

### Major Changes

- c18aabb97: feat: export config as main

  Breaking change: this package can not be used by old talend-scripts preset. But now you can extends from it direclty.

  ```diff
  -const defaults = require('@talend/scripts-config-prettier/.prettierrc.js');
  +const defaults = require('@talend/scripts-config-prettier');
  ```

## 11.0.0

### Major Changes

- double bump

## 10.0.0

### Major Changes

- second bump

## 9.7.1

### Patch Changes

- 3f4ad5e30: fix: url of repository in package.json

## 9.7.0

### Minor Changes

- b67503926: Add import order configuration for `@trivago/prettier-plugin-sort-imports`

## 9.6.3

### Patch Changes

- 9ef83c5: Upgrade dependencies to be aligned with what is used in dev mode
