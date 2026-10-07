---
'@talend/react-cmf-router': patch
---

Fix `history.push`/`history.replace` throwing (`Cannot read properties of undefined (reading 'charAt')`) when called with a location object that has no `pathname` (e.g. `history.push({})`) while a `basename` is configured. `prependBasename` now treats a missing/non-string `pathname` as an empty string instead of assuming it is always a string.
