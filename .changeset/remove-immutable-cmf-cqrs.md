---
'@talend/react-cmf-cqrs': major
---

feat: remove immutable dependency

## Breaking changes

`state.ack` is now a plain object. Consumers reading ack state directly must migrate `.get(key)` → `[key]`.
