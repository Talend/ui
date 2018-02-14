import get from 'lodash/get';
import objectId from 'bson-objectid';
import invariant from 'invariant';

export default function pushNotification(state, notification) {
	if (!get(notification, 'message')) {
		return state;
	}
	const path = ['Container(Notification)', 'Notification', 'notifications'];
	let notifs = state.cmf.components.getIn(path);
	if (!notifs) {
		invariant(true, 'Notifications are not yet available.', notification);
		return state;
	}
	notifs = notifs.push(
		Object.assign(
			{
				id: objectId(),
			},
			notification,
		),
	);
	const newState = Object.assign({}, state);
	newState.cmf.components = state.cmf.components.setIn(path, notifs);
	return newState;
}
