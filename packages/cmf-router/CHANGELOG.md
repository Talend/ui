# Changelog

## 8.0.1

### Patch Changes

- 4f5cc5c: Bump security CVE
- Updated dependencies [4f5cc5c]
  - @talend/react-cmf@11.0.1

## 8.0.0

### Major Changes

- 816bb91: BREAKING CHANGE: Upgraded path-to-regexp from 3.x to 8.x

  This upgrade was necessary to resolve security vulnerabilities. The new version introduces two breaking changes that require updates to your application:

  1. Optional Path Parameter Syntax Change

  - Old syntax: `/resources/:id?`
  - New syntax: `/resources{/id}`

  This change is required because in path-to-regexp 8.x, the `?` character is reserved for query parameters and will throw a parsing error when used at the end of a path.

  2. Root Path Matching Behavior Change

  - In v3.x, root path `/` would match any path starting with `/`
  - In v8.x, root path `/` only matches exactly `/`
  - To match both root and child paths, use the wildcard pattern `/{*path}`

  Example migration:

  ```javascript
  // Before
  const routes = {
      '/': rootSaga,
      '/resources/:id?': resourceSaga
  };

  // After
  const routes = {
      '/{*path}': rootSaga,  // if you want to match all routes
      '/resources{/id}': resourceSaga
  };
  ```

  For more details about path matching and troubleshooting, see [path-to-regexp documentation](https://github.com/pillarjs/path-to-regexp#errors).

### Patch Changes

- Updated dependencies [816bb91]
  - @talend/react-cmf@11.0.0

## 7.1.1

### Patch Changes

- e2d8899: Revert: upgrade path-to-regexp
- Updated dependencies [e2d8899]
  - @talend/react-cmf@10.1.1

## 7.1.0

### Minor Changes

- ea14b87: Fix Dependabot alerts

### Patch Changes

- Updated dependencies [ea14b87]
  - @talend/react-cmf@10.1.0

## 7.0.1

### Patch Changes

- f321a0d: Remove unused tsconfig.esm.json (initially added to use TSC but we stay with babel at the end)
- Updated dependencies [f321a0d]
  - @talend/react-cmf@10.0.1

## 7.0.0

### Major Changes

- c3750a1: chore: upgrade dependencies

  Major upgrade for all packages that have a peerDependency on react or react-dom. Those packages now ask for react@18 and react-dom@18.

### Patch Changes

- Updated dependencies [c3750a1]
  - @talend/react-cmf@10.0.0

## 6.2.0

### Minor Changes

- 3bd16fc: Add support to ESM

### Patch Changes

- Updated dependencies [3bd16fc]
  - @talend/react-cmf@9.1.0

## 6.1.3

### Patch Changes

- Updated dependencies [e48ae5f]
  - @talend/react-cmf@9.0.0

## 6.1.2

### Patch Changes

- 1abc22f: chore: upgrade dependencies
- Updated dependencies [1abc22f]
  - @talend/react-cmf@8.4.1

## 6.1.1

### Patch Changes

- c468f2f: chore: upgrade dependencies
- Updated dependencies [c468f2f]
  - @talend/react-cmf@8.3.1

## 6.1.0

### Minor Changes

- 3f9c8a7bb: update babel config to use babel.config.js instead of .babelrc.json
  add missing deps

### Patch Changes

- Updated dependencies [3f9c8a7bb]
  - @talend/react-cmf@8.1.0

## 6.0.0

### Major Changes

- 96d688489: React: Upgrade to react 18 and @types/react 18

### Patch Changes

- Updated dependencies [96d688489]
  - @talend/react-cmf@8.0.0

## 5.3.0

### Minor Changes

- ae37dc329: feat: update peerDependencies to accept react-18

### Patch Changes

- Updated dependencies [ae37dc329]
  - @talend/react-cmf@7.3.0

## 5.2.6

### Patch Changes

- 616601fda: chore: clean unnecessary react imports after React v17

  removed by running script `npx react-codemod update-react-imports`

  see doc https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports

- Updated dependencies [616601fda]
- Updated dependencies [f47e34dd0]
  - @talend/react-cmf@7.2.0

## 5.2.5

### Patch Changes

- 3bb657dea: fix: pin react-router to 6.3.0

## 5.2.4

### Patch Changes

- 3996a544b: fix(cmf-router): history listener

## 5.2.3

### Patch Changes

- 09dfb1a54: fix(cmf-router): no history listener unregister on new action

## 5.2.2

### Patch Changes

- 76c0caf5e: fix(cmf-router): wrong convertion from settings to routes for simple parent routes

## 5.2.1

### Patch Changes

- 6efe2d8e5: fix: saga documentTitle do not fail if no routes from config

## 5.2.0

### Minor Changes

- 3be0e2d22: feat(cmf-router): allow to have children when no cmf routes are defined

### Patch Changes

- Updated dependencies [6daf0e5dc]
  - @talend/react-cmf@7.1.3

## 5.1.1

### Patch Changes

- 1770e701b: fix: include peerDependencies in UMD manifest
- Updated dependencies [1770e701b]
  - @talend/react-cmf@7.1.1

## 5.1.0

### Minor Changes

- 47b758112: feat(ARCH-482): use React 17 internally and extend react peer dep version

### Patch Changes

- Updated dependencies [47b758112]
  - @talend/react-cmf@7.1.0

## 5.0.0

### Major Changes

- df182bbd4: Upgrade to react-router v6

  ## Migration (dependencies)

  - Update your package.json to point to `"@talend/react-cmf-router": "^4.0.0"`.
  - Execute yarn install and yarn-deduplicate.
  - yarn list --pattern router should not list `react-router-redux` anymore and all dependencies listed should be flat.

  # Breaking changes (code)

  `onEnter` and `onLeave` hooks are not supported anymore. You can use `React.useEffect` but be carefull as onEnter should be finished before rendering happens so use also a state for that.

  - sagaRouter is deprecated but still works. You can use either
    - use Saga component from `@talend/react-cmf` (prefered way)
    - `saga` props on a cmfConnected component
    - dispatch `cmf.actions.saga.start({saga: 'nameOfRegistredSaga'})` action creator

## 4.0.1

### Patch Changes

- 618951c8b: chore(deps): auto update for maintenance purpose
- Updated dependencies [618951c8b]
- Updated dependencies [f5e3a7ead]
  - @talend/react-cmf@7.0.1

## 4.0.0

### Major Changes

- 593026b37: Redux major upgrade with saga

### Patch Changes

- Updated dependencies [593026b37]
  - @talend/react-cmf@7.0.0

## 3.5.8

### Patch Changes

- 86f208189: chore: upgrade dependencies and align @talend scoped packages to latest
- Updated dependencies [86f208189]
  - @talend/react-cmf@6.39.1

## 3.5.7

### Patch Changes

- 039b85775: chore: upgrade dependencies and align @talend scoped packages to latest
- Updated dependencies [039b85775]
  - @talend/react-cmf@6.38.5

## 3.5.6

### Patch Changes

- 667cd0a50: chore: upgrade dependencies and align @talend scoped packages to latest
- Updated dependencies [667cd0a50]
  - @talend/react-cmf@6.38.4

## 3.5.5

### Patch Changes

- f1f4ec5bc: fix(workspace-run): package run order
- Updated dependencies [f1f4ec5bc]
  - @talend/react-cmf@6.38.3

## 3.5.4

### Patch Changes

- 3e9121287: chore(build): order packages on pre-release hook
- Updated dependencies [3e9121287]
  - @talend/react-cmf@6.38.2

## 3.5.3

### Patch Changes

- 0bd4c26f8: Fix pre-release script: remove display=none option
- Updated dependencies [0bd4c26f8]
  - @talend/react-cmf@6.38.1

## 3.5.2

fix: Update ui-script to remove dependencies which are not part of the package's dependencies but sub dependencies.
