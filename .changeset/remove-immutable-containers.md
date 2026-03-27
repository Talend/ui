---
'@talend/react-containers': major
---

feat: remove immutable dependency

## Breaking changes

`defaultState` is now a plain object. Selectors updated accordingly.

Migrate:
- `.get(key)` → `[key]`
- `.getIn([a, b])` → `lodash.get(state, [a, b])`
- `.toJS()` → identity (already plain JS)
- `.size` → `Object.keys(x).length`
