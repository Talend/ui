# @talend/module-to-cdn

## 9.8.4

### Patch Changes

-   4b7bbf794: Update config of react-router in modules.json

## 9.8.3

### Patch Changes

-   3f4ad5e30: fix: url of repository in package.json

## 9.8.2

### Patch Changes

-   e170f5dfe: fix: sentry browser

## 9.8.1

### Patch Changes

-   e2f39ee: fix(module-to-cdn): @sentry/browser path

## 9.8.0

### Minor Changes

-   a4f2f6c: feat: add ag-grid-react umd

## 9.7.7

### Patch Changes

-   da171e6: fix(module-to-cdn): missing file in release

## 9.7.6

### Patch Changes

-   4061a94: feat(module-to-cdn): parse complex package.json version

## 9.7.5

### Patch Changes

-   b31b2b8: add react-router v6 and react-router-dom v6

## 9.7.4

### Patch Changes

-   45988d6: fix(module-to-cdn): rechart path to umd

## 9.7.3

### Patch Changes

-   d03cd41: add recharts >= 2.1.5

## 9.7.2

### Patch Changes

-   3e942de: Remove axios from dependencies for security reasons

## 9.7.1

### Patch Changes

-   9ef83c5: Upgrade dependencies to be aligned with what is used in dev mode

## 9.7.0

### Minor Changes

-   5d12d77: Add cldr-dates-full

### Patch Changes

-   5c0cd63: fix: move local path compute from moduleToCdn to webpack plugin and cdn config.

    Context: When multiple versions of a package are installed.
    When the two versions do not resolve the same path from module-to-cdn.
    Ex: `react-dnd` in 2.6.0 and 14.0.0. Only the path from the installed in root node_modules will be found
    which lead to bad resolution (404).

    Why: We use require.resolve without context or with wrong options `paths` so we find only the root one.

    Solution: Remove resolution from module-to-cdn which has no way to have a context path and update cdn config and webpack plugin to use require.resolve with correct paths.
