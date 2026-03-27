# Migration Guide: Removal of ImmutableJS

This is the index for per-package migration guides covering the breaking changes introduced by the removal of [ImmutableJS](https://immutable-js.com/) from the Talend UI monorepo.

## Affected packages

| Package                    | Version bump | Guide                                                                                                               |
| -------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------- |
| `@talend/react-cmf`        | **MAJOR**    | [migration-guide-remove-immutable-cmf.md](./remove-immutable/migration-guide-remove-immutable-cmf.md)               |
| `@talend/react-containers` | **MAJOR**    | [migration-guide-remove-immutable-containers.md](./remove-immutable/migration-guide-remove-immutable-containers.md) |
| `@talend/react-cmf-cqrs`   | **MAJOR**    | [migration-guide-remove-immutable-cmf-cqrs.md](./remove-immutable/migration-guide-remove-immutable-cmf-cqrs.md)     |
| `@talend/react-sagas`      | **MAJOR**    | [migration-guide-remove-immutable-sagas.md](./remove-immutable/migration-guide-remove-immutable-sagas.md)           |
| `@talend/react-components` | **MAJOR**    | [migration-guide-remove-immutable-components.md](./remove-immutable/migration-guide-remove-immutable-components.md) |
| `@talend/react-stepper`    | patch        | [migration-guide-remove-immutable-stepper.md](./remove-immutable/migration-guide-remove-immutable-stepper.md)       |

---

## Quick reference: ImmutableJS → Plain JS

| ImmutableJS              | Plain JS                                                   |
| ------------------------ | ---------------------------------------------------------- |
| `map.get(key)`           | `obj[key]`                                                 |
| `map.getIn([a, b, c])`   | `lodash.get(obj, [a, b, c])`                               |
| `map.set(key, val)`      | `{ ...obj, [key]: val }`                                   |
| `map.setIn([a, b], val)` | `produce(obj, d => set(d, [a, b], val))` (immer + lodash)  |
| `map.merge(other)`       | `{ ...obj, ...other }`                                     |
| `map.delete(key)`        | `const { [key]: _, ...rest } = obj; return rest;`          |
| `map.has(key)`           | `key in obj`                                               |
| `list.push(item)`        | `[...arr, item]`                                           |
| `list.filter(fn)`        | `arr.filter(fn)`                                           |
| `list.filterNot(fn)`     | `arr.filter(item => !fn(item))`                            |
| `list.find(fn)`          | `arr.find(fn)`                                             |
| `list.includes(val)`     | `arr.includes(val)`                                        |
| `Map.isMap(x)`           | `typeof x === 'object' && x !== null && !Array.isArray(x)` |
| `List.isList(x)`         | `Array.isArray(x)`                                         |
| `Iterable.isIterable(x)` | N/A — remove the guard                                     |
| `fromJS(obj)`            | `obj` (already plain)                                      |
| `x.toJS()`               | `x` (already plain)                                        |
| `x.size`                 | `Array.isArray(x) ? x.length : Object.keys(x).length`      |

## Useful grep patterns

```bash
# Find all Immutable imports
grep -r "from 'immutable'" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx"

# Find react-immutable-proptypes usage
grep -r "react-immutable-proptypes" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx"

# Find residual Immutable method calls
grep -rE "\.(getIn|setIn|toJS|fromJS|isMap|isList|isIterable)\(" src/
```
