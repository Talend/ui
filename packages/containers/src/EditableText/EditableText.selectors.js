import EditableText from './EditableText.connect';

/**
 * Return the editMode attr from the state of editable text id given.
 * @param {object} state
 * @param {string} idComponent
 */
export function getEditMode(state, idComponent) {
	return EditableText.getState(state, idComponent).get('editMode', false);
}
