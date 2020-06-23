export default function clearNotifications(state) {
	const path = ['Container(Notification)', 'Notification', 'notifications'];
	let notifs = state.cmf.components.getIn(path);

	if (!notifs) {
		return state;
	}

	notifs = notifs.clear();
	const newState = { ...state };
	newState.cmf.components = state.cmf.components.setIn(path, notifs);
	return newState;
}
