# @talend/scripts-preset-react-ng

## 12.0.3

### Patch Changes

- d869de8: Add dependency to scripts-config-prettier to match other presets

## 12.0.2

### Patch Changes

- Updated dependencies [4753696]
  - @talend/scripts-config-storybook-lib@1.0.0

## 12.0.1

### Patch Changes

- Updated dependencies [ce8a7ac]
- Updated dependencies [415efca]
  - @talend/scripts-config-storybook-lib@0.10.0

## 12.0.0

### Major Changes

- b7d571c: Breaking change: remove private package supports from config-cdn

  You are pleased to move use private preset if you need to support private configs.

### Patch Changes

- Updated dependencies [b7d571c]
- Updated dependencies [b7d571c]
  - @talend/scripts-config-cdn@10.0.0
  - @talend/scripts-config-react-webpack@12.0.0

## 11.2.2

### Patch Changes

- Updated dependencies [bd6afb9]
  - @talend/scripts-config-storybook-lib@0.9.0

## 11.2.1

### Patch Changes

- Updated dependencies [0a831ce]
  - @talend/scripts-config-cdn@9.12.0
  - @talend/scripts-config-react-webpack@11.5.0
  - @talend/scripts-config-storybook-lib@0.8.0

## 11.2.0

### Minor Changes

- 0a71d58: Add config-storybook to preset

## 11.1.3

### Patch Changes

- f3c3b2b: feat(storybook): add build-storybook script

## 11.1.2

### Patch Changes

- 77af1fc: chore(dependencies): auto update for maintenance purpose

  ```diff
  -    "@talend/scripts-config-babel": "^9.6.3"
  +    "@talend/scripts-config-babel": "^9.7.2"
  -    "@talend/scripts-config-cdn": "^9.11.1"
  +    "@talend/scripts-config-cdn": "^9.11.2"
  -    "@talend/scripts-config-eslint": "^9.6.4"
  +    "@talend/scripts-config-eslint": "^9.7.1"
  -    "@talend/scripts-config-jest": "^9.6.4"
  +    "@talend/scripts-config-jest": "^9.7.0"
  -    "@talend/scripts-config-react-webpack": "^11.1.1"
  +    "@talend/scripts-config-react-webpack": "^11.2.0"
  ```

- Updated dependencies [77af1fc]
- Updated dependencies [77af1fc]
- Updated dependencies [9cf2a86]
- Updated dependencies [77af1fc]
- Updated dependencies [77af1fc]
- Updated dependencies [77af1fc]
- Updated dependencies [77af1fc]
- Updated dependencies [77af1fc]
  - @talend/scripts-config-eslint@9.7.2
  - @talend/scripts-config-cdn@9.11.3
  - @talend/scripts-config-babel@9.7.3
  - @talend/scripts-config-jest@9.7.1
  - @talend/scripts-config-karma@9.7.2
  - @talend/scripts-config-ng-webpack@9.7.2
  - @talend/scripts-config-react-webpack@11.2.1

## 11.1.1

### Patch Changes

- 57ee6e0: Support multiple UMD in the same package
- Updated dependencies [40b7a40]
- Updated dependencies [57ee6e0]
  - @talend/scripts-config-cdn@9.11.1
  - @talend/scripts-config-react-webpack@11.1.1

## 11.1.0

### Minor Changes

- 494d81e: feat(webpack): support route basename

### Patch Changes

- Updated dependencies [494d81e]
  - @talend/scripts-config-react-webpack@11.1.0

## 11.0.2

### Patch Changes

- 5a64101: fix(dynamic-cdn-webpack-plugin): take peer deps meta into account
- Updated dependencies [5a64101]
- Updated dependencies [618308b]
  - @talend/scripts-config-react-webpack@11.0.3

## 11.0.1

### Patch Changes

- a22e2d6: fix(webpack): devServer watches src and dist
- Updated dependencies [a22e2d6]
  - @talend/scripts-config-react-webpack@11.0.1

## 11.0.0

### Major Changes

- d4d2f2e: feat: upgrade webpack-cli and remove deasync

### Patch Changes

- Updated dependencies [d4d2f2e]
  - @talend/scripts-config-react-webpack@11.0.0

## 9.8.5

### Patch Changes

- 9ef83c5: Upgrade dependencies to be aligned with what is used in dev mode
- Updated dependencies [9ef83c5]
- Updated dependencies [446b8f0]
  - @talend/scripts-config-babel@9.6.3
  - @talend/scripts-config-cdn@9.10.5
  - @talend/scripts-config-eslint@9.6.4
  - @talend/scripts-config-jest@9.6.4
  - @talend/scripts-config-karma@9.7.1
  - @talend/scripts-config-ng-webpack@9.7.1
  - @talend/scripts-config-react-webpack@9.10.5
  - @talend/scripts-config-stylelint@1.0.1
  - @talend/scripts-config-typescript@9.11.1

## 9.8.4

### Patch Changes

- 1802d02: fix(cdn): sri computation on right version
- Updated dependencies [1802d02]
  - @talend/scripts-config-cdn@9.10.4
  - @talend/scripts-config-react-webpack@9.10.4

## 9.8.3

### Patch Changes

- 40ba52b: fix(jest): i18next.t mock default value as only option support
- Updated dependencies [40ba52b]
  - @talend/scripts-config-jest@9.6.3

## 9.8.2

### Patch Changes

- 643022c: fix(config-webpack-plugin): adapt inject to terser 5
- Updated dependencies [643022c]
  - @talend/scripts-config-react-webpack@9.9.6

## 9.8.1

### Patch Changes

- 073ad93: fix(config-react-webpack): add terser explicitly to fix version
- Updated dependencies [4613332]
- Updated dependencies [073ad93]
  - @talend/scripts-config-cdn@9.9.1
  - @talend/scripts-config-react-webpack@9.9.5

## 9.8.0

### Minor Changes

- 0a5a90f: Add new `lint:style` command.
  Create new shared configuration `config-style` to share Stylelint configuration.
  Update `preset-react`, `preset-react-lib` and `preset-react-ng` to include the new Stylelint configuration.

### Patch Changes

- b4b5b8f: Add missing dependency to stylelint
- Updated dependencies [0a5a90f]
  - @talend/scripts-config-stylelint@1.0.0

## 9.7.0

### Patch Changes

- ef8a9fb: Remove unecessary peer dependencies here
- Updated dependencies [f59e70f]
  - @talend/scripts-config-react-webpack@9.7.0
