# Composable List

@nmaligne started a poc on List to change its pattern and get rid of the apropcalypse.
Moreover dataset module will need to add more things in it for faceted search and column chooser.

I continued his PoC. Can you look at http://2026.talend.surge.sh/components/?selectedKind=JSOList&selectedStory=Default
Any feedback is welcome.

## The Problem

With current List, we have a static layout. It is practical to control what is inside, but it comes with a bunch of drawbacks
* with new needs, adding a div inside can be complicated
* with different needs, having different layouts is impossible
* we pass all the props for all the subcomponents making the apropscalypse we have today

The result is a component that is really complicated to use and maintain, and not flexible at all.

*Example*: how would you add a filter bar that display current filters between the toolbar and the VirtualizedList ?
I guess you would create a div, insert it if we have a flag prop, or configuration props, and the filters to display will be added to the current apropcalypse, making the api even more heavier.

## Principle

Let's try to make it flexible. What do we need ?
* a component where we can compose subcomponents
* possibility to adapt the layout for different need
* all subcomponents must work with the List, and have synchronized data with other related subcomponents. For example, the sort order is synchronized between the VirtualizedList and Sort toolbar element.
* simplify the components api

Nicolas Maligne started a PoC to turn the List into Compound components.

### Example

Before
```javascript
<List
    id="talend"
	displayMode="table"
	list={{
		columns: [
			{ key: 'id', label: 'Id' },
			{ key: 'name', label: 'Name' },
			{ key: 'author', label: 'Author' },
			{ key: 'created', label: 'Created' },
			{ key: 'modified', label: 'Modified' },
		],
		items: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
		titleProps: {
			key: 'name',
			iconKey: 'icon',
			displayModeKey: 'display',
			onClick: action('onTitleClick'),
			onEditCancel: action('onEditCancel'),
			onEditSubmit: action('onEditSubmit'),
		},
		itemProps: {
			classNameKey: 'className',
		},
	}}
	toolbar={{
		actionBar: {
			actions: {
				left: [
					{ id: 'add', label: 'Add Folder' },
					{ id: 'remove', label: 'Remove Folder' },
				],
			},
		},
		display: {
			onChange: this.onDisplayChange,
		},
		sort: {
			field: 'name',
			onChange: action('sort.onChange'),
			options: [{ id: 'id', name: 'Id' }, { id: 'name', name: 'Name' }],
		}
	}}
/>
```

After
```javascript
<List.Container
    id="my-list"
    collection={ [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]}

    displayMode="table"
    onDisplayModeChange={this.onDisplayChange}

    withSort
    sortBy="name"
    sortDescending={false}
    onSortChange={({ sortBy, sortDescending }) => performSort(sortBy, sortDescending)}
>
    <List.Toolbar>
        <ActionBar left={[
            { id: 'add', label: 'Add Folder' },
            { id: 'remove', label: 'Remove Folder' },
        ]} />
        <List.DisplayMode id="my-list-displayMode" />
        <List.SortBy id="my-list-sortBy" options={[{ id: 'id', name: 'Id' }, { id: 'name', name: 'Name' }]} />
    </List.Toolbar>
    <List.VList>
        <List.VList.Content label="Id" dataKey="id" />
        <List.VList.Content
            label="Name"
            dataKey="name"
            {...CellTitle}
            columnData={{
                iconKey: 'icon',
                displayModeKey: 'display',
                onClick: action('onTitleClick'),
                onEditCancel: action('onEditCancel'),
                onEditSubmit: action('onEditSubmit'),
            }}
        />
        <List.VList.Content label="Author" dataKey="author" />
        <List.VList.Content label="Created" dataKey="created" />
        <List.VList.Content label="Modified" dataKey="modified" />
    </List.VList>
</List.Container>
```

The example above is a List
* that display the collection props
* with controlled display mode
* with controlled sort
* with 2 actions on the left: add and remove

Even easier if you don't want to control all the subfeatures (display mode, sort, ...), just remove the values and callbacks.

```javascript
<List.Container
    id="my-list"
    collection={ [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]}
>
    <List.Toolbar>
        <ActionBar left={[
            { id: 'add', label: 'Add Folder' },
            { id: 'remove', label: 'Remove Folder' },
        ]} />
        <List.DisplayMode id="my-list-displayMode" />
        <List.SortBy id="my-list-sortBy" options={[{ id: 'id', name: 'Id' }, { id: 'name', name: 'Name' }]} />
    </List.Toolbar>
    <List.VList>
        <List.VList.Content label="Id" dataKey="id" />
         <List.VList.Content
            label="Name"
            dataKey="name"
            {...CellTitle}
            columnData={{
                iconKey: 'icon',
                displayModeKey: 'display',
                onClick: action('onTitleClick'),
                onEditCancel: action('onEditCancel'),
                onEditSubmit: action('onEditSubmit'),
            }}
        />
        <List.VList.Content label="Author" dataKey="author" />
        <List.VList.Content label="Created" dataKey="created" />
        <List.VList.Content label="Modified" dataKey="modified" />
    </List.VList>
</List.Container>
```

### Pros

What are the advantages ?

* With compound components you will write more code but easier to read and reason about code.
* The set of props each part need is waaaaay lighter than the big List one's
* It is flexible, you can apply the layout you want and insert anything you want

#### Example 1: add pagination
We want to add pagination, what do you do to write it ?

**Non-compound**
* read doc/code of List to spot where to insert the props
* you see that the toolbar instantiate it passing the props the List pass to the toolbar, having a pagination property
* now what to pass in pagination prop ? You look at the pagination doc/code to see its api
* finally to add the props to the List props, flooded in the apropcalypse

```javascript
const props = {
    toolbar: {
        pagination: {
            itemsPerPage: 5,
            totalResults: 10,
            onChange: action('pagination.onChange'),
        },
    }
}
```

**Compound**
* You look at your jsx, you want to add it in the toolbar, you add the subcomponent, looking at its api
* To control it, you look at the list manager api

```javascript
<List.Container onPaginationChange={action('pagination.onChange')}>
    <List.Toolbar>
        <List.Paginaltion
            id="my-list-pagination"
            itemsPerPage={5}
            totalResults={10}
        />
    </List.Toolbar>
</List.Container>
```

Even easier in uncontrolled mode
```javascript
<List.Container>
    <List.Toolbar>
        <List.Paginaltion id="my-list-pagination" />
    </List.Toolbar>
</List.Container>
```

#### Example 2: put the toolbar at the bottom

```javasript
// before

<List.Container>
    <List.Toolbar />
    <List.VList />
</List.Container>

// after: simple enough

<List.Container>
    <List.VList />
    <List.Toolbar />
</List.Container>
```

#### Example 3: add a filter div between toolbar and VList

**Non-compound**
* Develop the FilterBar
* List: instantiate the FilterBar depending on the List props + callback management
* App: add more props in the List props

**Compound**
* Develop the FilterBar
* List: callback management
* App: instantiate the the FilterBar wherever you want

```javascript
<List.Container
    filters={[]}
    onFilterChange={}
>
    <List.VList />
    <List.FilterBar id=""/>
    <List.Toolbar />
</List.Container>
```

## How to use

### Default

By default, List is only a ... list :)
It is not really useful to use it as is, instead use `VirtualizedList`.

But in order to explain the VList part for the following cases, here's an example.

```javascript
import CellTitle from '../../src/VirtualizedList/CellTitle';

function MySimpleList() {
    const simpleCollection = [
        { id: 1, name: 'My first item', description: 'First element', author: 'me', created: 15464354400 }
    ];

    return (
        <List.Container id="my-list" collection={simpleCollection}>
        	<List.VList id="my-vlist">
        		<List.VList.Content label="Id" dataKey="id" width={-1} />
                <List.VList.Content label="Name" dataKey="name" columnData={titleProps} width={-1} {...CellTitle} />
                <List.VList.Content label="Description" dataKey="description" width={-1} />
                <List.VList.Content label="Author" dataKey="author" width={-1} />
                <List.VList.Content label="Created" dataKey="created" width={-1} />
        	</List.VList>
        </List.Container>
    );
}
```
