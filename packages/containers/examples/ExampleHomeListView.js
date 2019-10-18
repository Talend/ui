import React from 'react';
import { Drawer, IconsProvider } from '@talend/react-components';
import {
	TALEND_T7_THEME_APPS as apps,
	TALEND_T7_THEME_CLASSNAME,
} from '@talend/react-components/lib/Layout/constants';
import talendIcons from '@talend/icons/dist/react';
import { action } from '@storybook/addon-actions';
import Immutable from 'immutable';

import { HomeListView } from '../src';

const primary = {
	label: 'Primary',
	bsStyle: 'primary',
	onClick: action('You clicked on primary action'),
};

const cancel = {
	label: 'Cancel',
	onClick: action('You clicked on cancel action'),
};

const connect = {
	label: 'Connect',
	onClick: action('You clicked on connect action'),
};

const panelActions = {
	left: [cancel],
	right: [connect, primary],
};

const multi3 = {
	label: 'multi3',
	icon: 'talend-cog',
	onClick: action('You clicked me'),
};

const multiSelectActions = {
	left: [
		{
			label: 'multi1',
			icon: 'talend-cog',
			onClick: action('You clicked me'),
		},
		{
			label: 'multi2',
			icon: 'talend-cog',
			onClick: action('You clicked me'),
		},
	],
	right: [
		multi3,
		{
			label: 'multi4',
			icon: 'talend-cog',
			onClick: action('You clicked me'),
		},
	],
};

const basicProps = {
	actions: panelActions,
	multiSelectActions,
};

const icons = {
	'talend-arrow-left': talendIcons['talend-arrow-left'],
	'talend-badge': talendIcons['talend-badge'],
	'talend-caret-down': talendIcons['talend-caret-down'],
	'talend-cross': talendIcons['talend-cross'],
	'talend-cog': talendIcons['talend-cog'],
	'talend-dataprep': talendIcons['talend-dataprep'],
	'talend-expanded': talendIcons['talend-expanded'],
	'talend-file': talendIcons['talend-file'],
	'talend-file-json-o': talendIcons['talend-file-json-o'],
	'talend-file-xls-o': talendIcons['talend-file-xls-o'],
	'talend-folder': talendIcons['talend-folder'],
	'talend-icons': talendIcons['talend-icons'],
	'talend-logo': talendIcons['talend-logo'],
	'talend-pencil': talendIcons['talend-pencil'],
	'talend-plus': talendIcons['talend-plus'],
	'talend-plus-circle': talendIcons['talend-plus-circle'],
	'talend-search': talendIcons['talend-search'],
	'talend-star': talendIcons['talend-star'],
	'talend-streams': talendIcons['talend-streams'],
	'talend-table': talendIcons['talend-table'],
	'talend-tiles': talendIcons['talend-tiles'],
	'talend-trash': talendIcons['talend-trash'],
	'talend-opener': talendIcons['talend-opener'],
	'talend-upload': talendIcons['talend-upload'],
};

const header = {
	app: 'Example app',
};

const sidepanel = {
	actionIds: ['menu:first', 'menu:second', 'menu:third', 'menu:first', 'menu:second', 'menu:third', 'menu:first', 'menu:second', 'menu:third', 'menu:first', 'menu:first', 'menu:second', 'menu:third', 'menu:first', 'menu:second', 'menu:third', 'menu:first', 'menu:second', 'menu:third', 'menu:first', 'menu:second', 'menu:third', 'menu:first', 'menu:second', 'menu:third', 'menu:first', 'menu:second', 'menu:third' ],
};

const list = {
	columns: [
		{ key: 'id', label: 'Id' },
		{ key: 'label', label: 'Name' },
		{ key: 'author', label: 'Author' },
		{ key: 'created', label: 'Created' },
		{ key: 'modified', label: 'Modified' },
	],
	titleProps: {
		key: 'label',
	},
};

const actions = {
	title: 'object:view',
	left: ['object:add', 'object:upload'],
	items: ['object:delete'],
};

const toolbar = {
	sort: {
		field: 'id',
		options: [{ id: 'id', name: 'Id' }, { id: 'label', name: 'Name' }],
	},
	filter: {
		placeholder: 'find an object',
	},
};

const items = Immutable.fromJS([
	{
		id: 1,
		label: 'Title with actions',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'fa fa-file-excel-o',
		display: 'text',
		className: 'item-0-class',
	},
	{
		id: 2,
		label: 'Title in input mode',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'fa fa-file-pdf-o',
		display: 'input',
		className: 'item-1-class',
	},
	{
		id: 3,
		label: 'Super long title to trigger overflow on tile rendering',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT with super long name',
	},
]);

const listProps = {
	list,
	actions,
	toolbar,
	items,
};

const ExampleHomeListView = {
	default: () => (
		<div>
			<IconsProvider defaultIcons={icons} />
			<HomeListView sidepanel={sidepanel} list={listProps} />
		</div>
	),
};

const appStyle = require('./config/themes.scss');

apps.forEach(app => {
	ExampleHomeListView[`🎨 ${app.toUpperCase()} default`] = () => (
		<div className={appStyle[app]}>
			<div className={TALEND_T7_THEME_CLASSNAME}>
				<IconsProvider defaultIcons={icons} />
				<HomeListView
					// hasTheme - option must be set if you import one and only one theme
					sidepanel={sidepanel}
					list={listProps}
				/>
			</div>
		</div>
	);
});

ExampleHomeListView.drawer = () => (
	<div>
		<IconsProvider defaultIcons={icons} />
		<HomeListView header={header} sidepanel={sidepanel} list={listProps}>
			<Drawer
				stacked
				title="Im stacked drawer 1"
				footerActions={Object.assign({}, basicProps, { selected: 0 })}
			>
				<h1>Hello drawer 1</h1>
				<p>You should not being able to read this because I&#39;m first</p>
			</Drawer>
			<Drawer title="Im drawer 2" footerActions={Object.assign({}, basicProps, { selected: 0 })}>
				<h1>Hello drawer 2</h1>
				<p>The content dictate the width</p>
			</Drawer>
		</HomeListView>
	</div>
);

apps.forEach(app => {
	ExampleHomeListView[`🎨 ${app.toUpperCase()} drawer`] = () => (
		<div className={appStyle[app]}>
			<div className={TALEND_T7_THEME_CLASSNAME}>
				<IconsProvider defaultIcons={icons} />
				<HomeListView header={header} sidepanel={sidepanel} list={listProps}>
					<Drawer
						stacked
						title="Im stacked drawer 1"
						footerActions={Object.assign({}, basicProps, { selected: 0 })}
					>
						<h1>Hello drawer 1</h1>
						<p>You should not being able to read this because I&#39;m first</p>
					</Drawer>
					<Drawer
						title="Im drawer 2"
						footerActions={Object.assign({}, basicProps, { selected: 0 })}
					>
						<h1>Hello drawer 2</h1>
						<p>The content dictate the width</p>
					</Drawer>
				</HomeListView>
			</div>
		</div>
	);
});
export default ExampleHomeListView;
