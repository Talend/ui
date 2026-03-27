# Migration Guide: `@talend/react-cmf-cqrs` — Removal of ImmutableJS

**Version bump**: MAJOR

---

## What changed

`state.ack` is now a plain JavaScript object. The Immutable methods previously used to read/write acknowledgment state have been replaced with standard object operations.

Removed dependency: `immutable`.

---

## Breaking changes

### 1. `state.ack` is now a plain object

The ACK reducer now stores state as `{ [requestId]: { data, actionCreator, received } }` — a plain JS object keyed by `requestId`.

**Before**

```js
// state.ack was an Immutable.Map
const ackEntry = state.ack.getIn([requestId, 'data']);
const received = state.ack.getIn([requestId, 'received']);
const actionCreator = state.ack.getIn([requestId, 'actionCreator']);

// checking if an entry exists
const exists = state.ack.has(requestId);
```

**After**

```js
// state.ack is now a plain object: { [requestId]: { data, actionCreator, received } }
const ackEntry = state.ack[requestId]?.data;
const received = state.ack[requestId]?.received;
const actionCreator = state.ack[requestId]?.actionCreator;

// checking if an entry exists
const exists = requestId in state.ack;
```

---

### 2. `ACKDispatcher` — `acks` prop is a plain object

The `ACKDispatcher` component now iterates over `props.acks` using `Object.entries()`. Previously it was iterated as an Immutable-style iterable.

If you use `ACKDispatcher` through `cmfConnect` (the standard usage), this is handled automatically — `state.ack` is now a plain object and is passed as `acks` directly. **No action required** for this pattern.

If you pass `acks` **manually as a prop**, it must be a plain object:

```js
// Before — custom acks prop (Immutable)
import { Map } from 'immutable';
<ACKDispatcher
  acks={Map({
    'req-123': Map({ received: true, actionCreator: 'dataset:fetchAll', data: {} }),
  })}
/>

// After — custom acks prop (plain object)
<ACKDispatcher
  acks={{
    'req-123': { received: true, actionCreator: 'dataset:fetchAll', data: {} },
  }}
/>
```

---

### 3. Test fixtures

Tests that build mock ACK state with Immutable must be updated:

```js
// Before
import Immutable from 'immutable';
const state = {
	ack: Immutable.fromJS({
		'req-123': { received: false, data: null, actionCreator: 'dataset:fetch' },
	}),
};

// After
const state = {
	ack: {
		'req-123': { received: false, data: null, actionCreator: 'dataset:fetch' },
	},
};
```

---

## Checklist

- [ ] Replace `state.ack.getIn([requestId, 'key'])` → `state.ack[requestId]?.key`
- [ ] Replace `state.ack.has(requestId)` → `requestId in state.ack`
- [ ] Ensure manually-passed `acks` props are plain objects
- [ ] Update test fixtures to use plain objects instead of `Immutable.fromJS({...})`
- [ ] Remove `immutable` from your own `package.json` if transitively relied on
