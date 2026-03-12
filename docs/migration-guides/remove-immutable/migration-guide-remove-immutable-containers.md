# Migration Guide: `@talend/react-containers` — Removal of ImmutableJS

**Version bump**: MAJOR

---

## What changed

All shipped container components that used `new Immutable.Map({})` as `defaultState` have been migrated to plain objects `{}`. Component state is now accessed as a plain JavaScript object.

Removed published dependencies: `immutable`, `react-immutable-proptypes`.

---

## Breaking changes

### 1. `defaultState` is now a plain object in all containers

Every container that previously set `defaultState: new Map({...})` now uses `defaultState: {...}`.

**Before**

```js
import { Map } from 'immutable';

cmfConnect({
	defaultState: new Map({ expanded: false, loading: false }),
})(MyContainer);
```

**After**

```js
cmfConnect({
	defaultState: { expanded: false, loading: false },
})(MyContainer);
```

If you extend or override any shipped container's `defaultState`, make sure your overrides are also plain objects.

---

### 2. Component state access: `.get()` / `.set()` → plain property access

Any container component that reads or writes its CMF state via `this.props.state.get()` or `this.props.setState(s => s.set(...))` must be updated.

**Before**

```js
// reading
const expanded = this.props.state.get('expanded');
const loading = this.props.state.get('loading', false);

// writing
this.props.setState(({ state }) => state.set('expanded', !state.get('expanded')));
```

**After**

```js
// reading
const expanded = this.props.state?.expanded;
const loading = this.props.state?.loading ?? false;

// writing
this.props.setState(({ state }) => ({ expanded: !state?.expanded }));
```

---

### 3. `ActionDropdown` container — `items` prop type narrowed

The `items` prop in `containers/src/ActionDropdown` now only accepts `PropTypes.arrayOf(PropTypes.object)`. Passing `ImmutablePropTypes.list` is no longer supported.

```js
// Before
import { List } from 'immutable';
<ConnectedActionDropdown items={List([{ label: 'Edit', onClick: fn }])} />

// After
<ConnectedActionDropdown items={[{ label: 'Edit', onClick: fn }]} />
```

---

### 4. `AppLoader` — `hasCollections` check

The `AppLoader` container previously checked for collection existence using the Immutable `.has()` method. It now uses the `in` operator on the plain object.

This is an **internal change** — no API change is exposed. However, if you forked or extended `AppLoader.connect.jsx`, update:

```js
// Before
state.cmf.collections.has(collectionName);

// After
collectionName in state.cmf.collections;
```

---

### 5. `List` container selector — collection format

The `List` container's selector previously handled both Immutable.Map-wrapped collections (`Map({ items: [...] })`) and plain arrays. The Immutable path has been removed.

**Collections stored in CMF must now be either:**

- A plain array: `['item1', 'item2']`
- A plain object with an `items` key: `{ items: ['item1', 'item2'] }`

The selector uses `cmf.selectors.collections.getCollectionItems()` internally. No migration needed if your data was already plain JS; if your collection was an Immutable Map, replace it with a plain object.

---

### 6. `ComponentForm` — state access without Immutable methods

`ComponentForm` reads its state as a plain object. If you customized `ComponentForm` behavior and relied on the state being Immutable:

**Before**

```js
const jsonSchema = this.props.state.get('jsonSchema');
const properties = this.props.state.getIn(['initialState', 'properties']).toJS();
this.props.setState(prev => prev.state.set('dirty', false).set('jsonSchema', newSchema));
```

**After**

```js
const jsonSchema = this.props.state.jsonSchema;
const properties = this.props.state.initialState?.properties || {};
this.props.setState({
	dirty: false,
	jsonSchema: newSchema,
});
```

---

### 7. `toJS()` helper — identity function

The internal `toJS(immutableObject)` helper in `ComponentForm.selectors.js` now returns the object as-is (it was previously calling `.toJS()`). If you imported this helper, it still works but no longer performs any conversion.

---

### 8. Test fixtures

All test factories that created Immutable structures for `state.cmf.collections` or container `defaultState` must be updated:

```js
// Before
import Immutable from 'immutable';
const state = { cmf: { collections: Immutable.Map() } };

// After
const state = { cmf: { collections: {} } };
```

---

## Checklist

- [ ] Update `defaultState: new Map({...})` → `defaultState: {...}` in all `cmfConnect` containers
- [ ] Replace `this.props.state.get('key')` → `this.props.state?.key`
- [ ] Replace `this.props.setState(s => s.set('k', v))` → `this.props.setState({ k: v })`
- [ ] Ensure `items` props passed to `ActionDropdown` are plain arrays, not Immutable Lists
- [ ] Ensure collection data stored via CMF is a plain array or `{ items: [...] }` object
- [ ] Update test fixtures to use plain objects instead of `Immutable.Map()` / `Immutable.List()`
- [ ] Remove `immutable` and `react-immutable-proptypes` from your own `package.json` if transitively relied on
