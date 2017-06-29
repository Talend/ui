import React from 'react';
import { storiesOf, action } from '@kadira/storybook';  // eslint-disable-line import/no-extraneous-dependencies
import talendIcons from 'talend-icons/dist/react';

import { IconsProvider } from '../src/index';
import VirtualizedList, { listTypes } from '../src/VirtualizedList';
import CellActions from '../src/VirtualizedList/CellActions';
import CellTitle from '../src/VirtualizedList/CellTitle';

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

const titleProps = {
	onClick: action('click'),
	actionsKey: 'titleActions',
	displayModeKey: 'display',
	iconKey: 'icon',
	onEditCancel: action('cancel-edit'),
	onEditSubmit: action('submit-edit'),
};

const titleActions = [
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

const actions = [
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
];

const collection = [
	{
		id: 0,
		name: 'Title with icon and actions',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Simple row with icon and actions',
		author: 'Jean-Pierre DUPONT',
		icon: 'talend-file-xls-o',
		display: 'text',
		className: 'item-0-class',
		actions,
		titleActions,
	},
	{
		id: 1,
		name: 'Title without actions',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Simple row without actions',
		author: 'Jean-Pierre DUPONT',
		icon: 'talend-file-xls-o',
		display: 'text',
		className: 'item-0-class',
		actions,
	},
	{
		id: 2,
		name: 'Title without icon',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Simple row without icon',
		author: 'Jean-Pierre DUPONT',
		display: 'text',
		className: 'item-0-class',
		actions,
		titleActions,
	},
	{
		id: 3,
		name: 'Title in input mode',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Simple row with title in edit mode, displaying an input instead of button',
		author: 'Jean-Pierre DUPONT',
		icon: 'talend-file-json-o',
		display: 'input',
		className: 'item-1-class',
		actions,
		titleActions,
	},
	{
		id: 4,
		name: 'Super long author',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Row with a super super long author to show the ellipsis',
		author: 'Jean-Pierre DUPONT with super super super super super super super super super super super super long name, but there was not enough long text',
		icon: 'talend-file-json-o',
		className: 'item-2-class',
		actions,
		titleActions,
	},
	{
		id: 5,
		name: 'Title with long long long long long long long long long long long text',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Row with a super super long title to show the ellipsis',
		author: 'Jean-Pierre DUPONT',
		icon: 'talend-file-xls-o',
		display: 'text',
		className: 'item-3-class',
		actions,
		titleActions,
	},
	{
		id: 6,
		name: 'Selected row',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Selected row with highlighted background',
		author: 'Jean-Pierre DUPONT',
		icon: 'talend-file-xls-o',
		display: 'text',
		className: 'item-3-class',
		actions,
		titleActions,
	},
];

for (let i = collection.length; i < 100; i += 1) {
	collection.push({
		id: i,
		name: 'Title with icon and actions',
		created: '2016-09-22',
		modified: '2016-09-22',
		description: 'Simple row with icon and actions',
		author: 'Jean-Pierre DUPONT',
		icon: 'talend-file-xls-o',
		display: 'text',
		className: 'item-0-class',
		actions,
		titleActions,
	});
}

storiesOf('Virtualized List', module)
	.add('List > Table', () => (
		<div className="virtualized-list">
			<h1>Virtualized List</h1>
			<p>
				By default each columns have the same size.
				The cells are placed using flexbox.
				You can customize the flex properties of the cells using the generated classnames.
			</p>
			<p>
				Example here
				<pre>
					{
`.virtualized-list div.tc-list-cell-id { flex: 0 0 50px; }
.virtualized-list div.tc-list-cell-name { flex: 0 0 350px; }
.virtualized-list div.tc-list-cell-actions { flex: 0 0 120px; }
.virtualized-list div.tc-list-cell-description { flex: 1 0 120px; }
.virtualized-list div.tc-list-cell-author { flex: 1 0 90px; }
.virtualized-list div.tc-list-cell-created,
.virtualized-list div.tc-list-cell-modified { flex: 0 0 90px;}`
					}
				</pre>
			</p>
			<IconsProvider defaultIcons={icons} />
			<section style={{ height: '50vh'}}>
				<VirtualizedList
					collection={collection}
					id={'my-list'}
				>
					<VirtualizedList.Content
						label="Id"
						dataKey="id"
					/>
					<VirtualizedList.Content
						label="Name"
						dataKey="name"
						columnData={titleProps}
						{...CellTitle}
					/>
					<VirtualizedList.Content
						label=""
						dataKey="actions"
						{...CellActions}
					/>
					<VirtualizedList.Content
						label="Description (non sortable)"
						dataKey="description"
					/>
					<VirtualizedList.Content
						label="Author"
						dataKey="author"
					/>
					<VirtualizedList.Content
						label="Created"
						dataKey="created"
					/>
					<VirtualizedList.Content
						label="Modified"
						dataKey="modified"
					/>
				</VirtualizedList>
			</section>
		</div>
	))
	.add('List > Table : sort', () => (
		<div className="virtualized-list">
			<h1>Virtualized List</h1>
			<p>
				You can enable sort by passing <b>sort</b>, <b>sortBy</b> and <b>sortDirection</b>.<br/>
				To disable sort on a column, add the <b>disableSort</b> props (see Description column).
			</p>
			<IconsProvider defaultIcons={icons} />
			<section style={{ height: '50vh'}}>
				<VirtualizedList
					collection={collection}
					id={'my-list'}
					sort={action('sort')}
					sortBy={'name'}
					sortDirection={'ASC'}
				>
					<VirtualizedList.Content
						label="Id"
						dataKey="id"
					/>
					<VirtualizedList.Content
						label="Name"
						dataKey="name"
						columnData={titleProps}
						{...CellTitle}
					/>
					<VirtualizedList.Content
						label=""
						dataKey="actions"
						disableSort
						{...CellActions}
					/>
					<VirtualizedList.Content
						label="Description (non sortable)"
						dataKey="description"
						disableSort
					/>
					<VirtualizedList.Content
						label="Author"
						dataKey="author"
					/>
					<VirtualizedList.Content
						label="Created"
						dataKey="created"
					/>
					<VirtualizedList.Content
						label="Modified"
						dataKey="modified"
					/>
				</VirtualizedList>
			</section>
		</div>
	))
	.add('List > Table : selection', () => (
		<div className="virtualized-list">
			<h1>Virtualized List</h1>
			<p>
				Selection can be enabled by passing <b>selectionToggle</b> callback
				and <b>isSelected</b> function that returns if a row is selected.<br/>
				Here <pre>{'isSelected={item => item.id === 6}'}</pre>
			</p>
			<IconsProvider defaultIcons={icons} />
			<section style={{ height: '50vh'}}>
				<VirtualizedList
					collection={collection}
					id={'my-list'}
					isSelected={item => item.id === 6}
					selectionToggle={action('selectionToggle')}
				>
					<VirtualizedList.Content
						label="Id"
						dataKey="id"
					/>
					<VirtualizedList.Content
						label="Name"
						dataKey="name"
						columnData={titleProps}
						{...CellTitle}
					/>
					<VirtualizedList.Content
						label=""
						dataKey="actions"
						{...CellActions}
					/>
					<VirtualizedList.Content
						label="Description (non sortable)"
						dataKey="description"
					/>
					<VirtualizedList.Content
						label="Author"
						dataKey="author"
					/>
					<VirtualizedList.Content
						label="Created"
						dataKey="created"
					/>
					<VirtualizedList.Content
						label="Modified"
						dataKey="modified"
					/>
				</VirtualizedList>
			</section>
		</div>
	))
	.add('List > Large', () => (
		<div>
			<h1>Virtualized List</h1>
			<p>
				On Large rendering, the title is automatically placed at the top.<br/>
				The rest of the fields are displayed on the <b>VirtualizedList.Content</b> order.<br/><br/>
				The row height is by default <b>135px</b> but can be customized by passing a <b>rowHeight</b> props.
			</p>
			<IconsProvider defaultIcons={icons} />
			<section style={{ height: '50vh' }}>
				<VirtualizedList
					collection={collection}
					id={'my-list'}
					rowHeight={135}
					type={listTypes.LARGE}
				>
					<VirtualizedList.Content
						label="Id"
						dataKey="id"
					/>
					<VirtualizedList.Content
						label="Name"
						dataKey="name"
						columnData={titleProps}
						{...CellTitle}
					/>
					<VirtualizedList.Content
						label=""
						dataKey="actions"
						{...CellActions}
					/>
					<VirtualizedList.Content
						label="Description"
						dataKey="description"
					/>
					<VirtualizedList.Content
						label="Author"
						dataKey="author"
					/>
					<VirtualizedList.Content
						label="Created"
						dataKey="created"
					/>
					<VirtualizedList.Content
						label="Modified"
						dataKey="modified"
					/>
				</VirtualizedList>
			</section>
		</div>
	))
	.add('List > Large : selection', () => (
		<div>
			<h1>Virtualized List</h1>
			<p>
				Selection can be enabled by passing <b>selectionToggle</b> callback
				and <b>isSelected</b> function that returns if a row is selected.<br/>
				Here <pre>{'isSelected={item => item.id === 6}'}</pre>
			</p>
			<IconsProvider defaultIcons={icons} />
			<section style={{ height: '50vh'}}>
				<VirtualizedList
					collection={collection}
					id={'my-list'}
					isSelected={item => item.id === 6}
					selectionToggle={action('selectionToggle')}
					rowHeight={135}
					type={listTypes.LARGE}
				>
					<VirtualizedList.Content
						label="Id"
						dataKey="id"
					/>
					<VirtualizedList.Content
						label="Name"
						dataKey="name"
						columnData={titleProps}
						{...CellTitle}
					/>
					<VirtualizedList.Content
						label=""
						dataKey="actions"
						{...CellActions}
					/>
					<VirtualizedList.Content
						label="Description"
						dataKey="description"
					/>
					<VirtualizedList.Content
						label="Author"
						dataKey="author"
					/>
					<VirtualizedList.Content
						label="Created"
						dataKey="created"
					/>
					<VirtualizedList.Content
						label="Modified"
						dataKey="modified"
					/>
				</VirtualizedList>
			</section>
		</div>
	));
