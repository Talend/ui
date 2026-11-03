---
'@talend/react-forms': patch
'@talend/design-system': patch
---

fix(SSO-2658): reject object hint.icon cloned as React element in forms

- forms: only a string `hint.icon` is forwarded to the hint `ButtonIcon`, any other type falls back to the default `talend-info-circle` icon
- design-system: `getIconWithDeprecatedSupport` renders a non-string icon only when it is a valid React element
