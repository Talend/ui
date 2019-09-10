---
id: package-redux
title: Integration of redux
sidebar_label: redux
---

[Redux](https://redux.js.org/) is a very well known addon. Be sure to have read the doc before continue.

Please read this blog post first: https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367

So yes redux can be hard to use with a lots of boilerplate.
This is why we bring redux with some reducers charged in it (state.cmf.*):

* collections
* components
* settings

The first two reducers comes with their actions to propose an API to control them. The main idea is collections is a cache for http response and components is drop in replacement of the component's state&setState API bound to redux.

So you can write down your app without writing one reducer if you want.

For sure this violate one purpose where app design it s store without components in mind.

This shortcut doesn't mean you must use only this API but means it's here for simple needs.

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
