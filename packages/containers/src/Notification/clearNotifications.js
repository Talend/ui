import cmf from '@talend/react-cmf';

export default function clearNotifications(state) {
	const path = ['Container(Notification)', 'Notification', 'notifications'];
	const notifs = cmf.selectors.components.getComponentStateProperty(
		state,
		'Container(Notification)',
		'Notification',
		'notifications',
	);

	if (!notifs) {
		return state;
	}

	const newState = { ...state };
	newState.cmf.components = state.cmf.components.setIn(path, []);
	return newState;
}
