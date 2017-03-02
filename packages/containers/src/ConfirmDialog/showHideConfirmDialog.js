export function showConfirmDialog(state, action) {
	if (action.model) {
		const path = ['ConfirmDialog', 'ConfirmDialog'];
		const newState = Object.assign({}, state);
		newState.cmf.components = state.cmf.components.setIn(path, action.confirmDialogConf);
		return newState;
	}
	return state;
}

export function hideConfirmDialog(state) {
	//hiding the modal
	const path = ['ConfirmDialog', 'ConfirmDialog', 'show'];
	const newState = { ...state };
	newState.cmf.components = state.cmf.components.setIn(path, false);
	return newState;
}



