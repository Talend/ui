---
'@talend/react-components': major
'@talend/design-system': major
'@talend/react-forms': patch
---

InlineMessage component is now only coming from design system. No more classnames. No more Link as components.
Breaking changes:
- No more `as`, `className` nor `style` props
- `link` prop now is an object (based on the `Link` component props)
