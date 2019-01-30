import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';

import collection from './collection';
import { IconsProvider } from '../../src/index';
import List from '../../src/JSOList';
import CellTitle from '../../src/VirtualizedList/CellTitle';
import CellBadge from '../../src/VirtualizedList/CellBadge';

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
storiesOf('JSOList', module).add('Table', () => (
	<div className="virtualized-list">
		<IconsProvider defaultIcons={icons} />
		<section style={{ height: '50vh' }}>
			<List.Container
				id="my-list"
				onDisplayModeChange={action('onDisplayModeChange')}
				onSortChange={action('onSortChange')}
			>
				<List.Toolbar>
					<List.DisplayMode id="my-list-displayMode" />
					<List.SortBy
						id="my-list-sortBy"
						options={[
							{ id: 'id', name: 'Id' },
							{ id: 'name', name: 'Name' },
							{ id: 'author', name: 'Author' },
							{ id: 'created', name: 'Created' },
							{ id: 'modified', name: 'Modified' },
						]}
					/>
				</List.Toolbar>

				<List.VList id="my-list" collection={collection}>
					<List.VList.Content label="Id" dataKey="id" width={-1} />
					<List.VList.Content
						label="Name"
						dataKey="name"
						columnData={titleProps}
						width={-1}
						{...CellTitle}
					/>
					<List.VList.Content
						label="Tag"
						dataKey="tag"
						columnData={{ selected: true }}
						width={-1}
						disableSort
						{...CellBadge}
					/>
					<List.VList.Content label="Description" dataKey="description" width={-1} disableSort />
					<List.VList.Content label="Author" dataKey="author" width={-1} />
					<List.VList.Content label="Created" dataKey="created" width={-1} />
					<List.VList.Content label="Modified" dataKey="modified" width={-1} />
				</List.VList>
			</List.Container>
		</section>
	</div>
));
