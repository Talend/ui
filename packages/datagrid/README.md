## Talend Datagrid

This library provide a datagrid to show some datas !

## Guidelines

[Datagrid](https://company-57688.frontify.com/document/92132#/navigation-layout/data-grid)

## Basic usage

```shell
yarn add @talend/react-datagrid
```

```javascript
import DataGrid from '@talend/react-datagrid'; //use the DataGrid Container
```

Using CMF

```javascript
import cmf from '@talend/react-cmf';
import datagridModule from '@talend/react-datagrid/lib/cmfModule';

cmf.bootstrap({
	modules: [datagridModule],
});
```

## DataGrid Component

The dataGrid component used to show datagrid on all talend projects. This library uses [Ag-Grid](http://ag-grid.com) to show the grid. It's an enhanced Ag-Grid.

Features:

- Virtualized rows/columns
- Drag & Drop columns
- Custom Cell
- Custom Avro Renderer
- Custom Header/Pin Header
- Row selection keyboard/mouse

The DataGrid componnent provides 3 default renderers provides by Inject, it can be overrided to show anything:

- defaultHeaderRenderer
- defaultPinHeaderRenderer
- defaultCellRenderer

The grid is composed like this :

| PinHeaderRenderer    | headerRenderer | headerRenderer |
| -------------------- | -------------- | -------------- |
| raw ag-grid renderer | CellRenderer   | cellRenderer   |
| raw ag-grid renderer | CellRenderer   | cellRenderer   |
| raw ag-grid renderer | CellRenderer   | cellRenderer   |
| raw ag-grid renderer | CellRenderer   | cellRenderer   |

The cellRenderer has :

- QualityIndicator
- AvroRenderer, the avro renderer handles this types with one renderer to each:
  - IntCellRenderer: Renderer for the avro type _int_
  - StringCellRenderer: Renderer for avro the type _string_

### Concept

In entry, the datagrid component waits a sample of dataset. By default, the datagrid component provides a serializer to transform the data like aggrid waiting in entry.

[The format is like this](.storybook/sample.json).

### Props

| property                     | description                                                                                                         | type     | default                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------ |
| avroRenderer                 | list of components to inject to the avro renderer                                                                   | object   |                          |
| columnsConf                  | options pass to getColumnDefsFn. _hideSubType_(boolean) : hide the subtitle in the header hide                      | object   | { hideSubType : false }  |
| cellRenderer                 | cell component to inject                                                                                            | string   | DefaultCellRenderer      |
| forceRedrawRows - deprecated | function called when the component updated to know if ag-grid have to redraw the grid . should return true or false | function | null                     |
| getComponent                 | method to provide the injected components                                                                           | function | cellRenderer             |
| getPinnedColumnDefsFn        | method to provide the definition of the pinned columns                                                              | function | dataset serializer       |
| getColumnDefsFn              | method to provide the definition of the columns                                                                     | function | dataset serializer       |
| getRowDataFn                 | method to provide the row data                                                                                      | function | dataset serializer       |
| getValueByCellFn             | method to provide the data by row/column                                                                            | function | dataset serializer       |
| headerHeight                 | height of the header                                                                                                | int      | 69                       |
| headerRenderer               | header component to inject                                                                                          | string   | DefaultHeaderRenderer    |
| onFocusedCell                | callback when one cell is focused                                                                                   | function |                          |
| onFocusedColumn              | callback when one column is focused                                                                                 | function |                          |
| onVerticalScroll             | callback when the grid scroll vertical                                                                              | function |                          |
| pinHeaderRenderer            | pinHeader component to inject                                                                                       | string   | DefaultPinHeaderRenderer |
| data                         | data to set into the datagrid                                                                                       | Array    |                          |
| rowData                      | pass the row data straight right to ag-grid                                                                         | Array    | single                   |
| rowHeight                    | height of the row                                                                                                   | int      | 39                       |
| rowSelection                 | set the type of selection (single or multiple)                                                                      | string   | single                   |

### Avro renderers

| property            | description                                 | type   | default                    |
| ------------------- | ------------------------------------------- | ------ | -------------------------- |
| booleanCellRenderer | renderer for the boolean renderer to inject | string | DefaultBooleanCellRenderer |
| dateCellRenderer    | renderer for the date renderer to inject    | string | DefaultDateCellRenderer    |
| intCellRenderer     | renderer for the int renderer to inject     | string | DefaultIntCellRenderer     |
| stringCellRenderer  | renderer for the string renderer to inject  | string | DefaultStringCellRenderer  |

## Containers DataGrid

The container DataGrid

- connect the component DataGrid with the CMF settings
- spread the data from the redux store and the CMF settings
- dispatch the event by actioncreators.

### API

| property                        | description                                        | type   | default                   |
| ------------------------------- | -------------------------------------------------- | ------ | ------------------------- |
| sourceData                      | path of the collections in CMF store to load       | string |                           |
| actionCreators                  | object of actionsCreators                          | object |                           |
| actionsCreators.onFocusedColumn | action creator triggers when one column is focused | string |                           |
| actionsCreators.onFocusedCell   | action creator triggers when one cell is focused   | string | DefaultStringCellRenderer |

## Issue solved with ag-grid

It is a list of issues encountered with ag-grid that DataGrid resolved.

### Active Column.

By default, ag-grid doesn't manage a style when the column is active. DataGrid listens some events from ag-grid to add the class _.column-focus_ on all cells and header on the current column.
The component HeaderCell is enhanced by a method onFocusedColumn to detect when the user change of the column.

Ag-Grid Events to update the active column style:

- onCellFocused: trigger when the user select a new cell.
- onViewportChanged: triggers when a new virtualized row is added, removed.
- onVirtualColumnsChanged: triggers when a new virtualized column is added, removed.
- click on the header updates the current cell to the selected column.

_Workaround Active Column_

To create this feature, we used a bad pratice by manipulating straight the DOM. But we don't have the choice if we want to highlight the column. We have to access to the wrapper element of the cell and header.
There is a [issue on ag-grid to request a feature.](https://github.com/ag-grid/ag-grid/issues/2216).

See the code in the method [removeFocusColumn and updateStyleFocusColumn](./src/components/datagrid.component.js).

### Current Row selected

Ag-grid set the current cell selected by a click. If we naviguate with the keyboard, ag-grid sent a new event onCellFocused but the cell isn't selected. AgGrid allows to change this behavior by adding a method _navigateToNextCell_ on theses options. Each times that we move to a next cell, this cell is selected. The current selected rows is hightlight by the class _.ag-row-focus_. This class can be overrided by the class _.ag-row-selected_ is many row is selected.

## Ag-Grid Configuration

### global configuration

- suppressDragLeaveHidesColumns: Set to false to avoid, by default, ag-grid deletes a column when we drag an column outside the grid.

### Columns definition

- lockPosition: Set to true on the pinned column to avoid to drag a no pinned column before the pinned columns
- lockPinned: Set to true on no pinned column to prevent when we drag a column to set it like to a pinned column

## Ag-Grid Performance

[ag-grid tips](https://www.ag-grid.com/javascript-grid-performance/)

Although that Ag-Grid recommands to avoid to use custom cell renderer to renderer the cell, we used because a cell can't have only text but many elements on this: quality indicator, comments, invisible chars, ...

This choice creates a issue when we quickly scroll, by the mouse, the scrollbar. With the scroll whell, the performance is acceptable.

For IE11, we use Graceful Degradation.
