import React from 'react';
import { storiesOf, action } from '@kadira/storybook';  // eslint-disable-line import/no-extraneous-dependencies
import Immutable from 'immutable';  // eslint-disable-line import/no-extraneous-dependencies
import talendIcons from 'talend-icons/dist/react';

import { List, IconsProvider } from '../src/index';

const icons = {
	'talend-badge': talendIcons['talend-badge'],
	'talend-caret-down': talendIcons['talend-caret-down'],
	'talend-cross': talendIcons['talend-cross'],
	'talend-expanded': talendIcons['talend-expanded'],
	'talend-file': talendIcons['talend-file'],
	'talend-file-json-o': talendIcons['talend-file-json-o'],
	'talend-file-xls-o': talendIcons['talend-file-xls-o'],
	'talend-folder': talendIcons['talend-folder'],
	'talend-icons': talendIcons['talend-icons'],
	'talend-pencil': talendIcons['talend-pencil'],
	'talend-plus': talendIcons['talend-plus'],
	'talend-plus-circle': talendIcons['talend-plus-circle'],
	'talend-search': talendIcons['talend-search'],
	'talend-star': talendIcons['talend-star'],
	'talend-table': talendIcons['talend-table'],
	'talend-tiles': talendIcons['talend-tiles'],
	'talend-trash': talendIcons['talend-trash'],
};

const selected = [
	{
		id: 2,
		name: 'Foo',
		created: '2016-09-22',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		icon: 'talend-file-json-o',
	}];

const actions = [
	{
		label: 'edit',
		icon: 'talend-pencil',
		onClick: action('onEdit'),
	},
	{
		label: 'delete',
		icon: 'talend-trash',
		onClick: action('onDelete'),
	},
	{
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

const props = {
	id: 'talend',
	displayMode: 'table',
	list: {
		columns: [
			{ key: 'id', label: 'Id', flexGrow: 0, flexShrink: 0, width: 35 },
			{ key: 'name', label: 'Name', type: 'title', flexGrow: 1, flexShrink: 0, width: 400 },
			{ key: 'author', label: 'Author', flexGrow: 1, flexShrink: 0, width: 90 },
			{ key: 'created', label: 'Created', flexGrow: 0, flexShrink: 0, width: 90 },
			{ key: 'modified', label: 'Modified', flexGrow: 0, flexShrink: 0, width: 90 },
		],
		items: [
			{
				id: 0,
				name: 'Title with actions',
				created: '2016-09-22',
				modified: '2016-09-22',
				author: 'Jean-Pierre DUPONT',
				actions,
				icon: 'talend-file-xls-o',
				display: 'text',
				className: 'item-0-class',
			},
			{
				id: 1,
				name: 'Title in input mode',
				created: '2016-09-22',
				modified: '2016-09-22',
				author: 'Jean-Pierre DUPONT',
				icon: 'talend-file-json-o',
				display: 'input',
				className: 'item-1-class',
			},
			{
				id: 2,
				name: 'Super long title to trigger overflow on tile rendering',
				created: '2016-09-22',
				modified: '2016-09-22',
				author: 'Jean-Pierre DUPONT with super super super super super super super super super super super super long name, but there was not enough long text',
				className: 'item-2-class',
			},
			{
				id: 3,
				name: 'Title with long long long long long long long long long long long text',
				created: '2016-09-22',
				modified: '2016-09-22',
				author: 'Jean-Pierre DUPONT',
				actions,
				icon: 'talend-file-xls-o',
				display: 'text',
				className: 'item-3-class',
			},
		],
		titleProps: {
			key: 'name',
			actionsKey: 'actions',
			iconKey: 'icon',
			displayModeKey: 'display',
			onClick: action('onClick'),
			onEditCancel: action('onEditCancel'),
			onEditSubmit: action('onEditSubmit'),
		},
		itemProps: {
			classNameKey: 'className',
			onSelect: action('onSelect'),
			onToggle: action('onToggle'),
			onToggleAll: action('onToggleAll'),
		},
	},
	toolbar: {
		actionBar: {
			actions: {
				left: [
					{
						id: 'add',
						label: 'Add Folder',
						bsStyle: 'primary',
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
				{ id: 'name', name: 'Name' },
			],
		},
		pagination: {
			itemsPerPage: 5,
			totalResults: 10,
			onChange: action('pagination.onChange'),
		},
		filter: {
			docked: true,
			onBlur: action('filter.onBlur'),
			onFocus: action('filter.onFocus'),
			onFilter: action('filter.onFilter'),
			onToggle: action('filter.onToggle'),
			placeholder: 'search for something',
		},
	},
};

const sort = {
	field: 'name',
	isDescending: false,
	onChange: action('sort.onChange'),
};

storiesOf('List', module)
	.addDecorator(story => (
		<form>
			{story()}
		</form>
	))
	.add('Table (default)', () => (
		<div style={{ height: '50vh' }}>
			<h1>List</h1>
			<p>Display a list by defining your.</p>
			<IconsProvider defaultIcons={icons} />
			<List {...props} />
		</div>
	))
	.add('Large', () => {
		const tprops = Immutable.fromJS(props).toJS();
		tprops.displayMode = 'large';
		tprops.toolbar.sort.options = [
			{ id: 'name', name: 'Name' },
		];
		return (
			<div style={{ height: '50vh' }}>
				<h1>List</h1>
				<p>Display the list in large mode</p>
				<IconsProvider defaultIcons={icons} />
				<List {...tprops} />
			</div>
		);
	})
	.add('Tile', () => {
		const tprops = {
			...props,
			displayMode: 'tile',

		};
		return (
			<div>
				<h1>List</h1>
				<p>Display the list in tile mode</p>
				<IconsProvider defaultIcons={icons} />
				<List {...tprops} />
			</div>
		);
	})
	.add('Filtered DisplayMode', () => {
		const tprops = {
			...props,
			toolbar: {
				display: {
					onChange: action('display.onChange'),
					displayModes: ['large', 'table'],
				},
			},
		};
		return (
			<div>
				<h1>List</h1>
				<p>Get limited options for displayMode</p>
				<IconsProvider defaultIcons={icons} />
				<List {...tprops} />
			</div>
		);
	})
	.add('Empty list', () => {
		const emptyListProps = Immutable.fromJS(props).toJS();
		emptyListProps.list.items = [];
		return (
			<div>
				<h1>List</h1>
				<p>Display an empty list</p>
				<IconsProvider defaultIcons={icons} />
				<div className="tc-list-small-container">
					<List {...emptyListProps} />
				</div>
			</div>
		);
	})
	.add('No toolbar', () => {
		const tprops = {
			...props,
			toolbar: undefined,
		};
		return (
			<div>
				<h1>List</h1>
				<p>Display a list without toolbar</p>
				<IconsProvider />
				<div className="list-container">
					<List {...tprops} />
				</div>
			</div>
		);
	})
	.add('Toolbar with filter', () => {
		const dockedProps = Immutable.fromJS(props).toJS();
		dockedProps.list.items = [dockedProps.list.items[0]];
		dockedProps.toolbar.actionBar = null;

		const inputProps = Immutable.fromJS(dockedProps).toJS();
		inputProps.toolbar.filter.docked = false;

		const highlightedProps = Immutable.fromJS(inputProps).toJS();
		highlightedProps.toolbar.filter.highlight = true;

		const inputDebounceProps = Immutable.fromJS(inputProps).toJS();
		inputDebounceProps.toolbar.filter.debounceTimeout = 300;

		return (<div>
			<IconsProvider />

			<h1>List</h1>
			<h2>Definition</h2>
			<p>Toolbar Filter</p>
			<h2>Docked</h2>
			<List {...dockedProps} />
			<h2>Input</h2>
			<List {...inputProps} />
			<h2>Highlighted</h2>
			<List {...highlightedProps} />
			<h2>Input with 300ms debounce</h2>
			<List {...inputDebounceProps} />
		</div>);
	})
	.add('Table with column actions', () => {
		const columnActionsProps = Immutable.fromJS(props).toJS();
		const actionsColumn = {
			key: 'columnActions',
			label: 'Actions',	// label should be set for screen readers
			hideHeader: true,	// header will created with a sr-only class, so it will be hidden
		};

		columnActionsProps.list.columns.splice(2, 0, actionsColumn);
		columnActionsProps.list.items = columnActionsProps.list.items.map(item => ({
			columnActions: [
				{
					label: 'favorite',
					icon: 'talend-star',
					className: 'favorite',
					onClick: action('onFavorite'),
				}, {
					label: 'certify',
					icon: 'talend-badge',
					className: 'certify',
					onClick: action('onCertify'),
				},
			],
			...item,
		}));
		return (<div>
			<h1>List</h1>
			<p>Display a list with columns containing actions.</p>
			<IconsProvider defaultIcons={icons} />
			<List {...columnActionsProps} />
		</div>);
	})
	.add('Table with selected items', () => {
		const selectedItemsProps = Immutable.fromJS(props).toJS();
		selectedItemsProps.toolbar.actionBar.selected = 1;
		selectedItemsProps.toolbar.actionBar.multiSelectActions = {
			left: [
				{
					id: 'delete',
					label: 'Delete selection',
					icon: 'talend-trash',
					onClick: action('delete'),
				},
			],
		};
		selectedItemsProps.list.itemProps.isSelected = item => selected.find(next => next.id === item.id);
		return (
			<div>
				<h1>List</h1>
				<p>Display a list with selected items.</p>
				<IconsProvider defaultIcons={icons} />
				<List {...selectedItemsProps} />
			</div>
		);
	})
	.add('Table with custom selected class', () => {
		const selectedClassProps = Immutable.fromJS(props).toJS();
		selectedClassProps.list.itemProps.selectedClass = 'tc-list-custom-style';
		selectedClassProps.list.itemProps.isSelected = item => selected.find(next => next.id === item.id);
		selectedClassProps.toolbar = undefined;
		return (
			<div>
				<h1>List</h1>
				<p>Display a list with custom selected class.</p>
				<IconsProvider defaultIcons={icons} />
				<List {...selectedClassProps} />
			</div>
		);
	})
	.add('Table with sort header click', () => {
		const tprops = Immutable.fromJS(props).toJS();
		tprops.toolbar = undefined;
		tprops.list.sort = sort;
		return (
			<div>
				<h1>List</h1>
				<p>Table with sort header click</p>
				<IconsProvider defaultIcons={icons} />
				<List {...tprops} />
			</div>
		);
	});
