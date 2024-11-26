# @talend/react-forms

## 15.2.1

### Patch Changes

- 0efaf0b: fix(TMC-861): Enhance translation for some cancel actions on ListView and Enumeration

## 15.2.0

### Minor Changes

- 2a7fe08: chore: Remove ally.js

### Patch Changes

- Updated dependencies [a8a42b5]
- Updated dependencies [2a7fe08]
- Updated dependencies [d1f8b6b]
  - @talend/design-system@11.3.0
  - @talend/react-components@17.2.0

## 15.1.0

### Minor Changes

- 3894e01: feat: Better handle collapsible fieldset title for UIForm definitions by using schema title by default

## 15.0.2

### Patch Changes

- 194465c: Forms: array widget - use default value when add new item

## 15.0.1

### Patch Changes

- f321a0d: Remove unused tsconfig.esm.json (initially added to use TSC but we stay with babel at the end)
- Updated dependencies [f321a0d]
  - @talend/json-schema-form-core@1.4.1
  - @talend/design-system@11.0.4
  - @talend/design-tokens@3.4.1
  - @talend/assets-api@1.5.1
  - @talend/react-components@17.1.1
  - @talend/icons@7.10.2
  - @talend/utils@3.2.2

## 15.0.0

### Major Changes

- c3750a1: chore: upgrade dependencies

  Major upgrade for all packages that have a peerDependency on react or react-dom. Those packages now ask for react@18 and react-dom@18.

### Patch Changes

- Updated dependencies [c3750a1]
  - @talend/design-system@11.0.0
  - @talend/react-components@17.0.0
  - @talend/json-schema-form-core@1.4.0
  - @talend/design-tokens@3.4.0
  - @talend/assets-api@1.5.0
  - @talend/icons@7.10.0
  - @talend/utils@3.2.0

## 14.1.1

### Patch Changes

- a1684f0: fix exports config

## 14.1.0

### Minor Changes

- 3bd16fc: Add support to ESM

### Patch Changes

- Updated dependencies [ced37a2]
- Updated dependencies [3bd16fc]
- Updated dependencies [d053412]
- Updated dependencies [9b66a09]
  - @talend/react-components@16.2.0
  - @talend/json-schema-form-core@1.3.0
  - @talend/design-system@10.6.0
  - @talend/design-tokens@3.3.0
  - @talend/assets-api@1.4.0
  - @talend/icons@7.9.0
  - @talend/utils@3.1.0

## 14.0.8

### Patch Changes

- 5b7240e: UI Form fields with both hint and required asterisk are now displayed correctly
- Updated dependencies [5b7240e]
  - @talend/design-system@10.4.5

## 14.0.7

### Patch Changes

- b59f982: fix EnumerationForm doesn't use the newest value to validate value

## 14.0.6

### Patch Changes

- eb201ac: fix: check onFinish and onChange before invoking for the Text component
- Updated dependencies [290ee2e]
- Updated dependencies [b502805]
  - @talend/design-system@10.4.3
  - @talend/react-components@16.1.2

## 14.0.5

### Patch Changes

- 806ba5b: Fix: Enumeration item validate action not responsive
- Updated dependencies [91b0096]
  - @talend/design-tokens@3.2.1

## 14.0.4

### Patch Changes

- a10f800: Fix: remove tilde for @use in sass files
- f546896: Fix: improve call of use in sass files + fix ts lint
- Updated dependencies [a10f800]
- Updated dependencies [4713998]
- Updated dependencies [25fb283]
- Updated dependencies [e521344]
- Updated dependencies [ceb4faf]
- Updated dependencies [f546896]
  - @talend/design-system@10.4.2
  - @talend/react-components@16.1.1
  - @talend/icons@7.7.2
  - @talend/json-schema-form-core@1.2.6

## 14.0.3

### Patch Changes

- d332ab1: Fix imports and typing
- Updated dependencies [48865e5]
- Updated dependencies [da2218d]
- Updated dependencies [779fc8c]
  - @talend/design-tokens@3.2.0
  - @talend/design-system@10.4.0
  - @talend/json-schema-form-core@1.2.5

## 14.0.2

### Patch Changes

- 34a52b9: fix missing aria-describedby attribute

## 14.0.1

### Patch Changes

- 6a69c4c: Fix UI-Form display on TextModeArrayTemplate to have some spacing between templates
- Updated dependencies [8a25fb3]
- Updated dependencies [6a69c4c]
  - @talend/design-system@10.1.0
  - @talend/react-components@16.0.1

## 14.0.0

### Major Changes

- 0629df7: UI-FORM will now heavily use form components from the Design System

  - Parent element is wrapped with a DS Form
  - File / Checkboxes / Text / Number and Textare will now use DS components
  - All elements will now use DS Label in both text and normal display mode

  # BREAKING CHANGE

  - Many style overrides will break because of removed bootstrap classes like `form-group` `control-label` `form-actions` `tf-actions-wrapper` `tf-buttons` or `tf-uiform`
  - No more hearthbeat styling from bootstrap when form elements are in updating state
  - Removed many possibilities to pass down classNames because DS components won't allow it

## 13.2.3

### Patch Changes

- Updated dependencies [ce93823]
  - @talend/design-system@10.0.0
  - @talend/react-components@16.0.0

## 13.2.2

### Patch Changes

- 1abc22f: chore: upgrade dependencies
- Updated dependencies [1abc22f]
- Updated dependencies [5cedaf1]
  - @talend/design-system@9.8.1
  - @talend/design-tokens@3.1.1
  - @talend/assets-api@1.3.2
  - @talend/react-components@15.3.1
  - @talend/icons@7.7.1
  - @talend/utils@3.0.4
  - @talend/json-schema-form-core@1.2.3

## 13.2.1

### Patch Changes

- c0c434c: fix: loadash imports
- Updated dependencies [c1c9c5a]
- Updated dependencies [ca74483]
- Updated dependencies [c0c434c]
  - @talend/design-system@9.7.0
  - @talend/react-components@15.2.5
  - @talend/utils@3.0.2

## 13.2.0

### Minor Changes

- e38e9f3: fix(DFD-629): Add array item delete button tooltip

### Patch Changes

- Updated dependencies [5f9334f]
  - @talend/design-system@9.4.0

## 13.1.0

### Minor Changes

- 9568363: Use include instead of same-origin in the credentials option of fetch.

### Patch Changes

- Updated dependencies [9568363]
  - @talend/design-system@9.2.0
  - @talend/design-tokens@3.1.0
  - @talend/react-components@15.1.0
  - @talend/icons@7.7.0

## 13.0.1

### Patch Changes

- Updated dependencies [b1c72a1]
  - @talend/design-tokens@3.0.0
  - @talend/react-components@15.0.1
  - @talend/design-system@9.0.1

## 13.0.0

### Major Changes

- 18c1d97: `rem` values have been updated to correspond to the new `rem` base (16px) define by the design system

### Patch Changes

- Updated dependencies [18c1d97]
- Updated dependencies [18c1d97]
  - @talend/react-components@15.0.0
  - @talend/design-system@9.0.0

## 12.6.1

### Patch Changes

- 5269331: TDOPS-5854 - Fix MultiSelectTag widget to remove border from Typeahead component
- Updated dependencies [bfe3b20]
- Updated dependencies [941ff4f]
  - @talend/react-components@14.2.2

## 12.6.0

### Minor Changes

- 2065869: chore(DFD-491): Update ArrayItem styles

### Patch Changes

- f675918: fix(DFD-536): Fix click on collapsible toggle
- Updated dependencies [f0770b1]
  - @talend/design-system@8.11.1

## 12.5.2

### Patch Changes

- eeec10c: fix timezone names

## 12.5.1

### Patch Changes

- Updated dependencies [e095335]
- Updated dependencies [922e3eb]
  - @talend/react-components@14.0.0
  - @talend/utils@3.0.0
  - @talend/design-system@8.8.3

## 12.5.0

### Minor Changes

- b2d93a4: feat: add @qlik-light theme

### Patch Changes

- Updated dependencies [b2d93a4]
  - @talend/design-system@8.8.0
  - @talend/design-tokens@2.11.0
  - @talend/react-components@13.1.0

## 12.4.0

### Minor Changes

- 7de44f9: Remove dependency on react-bootstrap

### Patch Changes

- c9e740d: TDOPS-5706 - Fix form widget ArrayItem button design and alignment
- Updated dependencies [7de44f9]
  - @talend/react-components@13.0.0

## 12.3.1

### Patch Changes

- c468f2f: chore: upgrade dependencies
- 6c2df2b: Upgrade dependencies using talend-scripts upgrade:deps
- Updated dependencies [c468f2f]
- Updated dependencies [6c2df2b]
  - @talend/design-system@8.6.1
  - @talend/design-tokens@2.10.1
  - @talend/react-bootstrap@2.2.1
  - @talend/assets-api@1.3.1
  - @talend/react-components@12.3.1
  - @talend/icons@7.3.1
  - @talend/json-schema-form-core@1.2.1

## 12.3.0

### Minor Changes

- 24bcb177f: Remove usage of lib keyCode

### Patch Changes

- Updated dependencies [24bcb177f]
- Updated dependencies [bd152f9d4]
- Updated dependencies [a07c9cb0b]
- Updated dependencies [795a12e2d]
  - @talend/design-system@8.6.0
  - @talend/react-bootstrap@2.2.0
  - @talend/react-components@12.3.0

## 12.2.0

### Minor Changes

- ea026ec12: Use DS tabs in UIForm

### Patch Changes

- Updated dependencies [0e6c82e25]
- Updated dependencies [ea026ec12]
  - @talend/design-system@8.5.0

## 12.1.0

### Minor Changes

- b9cc5b097: Fix lint issues

### Patch Changes

- Updated dependencies [b9cc5b097]
- Updated dependencies [b9cc5b097]
- Updated dependencies [b9cc5b097]
- Updated dependencies [b9cc5b097]
- Updated dependencies [b9cc5b097]
- Updated dependencies [b9cc5b097]
  - @talend/utils@2.8.0
  - @talend/assets-api@1.3.0
  - @talend/design-tokens@2.10.0
  - @talend/design-system@8.2.0
  - @talend/icons@7.2.0
  - @talend/json-schema-form-core@1.2.0

## 12.0.0

### Major Changes

- 8ec56028a: deps: bump react-hook-form to 7.X

  So if you are using rhf in your project you should also bump it and apply the migration guide
  https://legacy.react-hook-form.com/migrate-v6-to-v7/

## 11.1.0

### Minor Changes

- 3f9c8a7bb: update babel config to use babel.config.js instead of .babelrc.json
  add missing deps

### Patch Changes

- 77826b091: TDOPS-5409 - fix Link render below Password/Text field
- Updated dependencies [c76a700a4]
- Updated dependencies [3f9c8a7bb]
- Updated dependencies [3f9c8a7bb]
- Updated dependencies [2177ddfb3]
- Updated dependencies [b8406b6e5]
- Updated dependencies [6b9f49e81]
- Updated dependencies [41bd1b586]
- Updated dependencies [3f9c8a7bb]
- Updated dependencies [3f9c8a7bb]
  - @talend/design-system@8.1.0
  - @talend/icons@7.1.0
  - @talend/react-components@12.1.0
  - @talend/react-bootstrap@2.1.0

## 11.0.0

### Major Changes

- 96d688489: React: Upgrade to react 18 and @types/react 18
- 4044f6198: ARCH-662 - Bump i18next from v20 to v23 and react-i18next from v11 to v13

### Patch Changes

- Updated dependencies [96d688489]
- Updated dependencies [9a0732ec5]
- Updated dependencies [9a0732ec5]
- Updated dependencies [da4cf2971]
- Updated dependencies [bacaa4b31]
- Updated dependencies [4044f6198]
- Updated dependencies [9a0732ec5]
  - @talend/design-system@8.0.0
  - @talend/react-bootstrap@2.0.0
  - @talend/react-components@12.0.0

## 10.2.4

### Patch Changes

- 3b058ef7d: chore: fix some lint errors
- Updated dependencies [3b058ef7d]
  - @talend/design-system@7.15.1

## 10.2.3

### Patch Changes

- ac48bdb6b: fix: pin react-ace
- Updated dependencies [f73fdbc46]
  - @talend/react-components@11.3.2

## 10.2.2

### Patch Changes

- 9fa1679ad: components/Code: add flag to show/hide instructions div
- 90dc6e87e: Fix undefined value on component Code when mounting
- Updated dependencies [8277e1f39]
  - @talend/react-components@11.3.1

## 10.2.1

### Patch Changes

- d465adb68: fix: ace code editor

  Issue1: 404 on react-ace min in dev mode.
  The copy of the assets during the build is not able to support different forlders and this is the case for react-ace.
  The getUMD point to the production version (becaue of babel) but we are in dev so this make a 404.
  Fix: point to prod for both versions

  Issue 2: function f is not defined (trace in ace-build).
  Fix: pin ace-builds in react-forms because there is a bug in the latest version

- Updated dependencies [a6ac16f28]
  - @talend/react-components@11.3.0

## 10.2.0

### Minor Changes

- 619d22798: Export component Code

### Patch Changes

- Updated dependencies [58f8ff666]
- Updated dependencies [a5348a439]
- Updated dependencies [82e08d6e5]
  - @talend/react-components@11.2.1

## 10.1.0

### Minor Changes

- f65073eb9: Update react-ace lib and improve its lazy loading.
  Fix auto-completion.
  Remove the need to add a copy configuration in application to work.

  New library no more use _brace_ but _ace-builds_ instead.

### Patch Changes

- Updated dependencies [c15088d3b]
  - @talend/react-components@11.1.0

## 10.0.0

### Major Changes

- bfc02c4fb: All colors are now based on design-tokens

### Patch Changes

- Updated dependencies [40e70c055]
- Updated dependencies [bfc02c4fb]
  - @talend/react-components@11.0.0

## 9.3.0

### Minor Changes

- 7a9a8db40: Forms - Allow to disable a single checkbox for checkbox widget list

## 9.2.3

### Patch Changes

- eefc711c0: fix: remove jest from runtime

## 9.2.2

### Patch Changes

- 3099c427a: chore: rewrite tests using react-testing-library
- c7f316d7c: - chore: remove enzyme devDependencies
  - chore: remove **mocks**/props-without-i18n.js
- Updated dependencies [a90c12b34]
- Updated dependencies [fcd8daf3c]
- Updated dependencies [c7f316d7c]
- Updated dependencies [b8c4161d2]
- Updated dependencies [c54e10157]
- Updated dependencies [3099c427a]
  - @talend/design-system@7.10.0
  - @talend/react-components@10.3.5

## 9.2.1

### Patch Changes

- b326091d2: Fix config of i18n in packages/storybook and upgrade versions of locales in others packages
- Updated dependencies [52d4f2df3]
- Updated dependencies [b326091d2]
- Updated dependencies [7a9f88147]
- Updated dependencies [85b04cc81]
- Updated dependencies [9719af7af]
  - @talend/react-components@10.3.3
  - @talend/design-system@7.9.0

## 9.2.0

### Minor Changes

- ae37dc329: feat: update peerDependencies to accept react-18

### Patch Changes

- 0103ec63f: fix(TDOPS-4264/NestedList): expand list based on the schema options
- Updated dependencies [ae37dc329]
  - @talend/react-components@10.3.0

## 9.1.0

### Minor Changes

- 321bd07d7: feat(TDOPS-4043/NestedList): expand the list if any item is checked

### Patch Changes

- Updated dependencies [cf697de02]
- Updated dependencies [be1095095]
- Updated dependencies [708589ad4]
  - @talend/design-system@7.7.2
  - @talend/react-components@10.2.3

## 9.0.4

### Patch Changes

- 616601fda: chore: clean unnecessary react imports after React v17

  removed by running script `npx react-codemod update-react-imports`

  see doc https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports

- Updated dependencies [e7d785a6a]
- Updated dependencies [7a097213f]
- Updated dependencies [616601fda]
- Updated dependencies [285efb74a]
- Updated dependencies [7a097213f]
  - @talend/react-components@10.2.2
  - @talend/design-system@7.7.1

## 9.0.3

### Patch Changes

- df24c6210: fix(TDOPS-3373/NestedListView): include searchCriteria in component update

## 9.0.2

### Patch Changes

- Updated dependencies [4dfe7b010]
- Updated dependencies [a01e81852]
  - @talend/react-components@10.0.0
  - @talend/design-system@7.7.0

## 9.0.1

### Patch Changes

- fd25b7d23: Forms - UI Form hint can now change position to fixed with a new **overlayIsFixed** parameter
- Updated dependencies [e79dfc100]
  - @talend/react-components@9.4.2

## 9.0.0

### Major Changes

- 5e4aad637: Forms - Change UI Form hint to use design system popover and **fix alignement**

  ## Breaking changes :

  UI Forms hint definition does not support some properties anymore

  - **id** has been removed, you should rely on **data-test** attributes to target elements
  - **className** has been removed because design system component should not be customized

  ```diff
  hint: {
      overlayComponent: ...,
  -   id: "id",
  -   className: "class",
  }
  ```

  ## New additions :

  UI Forms hint definition can now handle some **data-test** attributes

  - **data-test** has been added to target the hint popover content
  - **icon-data-test** has been added to target the hint icon

  ```diff
  hint: {
      overlayComponent: ...,
  +   "data-test": "my-popover-content",
  +   "icon-data-test": "my-popover-icon",
  }
  ```

### Patch Changes

- 99398080f: chore: apply code style

## 8.2.0

### Minor Changes

- c3923dc5c: feat(CDM-307): new code field skeleton and typescript migration

### Patch Changes

- Updated dependencies [bb92ff4bd]
- Updated dependencies [012d6fe31]
  - @talend/react-components@9.3.0

## 8.1.9

### Patch Changes

- f77b6a9b7: TDOPS-3372 - validate input value for integer fields
- Updated dependencies [a3ac5792b]
- Updated dependencies [f77b6a9b7]
  - @talend/react-components@9.2.0
  - @talend/json-schema-form-core@1.1.1

## 8.1.8

### Patch Changes

- f0a97113e: chore: remove uuid dependencies. use randomUUID from @talend/utils
- Updated dependencies [f0a97113e]
- Updated dependencies [f0a97113e]
  - @talend/react-components@9.0.1
  - @talend/utils@2.5.0

## 8.1.7

### Patch Changes

- Updated dependencies [9c44d724f]
- Updated dependencies [14b462534]
- Updated dependencies [1200c70f8]
  - @talend/react-components@9.0.0

## 8.1.6

### Patch Changes

- Updated dependencies [ef3977697]
- Updated dependencies [2be2c3f47]
- Updated dependencies [105990b24]
- Updated dependencies [c0ed60ee5]
  - @talend/react-components@8.0.0

## 8.1.5

### Patch Changes

- e2e3ec77b: fix: explicit import of sass-data
- Updated dependencies [e2e3ec77b]
- Updated dependencies [c1bb5178f]
  - @talend/react-components@7.11.0

## 8.1.4

### Patch Changes

- e2174b30b: fix: scss filename now follow css module filename pattern
- Updated dependencies [e2174b30b]
- Updated dependencies [6fd16be45]
  - @talend/react-components@7.10.3

## 8.1.3

### Patch Changes

- bd7b58230: chore(TDS-6666): disabled split

## 8.1.2

### Patch Changes

- 73c84e692: fix: move skipCommas options to schema object instead of component api

## 8.1.1

### Patch Changes

- f4ba0ef47: fix: move ds as peerDependencies
- Updated dependencies [f4ba0ef47]
- Updated dependencies [4248c2e69]
  - @talend/react-components@7.7.0

## 8.1.0

### Minor Changes

- c02aeb6ae: add the capability to skip commas with backslash char
- a99154a7d: generate minified css using dot min in the name of it

### Patch Changes

- 262e60063: fix: move exported values of UIForm into the class as static values
- Updated dependencies [617ec14f0]
- Updated dependencies [a99154a7d]
  - @talend/design-system@4.0.0
  - @talend/react-components@7.5.0

## 8.0.2

### Patch Changes

- a85993977: fix(UIForm): keep defaultProps created by withTranslation
- Updated dependencies [06bee44bf]
  - @talend/design-system@3.8.0

## 8.0.1

### Patch Changes

- a9d70b1a8: Revert change in .npmignore about build-utils.js
- c47d27218: deps(forms): add react-ace as dep
- Updated dependencies [2a8de8a55]
  - @talend/design-system@3.6.1

## 8.0.0

### Major Changes

- a64664410: Start typescript migration
  Breaking Change: Drop deprecated FORM_MOZ mode

### Patch Changes

- Updated dependencies [8f396f7d5]
- Updated dependencies [f8a5555eb]
  - @talend/react-components@7.3.0

## 7.3.3

### Patch Changes

- ac9286be3: fix: build ace (code widget) modes, theme and snippets.
  Add tools to configure the copy of modes in your apps.
- Updated dependencies [a2ebce94c]
  - @talend/react-bootstrap@1.35.1

## 7.3.2

### Patch Changes

- 1770e701b: fix: include peerDependencies in UMD manifest
- Updated dependencies [1770e701b]
  - @talend/react-components@7.0.1
  - @talend/design-system@3.0.1

## 7.3.1

### Patch Changes

- 1160ec1f6: InlineMessage component is now only coming from design system. No more classnames. No more Link as components.
  Breaking changes:
  - No more `as`, `className` nor `style` props
  - `link` prop now is an object (based on the `Link` component props)
- Updated dependencies [9a581a4bc]
- Updated dependencies [5a30f1f0e]
- Updated dependencies [c8fbf0130]
- Updated dependencies [051dfd9fb]
- Updated dependencies [1160ec1f6]
  - @talend/react-components@7.0.0
  - @talend/design-system@3.0.0

## 7.3.0

### Minor Changes

- 47b758112: feat(ARCH-482): use React 17 internally and extend react peer dep version

### Patch Changes

- Updated dependencies [6562e397f]
- Updated dependencies [47b758112]
  - @talend/react-components@6.49.0
  - @talend/react-bootstrap@1.35.0
  - @talend/assets-api@1.2.0
  - @talend/design-system@2.7.0
  - @talend/json-schema-form-core@1.1.0
  - @talend/utils@2.3.0

## 7.2.0

### Minor Changes

- 66fa02548: move from react-bootstrap to @talend/react-bootstrap

### Patch Changes

- Updated dependencies [7d1f9f509]
- Updated dependencies [66fa02548]
- Updated dependencies [66fa02548]
  - @talend/react-components@6.47.0
  - @talend/react-bootstrap@1.34.0

## 7.1.1

### Patch Changes

- 9222aa7fc: fix: use assets-api from CDN
- Updated dependencies [9222aa7fc]
- Updated dependencies [9222aa7fc]
  - @talend/design-system@2.5.1
  - @talend/assets-api@1.1.0

## 7.1.0

### Minor Changes

- d1815c0af: Use @talend/assets-api to load aceeditor

### Patch Changes

- Updated dependencies [8e95aab34]
- Updated dependencies [0d18d5d03]
- Updated dependencies [d1815c0af]
  - @talend/design-system@2.5.0

## 7.0.9

### Patch Changes

- 7373fd30a: chore(ARCH-482/MultiSelectTag): remove deprecated lifecycle and use RTL for test
- ce7950623: fix(Fieldset): nested conditional fieldset are broken
- Updated dependencies [9522692fa]
- Updated dependencies [59a16bfa7]
  - @talend/react-components@6.45.0
  - @talend/design-system@2.4.0

## 7.0.8

### Patch Changes

- 6037e575c: chore(ARCH-482/ListView): remove deprecated lifecycle and use RTL for test
- 4fa935c57: chore(ARCH-482/EnumerationWidget): remove deprecated lifecycle and use RTL for test
- Updated dependencies [80a15c11a]
  - @talend/react-components@6.44.14

## 7.0.7

### Patch Changes

- b91b4d39a: chore(ARCH-482/UIForm): remove deprecated lifecycle and use RTL for tests
- Updated dependencies [2b355ac2e]
- Updated dependencies [2e19164bf]
- Updated dependencies [5ff371756]
  - @talend/design-system@2.3.0
  - @talend/react-components@6.44.13

## 7.0.6

### Patch Changes

- 9f7d702ea: chore(ARCH-482/EnumerationWidget): remove deprecatetd lifecycle and use RTL for tests
- 543897cf7: chore(ARCH-482/MultiSelectTagWidget): remove deprecated lifecycle and use RTL for tests
- ad4acc570: chore(ARCH-482/DatalistWidget): remove deprecatetd lifecycle and use RTL for tests
- f3b15a44d: chore(ARCH-482/ListViewWidget): remove deprecated lifecycle and use RTL for tests

## 7.0.5

### Patch Changes

- Updated dependencies [7af0ef8f6]
  - @talend/design-system@2.0.0
  - @talend/react-components@6.44.5

## 7.0.4

### Patch Changes

- d839ab8ed: fix: MultiSelect in text mode

## 7.0.3

### Patch Changes

- 832d82673: upgrade build to expose stylePath from design-system
- Updated dependencies [832d82673]
  - @talend/react-components@6.44.3

## 7.0.2

### Patch Changes

- 275c25ee0: chore(dependencies): auto update for maintenance purpose

  ```diff
  -    "@talend/react-components": "^6.43.5"
  +    "@talend/react-components": "^6.44.0"
  -    "@talend/design-system": "^1.14.0"
  +    "@talend/design-system": "^1.15.0"
  ```

- Updated dependencies [275c25ee0]
- Updated dependencies [275c25ee0]
- Updated dependencies [3bf0f1f18]
  - @talend/react-components@6.44.1
  - @talend/utils@2.1.1
  - @talend/design-system@1.15.1

## 7.0.1

### Patch Changes

- 618951c8b: chore(deps): auto update for maintenance purpose
- Updated dependencies [618951c8b]
- Updated dependencies [b268c0c43]
  - @talend/react-components@6.43.5
  - @talend/design-system@1.14.0

## 7.0.0

### Major Changes

- 593026b37: Redux major upgrade with saga

## 6.43.2

### Patch Changes

- 86f208189: chore: upgrade dependencies and align @talend scoped packages to latest
- Updated dependencies [86f208189]
- Updated dependencies [8b6fc43c8]
- Updated dependencies [4a9c460c7]
  - @talend/react-components@6.43.3
  - @talend/design-system@1.12.1
  - @talend/json-schema-form-core@1.0.5

## 6.43.1

### Patch Changes

- 039b85775: chore: upgrade dependencies and align @talend scoped packages to latest
- Updated dependencies [039b85775]
  - @talend/react-components@6.41.3
  - @talend/json-schema-form-core@1.0.4
  - @talend/utils@2.0.1

## 6.43.0

### Minor Changes

- 4bbb2ec7f: feat(TFD-13512/datalist): add props initialCheckValue to make validation at mount

## 6.42.1

### Patch Changes

- 9c5aa41cd: Missing fieldset widgets

## 6.42.0

### Minor Changes

- 8c8d8e3eb: add link props for password field
  add index for dataTest prop

### Patch Changes

- f66be0a9f: Revert "feat(TFD-13512/datalist): add initial check of values"
- 86054f635: Don't render empty fieldsets
- Updated dependencies [8c8d8e3eb]
- Updated dependencies [8e71b59a4]
  - @talend/react-components@6.41.2

## 6.41.3

### Patch Changes

- d5f261f49: utils: remove default export, use named exports instead
  - WHAT the breaking change is
    Remove default export of @talend/utils package, use named exports instead
  - WHY the change was made
    The utils package used a default export. so we can't do a destruction import as readme described:
  ```
  import { validation } from '@talend/utils';
  ```
  - HOW a consumer should update their code
    Use destruction import like `import { validation, date } from '@talend/utils';` to replace default import.
- Updated dependencies [d5f261f49]
  - @talend/utils@2.0.0
  - @talend/react-components@6.41.1

## 6.41.2

### Patch Changes

- b4e7352b0: Update Datalist component
- Updated dependencies [324c07420]
- Updated dependencies [7b9a15097]
- Updated dependencies [bc3ff67f6]
  - @talend/react-components@6.41.0

## 6.41.1

### Patch Changes

- 0bd49abd2: Expose Textarea field like Input and Select fields
- Updated dependencies [9b9faebe8]
- Updated dependencies [715f615a8]
- Updated dependencies [5cb420c29]
  - @talend/react-components@6.40.1

## 6.41.0

### Minor Changes

- 7dde61e46: Add custom xpath props support for listView, MultiselectTag, Bage components

### Patch Changes

- 667cd0a50: chore: upgrade dependencies and align @talend scoped packages to latest
- 2d9e62a2a: fix import for password widget
- Updated dependencies [667cd0a50]
- Updated dependencies [7dde61e46]
  - @talend/react-components@6.40.0
  - @talend/json-schema-form-core@1.0.3
  - @talend/utils@1.4.5

## 6.40.0

### Minor Changes

- a048eaa78: add password widget from the design system

### Patch Changes

- Updated dependencies [cbb98bdc9]
  - @talend/react-components@6.39.6

## 6.39.3

### Patch Changes

- 603785022: chore(components+forms): Bump @talend/design-system
- Updated dependencies [603785022]
  - @talend/react-components@6.39.4

## 6.39.2

### Patch Changes

- f1f4ec5bc: fix(workspace-run): package run order
- Updated dependencies [f1f4ec5bc]
  - @talend/react-components@6.39.2
  - @talend/json-schema-form-core@1.0.2
  - @talend/utils@1.4.4

## 6.39.1

### Patch Changes

- 3e9121287: chore(build): order packages on pre-release hook
- Updated dependencies [3e9121287]
- Updated dependencies [80ca14323]
  - @talend/react-components@6.39.1
  - @talend/json-schema-form-core@1.0.1
  - @talend/utils@1.4.3

## 6.39.0

### Minor Changes

- 274771710: Forms style to be more readable

### Patch Changes

- Updated dependencies [f9c1acb3e]
- Updated dependencies [274771710]
  - @talend/react-components@6.39.0

## 6.38.1

### Patch Changes

- 0bd4c26f8: Fix pre-release script: remove display=none option
- Updated dependencies [0bd4c26f8]
  - @talend/react-components@6.38.1

## 6.38.0

### Minor Changes

- bc8951296: fix(forms/NestedListView): component should now detect props change

### Patch Changes

- Updated dependencies [d21c969fe]
- Updated dependencies [08fdc0b51]
- Updated dependencies [012dea47d]
  - @talend/react-components@6.38.0

## 6.37.0

### Minor Changes

- 477f2e3fc: FormSkeleton: Support skeleton without buttons (#3390)
- 477f2e3fc: Support custom root tag (#3392)

### Patch Changes

- fe4af8c5d: Use the new jsfc which embed tv4
- Updated dependencies [fe4af8c5d]
  - @talend/json-schema-form-core@1.0.0
