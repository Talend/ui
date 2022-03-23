import React from 'react';

import TreeView from '.';

export default {
	title: 'TreeView',
};

export const Default = () => (
	<TreeView
		id="my-treeview"
		collection="with.data"
		nameAttr="label"
		onToggleActionCreator="object:view"
		onSelectActionCreator="object:view"
		noHeader
	/>
);
