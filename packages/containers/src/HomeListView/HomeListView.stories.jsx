import { Drawer } from '@talend/react-components';
import { fn as action } from 'storybook/test';
import Immutable from 'immutable';

import HomeListView from '.';

const primary = {
	label: 'Primary',
	bsStyle: 'primary',
	onClick: action(),
};

const cancel = {
	label: 'Cancel',
	onClick: action(),
};

const connect = {
	label: 'Connect',
	onClick: action(),
};

const panelActions = {
	left: [cancel],
	right: [connect, primary],
};

const multi3 = {
	label: 'multi3',
	icon: 'talend-cog',
	onClick: action(),
};

const multiSelectActions = {
	left: [
		{
			label: 'multi1',
			icon: 'talend-cog',
			onClick: action(),
		},
		{
			label: 'multi2',
			icon: 'talend-cog',
			onClick: action(),
		},
	],
	right: [
		multi3,
		{
			label: 'multi4',
			icon: 'talend-cog',
			onClick: action(),
		},
	],
};

const basicProps = {
	actions: panelActions,
	multiSelectActions,
};

const header = {
	app: 'Example app',
};

const sidepanel = {
	actionIds: [
		'menu:first',
		'menu:second',
		'menu:third',
		'menu:first',
		'menu:second',
		'menu:third',
		'menu:first',
		'menu:second',
		'menu:third',
		'menu:first',
		'menu:first',
		'menu:second',
		'menu:third',
		'menu:first',
		'menu:second',
		'menu:third',
		'menu:first',
		'menu:second',
		'menu:third',
		'menu:first',
		'menu:second',
		'menu:third',
		'menu:first',
		'menu:second',
		'menu:third',
		'menu:first',
		'menu:second',
		'menu:third',
	],
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
	title: 'list:view',
	left: ['list:add', 'list:upload'],
	items: ['list:delete'],
};

const toolbar = {
	sort: {
		field: 'id',
		options: [
			{ id: 'id', name: 'Id' },
			{ id: 'label', name: 'Name' },
		],
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

export default {
	title: 'HomeListView',
};

export function Default() {
	return (
		<div>
			<HomeListView sidepanel={sidepanel} list={listProps} />
		</div>
	);
}

export const WithDrawer = () => (
	<HomeListView header={header} sidepanel={sidepanel} list={listProps}>
		<Drawer stacked title="Im stacked drawer 1" footerActions={{ ...basicProps, selected: 0 }}>
			<h1>Hello drawer 1</h1>
			<p>You should not being able to read this because I&#39;m first</p>
		</Drawer>
		<Drawer title="Im drawer 2" footerActions={{ ...basicProps, selected: 0 }}>
			<h1>Hello drawer 2</h1>
			<p>The content dictate the width</p>
		</Drawer>
	</HomeListView>
);
