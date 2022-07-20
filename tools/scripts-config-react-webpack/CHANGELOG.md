# @talend/scripts-config-react-webpack

## 13.2.0

### Minor Changes

- 99186eee4: feat: upgrade html-loader to 4.1

### Patch Changes

- 99186eee4: fix: configuration of minimize

## 13.1.0

### Minor Changes

- 904bd2040: feat: upgrade why-did-you-render-deps to support react 18

### Patch Changes

- Updated dependencies [d7a69e765]
- Updated dependencies [0fd9f4c3b]
  - @talend/react-cmf-webpack-plugin@6.36.9
  - @talend/scripts-config-cdn@10.5.3

## 13.0.1

### Patch Changes

- 2a8de8a55: \* fix: do not generate both hashed and non hashed assets for fonts, images and svgs.

  - fix: do not copy icons into app root folder
  - chore: put assets config in common so app and umd configuration are aligned.

  Note: path has been changed this way:

  ```diff
  # case of woff in lib
  - mylib/dist/[hash].woff
  - mylib/dist/fonts/[name].woff
  + mylib/dist/assets/fonts/[name].woff

  # case if woff in app
  - myapp/dist/[hash].woff
  - myapp/dist/fonts/[name].woff
  + myapp/dist/assets/fonts/[name]-[hash].woff

  # case of img in lib
  - not supported
  + mylib/dist/assets/img/[name].woff

  # case of img in app
  - myapp/dist/[hash].png
  - myapp/dist/assets/img/[name].png
  + myapp/dist/assets/img/[name]-[hash].png

  # case of svg in app
  - myapp/dist/[hash].svg
  - myapp/dist/assets/svg/[name].svg
  + myapp/dist/assets/svg/[name]-[hash].svg

  # case of svg in lib
  - mylib/dist/[hash].svg
  - mylib/dist/assets/svg/[name].svg
  + mylib/dist/assets/svg/[name]-[hash].svg
  ```

  - @talend/scripts-config-cdn@10.5.2

## 13.0.0

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

### Minor Changes

- 823242adf: feat(scripts/build): add Sentry release support

### Patch Changes

- @talend/scripts-config-cdn@10.5.1

## 12.1.3

### Patch Changes

- 3f4ad5e30: fix: url of repository in package.json
- Updated dependencies [3f4ad5e30]
  - @talend/scripts-config-babel@9.9.1

## 12.1.2

### Patch Changes

- 07e270241: fix: use yarn.lock content hash as cache key

## 12.1.1

### Patch Changes

- bfb2a493d: fix source-map for apps built with prod mode. Change `devtool` to 'source-map' because Terser plugin only supports limited source-map types.

## 12.1.0

### Minor Changes

- d1815c0af: feat: add CDN_URL to /cdn by default

## 12.0.3

### Patch Changes

- 478648239: fix(scripts-config-react-webpack): Bring back @talend libs in TALEND_APP_INFO
- Updated dependencies [b199a79e5]
  - @talend/scripts-config-cdn@10.3.1

## 12.0.2

### Patch Changes

- 9185a0a: fix(webpack): init module-to-cdn at umd webpack config start

## 12.0.1

### Patch Changes

- 77f29bc: fix(webpack): set back @talend in meta
- Updated dependencies [77f29bc]
  - @talend/scripts-config-cdn@10.3.0

## 12.0.0

### Major Changes

- b7d571c: Breaking change: remove private package supports from config-cdn

  You are pleased to move use private preset if you need to support private configs.

### Patch Changes

- Updated dependencies [b7d571c]
  - @talend/scripts-config-cdn@10.0.0

## 11.5.1

### Patch Changes

- 8b816fb: fix(webpack): take user preference for css module in umd config

## 11.5.0

### Minor Changes

- 0a831ce: feat(ARCH-466/storybook): no @talend from cdn

### Patch Changes

- Updated dependencies [0a831ce]
  - @talend/scripts-config-cdn@9.12.0

## 11.4.1

### Patch Changes

- 951667a: Use cdn config to add meta tags about versions of library used
- Updated dependencies [951667a]
  - @talend/scripts-config-cdn@9.11.5

## 11.4.0

### Minor Changes

- 33dcfee: add default index.html support

## 11.3.0

### Minor Changes

- f010743: add support for copy config

## 11.2.3

### Patch Changes

- 7c605ed: feat(ARCH-432/webpack): use babel-loader only to compile ts

## 11.2.2

### Patch Changes

- b737ae9: fix(webpack): svg url loader with esmodule false

## 11.2.1

### Patch Changes

- 77af1fc: chore(dependencies): auto update for maintenance purpose

  ```diff
  -    "@talend/scripts-config-babel": "^9.7.1"
  +    "@talend/scripts-config-babel": "^9.7.2"
  -    "@talend/scripts-config-cdn": "^9.11.1"
  +    "@talend/scripts-config-cdn": "^9.11.2"
  -    "@welldone-software/why-did-you-render": "^6.2.1"
  +    "@welldone-software/why-did-you-render": "^6.2.3"
  -    "autoprefixer": "^9.8.6"
  +    "autoprefixer": "^9.8.8"
  -    "babel-loader": "^8.2.2"
  +    "babel-loader": "^8.2.3"
  -    "core-js-bundle": "^3.17.1"
  +    "core-js-bundle": "^3.20.3"
  -    "sass": "^1.39.0"
  +    "sass": "^1.49.0"
  -    "terser": "^5.7.2"
  +    "terser": "^5.10.0"
  -    "webpack-bundle-analyzer": "^4.4.2"
  +    "webpack-bundle-analyzer": "^4.5.0"
  -    "webpack-cli": "^4.8.0"
  +    "webpack-cli": "^4.9.2"
  ```

- Updated dependencies [77af1fc]
- Updated dependencies [9cf2a86]
- Updated dependencies [77af1fc]
  - @talend/scripts-config-cdn@9.11.3
  - @talend/scripts-config-babel@9.7.3

## 11.2.0

### Minor Changes

- 632abe9: Replace @sass import by @use

## 11.1.2

### Patch Changes

- f1d5397: chore: Upgrade @talend/react-cmf-webpack-plugin

## 11.1.1

### Patch Changes

- 57ee6e0: Support multiple UMD in the same package
- Updated dependencies [40b7a40]
  - @talend/scripts-config-cdn@9.11.1

## 11.1.0

### Minor Changes

- 494d81e: feat(webpack): support route basename

## 11.0.3

### Patch Changes

- 5a64101: fix(dynamic-cdn-webpack-plugin): take peer deps meta into account
- 618308b: revert from @use to @import which is clearly different

## 11.0.2

### Patch Changes

- 5725183: fix: now project can use the syntax @use "sass:math" to fix division breaking change

## 11.0.1

### Patch Changes

- a22e2d6: fix(webpack): devServer watches src and dist

## 11.0.0

### Major Changes

- d4d2f2e: feat: upgrade webpack-cli and remove deasync

## 9.10.7

### Patch Changes

- a6201b3: Revert upgrade of webpack-cli and dev-server
- Updated dependencies [ae7a0ef]
  - @talend/scripts-config-babel@9.7.1

## 9.10.6

### Patch Changes

- ff8161e: upgrade webpack-dev-server

## 9.10.5

### Patch Changes

- 9ef83c5: Upgrade dependencies to be aligned with what is used in dev mode
- 446b8f0: Update requirement on sass compiler
- Updated dependencies [9ef83c5]
  - @talend/scripts-config-babel@9.6.3
  - @talend/scripts-config-cdn@9.10.5

## 9.10.4

### Patch Changes

- 1802d02: fix(cdn): sri computation on right version
- Updated dependencies [1802d02]
  - @talend/scripts-config-cdn@9.10.4

## 9.10.3

### Patch Changes

- fcccad6: fix(config-cdn): find package for copy takes scope into account
- Updated dependencies [fcccad6]
  - @talend/scripts-config-cdn@9.10.2

## 9.10.2

### Patch Changes

- b07ac88: fix(webpack): no copy of libs to /cdn in cdn mode
- Updated dependencies [b07ac88]
  - @talend/scripts-config-cdn@9.10.1

## 9.10.1

### Patch Changes

- 9572126: Pass dynamic-webpack-plugin config to umd webpack
- 5c0cd63: fix: move local path compute from moduleToCdn to webpack plugin and cdn config.

  Context: When multiple versions of a package are installed.
  When the two versions do not resolve the same path from module-to-cdn.
  Ex: `react-dnd` in 2.6.0 and 14.0.0. Only the path from the installed in root node_modules will be found
  which lead to bad resolution (404).

  Why: We use require.resolve without context or with wrong options `paths` so we find only the root one.

  Solution: Remove resolution from module-to-cdn which has no way to have a context path and update cdn config and webpack plugin to use require.resolve with correct paths.

- Updated dependencies [5c0cd63]
  - @talend/scripts-config-cdn@9.9.2

## 9.10.0

### Minor Changes

- 7255d2f: Add possibility to have the bundle analyzer in production mode

## 9.9.7

### Patch Changes

- 159def0: fix: update copy-webpack-plugin to support info attribute

## 9.9.6

### Patch Changes

- 643022c: fix(config-webpack-plugin): adapt inject to terser 5

## 9.9.5

### Patch Changes

- 073ad93: fix(config-react-webpack): add terser explicitly to fix version
- Updated dependencies [4613332]
  - @talend/scripts-config-cdn@9.9.1

## 9.9.4

### Patch Changes

- fe505ee: upgrade dependencies for security issues

## 9.9.3

### Patch Changes

- d9b7da3: MiniCssExtractPlugin 1.0 switch option to generate esModule. We Prefer keep commonJS instead to not break apps

## 9.9.2

### Patch Changes

- 4def0f8: Use cdn config to copy cdn assets for onprem

## 9.9.1

### Patch Changes

- 83d1232: Remove optimize-css-assets-webpack-plugin

## 9.8.0

### Minor Changes

- 687c74a: feat(cdn): cdn libs integrity hash
- 55ea3b0: feat(cdn): SRI on css files

## 9.7.0

### Minor Changes

- f59e70f: BundleAnalyzer plugin is activated in dev mode
