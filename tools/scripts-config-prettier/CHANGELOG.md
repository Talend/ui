# @talend/scripts-config-prettier

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
