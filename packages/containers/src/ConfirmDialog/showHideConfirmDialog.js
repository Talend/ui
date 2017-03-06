import { Map } from 'immutable';

export function showConfirmDialog(state, action) {
	// adding conf and showing modal
	const path = ['ConfirmDialog', 'ConfirmDialog'];
	const newState = Object.assign({}, state);
	const confirmDialogConf = action.confirmDialogConf.toJS();
	newState.cmf.components =
		state.cmf.components.setIn(path, new Map({ ...confirmDialogConf, show: true }));
	return newState;
}

export function hideConfirmDialog(state) {
	// hiding the modal
	const path = ['ConfirmDialog', 'ConfirmDialog', 'show'];
	const newState = { ...state };
	newState.cmf.components = state.cmf.components.setIn(path, false);
	return newState;
}
