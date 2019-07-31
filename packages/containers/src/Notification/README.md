# Notification container

The notification container is expected to be used with only one instance which will handle all the notifications.

The default componentId (`Notification`) is internally used with all the utils, so it's preferable not to define another one.

## Usage

### Application initialization

Initialize the application with the container at the top of the tree.

For example:

```javascript
import { Notification } from '@talend/react-containers';

function App(props) {
	const { children } = props;

	return (
		<React.Fragment>
			<IconsProvider />
			<Notification />
			{children}
		</React.Fragment>
	);
}
```

### Push notifications

After the initialization, you can directly dispatch actions to push notifications via the action creators utils :

For example in a saga :

```javascript
import { Notification } from '@talend/react-containers';
import { put } from 'redux-saga/effects';

export function* mySaga() {
	const notification = {
		message: 'The notification message',
	};
	const pushNotificationAction = Notification.actionCreators.pushInfo(notification);
	yield put(pushNotificationAction);
}
```

Available action creators which all take a `notification` argument :

- `pushInfo` (forced 'info' notification type)
- `pushWarning` (forced 'warning' notification type)
- `pushError` (forced 'error' notification type)
- `pushGeneric` (allow giving a dynamic notification type)

---

See the `Notification` component documentation for the `notification` argument format.
