import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';

import CollapsiblePanelsList from '../src/CollapsiblePanelsList';
import { IconsProvider } from '../src/index';
import talendIcons from '@talend/icons/dist/react';

const icons = {
	'talend-cross': talendIcons['talend-cross'],
	'talend-download': talendIcons['talend-download'],
	'talend-check': talendIcons['talend-check'],
	'talend-caret-down': talendIcons['talend-caret-down'],
	'talend-warning': talendIcons['talend-warning'],
};


const collapsibleListCollection = [
	{
		header: [{ displayMode: 'status', actions: [], status: 'successful', label: 'Successful', icon: 'talend-check' }],
		content: [
			{
				label: 'Content1',
				description: 'Description1',
			},
			{
				label: 'Content2',
				description: 'Description2',
			},
		],
	},
	{
		header: [{ displayMode: 'status', actions: [], status: 'canceled', label: 'Canceled', icon: 'talend-cross' }],
		content: [
			{
				label: 'Content1',
				description: 'Description1',
			},
			{
				label: 'Content2',
				description: 'Description2',
			},
		],
	},
	{
		header: [{ displayMode: 'status', actions: [], status: 'failed', label: 'Failure', icon: 'talend-cross' }],
		content: [
			{
				label: 'Content1',
				description: 'Description1',
			},
			{
				label: 'Content2',
				description: 'Description2',
			},
		],
	}
];

storiesOf('CollapsiblePanelsList', module)
	.addDecorator(checkA11y)
	.addWithInfo('Key/Value content', () => {
		const sourceItems = [...new Array(200)]
			.map((item, index) => collapsibleListCollection[index % collapsibleListCollection.length]);
		return <div style={{height: '100vh'}}><IconsProvider defaultIcons={icons} /><CollapsiblePanelsList items={sourceItems} /></div>;
	});
