import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import talendIcons from 'talend-icons/dist/react';

import { CollapsiblePanel, IconsProvider } from '../src/index';

const icons = {
	'talend-cross': talendIcons['talend-cross'],
	'talend-download': talendIcons['talend-download'],
	'talend-check': talendIcons['talend-check'],
	'talend-caret-down': talendIcons['talend-caret-down'],
};

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
	onToggle: action('onToggle'),
};

const propsPanelWithoutActions = {
	header: [
		{ ...status, actions: [], status: 'canceled', label: 'Canceled', icon: 'talend-cross' },
		label1,
		label2,
		{},
		label3,
	],
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
	onToggle: action('onToggle'),
};

const propsCollapsiblePanelWithHeaderGroups = {
	header: [
		{ ...status, status: 'failed', label: 'Failed', icon: 'talend-cross' },
		label1,
		label4,
		[button, label3],
	],
	content,
	onToggle: action('onToggle'),
	expanded: true,
};

const propsCollapsiblePanelWithHeaderGroupsWithProgress = {
	header: [
		{ ...status, progress: '70' },
		label1,
		label4,
		[button, label3],
	],
	content,
	onToggle: action('onToggle'),
	expanded: true,
};

const version1 = {
	label: 'Version 1 94a06b6a3a85bc415add5fdb31dcceebf96b8182',
	bsStyle: 'default',
	tooltipPlacement: 'top',
	className: 'title',
};
const readOnlyLabel = {
	label: '(Read Only)',
	bsStyle: 'default',
	tooltipPlacement: 'top',
	className: 'tag',
};
const timeStamp = {
	label: '03/02/2017 14:44',
	bsStyle: 'default',
	tooltipPlacement: 'top',
	className: 'detail',
};

const propsCollapsibleSelectablePanel = {
	header: [
		[version1, readOnlyLabel],
		timeStamp,
	],
	content: {
		upper: [
			{
				label: '21 steps',
				bsStyle: 'default',
				tooltipPlacement: 'top',
			}, {
				label: 'by Abdelaziz Maalej test 1 test 2 test 1 test 2',
				bsStyle: 'default',
				tooltipPlacement: 'top',
			},
		],
		description: 'Lorem ipsum dolor sit amet, consectv eturelit Lorem  adipiscing elit. ' +
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet,' +
		' consectetur adipiscing elit Lorem ipsum dolor sit nsectetur adipiscing elit Lorem ' +
		'ipsum dolor sit amet, consectetur adipiscing elit Lorem dolor sit amet, consectetur' +
		' adipiscing elitipsum dolor sit amet, consectv eturelit Lorem  adipis decing elit. ' +
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet,' +
		' consectetur adipiscing elit Lorem ipsum dolor sit nsectetur adipiscing elit Lorem ' +
		'ipsum dolor sit amet, consectetur adipiscing elit Lorem dolor sit amet, consectetur' +
		' adipiscing elit',
	},
	onSelect: action('onselect'),
	onToggle: action('onToggle'),
	theme: 'descriptive-panel',
};

const propsCollapsibleSelectedPanel = {
	...propsCollapsibleSelectablePanel,
	expanded: true,
	selected: true,
	theme: 'descriptive-panel',
};

const propsSelectedPanelWithoutContent = {
	header: [
		[version1, readOnlyLabel],
		timeStamp,
	],
	onSelect: action('onselect'),
	onToggle: action('onToggle'),
	expanded: true,
	selected: true,
	theme: 'descriptive-panel',
};

const propsCollapsibleSelectablePanelWithoutTag = {
	...propsSelectedPanelWithoutContent,
	header: [
		version1,
		timeStamp,
	],
	theme: 'descriptive-panel',
};

storiesOf('CollapsiblePanel', module)
	.addWithInfo('Key/Value content', () => (
		<div className="col-lg-offset-1 col-lg-10">
			<IconsProvider defaultIcons={icons}/>
			<p>By default :</p>
			<div id="default">
				<CollapsiblePanel {...propsCollapsiblePanel} />
			</div>
			<br />
			<p>No content :</p>
			<div id="one">
				<CollapsiblePanel {...propsPanel} />
			</div>
			<br />
			<p>No content - Header with Actions :</p>
			<div id="two">
				<CollapsiblePanel {...propsPanelWithActions} />
			</div>
			<p>No content - Header without Actions :</p>
			<div id="three">
				<CollapsiblePanel {...propsPanelWithoutActions} />
			</div>
			<br />
			<p>Header with groups :</p>
			<CollapsiblePanel{...propsCollapsiblePanelWithHeaderGroups} />
			<br />
			<p>Header with fixed circularProgress :</p>
			<CollapsiblePanel {...propsCollapsiblePanelWithHeaderGroupsWithProgress} />
		</div>
	))
	.addWithInfo('Textual content', () => (
		<div className="col-lg-offset-1 col-lg-10">
			<IconsProvider defaultIcons={icons}/>
			<p>With Content:</p>
			<div id="selectable-panel-with-content2">
				<CollapsiblePanel {...propsCollapsibleSelectablePanel} />
			</div>
			<br />
			<p>Panel Without readonly tag and without content:</p>
			<div id="selectable-panel-with-content2">
				<CollapsiblePanel {...propsCollapsibleSelectablePanelWithoutTag}
				                  selected={false}/>
			</div>
			<br />
		</div>
	))
	.addWithInfo('Selected Collapsible', () => (
		<div className="col-lg-offset-1 col-lg-10">
			<IconsProvider defaultIcons={icons}/>
			<p>Selected Panel With Content:</p>
			<div id="selectable-panel-with-content1">
				<CollapsiblePanel {...propsCollapsibleSelectedPanel} />
			</div>
			<br />
			<p>Selected Panel Without readonly tag and without content:</p>
			<div id="selectable-panel-with-content2">
				<CollapsiblePanel {...propsCollapsibleSelectablePanelWithoutTag} />
			</div>
			<br />
			<p>Selected Panel Without content:</p>
			<div id="selected-panel-without-content">
				<CollapsiblePanel {...propsSelectedPanelWithoutContent} />
			</div>
			<br />
			<p>Selected key/Value CollapsiblePanel:</p>
			<CollapsiblePanel {...propsCollapsiblePanel} selected/>
			<br />
			<p>Selected key/Value CollapsiblePanel without content:</p>
			<CollapsiblePanel {...propsPanelWithoutActions} selected/>
		</div>
	));
