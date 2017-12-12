import { DEFAULT_STATE, DISPLAY_NAME, VALUE_ATTR } from './Slider.container';

/**
 * Selector on the state from the filter id given.
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
 * Return the filterInputValue attr from the state of filter id given.
 * @param {object} state
 * @param {string} idComponent
 */
export function getValue(state, idComponent) {
	return getComponentState(state, idComponent).get(VALUE_ATTR, '');
}
