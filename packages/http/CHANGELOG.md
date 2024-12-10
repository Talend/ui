# @talend/http

## 3.3.0

### Minor Changes

- fc2e30f: Fix remaining dependabot alerts

## 3.2.0

### Minor Changes

- c3750a1: chore: upgrade dependencies

  Major upgrade for all packages that have a peerDependency on react or react-dom. Those packages now ask for react@18 and react-dom@18.

## 3.1.2

### Patch Changes

- 1abc22f: chore: upgrade dependencies

## 3.1.1

### Patch Changes

- c468f2f: chore: upgrade dependencies

## 3.1.0

### Minor Changes

- 3f9c8a7bb: update babel config to use babel.config.js instead of .babelrc.json
  add missing deps
  fix tsconfig

## 3.0.0

### Major Changes

- 96d688489: React: Upgrade to react 18 and @types/react 18

## 2.4.0

### Minor Changes

- 72a8f20dc: feat(TDP-12106): improve interceptors to return a promise, have access to request and a business context from caller

## 2.3.0

### Minor Changes

- 67144d23d: feat(http): add the possibility to add global interceptors for every calls that got through @talend/http calls

  Usage:

  ```typescript
  import { addHttpResponseInterceptor, HTTP_STATUS } from '@talend/http';

  addHttpResponseInterceptor('logout', (response: Response): void => {
  	if (response.status === HTTP_STATUS.UNAUTHORIZED) {
  		logout();
  	}
  });
  ```

## 2.2.0

### Minor Changes

- a8bdec1f0: chore(http): Improve code covering
- e88ce400b: feat: expose http utils functions and constants

## 2.1.0

### Minor Changes

- 47b758112: feat(ARCH-482): use React 17 internally and extend react peer dep version

## 2.0.2

### Patch Changes

- d4bdd2ec2: chore(http): Add typing for error cases

## 2.0.1

### Patch Changes

- 1488ec429: typings: allow empty PUT payload

## 2.0.0

### Major Changes

- 48c0d55a4: chore(http): remove generators as async functions are enough (and they are not used)

### Minor Changes

- 48c0d55a4: chore(http): migrate to typescript

## 1.2.0

### Minor Changes

- 22d4687f3: Expose request statuses

## 1.1.6

### Patch Changes

- 039b85775: chore: upgrade dependencies and align @talend scoped packages to latest

## 1.1.5

### Patch Changes

- 667cd0a50: chore: upgrade dependencies and align @talend scoped packages to latest

## 1.1.4

### Patch Changes

- f1f4ec5bc: fix(workspace-run): package run order

## 1.1.3

### Patch Changes

- 3e9121287: chore(build): order packages on pre-release hook

## 1.1.2

### Patch Changes

- 0bd4c26f8: Fix pre-release script: remove display=none option

## 1.1.1

### Patch Changes

- feb4b0c6a: Drop lodash dependency
