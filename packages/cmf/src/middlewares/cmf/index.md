# Middleware CMF

CMF middleware is loaded by default. It manages multiple features
* collections
* router

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

## Router

```javascript
const pushAction = {
    cmf: {
        routerPush: '/my/new/route'
    }
}
dispatch(pushAction);

...

const replaceAction = {
    cmf: {
        routerReplace: '/my/new/route'
    }
}
dispatch(replaceAction);
```

By dispatching an action, with routerReplace/routerPush, the middleware will convert the action to the [react-redux-router](https://github.com/reactjs/react-router-redux/blob/master/src/actions.js) format.
The value of routerReplace/routerPush can be a `function` that accepts the action and returns the new route.
