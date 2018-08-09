import { DEFAULT_STATE, DISPLAY_NAME } from './EditableText.container';

/**
 * Selector on the state from the editable text id given.
 * @param {object} state
 * @param {string} idComponent
 */
export function getComponentState(state, idComponent) {
	return state.cmf.components.getIn([DISPLAY_NAME, idComponent], DEFAULT_STATE);
}

/**
 * Return the editMode attr from the state of editable text id given.
 * @param {object} state
 * @param {string} idComponent
 */
export function getEditMode(state, idComponent) {
	return getComponentState(state, idComponent).get('editMode', false);
}
