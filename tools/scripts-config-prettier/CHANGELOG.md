# @talend/scripts-config-prettier

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
