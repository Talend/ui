# @talend/scripts-utils

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
