import { DEFAULT_STATE, DISPLAY_NAME } from './Typeahead.container';

/**
 * Selector on the state from the typeahead id given.
 * @param {object} state
 * @param {string} id
 */
export function getComponentState(state, id) {
	return state.cmf.components.getIn([DISPLAY_NAME, id], DEFAULT_STATE);
}
