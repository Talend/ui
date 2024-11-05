# @talend/router-bridge

## 2.2.0

### Minor Changes

- c3750a1: chore: upgrade dependencies

  Major upgrade for all packages that have a peerDependency on react or react-dom. Those packages now ask for react@18 and react-dom@18.

## 2.1.2

### Patch Changes

- 1abc22f: chore: upgrade dependencies

## 2.1.1

### Patch Changes

- c468f2f: chore: upgrade dependencies

## 2.1.0

### Minor Changes

- 3f9c8a7bb: update babel config to use babel.config.js instead of .babelrc.json
  add missing deps

## 2.0.0

### Major Changes

- 96d688489: React: Upgrade to react 18 and @types/react 18

## 1.2.3

### Patch Changes

- 616601fda: chore: clean unnecessary react imports after React v17

  removed by running script `npx react-codemod update-react-imports`

  see doc https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports

## 1.2.2

### Patch Changes

- 3bb657dea: fix: pin react-router to 6.3.0

## 1.2.1

### Patch Changes

- e28cf0a73: fix: allow props to be well passed to Router component

## 1.2.0

### Minor Changes

- 47b758112: feat(ARCH-482): use React 17 internally and extend react peer dep version

## 1.1.2

### Patch Changes

- 7946db15e: fix: set package visility to public

## 1.1.1

### Patch Changes

- 039b85775: chore: upgrade dependencies and align @talend scoped packages to latest

## 1.1.0

### Minor Changes

- b55f6de12: feat(router-bridge/SidePanel): support route basename

### Patch Changes

- 667cd0a50: chore: upgrade dependencies and align @talend scoped packages to latest

## 1.0.5

### Patch Changes

- f1f4ec5bc: fix(workspace-run): package run order

## 1.0.4

### Patch Changes

- 3e9121287: chore(build): order packages on pre-release hook

## 1.0.3

### Patch Changes

- 0bd4c26f8: Fix pre-release script: remove display=none option
