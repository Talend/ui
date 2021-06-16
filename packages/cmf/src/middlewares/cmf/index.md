# Middleware CMF

CMF middleware is loaded by default. It manages collections.

To let the CMF middleware manage your action, add a `cmf` configuration in your dispatched action.
```javascript
const action = {
    // action config
    ...
    cmf: {
        // cmf middleware config
    }
}
dispatch(action);
```

## Collections
```javascript
const action = {
    response: [{...}, ...], // the collection to store
    cmf: {
        collectionId: 'datastores' // the collection storage id
    }
}
dispatch(action);
```

By dispatching an action containing a `collectionId` and a `response`, CMF will store the collection in the app state with the path `state.cmf.collections.<collectionId>`.

Further information about managing collections is available [here](how-to-manage-collections.md).

