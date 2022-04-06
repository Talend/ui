# @talend/scripts-config-jest

## 9.7.2

### Patch Changes

- a35403d: fix: name should not use dot

  This will remove the following warning from your tests:

  > Warning: <Coral.Icon /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.

  Note: you may have to update your tests/snapshots

## 9.7.1

### Patch Changes

- 77af1fc: chore(dependencies): auto update for maintenance purpose

  ```diff
  -    "@talend/scripts-config-babel": "^9.6.3"
  +    "@talend/scripts-config-babel": "^9.7.2"
  -    "core-js": "^3.17.1"
  +    "core-js": "^3.20.3"
  ```

- Updated dependencies [77af1fc]
  - @talend/scripts-config-babel@9.7.3

## 9.7.0

### Minor Changes

- bdb707f: feat: add testing-library matchers

## 9.6.4

### Patch Changes

- 9ef83c5: Upgrade dependencies to be aligned with what is used in dev mode
- Updated dependencies [9ef83c5]
  - @talend/scripts-config-babel@9.6.3

## 9.6.3

### Patch Changes

- 40ba52b: fix(jest): i18next.t mock default value as only option support
