/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions'; // eslint-disable-line import/no-extraneous-dependencies
import talendIcons from '@talend/icons/dist/react';

import { SortIndicator } from 'react-virtualized';

import { IconsProvider } from '../src/index';
import VirtualizedList, { listTypes } from '../src/VirtualizedList';
import MyCustomRow from './List/MyCustomRow.component';

import { headerDictionary } from '../src/VirtualizedList/utils/dictionary';
import { headerType as headerResizableType } from '../src/VirtualizedList/HeaderResizable';
import { HeaderResizable } from '../src/VirtualizedList/HeaderResizable/HeaderResizable.component';
import { headerType as headerIconType } from '../src/VirtualizedList/HeaderIcon';

function NoRowsRenderer() {
	return (
		<span className={'tc-virtualizedlist-no-result'} role="status" aria-live="polite">
			I'm a custom NoRowsRenderer
		</span>
	);
}

const icons = {
	'talend-badge': talendIcons['talend-badge'],
	'talend-caret-down': talendIcons['talend-caret-down'],
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
};

const titleProps = {
	onClick: action('onTitleClick'),
	'data-feature': 'list.item.title',
	actionsKey: 'titleActions',
	persistentActionsKey: 'persistentActions',
	displayModeKey: 'display',
	iconKey: 'icon',
	onEditCancel: action('cancel-edit'),
	onEditSubmit: action('submit-edit'),
};

const titlePropsWithTooltipLabel = {
	...titleProps,
	iconLabelKey: 'iconTooltipLabel',
};

const fewTitleActions = [
	{
		id: 'edit',
		label: 'Edit',
		'data-feature': 'list.item.edit',
		icon: 'talend-pencil',
		onClick: action('onEdit'),
		hideLabel: true,
	},
	{
		id: 'delete',
		label: 'Delete',
		'data-feature': 'list.item.delete',
		icon: 'talend-trash',
		onClick: action('onDelete'),
		hideLabel: true,
	},
];

const lotOfTitleActions = [
	{
		id: 'edit',
		label: 'Edit',
		'data-feature': 'list.item.edit',
		icon: 'talend-pencil',
		onClick: action('onEdit'),
	},
	{
		id: 'delete',
		label: 'Delete',
		'data-feature': 'list.item.delete',
		icon: 'talend-trash',
		onClick: action('onDelete'),
	},
	{
		id: 'copy',
		label: 'Copy',
		'data-feature': 'list.item.copy',
		icon: 'talend-files-o',
		onClick: action('onCopy'),
	},
	{
		id: 'parameters',
		label: 'Edit parameters',
		'data-feature': 'list.item.params',
		icon: 'talend-cog',
		onClick: action('onEditParameters'),
	},
];

const titleActions = [
	{
		id: 'edit',
		label: 'edit',
		'data-feature': 'list.item.edit',
		icon: 'talend-pencil',
		onClick: action('onEdit'),
	},
	{
		id: 'delete',
		label: 'delete',
		'data-feature': 'list.item.delete',
		icon: 'talend-trash',
		onClick: action('onDelete'),
	},
	{
		id: 'copy',
		label: 'copy',
		'data-feature': 'list.item.copy',
		icon: 'talend-files-o',
		onClick: action('onCopy'),
	},
	{
		id: 'parameters',
		label: 'edit parameters',
		'data-feature': 'list.item.params',
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
				'data-feature': 'list.item.related',
				onClick: action('document 1 click'),
			},
			{
				label: 'document 2',
				'data-feature': 'list.item.related',
				onClick: action('document 2 click'),
			},
			{
				label: 'document 3',
				'data-feature': 'list.item.related',
				onClick: action('document 3 click'),
			},
			{
				label: 'document 4',
				'data-feature': 'list.item.related',
				onClick: action('document 4 click'),
			},
			{
				label: 'document 5',
				'data-feature': 'list.item.related',
				onClick: action('document 5 click'),
			},
			{
				label: 'document 6',
				'data-feature': 'list.item.related',
				onClick: action('document 6 click'),
			},
			{
				label: 'document 7',
				'data-feature': 'list.item.related',
				onClick: action('document 7 click'),
			},
			{
				label: 'document 8',
				'data-feature': 'list.item.related',
				onClick: action('document 8 click'),
			},
			{
				label: 'document 9',
				'data-feature': 'list.item.related',
				onClick: action('document 9 click'),
			},
			{
				label: 'document 10',
				'data-feature': 'list.item.related',
				onClick: action('document 10 click'),
			},
		],
		pullRight: true,
	},
];

const persistentActions = [
	{
		label: 'favorite',
		icon: 'talend-star',
		className: 'favorite',
		'data-feature': 'list.item.favorite',
		onClick: action('onFavorite'),
	},
	{
		label: 'certify',
		icon: 'talend-badge',
		className: 'certify',
		'data-feature': 'list.item.certify',
		onClick: action('onCertify'),
	},
];

const collection = [
	{
		id: 0,
		name: 'Title with few actions',
		tag: 'test',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Simple row with few actions',
		author: 'Jean-Pierre DUPONT',
		display: 'text',
		className: 'item-0-class',
		titleActions: fewTitleActions,
	},
	{
		id: 1,
		name: 'Title with lot of actions',
		tag: 'test',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Simple row with lot of actions',
		display: 'text',
		className: 'item-1-class',
		titleActions: lotOfTitleActions,
	},
	{
		id: 2,
		name: 'Title with persistant actions',
		tag: 'test',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Simple row with icon and actions',
		author: 'Jean-Pierre DUPONT',
		display: 'text',
		className: 'item-2-class',
		persistentActions,
	},
	{
		id: 3,
		name: 'Title with icon',
		tag: 'test',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Simple row without icon',
		author: '',
		icon: 'talend-file-xls-o',
		display: 'text',
		className: 'item-3-class',
	},
	{
		id: 4,
		name: 'Title in input mode',
		tag: 'test',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Simple row with title in edit mode',
		author: 'Jean-Pierre DUPONT',
		icon: 'talend-file-json-o',
		display: 'input',
		className: 'item-4-class',
	},
	{
		id: 5,
		name: 'Title with long long long long long long long long long long long text',
		tag: 'test',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Row with a super super long text to show the ellipsis',
		author:
			'Jean-Pierre DUPONT with super super super super super super super super super super super super super super super super super super super super super super super long name, but there was not enough long text',
		icon: 'talend-file-json-o',
		className: 'item-5-class',
	},
];

for (let i = collection.length; i < 100; i += 1) {
	collection.push({
		id: i,
		name: `Title with icon and actions ${i}`,
		tag: 'test',
		created: 1474495200,
		modified: 1474495200,
		description: 'Simple row with icon and actions',
		author: 'Jean-Pierre DUPONT',
		icon: 'talend-file-xls-o',
		display: 'text',
		className: 'item-0-class',
		persistentActions,
		titleActions,
	});
}

const collectionWithTooltupLabel = collection.map(item => {
	if (item.icon) {
		return { ...item, iconTooltipLabel: 'My tooltip label' };
	}
	return item;
});

const collapsibleListCollection = [
	{
		header: [
			{
				displayMode: 'status',
				actions: [],
				status: 'successful',
				label: 'Successful',
				icon: 'talend-check',
			},
		],
		content: [
			{
				label: 'Content1',
				description: 'Description1',
			},
			{
				label: 'Content2',
				description: 'Description2',
			},
		],
		expanded: true,
		children: <div>HELLO WORLD</div>,
	},
	{
		header: [
			{
				displayMode: 'status',
				actions: [],
				status: 'canceled',
				label: 'Canceled',
				icon: 'talend-cross',
			},
		],
		content: [
			{
				label: 'Content1',
				description: 'Description1',
			},
			{
				label: 'Content2',
				description: 'Description2',
			},
		],
		expanded: false,
	},
	{
		header: [
			{
				displayMode: 'status',
				actions: [],
				status: 'failed',
				label: 'Failure',
				icon: 'talend-cross',
			},
		],
		content: [
			{
				label: 'Content1',
				description: 'Description1',
			},
			{
				label: 'Content2',
				description: 'Description2',
			},
		],
		expanded: true,
	},
];

const sourceItems = [...new Array(50)].map(
	(item, index) => collapsibleListCollection[index % collapsibleListCollection.length],
);

function CollapsiblePanels(props) {
	const [collection, setCollection] = React.useState(props.sourceItems);
	return (
		<div>
			<h1>Virtualized List with Collapsible Panels</h1>
			<IconsProvider defaultIcons={icons} />
			<section style={{ height: '90vh' }}>
				<VirtualizedList
					collection={collection}
					onRowClick={(event, rowItem) => {
						action('onRowClick');
						collection[rowItem.index] = {
							...rowItem,
							expanded: !rowItem.expanded,
						};
						setCollection([...collection]);
					}}
					onScroll={action('onScroll')}
					id={'my-list'}
					type={listTypes.COLLAPSIBLE_PANEL}
				/>
			</section>
		</div>
	);
}

const CustomRenderResizableWidthRenderProps = props => (
	<HeaderResizable {...props}>
		<button onClick={action('custom action')}>{props.label}</button>
		<SortIndicator sortDirection="DESC" />
		<span>This is a custom resizable header</span>
	</HeaderResizable>
);

storiesOf('VirtualizedList', module)
	.add('List > Table', () => (
		<div className="virtualized-list">
			<h1>Virtualized List</h1>
			<p>
				By default each columns have the same size. The cells are placed using flexbox. You can
				customize the flex properties of the cells using the generated classnames.
			</p>
			<p>
				Example here
				<pre>
					{`.virtualized-list div.tc-list-cell-id { flex: 0 0 50px; }
.virtualized-list div.tc-list-cell-name { flex: 0 0 350px; }
.virtualized-list div.tc-list-cell-actions { flex: 0 0 120px; }
.virtualized-list div.tc-list-cell-tag { flex: 0 0 120px; }
.virtualized-list div.tc-list-cell-description { flex: 1 0 120px; }
.virtualized-list div.tc-list-cell-author { flex: 1 0 90px; }
.virtualized-list div.tc-list-cell-created,
.virtualized-list div.tc-list-cell-modified { flex: 0 0 90px;}`}
				</pre>
			</p>
			<IconsProvider defaultIcons={icons} />
			<section style={{ height: '50vh' }}>
				<VirtualizedList collection={collection} id={'my-list'}>
					<VirtualizedList.Text label="Id" dataKey="id" />
					<VirtualizedList.Title label="Name" dataKey="name" columnData={titleProps} />
					<VirtualizedList.Badge label="Tag" dataKey="tag" columnData={{ selected: true }} />
					<VirtualizedList.Text label="Description" dataKey="description" />
					<VirtualizedList.Text label="Author" dataKey="author" />
					<VirtualizedList.Datetime label="Created" dataKey="created" />
					<VirtualizedList.Datetime label="Modified" dataKey="modified" />
				</VirtualizedList>
			</section>
		</div>
	))



	.add('List > Table with radio button title', () => (
		<div className="virtualized-list">
			<h1>Virtualized List with radio button title</h1>
			<IconsProvider defaultIcons={icons} />
			<section style={{ height: '50vh' }}>
				<VirtualizedList
					collection={collection}
					id={'my-list'}
					isSelected={item => item.id === 2}
					selectionToggle={action('selectionToggle')}
					selectionMode="SINGLE"

				>
					<VirtualizedList.Title label="Name" dataKey="name" columnData={titleProps} />
					<VirtualizedList.Text label="Author" dataKey="author" />
					<VirtualizedList.Datetime label="Modified" dataKey="modified" />
				</VirtualizedList>
			</section>
		</div>
	))


	.add('List > Table : sort', () => (
		<div className="virtualized-list">
			<h1>Virtualized List</h1>
			<p>
				You can enable sort by passing <b>sort</b>, <b>sortBy</b> and <b>sortDirection</b>.<br />
				To disable sort on a column, add the <b>disableSort</b> props (see Description column).
			</p>
			<IconsProvider defaultIcons={icons} />
			<section style={{ height: '50vh' }}>
				<VirtualizedList
					collection={collection}
					id={'my-list'}
					sort={action('sort')}
					sortBy={'name'}
					sortDirection={'ASC'}
				>
					<VirtualizedList.Text label="Id" dataKey="id" />
					<VirtualizedList.Title label="Name" dataKey="name" columnData={titleProps} />
					<VirtualizedList.Text
						label="Description (non sortable)"
						dataKey="description"
						disableSort
					/>
					<VirtualizedList.Text label="Author" dataKey="author" />
					<VirtualizedList.Datetime label="Created" dataKey="created" />
					<VirtualizedList.Datetime label="Modified" dataKey="modified" />
				</VirtualizedList>
			</section>
		</div>
	))
	.add('List > Table : selection', () => (
		<div className="virtualized-list">
			<h1>Virtualized List</h1>
			<p>
				Selection can be enabled by passing <b>selectionToggle</b> callback and <b>isSelected</b>{' '}
				function that returns if a row is selected.
				<br />
				Here <pre>{'isSelected={item => item.id === 6}'}</pre>
			</p>
			<IconsProvider defaultIcons={icons} />
			<section style={{ height: '50vh' }}>
				<VirtualizedList
					collection={collection}
					id={'my-list'}
					isSelected={item => item.id === 6}
					selectionToggle={action('selectionToggle')}
					onRowDoubleClick={action('doubleClick')}
					onToggleAll={action('toggleAll')}
				>
					<VirtualizedList.Text label="Id" dataKey="id" />
					<VirtualizedList.Title label="Name" dataKey="name" columnData={titleProps} />
					<VirtualizedList.Text label="Description (non sortable)" dataKey="description" />
					<VirtualizedList.Text label="Author" dataKey="author" />
					<VirtualizedList.Datetime label="Created" dataKey="created" />
					<VirtualizedList.Datetime label="Modified" dataKey="modified" />
				</VirtualizedList>
			</section>
		</div>
	))
	.add('List > Table : activation', () => (
		<div className="virtualized-list">
			<h1>Virtualized List</h1>
			<p>
				Row click can be enabled by passing <b>onRowClick</b> callback and <b>isActive</b> function
				that returns if a row is active.
				<br />
				Here example <pre>{'isActive={item => item.id === 6}'}</pre>
			</p>
			<IconsProvider defaultIcons={icons} />
			<section style={{ height: '50vh' }}>
				<VirtualizedList
					collection={collection}
					id={'my-list'}
					onRowClick={action('onRowClick')}
					isActive={item => item.id === 6}
				>
					<VirtualizedList.Text label="Id" dataKey="id" />
					<VirtualizedList.Title label="Name" dataKey="name" columnData={titleProps} />
					<VirtualizedList.Text label="Description (non sortable)" dataKey="description" />
					<VirtualizedList.Text label="Author" dataKey="author" />
					<VirtualizedList.Datetime label="Created" dataKey="created" />
					<VirtualizedList.Datetime label="Modified" dataKey="modified" />
				</VirtualizedList>
			</section>
		</div>
	))
	.add('List > Table : desactivation', () => (
		<div className="virtualized-list">
			<h1>Virtualized List</h1>
			<p>
				Row can be disabled by passing <b>getRowState</b> function
				that returns a disabled flag and a message to show into the tooltip.
				<br />
				Here example <pre>{'getRowState={row => (row.id === 2 ? { disabled: true, tooltip: "Houlala" } : null)'}</pre>
			</p>
			<IconsProvider defaultIcons={icons} />
			<section style={{ height: '50vh' }}>
				<VirtualizedList
					collection={collection}
					id={'my-list'}
					onRowClick={action('onRowClick')}
					getRowState={row => (row.id === 2 ? { disabled: true, tooltip: 'Houlala' } : null)}
				>
					<VirtualizedList.Text label="Id" dataKey="id" />
					<VirtualizedList.Title label="Name" dataKey="name" columnData={titleProps} />
					<VirtualizedList.Text label="Description (non sortable)" dataKey="description" />
					<VirtualizedList.Text label="Author" dataKey="author" />
					<VirtualizedList.Datetime label="Created" dataKey="created" />
					<VirtualizedList.Datetime label="Modified" dataKey="modified" />
				</VirtualizedList>
			</section>
		</div>
	))
	.add('List > Table : resizable', () => (
		<div className="virtualized-list">
			<h1>Virtualized List</h1>
			<p>
				You can enable resizing by passing <b>resizable</b> and a <b>width</b> to the content.
				<br />
				Also you have to give the proper header renderer, <b>HeaderResizable</b>.<br />
			</p>
			<IconsProvider defaultIcons={icons} />
			<section>
				<VirtualizedList collection={collection} id={'my-list'}>
					<VirtualizedList.Text label="Id" dataKey="id" width={40} />
					<VirtualizedList.Title
						columnData={titleProps}
						dataKey="name"
						headerRenderer={CustomRenderResizableWidthRenderProps}
						label="Name"
						resizable
						width={250}
					/>
					<VirtualizedList.Text
						dataKey="description"
						disableSort
						headerRenderer={headerDictionary[headerResizableType]}
						label="Description"
						resizable
						width={650}
					/>
					<VirtualizedList.Text
						columnData={{
							iconName: 'talend-badge',
						}}
						label="Author"
						{...headerDictionary[headerIconType]}
						dataKey="author"
						width={80}
					/>
					<VirtualizedList.Datetime
						dataKey="created"
						headerRenderer={headerDictionary[headerResizableType]}
						label="Created"
						resizable
						width={100}
					/>
					<VirtualizedList.Datetime dataKey="modified" label="Modified" resizable width={100} />
				</VirtualizedList>
			</section>
		</div>
	))

	.add('List > Large', () => (
		<div>
			<h1>Virtualized List</h1>
			<p>
				On Large rendering, the title is automatically placed at the top.
				<br />
				The rest of the fields are displayed on the <b>VirtualizedList.Content</b> order.
				<br />
				The row height is by default <b>135px</b> but can be customized by passing a<b>rowHeight</b>{' '}
				props.
			</p>
			<IconsProvider defaultIcons={icons} />
			<section style={{ height: '50vh' }}>
				<VirtualizedList
					collection={collection}
					id={'my-list'}
					rowHeight={135}
					type={listTypes.LARGE}
				>
					<VirtualizedList.Text label="Id" dataKey="id" />
					<VirtualizedList.Title label="Name" dataKey="name" columnData={titleProps} />
					<VirtualizedList.Text label="Description" dataKey="description" />
					<VirtualizedList.Text label="Author" dataKey="author" />
					<VirtualizedList.Datetime label="Created" dataKey="created" />
					<VirtualizedList.Datetime label="Modified" dataKey="modified" />
				</VirtualizedList>
			</section>
		</div>
	))
	.add('List > Large : selection', () => (
		<div>
			<h1>Virtualized List</h1>
			<p>
				Selection can be enabled by passing <b>selectionToggle</b> callback and <b>isSelected</b>{' '}
				function that returns if a row is selected.
				<br />
				Here <pre>{'isSelected={item => item.id === 6}'}</pre>
			</p>
			<IconsProvider defaultIcons={icons} />
			<section style={{ height: '50vh' }}>
				<VirtualizedList
					collection={collection}
					id={'my-list'}
					isSelected={item => item.id === 6}
					onRowDoubleClick={action('doubleClick')}
					rowHeight={135}
					selectionToggle={action('selectionToggle')}
					type={listTypes.LARGE}
				>
					<VirtualizedList.Text label="Id" dataKey="id" />
					<VirtualizedList.Title label="Name" dataKey="name" columnData={titleProps} />
					<VirtualizedList.Text label="Description" dataKey="description" />
					<VirtualizedList.Text label="Author" dataKey="author" />
					<VirtualizedList.Datetime label="Created" dataKey="created" />
					<VirtualizedList.Datetime label="Modified" dataKey="modified" />
				</VirtualizedList>
			</section>
		</div>
	))
	.add('List > Large : activation', () => (
		<div>
			<h1>Virtualized List</h1>
			<p>
				Row click can be enabled by passing <b>onRowClick</b> callback and <b>isActive</b> function
				that returns if a row is active.
				<br />
				Here example <pre>{'isActive={item => item.id === 6}'}</pre>
			</p>
			<IconsProvider defaultIcons={icons} />
			<section style={{ height: '50vh' }}>
				<VirtualizedList
					collection={collection}
					id={'my-list'}
					isActive={item => item.id === 6}
					onRowClick={action('onRowClick')}
					rowHeight={135}
					type={listTypes.LARGE}
				>
					<VirtualizedList.Text label="Id" dataKey="id" />
					<VirtualizedList.Title label="Name" dataKey="name" columnData={titleProps} />
					<VirtualizedList.Text label="Description" dataKey="description" />
					<VirtualizedList.Text label="Author" dataKey="author" />
					<VirtualizedList.Datetime label="Created" dataKey="created" />
					<VirtualizedList.Datetime label="Modified" dataKey="modified" />
				</VirtualizedList>
			</section>
		</div>
	))
	.add('List > CollapsiblePanels', () => <CollapsiblePanels sourceItems={sourceItems} />)
	.add('List > Table without header', () => (
		<div className="virtualized-list">
			<h1>Virtualized List</h1>
			<p>
				By default each columns have the same size. The cells are placed using flexbox. You can
				customize the flex properties of the cells using the generated classnames.
			</p>
			<p>
				Example here
				<pre>
					{`.virtualized-list div.tc-list-cell-id { flex: 0 0 50px; }
.virtualized-list div.tc-list-cell-name { flex: 0 0 350px; }
.virtualized-list div.tc-list-cell-actions { flex: 0 0 120px; }
.virtualized-list div.tc-list-cell-description { flex: 1 0 120px; }
.virtualized-list div.tc-list-cell-author { flex: 1 0 90px; }
.virtualized-list div.tc-list-cell-created,
.virtualized-list div.tc-list-cell-modified { flex: 0 0 90px;}`}
				</pre>
			</p>
			<IconsProvider defaultIcons={icons} />
			<section style={{ height: '50vh' }}>
				<VirtualizedList collection={collection} id={'my-list'} disableHeader>
					<VirtualizedList.Text label="Id" dataKey="id" />
					<VirtualizedList.Title label="Name" dataKey="name" columnData={titleProps} />
					<VirtualizedList.Text label="Description (non sortable)" dataKey="description" />
					<VirtualizedList.Text label="Author" dataKey="author" />
					<VirtualizedList.Datetime label="Created" dataKey="created" />
					<VirtualizedList.Datetime label="Modified" dataKey="modified" />
				</VirtualizedList>
			</section>
		</div>
	))
	.add('List > with tooltips in list item icons', () => (
		<div>
			<h1>Virtualized List</h1>
			<p>
				Tooltip label on list item icon can be enabled by passing
				<b>iconKey, iconLabelKey</b> in titleProps,
				<br />
				also the icon name and tooltip label should be provided in list item rowData (in{' '}
				<b>collection</b> items)
			</p>
			<IconsProvider defaultIcons={icons} />
			<section style={{ height: '50vh' }}>
				<VirtualizedList collection={collectionWithTooltupLabel} id={'my-list'}>
					<VirtualizedList.Text label="Id" dataKey="id" />
					<VirtualizedList.Title
						label="Name"
						dataKey="name"
						columnData={titlePropsWithTooltipLabel}
					/>
					<VirtualizedList.Badge label="Tag" dataKey="tag" columnData={{ selected: true }} />
					<VirtualizedList.Text label="Description (non sortable)" dataKey="description" />
					<VirtualizedList.Text label="Author" dataKey="author" />
					<VirtualizedList.Datetime label="Created" dataKey="created" />
					<VirtualizedList.Datetime label="Modified" dataKey="modified" />
				</VirtualizedList>
			</section>
		</div>
	))
	.add('List > custom noRowsRenderer', () => (
		<div className="virtualized-list">
			<h1>Virtualized List</h1>
			<IconsProvider defaultIcons={icons} />
			<section style={{ height: '50vh' }}>
				<VirtualizedList collection={[]} id={'my-list'} noRowsRenderer={NoRowsRenderer}>
					<VirtualizedList.Text label="Id" dataKey="id" />
					<VirtualizedList.Text label="Description (non sortable)" dataKey="description" />
					<VirtualizedList.Text label="Author" dataKey="author" />
					<VirtualizedList.Datetime label="Created" dataKey="created" />
					<VirtualizedList.Datetime label="Modified" dataKey="modified" />
				</VirtualizedList>
			</section>
		</div>
	))
	.add('List > custom rowRenderers', () => (
		<div className="virtualized-list">
			<h1>Virtualized List</h1>
			<IconsProvider defaultIcons={icons} />
			<section style={{ height: '50vh' }}>
				<VirtualizedList
					collection={collectionWithTooltupLabel}
					id={'my-list'}
					type="custom"
					rowHeight={116}
					rowRenderers={{ custom: MyCustomRow }}
				>
					<VirtualizedList.Text label="Id" dataKey="id" />
					<VirtualizedList.Text label="Description (non sortable)" dataKey="description" />
					<VirtualizedList.Text label="Author" dataKey="author" />
					<VirtualizedList.Datetime label="Created" dataKey="created" />
					<VirtualizedList.Datetime label="Modified" dataKey="modified" />
				</VirtualizedList>
			</section>
		</div>
	));
