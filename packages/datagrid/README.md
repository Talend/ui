## Talend Datagrid

This library provide a datagrid to show some datas !

## Guidelines

[Datagrid](https://company-57688.frontify.com/document/92132#/navigation-layout/data-grid)

## Basic usage

```shell
yarn add @talend/react-datagrid
```

```javascript
import DataGrid from '@talend/react-datagrid';
```

## Component

The dataGrid component used to show datagrid on all talend projects. This library uses [Ag-Grid](http://ag-grid.com) to show the grid.
Grid is composed like this :

| colDef[0].headerComponent | colDef[1].headerComponent   | colDef[2].headerComponent |
|---------------------------|-----------------------------|---------------------------|
| raw ag-grid renderer      | colDef[1].cellRenderer      | colDef[2].cellRenderer   |
| raw ag-grid renderer      | colDef[1].cellRenderer      | colDef[2].cellRenderer    |
| raw ag-grid renderer      | colDef[1].cellRenderer      | colDef[2].cellRenderer    |
| raw ag-grid renderer      | colDef[1].cellRenderer      | colDef[2].cellRenderer    |

## Data sources

A serializer is provided to handle dataset sample format:
```
import { DatasetSerializer } from '@talend/react-datagrid`;
const columnDefs = DatasetSerializer.getColumnDefs(sample);
```

## Props

All ag-grid props can be provided (https://www.ag-grid.com/react-data-grid/grid-options/).
Here are the main ones:

| property        | description                                    | type          | default |
|-----------------|------------------------------------------------|---------------|---------|
| headerHeight    | height of the header                           | int           | 69      |
| onCellFocused   | callback when one cell is focused              | function      |         |
| rowSelection    | set the type of selection (single or multiple) | string        | single  |
| rowData         | pass the row data straight right to ag-grid    | Array         |         |
| columnsDef      | definition of the columns                      | Array<ColDef> |         |

To support new use cases, new props were added:

| property                 | description                                    | type                      | default |
|--------------------------|------------------------------------------------|---------------------------|---------|
| columnSelection          | set the type of selection (single or multiple) | string                    | single  |
| onColumnSelectionChanged | callback selected column(s) changed            | function                  |         |
| loading                  |                                                | boolean                   | false   |
| selection                | controlled selection                           | { rowIndexes, columnIds } |         |


## Issue solved with ag-grid

It is a list of issues encountered with ag-grid that DataGrid resolved.

### Active Column.

By default, ag-grid doesn't manage a style when the column is active. DataGrid listens some events from ag-grid to add the class _.column-focus_ on all cells and header on the current column.
The component HeaderCell is enhanced by a method onFocusedColumn to detect when the user change of the column.

### Current Row selected

Ag-grid set the current cell selected by a click. If we navigate with the keyboard, ag-grid sent a new event onCellFocused but the cell isn't selected. AgGrid allows to change this behavior by adding a method _navigateToNextCell_ on theses options. Each times that we move to a next cell, this cell is selected. The current selected rows is hightlight by the class _.ag-row-focus_. This class can be overrided by the class _.ag-row-selected_ is many row is selected.
