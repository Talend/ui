import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { simpleCollection } from './collection';
import { IconsProvider } from '../../src/index';
import List from '../../src/List/ListComposition';
import CellTitle from '../../src/VirtualizedList/CellTitle';
import CellBadge from '../../src/VirtualizedList/CellBadge';

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

function CustomListInfiniteScroll(props) {
	return (
		<List.InfiniteScrollList id="my-infinite-scroll-list" {...props}>
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
		</List.InfiniteScrollList>
	);
}

storiesOf('List Composition', module)
	.add('Default', () => (
		<div className="virtualized-list">
			<IconsProvider />
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
			<IconsProvider />
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
			<IconsProvider />
			<h1>List with display mode change</h1>
			<p>
				You can control the display mode by<br />
				- passing the display mode to List.DisplayMode and List.VList<br />
				- handling the display mode change via List.DisplayMode onChange prop
			</p>
			<pre>{`
<List.Manager
 	id="my-list"
 	collection={collection}
>
	<List.Toolbar>
		<List.DisplayMode
		 	id="my-list-displayMode"
		 	selectedDisplayMode="table"
		 	onChange={(event, displayMode) => changeDisplayMode(displayMode)}
		/>
	</List.Toolbar>
	<List.VList id="my-vlist" type="TABLE">
		...
	</List.VList>
</List.Manager>
`}</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager id="my-list" collection={simpleCollection}>
					<List.Toolbar>
						<List.DisplayMode
							id="my-list-displayMode"
							onChange={action('onDisplayModeChange')}
							selectedDisplayMode="table"
						/>
					</List.Toolbar>
					<CustomList type="TABLE" />
				</List.Manager>
			</section>
		</div>
	))
	.add('Infinite scroll', () => (
		<div className="virtualized-list">
			<IconsProvider />
			<h1>List supporting infinite scroll</h1>
			<p>
				The InfiniteScrollList list component allows to create lists that supports infinite
				scroll feature.<br />
				It requires :<br />
				- <code>loadMoreRows</code> prop triggered when data loading is required<br />
				- <code>rowCount</code> prop representing the collection's total number of items<br />
				Skeleton rows are rendered when data is missing, while they are being fetched.
			</p>
			<pre>{`
<List.Manager id="my-list" collection={collection}>
	<List.InfiniteScrollList id="my-infinite-scroll-list" loadMoreRows={loadMoreRows} rowCount={totalRowCount}>
		<List.VList.Content label="Id" dataKey="id" width={-1} />
			...
	</List.InfiniteScrollList>
</List.Manager>
`}</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager id="my-list" collection={simpleCollection}>
					<CustomListInfiniteScroll
						type="TABLE"
						loadMoreRows={action('onLoadMoreRows')}
						rowCount={simpleCollection.length * 2}
					/>
				</List.Manager>
			</section>
		</div>
	));
