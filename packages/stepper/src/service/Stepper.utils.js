import { LOADING_STEP_STATUSES } from '../Stepper.constants';

/**
 * This function return the key to point the loading step in the store
 * It's based on the resourceType / resourceId
 * internally usage only in the loading step service
 * @param {object} action redux action
 */
export const getStepperKey = action => `${action.resourceType}-${action.resourceId}`;

/**
 * This function tells if there is an error in the steps
 * @param {array} steps array of steps
 */
export const isErrorInSteps = steps =>
	!!steps.find(step => step.status === LOADING_STEP_STATUSES.FAILURE);

/**
 * This function tells if all the steps are successful
 * @param {array} steps array of steps
 */
export const isAllSuccessful = steps =>
	steps.filter(step => step.status === LOADING_STEP_STATUSES.SUCCESS).length === steps.length;

/**
 * This function tells if the loading is done, by an error, a success ot not started
 * @param {array} steps array of steps
 */
export const isStepsLoading = steps =>
	steps.length !== 0 && !isAllSuccessful(steps) && !isErrorInSteps(steps);
