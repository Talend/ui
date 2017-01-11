import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { CollapsiblePanel, IconsProvider } from '../src/index';

const content = [
	{
		label: 'Content1',
		description: 'Description1',
	},
	{
		label: 'Content2',
		description: 'Description2',
	},
];

const status = {
	displayMode: 'status',
	status: 'inProgress',
	label: 'In Progress',
	actions: [
		{
			label: 'cancel',
			icon: 'talend-cross',
			onClick: action('onCancel'),
			bsSize: 'small',
		},
	],
};

const button = {
	displayMode: 'action',
	label: 'Download',
	icon: 'talend-download',
	onClick: action('onDownload'),
	hideLabel: true,
	link: true,
};

const label1 = {
	label: 'by Charles',
	bsStyle: 'default',
	tooltipPlacement: 'top',
};

const label2 = {
	label: 'on Talend Data Preparation Server',
	bsStyle: 'default',
	tooltipPlacement: 'top',
};


const label3 = {
	displayMode: 'badge',
	label: 'XML',
	bsStyle: 'info',
	tooltipPlacement: 'top',
};

const label4 = {
	label: 'on Hadoop Cluster',
	bsStyle: 'default',
	tooltipPlacement: 'top',
};

const propsPanel = {
	header: [
		status,
		label1,
		label2,
		button,
		label3,
	],
	content: [],
};

const propsPanelWithActions = {
	header: [
		{ ...status, actions: [], status: 'successful', label: 'Successful', icon: 'talend-check' },
		label1,
		label4,
		button,
		label3,
	],
	content,
};

const propsPanelWithoutActions = {
	header: [
		{ ...status, actions: [], status: 'canceled', label: 'Canceled', icon: 'talend-cross' },
		label1,
		label2,
		{},
		label3,
	],
	content: [],
};

const propsCollapsiblePanel = {
	header: [
		{ ...status, status: 'failed', label: 'Failed', icon: 'talend-cross' },
		label1,
		label4,
		button,
		label3,
	],
	content,
};

const propsCollapsiblePanelWithHeaderGroups = {
	header: [
		{ ...status, status: 'failed', label: 'Failed', icon: 'talend-cross' },
		label1,
		label4,
		[button, label3],
	],
	content,
};

const propsCollapsiblePanelWithHeaderGroupsWithProgress = {
	header: [
		{ ...status, progress: '70' },
		label1,
		label4,
		[button, label3],
	],
	content,
};

storiesOf('CollapsiblePanel', module)
	.addWithInfo('default', () => (
		<div>
			<IconsProvider />
			<h1>CollapsiblePanel</h1>
			<h2>Definition</h2>
			<p>The CollapsiblePanel component display a Panel with a customizable header and content</p>
			<h2>Examples</h2>
			<p>By default :</p>
			<CollapsiblePanel {...propsCollapsiblePanel} />
			<p>No content :</p>
			<CollapsiblePanel{...propsPanel} />
			<p>Header with Actions :</p>
			<CollapsiblePanel{...propsPanelWithActions} />
			<p>No content - Header without Actions :</p>
			<CollapsiblePanel{...propsPanelWithoutActions} />
			<p>Header with groups :</p>
			<CollapsiblePanel{...propsCollapsiblePanelWithHeaderGroups} />
			<p>Header with fixed circularProgress :</p>
			<CollapsiblePanel {...propsCollapsiblePanelWithHeaderGroupsWithProgress} />
		</div>
	));
