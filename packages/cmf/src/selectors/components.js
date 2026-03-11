/**
 * Selectors for CMF component state (state.cmf.components).
 * All selectors return plain JS values — no Immutable objects are leaked.
 */

/**
 * Get the state of a specific component instance as a plain JS object.
 * Covers the `state.cmf.components.getIn([componentName, instanceId])` pattern.
 * @param {Object} state - Redux state
 * @param {String} componentName - Component name (e.g., 'Container(Notification)')
 * @param {String} instanceId - Component instance id (e.g., 'default')
 * @returns {Object|undefined}
 */
export function getComponentState(state, componentName, instanceId) {
	const compState = state.cmf.components.getIn([componentName, instanceId]);
	if (compState == null) return undefined;
	if (typeof compState.toJS === 'function') return compState.toJS();
	return compState;
}

/**
 * Get all instances of a component as a map of instanceId → plain JS state.
 * @param {Object} state - Redux state
 * @param {String} componentName - Component name
 * @returns {Object|undefined}
 */
export function getAllComponentStates(state, componentName) {
	const instances = state.cmf.components.get(componentName);
	if (instances == null) return undefined;
	if (typeof instances.toJS === 'function') return instances.toJS();
	return instances;
}

/**
 * Get a specific property from a component instance state as a plain value.
 * Covers the `state.cmf.components.getIn([...path], default)` pattern used in
 * containers/src/Notification/pushNotification.js.
 * @param {Object} state - Redux state
 * @param {String} componentName - Component name
 * @param {String} instanceId - Instance id
 * @param {String} property - Property key
 * @returns {*} plain JS value
 */
export function getComponentStateProperty(
	state,
	componentName,
	instanceId,
	property,
	defaultValue,
) {
	const compState = state.cmf.components.getIn([componentName, instanceId]);
	if (compState == null) return defaultValue;
	let val;
	if (typeof compState.get === 'function') {
		val = compState.get(property);
	} else {
		val = compState[property];
	}
	if (val == null) return defaultValue;
	if (typeof val.toJS === 'function') return val.toJS();
	return val;
}
