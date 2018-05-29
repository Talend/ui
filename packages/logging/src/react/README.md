# React error logger

This module register a React updates hook that sends a log to an endpoint.

You need to configure 2 info
* the log server url
* the app state to send

## Configuration

You need to configure the logger in order to fit your backend logging service and add your app state.

```javascript
import React from 'react';
import { store as cmfstore } from '@talend/react-cmf';
import ErrorReporter from '@talend/log/lib/react';

const store = cmfstore.initialize(appReducer);

ReactDOM.render(
	<ErrorReporter
	    serverUrl={'http://localhost:8888/error'}
	    getState={store.getState}
	    processState={state => removeSensitiveData(state)}>
        <MyApp />
    </ErrorReporter>,
	document.getElementById('app')
);
```

You need to remove the user data from app state.
