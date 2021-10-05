---
id: package-saga
title: Integration of redux-saga
sidebar_label: saga
---


[redux-saga](http://redux-saga.js.org) is integrated in CMF core. Be sure to have read the doc before contine.

## Getting started

Ready to write some sagas ? We have integrated multiple levels of sagas in CMF:

| bootstrap key | type | spawn and cancelled by | description |
| -- | -- | -- | -- |
| `saga` | generator | redux middleware |  the main saga always available ! |
| `sagas` | object{key: generator} | component lifecycle  | let you manage effect at component level with the props.saga |
| `sagaRouter` | object{key: generator} | route change action | let you manage per route side effects |

```javascript
import cmf from '@talend/react-cmf';

// == should be in dedicated files
function* mainSaga() {
    yield takeEvery('MY_ACTION', alwaysDoEffect);
}

function* onDidMount(action) {
    const componentId = action.componentId;
    yield takeEvery('MY_COMP_ACTION', DoEffectOnlyIfSameId, componentId);
}

function onRoute() {
    yield takeEvery('MY_ROUTE_ACTION', DoEffectOnlyIfRoute);
}
// ==

cmf.bootstrap({
    saga,
    sagas: {
        'MyComponent#id': onDidMount,
    },
    sagaRouterConfig: {
        '/foo/bar': onRoute,
    },
});
```

[http and component sagas API](https://github.com/Talend/ui/tree/master/packages/cmf/src/sagas/index.md) are detailed here.
