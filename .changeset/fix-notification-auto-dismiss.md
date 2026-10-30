---
'@talend/react-containers': patch
---

Fix notifications remaining visible after expiration or manual dismissal by matching their stable identifier instead of object identity after Immutable state is converted for rendering.