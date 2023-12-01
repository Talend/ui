# @talend/react-cmf

## 8.3.1

### Patch Changes

- c468f2f: chore: upgrade dependencies
- Updated dependencies [c468f2f]
  - @talend/scripts-cmf@1.2.2

## 8.3.0

### Minor Changes

- c508840d1: fix(): Fix security issue on regular expression

### Patch Changes

- 795a12e2d: fix: withoutHOC regex

  report says Polynomial regular expression used on uncontrolled data

## 8.2.0

### Minor Changes

- b9cc5b097: Fix lint issues

### Patch Changes

- Updated dependencies [b9cc5b097]
  - @talend/utils@2.8.0

## 8.1.0

### Minor Changes

- 3f9c8a7bb: update babel config to use babel.config.js instead of .babelrc.json
  add missing deps
  fix import of scripts-config-jest

## 8.0.0

### Major Changes

- 96d688489: React: Upgrade to react 18 and @types/react 18

## 7.3.0

### Minor Changes

- ae37dc329: feat: update peerDependencies to accept react-18

## 7.2.0

### Minor Changes

- f47e34dd0: feat: provide API for react testing library

### Patch Changes

- 616601fda: chore: clean unnecessary react imports after React v17

  removed by running script `npx react-codemod update-react-imports`

  see doc https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports

## 7.1.4

### Patch Changes

- f0a97113e: chore: remove uuid dependencies. use randomUUID from @talend/utils
- Updated dependencies [f0a97113e]
  - @talend/utils@2.5.0

## 7.1.3

### Patch Changes

- 6daf0e5dc: Sentry: capture exceptions caught by ErrorBoundary

## 7.1.2

### Patch Changes

- b6b13031f: fix: move scripts to dedicated package to avoid circular deps

## 7.1.1

### Patch Changes

- 1770e701b: fix: include peerDependencies in UMD manifest

## 7.1.0

### Minor Changes

- 47b758112: feat(ARCH-482): use React 17 internally and extend react peer dep version

## 7.0.2

### Patch Changes

- 5a9aa8718: fix(cmf): catch uncaught error in http error handling

## 7.0.1

### Patch Changes

- 618951c8b: chore(deps): auto update for maintenance purpose
- f5e3a7ead: Inject display error in case the component is not found

## 7.0.0

### Major Changes

- 593026b37: Redux major upgrade with saga

* upgrade redux and redux-saga dependencies
* pass cmfConnect Container has a function using new style context
* update all cmf tests
* add forwardRef support
* add API to make tests easier to migrate
* update all sagas and tests according to the breaking changes
* update storybook cmf plugin
* add useCMFContext hook to return get the context with store and registry as before (for compatibility purpose of business code)
* rewrite List container as a function (needed to have full context)
* rewrite Notification container as function

So yes you can t use multiple contextTypes as for now. So all components using this must be re written as function and can use useCMFContext to access a context object.

**Breaking changes**

- update the package.json to align dependencies

  - up redux-saga: from 0.x to 1.x
  - up react-redux: from 5.x to 7.x
  - add "@redux-saga/testing-utils": "^1.1.3", for testing sagas purpose
  - up redux-batched-actions: from 0.2.0 to 0.5.0

- `yarn list --pattern redux` output is flat
- `yarn test command` is ok else fix them
- changeset has been added with major release on concerned packages
- peer dependencies are aligned with dev dependencies
- publish release on verdaccio is working

Links to consider:

- https://github.com/reduxjs/redux/releases/tag/v4.0.0
- https://github.com/redux-saga/redux-saga/releases/tag/v1.0.0
- https://github.com/reduxjs/react-redux/releases/tag/v6.0.0
- https://github.com/reduxjs/react-redux/releases/tag/v7.0.1

Tests

Most of tests of containers need to be updated. We have used the cmf mock to add a new API.
It works also with shallow if you have provided a context, please use `getEnzymeOption`.

```diff
-mount(<Container acks={Map()} />, { context: { registry } });
+mount(<Container acks={Map()} />, mock.Provider.getEnzymeOption({ registry }));
```

Saga setup import for test has changed

```diff
-import { createMockTask } from 'redux-saga/utils';
+import { createMockTask } from '@redux-saga/testing-utils';
```

Saga returns values has changed, it was result.value[TYPE].attr, it is now result.value.payload.attr and result.value.type

```diff
const result = generator.next();
-expect(result.value.FORK.args[1]).toEqual({
+expect(result.value.payload.args[1]).toEqual({
```

Saga delay import has moved from root to effect

```diff
-import { delay } from 'redux-saga';
+import { delay } from 'redux-saga/effects';
```

**react-bootstrap cmfConnected**

if you are in the case where react-bootstrap has been cmfConnect, please consider this fix:

```diff
import * as bootstrap from 'react-bootstrap';

const components = Object.keys(bootstrap).reduce((acc, key) => {
        if (!acc[key] && typeof bootstrap[key] === 'function') {
                const options = {};
+               if (key === 'DropdownButton') {
+                       options.forwardRef = true;
+               }
                if (!bootstrap[key].displayName) {
                        bootstrap[key].displayName = key;
                }
```

The change is cmfConnected components are now pure function and from the [doc](https://reactjs.org/docs/refs-and-the-dom.html#accessing-refs):
**You may not use the `ref` attribute on function components** because they don’t have instances.

## 6.39.1

### Patch Changes

- 86f208189: chore: upgrade dependencies and align @talend scoped packages to latest

## 6.39.0

### Minor Changes

- b252ea199: feat: Add Saga component

## 6.38.5

### Patch Changes

- 039b85775: chore: upgrade dependencies and align @talend scoped packages to latest

## 6.38.4

### Patch Changes

- 667cd0a50: chore: upgrade dependencies and align @talend scoped packages to latest

## 6.38.3

### Patch Changes

- f1f4ec5bc: fix(workspace-run): package run order

## 6.38.2

### Patch Changes

- 3e9121287: chore(build): order packages on pre-release hook

## 6.38.1

### Patch Changes

- 0bd4c26f8: Fix pre-release script: remove display=none option

## 6.38.0

### Minor Changes

- c99784e64: Add options to bootstrap CMF without call dom rendering

## 6.37.0

### Minor Changes

- b6746b19c: Remove sentry integration
