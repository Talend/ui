# CHANGELOG

## 11.1.0

### Minor Changes

-   1770e701b: feat: add support for peerDependencies

## 11.0.3

### Patch Changes

-   aa2ffc733: fix: findPackage follow symlink in monorepo

## 11.0.2

### Patch Changes

-   5aaa1e9fc: use findPackage to ensure the version is compatible during dependency resolution from manifest

## 11.0.1

### Patch Changes

-   28df3ee1b: fix: handle package without varName

## 11.0.0

### Major Changes

-   4589878a9: 10.x.x already exists from last year so let's bump to 11

## 10.0.1

### Patch Changes

-   f4b3d115f: fix: add missing src folder in release
-   Updated dependencies [e170f5dfe]
    -   @talend/module-to-cdn@9.8.2

## 10.0.0

### Major Changes

-   b199a79e5: Rewrite to use cjs so no more lib folder in it

## 9.7.15

### Patch Changes

-   9cf2a86: chore(dependencies): auto update for maintenance purpose

    ```diff
    -    "@talend/module-to-cdn": "^9.7.5"
    +    "@talend/module-to-cdn": "^9.7.6"
    ```

## 9.7.14

### Patch Changes

-   19ba9a5: fix(dynamic-cdn-webpack-plugin): catch error from readPkgUp
-   Updated dependencies [b31b2b8]
    -   @talend/module-to-cdn@9.7.5

## 9.7.13

### Patch Changes

-   2bf291c: fix(cdn): iterate over peerdependenciesmeta for react-redux

## 9.7.12

### Patch Changes

-   57ee6e0: Support multiple UMD in the same package
-   Updated dependencies [d03cd41]
    -   @talend/module-to-cdn@9.7.3

## 9.7.11

### Patch Changes

-   08faea7: Move creation of dependencies.json to emit hooks

## 9.7.10

### Patch Changes

-   5a64101: fix(dynamic-cdn-webpack-plugin): take peer deps meta into account

## 9.7.9

### Patch Changes

-   52527bd: upgrade webpack-cli

## 9.7.8

### Patch Changes

-   a6201b3: Revert upgrade of webpack-cli and dev-server

## 9.7.7

### Patch Changes

-   9ef83c5: Upgrade dependencies to be aligned with what is used in dev mode
-   Updated dependencies [9ef83c5]
    -   @talend/module-to-cdn@9.7.1

## 9.7.6

### Patch Changes

-   1802d02: fix(cdn): sri computation on right version

## 9.7.5

### Patch Changes

-   b14b4fa: fix(dynamic-cdn-webpack-plugin): skip a dep of dep if not installed

## 9.7.4

### Patch Changes

-   51676de: Improve logs to better analyze who has added a dependency

## 9.7.3

### Patch Changes

-   5c0cd63: fix: move local path compute from moduleToCdn to webpack plugin and cdn config.

    Context: When multiple versions of a package are installed.
    When the two versions do not resolve the same path from module-to-cdn.
    Ex: `react-dnd` in 2.6.0 and 14.0.0. Only the path from the installed in root node_modules will be found
    which lead to bad resolution (404).

    Why: We use require.resolve without context or with wrong options `paths` so we find only the root one.

    Solution: Remove resolution from module-to-cdn which has no way to have a context path and update cdn config and webpack plugin to use require.resolve with correct paths.

-   Updated dependencies [5d12d77]
-   Updated dependencies [5c0cd63]
    -   @talend/module-to-cdn@9.7.0

## 9.7.2

### Patch Changes

-   4def0f8: fix memory comsumption by removing copy of assets

## 9.7.1

### Patch Changes

-   d4add3d: assert if file exists in computeSRI (windows hang)

## 9.7.0

### Minor Changes

-   687c74a: feat(cdn): cdn libs integrity hash
-   55ea3b0: feat(cdn): SRI on css files

## 9.6.3

### Patch Changes

-   ef8a9fb: Remove unecessary peer dependencies here

## 5.0.0 (Septembre 11, 2020)

This is the first release as a fork

-   update all dependencies and usage of it
-   set default resolver to @talend/module-to-cdn

## 3.3.0 (July 26, 2017)

### features

-   able to use a custom resolver ([#26](https://github.com/mastilver/dynamic-cdn-webpack-plugin/pull/26))

### fixes

-   do not include module if peers dependencies failed ([7257b5f](https://github.com/mastilver/dynamic-cdn-webpack-plugin/commit/7257b5ffd12a3213077c096f51e77f6a1742ae56))

> Note: the module was rename to dynamic-cdn-webpack-plugin

## 3.2.3 (July 20, 2017)

### fixes:

-   returns right var name in all cases (adcd2b9)

## 3.2.2 (July 19, 2017)

### fixes:

-   use correct module when using multiple modules versions ([#25](https://github.com/mastilver/dynamic-cdn-webpack-plugin/pull/25))
-   add webpack@3 to peerDependencies (ed1e72a)

## 3.2.1 (July 19, 2017)

### fixes:

-   able to require a file inside a module ([#20](https://github.com/mastilver/dynamic-cdn-webpack-plugin/pull/20))

## 3.2.0 (July 2, 2017)

### features:

-   add verbose mode (fb79805)

## 3.1.0 (July 2, 2017)

### features:

-   add 'only'/'exclude' options (713d74f)
