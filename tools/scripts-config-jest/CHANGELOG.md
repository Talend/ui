# @talend/scripts-config-jest

## 10.2.2

### Patch Changes

- 3f4ad5e30: fix: url of repository in package.json
- Updated dependencies [3f4ad5e30]
  - @talend/scripts-config-babel@9.9.1

## 10.2.1

### Patch Changes

- 479b94f82: fix: add missing language attribute in i18next mock

## 10.2.0

### Minor Changes

- 47b758112: feat(ARCH-482): use React 17 internally and extend react peer dep version

## 10.1.0

### Minor Changes

- f038a450c: feat(jest): support react 17

## 10.0.0

### Major Changes

- 2875eb2ce: Breaking change: design-system mocked component now generate a span

## 9.7.3

### Patch Changes

- 799c40db6: fix: jest.mock should not rely on external deps

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
