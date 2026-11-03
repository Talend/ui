---
'@talend/design-system': patch
---

fix(SSO-2658): reject unsafe href schemes in design-system Linkable

`Linkable` (and so `Link`, `Breadcrumbs`, `Dropdown` links, ...) no longer renders an `href` whose scheme is not http(s) (e.g. `javascript:`, `data:`, `vbscript:`). Such values are dropped. Relative urls and anchors are still rendered.
