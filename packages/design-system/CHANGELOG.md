# @talend/design-system

## 1.15.0

### Minor Changes

- 4ca31151f: Export Stack components

## 1.14.4

### Patch Changes

- 277ad2977: fix(design-system): Divider uses CSS modules
- 07b5d6fc5: fix(design-system): tooltip with css modules

## 1.14.3

### Patch Changes

- 1c85f8588: Bump @talend/design-token to get missing tokens

## 1.14.2

### Patch Changes

- 5c8e454b2: Switch: Animation is broken

## 1.14.1

### Patch Changes

- 8bc59db7c: fix: tsconfig to have index.d.ts at root

## 1.14.0

### Minor Changes

- b268c0c43: New ButtonIcon component released

### Patch Changes

- 618951c8b: chore(deps): auto update for maintenance purpose

## 1.13.0

### Minor Changes

- 99f880903: fix(design-system): remove hardcoded string in the input file component

## 1.12.2

### Patch Changes

- 597c0d31a: adjust ts config to generate index.d.ts

## 1.12.1

### Patch Changes

- 86f208189: chore: upgrade dependencies and align @talend scoped packages to latest
- 8b6fc43c8: fix(TUX-1125): hide input.copy success message if value props is updated
- 4a9c460c7: fix(design-system): eslint errors

## 1.12.0

### Minor Changes

- 245549f9a: Added Stack components

### Patch Changes

- 2f14d3d67: fix(design-system): ts errors
- ceb169f1a: fix(design-system): build using design tokens
- e0721c1fe: Removing unused tokens

## 1.11.3

### Patch Changes

- 8a540fc3f: fix(i18n): avoid hardcoded string in DS components

## 1.11.2

### Patch Changes

- 583ac0059: fix(buttons): busy buttons should have a regular cursor
- 0b8fd0d5c: fix(design-system/Link): The title "open in a new tab" should be related to the target attribute and not the detection of external link

## 1.11.1

### Patch Changes

- 8caf37ea7: fix(Form): remove media-query-based max-width

## 1.11.0

### Minor Changes

- c521bc367: feat(InlineEditing): add placeholder support

## 1.10.1

### Patch Changes

- 7a8e6e193: fix(InlineEditing): enter key should not submit in multiline mode

## 1.10.0

### Minor Changes

- f2a835163: Checkbox: Support controlled checked state

## 1.9.6

### Patch Changes

- 6f1a293: fix(components/switch): no animation with defaultValue

## 1.9.5

### Patch Changes

- 0a3d6ad: fix(Form): Copy field uncrontolled value

## 1.9.4

### Patch Changes

- 5297f7b: fix(themes): export

## 1.9.3

### Patch Changes

- 35357e6: Expose design tokens dictionaries into the UMD

## 1.9.2

### Patch Changes

- 0a0acb3: distribute themes in package
- 371aa80: fix(Form): preserve ref inside fieldgroup
- de33900: fix(ThemeProvider): Handle nested providers
- bd8dbc2: Removed usage of array index as key

## 1.9.1

### Patch Changes

- 0b93f91: Removed usage of array index as key

## 1.9.0

### Minor Changes

- cd89a20: doc: Remove reakit as a dep to install in getting started guide
- 320cc08: feat(dropdown): add component

### Patch Changes

- e9f8154: feat(components/form): adapt style to coexist with bootstrap
- 96b0ea4: fix(InlineEditing): textarea is broken on safari
- 0e980f0: fix(components/form): read-only and disabled modes not passing to the fields

## 1.8.0

### Minor Changes

- d723689: feat(components/InlineEditing): add component

### Patch Changes

- c5ae533: feat(components/Field): Keep provided id

## 1.7.0

### Minor Changes

- 4466425: feat(Button): add a tooltip on buttons when hideText is set
- 737da5f: feat(components/Status): add component

### Patch Changes

- 844ad81: Force focusing password input only if it comes from click on the reveal password button

## 1.6.0

### Minor Changes

- 343abff: feat(components): Stepper style and updates

### Patch Changes

- 4f37aea: fix(Components/Form/Password): onBlur was not pass
- 5984ad3: fix(components/button): remove icon button border

## 1.5.0

### Minor Changes

- 5f4f3f4: Fixing combobox types
- 5f4f3f4: Button components now have strict typings
- 3e83ac7: Links props are now restrictive

### Patch Changes

- 996e16e: add i18next support
- 77006d2: Link target attribute should be preserved on subcomponent

## 1.4.0

### Minor Changes

- 24a2416: Add Drawer layout

### Patch Changes

- 6e381e5: Step by step template to render multi pages form
- 37d411f: Adjust the nav width when templates display a menu
- 14749b4: className was missing for InlineMessage variations
- ac6b51c: InlineMessage should have text-align at start
- 34b079c: Be able to use dark mode using template Step
- b6f5ed3: Accordion contents now scroll when height reaches specified limit

## 1.3.2

### Patch Changes

- 1449872: Focus outline should not be visible using mouse

## 1.3.1

### Patch Changes

- 1b09368: InlineMessage default colors should inherit
- 215eabe: Read-only Checkbox was not sent to the server
- e0b28e3: Radio don't change if they are not using Reakit hook

## 1.3.0

### Minor Changes

- bc05284: CSS variables support for InlineMessage

## 1.2.3

### Patch Changes

- 6fa4863: Using bootstrap, the progress bar of the stepper is darker

## 1.2.2

### Patch Changes

- 6e75e9a: CTA should keep their style if using as

## 1.2.1

### Patch Changes

- deb96f3: Links can have double underline

## 1.2.0

### Minor Changes

- 07abcde: For on-prem usage, we need to embed Source Sans Pro and Inconsolata fonts in the UMD for convenience

## 1.1.5

### Patch Changes

- 2742837: prevent multiple IconProvider rendering

## 1.1.4

### Patch Changes

- 8725893: The Stepper related progress bar was discontinued when there is an error

## 1.1.3

### Patch Changes

- f5b291a: Cleanup release content
- 5279096: Stepper does not have its steps exported

## 1.1.2

### Patch Changes

- 904ac6f: Remove postinstall script and build the project into the GitHub Action

## 1.1.1

### Patch Changes

- 9fb1b25: Post Install script was not defined and components were not released

## 1.1.0

### Minor Changes

- 9e6f199: Add Stepper component to build multi-page forms

## 1.0.9

### Patch Changes

- a4dedbf: Upgrade i18next
