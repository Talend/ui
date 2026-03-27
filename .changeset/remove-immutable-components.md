---
'@talend/react-components': major
---

feat: remove immutable dependency

## Breaking changes

The `Iterable.isIterable` backward-compat guard was removed from `ActionDropdown`. Consumers passing an Immutable List as `items` will no longer work — migrate to plain arrays.

`immutable` and `react-immutable-proptypes` removed from published `dependencies`.
