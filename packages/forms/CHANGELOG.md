# @talend/react-forms

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
