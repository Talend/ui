/**
 * This function returns the key to point the loading step in the store
 * It's based on the resourceType / resourceId
 * internally usage only in the loading step service
 * @param {object} action redux action
 */
// eslint-disable-next-line
export const getStepperKey = action => `${action.resourceType}-${action.resourceId}`;
