import Constants from './Notification.constant';

/**
 * Action to add a new notification
 * @param {Object} notification Notification to add
 * @returns {Object}
 */
// eslint-disable-next-line import/prefer-default-export
export function addGeneric(notification) {
	return {
		type: Constants.ADD_NOTIFICATION,
		notification,
	};
}
