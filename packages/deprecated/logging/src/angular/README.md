# Angular error logger

This module register an errorHandler that sends a log to an endpoint.

You need to configure 2 info
* the log server url
* the app state to send

## Usage

```bash
yarn add --save @talend/log
```

```javascript
import talendErrorLogger from '@talend/log/lib/angular';

const app = angular
	.module(MODULE_NAME, [talendErrorLogger]);
```

This will register the logger. But if an error occurs, this will not send anything but you will have an error in console
```
Talend error logger is not configured
```

To configure it, please refer to the next section.

## Configuration

You need to configure the logger in order to fit your backend logging service and add your app state.

```javascript
app
    .run((talendLoggerConfiguration, state) => {
        'ngInject';

        talendLoggerConfiguration.init({
            serverUrl: 'http://localhost:8888/error',
            getState: () => state,
            processState: state => removeSensitiveData(state),
        });
    });
```

You need to remove the user data from app state.