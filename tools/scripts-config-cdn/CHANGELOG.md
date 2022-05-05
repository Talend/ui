# CHANGELOG

## 10.4.0

### Minor Changes

- 9222aa7fc: @talend/assets-api is now distributed as UMD file

## 10.3.2

### Patch Changes

- Updated dependencies [4589878a9]
  - @talend/dynamic-cdn-webpack-plugin@11.0.0

## 10.3.1

### Patch Changes

- b199a79e5: fix: upgrade dynamic-cdn-webpack-plugin
- Updated dependencies [b199a79e5]
  - @talend/dynamic-cdn-webpack-plugin@10.0.0

## 10.3.0

### Minor Changes

- 77f29bc: fix(webpack): set back @talend in meta

## 10.2.1

### Patch Changes

- 0dd7653: fix: copy should init moduleToCdn

## 10.2.0

revert to 10.0.0

## 10.1.0

OLD cancelled release

## 10.0.2

OLD cancelled release

## 10.0.1

OLD cancelled release

## 10.0.0

### Major Changes

- b7d571c: Remove private package. Previous releases will be made private

## 9.12.0

### Minor Changes

- 0a831ce: feat(ARCH-466/storybook): no @talend from cdn

## 9.11.5

### Patch Changes

- 951667a: Use cdn config to add meta tags about versions of library used

## 9.11.4

### Patch Changes

- 28f9df2: add @talend/design-system style

## 9.11.3

### Patch Changes

- 77af1fc: chore(dependencies): auto update for maintenance purpose

  ```diff
  -    "@talend/dynamic-cdn-webpack-plugin": "^9.7.12"
  +    "@talend/dynamic-cdn-webpack-plugin": "^9.7.14"
  -    "@talend/module-to-cdn": "^9.7.3"
  +    "@talend/module-to-cdn": "^9.7.5"
  ```

- 9cf2a86: chore(dependencies): auto update for maintenance purpose

  ```diff
  -    "@talend/module-to-cdn": "^9.7.5"
  +    "@talend/module-to-cdn": "^9.7.6"
  ```

- Updated dependencies [9cf2a86]
  - @talend/dynamic-cdn-webpack-plugin@9.7.15

## 9.11.2

### Patch Changes

- 71806a7: add @talend/design-tokens

## 9.11.1

### Patch Changes

- 40b7a40: Support multiple UMD in the same package
- Updated dependencies [d03cd41]
- Updated dependencies [57ee6e0]
  - @talend/module-to-cdn@9.7.3
  - @talend/dynamic-cdn-webpack-plugin@9.7.12

## 9.11.0

### Minor Changes

- b3506b9: Add @talend/locales-\* on cdn

## 9.10.5

### Patch Changes

- 9ef83c5: Upgrade dependencies to be aligned with what is used in dev mode
- Updated dependencies [9ef83c5]
  - @talend/dynamic-cdn-webpack-plugin@9.7.7
  - @talend/module-to-cdn@9.7.1

## 9.10.4

### Patch Changes

- 1802d02: fix(cdn): sri computation on right version
- Updated dependencies [1802d02]
  - @talend/dynamic-cdn-webpack-plugin@9.7.6

## 9.10.3

### Patch Changes

- 6898c52: config-cdn use require.resolve.paths to find node_modules

## 9.10.2

### Patch Changes

- fcccad6: fix(config-cdn): find package for copy takes scope into account

## 9.10.1

### Patch Changes

- b07ac88: fix(cdn): tdx >= 0.0.2

## 9.10.0

### Minor Changes

- ca9a9c8: feat(cdn): add tdx in talend modules

## 9.9.4

### Patch Changes

- d06dc24: fix(config-cdn): Copy config with empty path

## 9.9.3

### Patch Changes

- b14b4fa: fix(dynamic-cdn-webpack-plugin): skip a dep of dep if not installed
- Updated dependencies [b14b4fa]
  - @talend/dynamic-cdn-webpack-plugin@9.7.5

## 9.9.2

### Patch Changes

- 5c0cd63: fix: move local path compute from moduleToCdn to webpack plugin and cdn config.

  Context: When multiple versions of a package are installed.
  When the two versions do not resolve the same path from module-to-cdn.
  Ex: `react-dnd` in 2.6.0 and 14.0.0. Only the path from the installed in root node_modules will be found
  which lead to bad resolution (404).

  Why: We use require.resolve without context or with wrong options `paths` so we find only the root one.

  Solution: Remove resolution from module-to-cdn which has no way to have a context path and update cdn config and webpack plugin to use require.resolve with correct paths.

- Updated dependencies [5d12d77]
- Updated dependencies [5c0cd63]
  - @talend/module-to-cdn@9.7.0
  - @talend/dynamic-cdn-webpack-plugin@9.7.3

## 9.9.1

### Patch Changes

- 4613332: Exclude CDN assets from terser

## 9.9.0

### Minor Changes

- 2e661c2: feat(config-cdn): add incubation in talend packages

## 9.8.0

### Minor Changes

- 9a051a3: Add TalendInitator support

## 9.7.0

### Minor Changes

- 4def0f8: Upgrade @talend/dynamic-cdn-webpack-plugin

It do not copy assets anymore so we handle copy of assets with webpack copy plugin.
It is a partial revert of 22430dd from #201

## 9.7.1

### Patch Changes

- d4add3d: assert if file exists in computeSRI (windows hang)

## 9.7.0

- 687c74a: feat(cdn): cdn libs integrity hash
- 55ea3b0: feat(cdn): SRI on css files
