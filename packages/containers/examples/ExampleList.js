import React from 'react';
import { IconsProvider } from '@talend/react-components';
import Immutable from 'immutable';
import { I18nextProvider } from 'react-i18next';
import { cloneDeep } from 'lodash';

import { List } from '../src';
import i18n from './config/i18n';

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
	left: ['object:add', 'object:upload', 'menu:items'],
	items: ['object:delete'],
};

const toolbar = {
	sort: {
		field: 'id',
		options: [{ id: 'id', name: 'Id' }, { id: 'label', name: 'Name' }],
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

const customHeight = {
	large: 200,
	table: 100,
};

export const defaultListState = new Immutable.Map({
	displayMode: 'large',
});

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
		label: 'Super long title to trigger overflow on some rendering',
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
	pagination: () => {
		const propsPg = cloneDeep(props);
		const itemsPg = items.concat(
			Immutable.fromJS([
				{
					id: 'id4',
					label: 'Title with actions',
					created: '2016-09-22',
					modified: '2016-09-22',
					author: 'Jean-Pierre DUPONT',
				},
				{
					id: 'ID5',
					label: 'Title in input mode',
					created: '2016-09-22',
					modified: '2016-09-22',
					author: 'Jean-Pierre DUPONT',
				},
				{
					id: 'iD6',
					label: 'Super long title to trigger overflow on some rendering',
					created: '2016-09-22',
					modified: '2016-09-22',
					author: 'Jean-Pierre DUPONT with super long name',
				},
				{
					id: 'id7',
					label: 'Title with actions',
					created: '2016-09-22',
					modified: '2016-09-22',
					author: 'Jean-Pierre DUPONT',
				},
				{
					id: 'ID8',
					label: 'Title in input mode',
					created: '2016-09-22',
					modified: '2016-09-22',
					author: 'Jean-Pierre DUPONT',
				},
				{
					id: 'iD9',
					label: 'Super long title to trigger overflow on some rendering',
					created: '2016-09-22',
					modified: '2016-09-22',
					author: 'Jean-Pierre DUPONT with super long name',
				},
				{
					id: 'id10',
					label: 'Title with actions',
					created: '2016-09-22',
					modified: '2016-09-22',
					author: 'Jean-Pierre DUPONT',
				},
				{
					id: 'ID11',
					label: 'Title in input mode',
					created: '2016-09-22',
					modified: '2016-09-22',
					author: 'Jean-Pierre DUPONT',
				},
				{
					id: 'iD12',
					label: 'Super long title to trigger overflow on some rendering',
					created: '2016-09-22',
					modified: '2016-09-22',
					author: 'Jean-Pierre DUPONT with super long name',
				},
			]),
		);
		propsPg.toolbar.pagination = {};
		return (
			<div>
				<IconsProvider />
				<div className="list-container">
					<List {...propsPg} items={itemsPg} />
				</div>
			</div>
		);
	},
	'in progress': () => {
		const props2 = cloneDeep(props);
		props2.list.inProgress = true;
		return (
			<div>
				<IconsProvider />
				<div className="list-container">
					<List {...props2} items={items} />
				</div>
			</div>
		);
	},
	'no toolbar': () => (
		<div>
			<IconsProvider />
			<div className="list-container">
				<List list={list} actions={actions} items={items} />
			</div>
		</div>
	),
	CustomHeight: () => (
		<div>
			<IconsProvider />
			<div className="list-container">
				<List {...props} items={items} rowHeight={customHeight} initialState={defaultListState} />
			</div>
		</div>
	),
	i18n: () => (
		<I18nextProvider i18n={i18n}>
			<div>
				<p>Change language on the toolbar</p>
				<button onClick={() => i18n.changeLanguage('fr')}>fr</button>
				<button onClick={() => i18n.changeLanguage('it')}>it</button>
				<IconsProvider />
				<div className="list-container">
					<List {...props} items={items} />
				</div>
			</div>
		</I18nextProvider>
	),
};
export default ExampleList;
