/**
 * Selectors for CMF component state (state.cmf.components).
 * All selectors return plain JS values — no Immutable objects are leaked.
 */

/**
 * Get the state of a specific component instance as a plain JS object.
 * @param {Object} state - Redux state
 * @param {String} componentName - Component name (e.g., 'Container(Notification)')
 * @param {String} instanceId - Component instance id (e.g., 'default')
 * @returns {Object|undefined}
 */
export function getComponentState(state, componentName, instanceId) {
	return state.cmf.components?.[componentName]?.[instanceId];
}

/**
 * Get all instances of a component as a map of instanceId → plain JS state.
 * @param {Object} state - Redux state
 * @param {String} componentName - Component name
 * @returns {Object|undefined}
 */
export function getAllComponentStates(state, componentName) {
	return state.cmf.components?.[componentName];
}

/**
 * Get a specific property from a component instance state as a plain value.
 * @param {Object} state - Redux state
 * @param {String} componentName - Component name
 * @param {String} instanceId - Instance id
 * @param {String} property - Property key
 * @param {*} defaultValue - Default value if not found
 * @returns {*} plain JS value
 */
export function getComponentStateProperty(
	state,
	componentName,
	instanceId,
	property,
	defaultValue,
) {
	const val = state.cmf.components?.[componentName]?.[instanceId]?.[property];
	return val ?? defaultValue;
}
