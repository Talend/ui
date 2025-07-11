# Changelog

## 21.1.0

### Minor Changes

- 00e4dde: Bump deps and set RHF to latest with caret

### Patch Changes

- Updated dependencies [00e4dde]
  - @talend/utils@3.3.0

## 21.0.2

### Patch Changes

- de6ae38: Bump dependencies
- Updated dependencies [de6ae38]
  - @talend/design-tokens@3.4.5
  - @talend/utils@3.2.5

## 21.0.1

### Patch Changes

- 4f5cc5c: Bump security CVE
- Updated dependencies [4f5cc5c]
  - @talend/design-tokens@3.4.4
  - @talend/utils@3.2.4

## 21.0.0

### Major Changes

- 78b4dbf: [BREAKING] Move the function createTqlQuery to a dedicated package (@talend/react-faceted-search-query-client).

  You will need to adapt your code to use this lib

  before

  ```
  import { createTqlQuery } from '@talend/react-faceted-search/lib/queryClient';
  import { queryClient } from '@talend/react-faceted-search';
  ```

  after

  ```
  import { createTqlQuery } from '@talend/react-faceted-search-query-client'
  import * as queryClient from '@talend/react-faceted-search-query-client'
  ```

## 20.0.2

### Patch Changes

- 46a18aa: feat: Add Typeahead props to QuickSearchInput

## 20.0.1

### Patch Changes

- f321a0d: Remove unused tsconfig.esm.json (initially added to use TSC but we stay with babel at the end)
- Updated dependencies [f321a0d]
  - @talend/design-tokens@3.4.1
  - @talend/utils@3.2.2

## 20.0.0

### Major Changes

- c3750a1: chore: upgrade dependencies

  Major upgrade for all packages that have a peerDependency on react or react-dom. Those packages now ask for react@18 and react-dom@18.

### Patch Changes

- Updated dependencies [c3750a1]
  - @talend/design-system@11.0.0
  - @talend/react-components@17.0.0
  - @talend/design-tokens@3.4.0
  - @talend/utils@3.2.0

## 19.1.1

### Patch Changes

- 76b5025: Fix export for /lib/\*

## 19.1.0

### Minor Changes

- 3bd16fc: Add support to ESM

### Patch Changes

- Updated dependencies [3bd16fc]
- Updated dependencies [d053412]
- Updated dependencies [9b66a09]
  - @talend/design-tokens@3.3.0
  - @talend/utils@3.1.0

## 19.0.1

### Patch Changes

- a10f800: Fix: remove tilde for @use in sass files
- f546896: Fix: improve call of use in sass files + fix ts lint

## 19.0.0

### Major Changes

- 27a4a5d: ### BREAKING CHANGE
  fix(TMC-26027/facetedSearch): multiple callbacks for BadgeCheckbox
  - getTags() was replaced with getOptions() to support multiple callbacks
  ***
  - Before:
  ```jsx
  <FacetedSearch.BasicSearch callbacks={{ getTags: () => {} }} />
  ```
  ***
  - After:
  ```jsx
  <FacetedSearch.BasicSearch
  	callbacks={{
  		tags: { getOptions: () => {} },
  		authors: { getOptions: () => {} },
  		operators: { getOptions: () => {} },
  	}}
  />
  ```
  ***

## 18.0.0

### Patch Changes

- Updated dependencies [ce93823]
  - @talend/design-system@10.0.0
  - @talend/react-components@16.0.0

## 17.2.1

### Patch Changes

- 1abc22f: chore: upgrade dependencies
- Updated dependencies [1abc22f]
  - @talend/design-tokens@3.1.1
  - @talend/utils@3.0.4

## 17.2.0

### Minor Changes

- 420118f: feat: use design system text input for the advanced search

### Patch Changes

- c0c434c: fix: loadash imports
- 5cd9cde: fix: make checkbox badge with values work again (without fetching the tags all the time)
- Updated dependencies [c0c434c]
  - @talend/utils@3.0.2

## 17.1.1

### Patch Changes

- 52563ff: fix(TDOPS-5510/inlineEdit): add data attributes from props
- Updated dependencies [52563ff]
  - @talend/utils@3.0.1

## 17.1.0

### Minor Changes

- 5770c9f: Support user provided range options
- 9568363: Use include instead of same-origin in the credentials option of fetch.

### Patch Changes

- Updated dependencies [9568363]
  - @talend/design-tokens@3.1.0

## 17.0.1

### Patch Changes

- Updated dependencies [b1c72a1]
  - @talend/design-tokens@3.0.0

## 17.0.0

### Major Changes

- 18c1d97: `rem` values have been updated to correspond to the new `rem` base (16px) define by the design system

### Patch Changes

- Updated dependencies [18c1d97]
- Updated dependencies [18c1d97]
  - @talend/react-components@15.0.0
  - @talend/design-system@9.0.0

## 16.1.2

### Patch Changes

- e2a866d: Fix faceted search tooltip and replace it with a title to avoid wrong popover placement

## 16.1.1

### Patch Changes

- 7a0b233: Fix tooltip for faceted search badge to not throw an error

## 16.1.0

### Minor Changes

- 941ff4f: feat: add BadgePeriod in faceted search

## 16.0.0

### Major Changes

- 7cc4321: TDOPS-5724 - Restyle faceted search to remove bootstrap and use more Design System elements

  # BREAKING CHANGE
  - Lot of styling and classes has changed so your overrides might not work anymore
  - DOM has changed too so your tests might need to be upgraded
  - `tags` type for badges does not exists enymore, use `checkbox` instead as it is the same kind of component but with more possibilities

## 15.0.1

### Patch Changes

- ab1ae8a: TDOPS-5873 - Faceted search container no longer takes more then 100% width

## 15.0.0

### Major Changes

- 922e3eb: deps: bump date-fns to 3.X

### Patch Changes

- Updated dependencies [e095335]
- Updated dependencies [922e3eb]
  - @talend/react-components@14.0.0
  - @talend/utils@3.0.0

## 14.1.0

### Minor Changes

- b2d93a4: feat: add @qlik-light theme

### Patch Changes

- Updated dependencies [b2d93a4]
  - @talend/design-tokens@2.11.0

## 14.0.0

### Patch Changes

- Updated dependencies [7de44f9]
  - @talend/react-components@13.0.0

## 13.0.0

### Major Changes

- a7b06bc: Remove @talend/react-bootstrap from Faceted Search package to use DS Popover with controlled state

### Minor Changes

- 424544a: chore: upgrade date-fns to 2.x and fix

### Patch Changes

- Updated dependencies [1bc49cd]
- Updated dependencies [424544a]
  - @talend/utils@2.9.0

## 12.3.0

### Minor Changes

- fc7d4e2: feat(TDOPS-4789/facetedSearch): callback support for BadgeMenu

### Patch Changes

- 38dad22: Fix translation of BadgeCheckboxesForm

## 12.2.1

### Patch Changes

- c468f2f: chore: upgrade dependencies
- 6c2df2b: Upgrade dependencies using talend-scripts upgrade:deps
- Updated dependencies [c468f2f]
- Updated dependencies [6c2df2b]
  - @talend/design-tokens@2.10.1
  - @talend/react-bootstrap@2.2.1
  - @talend/bootstrap-theme@8.3.1

## 12.2.0

### Minor Changes

- 24bcb177f: Remove usage of lib keyCode

### Patch Changes

- fbbe53b60: Move bootstrap-theme as dependency instead of devDependency
- Updated dependencies [24bcb177f]
  - @talend/react-bootstrap@2.2.0

## 12.1.0

### Minor Changes

- 3f9c8a7bb: update babel config to use babel.config.js instead of .babelrc.json
  add missing deps

### Patch Changes

- Updated dependencies [3f9c8a7bb]
  - @talend/react-bootstrap@2.1.0

## 12.0.0

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

## 11.3.0

### Minor Changes

- 8361389eb: "Show selected" toggle on BadgeMenu

## 11.2.0

### Minor Changes

- 08b8257ed: chore(TDP-12538): always show tooltip on faceted badge overlay

## 11.1.0

### Minor Changes

- 076d96234: Add BadgeMenu to faceted search for single selection

## 11.0.2

### Patch Changes

- Updated dependencies [3cfe50989]
  - @talend/design-tokens@2.9.0

## 11.0.1

### Patch Changes

- Updated dependencies [b36165add]
  - @talend/design-tokens@2.8.0

## 11.0.0

### Major Changes

- bfc02c4fb: feat: use design-tokens for colors

### Patch Changes

- Updated dependencies [40e70c055]
- Updated dependencies [bfc02c4fb]
  - @talend/react-components@11.0.0

## 10.0.1

### Patch Changes

- a17306fc9: TDOPS-4795 - [TUI] Faceted search display wrong plural label

## 10.0.0

### Major Changes

- aab0eeb36: TDOPS-4704 - Faceted search : Allow to configure faceted search min/max input length for text badge

  # BREAKING CHANGE

  Faceted search : `quickSearchMinLength` configuration for quick search input is no more used and now detected from badge configuration

## 9.4.0

### Minor Changes

- 93def65ae: TDOPS-4704 - Faceted search : Allow to configure faceted search min trigger length for quick search input

### Patch Changes

- bb0cd786e: fix(TDC-6575): badge size overlap with "Add Filter" button with some long values
- 04167fe3d: fix(faceted-search): data-feature typo

## 9.3.0

### Minor Changes

- d579821da: feat: added custom attributes to the faceted basic search

### Patch Changes

- 9ea9961bd: test: rewrite using react testing library

## 9.2.1

### Patch Changes

- b326091d2: Fix config of i18n in packages/storybook and upgrade versions of locales in others packages

## 9.2.0

### Minor Changes

- ae37dc329: feat: update peerDependencies to accept react-18

## 9.1.1

### Patch Changes

- 616601fda: chore: clean unnecessary react imports after React v17

  removed by running script `npx react-codemod update-react-imports`

  see doc https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports

## 9.1.0

### Minor Changes

- b7f25227c: TDOPS-421 - Allow data attributes to be passed to faceted search components

## 9.0.0

### Patch Changes

- Updated dependencies [4dfe7b010]
  - @talend/react-components@10.0.0

## 8.1.1

### Patch Changes

- 12d329322: TDOPS-421 - Fix faceted search submit at launch and badge sync on value and operator

## 8.1.0

### Minor Changes

- 705ff3066: Faceted search - Tags faceted should allow a list of flat tags or objects
- 06e45a74c: Faceted search
  - Add new `Not in` and `Not contains` operators
  - On badge checkbox faceted, added an optional checkbox to select all items with the `metadata.allSelector` property

## 8.0.4

### Patch Changes

- e79dfc100: update default values of locales

## 8.0.3

### Patch Changes

- f0a97113e: chore: remove uuid dependencies. use randomUUID from @talend/utils
- Updated dependencies [f0a97113e]
  - @talend/utils@2.5.0

## 8.0.2

### Patch Changes

- e2e3ec77b: fix: explicit import of sass-data

## 8.0.1

### Patch Changes

- e2174b30b: fix: scss filename now follow css module filename pattern

## 8.0.0

### Major Changes

- d134a19e8: fix(faceted-search): handle Design-System breaking changes

## 7.0.2

### Patch Changes

- 47dec5cb4: fix(TDC-6514): Faceted Search - locators

## 7.0.1

### Patch Changes

- 907ec1f86: fix(faceted-search): infinite loop with initial badges

## 7.0.0

### Major Changes

- e5aa63ef6: Refactor with design system components and design tokens

  Breaking: removed `FacetedSearchIcon` component

## 6.0.1

### Patch Changes

- f4ba0ef47: fix: move ds as peerDependencies

## 6.0.0

### Minor Changes

- a99154a7d: generate minified css using dot min in the name of it

### Patch Changes

- Updated dependencies [617ec14f0]
- Updated dependencies [a99154a7d]
  - @talend/design-system@4.0.0

## 5.0.2

### Patch Changes

- d3dc12c14: fix: use caret syntax for react-bootstrap
- Updated dependencies [a2ebce94c]
  - @talend/react-bootstrap@1.35.1

## 5.0.1

### Patch Changes

- 1770e701b: fix: include peerDependencies in UMD manifest

## 5.0.0

### Patch Changes

- Updated dependencies [5a30f1f0e]
- Updated dependencies [051dfd9fb]
- Updated dependencies [1160ec1f6]
  - @talend/design-system@3.0.0

## 4.3.0

### Minor Changes

- 092f11bcd: feat(FacetedSearch): enable checkbox badge filter placeholder customization

## 4.2.0

### Minor Changes

- 47b758112: feat(ARCH-482): use React 17 internally and extend react peer dep version

### Patch Changes

- Updated dependencies [47b758112]
  - @talend/react-bootstrap@1.35.0

## 4.1.0

### Minor Changes

- 66fa02548: move from react-bootstrap to @talend/react-bootstrap

### Patch Changes

- Updated dependencies [66fa02548]
  - @talend/react-bootstrap@1.34.0

## 4.0.2

### Patch Changes

- 4f9c8ec71: Quick search does not select correct facet when using filter

## 4.0.1

### Patch Changes

- 97e37ee66: fix: query toggle placement

## 4.0.0

### Major Changes

- 1c20a3b6b: feat(faceted-search): replace faceted mode toggle by design system switch component

  breaking change: "@talend/design-system": "^2.1.0" added as peer dep

## 3.7.0

### Minor Changes

- c26d711da: feat(faceted-search): Add quick search facets filter

## 3.6.0

### Minor Changes

- ffda839d2: feat(faceted-search): make text badge placeholder configurable

## 3.5.6

### Patch Changes

- 72a99ac3d: fix(faceted-search): input width in badge with slider popin

## 3.5.5

### Patch Changes

- 86f208189: chore: upgrade dependencies and align @talend scoped packages to latest

## 3.5.4

### Patch Changes

- 039b85775: chore: upgrade dependencies and align @talend scoped packages to latest

## 3.5.3

### Patch Changes

- 0718efb26: fix a bug where initialbadges update affect the current filter

## 3.5.2

### Patch Changes

- 740645821: Republish patch versions due to npm publish issue

## 3.5.1

### Patch Changes

- 2dc59cd6d: fix code style which may have an impact (hook dependencies and orders in css)

## [3.5.0]

### Fixed

- Fix translation key

### Added

- Expose BadgeFaceted to create custom badge outside the library

## [3.4.1]

### Security

- Upgrade dependencies

## [3.4.0]

### Added

- Add initial badges support

## [3.3.3]

### Fixed

- Fix Expose BadgeCheckboxesForm

## [3.3.2]

### Fixed

- Expose BadgeCheckboxesForm

## [3.3.1]

### Fixed

- Expose all badges components

## [3.3.0]

### Added

- Ability to customize Badge Checkboxes Form placeholder

## [3.2.0]

### Added

- Ability to customize the quicksearch placeholder

## [3.1.0]

### Added

- Use new typeahead design

## [3.0.0]

### Breaking Change

- ⤴️ @talend/tui: ^6.4.0 => ^6.5.1

### Added

- [Add date picker badge](https://github.com/Talend/ui-faceted-search/pull/20)

## [2.0.1]

### Fixed

- [Multi values separator contrast & alignment issues](https://github.com/Talend/ui-faceted-search/pull/19)

## [2.0.0]

### Breaking Change

- ⤴️ @talend/tui: ^5.27.1 => ^6.4.0

### Added

- [Added](https://github.com/Talend/ui-faceted-search/pull/18): Show blank characters on colored badges

## [1.2.0]

### Added

- [Added](https://github.com/Talend/ui-faceted-search/pull/17): Support custom/no sort of badge definitions

### Fixed

- [Styling issue on badges with multiple lengthy values](https://github.com/Talend/ui-faceted-search/pull/15)

## [1.1.0]

### Changed

- [Add input text for the quick faceted search](https://github.com/Talend/ui-faceted-search/pull/12)

### Added

- [allow to hide badges in the list](https://github.com/Talend/ui-faceted-search/pull/11)

## [1.0.2]

### Fixed

- [Circular dependency on Tag Facet](https://github.com/Talend/ui-faceted-search/pull/13)

## [1.0.1]

### Fixed

- [Rich Layout import for tag facet](https://github.com/Talend/ui-faceted-search/pull/10)

## [1.0.0]

### Breaking Change

- ⤴️ @talend/tui: ^5.25.0 => ^5.27.1

### Changed

- [Adapt for UMD compliance](https://github.com/Talend/ui/pull/2994)

## [0.14.0]

### Added

- [Read only support](https://github.com/Talend/ui/pull/2994)
- [Handle badges without labels](https://github.com/Talend/ui/pull/2997)
- [Added complies/wordComplies pattern operators support](https://github.com/Talend/ui/pull/3000)
- [Added colored badge support](https://github.com/Talend/ui/pull/3013)
- [Hide "add filter" and "remove all" buttons when not relevant](https://github.com/Talend/ui-faceted-search/pull/4)

### Fixed

- [External changes to `badgesFaceted` state are ignored](https://github.com/Talend/ui-faceted-search/pull/5)

## [0.13.0]

### Added

- [Pointer cursor on the slider facet value](https://github.com/Talend/ui/pull/2932)

### Fixed

- [Don't reopen the value tooltip for badges with default operators](https://github.com/Talend/ui/pull/2972)

## [0.12.1]

### Fixed

- [Fallback to default for slider facet](https://github.com/Talend/ui/pull/2919)

## [0.12.0]

### Added

- [Embed error messages in slider facet](https://github.com/Talend/ui/pull/2916)

## [0.11.0]

### Added

- [Badge slider](https://github.com/Talend/ui/pull/2897)

## [0.10.3]

### Changed

- [Use @talend/scripts](https://github.com/Talend/ui/pull/2778)

### Fixed

- [IE11: hide scrollbar for BasicSearch](https://github.com/Talend/ui/pull/2881)
- [Hide delete icon if no filters](https://github.com/Talend/ui/pull/2862)

## [0.10.2]

### Fixed

- [Check badge existence before trying to set it](https://github.com/Talend/ui/pull/2847)

## [0.10.1]

### Fixed

- [Avoid error when there is no callbacks props](https://github.com/Talend/ui/pull/2842)

## [0.10.0]

### Added

- [Add badge tags support](https://github.com/Talend/ui/pull/2828)

## [0.9.1]

### Fixed

- [IE11 : Center icons faceted](https://github.com/Talend/ui/pull/2818)

## [0.9.0]

### Added

- [Add a clear button to remove all badges in basic search](https://github.com/Talend/ui/pull/2793)

### Fixed

- [Fix some user tracking tag](https://github.com/Talend/ui/pull/2801)

## [0.8.0]

### Breaking change

Rename two data-feature attributes for harmonization:

- `faceted-advanced-search.cancel` become `filter.advanced.clear`
- `faceted-advanced-search.submit` become `filter.advanced.apply`

### Added

- [Add some data-feature attributes for Pendo tracking / E2E tests](https://github.com/Talend/ui/pull/2759)

## [0.7.0]

### Added

- [Expose an helper to remove `contains` operator if `containsIgnoreCase` is here](https://github.com/Talend/ui/pull/2734)

## [0.6.0]

### Added

- [Implement containsIgnoreCase operator](https://github.com/Talend/ui/pull/2732)

## [0.5.2]

### Fixed

- [Ignore unknown badges types](https://github.com/Talend/ui/pull/2725)

## [0.5.1]

### Fixed

- [Set initialOperatorOpened to false on hiding the value overlay](https://github.com/Talend/ui/pull/2709)

## [0.5.0]

### Added

- [Handle the badgePerFacet metadata](https://github.com/Talend/ui/pull/2692)

### Fixed

- [Do not display empty label badge](https://github.com/Talend/ui/pull/2696)

## [0.4.0]

### Breaking change

- ⤴️ @talend/ui: >= 4.32.0

### Added

- [Empty screen text for search on badges list](https://github.com/Talend/ui/pull/2675)

### Changed

- [Handle categories in badge definitions](https://github.com/Talend/ui/pull/2673)

### Fixed

- [Sort alphabetically facets](https://github.com/Talend/ui/pull/2665)
- [Values open up at start](https://github.com/Talend/ui/pull/2662)
- [Put a scrollbar for enum badge with a lot of values](https://github.com/Talend/ui/pull/2666)
- [Do not alter the filter input in checkboxes badge](https://github.com/Talend/ui/pull/2676)

## [0.3.0]

### Breaking change

- ⤴️ @talend/ui: >= 4.27.0

### Added

- [Select automatically operator if only one](https://github.com/Talend/ui/pull/2640/)
- [Use Input text for Badge text instead of Textarea](https://github.com/Talend/ui/pull/2636)
- [Use toggle for basic/advance button](https://github.com/Talend/ui/pull/2638)

### Changed

- [Update some operators labels](https://github.com/Talend/ui/pull/2639)

### Fixed

- [Unknown operators facet return by the api throw javascript error](https://github.com/Talend/ui/pull/2641)
- [Remove "Selected values only" for checkbox facet](https://github.com/Talend/ui/pull/2631)

## [0.2.6]

### Fixed

- [Fix overflow x and y in AddFacetPopover](https://github.com/Talend/ui/pull/2617)

## [0.2.5]

### Added

- [Add label in add facet button](https://github.com/Talend/ui/pull/2590/)
- [Change equal key operator to equals](https://github.com/Talend/ui/pull/2599)

### Changed

- [Remove Header in AddFacetPopover](https://github.com/Talend/ui/pull/2591)

### Fixed

- [Change some field, snake case to camel case](https://github.com/Talend/ui/pull/2600)

## [0.2.4]

### Added

- [Add skeleton to FacetedSearchIcon if loading props true](https://github.com/Talend/ui/pull/2587)

### Fixed

- [Fix TQL creation with badges number](https://github.com/Talend/ui/pull/2554)

## [0.2.3]

### Breaking changes

- As we change the equal operator name, you need to rename it's usage in your app from `=` to `equal`.

### Added

- [Add number type badge](https://github.com/Talend/ui/pull/2548)

### Changed

- [Update remove / add tooltip labels](https://github.com/Talend/ui/pull/2530)

### Fixed

- [Fix support of notEqual operator](https://github.com/Talend/ui/pull/2545)
- [Get back Tooltip trigger for button icon in BadgeOverlay](https://github.com/Talend/ui/pull/2544)
- [Fix onSubmit execution on BasicSearch](https://github.com/Talend/ui/pull/2535)

## [0.2.2]

### Fixed

- [Tql error on empty value array](https://github.com/Talend/ui/pull/2520)
- [Invert action basic <> advanced](https://github.com/Talend/ui/pull/2513)
- [Disable resize on textarea](https://github.com/Talend/ui/pull/2510)
- [Filter badge by label, not attribute](https://github.com/Talend/ui/pull/2509)
- [Tql error on checkboxes badge](https://github.com/Talend/ui/pull/2501)

## [0.2.1]

### Added

- [Add connection type badge](https://github.com/Talend/ui/pull/2487)

## [0.2.0]

### Added

- [Faceted search to ui](https://github.com/Talend/ui/pull/2441)
