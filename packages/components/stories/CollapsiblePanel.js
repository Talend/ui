import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import talendIcons from '@talend/icons/dist/react';

import { CollapsiblePanel, IconsProvider } from '../src/index';

const icons = {
	'talend-cross': talendIcons['talend-cross'],
	'talend-download': talendIcons['talend-download'],
	'talend-check': talendIcons['talend-check'],
	'talend-caret-down': talendIcons['talend-caret-down'],
	'talend-warning': talendIcons['talend-warning'],
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
	header: [status, label1, label2, button, label3],
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

const propsInProgressCollapsiblePanel = {
	header: [status, label1, label4, button, label3],
	content,
	onToggle: action('onToggle'),
};

const propsFailedCollapsiblePanel = {
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

const propsSuccessfulCollapsiblePanel = {
	header: [
		{ ...status, status: 'successful', label: 'Successful', icon: 'talend-check' },
		label1,
		label4,
		button,
		label3,
	],
	content,
	onToggle: action('onToggle'),
};
const propsWarningCollapsiblePanel = {
	header: [
		{ ...status, status: 'warning', label: 'Warning', icon: 'talend-warning' },
		label1,
		label4,
		button,
		label3,
	],
	content,
	onToggle: action('onToggle'),
};

const propsCanceledCollapsiblePanel = {
	header: [
		{ ...status, status: 'canceled', label: 'Canceled', icon: 'talend-cross' },
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
	header: [{ ...status, progress: '70' }, label1, label4, [button, label3]],
	content,
	onToggle: action('onToggle'),
	expanded: true,
};

const version1 = {
	label: 'Version 1 Version 1 Version 1 Version 1',
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
	label: '05/02/2017 14:44:55',
	bsStyle: 'default',
	tooltipPlacement: 'top',
	className: 'detail',
};

const propsCollapsibleSelectablePanel = {
	header: [[version1, readOnlyLabel], timeStamp],
	content: {
		head: [
			{
				label: '21 steps',
				bsStyle: 'default',
				tooltipPlacement: 'top',
			},
			{
				label: 'by Henry-Mayeul de Benque',
				bsStyle: 'default',
				tooltipPlacement: 'top',
				className: 'text-right',
			},
		],
		description: `1 - First row, ...\n2 - Second row, ...\n3 - Third row, ...\nLast row, ...`,
	},
	onSelect: action('onselect'),
	onToggle: action('onToggle'),
	theme: 'descriptive-panel',
};

const propsCollapsibleSelectedPanel = {
	...propsCollapsibleSelectablePanel,
	expanded: true,
	status: 'selected',
	theme: 'descriptive-panel',
};

const propsSelectedPanelWithoutContent = {
	header: [[version1, readOnlyLabel], timeStamp],
	onSelect: action('onselect'),
	onToggle: action('onToggle'),
	expanded: true,
	status: 'selected',
	theme: 'descriptive-panel',
};

const propsCollapsibleSelectablePanelWithoutTag = {
	...propsSelectedPanelWithoutContent,
	header: [version1, timeStamp],
	theme: 'descriptive-panel',
};

storiesOf('CollapsiblePanel', module)
	.addDecorator(checkA11y)
	.addWithInfo('Key/Value content', () => (
		<div className="col-lg-offset-1 col-lg-10">
			<IconsProvider defaultIcons={icons} />
			<p>By default :</p>
			<div id="default">
				<CollapsiblePanel {...propsCollapsiblePanel} />
			</div>
			<p>No content :</p>
			<div id="no-content">
				<CollapsiblePanel {...propsPanel} />
			</div>
			<p>No content - Header with Actions :</p>
			<div id="with-actions">
				<CollapsiblePanel {...propsPanelWithActions} />
			</div>
			<p>No content - Header without Actions :</p>
			<div id="without-actions">
				<CollapsiblePanel {...propsPanelWithoutActions} />
			</div>
			<p>Header with groups :</p>
			<div id="with-groups">
				<CollapsiblePanel {...propsCollapsiblePanelWithHeaderGroups} />
			</div>
			<p>Header with fixed circularProgress :</p>
			<div id="with-fixed-progress">
				<CollapsiblePanel {...propsCollapsiblePanelWithHeaderGroupsWithProgress} />
			</div>
		</div>
	))
	.addWithInfo('Textual content', () => (
		<div className="col-lg-offset-1 col-lg-10">
			<IconsProvider defaultIcons={icons} />
			<p>With Content:</p>
			<div id="textual-with-content">
				<CollapsiblePanel {...propsCollapsibleSelectablePanel} />
			</div>
			<p>Opened with Content:</p>
			<div id="textual-opened-with-content">
				<CollapsiblePanel {...propsCollapsibleSelectablePanel} expanded />
			</div>
			<p>Panel Without readonly tag and without content:</p>
			<div id="textual-without-readonly">
				<CollapsiblePanel {...propsCollapsibleSelectablePanelWithoutTag} status={''} />
			</div>
		</div>
	))
	.addWithInfo('Selected Collapsible', () => (
		<div className="col-lg-offset-1 col-lg-10">
			<IconsProvider defaultIcons={icons} />
			<p>Selected Panel With Content:</p>
			<div id="selected-with-content">
				<CollapsiblePanel {...propsCollapsibleSelectedPanel} />
			</div>
			<p>Selected Panel Without readonly tag and without content:</p>
			<div id="selected-without-readonly">
				<CollapsiblePanel {...propsCollapsibleSelectablePanelWithoutTag} />
			</div>
			<p>Selected Panel Without content:</p>
			<div id="selected-without-content">
				<CollapsiblePanel {...propsSelectedPanelWithoutContent} />
			</div>
			<p>Selected key/Value CollapsiblePanel:</p>
			<div id="selected-key-value">
				<CollapsiblePanel {...propsCollapsiblePanel} status={'selected'} />
			</div>
			<p>Selected key/Value CollapsiblePanel without content:</p>
			<CollapsiblePanel {...propsPanelWithoutActions} status={'selected'} />
		</div>
	))
	.addWithInfo('Status Collapsible', () => (
		<div className="col-lg-offset-1 col-lg-10">
			<IconsProvider defaultIcons={icons} />
			<p>CollapsiblePanel with status info:</p>
			<div id="status-info">
				<CollapsiblePanel {...propsInProgressCollapsiblePanel} status={'inProgress'} />
			</div>
			<p>CollapsiblePanel with status successful:</p>
			<div id="status-success">
				<CollapsiblePanel {...propsSuccessfulCollapsiblePanel} status={'successful'} />
			</div>
			<p>CollapsiblePanel with status failed:</p>
			<div id="status-failed">
				<CollapsiblePanel {...propsFailedCollapsiblePanel} status={'failed'} />
			</div>
			<p>CollapsiblePanel with status warning:</p>
			<div id="status-warning">
				<CollapsiblePanel {...propsWarningCollapsiblePanel} status={'warning'} />
			</div>
			<p>CollapsiblePanel with status canceled:</p>
			<div id="status-canceled">
				<CollapsiblePanel {...propsCanceledCollapsiblePanel} status={'canceled'} />
			</div>
		</div>
	))
	.addWithInfo('Adjustment textual collapsibles', () => (
		<div className="col-lg-offset-1 col-lg-10">
			<IconsProvider defaultIcons={icons} />
			<p>Adjustement Story:</p>
			<div id="selectable-panel-with-content1">
				<CollapsiblePanel {...propsCollapsibleSelectedPanel} />
			</div>
			<div id="selectable-panel-with-content2">
				<CollapsiblePanel {...propsCollapsibleSelectablePanel} expanded />
			</div>
			<div id="selectable-panel-with-content3">
				<CollapsiblePanel {...propsCollapsibleSelectablePanelWithoutTag} />
			</div>
			<div id="selectable-panel-with-content4">
				<CollapsiblePanel {...propsCollapsibleSelectablePanel} />
			</div>
			<div id="selected-panel-without-content5">
				<CollapsiblePanel {...propsSelectedPanelWithoutContent} />
			</div>
		</div>
	));
