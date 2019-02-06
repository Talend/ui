import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';

import collection from './collection';
import { IconsProvider } from '../../src/index';
import List from '../../src/JSOList';
import CellTitle from '../../src/VirtualizedList/CellTitle';
import CellBadge from '../../src/VirtualizedList/CellBadge';
import PropTypes from 'prop-types';

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

storiesOf('JSOList', module)
	.add('Default', () => (
		<div className="virtualized-list">
			<IconsProvider defaultIcons={icons} />
			<h1>Default list</h1>
			<p>By default List doesn't come with any feature</p>
			<pre>{`
<List.Container id="my-list" collection={collection}>
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
</List.Container>
`}</pre>
			<section style={{ height: '50vh' }}>
				<List.Container id="my-list" collection={collection}>
					<CustomList />
				</List.Container>
			</section>
		</div>
	))
	.add('Display mode', () => (
		<div className="virtualized-list">
			<IconsProvider defaultIcons={icons} />
			<h1>List with display mode change</h1>
			<p>You can change display mode by adding the selector in toolbar</p>
			<pre>{`
<List.Container id="my-list" collection={collection}>
	<List.Toolbar>
		<List.DisplayMode id="my-list-displayMode" />
	</List.Toolbar>
	<List.VList id="my-vlist">
		...
	</List.VList>
</List.Container>
`}</pre>
			<section style={{ height: '50vh' }}>
				<List.Container id="my-list" collection={collection}>
					<List.Toolbar>
						<List.DisplayMode id="my-list-displayMode" />
					</List.Toolbar>
					<CustomList />
				</List.Container>
			</section>
		</div>
	))
	.add('Sort: uncontrolled', () => (
		<div className="virtualized-list">
			<IconsProvider defaultIcons={icons} />
			<h1>List with uncontrolled sort</h1>
			<p>
				You can enable sorting with a "props.withSort".<br />
				By default sort will be managed internally and use an alphabetic sort. But you can pass a
				custom sort function via "props.sort".
			</p>
			<pre>{`
<List.Container
	id="my-list"
	collection={collection}
	withSort
	sort={({ collection, sortBy, sortDescending }) => myCustomSort(collection, sortBy, sortDescending)} // or undefined to use default sort
>
	<List.Toolbar>
		<List.SortBy
			id="my-list-sortBy"
			options={[
				{ id: 'id', name: 'Id' },
				{ id: 'name', name: 'Name' },
				{ id: 'author', name: 'Author' },
			]}
		/>
	</List.Toolbar>
	<List.VList id="my-vlist">
		...
		<List.VList.Content label="Description" dataKey="description" disableSort />
		<List.VList.Content label="Author" dataKey="author" />
	</List.VList>
</List.Container>
`}</pre>
			<section style={{ height: '50vh' }}>
				<List.Container id="my-list" collection={collection} withSort>
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
					<CustomList />
				</List.Container>
			</section>
		</div>
	))
	.add('Sort: controlled', () => (
		<div className="virtualized-list">
			<IconsProvider defaultIcons={icons} />
			<h1>List with controlled sort</h1>
			<p>
				You can enable sorting with a "props.withSort".<br />
				To control the sort you need to pass some props<br />
				- sortBy: the data key on which you want to sort<br />
				- sortDescending: false (ascending) / true (descending)<br />
				- onSortChange: the sort change callback<br />
			</p>
			<pre>{`
<List.Container
	id="my-list"
	collection={collection}
	withSort
	sortBy="name"
	sortDescending={false}
	onSortChange={({ sortBy, sortDescending }) => performSort(sortBy, sortDescending)}
>
	<List.Toolbar>
		<List.SortBy
			id="my-list-sortBy"
			options={[
				{ id: 'id', name: 'Id' },
				{ id: 'name', name: 'Name' },
				{ id: 'author', name: 'Author' },
			]}
		/>
	</List.Toolbar>
	<List.VList id="my-vlist">
		...
		<List.VList.Content label="Description" dataKey="description" disableSort />
		<List.VList.Content label="Author" dataKey="author" />
	</List.VList>
</List.Container>
`}</pre>
			<section style={{ height: '50vh' }}>
				<List.Container
					id="my-list"
					collection={collection}
					withSort
					sortBy="name"
					sortDescending={false}
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
					<CustomList />
				</List.Container>
			</section>
		</div>
	))
	.add('Selection: uncontrolled', () => (
		<div className="virtualized-list">
			<IconsProvider defaultIcons={icons} />
			<h1>List with uncontrolled selection</h1>
			<p>
				You can enable selection with a "props.withSelection".<br />
				By default selection will be managed internally.
			</p>
			<pre>{`
<List.Container
	id="my-list"
	collection={collection}
	withSelection
>
	<List.Toolbar>
		<List.SelectAll id="my-list-select-all" />
	</List.Toolbar>
	<List.VList id="my-vlist">
		...
		<List.VList.Content label="Description" dataKey="description" disableSort />
		<List.VList.Content label="Author" dataKey="author" />
	</List.VList>
</List.Container>
`}</pre>
			<section style={{ height: '50vh' }}>
				<List.Container id="my-list" collection={collection} withSelection>
					<List.Toolbar>
						<List.SelectAll id="my-list-select-all" />
						<List.DisplayMode id="my-list-displayMode" />
					</List.Toolbar>
					<CustomList />
				</List.Container>
			</section>
		</div>
	))
	.add('Selection: controlled', () => (
		<div className="virtualized-list">
			<IconsProvider defaultIcons={icons} />
			<h1>List with controlled selection</h1>
			<p>
				You can enable selection with a "props.withSelection".<br />
				To control the sort you need to pass some props<br />
				- isSelected: function that returns if the item is selected<br />
				- onSelectAllChange: select all toggle callback<br />
				- onSelectChange: single selection toggle callback<br />
			</p>
			<pre>{`
<List.Container
	id="my-list"
	collection={collection}
	withSelection
	isSelected={item => selected.includes(item)}
	onSelectAllChange={(event) => toggleAllCallback(event)}
	onSelectChange={(event, item) => toggleSingleCallback(event, item)}
>
	<List.Toolbar>
		<List.SelectAll id="my-list-select-all" />
	</List.Toolbar>
	<List.VList id="my-vlist">
		...
		<List.VList.Content label="Description" dataKey="description" disableSort />
		<List.VList.Content label="Author" dataKey="author" />
	</List.VList>
</List.Container>
`}</pre>
			<section style={{ height: '50vh' }}>
				<List.Container
					id="my-list"
					collection={collection}
					withSelection
					isSelected={() => false}
					onSelectAllChange={action('onSelectAllChange')}
					onSelectChange={action('onSelectChange')}
				>
					<List.Toolbar>
						<List.SelectAll id="my-list-select-all" />
						<List.DisplayMode id="my-list-displayMode" />
					</List.Toolbar>
					<CustomList />
				</List.Container>
			</section>
		</div>
	))
	.add('Other', () => (
		<div className="virtualized-list">
			<IconsProvider defaultIcons={icons} />
			<p>By default List doesn't come with any feature</p>
			<section style={{ height: '50vh' }}>
				<List.Container
					id="my-list"
					onDisplayModeChange={action('onDisplayModeChange')}
					onSortChange={action('onSortChange')}
					collection={collection}
					withSelection
					withSort
				>
					<List.Toolbar>
						<List.SelectAll id="my-list-select-all" />
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
					<CustomList />
				</List.Container>
			</section>
		</div>
	));
