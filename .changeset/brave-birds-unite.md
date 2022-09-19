---
'@talend/design-system': major
---

Removing Styled Components from Form elements

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

---

## Reasons for changes

### Removing StyledComponents

CSS-in-JS brings no value to the DS or Talend. No other project uses it but the DS forces it as a dependency.

We're removing it from all our components.

### No `className` or `style` props on components

Design System components are *systemic*. They are not part of a customizable component library.

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


