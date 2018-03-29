import { DEFAULT_STATE, DISPLAY_NAME } from './TabBar.container';

/**
 * Selector on the state from the tabbar id given.
 * @param {object} state
 * @param {string} idComponent
 */
export function getComponentState(state, idComponent) {
	return state.cmf.components.getIn([DISPLAY_NAME, idComponent], DEFAULT_STATE);
}

/**
 * Return the selectedKey attr from the state of tabbar id given.
 * @param {object} state
 * @param {string} idComponent
 */
export function getSelectedKey(state, idComponent) {
	return getComponentState(state, idComponent).get('selectedKey', undefined);
}
