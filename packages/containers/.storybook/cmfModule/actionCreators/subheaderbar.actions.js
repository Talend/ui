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

const actions = {
	actionSubHeaderSharing,
	actionSubHeaderBubbles,
};

export { actions };
