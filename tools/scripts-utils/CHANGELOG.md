# @talend/scripts-utils

## 2.3.2

### Patch Changes

- 4f5cc5c: Bump security CVE

## 2.3.1

### Patch Changes

- d80737c: Fix remaining dependabot alerts

## 2.3.0

### Minor Changes

- c3750a1: chore: upgrade dependencies

  Major upgrade for all packages that have a peerDependency on react or react-dom. Those packages now ask for react@18 and react-dom@18.

## 2.2.1

### Patch Changes

- 1abc22f: chore: upgrade dependencies

## 2.2.0

### Minor Changes

- 673984929: Add missing deps and revert change about eslint config to use the talend one

### Patch Changes

- f2ef85811: Update dependencies

## 2.1.0

### Minor Changes

- 3f9c8a7bb: fix test to use package existing in the package.json
  remove link to scripts-core (circular dep)
  add missing deps
  adapt code for pnpm

## 2.0.2

### Patch Changes

- c7152471f: fix: make it public

## 2.0.1

### Patch Changes

- c21e5b699: fix: win32 platform

## 2.0.0

### Major Changes

- 65c8ad05c: chore: move the code to src

  this is breaking change for package if you require directly to files. The risk is low has most of the usage are in this repository
