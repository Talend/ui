import React from 'react';
import { storiesOf, action } from '@storybook/react';
import talendIcons from '@talend/icons/dist/react';

import { List, IconsProvider, Layout, SidePanel, AppHeaderBar, Drawer } from '../src/index';

const icons = {
	'talend-arrow-left': talendIcons['talend-arrow-left'],
	'talend-dataprep': talendIcons['talend-dataprep'],
	'talend-folder': talendIcons['talend-folder'],
	'talend-plus-circle': talendIcons['talend-plus-circle'],
	'talend-star': talendIcons['talend-star'],
};

const actions = [
	{
		label: 'Preparations',
		icon: 'talend-dataprep',
		onClick: action('Preparations clicked'),
	},
	{
		label: 'Datasets',
		icon: 'talend-folder',
		onClick: action('Datasets clicked'),
	},
	{
		label: 'Favorites',
		icon: 'talend-star',
		onClick: action('Favorites clicked'),
	},
];

const drawers = [
	(<Drawer stacked title="Hello drawers">
		<p>You should not being able to read this because I&apos;m first</p>
	</Drawer>),
	(<Drawer title="Hello drawers">
		<p>The content dictate the width</p>
	</Drawer>),
];

const content = (
	<div>
		<h1>Welcome to the content for testing scroll</h1>
		<ul>
			{[...new Array(38)].map(() => <li>one</li>)}
		</ul>
	</div>
);
const sidePanel = (<SidePanel
	actions={actions}
	onToggleDock={action('Toggle dock clicked')}
	docked={false}
/>);
const dockedSidePanel = (<SidePanel
	actions={actions}
	onToggleDock={action('Toggle dock clicked')}
	docked
/>);
const header = (<AppHeaderBar app="Example App Name" />);
const footer = 'Footer content';

const listItem = {
	id: 1,
	name: 'Title',
	created: '2016-09-22',
	modified: '2016-09-22',
	author: 'Jean-Pierre DUPONT',
	display: 'text',
};
const listProps = {
	id: 'talend-list',
	displayMode: 'table',
	list: {
		columns: [
			{ key: 'id', label: 'Id' },
			{ key: 'name', label: 'Name' },
			{ key: 'author', label: 'Author' },
			{ key: 'created', label: 'Created' },
			{ key: 'modified', label: 'Modified' },
		],
		items: [...new Array(61)].map(() => listItem),
		titleProps: {
			key: 'name',
			iconKey: 'icon',
			displayModeKey: 'display',
			onClick: action('onClick'),
			onEditCancel: action('onEditCancel'),
			onEditSubmit: action('onEditSubmit'),
		},
		itemProps: {
			classNameKey: 'className',
			onSelect: action('onSelect'),
			onToggle: action('onToggle'),
			onToggleAll: action('onToggleAll'),
		},
	},
	toolbar: {
		actionBar: {
			actions: {
				left: [
					{
						id: 'add',
						label: 'Add Folder',
						bsStyle: 'primary',
						icon: 'talend-plus-circle',
						onClick: action('add.onClick'),
					},
					{
						displayMode: 'splitDropdown',
						label: 'Add File',
						icon: 'talend-folder',
						onClick: action('onAdd'),
						items: [
							{
								label: 'From Local',
								onClick: action('From Local click'),
							},
							{
								label: 'From Remote',
								onClick: action('From Remote click'),
							},
						],
						emptyDropdownLabel: 'No option',
					},
				],
			},
		},
		sort: {
			field: 'name',
			onChange: action('sort.onChange'),
			options: [
				{ id: 'id', name: 'Id' },
				{ id: 'name', name: 'Name' },
			],
		},
	},
};

const tabs = {
	items: [
		{
			id: 'tab-bar-action-1',
			key: '1',
			label: 'Tab1',
		},
		{
			id: 'tab-bar-action-2',
			key: '2',
			label: 'Tab2',
		},
		{
			id: 'tab-bar-action-3',
			key: '3',
			label: 'Tab3',
		},
	],
	onSelect: action('onSelect'),
	selected: '2',
};

storiesOf('Layout', module)
	.addWithInfo('OneColumn', () => (
		<Layout
			header={header}
			mode="OneColumn"
		>
			<h1>Hello world</h1>
			<IconsProvider defaultIcons={icons} />
		</Layout>
	))
	.addWithInfo('OneColumn with scroll', () => (
		<Layout
			header={header}
			mode="OneColumn"
		>
			{content}
			<IconsProvider defaultIcons={icons} />
		</Layout>
	))
	.addWithInfo('OneColumn with tabs', () => (
		<Layout
			header={header}
			tabs={tabs}
			mode="OneColumn"
		>
			{content}
			<IconsProvider defaultIcons={icons} />
		</Layout>
	))
	.addWithInfo('TwoColumns', () => (
		<Layout
			header={header}
			mode="TwoColumns"
			one={sidePanel}
		>
			<h1>Hello world</h1>
			<IconsProvider defaultIcons={icons} />
		</Layout>
	))
	.addWithInfo('TwoColumns with scroll', () => (
		<Layout
			header={header}
			mode="TwoColumns"
			one={sidePanel}
		>
			{content}
			<IconsProvider defaultIcons={icons} />
		</Layout>
	))
	.addWithInfo('TwoColumns with tabs', () => (
		<Layout
			header={header}
			mode="TwoColumns"
			one={sidePanel}
			tabs={tabs}
		>
			{content}
			<IconsProvider defaultIcons={icons} />
		</Layout>
	))
	.addWithInfo('TwoColumns with big Table list', () => (
		<Layout
			header={header}
			mode="TwoColumns"
			one={dockedSidePanel}
		>
			<List {...listProps} />
			<IconsProvider defaultIcons={icons} />
		</Layout>
	))
	.addWithInfo('TwoColumns with big Large list', () => (
		<Layout
			header={header}
			mode="TwoColumns"
			one={dockedSidePanel}
		>
			<List {...listProps} displayMode={'large'} />
			<IconsProvider defaultIcons={icons} />
		</Layout>
	))
	.addWithInfo('TwoColumns with big Tile list', () => (
		<Layout
			header={header}
			mode="TwoColumns"
			one={dockedSidePanel}
		>
			<List {...listProps} displayMode={'tile'} />
			<IconsProvider defaultIcons={icons} />
		</Layout>
	))
	.addWithInfo('TwoColumns docked', () => (
		<Layout
			header={header}
			mode="TwoColumns"
			one={dockedSidePanel}
		>
			{content}
			<IconsProvider defaultIcons={icons} />
		</Layout>
	))
	.addWithInfo('TwoColumns with drawers', () => (
		<Layout
			header={header}
			mode="TwoColumns"
			one={sidePanel}
			drawers={drawers}
		>
			{content}
			<IconsProvider defaultIcons={icons} />
		</Layout>
	))
	.addWithInfo('OneColumn with footer', () => (
		<Layout
			header={header}
			mode="OneColumn"
			footer={footer}
		>
			<h1>Hello world</h1>
			<IconsProvider defaultIcons={icons} />
		</Layout>
	))
	.addWithInfo('OneColumn without header', () => (
		<Layout
			mode="OneColumn"
		>
			<h1>Hello world</h1>
			<IconsProvider defaultIcons={icons} />
		</Layout>
	));
