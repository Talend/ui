# @talend/scripts-core

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
