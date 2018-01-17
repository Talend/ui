import React from 'react';
import { action, storiesOf } from '@storybook/react';
import talendIcons from '@talend/icons/dist/react';

import { Drawer, HeaderBar, IconsProvider, Layout, List, SidePanel, SubHeaderBar, } from '../src/index';

const apps = [
	'tdc',
	'tdp',
	'tds',
	'tfd',
	'tic',
	'tmc',
];

const icons = {
	'talend-arrow-left': talendIcons['talend-arrow-left'],
	'talend-dataprep': talendIcons['talend-dataprep'],
	'talend-folder': talendIcons['talend-folder'],
	'talend-plus-circle': talendIcons['talend-plus-circle'],
	'talend-star': talendIcons['talend-star'],
	'talend-opener': talendIcons['talend-opener'],
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
	<Drawer stacked title="Hello drawers">
		<p>You should not being able to read this because I&apos;m first</p>
	</Drawer>,
	<Drawer title="Hello drawers">
		<p>The content dictate the width</p>
	</Drawer>,
];

const content = (
	<div>
		<h1>Welcome to the content for testing scroll</h1>
		<ul>{[...new Array(38)].map(() => <li>one</li>)}</ul>
	</div>
);
const sidePanel = (
	<SidePanel actions={actions} onToggleDock={action('Toggle dock clicked')} docked={false}/>
);
const dockedSidePanel = (
	<SidePanel actions={actions} onToggleDock={action('Toggle dock clicked')} docked/>
);
const header = <HeaderBar brand={{ label: 'Example App Name' }}/>;
const subHeader = <SubHeaderBar title="MyTitle" onGoBack={action('SubHeader onGoBack')}/>;
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
			isSelected: () => false,
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
			options: [{ id: 'id', name: 'Id' }, { id: 'name', name: 'Name' }],
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

const stories =
	storiesOf('Layout', module)
		.addDecorator(story => (
			<div>
				<IconsProvider defaultIcons={icons}/>
				{story()}
			</div>
		))
		.addWithInfo('OneColumn', () => (
			<Layout header={header} mode="OneColumn">
				<h1>Hello world</h1>
			</Layout>
		));

apps.forEach(app => stories
	.addWithInfo(`OneColumn ${app.toUpperCase()}`, () => (
		<Layout id={app} header={header} mode="OneColumn">
			<h1>Hello world</h1>
		</Layout>
	))
	.addWithInfo(`🎨 OneColumn ${app.toUpperCase()}`, () => (
		<Layout id={app} hasTheme={true} header={header} mode="OneColumn">
			<h1>Hello world</h1>
		</Layout>
	))
);

stories
	.addWithInfo('OneColumn with tabs', () => (
		<Layout header={header} tabs={tabs} mode="OneColumn">
			{content}
		</Layout>
	));

apps.forEach(app => stories
	.addWithInfo(`OneColumn ${app.toUpperCase()} with tabs`, () => (
		<Layout id={app} header={header} tabs={tabs} mode="OneColumn">
			{content}
		</Layout>
	))
	.addWithInfo(`🎨 OneColumn ${app.toUpperCase()} with tabs`, () => (
		<Layout id={app} hasTheme={true} header={header} tabs={tabs} mode="OneColumn">
			{content}
		</Layout>
	))
);
stories
	.addWithInfo('TwoColumns', () => (
		<Layout header={header} mode="TwoColumns" one={sidePanel}>
			<h1>Hello world</h1>
		</Layout>
	));

apps.forEach(app => stories
	.addWithInfo(`TwoColumns ${app.toUpperCase()}`, () => (
		<Layout id={app} header={header} mode="TwoColumns" one={sidePanel}>
			<h1>Hello world</h1>
		</Layout>
	))
	.addWithInfo(`🎨 TwoColumns ${app.toUpperCase()}`, () => (
		<Layout id={app} hasTheme={true} header={header} mode="TwoColumns" one={sidePanel}>
			<h1>Hello world</h1>
		</Layout>
	))
);

stories
	.addWithInfo('TwoColumns with tabs', () => (
		<Layout header={header} mode="TwoColumns" one={sidePanel} tabs={tabs}>
			{content}
		</Layout>
	));

apps.forEach(app => stories
	.addWithInfo(`TwoColumns ${app.toUpperCase()} with tabs`, () => (
		<Layout id={app} header={header} mode="TwoColumns" one={sidePanel} tabs={tabs}>
			{content}
		</Layout>
	))
	.addWithInfo(`🎨 TwoColumns ${app.toUpperCase()} with tabs`, () => (
		<Layout id={app} hasTheme={true} header={header} mode="TwoColumns" one={sidePanel} tabs={tabs}>
			{content}
		</Layout>
	))
);

stories
	.addWithInfo('TwoColumns with big Table list', () => (
		<Layout header={header} mode="TwoColumns" one={dockedSidePanel}>
			<List {...listProps} />
		</Layout>
	));

apps.forEach(app => stories
	.addWithInfo(`TwoColumns ${app.toUpperCase()} with big Table list`, () => (
		<Layout id={app} header={header} mode="TwoColumns" one={dockedSidePanel}>
			<List {...listProps} />
		</Layout>
	))
	.addWithInfo(`🎨 TwoColumns ${app.toUpperCase()} with big Table list`, () => (
		<Layout id={app} hasTheme={true} header={header} mode="TwoColumns" one={dockedSidePanel}>
			<List {...listProps} />
		</Layout>
	))
);

stories
	.addWithInfo('TwoColumns with big Large list', () => (
		<Layout header={header} mode="TwoColumns" one={dockedSidePanel}>
			<List {...listProps} displayMode={'large'}/>
		</Layout>
	));

apps.forEach(app => stories
	.addWithInfo(`TwoColumns ${app.toUpperCase()} with big Large list`, () => (
		<Layout id={app} header={header} mode="TwoColumns" one={dockedSidePanel}>
			<List {...listProps} displayMode={'large'}/>
		</Layout>
	))
	.addWithInfo(`🎨 TwoColumns ${app.toUpperCase()} with big Large list`, () => (
		<Layout id={app} hasTheme={true} header={header} mode="TwoColumns" one={dockedSidePanel}>
			<List {...listProps} displayMode={'large'}/>
		</Layout>
	))
);

stories
	.addWithInfo('TwoColumns docked', () => (
		<Layout header={header} mode="TwoColumns" one={dockedSidePanel}>
			{content}
		</Layout>
	));

apps.forEach(app => stories
	.addWithInfo(`TwoColumns ${app.toUpperCase()} docked`, () => (
		<Layout id={app} header={header} mode="TwoColumns" one={dockedSidePanel}>
			{content}
		</Layout>
	))
	.addWithInfo(`🎨 TwoColumns ${app.toUpperCase()} docked`, () => (
		<Layout id={app} hasTheme={true} header={header} mode="TwoColumns" one={dockedSidePanel}>
			{content}
		</Layout>
	))
);

stories
	.addWithInfo('TwoColumns with drawers', () => (
		<Layout header={header} mode="TwoColumns" one={sidePanel} drawers={drawers}>
			{content}
		</Layout>
	));

apps.forEach(app => stories
	.addWithInfo(`TwoColumns ${app.toUpperCase()} with drawers`, () => (
		<Layout id={app} header={header} mode="TwoColumns" one={sidePanel} drawers={drawers}>
			{content}
		</Layout>
	))
	.addWithInfo(`🎨 TwoColumns ${app.toUpperCase()} with drawers`, () => (
		<Layout id={app} hasTheme={true} header={header} mode="TwoColumns" one={sidePanel} drawers={drawers}>
			{content}
		</Layout>
	))
);

stories
	.addWithInfo('OneColumn with footer', () => (
		<Layout header={header} mode="OneColumn" footer={footer}>
			{content}
		</Layout>
	));

apps.forEach(app => stories
	.addWithInfo(`OneColumn ${app.toUpperCase()} with footer`, () => (
		<Layout id={app} header={header} mode="OneColumn" footer={footer}>
			{content}
		</Layout>
	))
	.addWithInfo(`🎨 OneColumn ${app.toUpperCase()} with footer`, () => (
		<Layout id={app} hasTheme={true} header={header} mode="OneColumn" footer={footer}>
			{content}
		</Layout>
	))
);

stories
	.addWithInfo('OneColumn without header', () => (
		<Layout mode="OneColumn">
			<h1>Hello world</h1>
		</Layout>
	));

apps.forEach(app => stories
	.addWithInfo(`OneColumn ${app.toUpperCase()} without header`, () => (
		<Layout id={app} mode="OneColumn">
			{content}
		</Layout>
	))
	.addWithInfo(`🎨 OneColumn ${app.toUpperCase()} without header`, () => (
		<Layout id={app} hasTheme={true} mode="OneColumn">
			{content}
		</Layout>
	))
);

stories
	.addWithInfo('Subheader with OneColumn', () => (
		<Layout header={header} subHeader={subHeader} mode="OneColumn" footer={footer}>
			<h1>Hello world</h1>
		</Layout>
	));

apps.forEach(app => stories
	.addWithInfo(`Subheader ${app.toUpperCase()} with OneColumn`, () => (
		<Layout id={app} header={header} subHeader={subHeader} mode="OneColumn" footer={footer}>
			{content}
		</Layout>
	))
	.addWithInfo(`🎨 Subheader ${app.toUpperCase()} with OneColumn`, () => (
		<Layout id={app} hasTheme={true} header={header} subHeader={subHeader} mode="OneColumn" footer={footer}>
			{content}
		</Layout>
	))
);

stories
	.addWithInfo('Subheader with TwoColumns', () => (
		<Layout header={header} subHeader={subHeader} one={sidePanel} mode="TwoColumns" footer={footer}>
			{content}
		</Layout>
	));

apps.forEach(app => stories
	.addWithInfo(`Subheader ${app.toUpperCase()} with TwoColumns`, () => (
		<Layout id={app} subHeader={subHeader}>
			{content}
		</Layout>
	))
	.addWithInfo(`🎨 Subheader ${app.toUpperCase()} with TwoColumns`, () => (
		<Layout id={app} hasTheme={true} subHeader={subHeader}>
			{content}
		</Layout>
	))
);

stories
	.addWithInfo('Subheader alone', () => (
		<Layout subHeader={subHeader}>
			{content}
		</Layout>
	));

apps.forEach(app => stories
	.addWithInfo(`Subheader ${app.toUpperCase()} alone`, () => (
		<Layout id={app} subHeader={subHeader}>
			{content}
		</Layout>
	))
	.addWithInfo(`🎨 Subheader ${app.toUpperCase()} alone`, () => (
		<Layout id={app} hasTheme={true} subHeader={subHeader}>
			{content}
		</Layout>
	))
);
