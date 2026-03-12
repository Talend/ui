# Migration Guide: `@talend/react-cmf` — Removal of ImmutableJS

**Version bump**: MAJOR

---

## What changed

The CMF Redux store no longer uses ImmutableJS. Both `state.cmf.collections` and `state.cmf.components` are now plain JavaScript objects.

Removed published dependencies: `immutable`, `react-immutable-proptypes`.

---

## Breaking changes

### 1. `state.cmf.collections` is now a plain object

**Before**

```js
// Immutable.Map
const items = state.cmf.collections.get('myCollection');
const nested = state.cmf.collections.getIn(['myCollection', 'subKey']);
const all = state.cmf.collections.toJS();
const count = state.cmf.collections.size;
const exists = state.cmf.collections.has('myCollection');
```

**After**

```js
// Plain object {}
const items = state.cmf.collections['myCollection'];

import _get from 'lodash/get';
const nested = _get(state.cmf.collections, ['myCollection', 'subKey']);

const all = state.cmf.collections; // already plain, no-op
const count = Object.keys(state.cmf.collections).length;
const exists = 'myCollection' in state.cmf.collections;
```

**Recommended**: use the CMF selector API instead of direct access (see [New selectors](#3-new-selectors-added)).

---

### 2. `state.cmf.components` is now a plain object

**Before**

```js
// Immutable.Map (via fromJS)
const componentState = state.cmf.components.getIn(['MyComponent', 'default'])?.toJS();
```

**After**

```js
// Plain object
const componentState = state.cmf.components?.['MyComponent']?.['default'];
```

**Recommended**: use `cmf.selectors.components.*` (see [New selectors](#3-new-selectors-added)).

---

### 3. New selectors added

This release adds new selectors to `cmf.selectors.collections` and introduces `cmf.selectors.components` for the first time.

#### Collections selectors (new additions)

```js
import cmf from '@talend/react-cmf';

// Get a collection as a plain value (object or array); returns undefined if absent
const raw = cmf.selectors.collections.getCollectionPlain(state, 'myCollection');

// Get the items array from a collection — handles both direct-array and
// Map-wrapped { items: [] } forms; returns undefined if absent
const items = cmf.selectors.collections.getCollectionItems(state, 'myCollection');

// Find an item in a collection by its `id` field; returns plain object or undefined
const found = cmf.selectors.collections.getCollectionItem(state, 'myCollection', itemId);
```

Pre-existing collections selectors still work unchanged:

```js
cmf.selectors.collections.get(state, 'myCollection');
cmf.selectors.collections.get(state, ['my', 'nested', 'path']);
cmf.selectors.collections.findListItem(state, 'myCollection', itemId);
cmf.selectors.collections.getAll(state);
```

> **Note**: `findListItem` now expects a plain array in the store. Passing an
> Immutable.List here will throw a type-mismatch error.

#### Components selectors (new)

```js
import cmf from '@talend/react-cmf';

// Get state of one component instance
const compState = cmf.selectors.components.getComponentState(state, 'MyComponent', 'default');

// Get all instances of a component
const allInstances = cmf.selectors.components.getAllComponentStates(state, 'MyComponent');

// Get a single property with a default value
const expanded = cmf.selectors.components.getComponentStateProperty(
	state,
	'MyComponent',
	'default',
	'expanded',
	false,
);
```

---

### 4. `cmfConnect` prop types changed

The `state` and `initialState` props injected by `cmfConnect` no longer accept Immutable objects.

| Prop           | Before                                       | After              |
| -------------- | -------------------------------------------- | ------------------ |
| `state`        | `ImmutablePropTypes.map`                     | `PropTypes.object` |
| `initialState` | `ImmutablePropTypes.map \| PropTypes.object` | `PropTypes.object` |

If your component used `this.props.state.get('key')` or `this.props.state.toJS()`, migrate:

```js
// Before
const expanded = this.props.state.get('expanded');
this.props.setState(({ state }) => state.set('expanded', true));

// After
const expanded = this.props.state?.expanded;
this.props.setState({ expanded: true });
```

If you used `spreadCMFState`, the internal `.toJS()` call is gone — the spread now works directly on the plain state object.

---

### 5. `defaultState` in `cmfConnect`

If you were using `new Map({})` as `defaultState`, migrate to a plain object:

```js
// Before
import { Map } from 'immutable';
cmfConnect({ defaultState: new Map({ expanded: false }) })(MyComponent);

// After
cmfConnect({ defaultState: { expanded: false } })(MyComponent);
```

---

### 6. `mock.store.getState()` returns plain objects

If your tests call `.get()`, `.getIn()`, or `.toJS()` on the mock store collections or components, update them:

```js
// Before
const state = mock.store.getState();
state.cmf.collections.get('myCollection'); // Immutable.Map

// After
state.cmf.collections['myCollection']; // plain object
```

---

### 7. localStorage hydration

If you previously called `Immutable.fromJS(storedState)` when hydrating Redux state from `localStorage`, remove that call. The data from `JSON.parse` is already a plain object — exactly what the store now expects.

```js
// Before
const hydrated = Immutable.fromJS(JSON.parse(localStorage.getItem('state')));

// After
const hydrated = JSON.parse(localStorage.getItem('state'));
```

---

### 8. `selectors.toJS` — no-op wrapper kept for backward compatibility

`cmf.selectors.collections.toJS(state, path)` is retained for backward compatibility and memoization. It no longer calls `.toJS()` internally because the store is already plain JS. No migration needed if you were calling it — it still returns the same value.

---

## Checklist

- [ ] Replace all `.get('key')` / `.getIn([...])` calls on `state.cmf.collections` / `state.cmf.components` with plain object access or CMF selectors
- [ ] Replace `.toJS()` calls with identity (already plain JS)
- [ ] Update `.size` → `Object.keys(x).length` or `Array.isArray(x) ? x.length : Object.keys(x).length`
- [ ] Update `.has(key)` → `key in obj`
- [ ] Migrate `defaultState: new Map({...})` → `defaultState: {...}`
- [ ] Update `this.props.state.get('key')` → `this.props.state?.key` in cmfConnect components
- [ ] Update `this.props.setState(s => s.set('k', v))` → `this.props.setState({ k: v })`
- [ ] Update `mock.store.getState()` usages in tests
- [ ] Remove `Immutable.fromJS(...)` from localStorage hydration if present
- [ ] Remove `immutable` and `react-immutable-proptypes` from your own `package.json` if you relied on them transitively
