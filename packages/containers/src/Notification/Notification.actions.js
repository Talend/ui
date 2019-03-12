import Constants from './Notification.constant';

/**
 * Action to push a generic notification
 * @param {Object} notification Notification to push
 * @returns {Object}
 */
export function pushGeneric(notification) {
	return {
		type: Constants.PUSH_NOTIFICATION,
		notification,
	};
}

/**
 * Action to specifically push an info notification
 * @param {Object} notification Notification to push
 * @returns {Object}
 */
export function pushInfo(notification) {
	return pushGeneric({
		...notification,
		type: 'info',
	});
}

/**
 * Action to specifically push a warning notification
 * @param {Object} notification Notification to push
 * @returns {Object}
 */
export function pushWarning(notification) {
	return pushGeneric({
		...notification,
		type: 'warning',
	});
}

/**
 * Action to specifically push an error notification
 * @param {Object} notification Notification to push
 * @returns {Object}
 */
export function pushError(notification) {
	return pushGeneric({
		...notification,
		type: 'error',
	});
}
