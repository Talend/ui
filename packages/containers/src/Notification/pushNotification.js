import get from 'lodash/get';
import objectId from 'bson-objectid';
import invariant from 'invariant';
import Immutable from 'immutable';

/**
 * transform the APP state to push notification into the Notification component state slot on redux
 * even if this component is not already mounted.
 * @param {state} state
 * @param {*} notification
 * @returns {state}
 */
export default function pushNotification(state, notification) {
	if (!get(notification, 'message')) {
		return state;
	}
	const path = ['Container(Notification)', 'Notification', 'notifications'];
	let notifs = state.cmf.components.getIn(path, new Immutable.List());
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
