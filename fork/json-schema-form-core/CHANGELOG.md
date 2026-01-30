# @talend/json-schema-form-core

## 2.0.0

### Major Changes

- 18e73d1: chore: move from sass to css
- 16703c7: chore: drop UMD format

### Minor Changes

- bb95e38: Fix CVE's by upgrading sq to v6.14.1, tar to 7.5.4 and eslint to 9.39.2

## 1.5.0

### Minor Changes

- ed37213: Update dependencies

## 1.4.5

### Patch Changes

- 5a9e099: fix: add missing repository field

## 1.4.4

### Patch Changes

- de6ae38: Bump dependencies

## 1.4.3

### Patch Changes

- 4f5cc5c: Bump security CVE

## 1.4.2

### Patch Changes

- d80737c: Fix remaining dependabot alerts

## 1.4.1

### Patch Changes

- f321a0d: Remove unused tsconfig.esm.json (initially added to use TSC but we stay with babel at the end)

## 1.4.0

### Minor Changes

- c3750a1: chore: upgrade dependencies

  Major upgrade for all packages that have a peerDependency on react or react-dom. Those packages now ask for react@18 and react-dom@18.

## 1.3.0

### Minor Changes

- 3bd16fc: Add support to ESM

## 1.2.7

### Patch Changes

- 568481a: Remove usage of path-browserify as it's not needed

## 1.2.6

### Patch Changes

- f546896: Fix: improve call of use in sass files + fix ts lint

## 1.2.5

### Patch Changes

- 779fc8c: - JSFC is a fork of https://github.com/json-schema-form/json-schema-form-core : its place is in the Fork folder
  - Remove local copy of json-refs and use package instead
  - add missing type to fix ts compilation error
  - add a polyfill for json-refs: path-browserify

## 1.2.4

### Patch Changes

- af0ac2d: Upgrade rimraf to version 5.0.5

## 1.2.3

### Patch Changes

- 1abc22f: chore: upgrade dependencies

## 1.2.2

### Patch Changes

- 5d631f2: TMC-27327 - Fix input number validation to display correct error message

## 1.2.1

### Patch Changes

- c468f2f: chore: upgrade dependencies

## 1.2.0

### Minor Changes

- b9cc5b097: Add missing deps, fix lint issue and fix tsconfig file

## 1.1.1

### Patch Changes

- f77b6a9b7: TDOPS-3372 - validate input value for integer fields

## 1.1.0

### Minor Changes

- 47b758112: feat(ARCH-482): use React 17 internally and extend react peer dep version

## 1.0.5

### Patch Changes

- 86f208189: chore: upgrade dependencies and align @talend scoped packages to latest

## 1.0.4

### Patch Changes

- 039b85775: chore: upgrade dependencies and align @talend scoped packages to latest

## 1.0.3

### Patch Changes

- 667cd0a50: chore: upgrade dependencies and align @talend scoped packages to latest

## 1.0.2

### Patch Changes

- f1f4ec5bc: fix(workspace-run): package run order

## 1.0.1

### Patch Changes

- 3e9121287: chore(build): order packages on pre-release hook

## 1.0.0

### Patch Changes

- fe4af8c5d: fix: rebuild using talend-scripts. Output is now an umd file which embed tv4.
