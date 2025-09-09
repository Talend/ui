# Changelog

## 7.2.0

### Minor Changes

- 3a513cb: Update deps

### Patch Changes

- Updated dependencies [3a513cb]
  - @talend/react-components@17.5.0

## 7.1.1

### Patch Changes

- e469bcf: fix: drop cypress dev deps
- Updated dependencies [2307a5f]
  - @talend/react-components@17.4.1

## 7.1.0

### Minor Changes

- 00e4dde: Bump deps and set RHF to latest with caret

### Patch Changes

- Updated dependencies [00e4dde]
  - @talend/react-components@17.4.0

## 7.0.4

### Patch Changes

- de6ae38: Bump dependencies
- Updated dependencies [de6ae38]
  - @talend/design-tokens@3.4.5
  - @talend/assets-api@1.5.3
  - @talend/react-components@17.3.9

## 7.0.3

### Patch Changes

- ae979f0: Bump dependencies
- Updated dependencies [ae979f0]
  - @talend/react-components@17.3.8

## 7.0.2

### Patch Changes

- 4f5cc5c: Bump security CVE
- Updated dependencies [4f5cc5c]
  - @talend/assets-api@1.5.2
  - @talend/react-components@17.3.6
  - @talend/design-tokens@3.4.4

## 7.0.1

### Patch Changes

- f321a0d: Remove unused tsconfig.esm.json (initially added to use TSC but we stay with babel at the end)
- Updated dependencies [f321a0d]
  - @talend/design-tokens@3.4.1
  - @talend/assets-api@1.5.1
  - @talend/react-components@17.1.1

## 7.0.0

### Major Changes

- c3750a1: chore: upgrade dependencies

  Major upgrade for all packages that have a peerDependency on react or react-dom. Those packages now ask for react@18 and react-dom@18.

### Patch Changes

- Updated dependencies [c3750a1]
  - @talend/react-components@17.0.0
  - @talend/design-tokens@3.4.0
  - @talend/assets-api@1.5.0

## 6.2.0

### Minor Changes

- 3bd16fc: Add support to ESM

### Patch Changes

- Updated dependencies [ced37a2]
- Updated dependencies [3bd16fc]
- Updated dependencies [d053412]
- Updated dependencies [9b66a09]
  - @talend/react-components@16.2.0
  - @talend/design-tokens@3.3.0
  - @talend/assets-api@1.4.0

## 6.1.5

### Patch Changes

- 0f408a7: Fix(Dataviz): Range filter - date time inputs overlap

## 6.1.4

### Patch Changes

- a10f800: Fix: remove tilde for @use in sass files
- f546896: Fix: improve call of use in sass files + fix ts lint
- Updated dependencies [a10f800]
- Updated dependencies [ceb4faf]
- Updated dependencies [f546896]
  - @talend/react-components@16.1.1

## 6.1.3

### Patch Changes

- @talend/react-components@16.0.0

## 6.1.2

### Patch Changes

- 1abc22f: chore: upgrade dependencies
- Updated dependencies [1abc22f]
- Updated dependencies [5cedaf1]
  - @talend/design-tokens@3.1.1
  - @talend/assets-api@1.3.2
  - @talend/react-components@15.3.1

## 6.1.1

### Patch Changes

- 988a443: fix(TPD-12820): fix GeoCharts colors

## 6.1.0

### Minor Changes

- 9568363: Use include instead of same-origin in the credentials option of fetch.

### Patch Changes

- Updated dependencies [9568363]
  - @talend/design-tokens@3.1.0
  - @talend/react-components@15.1.0

## 6.0.1

### Patch Changes

- Updated dependencies [b1c72a1]
  - @talend/design-tokens@3.0.0
  - @talend/react-components@15.0.1

## 6.0.0

### Major Changes

- 18c1d97: `rem` values have been updated to correspond to the new `rem` base (16px) define by the design system

### Patch Changes

- Updated dependencies [18c1d97]
  - @talend/react-components@15.0.0

## 5.1.0

### Minor Changes

- 7d73eb9: TDOPS-5724 - Remove bootstrap theme styling and dependency from packages

## 5.0.0

### Major Changes

- 922e3eb: deps: bump date-fns to 3.X

### Patch Changes

- Updated dependencies [e095335]
- Updated dependencies [922e3eb]
  - @talend/react-components@14.0.0

## 4.2.2

### Patch Changes

- Updated dependencies [7de44f9]
  - @talend/react-components@13.0.0

## 4.2.1

### Patch Changes

- c468f2f: chore: upgrade dependencies
- 6c2df2b: Upgrade dependencies using talend-scripts upgrade:deps
- Updated dependencies [c468f2f]
- Updated dependencies [6c2df2b]
  - @talend/design-tokens@2.10.1
  - @talend/assets-api@1.3.1
  - @talend/react-components@12.3.1

## 4.2.0

### Minor Changes

- b9cc5b097: Add missing deps

### Patch Changes

- Updated dependencies [b9cc5b097]
- Updated dependencies [b9cc5b097]
  - @talend/assets-api@1.3.0
  - @talend/design-tokens@2.10.0

## 4.1.0

### Minor Changes

- 3f9c8a7bb: update babel config to use babel.config.js instead of .babelrc.json
  add missing deps
  remove useless config of jest (use the common)
  fix config issue in tsconfig.json

### Patch Changes

- Updated dependencies [2177ddfb3]
- Updated dependencies [3f9c8a7bb]
  - @talend/react-components@12.1.0

## 4.0.0

### Major Changes

- 96d688489: React: Upgrade to react 18 and @types/react 18
- 4044f6198: ARCH-662 - Bump i18next from v20 to v23 and react-i18next from v11 to v13

### Patch Changes

- Updated dependencies [96d688489]
- Updated dependencies [9a0732ec5]
- Updated dependencies [da4cf2971]
- Updated dependencies [4044f6198]
  - @talend/react-components@12.0.0

## 3.0.1

### Patch Changes

- eeac0f188: fix: bundle typing in the package that produce the following error:

      Could not find a declaration file for module '@talend/react-dataviz' since the 3.0

## 3.0.0

### Major Changes

- bfc02c4fb: feat: colors now use design-tokens

### Patch Changes

- Updated dependencies [40e70c055]
- Updated dependencies [bfc02c4fb]
  - @talend/react-components@11.0.0

## 2.9.1

### Patch Changes

- b326091d2: Fix config of i18n in packages/storybook and upgrade versions of locales in others packages
- Updated dependencies [52d4f2df3]
- Updated dependencies [b326091d2]
- Updated dependencies [85b04cc81]
- Updated dependencies [9719af7af]
  - @talend/react-components@10.3.3

## 2.9.0

### Minor Changes

- ae37dc329: feat: update peerDependencies to accept react-18

### Patch Changes

- 7ef33c80b: chore: add ChartEntry to dataviz exported types
- Updated dependencies [ae37dc329]
  - @talend/react-components@10.3.0

## 2.8.8

### Patch Changes

- cf697de02: chore: clean React imports to only used properties
- Updated dependencies [cf697de02]
- Updated dependencies [708589ad4]
  - @talend/react-components@10.2.3

## 2.8.7

### Patch Changes

- 616601fda: chore: clean unnecessary react imports after React v17

  removed by running script `npx react-codemod update-react-imports`

  see doc https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports

- Updated dependencies [e7d785a6a]
- Updated dependencies [7a097213f]
- Updated dependencies [616601fda]
- Updated dependencies [7a097213f]
  - @talend/react-components@10.2.2
  - @talend/design-tokens@2.7.3

## 2.8.6

### Patch Changes

- Updated dependencies [4dfe7b010]
  - @talend/react-components@10.0.0

## 2.8.5

### Patch Changes

- 99398080f: chore: apply code style
- Updated dependencies [99398080f]
  - @talend/design-tokens@2.7.2

## 2.8.4

### Patch Changes

- Updated dependencies [9c44d724f]
- Updated dependencies [14b462534]
- Updated dependencies [1200c70f8]
  - @talend/react-components@9.0.0

## 2.8.3

### Patch Changes

- 2be2c3f47: fix: do not pass t props to FormatValue
- Updated dependencies [ef3977697]
- Updated dependencies [2be2c3f47]
- Updated dependencies [105990b24]
- Updated dependencies [c0ed60ee5]
  - @talend/react-components@8.0.0

## 2.8.2

### Patch Changes

- 5e3712511: fix(dataviz): Yaxis legend on some edge cases

## 2.8.1

### Patch Changes

- cae4e6f34: fix(dataviz): render dot in LineChart when there is only one value

## 2.8.0

### Minor Changes

- b6f109501: feat(dataviz): handle line selection use case
- b6f109501: feat(dataviz): highlight line legend on hover

## 2.7.3

### Patch Changes

- e2e3ec77b: fix: explicit import of sass-data
- Updated dependencies [e2e3ec77b]
- Updated dependencies [c1bb5178f]
  - @talend/react-components@7.11.0

## 2.7.2

### Patch Changes

- e2174b30b: fix: scss filename now follow css module filename pattern
- Updated dependencies [e2174b30b]
- Updated dependencies [6fd16be45]
  - @talend/react-components@7.10.3

## 2.7.1

### Patch Changes

- 94a6bf759: Range filter marks are overflowing

## 2.7.0

### Minor Changes

- 6e850c486: feat(dataviz): allow to build custom legend for linechart

## 2.6.0

### Minor Changes

- 644bc1718: feat(dataviz): alter lines in line chart

## 2.5.0

### Minor Changes

- b02eb9ef4: feat: upgrade d3 to 7

### Patch Changes

- Updated dependencies [b02eb9ef4]
- Updated dependencies [5e0148797]
  - @talend/react-components@7.8.0

## 2.4.0

### Minor Changes

- a99154a7d: generate minified css using dot min in the name of it

### Patch Changes

- Updated dependencies [a99154a7d]
  - @talend/react-components@7.5.0
  - @talend/design-tokens@2.7.0

## 2.3.0

### Minor Changes

- 434d17039: feat(TDC-6345): add LineChart customization (tick padding, xAxis domain and single point)

## 2.2.2

### Patch Changes

- 1770e701b: fix: include peerDependencies in UMD manifest
- Updated dependencies [1770e701b]
  - @talend/react-components@7.0.1

## 2.2.1

### Patch Changes

- Updated dependencies [9a581a4bc]
- Updated dependencies [c8fbf0130]
- Updated dependencies [1160ec1f6]
  - @talend/react-components@7.0.0

## 2.2.0

### Minor Changes

- 47b758112: feat(ARCH-482): use React 17 internally and extend react peer dep version

### Patch Changes

- Updated dependencies [6562e397f]
- Updated dependencies [47b758112]
  - @talend/react-components@6.49.0
  - @talend/assets-api@1.2.0
  - @talend/design-tokens@2.4.0

## 2.1.2

### Patch Changes

- 9222aa7fc: fix: use assets-api from CDN
- Updated dependencies [9222aa7fc]
  - @talend/assets-api@1.1.0

## 2.1.1

### Patch Changes

- 20e907887: formating to comply with lint
- Updated dependencies [82bb8c1c8]
- Updated dependencies [e04e3910f]
  - @talend/design-tokens@2.2.0
  - @talend/react-components@6.46.2

## 2.1.0

### Minor Changes

- d1815c0af: feat: Use @talend/assets-api to load topologies.

## 2.0.0

### Major Changes

- 9f3cad9bd: feat(TAD-6145): add a LineChart component in dataviz

  Migration: TooltipContent(Props) is renamed to KeyValueTooltip(Props)

## 1.0.6

### Patch Changes

- e2bcac8e6: GeoChart: Useless zoom buttons z-index

## 1.0.5

### Patch Changes

- 22d74ae79: fix: replace dynamic import syntax by static

  It was not supported by typescript which replace it with static import.
  Wait for CDN API which is incoming to load assets on demand.

- Updated dependencies [2e22151be]
  - @talend/react-components@6.44.2

## 1.0.4

### Patch Changes

- 275c25ee0: chore(dependencies): auto update for maintenance purpose

  ```diff
  -    "@talend/react-components": "^6.43.5"
  +    "@talend/react-components": "^6.44.0"
  ```

- Updated dependencies [275c25ee0]
  - @talend/react-components@6.44.1

## 1.0.3

### Patch Changes

- 618951c8b: chore(deps): auto update for maintenance purpose
- Updated dependencies [618951c8b]
  - @talend/react-components@6.43.5

## 1.0.2

### Patch Changes

- 86f208189: chore: upgrade dependencies and align @talend scoped packages to latest
- Updated dependencies [86f208189]
  - @talend/react-components@6.43.3

## 1.0.1

### Patch Changes

- 3bbf55610: fix(components/dataviz): recharts path in dependencies.json
- Updated dependencies [3bbf55610]
  - @talend/react-components@6.42.1

## 1.0.0

### Major Changes

- 42efdca45: Upgrade to recharts 2 and ensure everything is working well

### Patch Changes

- Updated dependencies [2e5511f79]
- Updated dependencies [cfa90496c]
- Updated dependencies [42efdca45]
  - @talend/react-components@6.42.0

## 0.4.10

### Patch Changes

- b33eb8655: fix(GeoChart): ?? operator is breaking angular tests
- Updated dependencies [d353a0a3c]
  - @talend/react-components@6.41.4

## 0.4.9

### Patch Changes

- 039b85775: chore: upgrade dependencies and align @talend scoped packages to latest
- Updated dependencies [039b85775]
  - @talend/react-components@6.41.3

## 0.4.8

### Patch Changes

- 667cd0a50: chore: upgrade dependencies and align @talend scoped packages to latest
- Updated dependencies [667cd0a50]
- Updated dependencies [7dde61e46]
  - @talend/react-components@6.40.0

## 0.4.7

### Patch Changes

- f1f4ec5bc: fix(workspace-run): package run order
- Updated dependencies [f1f4ec5bc]
  - @talend/react-components@6.39.2

## 0.4.6

### Patch Changes

- 3e9121287: chore(build): order packages on pre-release hook
- Updated dependencies [3e9121287]
- Updated dependencies [80ca14323]
  - @talend/react-components@6.39.1

## 0.4.5

### Fixed

- [show special chars in tooltip](https://github.com/Talend/ui/pull/3327)

## [0.4.4]

### Fixed

- [genereate dev UMD](https://github.com/Talend/ui/pull/3261)

## [0.4.3]

### Fixed

- [upgrade talend-scripts to fix manifest](https://github.com/Talend/ui/pull/3259)

## [0.4.2]

### Fixed

- [remove locale as peer dep](https://github.com/Talend/ui/pull/3216)

## [0.4.1]

### Fixed

- [Tooltip not hiding while cursor out of the chart](https://github.com/Talend/ui/pull/3216):

## [0.4.0]

- [Add GeoChart component](https://github.com/Talend/ui/pull/3209):

## [0.3.1]

### Fixed

- [Range ticks edge cases](https://github.com/Talend/ui/pull/3186):

## [0.3.0]

### Added

- [Add IntegerRangeHandler](https://github.com/Talend/ui/pull/3180):

### Changed

- [Use d3-scale for slider marks](https://github.com/Talend/ui/pull/3180):

## [0.2.3]

### Fixed

- [Fix truncated/misplaced tooltip](https://github.com/Talend/ui/pull/3183):

## [0.2.2]

### Fixed

- [Don't hide bars on overflow](https://github.com/Talend/ui/pull/3172):

## [0.2.1]

### Fixed

- [Show blue bars for entries without filtered values](https://github.com/Talend/ui/pull/3163):

## [0.2.0]

### Added

- [Time & DateTime pickers](https://github.com/Talend/ui/pull/3163):

## [0.1.4]

### Fixed

- [Reset tooltip line margin](https://github.com/Talend/ui/pull/3158):

## [0.1.3]

### Fixed

- [Wrong i18n namespace](https://github.com/Talend/ui/pull/3147):

## [0.1.2]

### Fixed

- [Missing i18n namespace](https://github.com/Talend/ui/pull/3145):

## [0.1.1]

### Fixed

- [Unnecessary onChange triggered](https://github.com/Talend/ui/pull/3134):

## [0.1.0]

### Added

- [Add "pattern" color support in tooltip](https://github.com/Talend/ui/pull/3133):
