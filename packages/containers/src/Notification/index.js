import objectId from 'bson-objectid';
import Notification from './Notification.connect';

Notification.push = function pushNotification(state, notification) {
	const path = ['Notification', 'Notification', 'notifications'];
	let notifs = state.cmf.components.getIn(path);
	notifs = notifs.push(Object.assign({
		id: objectId(),
	}, notification));
	const newState = Object.assign({}, state);
	newState.cmf.components = state.cmf.components.setIn(path, notifs);
	return newState;
};

export default Notification;
