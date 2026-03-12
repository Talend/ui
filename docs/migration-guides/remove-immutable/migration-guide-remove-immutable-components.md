# Migration Guide: `@talend/react-components` — Removal of ImmutableJS

**Version bump**: MAJOR

---

## What changed

Two backward-compatibility guards for Immutable objects have been removed from `ActionDropdown`. Passing an Immutable `List` as the `items` prop will no longer work silently.

Removed published **dependencies**: `immutable`, `react-immutable-proptypes`. If your project relied on these being transitively available through this package, you must either add them explicitly to your own `package.json`, or — preferably — remove ImmutableJS from your codebase entirely.

---

## Breaking changes

### 1. `ActionDropdown` — Immutable List no longer accepted as `items`

Two guards have been removed:

- The `Iterable.isIterable(item)` check that automatically called `.toJS()` on each item.
- The `!items.size` empty-state check (`.size` is an Immutable property; plain arrays use `.length`).

**Before**

```js
import { List } from 'immutable';

<ActionDropdown
	label="Actions"
	items={List([
		{ label: 'Edit', onClick: handleEdit },
		{ divider: true },
		{ label: 'Delete', onClick: handleDelete },
	])}
/>;
```

**After**

```js
<ActionDropdown
	label="Actions"
	items={[
		{ label: 'Edit', onClick: handleEdit },
		{ divider: true },
		{ label: 'Delete', onClick: handleDelete },
	]}
/>
```

---

### 2. `ActionDropdown` — `items` prop type is now strictly an array

The `items` prop type definition has changed:

| Before                                                                 | After                                       |
| ---------------------------------------------------------------------- | ------------------------------------------- |
| `PropTypes.arrayOf(PropTypes.shape({...})) \| ImmutablePropTypes.list` | `PropTypes.arrayOf(PropTypes.shape({...}))` |

If you have PropTypes validation in your own code that mirrors the old definition, update it accordingly.

---

### 3. `immutable` and `react-immutable-proptypes` removed from `dependencies`

These packages are no longer listed as direct published dependencies of `@talend/react-components`. If you were relying on them being resolved transitively from this package:

1. **Add them explicitly** to your own `package.json` as a temporary bridge, **or**
2. **Remove all ImmutableJS usage** from your codebase (recommended path).

```bash
# Find all Immutable imports in your source
grep -r "from 'immutable'" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx"
grep -r "react-immutable-proptypes" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx"
```

---

## Checklist

- [ ] Replace Immutable `List` passed as `items` to `ActionDropdown` with a plain array `[...]`
- [ ] Update any PropTypes definitions that reference `ImmutablePropTypes.list` for `ActionDropdown.items`
- [ ] Audit for transitive use of `immutable` or `react-immutable-proptypes` coming from this package and add explicit dependencies or remove ImmutableJS usage
