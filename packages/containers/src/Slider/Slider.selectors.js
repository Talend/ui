import { DEFAULT_STATE, DISPLAY_NAME, VALUE_ATTR } from './Slider.container';

/**
 * Selector on the state from the filter id given.
 * @param {object} state
 * @param {string} idComponent
 */
export function getComponentState(state, idComponent) {
	return state.cmf.components.getIn([DISPLAY_NAME, idComponent], DEFAULT_STATE);
}

/**
 * Return the slider value
 * @param {object} state
 * @param {string} idComponent
 */
export function getValue(state, idComponent) {
	return getComponentState(state, idComponent).get(VALUE_ATTR, '');
}
