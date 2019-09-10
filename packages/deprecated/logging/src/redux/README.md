# Redux error logger middleware

This module register a Redux middleware that sends a log to an endpoint.

You need to configure the logger, depending on the framework you use
* angularjs logger [documentation](../angular/README.md)
* react logger [documentation](../react/README.md)

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

// React init example using the freshly created store 
initReactLogger({
    serverUrl: 'http://localhost:8888/error',
    getState: () => store.getState(),
    processState: state => removeSensitiveData(state),
});
```

**You need to notice** that
* user data must be removed from app state.
* the logger middleware should be added as first middleware, so it catches the errors potentially thrown by other middlewares.
