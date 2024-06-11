# @talend/scripts-config-babel

## 13.4.0

### Minor Changes

- 3bd16fc: feat: add preset modules option

  if process.env.ESM is set to true then the babel config will set preset-env.modules option to `false` so the output will be esm.

## 13.3.1

### Patch Changes

- 1abc22f: chore: upgrade dependencies
- Updated dependencies [1abc22f]
  - @talend/babel-plugin-import-from-index@1.7.1
  - @talend/babel-plugin-assets-api@1.3.1

## 13.3.0

### Minor Changes

- 9568363: Use include instead of same-origin in the credentials option of fetch.

### Patch Changes

- Updated dependencies [9568363]
  - @talend/babel-plugin-import-from-index@1.7.0
  - @talend/babel-plugin-assets-api@1.3.0

## 13.2.1

### Patch Changes

- c468f2f: chore: upgrade dependencies
- Updated dependencies [c468f2f]
  - @talend/babel-plugin-import-from-index@1.6.1
  - @talend/babel-plugin-assets-api@1.2.1

## 13.2.0

### Minor Changes

- 673984929: fix plugin order for eslint and fix eslint config (circular dep)

### Patch Changes

- Updated dependencies [673984929]
- Updated dependencies [673984929]
  - @talend/babel-plugin-import-from-index@1.6.0
  - @talend/babel-plugin-assets-api@1.2.0

## 13.1.0

### Minor Changes

- 3f9c8a7bb: adapt code to be compatible with pnpm
  add missing deps

## 13.0.0

### Major Changes

- cf697de02: feat: use React automatic import to transpile jsx (related to useless React import cleaning)

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
