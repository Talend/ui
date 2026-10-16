---
'@talend/react-cmf-router': patch
---

fix(cmf-router): routerPush / routerReplace and the wrapped history now refuse targets with a scheme (javascript:, https:...) or protocol-relative (//host), only in-app paths are navigated
