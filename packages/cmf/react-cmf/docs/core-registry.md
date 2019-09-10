---
id: core-registry
title: Registry
---

The registry is a simple singleton that can store anything under a string key.
It is used internally to register `route components` and store `action creators`.

## Register a component

Components registration should be done via the [bootstrap API](https://github.com/Talend/ui/tree/master/packages/cmf/src/bootstrap.md) using the key `components`.

```javascript
import cmf from '@talend/react-cmf';

cmf.bootstrap({
    //...
    components: {
        'MyButton': MyButton,
    },
})
```

Then to use it in your App you have many choices:

Using Inject which is a DI for component:

```javascript
import { Inject } from '@talend/react-cmf';

function MyComponent(props) {
    return (
        <div>
            <Inject component="MyButton" />
        </div>
    );
}
```

Using low level API

```javascript
import cmf from '@talend/react-cmf';

function myStuff() {
    const MyButton = cmf.component.get('MyComponent');
}
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

Then you can as usual you have the two ways to use it:

The high level API:

```javascript
import { cmfConnect } from '@talend/react-cmf';

function MyButton(props) {
    return (
        <button
            onClick={event=> props.dispatchActionCreator(
                'dataset:fetchAll',
                event, { value: props.value }
            )}
        >
            Click me
        </button>
    );
}
export default cmfConnect({
    withDispatchActionCreator: true,
});
```
