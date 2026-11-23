---
'@talend/react-components': patch
---

Reject over-length text with a `DATETIME_INVALID_FORMAT` error before any regular expression runs in the legacy DateTime picker, including in `hybridMode`.
