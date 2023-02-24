# @talend/scripts-config-stylelint

## 3.0.0

### Major Changes

- c18aabb97: feat: expose config from main

  Breaking change: this package can not be used by old talend-scripts preset. But now you can extends from it direclty.

  ```diff
  -const defaults = require('@talend/scripts-config-stylelint/.stylelintrc.js');
  +const defaults = require('@talend/scripts-config-stylelint');

  ```

## 2.0.0

### Major Changes

- e22e3c952: chore(deps): major bump for stylelint deps

## 1.0.2

### Patch Changes

- 3f4ad5e30: fix: url of repository in package.json

## 1.0.1

### Patch Changes

- 9ef83c5: Upgrade dependencies to be aligned with what is used in dev mode

## 1.0.0

### Major Changes

- 0a5a90f: Add new `lint:style` command.
  Create new shared configuration `config-style` to share Stylelint configuration.
  Update `preset-react`, `preset-react-lib` and `preset-react-ng` to include the new Stylelint configuration.
