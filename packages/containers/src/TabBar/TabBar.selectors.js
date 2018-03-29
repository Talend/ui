import { DEFAULT_STATE, DISPLAY_NAME } from './TabBar.container';

/**
 * Selector on the state from the subheader bar id given.
 * @param {object} state
 * @param {string} idComponent
 */
export function getComponentState(state, idComponent) {
	return state.cmf.components.getIn([DISPLAY_NAME, idComponent], DEFAULT_STATE);
}

/**
 * Return the editMode attr from the state of subheader bar id given.
 * @param {object} state
 * @param {string} idComponent
 */
export function getSelectedKey(state, idComponent) {
	return getComponentState(state, idComponent).get('selectedKey', undefined);
}
