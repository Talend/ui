# @talend/scripts-config-jest

## 14.1.0

### Minor Changes

- c3750a1: chore: upgrade dependencies

  Major upgrade for all packages that have a peerDependency on react or react-dom. Those packages now ask for react@18 and react-dom@18.

### Patch Changes

- Updated dependencies [c3750a1]
  - @talend/scripts-config-babel@13.5.0

## 14.0.4

### Patch Changes

- 28672e6: fix: 'Reference error: \_ is not defined'

## 14.0.3

### Patch Changes

- 4c6f37f: Avoid warning spam in case of mocking missing library for jest

## 14.0.2

### Patch Changes

- 1abc22f: chore: upgrade dependencies
- Updated dependencies [1abc22f]
  - @talend/scripts-config-babel@13.3.1

## 14.0.1

### Patch Changes

- 6c2df2b: Upgrade dependencies using talend-scripts upgrade:deps
- Updated dependencies [c468f2f]
  - @talend/scripts-config-babel@13.2.1

## 14.0.0

### Major Changes

- 24bcb177f: chore: bump testing-library to 6.x

## 13.1.1

### Patch Changes

- 06598a0c0: fix(TDP-12694): broken applyBabelTransformOn after pnpm use-case

## 13.1.0

### Minor Changes

- 673984929: Fix peer dependencies, Add lint

### Patch Changes

- f2ef85811: Update dependencies
- Updated dependencies [673984929]
  - @talend/scripts-config-babel@13.2.0

## 13.0.0

### Major Changes

- 9a0732ec5: - fix: enforce timer at the end of all tests.

  - feat: mock ally.js has it uses unsupported dom method from jsdom.
  - feat: add jest-axe configuration

  To support floating-ui/react following issue we have decided to add an afterAll to let floating-ui finish stuff
  https://github.com/floating-ui/floating-ui/issues/1908

  Breaking changes:

  you may have tests where you ask for jest.useFakeTimer without go back to real at some point. This is a side effect and it is not compatible with our change to support floating-ui.

  ```diff
  jest.useFakeTimers()
  render(<Tooltip><button></Tooltip>)
  +jest.useRealTimers()
  ```

  This will fix an error said your test is still pending after 5000 ms.

### Minor Changes

- e83b74b7c: Fix peer dependencies and adapt code to be compatible with pnpm
- 96d688489: feat: mock revokeURL
- 9a0732ec5: feat: add api to set a fetch MockResponse
  feat: add jest-axe integration

## 12.2.0

### Minor Changes

- ae37dc329: feat: update peerDependencies to accept react-18

## 12.1.2

### Patch Changes

- Updated dependencies [cf697de02]
  - @talend/scripts-config-babel@13.0.0

## 12.1.1

### Patch Changes

- 29e95e8f6: Add popover disclosure to rendered unit test

## 12.1.0

### Minor Changes

- 65c8ad05c: feat: add \***\*tests\*\*** folder in target (like the default jest config)

## 12.0.0

### Major Changes

- d73871906: feat: upgrade to jest 29

  changelog blog https://jestjs.io/blog/2022/08/25/jest-29
  changelog full: https://github.com/facebook/jest/blob/main/CHANGELOG.md#2900
  upgrade guide: https://jestjs.io/docs/upgrading-to-jest29

- c18aabb97: feat: export config from main

  Breaking change: this package can not be used by old talend-scripts preset. But now you can extends from it direclty.

  ```diff
  - const defaults = require('@talend/scripts-config-jest/jest.config.js');
  + const defaults = require('@talend/scripts-config-jest');
  ```

### Patch Changes

- Updated dependencies [c18aabb97]
  - @talend/scripts-config-babel@12.0.0

## 11.6.1

### Patch Changes

- 7b08afa04: fix(jest): try/catch some mocks that are not safely mocked

## 11.6.0

### Minor Changes

- 1200c70f8: mock crypto.randomUUID

## 11.5.0

### Minor Changes

- 4ea6a7712: feat: add the mock of reakit useId

### Patch Changes

- 4af3b2873: fix: do not use option1 which fails if d3 is not installed

## 11.4.0

### Minor Changes

- abf0bdc89: feat: add applyBabelTransformOn support to extend the jest config

## 11.3.0

### Minor Changes

- b02eb9ef4: feat: transpile node_modules

  Since d3 7.x and its dependencies use es6 as main entry in package.json, we need this because jest support of [ECMAPScriptModules](https://github.com/facebook/jest/blob/64de4d7361367fd711a231d25c37f3be89564264/docs/ECMAScriptModules.md) is experiemental

## 11.2.3

### Patch Changes

- Updated dependencies
  - @talend/scripts-config-babel@11.0.0

## 11.2.2

### Patch Changes

- Updated dependencies
  - @talend/scripts-config-babel@10.0.0

## 11.2.1

### Patch Changes

- c815ba11f: fix: use babel to transpile ts[x] tests

## 11.2.0

### Minor Changes

- ab1a6e983: feat: mock ResizeObserver

### Patch Changes

- 4d8636214: expose jsdom as global variable in jest environment

## 11.1.0

### Minor Changes

- 6fcd6e9f4: feat: Support .mjs files transform

## 11.0.0

### Major Changes

- b16efa779: Major upgrade to jest 28 with adapter config

## 10.2.2

### Patch Changes

- 3f4ad5e30: fix: url of repository in package.json
- Updated dependencies [3f4ad5e30]
  - @talend/scripts-config-babel@9.9.1

## 10.2.1

### Patch Changes

- 479b94f82: fix: add missing language attribute in i18next mock

## 10.2.0

### Minor Changes

- 47b758112: feat(ARCH-482): use React 17 internally and extend react peer dep version

## 10.1.0

### Minor Changes

- f038a450c: feat(jest): support react 17

## 10.0.0

### Major Changes

- 2875eb2ce: Breaking change: design-system mocked component now generate a span

## 9.7.3

### Patch Changes

- 799c40db6: fix: jest.mock should not rely on external deps

## 9.7.2

### Patch Changes

- a35403d: fix: name should not use dot

  This will remove the following warning from your tests:

  > Warning: <Coral.Icon /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.

  Note: you may have to update your tests/snapshots

## 9.7.1

### Patch Changes

- 77af1fc: chore(dependencies): auto update for maintenance purpose

  ```diff
  -    "@talend/scripts-config-babel": "^9.6.3"
  +    "@talend/scripts-config-babel": "^9.7.2"
  -    "core-js": "^3.17.1"
  +    "core-js": "^3.20.3"
  ```

- Updated dependencies [77af1fc]
  - @talend/scripts-config-babel@9.7.3

## 9.7.0

### Minor Changes

- bdb707f: feat: add testing-library matchers

## 9.6.4

### Patch Changes

- 9ef83c5: Upgrade dependencies to be aligned with what is used in dev mode
- Updated dependencies [9ef83c5]
  - @talend/scripts-config-babel@9.6.3

## 9.6.3

### Patch Changes

- 40ba52b: fix(jest): i18next.t mock default value as only option support
