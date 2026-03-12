import cmf from '@talend/react-cmf';

export default function clearNotifications(state) {
	const notifs = cmf.selectors.components.getComponentStateProperty(
		state,
		'Container(Notification)',
		'Notification',
		'notifications',
	);

	if (!notifs) {
		return state;
	}

	return {
		...state,
		cmf: {
			...state.cmf,
			components: {
				...state.cmf.components,
				'Container(Notification)': {
					...state.cmf.components?.['Container(Notification)'],
					Notification: {
						...state.cmf.components?.['Container(Notification)']?.Notification,
						notifications: [],
					},
				},
			},
		},
	};
}
