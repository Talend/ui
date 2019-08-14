import {
	LOADING_STEPS_INIT,
	LOADING_STEPS_PROCEED_EVENT,
	LOADING_STEPS_REMOVE,
} from '../Stepper.constants';

function checkResourceParameters(resourceType, resourceId) {
	if (!resourceType) {
		throw new Error('Stepper Reducer : resourceType should be present in the action');
	}
	if (!resourceId) {
		throw new Error('Stepper Reducer : resourceId should be present in the action');
	}
}

/**
 * This function init the store for some loading steps component
 * @param {string} resourceType the resource type we load
 * @param {string} resourceId the id of the resource we load
 * @param {array} steps the steps we have to load
 */
export function initStepper(resourceType, resourceId, steps = []) {
	checkResourceParameters(resourceType, resourceId);
	return {
		type: LOADING_STEPS_INIT,
		resourceType,
		resourceId,
		steps,
	};
}

/**
 * This function generate an action to tell the loading that we have
 * intercept some event to proceed in the loading process
 * @param {string} resourceType the resource type we load
 * @param {string} resourceId the id of the resource we load
 * @param {string} event event catch
 */
export function proceedLoadingEvent(resourceType, resourceId, event, messageLabel) {
	checkResourceParameters(resourceType, resourceId);
	return {
		type: LOADING_STEPS_PROCEED_EVENT,
		resourceType,
		resourceId,
		event,
		message: { label: messageLabel },
	};
}

/**
 * This function return an action to remove a loading from the store
 * @param {string} resourceType the resource type we load
 * @param {string} resourceId the id of the resource we load
 */
export function removeStepper(resourceType, resourceId) {
	checkResourceParameters(resourceType, resourceId);
	return {
		type: LOADING_STEPS_REMOVE,
		resourceType,
		resourceId,
	};
}
