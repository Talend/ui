import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { simpleCollection } from './ListComposition/collection';
import ActionBar from '../ActionBar';
import List from '.';

const titleProps = rowData => ({
	onClick: action('onTitleClick'),
	'data-feature': `list.item.title.${rowData.id}`,
	actionsKey: 'titleActions',
	persistentActionsKey: 'persistentActions',
	displayModeKey: 'display',
	iconKey: 'icon',
	onEditCancel: action('cancel-edit'),
	onEditSubmit: action('submit-edit'),
});

function CustomList(props) {
	return (
		<List.VList id="my-vlist" {...props}>
			<List.VList.Text label="Id" dataKey="id" />
			<List.VList.Title label="Name" dataKey="name" columnData={titleProps} />
			<List.VList.IconText label="IconText" dataKey="iconAndText" />
			<List.VList.IconText
				label="IconText"
				columnData={{ getIcon: () => 'talend-tdp-colored' }}
				dataKey="iconAndTextWithGetter"
			/>
			<List.VList.Boolean label="Valid" dataKey="isValid" />
			<List.VList.Boolean
				label="ValidWithIcon"
				dataKey="isValid"
				columnData={{ displayMode: List.VList.Boolean.displayMode.ICON }}
			/>
			<List.VList.QualityBar label="Quality" dataKey="quality" />
			<List.VList.Label label="TagLabel" dataKey="tagLabel" />
			<List.VList.Badge label="Tag" dataKey="tag" columnData={{ selected: true }} disableSort />
			<List.VList.Text label="Description" dataKey="description" disableSort />
			<List.VList.Text label="Author" dataKey="author" />
			<List.VList.Datetime label="Created" dataKey="created" columnData={{ mode: 'format' }} />
			<List.VList.Datetime label="Modified" dataKey="modified" columnData={{ mode: 'format' }} />
		</List.VList>
	);
}

function CustomListResizable(props) {
	return (
		<List.VList id="my-vlist" {...props}>
			<List.VList.Text
				label="Id"
				dataKey="id"
				resizable
				width={400}
				headerRenderer={List.VList.headerDictionary.resizable}
			/>
			<List.VList.Title
				label="Name"
				dataKey="name"
				columnData={titleProps}
				resizable
				width={400}
				headerRenderer={List.VList.headerDictionary.resizable}
			/>
			<List.VList.Badge
				label="Tag"
				dataKey="tag"
				columnData={{ selected: true }}
				disableSort
				resizable
				width={400}
			/>
		</List.VList>
	);
}

function CustomListLazyLoading(props) {
	return (
		<List.LazyLoadingList id="my-infinite-scroll-list" {...props}>
			<List.VList.Text label="Id" dataKey="id" />
			<List.VList.Title label="Name" dataKey="name" columnData={titleProps} />
			<List.VList.Badge label="Tag" dataKey="tag" columnData={{ selected: true }} disableSort />
			<List.VList.Text label="Description" dataKey="description" disableSort />
			<List.VList.Text label="Author" dataKey="author" />
			<List.VList.Datetime label="Created" dataKey="created" columnData={{ mode: 'format' }} />
			<List.VList.Datetime label="Modified" dataKey="modified" columnData={{ mode: 'format' }} />
		</List.LazyLoadingList>
	);
}

storiesOf('Data/List/List Composition', module)
	.add('Default', () => (
		<div className="virtualized-list">
			<h1>Default list</h1>
			<p>By default List doesn't come with any feature</p>
			<pre>
				{`
<List.Manager id="my-list" collection={simpleCollection}>
	<List.VList id="my-vlist">
		<List.VList.Text label="Id" dataKey="id" />
		<List.VList.Title
			label="Name"
			dataKey="name"
			columnData={titleProps}
			{...CellTitle}
		/>
		...
		<List.VList.Datetime label="Modified" dataKey="modified" />
	</List.VList>
</List.Manager>
`}
			</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager id="my-list" collection={simpleCollection}>
					<CustomList />
				</List.Manager>
			</section>
		</div>
	))
	.add('Display mode: uncontrolled', () => (
		<div className="virtualized-list">
			<h1>List with display mode change</h1>
			<p>You can change display mode by adding the selector in toolbar</p>
			<pre>
				{`
<List.Manager id="my-list" collection={collection} initialDisplayMode="table">
	<List.Toolbar>
		<List.Toolbar.Right>
			<List.DisplayMode id="my-list-displayMode" />
		</List.Toolbar.Right>
	</List.Toolbar>
	<List.VList id="my-vlist">
		...
	</List.VList>
</List.Manager>
`}
			</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager id="my-list" collection={simpleCollection}>
					<List.Toolbar>
						<List.Toolbar.Right>
							<List.DisplayMode id="my-list-displayMode" />
						</List.Toolbar.Right>
					</List.Toolbar>
					<CustomList />
				</List.Manager>
			</section>
		</div>
	))
	.add('Display mode: controlled', () => (
		<div className="virtualized-list">
			<h1>List with display mode change</h1>
			<p>
				You can control the display mode by
				<br />
				- passing the display mode to List.DisplayMode and List.VList
				<br />- handling the display mode change via List.DisplayMode onChange prop
			</p>
			<pre>
				{`
<List.Manager
 	id="my-list"
 	collection={collection}
>
	<List.Toolbar>
		<List.Toolbar.Right>
			<List.DisplayMode
				id="my-list-displayMode"
				selectedDisplayMode="table"
				onChange={(event, displayMode) => changeDisplayMode(displayMode)}
			/>
		</List.Toolbar.Right>
	</List.Toolbar>
	<List.VList id="my-vlist" type="TABLE">
		...
	</List.VList>
</List.Manager>
`}
			</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager id="my-list" collection={simpleCollection}>
					<List.Toolbar>
						<List.Toolbar.Right>
							<List.DisplayMode
								id="my-list-displayMode"
								onChange={action('onDisplayModeChange')}
								selectedDisplayMode="table"
							/>
						</List.Toolbar.Right>
					</List.Toolbar>
					<CustomList type="TABLE" />
				</List.Manager>
			</section>
		</div>
	))
	.add('Total Items', () => (
		<div className="virtualized-list">
			<h1>Total items</h1>
			<p>
				You can show the total number of elements in the list by adding the ItemsNumber component
			</p>
			<pre>
				{`<List.Manager
 	id="my-list"
 	collection={collection}
>
	<List.Toolbar>
		<List.Toolbar.Right>
			<List.ItemsNumber totalItems="100" label="100 users" />
		</List.Toolbar.Right>
	</List.Toolbar>
	<List.VList id="my-vlist" type="TABLE">
		...
	</List.VList>
</List.Manager>
`}
			</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager id="my-list" collection={simpleCollection}>
					<List.Toolbar>
						<List.Toolbar.Right>
							<List.ItemsNumber
								totalItems={simpleCollection.length}
								label={`${simpleCollection.length} users`}
							/>
						</List.Toolbar.Right>
					</List.Toolbar>
					<CustomList type="TABLE" />
				</List.Manager>
			</section>
		</div>
	))
	.add('Text Filter: uncontrolled', () => (
		<div className="virtualized-list">
			<h1>Text Filter</h1>
			<p>You can filter the dataset with the text by adding the component and let it work itself</p>
			<p>
				You can manually restrict the filter scope to specific columns, by passing the dataKey, here
				it equals to <code>name</code> and <code>description</code>, but it's optional.
			</p>
			<p>
				Note that the Column Chooser will impact the results, we can filter only on what we see!
			</p>
			<pre>
				{`<List.Manager
 	id="my-list"
 	collection={collection}
>
	<List.Toolbar>
		<List.Toolbar.Right>
			<List.TextFilter id="my-list-textFilter" applyOn={['name', 'description']} />
			<List.ColumnChooser />
		</List.Toolbar.Right>
	</List.Toolbar>
	<List.VList id="my-vlist" type="TABLE">
		...
	</List.VList>
</List.Manager>
`}
			</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager
					id="my-list"
					collection={simpleCollection}
					initialVisibleColumns={['id', 'name']}
				>
					<List.Toolbar>
						<List.Toolbar.Right>
							<List.TextFilter id="my-list-textFilter" applyOn={['name', 'description']} />
							<List.ColumnChooser onSubmit={action('onSubmit')} />
						</List.Toolbar.Right>
					</List.Toolbar>
					<CustomList type="TABLE" />
				</List.Manager>
			</section>
		</div>
	))
	.add('Text Filter: controlled', () => (
		<div className="virtualized-list">
			<h1>Text Filter</h1>
			<p>
				You can control the filter feature by providing callbacks to
				<br />
				- handle the text filter value change and filter data
				<br />- handle the text filter's docked status
			</p>
			<pre>
				{`<List.Manager
 	id="my-list"
 	collection={collection}
>
	<List.Toolbar>
		<List.Toolbar.Right>
			<List.TextFilter id="my-list-textFilter" docked={false} onChange={action('onChange')} onToggle={action('onToggle')} />
		</List.Toolbar.Right>
	</List.Toolbar>
	<List.VList id="my-vlist" type="TABLE">
		...
	</List.VList>
</List.Manager>
`}
			</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager id="my-list" collection={simpleCollection}>
					<List.Toolbar>
						<List.Toolbar.Right>
							<List.TextFilter
								id="my-list-textFilter"
								docked={false}
								onChange={action('onChange')}
								onToggle={action('onToggle')}
							/>
						</List.Toolbar.Right>
					</List.Toolbar>
					<CustomList type="TABLE" />
				</List.Manager>
			</section>
		</div>
	))
	.add('Sort by: uncontrolled', () => (
		<div className="virtualized-list">
			<h1>List with sorting feature</h1>
			<p>You can change the sorting criteria by adding the component in the toolbar</p>
			<pre>
				{`
<List.Manager id="my-list" collection={simpleCollection}>
	<List.Toolbar>
		<List.Toolbar.Right>
			<List.SortBy
			id="my-list-sortBy"
			options={[{ key: 'name', label: 'Name' }, { key: 'id', label: 'Id' }]}
			initialValue={{ sortBy: 'id', isDescending: true }}
			/>
		</List.Toolbar.Right>
	</List.Toolbar>
	<List.VList id="my-vlist">
		...
	</List.VList>
</List.Manager>
`}
			</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager
					collection={simpleCollection}
					id="my-list"
					initialSortParams={{ sortBy: 'id', isDescending: true }}
				>
					<List.Toolbar>
						<List.Toolbar.Right>
							<List.SortBy
								id="my-list-sortBy"
								options={[
									{ key: 'id', label: 'Id' },
									{ key: 'name', label: 'Name' },
								]}
							/>
						</List.Toolbar.Right>
					</List.Toolbar>
					<CustomList />
				</List.Manager>
			</section>
		</div>
	))
	.add('Sort by: uncontrolled in large mode', () => (
		<div className="virtualized-list">
			<h1>List with sorting feature</h1>
			<p>You can change the sorting criteria by adding the component in the toolbar</p>
			<pre>
				{`
				<List.Manager id="my-list" collection={simpleCollection}>
					<List.Toolbar>
						<List.SortBy
						id="my-list-sortBy"
						options={[{ key: 'name', label: 'Name' }, { key: 'id', label: 'Id' }]}
						initialValue={{ sortBy: 'id', isDescending: true }}
						/>
						<List.DisplayMode id="my-list-displayMode" initialDisplayMode="large" />
					</List.Toolbar>
					<List.VList id="my-vlist">
						...
					</List.VList>
				</List.Manager>
		`}
			</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager
					collection={simpleCollection}
					id="my-list"
					initialSortParams={{ sortBy: 'id', isDescending: true }}
				>
					<List.Toolbar>
						<List.Toolbar.Right>
							<List.SortBy
								id="my-list-sortBy"
								options={[
									{ key: 'id', label: 'Id' },
									{ key: 'name', label: 'Name' },
								]}
							/>
							<List.DisplayMode id="my-list-displayMode" initialDisplayMode="large" />
						</List.Toolbar.Right>
					</List.Toolbar>
					<CustomList />
				</List.Manager>
			</section>
		</div>
	))
	.add('Sort by: controlled', () => (
		<div className="virtualized-list">
			<h1>List with sorting feature</h1>
			<p>
				You can control the sorting feature by providing both onChange and onOrderChange props
				(functions) to the SortBy component.
			</p>
			<pre>
				{`
<List.Manager id="my-list" collection={simpleCollection}>
	<List.Toolbar>
		<List.SortBy
			id="my-list-sortBy"
			options={[{ key: 'name', label: 'Name' }, { key: 'id', label: 'Id' }]}
			onChange={action('onSortChange')}
			value={{ sortBy: 'name', isDescending: false }}
		/>
	</List.Toolbar>
	<List.VList id="my-vlist">
		...
	</List.VList>
</List.Manager>
`}
			</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager id="my-list" collection={simpleCollection}>
					<List.Toolbar>
						<List.Toolbar.Right>
							<List.SortBy
								id="my-list-sortBy"
								options={[
									{ key: 'name', label: 'Name' },
									{ key: 'id', label: 'Id' },
								]}
								value={{ sortBy: 'name', isDescending: false }}
								onChange={action('onSortChange')}
							/>
						</List.Toolbar.Right>
					</List.Toolbar>
					<CustomList />
				</List.Manager>
			</section>
		</div>
	))
	.add('Sort by and resizable column: uncontrolled', () => (
		<div className="virtualized-list">
			<h1>List with sorting feature and resizing column</h1>
			<p>You can change the sorting criteria by adding the component in the toolbar</p>
			<p>
				You can add the resizing column by adding the properties resizable, a width and use the
				headerRenderer "'resizable'" (note: the last column don't need to have the headerRenderer)
			</p>
			<pre>
				{`
<List.Manager id="my-list" collection={simpleCollection}>
	<List.Toolbar>
		<List.Toolbar.Right>
			<List.SortBy
			id="my-list-sortBy"
			options={[{ key: 'name', label: 'Name' }, { key: 'id', label: 'Id' }]}
			initialValue={{ sortBy: 'id', isDescending: true }}
			/>
		</List.Toolbar.Right>
	</List.Toolbar>
	<List.VList id="my-vlist">
		<List.VList.Text
			label="Id"
			dataKey="id"
			resizable
			width={400}
			headerRenderer={List.VList.headerDictionary['resizable']}
		/>
		<List.VList.Title
			label="Name"
			dataKey="name"
			columnData={titleProps}
			resizable
			width={400}
			headerRenderer={List.VList.headerDictionary['resizable']}
		/>
		<List.VList.Badge
			label="Tag"
			dataKey="tag"
			columnData={{ selected: true }}
			disableSort
			resizable
			width={400}
		/>
	</List.VList>
</List.Manager>
`}
			</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager
					collection={simpleCollection}
					id="my-list"
					initialSortParams={{ sortBy: 'id', isDescending: true }}
				>
					<List.Toolbar>
						<List.Toolbar.Right>
							<List.SortBy
								id="my-list-sortBy"
								options={[
									{ key: 'id', label: 'Id' },
									{ key: 'name', label: 'Name' },
								]}
							/>
						</List.Toolbar.Right>
					</List.Toolbar>
					<CustomListResizable />
				</List.Manager>
			</section>
		</div>
	))
	.add('lots of actions, layout render: uncontrolled', () => (
		<div className="virtualized-list">
			<h1>List with multiple right actions</h1>
			<p>
				With multiple actions the Right component will align the actions to the right, and add a
				separator between each.
			</p>
			<pre>
				{`
							<List.Manager id="my-list" collection={simpleCollection}>
							<List.Toolbar>
								<List.Toolbar.Right>
									<List.TextFilter id="my-list-textFilter" />
									<List.SortBy
										id="my-list-sortBy"
										options={[{ key: 'name', label: 'Name' }, { key: 'id', label: 'Id' }]}
										initialValue={{ sortBy: 'id', isDescending: true }}
									/>
									<List.DisplayMode id="my-list-displayMode" />
								</List.Toolbar.Right>
							</List.Toolbar>
							<CustomList />
						</List.Manager>

`}
			</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager id="my-list" collection={simpleCollection}>
					<List.Toolbar>
						<ActionBar
							actions={{
								left: [
									{ icon: 'talend-cog', label: 'Foo', onClick: action('foo') },
									{ icon: 'talend-cog', label: 'Bar', onClick: action('bar') },
								],
							}}
						/>
						<List.Toolbar.Right>
							<List.TextFilter id="my-list-textFilter" />
							<List.SortBy
								id="my-list-sortBy"
								options={[
									{ key: 'name', label: 'Name' },
									{ key: 'id', label: 'Id' },
								]}
								initialValue={{ sortBy: 'id', isDescending: true }}
							/>
							<List.DisplayMode id="my-list-displayMode" />
						</List.Toolbar.Right>
					</List.Toolbar>
					<CustomList />
				</List.Manager>
			</section>
		</div>
	))
	.add('Lazy Loading', () => (
		<div className="virtualized-list">
			<h1>List supporting Lazy Loding</h1>
			<p>
				The LazyLoadingList list component allows to create lists that supports lazy loading
				feature.
				<br />
				It requires :<br />- <code>loadMoreRows</code> prop triggered when data loading is required
				<br />- <code>rowCount</code> prop representing the collection's total number of items
				<br />
				Skeleton rows are rendered when data is missing, while they are being fetched.
			</p>
			<pre>
				{`
<List.Manager id="my-list" collection={collection}>
	<List.LazyLoadingList id="my-infinite-scroll-list" loadMoreRows={loadMoreRows} rowCount={totalRowCount}>
		<List.VList.Text label="Id" dataKey="id" width={-1} />
			...
	</List.LazyLoadingList>
</List.Manager>
`}
			</pre>
			<h2>Table mode</h2>
			<section style={{ height: '30vh' }}>
				<List.Manager id="my-table-list" collection={[simpleCollection[0]]}>
					<CustomListLazyLoading
						type="TABLE"
						loadMoreRows={action('onLoadMoreRows')}
						rowCount={simpleCollection.length}
						onRowsRendered={action('onRowsRendered')}
					/>
				</List.Manager>
			</section>

			<h2>Large mode</h2>
			<section style={{ height: '30vh' }}>
				<List.Manager id="my-large-list" collection={[simpleCollection[0]]}>
					<CustomListLazyLoading
						type="LARGE"
						loadMoreRows={action('onLoadMoreRows')}
						rowCount={simpleCollection.length}
					/>
				</List.Manager>
			</section>

			<h2>Collapsible panel mode</h2>
			<section style={{ height: '30vh' }}>
				<List.Manager
					id="my-collapsible-panels-list"
					collection={[
						{
							id: 'status-header',
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
					]}
				>
					<CustomListLazyLoading
						type="COLLAPSIBLE_PANEL"
						loadMoreRows={action('onLoadMoreRows')}
						rowCount={50}
					/>
				</List.Manager>
			</section>
		</div>
	))
	.add('Selectable items', () => {
		const { isSelected, onToggleAll, onToggleItem } = List.hooks.useCollectionSelection(
			simpleCollection,
			[],
			'id',
		);

		return (
			<div className="virtualized-list">
				<h1>List with selectable items</h1>
				<p>The list also supports items selection, when using the proper hook.</p>

				<section style={{ height: '50vh' }}>
					<List.Manager id="my-list" collection={simpleCollection}>
						<CustomList
							isSelected={isSelected}
							onToggleAll={onToggleAll}
							selectionToggle={(_, group) => onToggleItem(group)}
						/>
					</List.Manager>
				</section>
			</div>
		);
	})
	.add('Selectable items + ActionBar', () => {
		const { isSelected, onToggleAll, onToggleItem } = List.hooks.useCollectionSelection(
			simpleCollection,
			[1, 2],
			'id',
		);

		return (
			<div className="virtualized-list">
				<h1>List with selectable items + an ActionBar</h1>
				<pre>
					{`<List.Manager
 	id="my-list"
 	collection={collection}
>
	<List.Toolbar>
		<ActionBar
			selected={2}
			multiSelectActions={{...}}
		/>
	</List.Toolbar>
	<List.VList id="my-vlist" type="TABLE">
		...
	</List.VList>
</List.Manager>
`}
				</pre>
				<section style={{ height: '50vh' }}>
					<List.Manager id="my-list" collection={simpleCollection}>
						<List.Toolbar>
							<ActionBar
								selected={2}
								multiSelectActions={{
									left: [
										{
											id: 'remove-items',
											icon: 'talend-trash',
											label: 'Delete',
										},
									],
								}}
							/>
						</List.Toolbar>
						<CustomList
							isSelected={isSelected}
							onToggleAll={onToggleAll}
							selectionToggle={(_, group) => onToggleItem(group)}
						/>
					</List.Manager>
				</section>
			</div>
		);
	})
	.add('Selectable items + total items', () => {
		const { isSelected, onToggleAll, onToggleItem } = List.hooks.useCollectionSelection(
			simpleCollection,
			[1, 2],
			'id',
		);

		return (
			<div className="virtualized-list">
				<h1>List with selectable items + total number of items</h1>
				<p>The number of selected items is available in the right toolbar</p>
				<pre>
					{`<List.Manager
 	id="my-list"
 	collection={collection}
>
	<List.Toolbar>
		<ActionBar
			selected={2}
			hideCount		<== the number of selected items must be hidden in the ActionBar
			multiSelectActions={{...}}
		/>
		<List.Toolbar.Right>
			<List.ItemsNumber totalItems="100" selected="2" label="100 users" labelSelected="2/100 users" />
		</List.Toolbar.Right>
	</List.Toolbar>
	<List.VList id="my-vlist" type="TABLE">
		...
	</List.VList>
</List.Manager>
`}
				</pre>
				<section style={{ height: '50vh' }}>
					<List.Manager id="my-list" collection={simpleCollection}>
						<List.Toolbar>
							<ActionBar
								selected={2}
								hideCount
								multiSelectActions={{
									left: [
										{
											id: 'remove-items',
											icon: 'talend-trash',
											label: 'Delete',
										},
									],
								}}
							/>
							<List.Toolbar.Right>
								<List.ItemsNumber
									totalItems={simpleCollection.length}
									selected={2}
									label={`${simpleCollection.length} users`}
									labelSelected={`2/${simpleCollection.length} users`}
								/>
							</List.Toolbar.Right>
						</List.Toolbar>
						<CustomList
							isSelected={isSelected}
							onToggleAll={onToggleAll}
							selectionToggle={(_, group) => onToggleItem(group)}
						/>
					</List.Manager>
				</section>
			</div>
		);
	});
