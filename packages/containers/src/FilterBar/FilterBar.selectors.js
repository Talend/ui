import { DEFAULT_STATE, DISPLAY_NAME } from './FilterBar.container';

/**
 * Selector on the state from the filter id given.
 * @param {object} state
 * @param {string} idComponent
 */
export function getComponentState(state, idComponent) {
	return state.cmf.components?.[DISPLAY_NAME]?.[idComponent] ?? DEFAULT_STATE;
}

/**
 * Return the filterInputValue attr from the state of filter id given.
 * @param {object} state
 * @param {string} idComponent
 */
export function getQuery(state, idComponent) {
	return getComponentState(state, idComponent).query ?? '';
}
