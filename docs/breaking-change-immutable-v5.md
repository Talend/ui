# Breaking Changes: Immutable.js v5 Migration

This document covers the breaking changes introduced by the Immutable.js v5 migration
across the following packages:

- `@talend/react-cmf`
- `@talend/react-components`
- `@talend/react-containers`
- `@talend/react-flow-designer`
- `@talend/react-cmf-cqrs`
- `@talend/react-sagas`

---

## 1. Immutable.js upgraded from v3.8.2 to v5.x

The `immutable` peer dependency has been bumped to `^5.0.0`.

Immutable v5 ships significant performance improvements and API clean-ups relative to v3/v4.
Consumers must upgrade their own `immutable` dependency and review any private API usage.

**Action required:** Update your `package.json`:

```json
{
	"dependencies": {
		"immutable": "^5.0.0"
	}
}
```

---

## 2. Default import removed

The default export of `immutable` no longer exists in v5. Any code relying on the default
import will fail at runtime.

**Before:**

```js
import Immutable from 'immutable';

const map = Immutable.Map({ key: 'value' });
const list = Immutable.List([1, 2, 3]);
```

**After:**

```js
import { Map, List, fromJS, isImmutable } from 'immutable';

const map = Map({ key: 'value' });
const list = List([1, 2, 3]);
```

---

## 3. `Iterable` replaced by `isImmutable()`

`Immutable.Iterable` (and the `Iterable.isIterable()` helper) were removed in v5.
Use the top-level `isImmutable()` function to check whether a value is an Immutable
data structure.

**Before:**

```js
import Immutable from 'immutable';

if (Immutable.Iterable.isIterable(value)) {
	// ...
}
```

**After:**

```js
import { isImmutable } from 'immutable';

if (isImmutable(value)) {
	// ...
}
```

---

## 4. `react-immutable-proptypes` removed

The `react-immutable-proptypes` package has been removed from all affected packages.
Custom lightweight validators (provided internally) replace it.

If your application depends on `ImmutablePropTypes` from `react-immutable-proptypes`,
you must either:

- Remove the dependency and write plain PropTypes validators, **or**
- Keep `react-immutable-proptypes` as a direct dependency of your own package.

**Before (in your component):**

```js
import ImmutablePropTypes from 'react-immutable-proptypes';

MyComponent.propTypes = {
	items: ImmutablePropTypes.list.isRequired,
};
```

**After (example using plain PropTypes + isImmutable):**

```js
import PropTypes from 'prop-types';
import { isImmutable } from 'immutable';

MyComponent.propTypes = {
	items: (props, propName) => {
		if (!isImmutable(props[propName])) {
			return new Error(`${propName} must be an Immutable structure`);
		}
		return null;
	},
};
```

---

## 5. `OrderedMap` replaced by `Map`

Immutable v5's `Map` preserves insertion order by default, making `OrderedMap`
redundant. All internal usages of `OrderedMap` have been replaced with `Map`.

If your code uses `OrderedMap` directly from these packages' re-exports or expects
`OrderedMap` instances from props/state, switch to `Map`.

**Before:**

```js
import Immutable from 'immutable';

const ordered = Immutable.OrderedMap({ a: 1, b: 2 });
```

**After:**

```js
import { Map } from 'immutable';

const map = Map({ a: 1, b: 2 }); // insertion order preserved in v5
```

---

## Migration Summary

| Change           | v3 / v4                             | v5                                         |
| ---------------- | ----------------------------------- | ------------------------------------------ |
| Package import   | `import Immutable from 'immutable'` | `import { Map, List, … } from 'immutable'` |
| Iterable check   | `Immutable.Iterable.isIterable(x)`  | `isImmutable(x)`                           |
| Ordered map      | `OrderedMap({ … })`                 | `Map({ … })`                               |
| PropTypes        | `react-immutable-proptypes`         | Custom validators / plain PropTypes        |
| Peer dep version | `^3.8.2` or `^4.0.0`                | `^5.0.0`                                   |
