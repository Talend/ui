---
id: core-registry
title: Registry
---

The registry is a simple singleton that can store anything under a string key.
It is used internally to register `route components` and store `action creators`.

For more info, take a look at the complete [api](https://github.com/Talend/ui/tree/master/packages/cmf/src/registry.md).

## Register a component

Components registration should be done via the [bootstrap API](https://github.com/Talend/ui/tree/master/packages/cmf/src/bootstrap.md) using the key `components`.

```javascript
import cmf from '@talend/react-cmf';

cmf.bootstrap({
    //...
    components: {
        'App': App,
    },
})
```

## Register an action creator

Action creator registration should be done via the CMF [bootstrap API](https://github.com/Talend/ui/tree/master/packages/cmf/src/bootstrap.md) using the key `actionCreators`.

```javascript
import cmf from '@talend/react-cmf';
import fetchDataSets from './actions/dataset/fetchAll';

cmf.bootstrap({
    actionCreators: {
        'dataset:fetchAll': fetchDataSets,
    },
});
```
