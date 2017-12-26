# Redux error logger middleware

This module register a Redux middleware that sends a log to an endpoint.

This is meant to be used with react logger (see [documentation](../react/README.md)).

## Configuration

You need to configure the logger in order to fit your backend logging service and add your app state.

```javascript
import { createStore, applyMiddleware } from 'redux';
import initReactLogger from '@talend/log/lib/react';
import tLoggerMiddleware from '@talend/log/lib/redux';

const store = createStore(
    reducers,
    undefined,
    applyMiddleware(tLoggerMiddleware)
)

initReactLogger({
    serverUrl: 'http://localhost:8888/error',
    getState: () => store.getState(),
    processState: state => removeSensitiveData(state),
});
```

You need to remove the user data from app state.
