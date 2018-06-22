/**
 * @module react-cmf/lib/actions/componentsActions
 */
import curry from 'lodash/curry';
import CONSTANTS from '../constant';

// keep backward compatibility
export const { COMPONENT_ADD_STATE, COMPONENT_MERGE_STATE, COMPONENT_REMOVE_STATE } = CONSTANTS;

/**
 * add a new component state with optional initialComponentState to the store
 *
 * @param {string} componentName : name of the component
 * @param {string} key : identifier of state used by this component
 * @param {object} initialComponentState : initial state of the component if required
 *
 * @throw if a component with this componentName associated to this key already exist
 */
export function addState(componentName, key, initialComponentState) {
	return {
		type: CONSTANTS.COMPONENT_ADD_STATE,
		componentName,
		key,
		initialComponentState,
	};
}

/**
 * Merge new component state into actual component state in the store
 * curried function
 * @param {string} componentName : name of the component
 * @param {string} key : identifier of state used by this component
 * @param {object} componentState	: initial state of the component if required
 *
 * @throw if no componentName associated with this collectionId exist
 */
export const mergeState = curry((componentName, key, componentState) => ({
	type: CONSTANTS.COMPONENT_MERGE_STATE,
	componentName,
	key,
	componentState,
}));

/**
 * Remove component state from the store
 * curried function
 * @param {string} componentName : name of the component
 * @param {string} key	: identifier of collection used by the component
 *
 * @throw if no componentName associated with this collectionId exist
 */
export const removeState = curry((componentName, key) => ({
	type: CONSTANTS.COMPONENT_REMOVE_STATE,
	componentName,
	key,
}));

// backward compatbility
export const addComponentState = addState;
export const removeComponentState = removeState;
export const mergeComponentState = mergeState;
