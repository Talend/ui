import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import Immutable from 'immutable'; // eslint-disable-line import/no-extraneous-dependencies
import talendIcons from '@talend/icons/dist/react';
import { I18nextProvider } from 'react-i18next';
import { cloneDeep } from 'lodash';

import { List, IconsProvider } from '../src/index';
import i18n, { LanguageSwitcher } from './config/i18n';

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

const icons = {
	'talend-scheduler': talendIcons['talend-scheduler'],
	'talend-apache': talendIcons['talend-apache'],
	'talend-badge': talendIcons['talend-badge'],
	'talend-caret-down': talendIcons['talend-caret-down'],
	'talend-chevron-end': talendIcons['talend-chevron-end'],
	'talend-chevron-left': talendIcons['talend-chevron-left'],
	'talend-cog': talendIcons['talend-cog'],
	'talend-cross': talendIcons['talend-cross'],
	'talend-expanded': talendIcons['talend-expanded'],
	'talend-file': talendIcons['talend-file'],
	'talend-file-json-o': talendIcons['talend-file-json-o'],
	'talend-file-xls-o': talendIcons['talend-file-xls-o'],
	'talend-files-o': talendIcons['talend-files-o'],
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
	'talend-warning': talendIcons['talend-warning'],
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
	id: 'overlay',
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
	columns: [
		{ key: 'id', label: 'Id', order: 0 },
		{ key: 'name', label: 'Name', order: 1 },
		{ key: 'author', label: 'Author', order: 3 },
		{ key: 'created', label: 'Created', order: 2 },
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
			icon: 'talend-file-xls-o',
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
			id: 3,
			name: 'Super long title to trigger overflow on tile rendering',
			created: '2016-09-22',
			modified: '2016-09-22',
			author:
				'Jean-Pierre DUPONT with super super super super super super super super super super super super long name, but there was not enough long text',
			className: 'item-3-class',
		},
	],
	titleKey: 'name',
	titleIconKey: 'icon',
	titleDisplayModeKey: 'display',
	onTitleClick: action('onTitleClick'),
	onTitleEditCancel: action('onEditCancel'),
	onTitleEditSubmit: action('onEditSubmit'),
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
	onDisplayChange: action('display.onChange'),
	sortOn: 'name',
	onSort: action('sort.onChange'),
	sortOptions: [{ id: 'id', name: 'Id' }, { id: 'name', name: 'Name' }],
	itemsPerPage: 5,
	totalResults: 10,
	pagination: true,
	onPaginationChange: action('pagination.onChange'),
	onFilterBlur: action('filter.onBlur'),
	onFilterFocus: action('filter.onFocus'),
	onFilterChange: action('filter.onFilter'),
	onFilterToggle: action('filter.onToggle'),
	filterDocked: true,
	filterPlaceholder: 'search for something',
};

const referenceDatetime = Date.now();
const minusThreeHours = referenceDatetime - 3600 * 3 * 1000;
const minusTwoHours = referenceDatetime - 3600 * 2 * 1000;
const minusOneHours = referenceDatetime - 3600 * 1 * 1000;
const minusThreeMin = referenceDatetime - 60 * 3 * 1000;

const propsWithVirtualized = {
	id: 'talend',
	displayMode: 'table',
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
		{ key: 'modified', label: 'Modified', type: 'datetime', data: { mode: 'ago' } },
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
	titleKey: 'name',
	titleIconKey: 'icon',
	titleDisplayModeKey: 'display',
	onTitleClick: action('onTitleClick'),
	onTitleEditCancel: action('onEditCancel'),
	onTitleEditSubmit: action('onEditSubmit'),
	itemProps: {
		classNameKey: 'className',
	},
};

const itemPropsForItems = {
	classNameKey: 'className',
	onOpen: action('onItemOpen'),
	onSelect: action('onItemSelect'),
	onToggle: action('onItemToggle'),
	onToggleAll: action('onToggleAll'),
	isSelected: item => selected.find(next => next.id === item.id),
	selectedCount: selected.length,
	onCancel: action('onTitleEditCancel'),
	onChange: action('onTitleChange'),
	onSubmit: action('onTitleEditSubmit'),
};

const sort = {
	sortOn: 'modified',
	sortIsDescending: false,
	onSortChange: action('sort.onChange'),
};

function getActionsProps() {
	const columnActionsProps = cloneDeep(props);
	const actionsColumn = {
		key: 'columnActions',
		label: 'Actions', // label should be set for screen readers
		hideHeader: true, // header will created with a sr-only class, so it will be hidden
	};

	columnActionsProps.columns.splice(2, 0, actionsColumn);
	columnActionsProps.items = columnActionsProps.items.map((item, index) => ({
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

storiesOf('List', module)
	.addDecorator(checkA11y)
	.addDecorator(story => (
		<div className="container-fluid">
			<LanguageSwitcher />
			<IconsProvider defaultIcons={icons} />
			<I18nextProvider i18n={i18n}>{story()}</I18nextProvider>
		</div>
	))
	.add('Table display', () => (
		<div style={{ height: '70vh' }} className="virtualized-list">
			<h1>List</h1>
			<p>
				Display the list in table mode.<br />
				This is the default mode.
			</p>
			<List {...props} />
		</div>
	))
	.add('Table icons', () => {
		const customProps = cloneDeep(props);

		customProps.columns = [
			{ key: 'id', label: 'Id' },
			{ key: 'name', label: 'Name' },
			{ key: 'status', label: 'Status', type: 'texticon', data: { getIcon } },
			{ key: 'cat', label: 'Cat' },
		];

		customProps.items = itemsForListWithIcons;

		return (
			<div style={{ height: '70vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>
					Display the list in table mode.<br />
					This is the default mode.
				</p>
				<List {...customProps} />
			</div>
		);
	})
	.add('Large display', () => (
		<div style={{ height: '70vh' }} className="virtualized-list">
			<h1>List</h1>
			<p>
				Display the list in large mode.<br />
				You just need to pass the props displayMode.
			</p>
			<pre>&lt;List displayMode="large" ... &gt;</pre>
			<List {...props} rowHeight={140} displayMode="large" />
		</div>
	))
	.add('Large display with icons', () => {
		const customProps = cloneDeep(props);
		customProps.columns = [
			{ key: 'id', label: 'Id' },
			{ key: 'name', label: 'Name' },
			{ key: 'status', label: 'Status', type: 'texticon', data: { getIcon } },
			{ key: 'cat', label: 'Cat' },
		];
		customProps.items = itemsForListWithIcons;

		return (
			<div style={{ height: '70vh' }} className="virtualized-list">
				<List {...customProps} rowHeight={140} displayMode="large" />
			</div>
		);
	})
	.add('Empty list', () => {
		const emptyListProps = cloneDeep(props);
		emptyListProps.items = [];

		const customEmptyRendererListProps = cloneDeep(props);
		customEmptyRendererListProps.items = [];
		customEmptyRendererListProps.noRowsRenderer = () => (
			<span className={'tc-virtualizedlist-no-result'} role="status" aria-live="polite">
				I'm a custom NoRowsRenderer
			</span>
		);

		return (
			<div style={{ height: '70vh' }}>
				<h1>List</h1>
				<p>When the list is empty, a message is displayed instead of the rows.</p>
				<h2>Table</h2>
				<List {...emptyListProps} />
				<h2>Large</h2>
				<List {...emptyListProps} displayMode="large" />
				<h2>Custom no row renderer</h2>
				<List {...customEmptyRendererListProps} />
			</div>
		);
	})
	.add('List in progress', () => {
		const loadingListProps = cloneDeep(props);
		loadingListProps.inProgress = true;
		return (
			<div style={{ height: '70vh' }}>
				<h1>List</h1>
				<p>When the list is loading, a CircularProgress is displayed instead of the rows.</p>
				<h2>Table</h2>
				<List {...loadingListProps} />
				<h2>Large</h2>
				<List {...loadingListProps} displayMode="large" />
			</div>
		);
	})
	.add('Column actions', () => {
		const columnActionsProps = getActionsProps();
		return (
			<div style={{ height: '70vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>A column can contains only actions that appear on mouseover.</p>
				<List {...columnActionsProps} />
			</div>
		);
	})
	.add('Selection', () => {
		const selectedItemsProps = cloneDeep(props);
		selectedItemsProps.multiSelectActions = {
			left: [
				{
					id: 'remove',
					label: 'Delete selection',
					icon: 'talend-trash',
					onClick: action('remove'),
				},
			],
		};
		Object.assign(selectedItemsProps, itemPropsForItems);
		return (
			<div style={{ height: '70vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>
					You can manage selection by passing 3 props : onSelect, isSelected, selectedCount.<br />
					<b>onSelect(event, item)</b> : item selection callback
					<b>isSelected(item)</b> : returns true if the item is selected
				</p>
				<pre>
					listProps.onSelect = (event, item) => mySelectionCallback(event, item);<br />
					listProps.isSelected = (item) => item.id === 2;<br />
					listProps.selectedCount = 1;<br />
					&lt;List &#123;...listProps&#125; &gt;<br />
				</pre>
				<List {...selectedItemsProps} />
			</div>
		);
	})
	.add('Activation', () => {
		const selectedItemsProps = cloneDeep(props);
		selectedItemsProps.isActive = item => item.id === 0;
		selectedItemsProps.onRowClick = action('onRowClick');
		return (
			<div style={{ height: '70vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>
					You can manage selection by passing 2 props : onRowClick and isActive.<br />
					<b>onRowClick(event, item)</b> : item selection callback<br />
					<b>isActive(item)</b> : returns true if the item is selected
				</p>
				<pre>
					listProps.onRowClick = (event, rowData) => myRowClickCallback(rowData);<br />
					listProps.isActive = (item) => item.id === 0;<br />
					&lt;List &#123;...listProps&#125; &gt;<br />
				</pre>
				<h2>Table</h2>
				<List {...selectedItemsProps} />
				<h2>Large</h2>
				<List {...selectedItemsProps} rowHeight={140} displayMode="large" />
			</div>
		);
	})
	.add('No toolbar', () => {
		const tprops = cloneDeep(props);
		tprops.hideToolbar = true;
		return (
			<div style={{ height: '70vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>Table without toolbar</p>
				<List {...tprops} />
			</div>
		);
	})
	.add('Sort', () => {
		const tprops = cloneDeep(props);
		Object.assign(tprops, sort);
		// disable sort on column author
		const authorColumn = tprops.columns.find(e => e.key === 'author');
		authorColumn.disableSort = true;
		return (
			<div style={{ height: '70vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>You add sort management with column header click.</p>
				<pre>
					listProps.sort.field = 'modified';<br />
					listProps.sort.isDescending = false;<br />
					listProps.sort.onChange = (event, &#123;field, isDescending&#125;) => sort(field,
					isDescending);<br />
					&lt;List ... list=&#123;listProps&#125; &gt;<br />
				</pre>
				<p>
					You add sort management with column header click.<br />
				</p>
				<pre>
					listProps.sortOn = 'name';<br />
					listProps.sortIsDescending = false;<br />
					listProps.onSortChange = (event, &#123;field, isDescending&#125;) => sort(field,
					isDescending);<br />
					&lt;List &#123;...listProps&#125; &gt;<br />
				</pre>
				<p>
					To disable sort on a column, add the <strong>disableSort</strong> props (see Author
					column).
				</p>
				<List {...tprops} />
			</div>
		);
	})
	.add('Custom cell renderer', () => {
		const customProps = cloneDeep(props);

		customProps.columns = [
			{ key: 'id', label: 'Id' },
			{ key: 'name', label: 'Name' },
			{ key: 'status', label: 'Status', type: 'hello' },
			{ key: 'cat', label: 'Cat' },
		];

		customProps.items = itemsForListWithIcons;
		customProps.cellDictionary = { hello: { cellRenderer: CellWithHello } };

		return (
			<div style={{ height: '70vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>Display the list with a custom renderer for the status column.</p>
				<List {...customProps} />
			</div>
		);
	})
	.add('Filter', () => {
		const dockedProps = cloneDeep(props);
		// dockedProps.items = [dockedProps.items[0]];
		dockedProps.actions = null;

		const inputProps = Immutable.fromJS(dockedProps).toJS();
		inputProps.filterDocked = false;

		const highlightedProps = Immutable.fromJS(inputProps).toJS();
		highlightedProps.filterHighlight = true;

		const inputDebounceProps = Immutable.fromJS(inputProps).toJS();
		inputDebounceProps.filterDebounceTimeout = 300;

		return (
			<div style={{ height: '70vh' }} className="virtualized-list">
				<h1>List</h1>
				<h2>Definition</h2>
				<p>
					Filter in toolbar can have multiple states.<br />
					Its state, input, and callbacks are customizable.
				</p>
				<h2>Docked</h2>
				<div style={{ height: '30vh' }}>
					<List {...dockedProps} />
				</div>
				<h2>Input</h2>
				<div style={{ height: '30vh' }}>
					<List {...inputProps} />
				</div>
				<h2>Highlighted</h2>
				<div style={{ height: '30vh' }}>
					<List {...highlightedProps} />
				</div>
				<h2>Input with 300ms debounce</h2>
				<div style={{ height: '30vh' }}>
					<List {...inputDebounceProps} />
				</div>
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
			<div style={{ height: '70vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>You can get limited options for displayMode.</p>
				<pre>
					props.displayModes = ['large', 'table'];<br />
					&lt;List &#123;...props&#125; &gt;<br />
				</pre>
				<List {...tprops} />
			</div>
		);
	})
	.add('i18n', () => (
		<div>
			<h1>List with i18n</h1>
			<p>Change language in the toolbar</p>
			<List {...props} />
		</div>
	))
	.add('Title without click', () => {
		const tprops = cloneDeep(props);

		tprops.onTitleClick = null;

		return (
			<div style={{ height: '70vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>
					To have not clickable titles, just don't pass any onTitleClick callback
					<pre>
						const props = &#123;...&#125;;<br />
						props.onTitleClick = null;<br />
						&lt;List &#123;...props&#125; /&gt;
					</pre>
				</p>
				<List {...tprops} />
			</div>
		);
	})
	.add('Hidden header labels', () => {
		const tprops = cloneDeep(props);

		tprops.columns[0].hideHeader = true;

		return (
			<div style={{ height: '70vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>
					Display the list with hidden header labels.<br />
					<pre>
						const props = &#123;...&#125;;<br />
						props.columns[0].hideHeader = true;<br />
						&lt;List &#123;...props&#125; /&gt;
					</pre>
				</p>
				<List {...tprops} />
			</div>
		);
	})
	.add('Custom classnames', () => (
		<div style={{ height: '70vh' }} className="virtualized-list virtualized-list-customized-row">
			<h1>List</h1>
			<p>Display the list with hidden header labels.</p>
			<List {...props} />
		</div>
	))
	.add('Inline parent', () => (
		<div className="virtualized-list">
			<h1>List</h1>
			{/* Do not reproduce!*/}
			<span>
				<List {...props} />
			</span>
		</div>
	))
	.add('List cell renderer', () => (
		<div className="virtualized-list">
			<h1>List with specified VirtualizedList cell renderer</h1>
			<p>CellDatetimeRenderer in action.</p>
			<span>
				<List {...propsWithVirtualized} />
			</span>
		</div>
	))
	.add('Table display with action overlay', () => {
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

		const listProps = {
			...props,
			list: {
				...props.list,
				items,
			},
		};

		return (
			<div style={{ height: '70vh' }} className="virtualized-list">
				<h1>List</h1>
				<p>
					Display the list in table mode.<br />
					This is the default mode.
				</p>
				<List {...listProps} />
			</div>
		);
	});
