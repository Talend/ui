---
'@talend/utils': minor
'@talend/react-components': patch
'@talend/design-system': patch
'@talend/react-forms': patch
---

Add a shared shallow React prop blocklist and use it for Action components, Icon consumers,
RichRadioButton assets, panel badges and form labels. Preserve ordinary props while excluding
HTML injection, content replacement, component substitution and prototype-related keys. Keep
context-specific exclusions and existing URL/SVG validation separate.
