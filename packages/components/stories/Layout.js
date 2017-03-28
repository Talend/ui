import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { List, IconsProvider, Layout, SidePanel, AppHeaderBar, Drawer } from '../src/index';

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
const headerProps = {
	brand: {
		id: 'header-brand',
		name: 'Example App Name',
		onClick: action('onApplicationNameClick'),
	},
	logo: {
		id: 'header-logo',
		onClick: action('onLogoClick'),
	},
	search: {
		icon: {
			name: 'talend-search',
			title: 'icon',
			bsStyle: 'link',
		},
		id: 'header-search',
		onToggle: action('onSearchClick'),
	},
	help: {
		id: 'header-help',
		onClick: action('onHelpClick'),
	},
	user: {
		id: 'header-user',
		items: [
			{
				icon: 'talend-cog',
				label: 'Settings',
				onClick: action('onSettingsClick'),
			},
		],
		name: 'User NAME',
	},
	products: {
		id: 'header-products',
		items: [
			{
				icon: 'talend-logo-square',
				label: 'Portal',
				onClick: action('onPortalClick'),
			},
		],
	},
};
const header = (<AppHeaderBar {...headerProps} />);
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

storiesOf('Layout', module)
	.addWithInfo('OneColumn', () => (
		<Layout
			header={header}
			mode="OneColumn"
		>
			<h1>Hello world</h1>
			<IconsProvider />
		</Layout>
	))
	.addWithInfo('OneColumn with scroll', () => (
		<Layout
			header={header}
			mode="OneColumn"
		>
			{content}
			<IconsProvider />
		</Layout>
	))
	.addWithInfo('TwoColumns', () => (
		<Layout
			header={header}
			mode="TwoColumns"
			one={sidePanel}
		>
			<h1>Hello world</h1>
			<IconsProvider />
		</Layout>
	))
	.addWithInfo('TwoColumns with scroll', () => (
		<Layout
			header={header}
			mode="TwoColumns"
			one={sidePanel}
		>
			{content}
			<IconsProvider />
		</Layout>
	))
	.addWithInfo('TwoColumns with big Table list', () => (
		<Layout
			header={header}
			mode="TwoColumns"
			one={dockedSidePanel}
		>
			<List {...listProps} />
			<IconsProvider />
		</Layout>
	))
	.addWithInfo('TwoColumns with big Large list', () => (
		<Layout
			header={header}
			mode="TwoColumns"
			one={dockedSidePanel}
		>
			<List {...listProps} displayMode={'large'} />
			<IconsProvider />
		</Layout>
	))
	.addWithInfo('TwoColumns with big Tile list', () => (
		<Layout
			header={header}
			mode="TwoColumns"
			one={dockedSidePanel}
		>
			<List {...listProps} displayMode={'tile'} />
			<IconsProvider />
		</Layout>
	))
	.addWithInfo('TwoColumns docked', () => (
		<Layout
			header={header}
			mode="TwoColumns"
			one={dockedSidePanel}
		>
			{content}
			<IconsProvider />
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
			<IconsProvider />
		</Layout>
	))
	.addWithInfo('OneColumn with footer', () => (
		<Layout
			header={header}
			mode="OneColumn"
			footer={footer}
		>
			<h1>Hello world</h1>
			<IconsProvider />
		</Layout>
	));
