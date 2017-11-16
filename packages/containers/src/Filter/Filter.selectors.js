import { DEFAULT_STATE, DISPLAY_NAME } from './Filter.container';

/**
 * Selector on the state from the filter id given.
 * @param {object} state
 * @param {string} idComponent
 */
export function getComponentState(state, idComponent) {
	if (
		state.cmf.components.has(DISPLAY_NAME) &&
		state.cmf.components.get(DISPLAY_NAME).has(idComponent)
	) {
		return state.cmf.components.get(DISPLAY_NAME).get(idComponent);
	}
	return DEFAULT_STATE;
}

/**
 * Return the filterInputValue attr from the state of filter id given.
 * @param {object} state
 * @param {string} idComponent
 */
export function getQuery(state, idComponent) {
	return getComponentState(state, idComponent).get('query', '');
}
