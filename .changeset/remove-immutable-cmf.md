---
'@talend/react-cmf': major
---

feat: remove immutable dependency

## Breaking changes

The CMF Redux store no longer uses ImmutableJS. `state.cmf.collections` and `state.cmf.components` are now plain objects.

Migrate:
- `.get(key)` → `[key]`
- `.getIn([a, b])` → `lodash.get(state, [a, b])`
- `.toJS()` → identity (already plain JS)
- `.size` → `Object.keys(x).length`

The `cmf.selectors.collections.*` and `cmf.selectors.components.*` APIs still work and are the recommended way to access CMF state.
