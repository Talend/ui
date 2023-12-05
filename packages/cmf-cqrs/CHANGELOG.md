# @talend/react-cmf-cqrs

## 10.1.1

### Patch Changes

- c468f2f: chore: upgrade dependencies
- Updated dependencies [c468f2f]
  - @talend/react-cmf@8.3.1

## 10.1.0

### Minor Changes

- 3f9c8a7bb: update babel config to use babel.config.js instead of .babelrc.json
  add missing deps

### Patch Changes

- Updated dependencies [3f9c8a7bb]
  - @talend/react-cmf@8.1.0

## 10.0.0

### Major Changes

- 96d688489: React: Upgrade to react 18 and @types/react 18

### Patch Changes

- Updated dependencies [96d688489]
  - @talend/react-cmf@8.0.0

## 9.0.2

### Patch Changes

- Updated dependencies [8520b05f9]
  - @talend/utils@2.6.0

## 9.0.1

### Patch Changes

- Updated dependencies [20388beea]
  - @talend/utils@2.5.2

## 9.0.0

### Major Changes

- 7cfaae07a: chore: refactor to use new Context API

  rewrite tests using RTL

  ## breaking changes:

  If you are using this component in a test you must wrap it in CMF mock Provider to have redux, registry and router.

  As this provider is set by CMF bootstrap you should have no issue in app.

## 8.1.0

### Minor Changes

- ae37dc329: feat: update peerDependencies to accept react-18

### Patch Changes

- Updated dependencies [ae37dc329]
  - @talend/react-cmf@7.3.0

## 8.0.0

### Major Changes

- f341cb828: feat(cmf-cqrs): allow to pass a filter function to useWebsocket

## 7.2.1

### Patch Changes

- 616601fda: chore: clean unnecessary react imports after React v17

  removed by running script `npx react-codemod update-react-imports`

  see doc https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports

- Updated dependencies [616601fda]
- Updated dependencies [f47e34dd0]
  - @talend/react-cmf@7.2.0

## 7.2.0

### Minor Changes

- 47b758112: feat(ARCH-482): use React 17 internally and extend react peer dep version

### Patch Changes

- Updated dependencies [47b758112]
  - @talend/react-cmf@7.1.0

## 7.1.1

### Patch Changes

- dd7db5acf: fix(cmf-cqrs): fix package build

## 7.1.0

### Minor Changes

- dc846fccd: feat(cmf-cqrs): Add usewebsocket hook

## 7.0.1

### Patch Changes

- 275c25ee0: chore(dependencies): auto update for maintenance purpose

  ```diff
  -    "@talend/react-cmf": "^7.0.0"
  +    "@talend/react-cmf": "^7.0.1"
  ```

## 7.0.0

### Major Changes

- 593026b37: Redux major upgrade with saga

### Patch Changes

- Updated dependencies [593026b37]
  - @talend/react-cmf@7.0.0

## 6.36.5

### Patch Changes

- 86f208189: chore: upgrade dependencies and align @talend scoped packages to latest
- Updated dependencies [86f208189]
  - @talend/react-cmf@6.39.1

## 6.36.4

### Patch Changes

- 667cd0a50: chore: upgrade dependencies and align @talend scoped packages to latest
- Updated dependencies [667cd0a50]
  - @talend/react-cmf@6.38.4

## 6.36.3

### Patch Changes

- f1f4ec5bc: fix(workspace-run): package run order
- Updated dependencies [f1f4ec5bc]
  - @talend/react-cmf@6.38.3

## 6.36.2

### Patch Changes

- 3e9121287: chore(build): order packages on pre-release hook
- Updated dependencies [3e9121287]
  - @talend/react-cmf@6.38.2

## 6.36.1

### Patch Changes

- 0bd4c26f8: Fix pre-release script: remove display=none option
- Updated dependencies [0bd4c26f8]
  - @talend/react-cmf@6.38.1
