---
'@talend/react-components': major
---

feat(SubHeaderBar): replace `EditableText` legacy component by `InlineEditing` Coral component.

Breaking:
- `onEdit` and `onCancel` props has been removed. They are now directly handled by the `InlineEditing` component.
- `onSubmit` callback signature changed from `onSubmit(event: JSEvent, { value: string })` to `onSubmit(event: JSEvent, value: string)` the returned value from the `InlineEditing` component is not wrapped within an object containing only one `value` property. You now have the `value` directly.
