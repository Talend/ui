---
id: howto-configure-redux
title: How to configure redux
sidebar_label: configure redux
---

CMF uses [redux](http://redux.js.org/)

## Initialise the store

```javascript
import cmf from '@talend/react-cmf';
import reducer from './reducers';

function onStore(store) {
    // do what you want on it.
    store.dispatch({
        type: 'REDUX)_READY',
    });
}

cmf.bootstrap({
    reducer,
    //preReducer,
    //enhancer,
    //middlewares,
    //preloadedState,
    storeCallback: onStore,
});
```

Be sure to have read [bootstrap API](https://github.com/Talend/ui/tree/master/packages/cmf/src/bootstrap.md)

## Reducers

The CMF store comes with some reducers out of the box

* router reducer from [react-router-redux](https://github.com/reactjs/react-router-redux)
* CMF internal reducer (settings, ...)


## Middlewares

The CMF store comes with some middlewares out of the box

* router middleware from [react-router-redux](https://github.com/reactjs/react-router-redux) using `hash` history
* [redux-thunk](https://github.com/gaearon/redux-thunk)
* CMF [http](https://github.com/Talend/ui/tree/master/packages/cmf/src/middlewares/http/index.md) middleware
* CMF [internal](https://github.com/Talend/ui/tree/master/packages/cmf/src/middlewares/cmf/index.md) middleware

**How to use a different history for the router middleware ?**

You just have to pass the history to use to the bootstrap API.

```javascript
import cmf from 'react-cmf';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

cmf.bootstrap({
    //...
    history: browserHistory,
});
```
