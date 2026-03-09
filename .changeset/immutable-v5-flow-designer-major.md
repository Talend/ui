---
'@talend/react-flow-designer': major
---

Upgrade Immutable.js to v5

## Breaking Changes

- **Immutable.js upgraded from v3.8.2 to v5.x**: Consumers depending on Immutable v3 or v4 APIs must update accordingly.
- **Default import removed**: `import Immutable from 'immutable'` is no longer supported. Use named imports instead (e.g., `import { Map, List, fromJS, isImmutable } from 'immutable'`). Reducers (link, node, port) and renderers (LinksRenderer, NodesRenderer, PortsRenderer) have been updated accordingly.
- **`Iterable` removed**: Replace `Immutable.Iterable` checks with `isImmutable()` from `immutable`.
- **`react-immutable-proptypes` removed**: Custom internal validators replace `ImmutablePropTypes`. No peer-dep on `react-immutable-proptypes` anymore.
- **`OrderedMap` → `Map`**: `Map` in Immutable v5 preserves insertion order, making `OrderedMap` redundant. All internal usage has been updated.

See the [migration guide](../docs/breaking-change-immutable-v5.md) for full details and upgrade instructions.
