# Migration Guide: `@talend/react-flow-designer` — Removal of ImmutableJS

**Version bump**: MAJOR

---

## What changed

`immutable` has been removed from `peerDependencies`. All internal data structures (nodes, edges, ports, links, flow state) that were previously Immutable Maps are now plain TypeScript objects.

Also removed from `dependencies`: `react-immutable-proptypes`.

---

## Breaking changes

### 1. `immutable` no longer a required peer dependency

You no longer need to install `immutable` as a peer dependency of your application when using `@talend/react-flow-designer`.

Remove it from your `package.json`:

```json
{
	"peerDependencies": {
		"immutable": "^3.0.0"
	}
}
```

Or if it was in `dependencies`:

```json
{
	"dependencies": {
		"immutable": "^3.8.2"
	}
}
```

> Only remove it if no other package in your project depends on it.

---

### 2. Internal data structures are now plain objects

If you worked with the internal flow state directly (e.g., by accessing nodes, ports, links, or flow data), these are now plain objects instead of `Immutable.Map`.

**Before**

```js
// nodes, ports, links were Immutable.Map
const node = flowState.nodes.get('nodeId');
const portType = flowState.nodes.getIn(['nodeId', 'portType']);
```

**After**

```js
// nodes, ports, links are plain objects
const node = flowState.nodes['nodeId'];
const portType = flowState.nodes['nodeId']?.portType;
```

If you construct flow state in tests or fixtures, replace Immutable structures with plain objects:

```js
// Before
import { Map } from 'immutable';
const flowState = {
	nodes: Map({ nodeId: { id: 'nodeId', type: 'default' } }),
	links: Map({ linkId: { id: 'linkId', linkType: 'type' } }),
};

// After
const flowState = {
	nodes: { nodeId: { id: 'nodeId', type: 'default' } },
	links: { linkId: { id: 'linkId', linkType: 'type' } },
};
```

---

## Checklist

- [ ] Remove `immutable` from `peerDependencies` (and `dependencies`) of your project if only referenced for flow-designer compatibility
- [ ] Replace `Map(...)` / `.get()` / `.getIn()` / `.set()` calls on flow node/port/link data with plain object access
- [ ] Update test fixtures that build flow state with Immutable structures to use plain objects
