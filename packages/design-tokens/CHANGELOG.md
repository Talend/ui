# @talend/design-tokens

## 3.4.3

### Patch Changes

- fcba736: fix: revert logo change

## 3.4.2

### Patch Changes

- 38e3c2c: Change the default branding logo to Qlik-light style

## 3.4.1

### Patch Changes

- f321a0d: Remove unused tsconfig.esm.json (initially added to use TSC but we stay with babel at the end)

## 3.4.0

### Minor Changes

- c3750a1: chore: upgrade dependencies

  Major upgrade for all packages that have a peerDependency on react or react-dom. Those packages now ask for react@18 and react-dom@18.

## 3.3.0

### Minor Changes

- 3bd16fc: Add support to ESM

### Patch Changes

- d053412: Fix esm script
- 9b66a09: Improve changes needed for cypress and simplify scripts

## 3.2.1

### Patch Changes

- 91b0096: fix: grayish the talend logo for the qlik-light theme

## 3.2.0

### Minor Changes

- 48865e5: feat: change logo for Qlik theme

## 3.1.1

### Patch Changes

- 1abc22f: chore: upgrade dependencies

## 3.1.0

### Minor Changes

- 9568363: Use include instead of same-origin in the credentials option of fetch.

## 3.0.0

### Major Changes

- b1c72a1: `rem` values have been updated to correspond to the new `rem` base (16px) define by the design system

## 2.12.1

### Patch Changes

- 14f478d: fix: qlik logo token

## 2.12.0

### Minor Changes

- 076147b: feat: update qlik theme

## 2.11.2

### Patch Changes

- bb106bc: fix: adjustments for qlik-light theme

## 2.11.1

### Patch Changes

- 08bb2c1: fix: qlik theme fixes

## 2.11.0

### Minor Changes

- b2d93a4: feat: add @qlik-light theme

## 2.10.1

### Patch Changes

- c468f2f: chore: upgrade dependencies

## 2.10.0

### Minor Changes

- b9cc5b097: Add missing deps and missing jest config file

## 2.9.0

### Minor Changes

- 3cfe50989: feat: update design tokens to add shadow info tokens

## 2.8.0

### Minor Changes

- b36165add: feat: add brand & info tokens

## 2.7.3

### Patch Changes

- 616601fda: chore: clean unnecessary react imports after React v17

  removed by running script `npx react-codemod update-react-imports`

  see doc https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports

## 2.7.2

### Patch Changes

- 99398080f: chore: apply code style

## 2.7.1

### Patch Changes

- ee45da0c5: Updated accent colors for dark theme

## 2.7.0

### Minor Changes

- a99154a7d: generate minified css using dot min in the name of it

## 2.6.0

### Minor Changes

- 3ee7c04a9: New shadow tokens

## 2.5.0

### Minor Changes

- f489c4b4f: Added data-XL size for font types, description for Link font types

## 2.4.0

### Minor Changes

- 47b758112: feat(ARCH-482): use React 17 internally and extend react peer dep version

## 2.3.0

### Minor Changes

- 0c4804287: Added accent-background-selected color

## 2.2.0

### Minor Changes

- 82bb8c1c8: Added tokens for "data" font types

## 2.1.0

### Minor Changes

- af3a9f02c: Added 3 new illustration color tokens

## 2.0.0

### Major Changes

- fb3483b9f: The size tokens have been split in sizing and spacing tokens. Size tokens are no longer valid

## 1.5.0

### Minor Changes

- d244858a7: Added illustration colors

## 1.4.1

### Patch Changes

- c7816c160: fix: umd distribution

## 1.4.0

### Minor Changes

- de71a183b: CSS export is no longer hashed

## 1.3.0

### Minor Changes

- 63079b40d: Added Heartbeat animaiton token
- 36748e5c8: Added Figma keys to style dictionnary

## 1.2.0

### Minor Changes

- f5ee0b8f4: Added new tokens for transition, corrected sizes

## 1.1.0

### Minor Changes

- 7118322ee: chore(design-tokens): exclude storybook assets from npm package

## 1.0.0

### Major Changes

- 4bcebd63c: feat(design-tokens): dedicated package
