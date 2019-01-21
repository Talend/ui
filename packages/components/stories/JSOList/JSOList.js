import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';

import collection from './collection';
import { IconsProvider } from '../../src/index';
import JSOList from '../../src/JSOList';
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
			<JSOList.Container>
				<JSOList.Toolbar
					handleInputFilter={action('input filter')}
					handleToggleFilter={action('toggle filter')}
				>
					<JSOList.Toolbar.DisplayMode />
				</JSOList.Toolbar>
				<JSOList.VirtualizedList collection={collection} id={'my-list'}>
					<JSOList.VirtualizedList.Content label="Id" dataKey="id" width={-1} />
					<JSOList.VirtualizedList.Content
						label="Name"
						dataKey="name"
						columnData={titleProps}
						width={-1}
						{...CellTitle}
					/>
					<JSOList.VirtualizedList.Content
						label="Tag"
						dataKey="tag"
						columnData={{ selected: true }}
						width={-1}
						{...CellBadge}
					/>
					<JSOList.VirtualizedList.Content
						label="Description (non sortable)"
						dataKey="description"
						width={-1}
					/>
					<JSOList.VirtualizedList.Content label="Author" dataKey="author" width={-1} />
					<JSOList.VirtualizedList.Content label="Created" dataKey="created" width={-1} />
					<JSOList.VirtualizedList.Content label="Modified" dataKey="modified" width={-1} />
				</JSOList.VirtualizedList>
			</JSOList.Container>
		</section>
	</div>
));
