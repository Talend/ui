---
'@talend/react-sagas': major
---

feat: remove immutable dependency

## Breaking changes

Exported functions `findPenders(state)` and `findPenderById(state, id)` now return plain JS values instead of Immutable structures. Any consumer calling `.get()`, `.set()`, `.toJS()`, or `.size` on the return values must migrate to plain object access.
