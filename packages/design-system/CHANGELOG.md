# @talend/design-system

## 8.1.3

### Patch Changes

- c286d9844: fix(TDOPS-5582/designSystem): checkbox state change on click

## 8.1.2

### Patch Changes

- 02cc11768: fix: add z-index to Popover.module.scss
- Updated dependencies [841be39f3]
  - @talend/utils@2.7.0

## 8.1.1

### Patch Changes

- 6816365dc: fix: binding in forms

## 8.1.0

### Minor Changes

- 3f9c8a7bb: update babel config to use babel.config.js instead of .babelrc.json
  add missing deps
  remove useless cypress config (toto.cypress.config.js)

### Patch Changes

- c76a700a4: fix: ThemeProvider use a module.scss but this is a global css
- b8406b6e5: Fix Design System accessibility for Modal
- 6b9f49e81: proper export of Icon enums
- 41bd1b586: chore: remove unused polished dependency

## 8.0.0

### Major Changes

- 96d688489: React: Upgrade to react 18 and @types/react 18
- 9a0732ec5: chore: remove reakit

  - Rewrite components without reakit
  - use `@floating-ui/react` for tooltip, popover
  - export all types and components from the root

  Breaking changes:

  - HTML structure output may have changed
  - Some passed props from our component to reakit and not documented as a usage as been removed. If you need a different usage let us knwow, now we own the code
  - Tabs props API has been completly changed

  Components changed:

  - Accordion (useId)
  - Clickable (rewrite)
  - Combobox (add as primitive)
  - Disclosure (add as primitive)
  - Divider (rewrite)
  - Drawer (rewrite using `react-transition-group`)
  - Dropdown (rewrite using `@floating-ui/react`)
  - Form/Affix/Button (typings)
  - Form/Affix/Select (useId)
  - Form/Field/Datalist (useId)
  - Form/Field/InputFile (useId)
  - Form/Field/InputToggleSwitch (rewrite)
  - Form/Primitives/Checkbox (rewrite)
  - Form/Primitives/Field (useId)
  - Form/Primitives/Radio (useId)
  - Modal (rewrite Dialog as primitive)
  - Popover (rewrite using `@floating-ui/react`)
  - Switch (rewrite)
  - Tabs (rewrite + props changed with old API support)
  - Tooltip (rewrite using `@floating-ui/react` + API Change)
  - VisuallyHidden (rewrite)

  ## Migration Guide

  ### Checkbox component

  Checkbox support now control and uncontrolled mode.
  To use controlled version, provide `checked` and `onChange` props.
  To use uncontrolled version, you can provide optional `defaultChecked` prop.

  We also change way to import it to be less verbose.

  ### ToggleSwitch component

  ToggleSwitch now support controlled and uncontrolled mode.
  To use controlled version provide `checked` and `onChange` props.
  To use uncontrolled version, you can just provide optional provide `defaultChecked` prop.

  ### Tabs component

  Previous API with the `tabs` props. TabsKit has been removed. We encourage you to use the following API:

  ```javascript
  <Tabs.Container defaultActiveKey="profile">
  	<Tabs.List>
  		<Tabs.Tab aria-controls="home" title="Home" />
  		<Tabs.Tab aria-controls="profile" title="Profile" />
  		<Tabs.Tab aria-controls="contact" title="Contact" disabled />
  	</Tabs.List>
  	<Tabs.Panel id="home">Tab content for Home</Tabs.Panel>
  	<Tabs.Panel id="profile">Tab content for Profile</Tabs.Panel>
  	<Tabs.Panel id="contact">Tab content for Contact</Tabs.Panel>
  </Tabs.Container>
  ```

- 4044f6198: ARCH-662 - Bump i18next from v20 to v23 and react-i18next from v11 to v13

### Minor Changes

- 9a0732ec5: feat: upgrade react-is

### Patch Changes

- bacaa4b31: fix TypeError: popover.hide is not a function on close Popover
- 9a0732ec5: fix: some lint errors
- Updated dependencies [96d688489]
  - @talend/icons@7.0.0

## 7.15.1

### Patch Changes

- 3b058ef7d: fix: some lint errors. Start to export types for some components.

## 7.15.0

### Minor Changes

- 076d96234: Add BadgeMenu to faceted search for single selection

## 7.14.2

### Patch Changes

- fbce059c2: Improve usage of design tokens for info variants

## 7.14.1

### Patch Changes

- 6391fc8b6: Form.Copy - Fix no copied message after switching back
- Updated dependencies [3cfe50989]
  - @talend/design-tokens@2.9.0

## 7.14.0

### Minor Changes

- cd79a04a8: Design System - InlineEdit and InlineEditMulti can now have a maxLength attribute

### Patch Changes

- 0789cda91: Design system - Form file will now update on files prop change and will trigger onChange when file is cleared

## 7.13.0

### Minor Changes

- 4292de3ea: feat(TDC-7254/Stepper): Add a new props `currentStepIndex` to control current step. Set to zero by default.

  This fix an issue as the previous code is based on react ref which is not updated when dom is changed. As we don't want to observe mutation on the DOM, let's go back on classic react patterns, make it pure and ask for a state

## 7.12.2

### Patch Changes

- 1c53807b7: chore: update rich radio button

## 7.12.1

### Patch Changes

- b10ae79ed: fix(design-system): add data attributes to RichRadioButton
- 5bfab7ded: feat(tdc-7258): added data-checked attribute so automated tests can select the checked card

## 7.12.0

### Minor Changes

- 7de53ccf0: feat(design-system): Handle logos in RichRadioButton

## 7.11.0

### Minor Changes

- d8c9adc34: [DS] InlineEditing : allow to update value from default value prop

## 7.10.0

### Minor Changes

- a90c12b34: feat: add data attributes to the BadgeDropdown component
- c54e10157: feat(TDC-6804): added rich radio button component

## 7.9.0

### Minor Changes

- 7a9f88147: chore(TFD-15534): Add status to accordion header

## 7.8.0

### Minor Changes

- d5c2f9409: feat: Add other illustrations for EmptyStateMedium

## 7.7.3

### Patch Changes

- e5a326ffb: fix(TFD-15547): Drawer is under Modal

## 7.7.2

### Patch Changes

- cf697de02: chore: clean React imports to only used properties
- be1095095: fix(design-system): Button style while compacted by layout

## 7.7.1

### Patch Changes

- 616601fda: chore: clean unnecessary react imports after React v17

  removed by running script `npx react-codemod update-react-imports`

  see doc https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports

- 285efb74a: fix: add data-test to buttons in modal
- Updated dependencies [616601fda]
  - @talend/design-tokens@2.7.3

## 7.7.0

### Minor Changes

- a01e81852: feat(design-system): Modal have no close button if preventEscaping is on

## 7.6.0

### Minor Changes

- 00869855d: Popover - Add `focusOnDisclosure` option to allow focus on disclosure when popover is opened

## 7.5.1

### Patch Changes

- 4c3495e12: chore: apply code style

## 7.5.0

### Minor Changes

- 4cfbf226b: feat(Tabs&Dropdown): add new data-feature & data-testid capabilities

## 7.4.1

### Patch Changes

- 6c6133860: TDOPS-3536 - Fix passing props to popover disclosure on Design System

## 7.4.0

### Minor Changes

- 79c2d5165: feat(TFD-14857): BadgeDropdown is now controlled

## 7.3.0

### Minor Changes

- 4c5598a5a: Add new Badge component in DS

### Patch Changes

- ed4014653: fix: Collapsible state is init by expaneded props

## 7.2.0

### Minor Changes

- 1ce5a1f8c: feat(TUX-1221) add openInNewTab option for LinkAsButton

### Patch Changes

- f855fcae0: fix(design-system/Modal): sync header x padding with spec

## 7.1.6

### Patch Changes

- 890eee0b5: fix(design-system): add data-testid to InlineEditing

## 7.1.5

### Patch Changes

- 1aa89365a: TDOPS-3299 - design system modal z-index to use tokens convention

## 7.1.4

### Patch Changes

- f36e7f7c3: InlineEditing : handle keyboard shortcut only when element has the focus

  remove usekey which bind by default on document.

## 7.1.3

### Patch Changes

- c8ea668ee: InlineEditing : don't handle enter key when not in edition

## 7.1.2

### Patch Changes

- 5aeff7b47: TDOPS-3267 - Fixed support for `onBlur` property passed to primitive input

## 7.1.1

### Patch Changes

- fe430c316: fix: add missing export on the root

  - Input on Form component (so Form.Input)
  - Breadcrumbs
  - theme tokens
  - TabsAsLinkList

  ```
  import { dark, light, Breadcrumbs } from '@talend/design-system';
  ```

## 7.1.0

### Minor Changes

- 3815dabd3: feat(design-system): add Message component

## 7.0.2

### Patch Changes

- 105990b24: feat(InlineEditing): add new `onToggle` optional props to get notify from edition mode changes

## 7.0.1

### Patch Changes

- e76a4db6b: fix: ThemeProvider optional theme property
- 60a00f152: fix: apply transform style from props

## 7.0.0

### Major Changes

- ee9b1daf6: \* chore: remove dependency over styled-components
  - remove deprecated components

### Patch Changes

- a23396460: fix: missing fonts in exported bundle

## 6.0.1

### Patch Changes

- 3bb657dea: fix: pin react-router to 6.3.0

## 6.0.0

### Major Changes

- 69f09a921: ThemeProvider: Removed styled components global styles

  BREAKING CHANGE:

  - Now global style is applied by default
  - createGlobalStyle is not exposed anymore and should not be needed
  - ThemeProvider.GlobalStyle do not exists, it is now in the by default in the CSS

### Minor Changes

- e802df9c3: Stepper no longer uses StyledComponents
- ac7bfe557: Combobox: Removing Styled Components

## 5.4.1

### Patch Changes

- 3962569cc: DS Tabs button type should never be anything but "button"
- aa0c76ae3: Updated documentation for from elements, adjusted code and style when necessary.

## 5.4.0

### Minor Changes

- 6d6520336: feat: add react-18 as possible peerDependency

## 5.3.0

### Minor Changes

- 4ea6a7712: feat(TUX-1038): add new accordion component to design-system

### Patch Changes

- 8376814d2: fix: circular dependencies

## 5.2.0

### Minor Changes

- 38619790a: feat(design-system): add isFullWidth to StackHorizontal
- fceb4c2f9: chore(design-system): ErrorState no longer WIP

### Patch Changes

- 9e653a037: fix(design-system): Link from ReactElement in ErrorState

## 5.1.0

### Minor Changes

- 59509e0ba: feat(design-system): ErrorState (WIP)
- dc361182d: Enabling `action` prop on EmptyState component size M.

## 5.0.1

### Patch Changes

- e2174b30b: fix: scss filename now follow css module filename pattern
- 6fd16be45: fix: use flex-start instead of start

## 5.0.0

### Major Changes

- eb1708093: Removing Styled Components from Form elements

  ## Breaking changes

  ### `Form` modules

  - As always with these change, we lose StyledComponent's `as` props.
  - No more `className` or `style` on Form elements.
  - No more `Form.FieldGroup`. All the inputs (`Form.Text`, `Form.Select`, `Form.Number` etc...) have `prefix` and `suffix`props to handle this.
  - `name` is required on all form elements.
  - No more `Form.Range`. Though it was undocumented, it was exported. It was far from doing what we want `input type="range"` to do in our apps.
  - Simpler `description` and `hasError` APIs. Fields can either have a (neutral) description or an error message.

  ### `InlineEditing` modules

  - As always with these change, we lose StyledComponent's `as` props.
  - No more `className` or `style`.
  - `placeholder` prop is now mandatory.

  ## Other changes

  ### `Form` modules

  - Updated styles with design tokens.
  - Height of input elements based in height of buttons.
  - Focusing a field no longer changes the field's height.
  - Affixes can now be either buttons, text or `select` fields through a props-based API.

  ### `InlineEditing` modules

  - `InlineEditing.Text` and `InlineEditing.Textarea` both have a `renderValueAs` props that can take React component.

  ***

  ## Reasons for changes

  ### Removing StyledComponents

  CSS-in-JS brings no value to the DS or Talend. No other project uses it but the DS forces it as a dependency.

  We're removing it from all our components.

  ### No `className` or `style` props on components

  Design System components are _systemic_. They are not part of a customizable component library.

  Removing those props from the component typing helps enforce that rule.

  > What about positioning those components? How do I handle that?

  We expect consumers to wrap library components into project-side positioning element.

  That way your project-side CSS is never broken or misaligned with the library's and the concerns are clearly separated.

  ### Removing `Form.FieldGroup`

  Having a wrapper component around all the other inputs seems unnecessary.

  Folding these types and props into the native primitive made more sense.

  ### Enforcing `placeholder` in `InlineEditing`

  Nothing prevents users from deleting the contents of an `InlineEditing` field.

  Since the labels are hidden, placeholders are the only way to indicate what's the field for in these instances.

### Patch Changes

- Updated dependencies [ee45da0c5]
  - @talend/design-tokens@2.7.1

## 4.3.0

### Minor Changes

- 65e75d6b3: Use DS namespace for DS translations

## 4.2.0

### Minor Changes

- f54db324c: StackVertical: add height prop

### Patch Changes

- 95e37c3b2: Padding style of popover should apply to contents, not parent.

## 4.1.1

### Patch Changes

- b5d12a791: Export TagVariantsNames from DS module

## 4.1.0

### Minor Changes

- 79239025d: Add const to export Tag variations through string array
- e5aa63ef6: feat(Popover): add `isFixed` and `hasPadding` props

## 4.0.2

### Patch Changes

- e6b185e51: fix(TDP-11258): get back tilde character for sass imports for compatibility"

## 4.0.1

### Patch Changes

- ae9897897: Using design tokens instead of style components plus fixes in the following components:

  - ThemeProvider
  - Switch
  - Layout
  - InlineEditing
  - Divider
  - ButtonIcon
  - Accordion
  - Icon

- Updated dependencies [56e0a9629]
  - @talend/assets-api@1.2.2

## 4.0.0

### Major Changes

- 617ec14f0: Tabs: Removed className possibilities. Composition mode is not the default anymore.

### Minor Changes

- a99154a7d: generate minified css using dot min in the name of it

### Patch Changes

- Updated dependencies [a99154a7d]
  - @talend/design-tokens@2.7.0

## 3.8.0

### Minor Changes

- 06bee44bf: feat(design-system): set switch font to prevent inheritance

## 3.7.0

### Minor Changes

- b8c67b7c0: fix(APIC-827): reset inputCopy state when input value changes

## 3.6.2

### Patch Changes

- 71a736784: fix(design-system): Allow additional bundles for IconsProvider

## 3.6.1

### Patch Changes

- 2a8de8a55: fix: trigger a new release to get ride of hashed assets in the package.

## 3.6.0

### Minor Changes

- 70f4b05c9: Buttons can handle the new iconset

## 3.5.1

### Patch Changes

- 03010b19b: SVGs in ButtonIcon should not register clicks

## 3.5.0

### Minor Changes

- 984c9c22b: feat(Dropdown): set a z-index value
- da844538c: Expose `TooltipPlacement` type

### Patch Changes

- 2e06262d7: Move style to CSS module file
- Updated dependencies [3ee7c04a9]
  - @talend/design-tokens@2.6.0

## 3.4.0

### Minor Changes

- 21189557e: feat(design-system): add TagBeta to the Tag familly

## 3.3.0

### Minor Changes

- 57ea150e8: feat(design-system): FloatingDrawer component

## 3.2.0

### Minor Changes

- a90ec3748: feat(design-system): Allow children as function for popover component in order to access the popover state

### Patch Changes

- a90ec3748: fix(design-system): add z-index to popover

## 3.1.1

### Patch Changes

- 79f7127a7: fix(design-system): add white background to popover component

## 3.1.0

### Minor Changes

- 8b9a8b5da: chore(design-system/Popover): Refactor Popover

### Patch Changes

- Updated dependencies [f489c4b4f]
  - @talend/design-tokens@2.5.0

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
