# @talend/scripts-core

## 17.0.0

### Major Changes

- ecbfee8: chore: remove storybook commands and integration

  You should do the following to migrate:

  in your package.json

  ```diff

  "scripts": {
  -  "start": "talend-scripts start"
  +  "start": "storybook dev"
  -  "build-storybook": "talend-scripts build-storybook"
  +  "build-storybook": "storybook build"
  }

  "dependencies": {
  -  "@talend/scripts-core": "^16.8.0",
  +  "@talend/scripts-core": "^17.0.0",

  -  "@storybook/addon-actions": "^7.6.21",
  -  "@storybook/.*": "^7.6.21",
  +  "@storybook/addon-a11y": "^10.1.11",
  +  "@storybook/addon-links": "^10.1.11",
  +  "@storybook/react": "^10.1.11",
  +  "@storybook/react-vite": "^10.1.11",
  -  "@talend/scripts-config-storybook-lib": "^5.8.0",
  +  "@talend/scripts-config-storybook-lib": "^6.0.0",
  +  "storybook": "^10.1.11"
  }
  ```

  Then ensure you have update your `.storybook/main.js` and `.storybook/preview` files like this:
  - rename to main.mjs to use ESM
  - keep main.ts if it was already in TS.

  ```js
  // .storybook/main.mjs
  import { createMainConfig } from '@talend/scripts-config-storybook-lib/main';

  export default createMainConfig({});
  ```

  ```js
  // .storybook/preview.mjs
  import { createPreviewConfig } from '@talend/scripts-config-storybook-lib/main';

  const preview = createPreviewConfig({
  	parameters: {},
  	i18n: {
  		namespaces: [...tuiContainersNamespaces, ...tuiComponentsNamespaces, ...dsNamespaces],
  		remoteLocalesMap: {
  			'tui-containers':
  				'https://statics.cloud.talend.com/@talend/locales-tui-containers/9.1.3/locales/{{lng}}/{{ns}}.json',
  			'tui-components':
  				'https://statics.cloud.talend.com/@talend/locales-tui-components/16.0.1/locales/{{lng}}/{{ns}}.json',
  			'design-system':
  				'https://statics.cloud.talend.com/@talend/locales-design-system/7.15.1/locales/{{lng}}/{{ns}}.json',
  		},
  	},
  	cmf: {
  		modules: [cmfModule],
  		settings: settings,
  	},
  });
  ```

### Minor Changes

- bb95e38: Fix CVE's by upgrading sq to v6.14.1, tar to 7.5.4 and eslint to 9.39.2

### Patch Changes

- Updated dependencies [bb95e38]
- Updated dependencies [a525026]
- Updated dependencies [ecbfee8]
- Updated dependencies [ecbfee8]
  - @talend/scripts-config-typescript@12.0.0
  - @talend/scripts-config-stylelint@4.4.0
  - @talend/eslint-config@14.0.0
  - @talend/scripts-config-babel@13.9.0
  - @talend/scripts-config-jest@14.6.0
  - @talend/eslint-plugin@1.7.0
  - @talend/scripts-utils@2.7.0

## 16.8.0

### Minor Changes

- ed37213: Update dependencies

### Patch Changes

- Updated dependencies [ed37213]
  - @talend/scripts-config-typescript@11.4.0
  - @talend/scripts-config-stylelint@4.3.0
  - @talend/eslint-config@13.5.0
  - @talend/scripts-config-babel@13.8.0
  - @talend/scripts-config-jest@14.5.0
  - @talend/eslint-plugin@1.6.0
  - @talend/scripts-utils@2.6.0

## 16.7.0

### Minor Changes

- 3a513cb: Update deps

### Patch Changes

- Updated dependencies [3a513cb]
  - @talend/eslint-config@13.4.0
  - @talend/scripts-config-babel@13.7.0
  - @talend/scripts-config-jest@14.4.0
  - @talend/eslint-plugin@1.5.0
  - @talend/scripts-utils@2.5.0

## 16.6.0

### Minor Changes

- 00e4dde: Bump deps and set RHF to latest with caret

### Patch Changes

- Updated dependencies [00e4dde]
  - @talend/eslint-config@13.3.0
  - @talend/scripts-config-babel@13.6.0
  - @talend/scripts-config-jest@14.3.0
  - @talend/eslint-plugin@1.4.0
  - @talend/scripts-utils@2.4.0

## 16.5.4

### Patch Changes

- de6ae38: Bump dependencies
- Updated dependencies [de6ae38]
  - @talend/scripts-config-typescript@11.3.2
  - @talend/scripts-config-stylelint@4.2.2
  - @talend/eslint-config@13.2.4
  - @talend/scripts-config-babel@13.5.2
  - @talend/scripts-config-jest@14.2.2
  - @talend/scripts-utils@2.3.4

## 16.5.3

### Patch Changes

- ae979f0: Bump dependencies
- Updated dependencies [ae979f0]
  - @talend/eslint-config@13.2.3

## 16.5.2

### Patch Changes

- 4f5cc5c: Bump security CVE
- Updated dependencies [4f5cc5c]
  - @talend/eslint-plugin@1.3.2
  - @talend/scripts-config-babel@13.5.1
  - @talend/eslint-config@13.2.2
  - @talend/scripts-config-jest@14.2.1
  - @talend/scripts-config-stylelint@4.2.1
  - @talend/scripts-config-typescript@11.3.1
  - @talend/scripts-utils@2.3.2

## 16.5.1

### Patch Changes

- 4f8ac2d: TMC-28977 - Allow Talend scripts to copy .css files on build

## 16.5.0

### Minor Changes

- c3750a1: chore: upgrade dependencies

  Major upgrade for all packages that have a peerDependency on react or react-dom. Those packages now ask for react@18 and react-dom@18.

### Patch Changes

- Updated dependencies [c3750a1]
  - @talend/scripts-config-typescript@11.3.0
  - @talend/scripts-config-stylelint@4.2.0
  - @talend/eslint-config@13.2.0
  - @talend/scripts-config-babel@13.5.0
  - @talend/scripts-config-jest@14.1.0
  - @talend/eslint-plugin@1.3.0
  - @talend/scripts-utils@2.3.0

## 16.4.0

### Minor Changes

- 3bd16fc: feat: add --esm option to talend-scripts build:lib

### Patch Changes

- Updated dependencies [3bd16fc]
  - @talend/scripts-config-babel@13.4.0

## 16.3.6

### Patch Changes

- af0ac2d: Upgrade rimraf to version 5.0.5

## 16.3.5

### Patch Changes

- 1abc22f: chore: upgrade dependencies
- Updated dependencies [1abc22f]
  - @talend/scripts-config-typescript@11.2.1
  - @talend/scripts-config-stylelint@4.1.1
  - @talend/eslint-config@13.0.3
  - @talend/scripts-config-babel@13.3.1
  - @talend/scripts-config-jest@14.0.2
  - @talend/eslint-plugin@1.1.1
  - @talend/scripts-utils@2.2.1

## 16.3.4

### Patch Changes

- 6e85e98: Fix: make lint working in jenkins

## 16.3.3

### Patch Changes

- 55f1d54: fix(script-core): make a solution compatible with windows and pnpm

## 16.3.2

### Patch Changes

- f69c72b: Fixed issue with scripts that could not resolve bin path on windows
- c468f2f: chore: upgrade dependencies
- Updated dependencies [c468f2f]
- Updated dependencies [6c2df2b]
  - @talend/eslint-config@13.0.2
  - @talend/scripts-config-babel@13.2.1
  - @talend/scripts-config-jest@14.0.1

## 16.3.1

### Patch Changes

- Updated dependencies [24bcb177f]
  - @talend/scripts-config-jest@14.0.0

## 16.3.0

### Minor Changes

- e77b32c35: Add option lint-merge-report

### Patch Changes

- Updated dependencies [f14ebbe23]
  - @talend/eslint-config@13.0.1

## 16.2.0

### Minor Changes

- 673984929: Improve peerDependencies and add missing deps to not have circular dependency, adapt code to be compatible with PNPM and fix tests

### Patch Changes

- f2ef85811: Fix script for lint
- Updated dependencies [f2ef85811]
- Updated dependencies [673984929]
- Updated dependencies [f2ef85811]
- Updated dependencies [f2ef85811]
- Updated dependencies [f2ef85811]
- Updated dependencies [673984929]
- Updated dependencies [673984929]
- Updated dependencies [673984929]
- Updated dependencies [673984929]
- Updated dependencies [673984929]
  - @talend/scripts-utils@2.2.0
  - @talend/eslint-plugin@1.1.0
  - @talend/scripts-config-jest@13.1.0
  - @talend/scripts-config-stylelint@4.1.0
  - @talend/scripts-config-typescript@11.2.0
  - @talend/scripts-config-babel@13.2.0

## 16.1.1

### Patch Changes

- Updated dependencies [e82cc7f30]
  - @talend/eslint-config@13.0.0

## 16.1.0

### Minor Changes

- 3f9c8a7bb: update babel config to use babel.config.js instead of .babelrc.json
  update scripts following changes made in scripts-config-babel

### Patch Changes

- Updated dependencies [3f9c8a7bb]
- Updated dependencies [3f9c8a7bb]
- Updated dependencies [3f9c8a7bb]
  - @talend/scripts-config-babel@13.1.0
  - @talend/eslint-config@12.2.0
  - @talend/scripts-utils@2.1.0

## 16.0.0

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

### Patch Changes

- Updated dependencies [9a0732ec5]
- Updated dependencies [e83b74b7c]
- Updated dependencies [96d688489]
- Updated dependencies [9a0732ec5]
  - @talend/scripts-config-jest@13.0.0

## 15.0.0

### Major Changes

- 3b058ef7d: feat: upgrade storybook to 7.x major release

## 14.0.1

### Patch Changes

- d9616e484: Fix the use of spawn on windows

## 14.0.0

### Major Changes

- 40e70c055: Upgrade typescript to 5.0

## 13.3.0

### Minor Changes

- 51206dfd6: Make scripts-core compliant with yarn v3.X

## 13.2.0

### Minor Changes

- 7d816bb77: feat: add --fix support

### Patch Changes

- Updated dependencies [7d816bb77]
  - @talend/eslint-config@12.1.1

## 13.1.3

### Patch Changes

- Updated dependencies [cf697de02]
  - @talend/scripts-config-babel@13.0.0
  - @talend/scripts-config-jest@12.1.2

## 13.1.2

### Patch Changes

- 007624821: fix: do not require storybook until function calls

## 13.1.1

### Patch Changes

- c21e5b699: fix: win32 platform
- Updated dependencies [c21e5b699]
  - @talend/scripts-utils@2.0.1

## 13.1.0

### Minor Changes

- 65c8ad05c: chore: refactor using @talend/scripts-utils
  feat: log error of the scripts if there is a JS error from the script itself
  chore: re-organise files using src folder to use talend-script on talend-scripts

### Patch Changes

- Updated dependencies [65c8ad05c]
- Updated dependencies [65c8ad05c]
- Updated dependencies [65c8ad05c]
  - @talend/eslint-config@12.0.2
  - @talend/scripts-config-jest@12.1.0
  - @talend/scripts-utils@2.0.0

## 13.0.0

### Major Changes

- c18aabb97: Most of the following changes are breaking changes

  feat: move the package to pure ESM

  Read more on the subject: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

  feat: webpack, stylelint, storybook are now optional. The goal here is to target simple nodejs package.

  feat: add `talend-scripts lint` command which trigger eslint and stylelint.

  feat: `talend-scripts test` now detect if the project as angular. in this case it trigger karma instead of jest.

  feat: `talend-scripts build` now detect if the project is a library. in this case it trigger babel/typescripts.

  chore: **remove** `talend-scripts upgrade:deps`. Please use `talend-upgrade-deps` binary after having added it (`@talend/upgrade-deps`) to your dev dependencies.

  chore: **remove** `talend-scripts postinstall` subcommand.
  It has never been used as it breaks the reproductability of an install.

  chore: **remove** `talend-scripts publish:local` scripts. You can use the dedicated `talend-publish-local` bin by adding it (`@talend/scripts-publish-local`) to your dev dependencies.

  chore: **remove** preset. Config can already been overide.

  chore: **remove** `talend-scripts lint:es` use `lint` script instead.

  chore: **remove** `talend-scripts lint:style` use `lint` script instead.

  chore: **remove** `talend-scripts test:ng` use `test` script instead.

  chore: **remove** `talend-scripts build:lib` use `build` script instead.

  chore: **remove** `talend-scripts build:lib:umd` use `build --umd` script instead.

  To migrate your project please refer to the [migration-guide](./doc/migration-13-preset.md)

### Patch Changes

- Updated dependencies [c18aabb97]
- Updated dependencies [d73871906]
- Updated dependencies [c18aabb97]
- Updated dependencies [c18aabb97]
  - @talend/eslint-config@12.0.0
  - @talend/scripts-config-jest@12.0.0
  - @talend/scripts-config-babel@12.0.0

## 12.2.0

### Minor Changes

- 1cff07b01: feat: build:lib now accept --tsc option to use typescript to build it.

  build:lib detect if the project is a typescript project by looking at the package.json and look for "type" property.

  `build:ts:lib` is now deprecated.

## 12.1.0

### Minor Changes

- 280088381: add support for --watch option on build:lib and build:ts:lib command

## 12.0.0

### Major Changes

- 202b4daf2: Webpack major upgrade (4 to 5).

  ## Breaking changes

  @talend/bootstrap-theme is not imported anymore for you. You have to import it first in your project

  ```diff
  +import '@talend/bootstrap-theme';
  ```

  No more polyfills loaded for you. We have removed the folliwng packages:
  - `regenerator-runtime`
  - `core-js-bundle`

## 11.7.2

### Patch Changes

- 3f4ad5e30: fix: url of repository in package.json
- Updated dependencies [3f4ad5e30]
  - @talend/upgrade-deps@1.4.2

## 11.7.1

### Patch Changes

- dbb0947fa: fix: work in ci mode

## 11.7.0

### Minor Changes

- f7faaa059: Support CI on github action parameters

## 11.6.0

### Minor Changes

- f3c3b2b: feat(storybook): add build-storybook script

## 11.5.1

### Patch Changes

- 77af1fc: chore(dependencies): auto update for maintenance purpose

  ```diff
  -    "@talend/upgrade-deps": "^1.2.0"
  +    "@talend/upgrade-deps": "^1.3.0"
  -    "@babel/cli": "^7.14.8"
  +    "@babel/cli": "^7.16.8"
  -    "@babel/core": "^7.15.0"
  +    "@babel/core": "^7.16.12"
  -    "typescript": "^4.4.2"
  +    "typescript": "^4.5.5"
  -    "webpack-cli": "^4.8.0"
  +    "webpack-cli": "^4.9.2"
  -    "webpack-dev-server": "^4.2.0"
  +    "webpack-dev-server": "^4.7.3"
  ```

- Updated dependencies [77af1fc]
- Updated dependencies [9400673]
  - @talend/upgrade-deps@1.3.1

## 11.5.0

### Minor Changes

- 0942cb5: feat: add test of types definition in build-ts-lib

## 11.4.0

### Minor Changes

- 5c27d1f: feat(react-lib): start-storybook

## 11.3.2

### Patch Changes

- ac662c1: chore(core/build:ts:lib): ignore stories and spec ts files

## 11.3.1

### Patch Changes

- 4cfb73a: fix(core): build-ts-lib exit status 1 when there is an error

## 11.3.0

### Minor Changes

- d3a510c: feat(upgrade): deps security auto fix

### Patch Changes

- be6ff1d: fix(build:ts:lib): set proper tsc option to only generate d.ts
- Updated dependencies [d3a510c]
  - @talend/upgrade-deps@1.2.0

## 11.2.0

### Minor Changes

- f86ac70: Add publish:local script

## 11.1.0

### Minor Changes

- 475a04b: feat(upgrade): scope packages with startsWith filter

### Patch Changes

- Updated dependencies [475a04b]
- Updated dependencies [475a04b]
  - @talend/upgrade-deps@1.1.0

## 11.0.1

### Patch Changes

- 52527bd: fix(core): add webpack-dev-server dep

## 11.0.0

### Major Changes

- d4d2f2e: feat: upgrade webpack-cli and remove deasync

## 9.13.1

### Patch Changes

- a6201b3: Revert upgrade of webpack-cli and dev-server

## 9.13.0

### Minor Changes

- e4a6e7e: feat(typescript): compile typescript via babel

## 9.12.1

### Patch Changes

- 27e76fc: fix env arguments since we move to webpack-cli 4.x

## 9.12.0

### Minor Changes

- eee53ec: Use new talend-upgrade-deps script to manage dependencies

### Patch Changes

- 9ef83c5: Upgrade dependencies to be aligned with what is used in dev mode

## 9.11.0

### Minor Changes

- 93bd1a7: Move typescript dependency from typescript-config to script-core

## 9.10.0

### Minor Changes

- 0a5a90f: Add new `lint:style` command.
  Create new shared configuration `config-style` to share Stylelint configuration.
  Update `preset-react`, `preset-react-lib` and `preset-react-ng` to include the new Stylelint configuration.

## 9.9.1

### Patch Changes

- 83d1232: fix log of webpack.debug option

## 9.9.0

### Minor Changes

- cda7047: Add upgrade:deps command to talend-scripts.

## 9.7.0

### Minor Changes

- f59e70f: BundleAnalyzer plugin is activated in dev mode
