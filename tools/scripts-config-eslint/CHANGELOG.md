# @talend/scripts-config-eslint

## 12.0.0

### Major Changes

- c18aabb97: feat: export config as main and rename package

  Breaking change: this package can not be used by old talend-scripts preset. But now you can extends from it direclty.

  ```diff
  -       "extends": "./node_modules/@talend/scripts-config-eslint/.eslintrc.js",
  +       "extends": "@talend/eslint-config",
  ```

  Note: We have to rename as the doc mention it here https://eslint.org/docs/latest/developer-guide/shareable-configs

### Patch Changes

- Updated dependencies [c18aabb97]
  - @talend/eslint-plugin@1.0.1

## 11.0.1

### Patch Changes

- aeb370786: fix(talend-scripts-eslint): force trim bump for better security

## 11.0.0

### Major Changes

- second bump

## 10.0.0

### Major Changes

- fix: double bump to escape from old 10.x release

## 9.9.3

### Patch Changes

- Updated dependencies [b16efa779]
  - @talend/eslint-plugin@1.0.0

## 9.9.2

### Patch Changes

- 3f4ad5e30: fix: url of repository in package.json

## 9.9.1

### Patch Changes

- 09722b071: Disable no-extraneous-dependencies for stories & tests

## 9.9.0

### Minor Changes

- 20e907887: feat: add ts support. Just point to eslintrc.js

## 9.8.0

### Minor Changes

- a756f59: feat(eslint): mdx support

## 9.7.2

### Patch Changes

- 77af1fc: chore(dependencies): auto update for maintenance purpose

  ```diff
  -    "@babel/eslint-parser": "^7.15.0"
  +    "@babel/eslint-parser": "^7.16.5"
  -    "eslint-plugin-angular": "^4.0.1"
  +    "eslint-plugin-angular": "^4.1.0"
  -    "eslint-plugin-import": "^2.24.2"
  +    "eslint-plugin-import": "^2.25.4"
  -    "eslint-plugin-jsx-a11y": "^6.4.1"
  +    "eslint-plugin-jsx-a11y": "^6.5.1"
  -    "eslint-plugin-react": "^7.25.1"
  +    "eslint-plugin-react": "^7.28.0"
  -    "eslint-plugin-testing-library": "^5.0.3"
  +    "eslint-plugin-testing-library": "^5.0.4"
  ```

- Updated dependencies [77af1fc]
  - @talend/eslint-plugin@0.5.4

## 9.7.1

### Patch Changes

- d652d9d: fix: remove some buggy lint rules

## 9.7.0

### Minor Changes

- bdb707f: feat: add testing-library linters and matchers

## 9.6.4

### Patch Changes

- 9ef83c5: Upgrade dependencies to be aligned with what is used in dev mode
- Updated dependencies [9ef83c5]
  - @talend/eslint-plugin@0.5.3

## 9.6.3

### Patch Changes

- 87d9cd0: Switch from deprecated babel-parser to @babel/eslint-parser
- Updated dependencies [87d9cd0]
  - @talend/eslint-plugin@0.5.2
