import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import List from '.';
import ActionBar from '../ActionBar';
import { simpleCollection } from './ListComposition/collection';

const titleProps = (rowData: any) => ({
	onClick: () => console.log('onTitleClick'),
	'data-feature': `list.item.title.${rowData.id}`,
	actionsKey: 'titleActions',
	persistentActionsKey: 'persistentActions',
	displayModeKey: 'display',
	iconKey: 'icon',
	onEditCancel: () => console.log('cancel-edit'),
	onEditSubmit: () => console.log('submit-edit'),
	iconTooltip: 'TDP',
});

function CustomList(props: any) {
	return (
		<List.VList id="my-vlist" {...props}>
			<List.VList.Text label="Id" dataKey="id" />
			<List.VList.Title label="Name" dataKey="name" columnData={titleProps} />
			<List.VList.IconText label="IconText" dataKey="iconAndText" />
			<List.VList.IconText
				label="IconText"
				columnData={{
					getIcon: () => 'talend-tdp-colored',
					getIconTooltip: ({ iconAndTextWithGetter }: any) =>
						`${iconAndTextWithGetter}--icon tooltip`,
				}}
				dataKey="iconAndTextWithGetter"
			/>
			<List.VList.Boolean label="Valid" dataKey="isValid1" />
			<List.VList.Boolean
				label="ValidWithIcon"
				dataKey="isValid2"
				columnData={{ displayMode: List.VList.Boolean.displayMode.ICON }}
			/>
			<List.VList.QualityBar label="Quality" dataKey="quality" />
			<List.VList.Label label="TagLabel" dataKey="tagLabel" />
			<List.VList.Badge label="Tag" dataKey="tag" columnData={{ selected: true }} disableSort />
			<List.VList.Text label="Description" dataKey="description" disableSort />
			<List.VList.Text label="Author" dataKey="author" />
			<List.VList.Datetime label="Created" dataKey="created" columnData={{ mode: 'ago' }} />
			<List.VList.Datetime label="Modified" dataKey="modified" columnData={{ mode: 'format' }} />
		</List.VList>
	);
}

type Story = StoryObj<typeof List>;

const meta: Meta<typeof List> = {
	title: 'Components/List/List Composition',
	component: List,
	tags: ['autodocs'],
	parameters: {
		chromatic: {
			disableSnapshot: true,
		},
	},
};

export default meta;

export const Default: Story = {
	render: () => (
		<div className="virtualized-list">
			<h1>Default list</h1>
			<p>By default List doesn't come with any feature</p>
			<pre>
				{`
<List.Manager id="my-list" collection={simpleCollection}>
    <List.VList id="my-vlist">
        <List.VList.Text label="Id" dataKey="id" />
        <List.VList.Title label="Name" dataKey="name" columnData={titleProps} />
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
	),
};

export const DisplayModeUncontrolled: Story = {
	render: () => (
		<div className="virtualized-list">
			<h1>List with display mode change</h1>
			<p>You can change display mode by adding the selector in toolbar</p>
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
	),
};

export const DisplayModeControlled: Story = {
	render: () => (
		<div className="virtualized-list">
			<h1>List with display mode change</h1>
			<p>You can control the display mode by passing the display mode to List.DisplayMode</p>
			<section style={{ height: '50vh' }}>
				<List.Manager id="my-list" collection={simpleCollection}>
					<List.Toolbar>
						<List.Toolbar.Right>
							<List.DisplayMode
								id="my-list-displayMode"
								onChange={() => console.log('onDisplayModeChange')}
								selectedDisplayMode="table"
							/>
						</List.Toolbar.Right>
					</List.Toolbar>
					<CustomList type="TABLE" />
				</List.Manager>
			</section>
		</div>
	),
};

export const TotalItems: Story = {
	render: () => (
		<div className="virtualized-list">
			<h1>Total items</h1>
			<p>You can show the total number of elements in the list</p>
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
	),
};

export const TextFilterUncontrolled: Story = {
	render: () => (
		<div className="virtualized-list">
			<h1>Text Filter</h1>
			<p>You can filter the dataset with the text</p>
			<section style={{ height: '50vh' }}>
				<List.Manager
					id="my-list"
					collection={simpleCollection}
					initialVisibleColumns={['id', 'name']}
				>
					<List.Toolbar>
						<List.Toolbar.Right>
							<List.TextFilter id="my-list-textFilter" applyOn={['name', 'description']} />
							<List.ColumnChooser onSubmit={() => console.log('onSubmit')} />
						</List.Toolbar.Right>
					</List.Toolbar>
					<CustomList type="TABLE" />
				</List.Manager>
			</section>
		</div>
	),
};

export const SortByUncontrolled: Story = {
	render: () => (
		<div className="virtualized-list">
			<h1>List with sorting feature</h1>
			<p>You can change the sorting criteria by adding the component in the toolbar</p>
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
	),
};

export const LazyLoading: Story = {
	render: () => (
		<div className="virtualized-list">
			<h1>List supporting Lazy Loading</h1>
			<p>
				The LazyLoadingList list component allows to create lists that supports lazy loading
				feature.
			</p>
			<section style={{ height: '30vh' }}>
				<List.Manager id="my-table-list" collection={[simpleCollection[0]]}>
					<List.LazyLoadingList
						id="my-infinite-scroll-list"
						loadMoreRows={() => console.log('onLoadMoreRows')}
						rowCount={simpleCollection.length}
						onRowsRendered={() => console.log('onRowsRendered')}
					>
						<List.VList.Text label="Id" dataKey="id" />
						<List.VList.Title label="Name" dataKey="name" columnData={titleProps} />
						<List.VList.Badge
							label="Tag"
							dataKey="tag"
							columnData={{ selected: true }}
							disableSort
						/>
					</List.LazyLoadingList>
				</List.Manager>
			</section>
		</div>
	),
};

export const SelectableItems: Story = {
	render: () => {
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
							selectionToggle={(_: any, group: any) => onToggleItem(group)}
						/>
					</List.Manager>
				</section>
			</div>
		);
	},
};

export const SelectableItemsActionBar: Story = {
	render: () => {
		const { isSelected, onToggleAll, onToggleItem } = List.hooks.useCollectionSelection(
			simpleCollection,
			[1, 2],
			'id',
		);

		return (
			<div className="virtualized-list">
				<h1>List with selectable items + an ActionBar</h1>
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
							selectionToggle={(_: any, group: any) => onToggleItem(group)}
						/>
					</List.Manager>
				</section>
			</div>
		);
	},
};

export const TableWithColumnChooser: Story = {
	render: () => (
		<div className="virtualized-list">
			<h1>List with Column chooser in header</h1>
			<section style={{ height: '50vh' }}>
				<List.Manager id="my-list" collection={simpleCollection}>
					<CustomList columnChooser />
				</List.Manager>
			</section>
		</div>
	),
};

export const TableWithColumnChooserAndInitialVisibleColumns: Story = {
	render: () => (
		<div className="virtualized-list">
			<h1>List with Column chooser and initialized visible columns</h1>
			<section style={{ height: '50vh' }}>
				<List.Manager
					id="my-list"
					collection={simpleCollection}
					initialVisibleColumns={['id', 'name', 'quality']}
				>
					<CustomList columnChooser />
				</List.Manager>
			</section>
		</div>
	),
};

export const TableWithColumnChooserAndLockedColumns: Story = {
	render: () => (
		<div className="virtualized-list">
			<h1>List with Column chooser and locked columns</h1>
			<section style={{ height: '50vh' }}>
				<List.Manager id="my-list" collection={simpleCollection}>
					<CustomList columnChooser={{ nbLockedLeftItems: 2 }} />
				</List.Manager>
			</section>
		</div>
	),
};

export const TableWithColumnChooserPersisted: Story = {
	render: () => (
		<div className="virtualized-list">
			<h1>List with Column chooser and persisted visibility</h1>
			<section style={{ height: '50vh' }}>
				<List.Manager
					id="my-list"
					collection={simpleCollection}
					columnsVisibilityStorageKey="my-list-column-visibility"
				>
					<CustomList columnChooser />
				</List.Manager>
			</section>
		</div>
	),
};
