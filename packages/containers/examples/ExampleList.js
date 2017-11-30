import React from 'react';
import { IconsProvider } from '@talend/react-components';
import Immutable from 'immutable';
import { I18nextProvider } from 'react-i18next';

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
	tile: undefined,
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
	virtualizedCustomHeight: () => (
		<div>
			<IconsProvider />
			<div className="list-container">
				<List {...props} items={items} rowHeight={customHeight} initialState={defaultListState} virtualized />
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
					<List {...props} items={items} virtualized />
				</div>
			</div>
		</I18nextProvider>
	),
};
export default ExampleList;
