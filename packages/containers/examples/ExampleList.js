import React from 'react';
import { IconsProvider } from 'react-talend-components';
import Immutable from 'immutable';
import { List } from '../src';

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
	left: ['object:add'],
	items: ['object:delete'],
};

const toolbar = {
	sort: {
		field: 'id',
		options: [
			{ id: 'id', name: 'Id' },
			{ id: 'label', name: 'Name' },
		],
	},
	display: {
		displayModes: ['large', 'table'],
	},
	filter: {
		placeholder: 'find an object',
	},
};

const props = {
	list,
	actions,
	toolbar,
};

const items = Immutable.fromJS([
	{
		id: 'id1',
		label: 'Title with actions',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'fa fa-file-excel-o',
		display: 'text',
		className: 'item-0-class',
	},
	{
		id: 'ID2',
		label: 'Title in input mode',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'fa fa-file-pdf-o',
		display: 'input',
		className: 'item-1-class',
	},
	{
		id: 'iD3',
		label: 'Super long title to trigger overflow on tile rendering',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT with super long name',
	},
]);

const ExampleList = {
	default: () => (
		<div>
			<IconsProvider />
			<div className="list-container">
				<List {...props} items={items} />
			</div>
		</div>
	),
	'no toolbar': () => (
		<div>
			<IconsProvider />
			<div className="list-container">
				<List list={list} actions={actions} items={items} />
			</div>
		</div>
	),
	virtualized: () => (
		<div>
			<IconsProvider />
			<div className="list-container">
				<List {...props} items={items} virtualized />
			</div>
		</div>
	),
};
export default ExampleList;
