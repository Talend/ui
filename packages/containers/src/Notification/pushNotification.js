import get from 'lodash/get';
import cmf from '@talend/react-cmf';
import { randomUUID } from '@talend/utils';

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
	const notifs =
		cmf.selectors.components.getComponentStateProperty(
			state,
			'Container(Notification)',
			'Notification',
			'notifications',
		) || [];
	const newNotifs = [...notifs, { id: randomUUID(), ...notification }];
	const newState = {
		...state,
		cmf: {
			...state.cmf,
			components: {
				...state.cmf.components,
				'Container(Notification)': {
					...state.cmf.components?.['Container(Notification)'],
					Notification: {
						...state.cmf.components?.['Container(Notification)']?.Notification,
						notifications: newNotifs,
					},
				},
			},
		},
	};
	return newState;
}
