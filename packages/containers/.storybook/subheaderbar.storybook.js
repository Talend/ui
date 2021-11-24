function sharingSubHeader() {
	return {
		type: 'OVERLAY_SHARING_SUBHEADER',
	};
}
function bubblesSubHeader() {
	return {
		type: 'OVERLAY_BUBBLES_SUBHEADER',
	};
}

function submitSubheader() {
	return {
		type: 'SUBMIT_INPUT_SUBHEADERBAR',
	};
}

function editSubHeaderBar() {
	return {
		type: 'EDIT_SUBHEADERBAR',
	};
}

function cancelSubHeaderBar() {
	return {
		type: 'CANCEL_SUBHEADER_BAR',
	};
}

function goBackSubHeaderBar() {
	return {
		type: 'GO_BACK_SUBHEADER_BAR',
	};
}

function changeSubHeaderBar() {
	return {
		type: 'CHANGE_SUBHEADER_BAR',
	};
}

const actionSubHeaderSharing = {
	id: 'subheaderbar:action-sharing',
	label: 'sharing',
	renderType: 'action',
	actionCreator: 'subheaderbar:display-sharing',
	icon: 'talend-share-alt',
	bsStyle: 'link',
	hideLabel: true,
	overlay: false,
};
const actionSubHeaderBubbles = {
	id: 'subheaderbar:action-bubbles',
	label: 'bubbles',
	renderType: 'action',
	actionCreator: 'subheaderbar:display-bubbles',
	icon: 'talend-bubbles',
	bsStyle: 'link',
	hideLabel: true,
	overlay: false,
};

const actionsCreators = {
	sharingSubHeader,
	bubblesSubHeader,
	submitSubheader,
	editSubHeaderBar,
	cancelSubHeaderBar,
	changeSubHeaderBar,
	goBackSubHeaderBar,
};
const actions = {
	actionSubHeaderSharing,
	actionSubHeaderBubbles,
};

export { actionsCreators, actions };
