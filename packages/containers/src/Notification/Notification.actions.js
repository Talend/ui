import Constants from './Notification.constants';

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
		type: Constants.TYPE_INFO,
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
		type: Constants.TYPE_WARNING,
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
		type: Constants.TYPE_ERROR,
	});
}
