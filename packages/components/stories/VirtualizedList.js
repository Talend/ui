import React from 'react';
import { storiesOf, action } from '@kadira/storybook';  // eslint-disable-line import/no-extraneous-dependencies
import talendIcons from 'talend-icons/dist/react';

import { IconsProvider } from '../src/index';
import VirtualizedList from '../src/VirtualizedList';
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
	iconKey: 'icon',
	actionsKey: 'titleActions',
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
];

storiesOf('Virtualized List', module)
	.add('Table (default)', () => (
		<div style={{ height: '60vh' }}>
			<h1>Virtualized List</h1>
			<IconsProvider defaultIcons={icons} />
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
					width={50}
					flexShrink={0}
					flexGrow={0}
				/>
				<VirtualizedList.Content
					label="Name"
					dataKey="name"
					width={400}
					flexShrink={0}
					flexGrow={0}
					columnData={titleProps}
					{...CellTitle}
				/>
				<VirtualizedList.Content
					label=""
					dataKey="actions"
					disableSort
					width={120}
					flexShrink={0}
					flexGrow={0}
					{...CellActions}
				/>
				<VirtualizedList.Content
					label="Description (non sortable)"
					dataKey="description"
					width={120}
					disableSort
					flexShrink={0}
					flexGrow={1}
				/>
				<VirtualizedList.Content
					label="Author"
					dataKey="author"
					width={90}
					flexShrink={0}
					flexGrow={1}
				/>
				<VirtualizedList.Content
					label="Created"
					dataKey="created"
					width={90}
					flexShrink={0}
					flexGrow={0}
				/>
				<VirtualizedList.Content
					label="Modified"
					dataKey="modified"
					width={90}
					flexShrink={0}
					flexGrow={0}
				/>
			</VirtualizedList>
		</div>
	))
	.add('List > Large', () => (
		<div style={{ height: '80vh' }}>
			<h1>Virtualized List</h1>
			<IconsProvider defaultIcons={icons} />
			<VirtualizedList id={'my-list'} collection={collection} type={'LARGE'}>
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
		</div>
	));
