# Changelog

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
