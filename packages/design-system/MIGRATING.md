# Migrating from 1.x to 2.x

We've overhauled a lot of component APIs and removed our dependency on Styled Components. Here's what's new:


## Link

Link component is no longer a Styled Component. Its types are fixed.

We expect no real breaking changes.

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
