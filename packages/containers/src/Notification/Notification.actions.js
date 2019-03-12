import Constants from './Notification.constant';

/**
 * Action to add a generic notification
 * @param {Object} notification Notification to add
 * @returns {Object}
 */
export function addGeneric(notification) {
	return {
		type: Constants.ADD_NOTIFICATION,
		notification,
	};
}

/**
 * Action to specifically add an info notification
 * @param {Object} notification Notification to add
 * @returns {Object}
 */
export function addInfo(notification) {
	return addGeneric({
		...notification,
		type: 'info',
	});
}

/**
 * Action to specifically add a warning notification
 * @param {Object} notification Notification to add
 * @returns {Object}
 */
export function addWarning(notification) {
	return addGeneric({
		...notification,
		type: 'warning',
	});
}

/**
 * Action to specifically add a error notification
 * @param {Object} notification Notification to add
 * @returns {Object}
 */
export function addError(notification) {
	return addGeneric({
		...notification,
		type: 'error',
	});
}
