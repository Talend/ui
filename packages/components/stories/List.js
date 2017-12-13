import React from 'react';
import { storiesOf, action } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import Immutable from 'immutable'; // eslint-disable-line import/no-extraneous-dependencies
import talendIcons from '@talend/icons/dist/react';
import { I18nextProvider } from 'react-i18next';
import { cloneDeep } from 'lodash';

import { List, IconsProvider } from '../src/index';
import i18n, { LanguageSwitcher } from './config/i18n';

const icons = {
	'talend-apache': talendIcons['talend-apache'],
	'talend-badge': talendIcons['talend-badge'],
	'talend-caret-down': talendIcons['talend-caret-down'],
	'talend-chevron-end': talendIcons['talend-chevron-end'],
	'talend-chevron-left': talendIcons['talend-chevron-left'],
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
	},
];

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
			{ key: 'id', label: 'Id' },
			{ key: 'name', label: 'Name' },
			{ key: 'author', label: 'Author' },
			{ key: 'created', label: 'Created' },
			{ key: 'modified', label: 'Modified' },
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
				persistentActions,
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
				persistentActions,
				id: 2,
				name: 'Super long title to trigger overflow on tile rendering',
				created: '2016-09-22',
				modified: '2016-09-22',
				author:
					'Jean-Pierre DUPONT with super super super super super super super super super super super super long name, but there was not enough long text',
				className: 'item-2-class',
			},
			{
				persistentActions,
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
			options: [{ id: 'id', name: 'Id' }, { id: 'name', name: 'Name' }],
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
const columnsForItems = [
	{ key: 'icon', label: '', type: 'icon' },
	{ key: 'name', label: 'Name', type: 'title' },
	{ key: 'favorite', label: 'Favorite', type: 'action' },
	{ key: 'certify', label: 'Certify', type: 'action' },
	{ key: 'id', label: 'ID' },
	{ key: 'author', label: 'Author' },
	{ key: 'created', label: 'Created' },
	{ key: 'modified', label: 'Modified' },
];
const actionsForItems = [
	{
		id: 'favorite-action',
		key: 'favorite',
		label: 'Favorite',
		icon: 'talend-star',
		className: 'favorite',
		onClick: action('onFavoriteActionClick'),
	},
	{
		key: 'certify',
		label: 'Certify',
		icon: 'talend-badge',
		className: 'certify',
		onClick: action('onCertifyActionClick'),
	},
	{
		key: 'edit',
		label: 'Edit',
		icon: 'talend-pencil',
		onClick: action('onEdit'),
	},
	{
		key: 'delete',
		label: 'Delete',
		icon: 'talend-trash',
		onClick: action('onDelete'),
	},
];
const itemsForItems = [
	{
		id: 1,
		name: 'Title with actions',
		author: 'Jean-Pierre DUPONT',
		created: '2016-09-22',
		modified: '2016-09-22',
		icon: 'talend-file-xls-o',
		display: 'button',
		className: 'item-0-class',
	},
	{
		id: 2,
		name: 'Title in input mode',
		author: 'Jean-Pierre DUPONT',
		created: '2016-09-22',
		modified: '2016-09-22',
		icon: 'talend-file-json-o',
		favorite: false,
		certify: true,
		display: 'input',
		className: 'item-1-class',
	},
	{
		id: 3,
		name: 'Super long title to trigger overflow on tile rendering',
		author: 'Jean-Pierre DUPONT with long name',
		created: '2016-09-22',
		modified: '2016-09-22',
		favorite: true,
		certify: false,
	},
];
const itemPropsForItems = {
	classNameKey: 'className',
	onOpen: action('onItemOpen'),
	onSelect: action('onItemSelect'),
	onToggle: action('onItemToggle'),
	onToggleAll: action('onToggleAll'),
	isSelected: item => selected.find(next => next.id === item.id),
	onCancel: action('onTitleEditCancel'),
	onChange: action('onTitleChange'),
	onSubmit: action('onTitleEditSubmit'),
};

const sort = {
	field: 'name',
	isDescending: false,
	onChange: action('sort.onChange'),
};

function getPropsFor(displayMode) {
	return {
		id: props.id,
		displayMode,
		list: {
			columns: columnsForItems,
			actions: actionsForItems,
			items: itemsForItems,
			itemProps: itemPropsForItems,
		},
		toolbar: props.toolbar,
		useContent: true,
	};
}

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

storiesOf('List', module)
	.addDecorator(story => (
		<div>
			<LanguageSwitcher />
			<IconsProvider defaultIcons={icons} />
			<I18nextProvider i18n={i18n}>{story()}</I18nextProvider>
		</div>
	))
	.add('Tile', () => {
		const tprops = {
			...props,
			displayMode: 'tile',
		};
		return (
			<div>
				<h1>List</h1>
				<p>Display the list in tile mode</p>
				<List {...tprops} />
			</div>
		);
	})
	.add('Tile empty list', () => {
		const emptyListProps = cloneDeep(props);
		emptyListProps.list.items = [];
		return (
			<div>
				<h1>List</h1>
				<p>Display an empty list</p>
				<div className="tc-list-small-container">
					<List {...emptyListProps} displayMode="tile" />
				</div>
			</div>
		);
	})
	.add('Virtualized - table display', () => (
		<div style={{ height: '60vh' }} className="virtualized-list">
			<h1>List</h1>
			<p>
				Display the list in table mode.<br />
				This is the default mode.
			</p>
			<List {...props} virtualized />
		</div>
	))
	.add('Virtualized - large display', () => (
		<div style={{ height: '60vh' }} className="virtualized-list">
			<h1>List</h1>
			<p>
				Display the list in large mode.<br />
				You just need to pass the props displayMode.
				<pre>&lt;List displayMode="large" ... &gt;</pre>
			</p>
			<List {...props} displayMode="large" virtualized />
		</div>
	))
	.add('Virtualized - empty list', () => {
		const emptyListProps = cloneDeep(props);
		emptyListProps.list.items = [];
		return (
			<div style={{ height: '60vh' }}>
				<h1>List</h1>
				<p>When the list is empty, a message is displayed instead of the rows.</p>
				<h2>Table</h2>
				<List {...emptyListProps} virtualized />
				<h2>Large</h2>
				<List {...emptyListProps} displayMode="large" virtualized />
			</div>
		);
	})
	.add('Virtualized - list with progress', () => {
		const loadingListProps = cloneDeep(props);
		loadingListProps.list.inProgress = true;
		return (
			<div style={{ height: '60vh' }}>
				<h1>List</h1>
				<p>When the list is loading, a CircularProgress is displayed instead of the rows.</p>
				<h2>Table</h2>
				<List {...loadingListProps} virtualized />
			</div>
		);
	})
	.add('Virtualized - column actions', () => {
		const columnActionsProps = getActionsProps();
		return (
			<div style={{ height: '60vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>A column can contains only actions that appear on mouseover.</p>
				<List {...columnActionsProps} virtualized />
			</div>
		);
	})
	.add('Virtualized - selection', () => {
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
		return (
			<div style={{ height: '60vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>
					You can manage selection by passing 2 props : onSelect and isSelected.<br />
					<b>onSelect(event, item)</b> : item selection callback
					<b>isSelected(item)</b> : returns true if the item is selected
					<pre>
						listProps.itemProps.onSelect = (event, item) => mySelectionCallback(event, item);<br />
						listProps.itemProps.isSelected = (item) => item.id === 2;<br />
						&lt;List ... list=&#123;listProps&#125; &gt;<br />
					</pre>
				</p>
				<List {...selectedItemsProps} virtualized />
			</div>
		);
	})
	.add('Virtualized - activation', () => {
		const selectedItemsProps = cloneDeep(props);
		selectedItemsProps.list.itemProps.isActive = item => item.id === 0;
		selectedItemsProps.list.itemProps.onRowClick = action('onRowClick');
		return (
			<div style={{ height: '60vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>
					You can manage selection by passing 2 props : onRowClick and isActive.<br />
					<b>onRowClick(event, item)</b> : item selection callback<br />
					<b>isActive(item)</b> : returns true if the item is selected
					<pre>
						listProps.itemProps.onRowClick = (event, rowData) => myRowClickCallback(rowData);<br />
						listProps.itemProps.isActive = (item) => item.id === 0;<br />
						&lt;List ... list=&#123;listProps&#125; &gt;<br />
					</pre>
				</p>
				<h2>Table</h2>
				<List {...selectedItemsProps} virtualized />
				<h2>Large</h2>
				<List {...selectedItemsProps} displayMode="large" virtualized />
			</div>
		);
	})
	.add('Virtualized - sort', () => {
		const tprops = cloneDeep(props);
		tprops.list.sort = sort;
		return (
			<div style={{ height: '60vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>
					You add sort management with column header click.<br />
					<pre>
						listProps.sort.field = 'name';<br />
						listProps.sort.isDescending = false;<br />
						listProps.sort.onChange = (event, &#123;field, isDescending&#125;) => sort(field,
						isDescending);<br />
						&lt;List ... list=&#123;listProps&#125; &gt;<br />
					</pre>
				</p>
				<List {...tprops} virtualized />
			</div>
		);
	})
	.add('Virtualized - no toolbar', () => {
		const tprops = cloneDeep(props);
		tprops.toolbar = undefined;
		return (
			<div style={{ height: '60vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>Table without toolbar</p>
				<List {...tprops} virtualized />
			</div>
		);
	})
	.add('Virtualized - toolbar with filter', () => {
		const dockedProps = cloneDeep(props);
		dockedProps.list.items = [dockedProps.list.items[0]];
		dockedProps.toolbar.actionBar = null;

		const inputProps = Immutable.fromJS(dockedProps).toJS();
		inputProps.toolbar.filter.docked = false;

		const highlightedProps = Immutable.fromJS(inputProps).toJS();
		highlightedProps.toolbar.filter.highlight = true;

		const inputDebounceProps = Immutable.fromJS(inputProps).toJS();
		inputDebounceProps.toolbar.filter.debounceTimeout = 300;

		return (
			<div style={{ height: '60vh' }} className="virtualized-list">

				<h1>List</h1>
				<h2>Definition</h2>
				<p>
					Filter in toolbar can have multiple states.<br />
					Its state, input, and callbacks are customizable.
				</p>
				<h2>Docked</h2>
				<div style={{ height: '15vh' }}>
					<List {...dockedProps} virtualized />
				</div>
				<h2>Input</h2>
				<div style={{ height: '15vh' }}>
					<List {...inputProps} virtualized />
				</div>
				<h2>Highlighted</h2>
				<div style={{ height: '15vh' }}>
					<List {...highlightedProps} virtualized />
				</div>
				<h2>Input with 300ms debounce</h2>
				<div style={{ height: '15vh' }}>
					<List {...inputDebounceProps} virtualized />
				</div>
			</div>
		);
	})
	.add('Virtualized - toolbar with filtered DisplayMode', () => {
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
			<div style={{ height: '60vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>
					You can get limited options for displayMode.<br />
					<pre>
						toolbarProps.display.displayModes = ['large', 'table'];<br />
						&lt;List ... toolbar=&#123;toolbarProps&#125; &gt;<br />
					</pre>
				</p>
				<List {...tprops} virtualized />
			</div>
		);
	})
	.add('Virtualized - list with i18n', () => (
		<div>
			<h1>List with i18n</h1>
			<p>Change language in the toolbar</p>
			<List {...props} virtualized />
		</div>
	))
	.add('Virtualized - title without click', () => {
		const tprops = cloneDeep(props);

		tprops.list.titleProps.onClick = null;

		return (
			<div style={{ height: '60vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>
					Display the list in table mode.<br />
					This is the default mode.
				</p>
				<List {...tprops} virtualized />
			</div>
		);
	})
	.add('Virtualized - list with hidden header labels', () => {
		const tprops = cloneDeep(props);

		tprops.list.columns[0].hideHeader = true;

		return (
			<div style={{ height: '60vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>Display the list with hidden header labels.</p>
				<List {...tprops} virtualized />
			</div>
		);
	})
	.add('Virtualized - list with custom classnames', () => {
		return (
			<div style={{ height: '60vh' }} className="virtualized-list virtualized-list-customized-row">
				<h1>List</h1>
				<p>Display the list with hidden header labels.</p>
				<List {...props} virtualized />
			</div>
		);
	})
	.add('Virtualized - list with inline parent', () => {
		return (
			<div className="virtualized-list">
				<h1>List</h1>
				{/*Do not reproduce!*/}
				<span>
					<List {...props} virtualized />
				</span>
			</div>
		);
	})
	.add('DEPRECATED - Table (migrated to virtualized)', () => (
		<div className="display-table tc-list-fixed-name-column">
			<h1>List</h1>
			<p>Display a list by defining your.</p>
			<List {...props} />
		</div>
	))
	.add('DEPRECATED - Table without action on title', () => {
		const tprops = {
			...props,
		};

		tprops.list.titleProps.onClick = null;

		return (
			<div className="display-table tc-list-fixed-name-column">
				<h1>List</h1>
				<p>Display a list by defining your.</p>
				<List {...props} />
			</div>
		);
	})
	.add('DEPRECATED - Large (migrated to virtualized)', () => {
		const tprops = cloneDeep(props);
		tprops.displayMode = 'large';
		tprops.toolbar.sort.options = [{ id: 'name', name: 'Name' }];
		return (
			<div>
				<h1>List</h1>
				<p>Display the list in large mode</p>
				<List {...tprops} />
			</div>
		);
	})
	.add('DEPRECATED - Filtered DisplayMode', () => {
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
				<List {...tprops} />
			</div>
		);
	})
	.add('DEPRECATED - Table empty list (migrated to virtualized)', () => {
		const emptyListProps = cloneDeep(props);
		emptyListProps.list.items = [];
		return (
			<div>
				<h1>List</h1>
				<p>Display an empty list</p>
				<div className="tc-list-small-container">
					<List {...emptyListProps} />
				</div>
			</div>
		);
	})
	.add('DEPRECATED - Large empty list (migrated to virtualized)', () => {
		const emptyListProps = cloneDeep(props);
		emptyListProps.list.items = [];
		return (
			<div>
				<h1>List</h1>
				<p>Display an empty list</p>
				<div className="tc-list-small-container">
					<List {...emptyListProps} displayMode="large" />
				</div>
			</div>
		);
	})
	.add('DEPRECATED - No toolbar (migrated to virtualized)', () => {
		const tprops = {
			...props,
			toolbar: undefined,
		};
		return (
			<div>
				<h1>List</h1>
				<p>Display a list without toolbar</p>
				<div className="list-container">
					<List {...tprops} />
				</div>
			</div>
		);
	})
	.add('DEPRECATED - Toolbar with filter (migrated to virtualized)', () => {
		const dockedProps = cloneDeep(props);
		dockedProps.list.items = [dockedProps.list.items[0]];
		dockedProps.toolbar.actionBar = null;

		const inputProps = Immutable.fromJS(dockedProps).toJS();
		inputProps.toolbar.filter.docked = false;

		const highlightedProps = Immutable.fromJS(inputProps).toJS();
		highlightedProps.toolbar.filter.highlight = true;

		const inputDebounceProps = Immutable.fromJS(inputProps).toJS();
		inputDebounceProps.toolbar.filter.debounceTimeout = 300;

		return (
			<div>
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
			</div>
		);
	})
	.add('DEPRECATED - Table with column actions (migrated to virtualized)', () => {
		const columnActionsProps = getActionsProps();
		return (
			<div>
				<h1>List</h1>
				<p>Display a list with columns containing actions.</p>
				<List {...columnActionsProps} />
			</div>
		);
	})
	.add('DEPRECATED - Table with scroll (not migrated - natively supported)', () => {
		const tprops = {
			...props,
			toolbar: undefined,
		};
		return (
			<div>
				<h1>List</h1>
				<p>Display a list in a limited container. To enable content scroll.</p>
				<div className="tc-list-small-container">
					<List {...tprops} />
				</div>
			</div>
		);
	})
	.add('DEPRECATED - Table with ellipsis (not migrated - natively supported)', () => {
		const tprops = {
			...props,
			toolbar: undefined,
		};
		return (
			<div className="tc-list-fixed-name-column">
				<h1>List</h1>
				<p>
					Display a list with NAME content ellipsis. The NAME column is limited to 400px in css.
				</p>
				<List {...tprops} />
			</div>
		);
	})
	.add('DEPRECATED - Table with sort header click (migrated to virtualized)', () => {
		const tprops = cloneDeep(props);
		tprops.toolbar = undefined;
		tprops.list.sort = sort;
		return (
			<div>
				<h1>List</h1>
				<p>Table with sort header click</p>
				<List {...tprops} />
			</div>
		);
	})
	.add('DEPRECATED - Table with selected items', () => {
		const selectedItemsProps = cloneDeep(props);
		selectedItemsProps.toolbar.actionBar.selected = 1;
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
		return (
			<div>
				<h1>List</h1>
				<p>Display a list with selected items.</p>
				<List {...selectedItemsProps} />
			</div>
		);
	})
	.add('DEPRECATED - Table with custom selected class (not migrated - not used)', () => {
		const selectedClassProps = cloneDeep(props);
		selectedClassProps.list.itemProps.selectedClass = 'tc-list-custom-style';
		selectedClassProps.list.itemProps.isSelected = item =>
			selected.find(next => next.id === item.id);
		selectedClassProps.toolbar = undefined;
		return (
			<div>
				<h1>List</h1>
				<p>Display a list with custom selected class.</p>
				<List {...selectedClassProps} />
			</div>
		);
	})
	.add('DEPRECATED - table of Content', () => (
		<div>
			<h1>List</h1>
			<h2>Definition</h2>
			<p>Display a table from Items component.</p>
			<h2>Examples</h2>
			<List {...getPropsFor('table')} />
		</div>
	))
	.add('DEPRECATED - large of Content', () => (
		<div>
			<h1>List</h1>
			<p>Display the list in large mode</p>
			<List {...getPropsFor('large')} />
		</div>
	))
	.add('DEPRECATED - tile of Content', () => (
		<div>
			<h1>List</h1>
			<p>Display the list in tile mode</p>
			<List {...getPropsFor('tile')} />
		</div>
	));
