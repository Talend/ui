# React error logger

This module register a React updates hook that sends a log to an endpoint.

You need to configure 2 info
* the log server url
* the app state to send

## Configuration

You need to configure the logger in order to fit your backend logging service and add your app state.

```javascript
import { store as cmfstore } from '@talend/react-cmf';
import initReactLogger from '@talend/log/lib/react';

const store = cmfstore.initialize(appReducer);
initReactLogger({
    serverUrl: 'http://localhost:8888/error',
    getState: () => store.getState(),
    processState: state => removeSensitiveData(state),
});

```

You need to remove the user data from app state.
