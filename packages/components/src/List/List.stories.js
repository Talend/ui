/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { action } from '@storybook/addon-actions';
import Immutable from 'immutable'; // eslint-disable-line import/no-extraneous-dependencies
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

// eslint-disable-next-line react/prop-types
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
	onClick: action('overlay.open'),
	overlayComponent: <div>Overlay</div>,
	overlayPlacement: 'bottom',
	preventScrolling: true,
};

const actions = [
	{
		id: 'edit',
		label: 'edit',
		icon: 'talend-pencil',
		onClick: action('onEdit'),
	},
	{
		id: 'delete',
		label: 'delete',
		icon: 'talend-trash',
		onClick: action('onDelete'),
	},
	{
		id: 'related',
		displayMode: 'dropdown',
		label: 'related items',
		icon: 'talend-folder',
		items: [
			{
				label: 'document 1',
				onClick: action('document 1 click'),
			},
			{
				label: 'document 2',
				onClick: action('document 2 click'),
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
		onClick: action('onEdit'),
	},
	{
		id: 'delete',
		label: 'delete',
		icon: 'talend-trash',
		onClick: action('onDelete'),
	},
	{
		id: 'copy',
		label: 'copy',
		icon: 'talend-files-o',
		onClick: action('onCopy'),
	},
	{
		id: 'parameters',
		label: 'efit parameters',
		icon: 'talend-cog',
		onClick: action('onEditParameters'),
	},
	{
		id: 'related',
		displayMode: 'dropdown',
		label: 'related items',
		icon: 'talend-folder',
		items: [
			{
				label: 'document 1',
				onClick: action('document 1 click'),
			},
			{
				label: 'document 2',
				onClick: action('document 2 click'),
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
		onClick: action('onEdit'),
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
			onClick: action('onTitleClick'),
			onEditCancel: action('onEditCancel'),
			onEditSubmit: action('onEditSubmit'),
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
		display: {
			onChange: action('display.onChange'),
		},
		sort: {
			field: 'name',
			onChange: action('sort.onChange'),
			options: [
				{ id: 'id', name: 'Id' },
				{ id: 'name', name: 'Name With Multiple Words' },
			],
		},
		filter: {
			docked: true,
			onBlur: action('filter.onBlur'),
			onClear: action('filter.onClear'),
			onFocus: action('filter.onFocus'),
			onFilter: action('filter.onFilter'),
			onToggle: action('filter.onToggle'),
			placeholder: 'search for something',
		},
	},
};

const referenceDatetime = Date.now();
const minusThreeHours = referenceDatetime - 3600 * 3 * 1000;
const minusTwoHours = referenceDatetime - 3600 * 2 * 1000;
const minusOneHours = referenceDatetime - 3600 * 1 * 1000;
const minusThreeMin = referenceDatetime - 60 * 3 * 1000;

const propsWithVirtualized = {
	id: 'talend',
	displayMode: 'table',
	virtualized: true,
	list: {
		columns: [
			{ key: 'id', label: 'Id' },
			{ key: 'name', label: 'Name' },
			{ key: 'author', label: 'Author' },
			{
				key: 'created',
				label: 'Created',
				type: 'datetime',
				data: { mode: 'format', pattern: 'HH:mm:ss YYYY-MM-DD' },
			},
			{
				key: 'modified',
				label: 'Modified',
				type: 'datetime',
				data: { mode: 'ago' },
			},
		],
		items: [
			{
				id: 0,
				name: 'Title with actions',
				created: 1518596913333,
				modified: minusThreeHours,
				author: 'Jean-Pierre DUPONT',
				actions,
				icon: 'talend-file-xls-o',
				display: 'text',
				className: 'item-0-class',
			},
			{
				persistentActions,
				id: 1,
				name: 'Title in input mode',
				created: 1518596913333,
				modified: minusTwoHours,
				author: 'Jean-Pierre DUPONT',
				icon: 'talend-file-json-o',
				display: 'input',
				className: 'item-1-class',
			},
			{
				persistentActions,
				id: 2,
				name: 'Super long title to trigger overflow on tile rendering',
				created: 1518596913333,
				modified: minusOneHours,
				author: 'Jean-Pierre DUPONT',
				className: 'item-2-class',
			},
			{
				persistentActions,
				id: 3,
				name: 'Title',
				created: 1518596913333,
				modified: minusThreeMin,
				author: 'Jean-Pierre DUPONT',
				actions,
				icon: 'talend-file-xls-o',
				display: 'text',
				className: 'item-3-class',
			},
			{
				persistentActions,
				id: 4,
				name: 'Item with no created and modified dates',
				created: '',
				modified: '',
				author: 'Jean-Pierre DUPONT',
				actions,
				icon: 'talend-file-xls-o',
				display: 'text',
				className: 'item-4-class',
			},
			{
				persistentActions,
				id: 5,
				name: 'Item with invalid created and modified dates',
				created: 'not parsable date',
				modified: 'not parsable date',
				author: 'Jean-Pierre DUPONT',
				actions,
				icon: 'talend-file-xls-o',
				display: 'text',
				className: 'item-5-class',
			},
		],
		titleProps: {
			key: 'name',
			iconKey: 'icon',
			displayModeKey: 'display',
			onClick: action('onTitleClick'),
			onEditCancel: action('onEditCancel'),
			onEditSubmit: action('onEditSubmit'),
		},
		itemProps: {
			classNameKey: 'className',
		},
	},
};

const propsWithResizable = {
	id: 'talend',
	displayMode: 'table',
	virtualized: true,
	list: {
		columns: [
			{ key: 'id', label: 'Id', width: 85 },
			{ key: 'name', label: 'Name', width: 600, resizable: true, header: 'resizable' },
			{ key: 'author', label: 'Author', width: 600, resizable: true, header: 'resizable' },
			{
				key: 'modified',
				label: 'Modified',
				type: 'datetime',
				data: { mode: 'ago' },
				width: 135,
				resizable: true,
			},
		],
		items: [
			{
				id: 0,
				name: 'Title with actions',
				created: 1518596913333,
				modified: minusThreeHours,
				author: 'Jean-Pierre DUPONT',
				actions,
				icon: 'talend-file-xls-o',
				display: 'text',
				className: 'item-0-class',
			},
			{
				persistentActions,
				id: 1,
				name: 'Title in input mode',
				created: 1518596913333,
				modified: minusTwoHours,
				author: 'Jean-Pierre DUPONT',
				icon: 'talend-file-json-o',
				display: 'input',
				className: 'item-1-class',
			},
			{
				persistentActions,
				id: 2,
				name: 'Super long title to trigger overflow on tile rendering',
				created: 1518596913333,
				modified: minusOneHours,
				author: 'Jean-Pierre DUPONT',
				className: 'item-2-class',
			},
			{
				persistentActions,
				id: 3,
				name: 'Title',
				created: 1518596913333,
				modified: minusThreeMin,
				author: 'Jean-Pierre DUPONT',
				actions,
				icon: 'talend-file-xls-o',
				display: 'text',
				className: 'item-3-class',
			},
		],
		titleProps: {
			key: 'name',
			iconKey: 'icon',
			displayModeKey: 'display',
			onClick: action('onTitleClick'),
			onEditCancel: action('onEditCancel'),
			onEditSubmit: action('onEditSubmit'),
		},
		itemProps: {
			classNameKey: 'className',
		},
	},
};

const itemPropsForItems = {
	classNameKey: 'className',
	onOpen: action('onItemOpen'),
	onSelect: action('onItemSelect'),
	onToggle: action('onItemToggle'),
	onToggleAll: action('onToggleAll'),
	isSelected: item => !!selected.find(next => next.id === item.id),
	onCancel: action('onTitleEditCancel'),
	onChange: action('onTitleChange'),
	onSubmit: action('onTitleEditSubmit'),
};

const sort = {
	field: 'modified',
	isDescending: false,
	onChange: action('sort.onChange'),
};

function getActionsProps() {
	const columnActionsProps = cloneDeep(props);
	const actionsColumn = {
		key: 'columnActions',
		label: 'Actions', // label should be set for screen readers
		hideHeader: true, // header will created with a sr-only class, so it will be hidden
	};

	columnActionsProps.list.columns.splice(2, 0, actionsColumn);
	columnActionsProps.list.items = columnActionsProps.list.items.map((item, index) => ({
		columnActions: [
			{
				id: `favorite-action-${index}`,
				label: 'favorite',
				icon: 'talend-star',
				className: 'favorite',
				onClick: action('onFavorite'),
			},
			{
				id: `certify-action-${index}`,
				label: 'certify',
				icon: 'talend-badge',
				className: 'certify',
				onClick: action('onCertify'),
			},
		],
		...item,
	}));
	return columnActionsProps;
}

const okIcon = {
	label: 'OK!',
	icon: 'talend-star',
	onClick: () => {},
};

const warningIcon = {
	label: 'Oh no!',
	icon: 'talend-warning',
	onClick: () => {},
};

const getIcon = item => {
	switch (item.cat) {
		case 'fluffy':
			return okIcon;
		case 'fat':
			return warningIcon;
		default:
			return null;
	}
};

const itemsForListWithIcons = [
	{
		id: 0,
		name: 'Title 1',
		status: 'ok',
		cat: 'fluffy',
	},
	{
		id: 1,
		name: 'Title 2',
		status: 'warning',
		cat: 'fat',
	},
	{
		id: 2,
		name: 'Title 3',
		status: 'random',
		cat: 'regular',
	},
];

const ListTemplate = args => {
	const [propsMemo, setState] = React.useState(args.listProps);
	React.useEffect(() => {
		console.log('useMemo');
		if (args.patch && args.listProps) {
			setState(args.patch(args.listProps));
		}
	}, []);
	console.log('render with ', args, propsMemo);
	if (!propsMemo) {
		return <div />;
	}
	return (
		<div style={{ height: '70vh' }} className="virtualized-list">
			<h1>List</h1>
			<p>{args.message}</p>
			{args.children ? args.children : <List {...propsMemo} />}
		</div>
	);
};

export default {
	title: 'Data/List/List',
};

export const TableDisplay = () => (
	<ListTemplate
		message="Display the list in table mode. This is the default mode."
		listProps={props}
	/>
);

export const TableWithNumber = () => (
	<ListTemplate
		message="Display the list in table mode with the total number of items."
		listProps={props}
		patch={props => {
			console.log('patch', props);
			const customProps = cloneDeep(props);
			customProps.toolbar.itemsNumber = {
				totalItems: customProps.list.items.length,
				label: `${customProps.list.items.length} users`,
			};
			return customProps;
		}}
	/>
);

export const TableIcons = () => (
	<ListTemplate
		message="Display with icons in status"
		listProps={props}
		patch={props => {
			const customProps = cloneDeep(props);

			customProps.list.columns = [
				{ key: 'id', label: 'Id' },
				{ key: 'name', label: 'Name' },
				{ key: 'status', label: 'Status', type: 'texticon', data: { getIcon } },
				{ key: 'cat', label: 'Cat' },
			];

			customProps.list.items = itemsForListWithIcons;
			return customProps;
		}}
	/>
);

export const LargeDisplay = () => (
	<ListTemplate
		message="displayMode large"
		listProps={props}
		patch={props => {
			return {
				...props,
				rowHeight: 140,
				displayMode: 'large',
			};
		}}
	/>
);

export const LargeArrayOfActions = () => (
	<ListTemplate
		message="Display the list in table mode using arrays of actions"
		listProps={props}
		patch={props => {
			const customProps = cloneDeep(props);
			const separatorActions = [
				{
					id: 'monitoring',
					label: 'monitor something',
					'data-feature': 'list.item.monitor',
					icon: 'talend-line-charts',
					onClick: action('onMonitor'),
					hideLabel: true,
				},
			];
			customProps.list.items = customProps.list.items.map(item => ({
				...item,
				actions: [separatorActions, actions],
			}));
			return customProps;
		}}
	/>
);

export const LargeDisplayOverridesByRownRenderers = () => (
	<ListTemplate
		message="Display large"
		listProps={props}
		patch={props => {
			return {
				...props,
				rowHeight: 116,
				displayMode: 'large',
				rowRenderers: { LARGE: MyCustomRow },
			};
		}}
	/>
);

export const LargeDisplayWithIcons = () => (
	<ListTemplate
		message="Display large with icons"
		listProps={props}
		patch={props => {
			const customProps = cloneDeep(props);
			customProps.list.columns = [
				{ key: 'id', label: 'Id' },
				{ key: 'name', label: 'Name' },
				{ key: 'status', label: 'Status', type: 'texticon', data: { getIcon } },
				{ key: 'cat', label: 'Cat' },
			];
			customProps.list.items = itemsForListWithIcons;
			return customProps;
		}}
	/>
);

export const EmptyTable = () => (
	<ListTemplate
		message="Empty"
		listProps={props}
		patch={props => {
			const emptyListProps = cloneDeep(props);
			emptyListProps.list.items = [];
			return emptyListProps;
		}}
	/>
);

export const EmptyLarge = () => (
	<ListTemplate
		message="Empty List display large"
		listProps={props}
		patch={props => {
			const emptyListProps = cloneDeep(props);
			emptyListProps.list.items = [];
			emptyListProps.displayMode = 'large';

			const customEmptyRendererListProps = cloneDeep(props);
			customEmptyRendererListProps.list.items = [];
			customEmptyRendererListProps.list.noRowsRenderer = () => (
				<span className="tc-virtualizedlist-no-result" role="status" aria-live="polite">
					I'm a custom NoRowsRenderer
				</span>
			);
			return emptyListProps;
		}}
	/>
);

export const EmptyListCustom = () => (
	<ListTemplate
		message="Empty list with custom renderer"
		listProps={props}
		patch={props => {
			const customEmptyRendererListProps = cloneDeep(props);
			customEmptyRendererListProps.list.items = [];
			customEmptyRendererListProps.list.noRowsRenderer = () => (
				<span className="tc-virtualizedlist-no-result" role="status" aria-live="polite">
					I'm a custom NoRowsRenderer
				</span>
			);
			return customEmptyRendererListProps;
		}}
	/>
);

export const ListInProgressTable = () => (
	<ListTemplate
		listProps={props}
		patch={props => {
			const loadingListProps = cloneDeep(props);
			loadingListProps.list.inProgress = true;
			return loadingListProps;
		}}
	/>
);
export const ListInProgressLarge = () => (
	<ListTemplate
		message="Display large"
		listProps={props}
		patch={props => {
			const loadingListProps = cloneDeep(props);
			loadingListProps.list.inProgress = true;
			loadingListProps.displayMode = 'large';
			return loadingListProps;
		}}
	/>
);
export const ColumnActions = () => (
	<ListTemplate
		message="A column can contains only actions that appear on mouseover."
		listProps={props}
		patch={props => {
			return getActionsProps();
		}}
	/>
);
export const Selection = () => (
	<ListTemplate
		message="A column can contains only actions that appear on mouseover."
		listProps={props}
		patch={props => {
			const selectedItemsProps = cloneDeep(props);
			selectedItemsProps.toolbar.actionBar = {
				selected: 1,
				multiSelectActions: {
					left: [
						{
							id: 'remove',
							label: 'Delete selection',
							icon: 'talend-trash',
							onClick: action('remove'),
						},
					],
				},
			};
			selectedItemsProps.list.itemProps = itemPropsForItems;
			return selectedItemsProps;
		}}
	/>
);
export const SelectionWithNumberOfItems = () => (
	<ListTemplate
		message="A column can contains only actions that appear on mouseover."
		listProps={props}
		patch={props => {
			const selectedItemsProps = cloneDeep(props);
			selectedItemsProps.toolbar.actionBar = {
				selected: 1,
				hideCount: true,
				multiSelectActions: {
					left: [
						{
							id: 'remove',
							label: 'Delete selection',
							icon: 'talend-trash',
							onClick: action('remove'),
						},
					],
				},
			};
			selectedItemsProps.list.itemProps = itemPropsForItems;
			selectedItemsProps.toolbar.itemsNumber = {
				totalItems: selectedItemsProps.list.items.length,
				label: `${selectedItemsProps.list.items.length} books`,
				labelSelected: `${selectedItemsProps.toolbar.actionBar.selected}/${selectedItemsProps.list.items.length} books`,
			};
			return selectedItemsProps;
		}}
	/>
);

export const SelectionLarge = () => (
	<ListTemplate
		message="A column can contains only actions that appear on mouseover."
		listProps={props}
		patch={props => {
			const selectedItemsProps = cloneDeep(props);

			selectedItemsProps.toolbar.actionBar.multiSelectActions = {
				left: [
					{
						id: 'remove',
						label: 'Delete selection',
						icon: 'talend-trash',
						onClick: action('remove'),
					},
				],
			};
			selectedItemsProps.list.itemProps = itemPropsForItems;
			return selectedItemsProps;
		}}
	/>
);
export const Activation = () => (
	<ListTemplate
		message="A column can contains only actions that appear on mouseover."
		listProps={props}
		patch={props => {
			const selectedItemsProps = cloneDeep(props);

			selectedItemsProps.list.itemProps.isActive = item => item.id === 0;
			selectedItemsProps.list.itemProps.onRowClick = action('onRowClick');
			return selectedItemsProps;
		}}
	/>
);

export const NoToolbar = () => (
	<ListTemplate
		message="A column can contains only actions that appear on mouseover."
		listProps={props}
		patch={props => {
			const tprops = cloneDeep(props);
			tprops.toolbar = undefined;
			return tprops;
		}}
	/>
);

export const SortList = () => (
	<ListTemplate
		listProps={props}
		patch={props => {
			const tprops = cloneDeep(props);
			// disable sort on column author
			const authorColumn = tprops.list.columns.find(e => e.key === 'author');
			authorColumn.disableSort = true;
			tprops.list.sort = sort;
			return tprops;
		}}
	/>
);

export const SortLargeList = () => (
	<ListTemplate
		listProps={props}
		patch={props => {
			const tprops = cloneDeep(props);
			// disable sort on column author
			const authorColumn = tprops.list.columns.find(e => e.key === 'author');
			authorColumn.disableSort = true;
			tprops.list.sort = sort;
			tprops.displayMode = 'large';
			return tprops;
		}}
	/>
);

export const CustomCellRenderer = () => (
	<ListTemplate
		message="CellWithHello"
		listProps={props}
		patch={props => {
			const customProps = cloneDeep(props);

			customProps.list.columns = [
				{ key: 'id', label: 'Id' },
				{ key: 'name', label: 'Name' },
				{ key: 'status', label: 'Status', type: 'hello' },
				{ key: 'cat', label: 'Cat' },
			];

			customProps.list.items = itemsForListWithIcons;
			customProps.list.cellDictionary = { hello: { cellRenderer: CellWithHello } };
			return customProps;
		}}
	/>
);

export const FilterDefault = () => (
	<ListTemplate
		listProps={props}
		patch={props => {
			const customProps = cloneDeep(props);
			customProps.list.items = [customProps.list.items[0]];
			customProps.toolbar.filter.docked = false;
			return customProps;
		}}
	/>
);

export const FilterHighlited = () => (
	<ListTemplate
		listProps={props}
		patch={props => {
			const customProps = cloneDeep(props);
			customProps.list.items = [customProps.list.items[0]];
			customProps.toolbar.filter.docked = false;
			customProps.toolbar.filter.highlight = true;
			return customProps;
		}}
	/>
);

export const FilterDebounce = () => (
	<ListTemplate
		listProps={props}
		patch={props => {
			const customProps = cloneDeep(props);
			customProps.list.items = [customProps.list.items[0]];
			customProps.toolbar.filter.docked = false;
			customProps.toolbar.filter.debounceTimeout = 300;
			return customProps;
		}}
	/>
);

export const TitleWithoutClick = () => (
	<ListTemplate
		listProps={props}
		patch={props => {
			const customProps = cloneDeep(props);
			customProps.list.titleProps.onClick = null;
			return customProps;
		}}
	/>
);

export const HiddenHeaderLabels = () => (
	<ListTemplate
		listProps={props}
		patch={props => {
			const customProps = cloneDeep(props);
			customProps.list.columns[0].hideHeader = true;
			return customProps;
		}}
	/>
);

export const ListCellRenderer = () => (
	<ListTemplate message="datetime pattern" listProps={propsWithVirtualized} />
);

export const ListResizable = () => <ListTemplate listProps={propsWithResizable} />;
export const TableWithActionOverlay = () => (
	<ListTemplate
		listProps={props}
		patch={props => {
			const items = [...Array(100)].map((_, index) => ({
				id: index,
				name: 'Title with actions',
				created: 1518596913333,
				modified: minusThreeHours,
				author: 'Jean-Pierre DUPONT',
				actions: [overlayAction, ...actions],
				icon: 'talend-file-xls-o',
				display: 'text',
				className: 'item-0-class',
			}));

			return {
				...props,
				list: {
					...props.list,
					items,
				},
			};
		}}
	/>
);

export const TableWithColumnChooser = () => (
	<ListTemplate listProps={{}}>
		<ListColumnChooser {...props} />
	</ListTemplate>
);

export const PaginationToBeDeprecated = () => (
	<ListTemplate
		listProps={props}
		patch={props => {
			const customProps = cloneDeep(props);
			customProps.toolbar.pagination = {
				itemsPerPage: 5,
				totalResults: 10,
				onChange: action('pagination.onChange'),
			};
			return customProps;
		}}
	/>
);
