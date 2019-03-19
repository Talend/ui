import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';

import { simpleCollection } from './collection';
import { IconsProvider } from '../../src/index';
import List from '../../src/List/ListComposition';
import CellTitle from '../../src/VirtualizedList/CellTitle';
import CellBadge from '../../src/VirtualizedList/CellBadge';

const icons = {
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

function CustomList(props) {
	return (
		<List.VList id="my-vlist" {...props}>
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
	);
}

storiesOf('List Composition', module)
	.add('Default', () => (
		<div className="virtualized-list">
			<IconsProvider defaultIcons={icons} />
			<h1>Default list</h1>
			<p>By default List doesn't come with any feature</p>
			<pre>{`
<List.Manager id="my-list" collection={simpleCollection}>
	<List.VList id="my-vlist">
		<List.VList.Content label="Id" dataKey="id" />
		<List.VList.Content
			label="Name"
			dataKey="name"
			columnData={titleProps}
			{...CellTitle}
		/>
		...
		<List.VList.Content label="Modified" dataKey="modified" />
	</List.VList>
</List.Manager>
`}</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager id="my-list" collection={simpleCollection}>
					<CustomList />
				</List.Manager>
			</section>
		</div>
	))
	.add('Display mode: uncontrolled', () => (
		<div className="virtualized-list">
			<IconsProvider defaultIcons={icons} />
			<h1>List with display mode change</h1>
			<p>You can change display mode by adding the selector in toolbar</p>
			<pre>{`
<List.Manager id="my-list" collection={collection} initialDisplayMode="table">
	<List.Toolbar>
		<List.DisplayMode id="my-list-displayMode" />
	</List.Toolbar>
	<List.VList id="my-vlist">
		...
	</List.VList>
</List.Manager>
`}</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager id="my-list" collection={simpleCollection}>
					<List.Toolbar>
						<List.DisplayMode id="my-list-displayMode" />
					</List.Toolbar>
					<CustomList />
				</List.Manager>
			</section>
		</div>
	))
	.add('Display mode: controlled', () => (
		<div className="virtualized-list">
			<IconsProvider defaultIcons={icons} />
			<h1>List with display mode change</h1>
			<p>
				You can control the display mode by<br />
				- passing the display mode to List<br />
				- handling the display mode change via onDisplayModeChange prop
			</p>
			<pre>{`
<List.Manager
 	id="my-list"
 	collection={collection}
 	displayMode="table"
 	onDisplayModeChange={changedisplayMode}
>
	<List.Toolbar>
		<List.DisplayMode id="my-list-displayMode" />
	</List.Toolbar>
	<List.VList id="my-vlist">
		...
	</List.VList>
</List.Manager>
`}</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager
					id="my-list"
					collection={simpleCollection}
					displayMode="table"
					onDisplayModeChange={action('onDisplayModeChange')}
				>
					<List.Toolbar>
						<List.DisplayMode id="my-list-displayMode" />
					</List.Toolbar>
					<CustomList />
				</List.Manager>
			</section>
		</div>
	));
