
function submitEditableText() {
	return {
		type: 'SUBMIT_EDITABLE_TEXT',
	};
}

function editEditableText() {
	return {
		type: 'EDIT_EDITABLE_TEXT',
	};
}

function cancelEditableText() {
	return {
		type: 'CANCEL_EDITABLE_TEXT',
	};
}

function changeEditableText() {
	return {
		type: 'CHANGE_EDITABLE_TEXT',
	};
}


const actionsCreators = {
	submitEditableText,
	editEditableText,
	cancelEditableText,
	changeEditableText,
};

export { actionsCreators };
