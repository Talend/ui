export function showConfirmDialog(state, action) {
	// adding conf and showing modal
	const path = ['CMFContainer(ConfirmDialog)', 'ConfirmDialog'];
	const newState = { ...state };
	newState.cmf.components = state.cmf.components.setIn(
		path,
		action.confirmDialogConf.set('show', true)
	);
	return newState;
}

export function hideConfirmDialog(state) {
	// hiding the modal
	const path = ['CMFContainer(ConfirmDialog)', 'ConfirmDialog', 'show'];
	const newState = { ...state };
	newState.cmf.components = state.cmf.components.setIn(path, false);
	return newState;
}
