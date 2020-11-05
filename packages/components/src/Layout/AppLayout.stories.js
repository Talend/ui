import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Drawer from '../Drawer';
import HeaderBar from '../HeaderBar';
import IconsProvider from '../IconsProvider';
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
const footer = 'Footer content';

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

const stories = storiesOf('Layout/AppLayout', module).addDecorator(story => (
	<div>
		<IconsProvider />
		{story()}
	</div>
));

const appStyle = require('../../stories/config/themes.scss');

/**
 * Generate story for <Layout/> component
 *
 * @param layoutStoryName Story name to display in storybook
 * @param layoutStoryProps Props to pass to <Layout/> component
 * @param layoutStoryContent Optional custom children
 */
function layoutStory(layoutStoryName, layoutStoryProps, layoutStoryContent = content) {
	stories.add(layoutStoryName, () => <Layout {...layoutStoryProps}>{layoutStoryContent}</Layout>);
}

/**
 * Generate story and its variations for <Layout/> component
 *
 * @param layoutStoryName Story name to display in storybook
 * @param layoutStoryProps Props to pass to <Layout/> component
 * @param layoutStoryContent Optional custom children
 */
function decoratedLayoutStory(layoutStoryName, layoutStoryProps, layoutStoryContent = content) {
	layoutStory(layoutStoryName, layoutStoryProps, layoutStoryContent);
	[
		{ key: 'mdm', value: 'Master Data Management' },
		{ key: 'tdi', value: 'Data Inventory' },
		{ key: 'tdp', value: 'Data Preparation' },
		{ key: 'tds', value: 'Data Stewardship' },
		{ key: 'tmc', value: 'Management Console' },
		{ key: 'tpd', value: 'Pipeline Designer' },
	].forEach(({ key, value }) => {
		const decoratedPropsWithTheme = {
			...layoutStoryProps,
			// hasTheme: true, should be enabled if we have one and only one Layout theme scss import
		};
		stories.add(`[${value}] ${layoutStoryName} `, () => (
			<div className={appStyle[key]}>
				<div className={Layout.TALEND_T7_THEME_CLASSNAME}>
					<Layout {...decoratedPropsWithTheme}>{layoutStoryContent}</Layout>
				</div>
			</div>
		));
	});
}

decoratedLayoutStory('OneColumn', {
	header,
	mode: 'OneColumn',
});

decoratedLayoutStory('OneColumn with tabs', {
	header,
	tabs,
	mode: 'OneColumn',
});

decoratedLayoutStory('TwoColumns', {
	header,
	mode: 'TwoColumns',
	one: sidePanel,
});

decoratedLayoutStory('TwoColumns with tabs', {
	header,
	tabs,
	mode: 'TwoColumns',
	one: sidePanel,
});

decoratedLayoutStory(
	'TwoColumns with big Table list',
	{
		header,
		mode: 'TwoColumns',
		one: sidePanel,
	},
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
	</List.Manager>,
);

decoratedLayoutStory(
	'TwoColumns with big Large list',
	{
		header,
		mode: 'TwoColumns',
		one: sidePanel,
	},
	<List.Manager id="my-list" collection={items}>
		<List.Toolbar>
			<List.DisplayMode id="my-list-displayMode" initialValue="large" />
		</List.Toolbar>
		<List.VList id="my-vlist">
			<List.VList.Text label="Id" dataKey="id" />
			<List.VList.Text label="Name" dataKey="name" />
			<List.VList.Text label="Author" dataKey="author" />
			<List.VList.Text label="Created" dataKey="created" />
			<List.VList.Text label="Modified" dataKey="modified" />
		</List.VList>
	</List.Manager>,
);

decoratedLayoutStory('TwoColumns docked', {
	header,
	mode: 'TwoColumns',
	one: dockedSidePanel,
});

decoratedLayoutStory('TwoColumns with drawers', {
	header,
	mode: 'TwoColumns',
	one: sidePanel,
	drawers,
});

decoratedLayoutStory('OneColumn with footer', {
	header,
	mode: 'OneColumn',
	footer,
});

layoutStory('OneColumn without header', {
	mode: 'OneColumn',
});

decoratedLayoutStory('OneColumn with subHeader', {
	header,
	subHeader,
	mode: 'OneColumn',
	footer,
});

decoratedLayoutStory('TwoColumns with subHeader', {
	header,
	subHeader,
	one: sidePanel,
	mode: 'TwoColumns',
	footer,
});

layoutStory('Only subHeader', {
	subHeader,
});
