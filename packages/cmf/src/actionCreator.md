Action creator API
==

This api is used to register in cmf registry some action creators.
Theses action creator could be used then in your application to trigger some actions.
As we have dispatchers bounded with cmfConnect on our components, theses actions creators are easy to dispatch.

You can use this api this way :

api.actionCreator.register
--
```javascript
import { api } from '@talend/react-cmf';

api.actionCreator.register('myaction', myactionCreator, context);
```

The `context` argument is optional. It let you provide a custom registry if you want.

This should be used only in your configure.js file

api.actionCreator.registerMany
--
```javascript
import { api } from '@talend/react-cmf';

api.actionCreator.registerMany(
    {
        'myaction': myActionCreator,
        'myaction2': myActionCreator2,
        'myaction3': myActionCreator3,
    }
    , context);
```

The `context` argument is also optional. It let you provide a custom registry if you want.

This should also be used only in your configure.js file


api.actionCreator.get
--

You can get an action creator defined in the registry with the get method

```javascript
import { api } from '@talend/react-cmf';

api.actionCreator.get(context, 'actionCreatorID')
```

The `context` argument here is not optional. It let you provide the registry where the action is.
