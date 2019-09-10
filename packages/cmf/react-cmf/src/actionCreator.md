Action creator API
==

This API is used to register in cmf registry some action creators.
These action creators could be used then in your application to trigger some actions.
As we have dispatchers bounded with `cmfConnect` on our components, these action creators are easy to dispatch.

cmf.actionCreator.register
--
```javascript
import cmf from '@talend/react-cmf';

cmf.actionCreator.register('myAction', myActionCreator, context);
```

The `context` argument is optional.
It lets you provide a custom registry if you want.

This should be used only in your _configure.js_ file.

cmf.actionCreator.registerMany
--
```javascript
import cmf from '@talend/react-cmf';

cmf.actionCreator.registerMany(
    {
        'myAction1': myActionCreator1,
        'myAction2': myActionCreator2,
        'myAction3': myActionCreator3,
    }
    , context);
```

The `context` argument is also optional.
It lets you providing a custom registry if you want.

This should also be used only in your _configure.js_ file.

cmf.actionCreator.get
--

You can get an action creator defined in the registry with the `get` method.

```javascript
import cmf from '@talend/react-cmf';

cmf.actionCreator.get(context, 'actionCreatorID')
```

The `context` argument here is not optional.
It lets you provide the registry where the action is.
