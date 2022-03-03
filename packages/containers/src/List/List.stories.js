import React from 'react';
import PropTypes from 'prop-types';

import api from '@talend/react-cmf';
import Immutable from 'immutable';
import cloneDeep from 'lodash/cloneDeep';

import List from '.';

/**
 * Cell renderer that displays hello + text
 */
function CellWithHello({ cellData }) {
	return <div>hello {cellData} !</div>;
}

CellWithHello.displayName = 'VirtualizedList(CellWithHello)';
CellWithHello.propTypes = {
	cellData: PropTypes.string,
};

api.component.register('helloComp', CellWithHello);

/**
 * Cell renderer that displays hello + text
 */
function CustomHeader({ label }) {
	return <div>hello {label} !</div>;
}

CustomHeader.displayName = 'VirtualizedList(CustomHeader)';
CustomHeader.propTypes = {
	label: PropTypes.string,
};

api.component.register('helloHeader', CustomHeader);

const list = {
	columns: [
		{ key: 'id', label: 'Id' },
		{ key: 'label', label: 'Name' },
		{ key: 'count', label: 'Count' },
		{ key: 'author', label: 'Author' },
		{ key: 'created', label: 'Created' },
		{ key: 'modified', label: 'Modified' },
	],
	titleProps: {
		key: 'label',
	},
};

const listWithTimestamp = {
	columns: [
		{ key: 'id', label: 'Id', type: 'hello' },
		{ key: 'label', label: 'Name', header: 'helloHeader', sortFunction: '_list_sort:sortByLength' },
		{ key: 'author', label: 'Author' },
		{
			key: 'created',
			label: 'Created',
			type: 'datetime',
			data: { mode: 'format', pattern: 'HH:mm:ss YYYY-MM-DD', iconName: 'talend-scheduler' },
			header: 'icon',
		},
		{
			key: 'modified',
			label: 'Modified',
			type: 'datetime',
			data: { mode: 'ago' },
		},
	],
	titleProps: {
		key: 'label',
	},
};

const actions = {
	title: 'list:view',
	left: ['list:add', 'list:upload', 'menu:items'],
	items: ['list:delete'],
};

const actionsWithPersistent = {
	...actions,
	persistentItemsActions: ['list:add'],
};

const actionsWithSeparator = {
	items: [['list:add'], actions.items],
	persistentItemsActions: ['list:add'],
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

const customHeight = {
	large: 200,
	table: 100,
};

const defaultListState = new Immutable.Map({
	displayMode: 'large',
});

const defaultSortedListState = new Immutable.Map({
	sortOn: 'modified',
	sortAsc: false,
});

const items = Immutable.fromJS([
	{
		id: 'id1',
		label: 'Title with actions',
		count: 1,
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
		count: 11,
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
		count: 2,
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT with super long name',
	},
	{
		id: 'id4',
		label: 'Simple title',
		count: 0,
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
	},
	{
		id: 'id5',
		label: 'Simple title',
		count: 11,
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
	},
	{
		id: 'id6',
		label: 'Simple title another one',
		count: 0,
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
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
	field: 'modified',
	isDescending: false,
};
const propsTimestampSorted = cloneDeep(props);
propsTimestampSorted.list = listWithTimestamp;
propsTimestampSorted.list.sort = sortUpdatedAsc;

export default {
	title: 'List',
};

export const Default = () => (
	<div className="list-container">
		<List {...props} items={items} />
	</div>
);
export const WithPersistentActions = () => (
	<div className="list-container">
		<List {...props} actions={actionsWithPersistent} items={items} />
	</div>
);
export const WithSeparatorActions = () => (
	<div className="list-container">
		<List {...props} actions={actionsWithSeparator} items={items} />
	</div>
);
export const Pagination = () => {
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
		<div className="list-container">
			<List {...propsPg} items={itemsPg} />
		</div>
	);
};
export const InProgress = () => {
	const props2 = cloneDeep(props);
	props2.list.inProgress = true;
	return (
		<div className="list-container">
			<List {...props2} items={items} />
		</div>
	);
};
export const MultiSelection = () => {
	const multiSelectionProps = cloneDeep(props);
	multiSelectionProps.multiSelectActions = {
		left: ['list:multi:remove'],
	};
	multiSelectionProps.idKey = 'id';
	return (
		<div className="list-container">
			<List {...multiSelectionProps} items={items} />
		</div>
	);
};
export const NoToolbar = () => (
	<div className="list-container">
		<List list={list} actions={actions} items={items} />
	</div>
);
export const CustomHeight = () => (
	<div className="list-container">
		<List {...props} items={items} rowHeight={customHeight} initialState={defaultListState} />
	</div>
);
export const SortOnTimestamps = () => (
	<div className="list-container">
		<List
			{...propsTimestampSorted}
			items={itemsWithTimestamp}
			initialState={defaultSortedListState}
		/>
	</div>
);
export const CustomCellRenderer = () => {
	const cellDictionary = {
		hello: { component: 'helloComp' },
	};

	return (
		<div className="list-container">
			<List
				virtualized
				{...propsTimestampSorted}
				items={itemsWithTimestamp}
				cellDictionary={cellDictionary}
			/>
		</div>
	);
};
export const CustomHeaderRenderer = () => {
	const headerDictionary = {
		helloHeader: { component: 'helloHeader' },
	};
	return (
		<div className="list-container">
			<List
				virtualized
				{...propsTimestampSorted}
				items={itemsWithTimestamp}
				headerDictionary={headerDictionary}
			/>
		</div>
	);
};
