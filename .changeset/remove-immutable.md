---
'@talend/react-cmf': major
'@talend/react-containers': major
'@talend/react-cmf-cqrs': major
'@talend/react-components': major
'@talend/react-sagas': major
'@talend/react-stepper': patch
---

feat: remove immutable dependency

## Breaking changes

### `@talend/react-cmf` (major)

The CMF Redux store no longer uses ImmutableJS. `state.cmf.collections` and `state.cmf.components` are now plain objects.

Migrate:
- `.get(key)` → `[key]`
- `.getIn([a, b])` → `lodash.get(state, [a, b])`
- `.toJS()` → identity (already plain JS)
- `.size` → `Object.keys(x).length`

The `cmf.selectors.collections.*` and `cmf.selectors.components.*` APIs still work and are the recommended way to access CMF state.

### `@talend/react-containers` (major)

`defaultState` is now a plain object. Selectors updated accordingly. Same migration as above.

### `@talend/react-cmf-cqrs` (major)

`state.ack` is now a plain object. Consumers reading ack state directly must migrate `.get(key)` → `[key]`.

### `@talend/react-sagas` (major)

Exported functions `findPenders(state)` and `findPenderById(state, id)` now return plain JS values instead of Immutable structures. Any consumer calling `.get()`, `.set()`, `.toJS()`, or `.size` on the return values must migrate to plain object access.

### `@talend/react-components` (major)

The `Iterable.isIterable` backward-compat guard was removed from `ActionDropdown`. Consumers passing an Immutable List as `items` will no longer work — migrate to plain arrays.

`immutable` and `react-immutable-proptypes` removed from published `dependencies`.

