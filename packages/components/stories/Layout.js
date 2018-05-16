import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';

import {
	List,
	IconsProvider,
	Layout,
	SidePanel,
	HeaderBar,
	Drawer,
	SubHeaderBar,
} from '../src/index';

import { TALEND_T7_THEME_APPS as apps, TALEND_T7_THEME_CLASSNAME } from '../src/Layout/constants';

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
	<SidePanel actions={actions} onToggleDock={action('Toggle dock clicked')} docked={false} />
);
const dockedSidePanel = (
	<SidePanel actions={actions} onToggleDock={action('Toggle dock clicked')} docked />
);
const header = <HeaderBar brand={{ label: 'Example App Name' }} />;
const subHeader = <SubHeaderBar title="MyTitle" onGoBack={action('SubHeader onGoBack')} />;
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
	selectedKey: '2',
};

const stories = storiesOf('Layout', module).addDecorator(story => (
	<div>
		<IconsProvider defaultIcons={icons} />
		{story()}
	</div>
));

const appStyle = require('./config/themes.scss');

/**
 * Generate story for <Layout/> component
 *
 * @param layoutStoryName Story name to display in storybook
 * @param layoutStoryProps Props to pass to <Layout/> component
 * @param layoutStoryContent Optional custom children
 */
function layoutStory(layoutStoryName, layoutStoryProps, layoutStoryContent = content) {
	stories.addWithInfo(layoutStoryName, () => (
		<Layout {...layoutStoryProps}>{layoutStoryContent}</Layout>
	));
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
	apps.forEach(app => {
		const decoratedPropsWithTheme = {
			...layoutStoryProps,
			// hasTheme: true, should be enabled if we have one and only one Layout theme scss import
		};
		stories.addWithInfo(`🎨 [${app.toUpperCase()}] ${layoutStoryName} `, () => (
			<div className={appStyle[app]}>
				<div className={TALEND_T7_THEME_CLASSNAME}>
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
	<List {...listProps} />,
);

decoratedLayoutStory(
	'TwoColumns with big Large list',
	{
		header,
		mode: 'TwoColumns',
		one: sidePanel,
	},
	<List {...listProps} displayMode={'large'} />,
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
