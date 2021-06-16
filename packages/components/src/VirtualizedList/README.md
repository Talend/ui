# Instructions to contribute to the VirtualizedList

## Principles

### TD;LR

1. VirtualizedList: entry point, use RendererSelector

2. RendererSelector: List and Row renderer selection

3. List renderer: Renders a whole list, based on row renderers

4. Row renderer: Renders a collection item based on cell renderers

5. Cell renderer: Renders a collection item field

### VirtualizedList.component.js : the entry point.

It takes props on the List that it manages at List level like sort or selection.

It takes `<VirtualizedList.Content>` (which is just react-virtualize's `<Column>` under the hood) as children to configure the content to display.
Each Content can precise a cell renderer.

See its PropTypes for more infos.

```javascript
<VirtualizedList
	collection={collection}
	id={'my-list'}
	isSelected={item => item.id === 6}
	selectionToggle={action('selectionToggle')}
	sort={action('sort')}
	sortBy={'name'}
	sortDirection={'ASC'}
>
	<VirtualizedList.Content label="Id" dataKey="id" width={50} flexShrink={0} flexGrow={0} />
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
</VirtualizedList>
```

### List renderers

There are 2 kinds or rendering : Table and Grid.
`<RendererSelector>` will select the right kind and the right row renderer based on props.

**Table (ListTable.component.js)**

A classic table, based on react-virtualized's `<Table>`.

It takes automatically the `<RowTable>` as row renderer.

**Grid (ListGrid.component.js)**

A List based one react-virtualized's `<List>`.

It render a list of row, 1 row per collection item.
It takes a row renderer to delegate the item row rendering.

If we want to add a type of List, we only have to create a row renderer that `<RendererSelector>` will choose based on type in props. See next section for more info.

### Row renderers

**Table (ListTable.component.js)**

The default `<Table>` row renderer is used.

**Grid (ListGrid.component.js)**

`<RendererSelector>` component select the row renderer based on `props.type` and pass it to `<ListGrid>` component.

To add a new row renderer :

1. Create your renderer
2. Export it and its type name
3. Register it in `utils/dictionary.js`. `<RendererSelector>` row renderer selection is based on this dictionary.
4. Pass the type name to the VirtualizedList

```javascript
import VirtualizedList, { listTypes } from 'react-talend-components/lib/VirtualizedList';

<VirtualizedList
    id={'my-list'}
    collection={collection}
    type={listTypes.LARGE}
    rowHeight={135}
>
```

A `utils/gridrow.js` files contains useful function to render each field (cell).
For more information and example, see `RowLarge.component.js` which separates the Title cell from the rest of the cells, and renders them, using `gridrow.js` functions.

**Global row features**

To add more global features, we use higher order component composition.
The higher order row-renderer would take the row renderer to use anc enhance it with extra info.

See `RowSelection.component.js` for more information.

### Cell renderers

A cell renderer is responsible of rendering a single cell.

It's a regular cell in ListTable, made with divs, and a div that can be placed where you want in a ListGrid row renderer (ex: RowLarge.component.js that renders them as ul/li.

To add a new row renderer :

1. Create your renderer (a CellModel folder can be the starting point)
2. Export it as an object and its type name. The object can include

| Property     | Description                                                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| cellRenderer | The renderer                                                                                                                      |
| className    | ClassName that will be passed to the cell in ListTable renderer. It is used in CellTitle for example to style the cell container. |

3. Register it in `utils/dictionary.js`. The current `<List>` will be able to base the cells type on it.
4. Pass the renderer to the VirtualizedList.Content

```javascript
import VirtualizedList from 'react-talend-components/lib/VirtualizedList';
import CellTitle from 'react-talend-components/lib/VirtualizedList/CellTitle'; // cell renderer for title

<VirtualizedList id={'my-list'} collection={collection} type={listTypes.LARGE} rowHeight={135}>
	<VirtualizedList.Content
		label="Name"
		dataKey="name"
		width={400}
		flexShrink={0}
		flexGrow={0}
		columnData={titleProps}
		{...CellTitle}
	/>
</VirtualizedList>;
```

### Column resizable

You can now make the column resizable via the header.

```javascript
import VirtualizedList from '../src/VirtualizedList';

<VirtualizedList.Content
	label="Name"
	dataKey="name"
	width={myWidth}
	columnData={titleProps}
	headerRenderer={VirtualizedList.headerDictionary.resizable}
	resizable
/>;
```

You must give a width to every column even the one not resizable, and the amount of all the sizes must be equals to the width of your vList.
Also you need to add the resizable header to headerRenderer props.

| Props          | Type   | Description                          |
| -------------- | ------ | ------------------------------------ |
| headerRenderer | func   | HeaderResizable which allow dragging |
| resizable      | bool   | make the column resizable            |
| width          | number | initial width of the column          |

You can also customize the render of the HeaderResizable component.

```javascript
import { HeaderResizable } from '../src/VirtualizedList/HeaderResizable.component';

const CustomRenderResizableWidthRenderProps = props => (
	<HeaderResizable {...props}>
		<button>{props.label}</button>
		<SortIndicator sortDirection="DESC" />
		<span>This is a custom resizable header</span>
	</HeaderResizable>
);

------------------------------------------------------------------------------------(
	<VirtualizedList.Content
		dataKey="name"
		label="NameÎ"
		headerRenderer={CustomRenderResizableWidthRenderProps}
		resizable
		width={myWidth}
	/>
);
```

Be careful the default export of HeaderResizable is a function returning a class component.
It's the way `react-virtualized` consumes the `headerRenderer ` props.
You need to do a named export to get directly the HeaderResizable component.
