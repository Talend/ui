# @talend/utils

## 2.0.0

### Major Changes

- d5f261f49: utils: remove default export, use named exports instead
  - WHAT the breaking change is
    Remove default export of @talend/utils package, use named exports instead
  - WHY the change was made
    The utils package used a default export. so we can't do a destruction import as readme described:
  ```
  import { validation } from '@talend/utils';
  ```
  - HOW a consumer should update their code
    Use destruction import like `import { validation, date } from '@talend/utils';` to replace default import.

## 1.4.5

### Patch Changes

- 667cd0a50: chore: upgrade dependencies and align @talend scoped packages to latest

## 1.4.4

### Patch Changes

- f1f4ec5bc: fix(workspace-run): package run order

## 1.4.3

### Patch Changes

- 3e9121287: chore(build): order packages on pre-release hook
