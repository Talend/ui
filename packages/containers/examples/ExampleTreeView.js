import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { TreeView } from '../src';

const ExampleTreeView = {
	default: () => (
		<div>
			<IconsProvider />
			<TreeView
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
