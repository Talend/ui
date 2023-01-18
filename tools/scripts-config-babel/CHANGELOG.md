# @talend/scripts-config-babel

## 12.0.0

### Major Changes

- c18aabb97: feat: expose config as main

  Breaking change: this package can not be used by old talend-scripts preset. But now you can extends from it direclty.

  ```diff
  {
  -	"extends": "@talend/scripts-config-babel/.babelrc.json"
  +	"extends": "@talend/scripts-config-babel"
  }
  ```

## 11.0.0

### Major Changes

- second bump

## 10.0.0

### Major Changes

- fix: double bump to escape from old 10.x release

## 9.9.1

### Patch Changes

- 3f4ad5e30: fix: url of repository in package.json
- Updated dependencies [3f4ad5e30]
  - @talend/babel-plugin-import-from-index@1.5.1

## 9.9.0

### Minor Changes

- edafcc7: feat: add assets-api babel plugin

### Patch Changes

- Updated dependencies [792c7f5]
  - @talend/babel-plugin-assets-api@1.0.1

## 9.8.0

### Minor Changes

- a65ee41: Add nullish operator support and transform

## 9.7.3

### Patch Changes

- 77af1fc: chore(dependencies): auto update for maintenance purpose

  ```diff
  -    "@babel/core": "^7.15.0"
  +    "@babel/core": "^7.16.12"
  -    "@babel/plugin-proposal-class-properties": "^7.14.5"
  +    "@babel/plugin-proposal-class-properties": "^7.16.7"
  -    "@babel/plugin-proposal-export-default-from": "^7.14.5"
  +    "@babel/plugin-proposal-export-default-from": "^7.16.7"
  -    "@babel/plugin-proposal-export-namespace-from": "^7.14.5"
  +    "@babel/plugin-proposal-export-namespace-from": "^7.16.7"
  -    "@babel/plugin-proposal-optional-chaining": "^7.14.5"
  +    "@babel/plugin-proposal-optional-chaining": "^7.16.7"
  -    "@babel/plugin-transform-object-assign": "^7.14.5"
  +    "@babel/plugin-transform-object-assign": "^7.16.7"
  -    "@babel/preset-env": "^7.15.0"
  +    "@babel/preset-env": "^7.16.11"
  -    "@babel/preset-react": "^7.14.5"
  +    "@babel/preset-react": "^7.16.7"
  -    "@babel/preset-typescript": "^7.15.0"
  +    "@babel/preset-typescript": "^7.16.7"
  ```

## 9.7.2

### Patch Changes

- edb4a02: make it work with both js,jsx,ts,tsx

## 9.7.1

### Patch Changes

- ae7a0ef: fix: make babel preset-typescript works in webpack build

## 9.7.0

### Minor Changes

- e4a6e7e: feat(typescript): compile typescript via babel

## 9.6.3

### Patch Changes

- 9ef83c5: Upgrade dependencies to be aligned with what is used in dev mode
