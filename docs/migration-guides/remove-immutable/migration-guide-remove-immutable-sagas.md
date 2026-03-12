# Migration Guide: `@talend/react-sagas` — Removal of ImmutableJS

**Version bump**: MAJOR

---

## What changed

The exported functions `findPenders` and `findPenderById` now return plain JavaScript values instead of Immutable structures. The internal pending-collection management has been migrated from `Immutable.Map` to plain objects.

Removed dependency: `immutable`.

---

## Breaking changes

### 1. `findPenders(state)` returns a plain object

**Before**

```js
import { findPenders } from '@talend/react-sagas';

const penders = findPenders(state);
// penders was an Immutable.Map
const count = penders ? penders.size : 0;
const entry = penders ? penders.get(asyncActionId) : undefined;
```

**After**

```js
import { findPenders } from '@talend/react-sagas';

const penders = findPenders(state);
// penders is now a plain object or undefined
const count = penders ? Object.keys(penders).length : 0;
const entry = penders ? penders[asyncActionId] : undefined;
```

---

### 2. `findPenderById(state, asyncActionId)` returns a plain value

**Before**

```js
import { findPenderById } from '@talend/react-sagas';

const pender = findPenderById(state, asyncActionId);
// returned an Immutable value — callers that called .get(), .toJS(), etc.
```

**After**

```js
import { findPenderById } from '@talend/react-sagas';

const pender = findPenderById(state, asyncActionId);
// returns a plain JS value (string constant or undefined)
// e.g. 'SHOW_PENDING' or undefined
if (pender) {
	// show loading indicator
}
```

Remove any `.get()`, `.set()`, `.toJS()`, or `.size` calls on the return values.

---

### 3. Test fixtures using sagas state

If your tests construct a Redux state object with an Immutable pending collection:

```js
// Before
import Immutable from 'immutable';
const state = {
	cmf: {
		collections: Immutable.Map({
			__PENDING__: Immutable.Map({ 'action-id-1': 'SHOW_PENDING' }),
		}),
	},
};

// After
const state = {
	cmf: {
		collections: {
			__PENDING__: { 'action-id-1': 'SHOW_PENDING' },
		},
	},
};
```

---

## Checklist

- [ ] Replace `.size` → `Object.keys(penders).length` on `findPenders` return value
- [ ] Replace `.get(id)` → `penders[id]` on `findPenders` return value
- [ ] Remove `.toJS()` calls on `findPenders` / `findPenderById` return values
- [ ] Update test fixtures for the pending collection to plain objects
- [ ] Remove `immutable` from your own `package.json` if transitively relied on
