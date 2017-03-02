import objectId from 'bson-objectid';

export default function pushNotification(state, notification) {
	if (!notification.message) {
		return state;
	}
	const path = ['Notification', 'Notification', 'notifications'];
	let notifs = state.cmf.components.getIn(path);
	notifs = notifs.push(Object.assign({
		id: objectId(),
	}, notification));
	const newState = Object.assign({}, state);
	newState.cmf.components = state.cmf.components.setIn(path, notifs);
	return newState;
}
