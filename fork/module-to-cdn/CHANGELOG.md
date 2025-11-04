# @talend/module-to-cdn

## 9.16.0

### Minor Changes

- ed37213: Update dependencies

## 9.15.0

### Minor Changes

- 3a513cb: Update deps

## 9.14.0

### Minor Changes

- d622175: deps: bump execa from 4.x to 8.x

## 9.13.0

### Minor Changes

- 00e4dde: Bump deps and set RHF to latest with caret

## 9.12.3

### Patch Changes

- de6ae38: Bump dependencies

## 9.12.2

### Patch Changes

- dd75a5a: fix: update ag-grid-react path

## 9.12.1

### Patch Changes

- 4f5cc5c: Bump security CVE

## 9.12.0

### Minor Changes

- 2a7fe08: chore: Remove ally.js

## 9.11.1

### Patch Changes

- d9fe636: fix: module to cdn for ag-grid

## 9.11.0

### Minor Changes

- c3750a1: chore: upgrade dependencies

    Major upgrade for all packages that have a peerDependency on react or react-dom. Those packages now ask for react@18 and react-dom@18.

## 9.10.1

### Patch Changes

- 1abc22f: chore: upgrade dependencies

## 9.10.0

### Minor Changes

- 3f9c8a7bb: remove babel config: there is no build task on this package
  remove link to scripts-core to run lint (circular dependency),
  remove link to tools/eslint-config and add it's own eslint config (circular dependency: fork/module-to-cdn > tools/eslint-config > tools/scripts-config-cdn > fork/module-to-cdn)
  add missing deps

## 9.9.1

### Patch Changes

- d465adb68: fix: ace code editor

    Issue1: 404 on react-ace min in dev mode.
    The copy of the assets during the build is not able to support different forlders and this is the case for react-ace.
    The getUMD point to the production version (becaue of babel) but we are in dev so this make a 404.
    Fix: point to prod for both versions

    Issue 2: function f is not defined (trace in ace-build).
    Fix: pin ace-builds in react-forms because there is a bug in the latest version

## 9.9.0

### Minor Changes

- f65073eb9: feat: add ace-builds

## 9.8.5

### Patch Changes

- fed80967c: - UUID removed umd with version 9.0.0

## 9.8.4

### Patch Changes

- 4b7bbf794: Update config of react-router in modules.json

## 9.8.3

### Patch Changes

- 3f4ad5e30: fix: url of repository in package.json

## 9.8.2

### Patch Changes

- e170f5dfe: fix: sentry browser

## 9.8.1

### Patch Changes

- e2f39ee: fix(module-to-cdn): @sentry/browser path

## 9.8.0

### Minor Changes

- a4f2f6c: feat: add ag-grid-react umd

## 9.7.7

### Patch Changes

- da171e6: fix(module-to-cdn): missing file in release

## 9.7.6

### Patch Changes

- 4061a94: feat(module-to-cdn): parse complex package.json version

## 9.7.5

### Patch Changes

- b31b2b8: add react-router v6 and react-router-dom v6

## 9.7.4

### Patch Changes

- 45988d6: fix(module-to-cdn): rechart path to umd

## 9.7.3

### Patch Changes

- d03cd41: add recharts >= 2.1.5

## 9.7.2

### Patch Changes

- 3e942de: Remove axios from dependencies for security reasons

## 9.7.1

### Patch Changes

- 9ef83c5: Upgrade dependencies to be aligned with what is used in dev mode

## 9.7.0

### Minor Changes

- 5d12d77: Add cldr-dates-full

### Patch Changes

- 5c0cd63: fix: move local path compute from moduleToCdn to webpack plugin and cdn config.

    Context: When multiple versions of a package are installed.
    When the two versions do not resolve the same path from module-to-cdn.
    Ex: `react-dnd` in 2.6.0 and 14.0.0. Only the path from the installed in root node_modules will be found
    which lead to bad resolution (404).

    Why: We use require.resolve without context or with wrong options `paths` so we find only the root one.

    Solution: Remove resolution from module-to-cdn which has no way to have a context path and update cdn config and webpack plugin to use require.resolve with correct paths.
