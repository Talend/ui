/**
 * @module react-cmf/lib/actions/componentsActions
 */
export const COMPONENT_ADD_STATE = 'REACT_CMF.COMPONENT_ADD_STATE';
export const COMPONENT_MERGE_STATE = 'REACT_CMF.COMPONENT_MERGE_STATE';
export const COMPONENT_REMOVE_STATE = 'REACT_CMF.COMPONENT_REMOVE_STATE';

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
		type: COMPONENT_ADD_STATE,
		componentName,
		key,
		initialComponentState,
	};
}

/**
 * Merge new component state into actual component state in the store
 *
 * @param {string} componentName : name of the component
 * @param {string} key : identifier of state used by this component
 * @param {object} componentState	: initial state of the component if required
 *
 * @throw if no componentName associated with this collectionId exist
 */
export function mergeState(componentName, key, componentState) {
	return {
		type: COMPONENT_MERGE_STATE,
		componentName,
		key,
		componentState,
	};
}

/**
 * Remove component state from the store
 *
 * @param {string} componentName : name of the component
 * @param {string} key	: identifier of collection used by the component
 *
 * @throw if no componentName associated with this collectionId exist
 */
export function removeState(componentName, key) {
	return {
		type: COMPONENT_REMOVE_STATE,
		componentName,
		key,
	};
}

// backward compatbility
export const addComponentState = addState;
export const removeComponentState = removeState;
export const mergeComponentState = mergeState;
