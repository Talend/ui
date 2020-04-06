import { LOADING_STEP_STATUSES } from '../Stepper.constants';

/**
 * This function returns the key to point the loading step in the store
 * It's based on the resourceType / resourceId
 * internally usage only in the loading step service
 * @param {object} action redux action
 */
export const getStepperKey = action => `${action.resourceType}-${action.resourceId}`;
