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
	titleKey: 'label',
	idKey: 'id',
};

const listWithTimestamp = {
	columns: [
		{ key: 'id', label: 'Id' },
		{ key: 'label', label: 'Name' },
		{ key: 'author', label: 'Author' },
		{
			key: 'created',
			label: 'Created',
			type: 'datetime',
			data: { mode: 'format', pattern: 'HH:mm:ss YYYY-MM-DD' },
		},
		{ key: 'modified', label: 'Modified', type: 'datetime', data: { mode: 'ago' } },
	],
	titlekey: 'label',
};

const actions = {
	title: 'object:view',
	left: ['object:add', 'object:upload', 'menu:items'],
	items: ['object:delete'],
};

const toolbar = {
	toolbar: true,
	sortOn: 'id',
	sortOptions: [{ id: 'id', name: 'Id' }, { id: 'label', name: 'Name' }],
	displayModes: ['large', 'table'],
	filterPlaceholder: 'find an object',
};

const props = {
	...list,
	...toolbar,
	actions,
};

const customHeight = {
	large: 200,
	table: 100,
};

export const defaultListState = new Immutable.Map({
	displayMode: 'large',
});
export const defaultSortedListState = new Immutable.Map({
	sortOn: 'modified',
	sortAsc: false,
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

const referenceDatetime = Date.now();
const minusThreeHours = referenceDatetime - 3600 * 3 * 1000;
const minusTwoHours = referenceDatetime - 3600 * 2 * 1000;
const minusOneHours = referenceDatetime - 3600 * 1 * 1000;
const minusThreeMin = referenceDatetime - 60 * 3 * 1000;

const oneDay = 24 * 3600 * 1000;

const itemsWithTimestamp = Immutable.fromJS([
	{
		id: 'id0',
		label: 'Title with actions but first',
		created: minusThreeHours,
		modified: minusThreeHours,
		author: 'Jean-Pierre DUPONT',
		icon: 'fa fa-file-excel-o',
		display: 'text',
		className: 'item-0-class',
	},
	{
		id: 'ID2',
		label: 'Title in input mode',
		created: minusTwoHours,
		modified: minusTwoHours - oneDay * 2,
		author: 'Jean-Pierre DUPONT',
		icon: 'fa fa-file-pdf-o',
		display: 'input',
		className: 'item-1-class',
	},
	{
		id: 'id1',
		label: 'Title with actions',
		created: minusThreeMin - oneDay,
		modified: minusThreeMin,
		author: 'Jean-Pierre DUPONT',
		icon: 'fa fa-file-excel-o',
		display: 'text',
		className: 'item-0-class',
	},
	{
		id: 'iD3',
		label: 'Super long title to trigger overflow on some rendering',
		created: minusOneHours - oneDay,
		modified: minusOneHours,
		author: 'Jean-Pierre DUPONT with super long name',
	},
]);

const sortUpdatedAsc = {
	sortOn: 'modified',
	isSortDescending: false,
};
const propsTimestampSorted = cloneDeep(props);
Object.assign(propsTimestampSorted, listWithTimestamp);
Object.assign(propsTimestampSorted, sortUpdatedAsc);

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
		propsPg.pagination = true;
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
		props2.inProgress = true;
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
				<List {...list} items={items} />
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
	'sort on timestamps': () => (
		<div>
			<IconsProvider />
			<div className="list-container">
				<List
					{...propsTimestampSorted}
					items={itemsWithTimestamp}
					initialState={defaultSortedListState}
				/>
			</div>
		</div>
	),
	'multi selection': () => {
		const multiSelectionProps = cloneDeep(props);
		multiSelectionProps.multiSelectActions = {
			left: ['object:remove'],
		};
		multiSelectionProps.multiSelectionKey = 'id';
		return (
			<div>
				<IconsProvider />
				<div className="list-container">
					<List {...multiSelectionProps} items={items} />
				</div>
			</div>
		);
	},
};
export default ExampleList;
