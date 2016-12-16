import React from 'react';
import { IconsProvider } from 'react-talend-components';
import { List } from '../src';
import Immutable from 'immutable';

const props = {
	list: {
		columns: [
			{ key: 'id', label: 'Id' },
			{ key: 'name', label: 'Name' },
			{ key: 'author', label: 'Author' },
			{ key: 'created', label: 'Created' },
			{ key: 'modified', label: 'Modified' },
		],
		titleProps: {
			key: 'label',
		},
	},
	toolbar: {
		sort: {
			field: 'id',
			options: [
				{ id: 'id', name: 'Id' },
				{ id: 'name', name: 'Name' },
			],
		},
		filter: {
			placeholder: 'find an object',
		},
	},
	actions: {
		//title: 'object:view',
		//left: ['object:add'],
		//items: ['object:delete'],
	},
};

const items = Immutable.fromJS([
	{
		id: 1,
		name: 'Title with actions',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'fa fa-file-excel-o',
		display: 'text',
		className: 'item-0-class',
	},
	{
		id: 2,
		name: 'Title in input mode',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'fa fa-file-pdf-o',
		display: 'input',
		className: 'item-1-class',
	},
	{
		id: 3,
		name: 'Super long title to trigger overflow on tile rendering',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT with super long name',
	},
]);

export default function ExampleList() {
	return (
		<div>
			<IconsProvider />
			<List {...props} items={items} />
		</div>
	);
}
