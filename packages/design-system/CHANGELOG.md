# @talend/design-system

## 3.0.1

### Patch Changes

- 1770e701b: fix: include peerDependencies in UMD manifest

## 3.0.0

### Major Changes

- 051dfd9fb: chore(design-system/Card): Refactor Card component
- 1160ec1f6: InlineMessage component is now only coming from design system. No more classnames. No more Link as components.
  Breaking changes:
  - No more `as`, `className` nor `style` props
  - `link` prop now is an object (based on the `Link` component props)

### Patch Changes

- 5a30f1f0e: feat(design-system): new icon set for status

## 2.8.0

### Minor Changes

- 0e4cfbaa8: Add new input variant

### Patch Changes

- 4419bbd0a: SkeletonInput does not stretch
- Updated dependencies [eec63a996]
  - @talend/assets-api@1.2.1

## 2.7.0

### Minor Changes

- 47b758112: feat(ARCH-482): use React 17 internally and extend react peer dep version

### Patch Changes

- Updated dependencies [47b758112]
  - @talend/assets-api@1.2.0
  - @talend/design-tokens@2.4.0

## 2.6.1

### Patch Changes

- 445887d9e: Spread in default case for collection component switch was not typesafe. Default case should be unreachable in TS anyways.

## 2.6.0

### Minor Changes

- 453802c72: Add props placement to ButtonIcon to choose tooltip placement

## 2.5.2

### Patch Changes

- 472645461: fix(Dropdown): close the dropdown menu while clicking on a button or a link inside.
- Updated dependencies [0c4804287]
  - @talend/design-tokens@2.3.0

## 2.5.1

### Patch Changes

- 9222aa7fc: fix: use assets-api from CDN
- Updated dependencies [9222aa7fc]
  - @talend/assets-api@1.1.0

## 2.5.0

### Minor Changes

- 8e95aab34: feat(design-system/Modal): Modal component
- 0d18d5d03: feat(Tooltip): use reakit useId as default baseId
- d1815c0af: feat: use @talend/assets-api to load icons

## 2.4.0

### Minor Changes

- 59a16bfa7: chore(design-system): PropsType naming

## 2.3.0

### Minor Changes

- 2e19164bf: Added EmptyState component

### Patch Changes

- 2b355ac2e: fix(design-system/storybook): Broken Storybook on Windows

## 2.2.0

### Minor Changes

- ed98b0840: Updated design tokens

## 2.1.2

### Patch Changes

- 3aa82e6be: fix: upgrade with the new tokens
- Updated dependencies [fb3483b9f]
  - @talend/design-tokens@2.0.0

## 2.1.1

### Patch Changes

- f5bc52900: fix(design-system/Stepper): Disabled step cursor

## 2.1.0

### Minor Changes

- cb8f55ef0: Breadcurmbs are now part of the design system

### Patch Changes

- c891f780a: HeaderBar isn't ready for primetime yet. API and style need work.
- e4fb9b78d: Update i18next version to match other packages

## 2.0.2

### Patch Changes

- da8e2b46f: Link: href is ignored
- f5cb575c9: Step: Add tooltip support

## 2.0.1

### Patch Changes

- 42a4eafa6: Export AffixButton and AffixReadOnly for FieldGroups.
- Updated dependencies [c7816c160]
  - @talend/design-tokens@1.4.1

## 2.0.0

### Major Changes

- 7af0ef8f6: ## Link

  Link component is no longer a Styled Component. Its types are fixed.

  - Can't be used as buttons, use `LinkAsButton` instead.

  ## Status

  Status is no longer a Styled Component.

  We expect no real breaking changes.

  ## Toggle, Button.Icon

  We introduced `ButtonIcon` and `ButtonToggle` instead.

  ```tsx
  import { ButtonIcon, ButtonToggle } from '@talend/design-system';
  ```

  The new APIs and looks lead to breaking changes.

  ### ButtonToggle vs Toggle

  - Style changes (larger by default)
  - Props changed (can be size M or S)
  - No longer stateful (active state must be handled by client application)
  - Mandatory props: `icon`, `isActive`, `onClick` and `children`

  **How to fix**: Handle the state through your application and pass a boolean to `isActive`.
  Use size `S` if you need to stick closer to previous design.

  ### ButtonIcon vs Button.Icon

  - Style changes (larger by default, round)
  - Props changed (can be size M, S or XS)
  - Can't display more than one icon (no more icon + caret)
  - Mandatory props: `icon`, `onClick` and `children`
  - Cannot be an HTML anchor

  **How to fix**: The change should be mostly straightforward.

  ## Tag

  Tag is no longer a Styled Component.

  To avoid customization, now `Tag` won't accept `className` anymore and each variation will be replaced by its shorthand version (no more `<Tag.[Variant] />` but `<Tag[Variant]`. ie `<Tag.Information />`is now `<TagInformation />`)

  ## Buttons

  Buttons are no longer Styled Components. Their types are fixed.

  - Style changes (slightly larger by default, new tokens for colors)
  - No more `Button.Icon`, use `ButtonIcon` components instead.
  - No more `Button.Variant` syntax. Use `ButtonPrimary`, `ButtonDestructive` etc... instead.
  - Props `small` is replaced with props `size="S"` to align with size props across the DS.
  - Can't be used as links, use `ButtonAsLink` components instead.
  - Can't be used as `prefix` or `sufix` for `Form.InputGroup`. Use `AffixButton` instead.

  ## Skeletons

  Skeletons are no longer Styled Components.

  - No more `Skeleton.Variant` syntax. Use the dedicated component for the variant (ie: `SkeletonButton`).
  - Skeletons do not accept classnames anymore.

## 1.17.0

### Minor Changes

- a98bf3ede: Fix: Firefox default outline is displayed when taking focus in an input with tab.

## 1.16.0

### Minor Changes

- 0ba5f75f9: doc(design-tokens): Button.Icon and Toggle usage is now discouraged
- ee100fbde: fix(APIC-751): add a prefix parameter to the copy component

## 1.15.1

### Patch Changes

- 3bf0f1f18: add applications icon

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
