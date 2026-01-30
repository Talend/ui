/* eslint-disable no-console */
import { useState } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import List from './List.component';
import { columnChooserService } from './Toolbar/ColumnChooserButton';

function MyCustomRow(props) {
	return (
		<div style={props.style}>
			<h1 style={{ fontSize: 16 }}>{props.parent.props.collection[props.index].name}</h1>
			<ul>
				<li>style: {JSON.stringify(props.style)}</li>
				<li>index: {props.index}</li>
				<li>isScrolling: {props.isScrolling.toString()}</li>
			</ul>
		</div>
	);
}

function ListColumnChooser({ list, ...rest }) {
	const [columnsChooser, setColumnsChooser] = useState(list.columns);
	const onSubmit = (_, newColumnsChooser) => {
		setColumnsChooser(newColumnsChooser);
	};
	const enrichedList = {
		...list,
		columns: columnChooserService.mergeWithColumnChooserCollection(list.columns, columnsChooser),
	};
	const columnChooser = {
		columns: columnsChooser,
		onSubmit,
		nbLockedLeftItems: 2,
	};
	return <List {...rest} list={enrichedList} columnChooser={columnChooser} />;
}

function CellWithHello({ cellData }) {
	return <div>hello {cellData} !</div>;
}

CellWithHello.displayName = 'VirtualizedList(CellWithHello)';
CellWithHello.propTypes = {
	cellData: PropTypes.string,
};

const selected = [
	{
		id: 2,
		name: 'Foo',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'talend-file-json-o',
	},
];

const overlayAction = {
	id: 'overlay-button',
	overlayId: 'overlay',
	label: 'overlay',
	icon: 'talend-pencil',
	onClick: () => console.log('overlay.open'),
	overlayComponent: <div>Overlay</div>,
	overlayPlacement: 'bottom',
	preventScrolling: true,
};

const actions = [
	{
		id: 'edit',
		label: 'edit',
		icon: 'talend-pencil',
		onClick: () => console.log('onEdit'),
	},
	{
		id: 'delete',
		label: 'delete',
		icon: 'talend-trash',
		onClick: () => console.log('onDelete'),
	},
	{
		id: 'related',
		displayMode: 'dropdown',
		label: 'related items',
		icon: 'talend-folder',
		items: [
			{
				label: 'document 1',
				onClick: () => console.log('document 1 click'),
			},
			{
				label: 'document 2',
				onClick: () => console.log('document 2 click'),
			},
		],
		pullRight: true,
	},
];

const lotsOfActions = [
	{
		id: 'edit',
		label: 'edit',
		icon: 'talend-pencil',
		onClick: () => console.log('onEdit'),
	},
	{
		id: 'delete',
		label: 'delete',
		icon: 'talend-trash',
		onClick: () => console.log('onDelete'),
	},
	{
		id: 'copy',
		label: 'copy',
		icon: 'talend-files-o',
		onClick: () => console.log('onCopy'),
	},
	{
		id: 'parameters',
		label: 'efit parameters',
		icon: 'talend-cog',
		onClick: () => console.log('onEditParameters'),
	},
	{
		id: 'related',
		displayMode: 'dropdown',
		label: 'related items',
		icon: 'talend-folder',
		items: [
			{
				label: 'document 1',
				onClick: () => console.log('document 1 click'),
			},
			{
				label: 'document 2',
				onClick: () => console.log('document 2 click'),
			},
		],
		pullRight: true,
	},
];

const persistentActions = [
	{
		id: 'edit',
		label: 'edit',
		icon: 'talend-apache',
		onClick: () => console.log('onEdit'),
	},
];

const props = {
	id: 'talend',
	displayMode: 'table',
	list: {
		columns: [
			{ key: 'id', label: 'Id', order: 1 },
			{ key: 'name', label: 'Name', order: 2 },
			{ key: 'author', label: 'Author', order: 3 },
			{ key: 'created', label: 'Created', order: 6 },
			{
				key: 'modified',
				label: 'Modified',
				order: 4,
				header: 'icon',
				data: { iconName: 'talend-scheduler' },
			},
			{ key: 'icon', label: 'Icon', hidden: true, order: 5 },
		],
		items: [
			{
				id: 0,
				name: 'Title with actions',
				created: '2016-09-22',
				modified: '2016-09-22',
				author: 'Jean-Pierre DUPONT',
				actions,
				icon: 'talend-file-s3-o',
				display: 'text',
				className: 'item-0-class',
			},
			{
				id: 1,
				name: 'Title with a lot of actions',
				created: '2016-09-22',
				modified: '2016-09-22',
				author: 'Jean-Pierre DUPONT',
				actions: lotsOfActions,
				icon: 'talend-file-xls-o',
				display: 'text',
				className: 'item-1-class',
			},
			{
				id: 2,
				name: 'Title with super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super long title oh yeah',
				created: '2016-09-22',
				modified: '2016-09-22',
				author: 'Jean-Pierre DUPONT',
				icon: 'talend-file-xls-o',
				display: 'text',
				className: 'item-1-class',
			},
			{
				id: 3,
				name: 'Title in input mode',
				created: '2016-09-22',
				modified: '2016-09-22',
				author: 'Jean-Pierre DUPONT',
				icon: 'talend-file-json-o',
				display: 'input',
				className: 'item-2-class',
			},
			{
				persistentActions,
				id: 4,
				name: 'Super long title to trigger overflow on tile rendering',
				created: '2016-09-22',
				modified: '2016-09-22',
				author:
					'Jean-Pierre DUPONT with super super super super super super super super super super super super super super super super super super super super super super super long name, but there was not enough long text',
				className: 'item-3-class',
			},
		],
		titleProps: {
			key: 'name',
			iconKey: 'icon',
			displayModeKey: 'display',
			onClick: () => console.log('onTitleClick'),
			onEditCancel: () => console.log('onEditCancel'),
			onEditSubmit: () => console.log('onEditSubmit'),
		},
		itemProps: {
			classNameKey: 'className',
		},
	},
	toolbar: {
		actionBar: {
			actions: {
				left: [
					{
						id: 'add',
						label: 'Add Folder',
						bsStyle: 'info',
						icon: 'talend-plus-circle',
						onClick: () => console.log('add.onClick'),
					},
					{
						displayMode: 'splitDropdown',
						label: 'Add File',
						icon: 'talend-folder',
						onClick: () => console.log('onAdd'),
						items: [
							{
								label: 'From Local',
								onClick: () => console.log('From Local click'),
							},
							{
								label: 'From Remote',
								onClick: () => console.log('From Remote click'),
							},
						],
						emptyDropdownLabel: 'No option',
					},
				],
			},
		},
		display: {
			onChange: () => console.log('display.onChange'),
		},
		sort: {
			field: 'name',
			onChange: () => console.log('sort.onChange'),
			options: [
				{ id: 'id', name: 'Id' },
				{ id: 'name', name: 'Name With Multiple Words' },
			],
		},
		filter: {
			docked: true,
			onBlur: () => console.log('filter.onBlur'),
			onClear: () => console.log('filter.onClear'),
			onFocus: () => console.log('filter.onFocus'),
			onFilter: () => console.log('filter.onFilter'),
			onToggle: () => console.log('filter.onToggle'),
			placeholder: 'search for something',
		},
	},
};

const meta = {
	title: 'Components/List/List',
	component: List,
	tags: ['autodocs'],
};

export default meta;

export const TableDisplay = {
	render: () => (
		<div style={{ height: '70vh' }} className="virtualized-list">
			<h1>List</h1>
			<p>Display the list in table mode. This is the default mode.</p>
			<List {...props} />
		</div>
	),
};

export const TableWithNumber = {
	render: () => {
		const customProps = cloneDeep(props);
		customProps.toolbar.itemsNumber = {
			totalItems: customProps.list.items.length,
			label: `${customProps.list.items.length} users`,
		};
		return (
			<div style={{ height: '70vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>Display the list in table mode with the total number of items.</p>
				<List {...customProps} />
			</div>
		);
	},
};

export const TableIcons = {
	render: () => {
		const customProps = cloneDeep(props);
		const itemsForListWithIcons = [
			{ id: 0, name: 'Title 1', status: 'ok', cat: 'fluffy' },
			{ id: 1, name: 'Title 2', status: 'warning', cat: 'fat' },
			{ id: 2, name: 'Title 3', status: 'random', cat: 'regular' },
		];
		const getIcon = item => {
			switch (item.cat) {
				case 'fluffy':
					return { label: 'OK!', icon: 'talend-star', onClick: () => {} };
				case 'fat':
					return { label: 'Oh no!', icon: 'talend-warning', onClick: () => {} };
				default:
					return null;
			}
		};
		customProps.list.columns = [
			{ key: 'id', label: 'Id' },
			{ key: 'name', label: 'Name' },
			{ key: 'status', label: 'Status', type: 'texticon', data: { getIcon } },
			{ key: 'cat', label: 'Cat' },
		];
		customProps.list.items = itemsForListWithIcons;
		return (
			<div style={{ height: '70vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>Display with icons in status</p>
				<List {...customProps} />
			</div>
		);
	},
};

export const LargeDisplay = {
	render: () => {
		const customProps = cloneDeep(props);
		return (
			<div style={{ height: '70vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>displayMode large</p>
				<List {...customProps} rowHeight={140} displayMode="large" />
			</div>
		);
	},
};

export const EmptyTable = {
	render: () => {
		const emptyListProps = cloneDeep(props);
		emptyListProps.list.items = [];
		return (
			<div style={{ height: '70vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>Empty</p>
				<List {...emptyListProps} />
			</div>
		);
	},
};

export const NoToolbar = {
	render: () => {
		const tprops = cloneDeep(props);
		tprops.toolbar = undefined;
		return (
			<div style={{ height: '70vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>List without toolbar</p>
				<List {...tprops} />
			</div>
		);
	},
};

export const HiddenHeaderLabels = {
	render: () => {
		const customProps = cloneDeep(props);
		customProps.list.columns[0].hideHeader = true;
		return (
			<div style={{ height: '70vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>Hidden header labels</p>
				<List {...customProps} />
			</div>
		);
	},
};
