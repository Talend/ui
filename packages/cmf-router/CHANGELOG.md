# Changelog

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
