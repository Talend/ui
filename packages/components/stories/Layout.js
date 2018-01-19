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
		));

/**
 * Generate story and its variation for <Layout/> component
 *
 * @param layoutStoryName Story name to display in storybook
 * @param layoutStoryProps Props to pass to <Layout/> component
 * @param layoutStoryContent Optional custom children
 */
function decorateLayoutStory(layoutStoryName, layoutStoryProps, layoutStoryContent = content) {
	stories
		.addWithInfo(layoutStoryName, () => (
			<Layout {...layoutStoryProps}>
				{layoutStoryContent}
			</Layout>
		));
	apps
		.forEach(app => {
				const appStyle = require(`../src/Layout/_Layout.${app}.scss`);
				const decoratedPropsWithTheme = {
					...layoutStoryProps,
					hasTheme: true,
				};
				stories.addWithInfo(`🎨 [${app.toUpperCase()}] ${layoutStoryName} `, () => (
					<div className={appStyle.t7}>
						<Layout {...decoratedPropsWithTheme}>
							{layoutStoryContent}
						</Layout>
					</div>
				));
			}
		);
}

decorateLayoutStory('OneColumn', {
	header,
	mode: 'OneColumn',
});

decorateLayoutStory('OneColumn with tabs', {
	header,
	tabs,
	mode: 'OneColumn',
});

decorateLayoutStory('TwoColumns', {
	header,
	mode: 'TwoColumns',
	one: sidePanel,
});

decorateLayoutStory('TwoColumns with tabs', {
	header,
	tabs,
	mode: 'TwoColumns',
	one: sidePanel,
});

decorateLayoutStory('TwoColumns with big Table list', {
		header,
		mode: 'TwoColumns',
		one: sidePanel,
	},
	<List {...listProps} />,
);

decorateLayoutStory('TwoColumns with big Large list', {
		header,
		mode: 'TwoColumns',
		one: sidePanel,
	},
	<List {...listProps} displayMode={'large'}/>,
);

decorateLayoutStory('TwoColumns docked', {
	header,
	mode: 'TwoColumns',
	one: dockedSidePanel,
});

decorateLayoutStory('TwoColumns with drawers', {
	header,
	mode: 'TwoColumns',
	one: sidePanel,
	drawers,
});

decorateLayoutStory('OneColumn with footer', {
	header,
	mode: 'OneColumn',
	footer,
});

decorateLayoutStory('OneColumn without header', {
	mode: 'OneColumn',
});

decorateLayoutStory('OneColumn with subHeader', {
	header,
	subHeader,
	mode: 'OneColumn',
	footer,
});

decorateLayoutStory('TwoColumns with subHeader', {
	header,
	subHeader,
	one: sidePanel,
	mode: 'TwoColumns',
	footer,
});

decorateLayoutStory('Only subHeader', {
	subHeader,
});
