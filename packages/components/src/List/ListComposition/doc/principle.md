# Compound components

## The Problem

With current List, we have a static layout. It is practical to control what is inside, but it comes with a bunch of drawbacks
* with new needs, adding a div inside can be complicated
* with different needs, having different layouts is impossible
* we pass all the props for all the subcomponents making the apropscalypse we have today

The result is a component that is really complicated to use and maintain, and not flexible at all.

*Example*: how would you develop a filter bar that display current filters between the toolbar and the VirtualizedList ?
I guess you would create a div, insert it if we have a flag prop, or configuration props, and the filters to display will be added to the current apropcalypse, making the api even more heavier.

## Principle

Let's try to make it flexible. What do we need ?
* a component where we can compose subcomponents
* possibility to adapt the layout for different needs
* all subcomponents must work with the List, and have synchronized data with other related subcomponents. For example, the sort order is synchronized between the VirtualizedList and Sort toolbar element
* simplify the components api

Nicolas Maligne started a PoC to turn the List into Compound components.

### Simple example: Tabs

```javascript
<Tabs
    items={[{ id: 0, label: 'First link' }, { id: 1, label: 'Second link' }]}
    selectedId={0}
    onChange={callback}
/>
```

```javascript
<Tabs onChange={callback}>
    <Tab id={0} selected>First link</Tab>
    <Tab id={1}>Second link</Tab>
</Tabs>
```

### Complex example: The List

Before
```javascript
const toolbarProps = {
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
};
const listProps = {
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
};

<List
    id="talend"
	displayMode="table"
	list={listProps}
	toolbar={toolbarProps}
/>
```

After
```javascript
const list = (
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
);

<List.Manager
    id="my-list"
    collection={ [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]}
>
    <List.Toolbar>
        <ActionBar left={[
            { id: 'add', label: 'Add Folder' },
            { id: 'remove', label: 'Remove Folder' },
        ]} />
        <List.DisplayMode
            id="my-list-displayMode"
            selectedDisplayMode="table"
            onChange={this.onDisplayChange}
        />
        <List.SortBy
            id="my-list-sortBy"
            options={[{ id: 'id', name: 'Id' }, { id: 'name', name: 'Name' }]}
            sortBy="name"
            descending={false}
            onChange={action('sort.onChange')}
        />
    </List.Toolbar>
    {list}
</List.Manager>
```

The example above is a List
* that display the collection props
* with controlled display mode
* with controlled sort
* with 2 actions on the left: add and remove

Even easier if you don't want to control all the subfeatures (display mode, sort, ...), just remove the values and callbacks.

```diff
<List.Manager
    id="my-list"
    collection={ [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]}
>
    <List.Toolbar>
        <ActionBar left={[
            { id: 'add', label: 'Add Folder' },
            { id: 'remove', label: 'Remove Folder' },
        ]} />
        <List.DisplayMode
            id="my-list-displayMode"
-            selectedDisplayMode="table"
-            onChange={this.onDisplayChange}
        />
        <List.SortBy
            id="my-list-sortBy"
            options={[{ id: 'id', name: 'Id' }, { id: 'name', name: 'Name' }]}
-            sortBy="name"
-            descending={false}
-            onChange={action('sort.onChange')}
        />
    </List.Toolbar>
    {list}
</List.Manager>
```

### Pros

What are the pros ?

* With compound components you will write more code but easier to reason about code (it's jsx). For nested components, you see nested jsx instead of a complex props object
* The set of props each part need is waaaaay lighter than the big List one's
* It is flexible, you can apply the layout you want and insert anything you want

#### Example 1: add pagination
We want to add pagination, what do you do to write it ?

**Non-compound**
* read doc/code of List to spot where to insert the props. You see that the toolbar instantiates it, passing the props the List pass to the toolbar, having a pagination property
* now what to pass in pagination prop ? You look at the pagination doc/code to see its api
* finally to add the props to the List nested toolbar props

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
<List.Manager>
    <List.Toolbar>
        <List.Pagination
            id="my-list-pagination"
            itemsPerPage={5}
            totalResults={10}
            onChange={action('pagination.onChange')}
        />
    </List.Toolbar>
</List.Manager>
```

Even easier in uncontrolled mode
```javascript
<List.Manager>
    <List.Toolbar>
        <List.Pagination
            id="my-list-pagination"
-            itemsPerPage={5}
-            totalResults={10}
-            onChange={action('pagination.onChange')}
        />
    </List.Toolbar>
</List.Manager>
```

#### Example 2: put the toolbar at the bottom

```diff
// before

<List.Manager>
    <List.Toolbar />
    <List.VList />
</List.Manager>

// after: simple enough

<List.Manager>
-   <List.Toolbar />
    <List.VList />
+   <List.Toolbar />
</List.Manager>
```

#### Example 3: develop a filter div between toolbar and VList

**Non-compound**
* Develop the FilterBar
* List: instantiate the FilterBar depending on the List props + callback management
* App: add more props in the List props

**Compound**
* Develop the FilterBar
* App: instantiate the the FilterBar wherever you want

```javascript
<List.Manager
>
    <List.VList />
+   <List.FilterBar
+       id=""
+       filters={[]}
+       onFilterChange={}
+   />
    <List.Toolbar />
</List.Manager>
```

## How to use

### Default

[Demo](http://2026.talend.surge.sh/components/?selectedKind=JSOList&selectedStory=Default&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)

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
        <List.Manager id="my-list" collection={simpleCollection}>
            <List.VList id="my-vlist">
                <List.VList.Content label="Id" dataKey="id" width={-1} />
                <List.VList.Content label="Name" dataKey="name" columnData={titleProps} width={-1} {...CellTitle} />
                <List.VList.Content label="Description" dataKey="description" width={-1} />
                <List.VList.Content label="Author" dataKey="author" width={-1} />
                <List.VList.Content label="Created" dataKey="created" width={-1} />
        	</List.VList>
        </List.Manager>
    );
}
```

### Display mode

[Demo](http://2026.talend.surge.sh/components/?selectedKind=JSOList&selectedStory=Display%20mode%3A%20uncontrolled&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)

Add a toolbar and the display mode component

```diff
import CellTitle from '../../src/VirtualizedList/CellTitle';

function MySimpleList() {
    const simpleCollection = [
        { id: 1, name: 'My first item', description: 'First element', author: 'me', created: 15464354400 }
    ];

    return (
        <List.Manager id="my-list" collection={simpleCollection}>
+            <List.Toolbar>
+                <List.DisplayMode id="my-list-displayMode" />
+            </List.Toolbar>
            <List.VList id="my-vlist">
                <List.VList.Content label="Id" dataKey="id" width={-1} />
                <List.VList.Content label="Name" dataKey="name" columnData={titleProps} width={-1} {...CellTitle} />
                <List.VList.Content label="Description" dataKey="description" width={-1} />
                <List.VList.Content label="Author" dataKey="author" width={-1} />
                <List.VList.Content label="Created" dataKey="created" width={-1} />
        	</List.VList>
        </List.Manager>
    );
}
```

You want to control it ?

[Demo](http://2026.talend.surge.sh/components/?selectedKind=JSOList&selectedStory=Display%20mode%3A%20controlled&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)

```diff
import CellTitle from '../../src/VirtualizedList/CellTitle';

function MySimpleList() {
    const simpleCollection = [
        { id: 1, name: 'My first item', description: 'First element', author: 'me', created: 15464354400 }
    ];

    return (
        <List.Manager
            id="my-list"
            collection={simpleCollection}
        >
            <List.Toolbar>
                <List.DisplayMode
                    id="my-list-displayMode"
+                   selectedDisplayMode="table"
+                   onChange={() => {}}
                />
            </List.Toolbar>
-            <List.VList id="my-vlist">
+            <List.VList id="my-vlist" type="TABLE>
                <List.VList.Content label="Id" dataKey="id" width={-1} />
                <List.VList.Content label="Name" dataKey="name" columnData={titleProps} width={-1} {...CellTitle} />
                <List.VList.Content label="Description" dataKey="description" width={-1} />
                <List.VList.Content label="Author" dataKey="author" width={-1} />
                <List.VList.Content label="Created" dataKey="created" width={-1} />
        	</List.VList>
        </List.Manager>
    );
}
```

