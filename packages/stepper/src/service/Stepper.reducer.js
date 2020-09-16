import omit from 'lodash/omit';
import get from 'lodash/get';
import invariant from 'invariant';
import Stepper from '@talend/react-components/lib/Stepper';
import {
	LOADING_STEP_STATUSES,
	initialState,
	LOADING_STEPS_INIT,
	LOADING_STEPS_REMOVE,
	LOADING_STEPS_PROCEED_EVENT,
} from '../Stepper.constants';
import { getStepperKey } from './Stepper.utils';

const isInStepAttribute = (stepAttribute, value) =>
	(typeof stepAttribute === 'string' && stepAttribute === value) ||
	(Array.isArray(stepAttribute) && stepAttribute.includes(value));

const checkAttribute = attributeName => (step, event) =>
	isInStepAttribute(step[attributeName], event);

const isEventTriggerFail = checkAttribute('failureOn');
const isEventTriggerSuccess = checkAttribute('successOn');
const isEventTriggerLoading = checkAttribute('loadingOn');

function mapStepWithNoError(step, action) {
	if (isEventTriggerSuccess(step, action.event)) {
		return {
			...step,
			status: LOADING_STEP_STATUSES.SUCCESS,
		};
	}
	if (isEventTriggerLoading(step, action.event) && step.status !== LOADING_STEP_STATUSES.SUCCESS) {
		return {
			...step,
			status: LOADING_STEP_STATUSES.LOADING,
		};
	}
	return step;
}

function getNewStepsWithError(steps, action) {
	let errorHandled = false;
	return steps.map(step => {
		if (step.status !== LOADING_STEP_STATUSES.SUCCESS) {
			if (!errorHandled && isEventTriggerFail(step, action.event)) {
				errorHandled = true;
				return {
					...step,
					status: LOADING_STEP_STATUSES.FAILURE,
					message: action.message,
				};
			}
			return {
				...step,
				status: LOADING_STEP_STATUSES.ABORTED,
			};
		}
		return step;
	});
}

const hasAttribute = (step, attribute) =>
	step[attribute] || (Array.isArray(step[attribute]) && step[attribute].length > 0);

const hasStepFailure = step => hasAttribute(step, 'failureOn');
const hasStepSuccess = step => hasAttribute(step, 'successOn');
const hasStepLoading = step => hasAttribute(step, 'loadingOn');

/**
 * This function check & mutate the steps
 * @param {array} steps the loading steps
 */
function checkSteps(steps) {
	return steps.map(step => {
		if (!hasStepFailure(step)) {
			invariant(
				process.env.NODE_ENV === 'production',
				`Stepper : No failureOn step for ${step.label} step`,
			);
		}
		if (!hasStepSuccess(step)) {
			invariant(
				process.env.NODE_ENV === 'production',
				`Stepper : No successOn step for ${step.label} step`,
			);
		}
		if (!hasStepLoading(step) && !step.status) {
			invariant(
				process.env.NODE_ENV === 'production',
				`Stepper : No loadingOn step or initial status for ${step.label} step`,
			);
		}
		if (!step.status) {
			return { ...step, status: LOADING_STEP_STATUSES.PENDING };
		}
		return step;
	});
}

/**
 * This function change the status of the steps in order to reflect the event
 * @param {object} state redux state
 * @param {object} action the redux action
 */
function handleEvent(state, action) {
	const loadingKey = getStepperKey(action);
	const loadingResource = get(state, [loadingKey], {});
	const steps = get(loadingResource, 'steps', []);
	if (!Stepper.isStepsLoading(steps)) {
		return state;
	}
	const isErrorTriggered = !!steps.find(step => isInStepAttribute(step.failureOn, action.event));
	let newSteps;
	if (isErrorTriggered) {
		newSteps = getNewStepsWithError(steps, action);
	} else {
		newSteps = steps.map(step => mapStepWithNoError(step, action));
	}

	return {
		...state,
		[loadingKey]: { ...loadingResource, steps: newSteps },
	};
}

/**
 * This function is a classic reducer
 * It handle the Loading Steps of a resource
 * @param {object} state Redux state
 * @param {object} action Redux Action
 */
export default function stepperReducer(state = initialState, action) {
	switch (action.type) {
		case LOADING_STEPS_INIT:
			return { ...state, [getStepperKey(action)]: { steps: checkSteps(action.steps) } };
		case LOADING_STEPS_REMOVE:
			return omit(state, getStepperKey(action));
		case LOADING_STEPS_PROCEED_EVENT:
			return handleEvent(state, action);
		default:
			return state;
	}
}
