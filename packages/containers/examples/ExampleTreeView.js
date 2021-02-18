import React from 'react';

import { TreeView } from '../src';

const ExampleTreeView = {
	default: () => (
		<div>
			<TreeView
				id="my-treeview"
				collection="with.data"
				nameAttr="label"
				onToggleActionCreator="object:view"
				onSelectActionCreator="object:view"
				noHeader
			/>
		</div>
	),
};
export default ExampleTreeView;
