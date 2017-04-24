import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import talendIcons from 'talend-icons/dist/react';

import { List, IconsProvider, Layout, SidePanel, AppHeaderBar, Drawer } from '../src/index';

const icons = {
	'talend-arrow-left': talendIcons['talend-arrow-left'],
	'talend-dataprep': talendIcons['talend-dataprep'],
	'talend-file-xls-o': talendIcons['talend-file-xls-o'],
	'talend-folder': talendIcons['talend-folder'],
	'talend-pencil': talendIcons['talend-pencil'],
	'talend-plus-circle': talendIcons['talend-plus-circle'],
	'talend-star': talendIcons['talend-star'],
	'talend-trash': talendIcons['talend-trash'],
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

const collectionActions = [
	{
		label: 'edit',
		icon: 'talend-pencil',
		onClick: action('onEdit'),
	},
	{
		label: 'delete',
		icon: 'talend-trash',
		onClick: action('onDelete'),
	},
	{
		displayMode: 'dropdown',
		label: 'related items',
		icon: 'talend-folder',
		items: [
			{
				label: 'document 1',
				onClick: action('document 1 click'),
			},
			{
				label: 'document 2',
				onClick: action('document 2 click'),
			},
		],
		pullRight: true,
	},
];
const listItem = {
	id: 1,
	name: 'Title with icon and actions',
	created: '2016-09-22',
	modified: '2016-09-22',
	description: 'Simple row with icon and actions',
	author: 'Jean-Pierre DUPONT',
	icon: 'talend-file-xls-o',
	display: 'text',
	className: 'item-0-class',
	actions: collectionActions,
};
const collection = [...new Array(61)].map(() => listItem);
const listProps = {
	id: 'talend-list',
	displayMode: 'table',
	list: {
		columns: [
			{ key: 'id', label: 'Id', flexGrow: 0, flexShrink: 0, width: 35 },
			{ key: 'name', label: 'Name', type: 'title', flexGrow: 1, flexShrink: 0, width: 400 },
			{ key: 'author', label: 'Author', flexGrow: 1, flexShrink: 0, width: 90 },
			{ key: 'created', label: 'Created', flexGrow: 0, flexShrink: 0, width: 90 },
			{ key: 'modified', label: 'Modified', flexGrow: 0, flexShrink: 0, width: 90 },
		],
		items: collection,
		titleProps: {
			key: 'name',
			actionsKey: 'actions',
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
