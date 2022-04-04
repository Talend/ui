# Migrating from 2.x to 3.x

## Dropdown

Dropdown no longer is a Styled Component. Its types are fixed.

- Cannot use `as` for its disclosure anymore. Use a Clickable (`ButtonPrimary`, `ButtonIcon` etc...) as a child instead.
- The `items` prop extends `Linkable` and `Clickable`. Links can be from React-Router using `as`.
- The `items` prop requires entries with a specified `type` : `'link' | 'title' | 'button' | ' divider'`.
- `items` elements cannot be React elements anymore.

**Before**

```tsx
<Dropdown
	as={ButtonTertiary}
	aria-label="Describe the content of the menu"
	items={[
		<Link href="https://tdp.cloud.talend.com">Value</Link>,
		<button onClick={action}>Value</button>,
	]}
>
	App switcher
</Dropdown>
```

**After**

```tsx
<Dropdown
	aria-label="Describe the content of the menu"
	items={[
		{
			label: 'Link with icon',
			href: 'https://tdp.cloud.talend.com',
			type: 'link',
		},
		{
			label: 'value',
			onClick: action,
			type: 'button',
		},
	]}
>
	<ButtonTertiary isDropdown onClick={() => {}}>
		App switcher
	</ButtonTertiary>
</Dropdown>
```

---

# Migrating from 1.x to 2.x

We've overhauled a lot of component APIs and removed our dependency on Styled Components. Here's what's new:

## Link

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
