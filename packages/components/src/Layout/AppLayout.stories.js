import React from 'react';
import { action } from '@storybook/addon-actions';

import Drawer from '../Drawer';
import HeaderBar from '../HeaderBar';
import Layout from '.';
import SidePanel from '../SidePanel';
import SubHeaderBar from '../SubHeaderBar';
import List from '../List/ListComposition';

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
	<Drawer stacked title="Hello drawers" footerActions={{}}>
		<p>You should not being able to read this because I&apos;m first</p>
	</Drawer>,
	<Drawer title="Hello drawers" footerActions={{}}>
		<p>The content dictate the width</p>
	</Drawer>,
];

const content = (
	<div>
		<h1>Welcome to the content for testing scroll</h1>
		<ul>
			{[...new Array(138)].map((_, index) => (
				<li key={index}>one</li>
			))}
		</ul>
	</div>
);
const sidePanel = <SidePanel actions={actions} />;
const dockedSidePanel = <SidePanel actions={actions} docked />;
const header = <HeaderBar brand={{ label: 'Example App Name' }} />;
const subHeader = <SubHeaderBar title="MyTitle" onGoBack={action('SubHeader onGoBack')} />;
const footer = <>Footer content</>;

const items = [...new Array(61)].map((_, index) => ({
	id: index,
	name: 'Title',
	created: '2016-09-22',
	modified: '2016-09-22',
	author: 'Jean-Pierre DUPONT',
	display: 'text',
}));

const tabs = {
	id: 'tab-bar',
	items: [
		{
			key: '1',
			label: 'Tab1',
		},
		{
			key: '2',
			label: 'Tab2',
		},
		{
			key: '3',
			label: 'Tab3',
		},
	],
	onSelect: action('onSelect'),
	selectedKey: '2',
};

export default {
	title: 'Layout/AppLayout',
};

export const OneColumn = () => <Layout mode="OneColumn" children={content} />;

export const OneColumnWithHeader = () => (
	<Layout mode="OneColumn" header={header} children={content} />
);

export const OneColumnWithSubheader = () => (
	<Layout mode="OneColumn" header={header} subHeader={subHeader} children={content} />
);

export const OneColumnWithHeaderAndFooter = () => (
	<Layout mode="OneColumn" header={header} footer={footer} children={content} />
);

export const OneColumnWithTabs = () => (
	<Layout mode="OneColumn" header={header} tabs={tabs} children={content} />
);

export const TwoColumnsWithHeader = () => (
	<Layout mode="TwoColumns" header={header} one={sidePanel} children={content} />
);

export const TwoColumnsWithSubheader = () => (
	<Layout
		mode="TwoColumns"
		header={header}
		subHeader={subHeader}
		one={sidePanel}
		children={content}
	/>
);

export const TwoColumnsWithHeaderAndFooter = () => (
	<Layout mode="TwoColumns" header={header} footer={footer} one={sidePanel} children={content} />
);

export const TwoColumnsWithTabs = () => (
	<Layout mode="TwoColumns" header={header} one={sidePanel} tabs={tabs} children={content} />
);

export const TwoColumnsWithBigTableList = () => (
	<Layout mode="TwoColumns" header={header} one={sidePanel}>
		<List.Manager id="my-list" collection={items}>
			<List.Toolbar>
				<List.DisplayMode id="my-list-displayMode" />
			</List.Toolbar>
			<List.VList id="my-vlist">
				<List.VList.Text label="Id" dataKey="id" />
				<List.VList.Text label="Name" dataKey="name" />
				<List.VList.Text label="Author" dataKey="author" />
				<List.VList.Text label="Created" dataKey="created" />
				<List.VList.Text label="Modified" dataKey="modified" />
			</List.VList>
		</List.Manager>
	</Layout>
);

export const TwoColumnsWithBigLargeList = () => (
	<Layout mode="TwoColumns" header={header} one={sidePanel}>
		<List.Manager id="my-list" collection={items} initialDisplayMode="large">
			<List.Toolbar>
				<List.DisplayMode id="my-list-displayMode" />
			</List.Toolbar>
			<List.VList id="my-vlist">
				<List.VList.Text label="Id" dataKey="id" />
				<List.VList.Text label="Name" dataKey="name" />
				<List.VList.Text label="Author" dataKey="author" />
				<List.VList.Text label="Created" dataKey="created" />
				<List.VList.Text label="Modified" dataKey="modified" />
			</List.VList>
		</List.Manager>
	</Layout>
);

export const TwoColumnsDocked = () => (
	<Layout mode="TwoColumns" header={header} one={dockedSidePanel} children={content} />
);

export const TwoColumnsWithDrawers = () => (
	<Layout mode="TwoColumns" header={header} one={sidePanel} drawers={drawers} children={content} />
);

export const OnlySubheader = () => <Layout subHeader={subHeader} children={content} />;
