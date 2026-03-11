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
function initStepper(resourceType, resourceId, steps = []) {
	checkResourceParameters(resourceType, resourceId);
	return {
		type: LOADING_STEPS_INIT,
		resourceType,
		resourceId,
		steps,
	};
}
function proceedLoadingEvent(resourceType, resourceId, event, messageLabel) {
	checkResourceParameters(resourceType, resourceId);
	return {
		type: LOADING_STEPS_PROCEED_EVENT,
		resourceType,
		resourceId,
		event,
		message: { label: messageLabel },
	};
}
function removeStepper(resourceType, resourceId) {
	checkResourceParameters(resourceType, resourceId);
	return {
		type: LOADING_STEPS_REMOVE,
		resourceType,
		resourceId,
	};
}
export { initStepper, proceedLoadingEvent, removeStepper };
//# sourceMappingURL=Stepper.actions.js.map
