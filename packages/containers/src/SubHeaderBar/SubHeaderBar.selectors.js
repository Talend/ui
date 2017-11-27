import { DEFAULT_STATE, DISPLAY_NAME } from './SubHeaderBar.container';

/**
 * Selector on the state from the subheader bar id given.
 * @param {object} state
 * @param {string} idComponent
 */
export function getComponentState(state, idComponent) {
	if (state.cmf.components.hasIn([DISPLAY_NAME, idComponent])) {
		return state.cmf.components.getIn([DISPLAY_NAME, idComponent]);
	}
	return DEFAULT_STATE;
}

/**
 * Return the inputText attr from the state of subheader bar id given.
 * @param {object} state
 * @param {string} idComponent
 */
export function getQuery(state, idComponent) {
	return getComponentState(state, idComponent).get('inputText', '');
}
