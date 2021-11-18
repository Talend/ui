# @talend/design-system

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
