## Talend Datagrid

This library provide a datagrid to show some datas !

[![NPM][npm-icon] ][npm-url]
[![Travis CI][travis-ci-image] ][travis-ci-url]
[![Quality][quality-badge] ][quality-url]
[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]
[![peerdependencies][peerdependencies-image] ][peerdependencies-url]

[npm-icon]: https://nodei.co/npm/@talend/datagrid.png?downloads=true
[npm-url]: https://npmjs.org/package/@talend/datagrid
[travis-ci-image]: https://travis-ci.org/Talend/@talend/datagrid.svg?branch=master
[travis-ci-url]: https://travis-ci.org/Talend/@talend/datagrid

[dependencies-image]: https://david-dm.org/Talend/@talend/datagrid.png
[dependencies-url]: https://david-dm.org/Talend/@talend/datagrid
[devdependencies-image]: https://david-dm.org/Talend/@talend/datagrid/dev-status.png
[devdependencies-url]: https://david-dm.org/Talend/@talend/datagrid#info=devDependencies
[peerdependencies-image]: https://david-dm.org/Talend/@talend/datagrid/peer-status.svg
[peerdependencies-url]: https://david-dm.org/Talend/@talend/datagrid?type=peer
[quality-badge]: http://npm.packagequality.com/shield/@talend/datagrid.svg
[quality-url]: http://packagequality.com/#?package=@talend/datagrid

## DataGrid Component

The dataGrid component used to show datagrid on all talend projects. This library use Ag-Grid to show the grid. It is an decorator of Ag-Grid.

Features:

* Virtualized rows/columns
* Drag & Drop columns
* Custom Cell
* Custom Header
* Row selection keyboard/mouse

The DataGrid componnent provides 3 default renderers:
* defaultHeaderRenderer
* defaultPinHeaderRenderer
* defaultCellRenderer

The grid is composed like this :

|PinHeaderRenderer|headerRenderer|headerRenderer
| --- | --- | ---
| raw ag-grid renderer | CellRenderer | cellRenderer
| raw ag-grid renderer | CellRenderer | cellRenderer
| raw ag-grid renderer | CellRenderer | cellRenderer
| raw ag-grid renderer | CellRenderer | cellRenderer

## Issue solved with ag-grid

It is a list of issues encountered with ag-grid that DataGrid resolved.

### Column Active.

By default, ag-grid doesn't manage a style when the column is active. DataGrid listens some events from ag-grid to add the class *.column-focus* on all cells and header on the current column.
The component HeaderCell is enchanced by a method onFocusedColumn to detect

Ag-Grid Events to update the active column style:

 - onCellFocused: trigger when the user select a new cell.
 - onViewportChanged: triggers when a new virtualized row is added, removed.
 - onVirtualColumnsChanged: triggers when a new virtualized column is added, removed.
 - click on the header updates the current cell to the selected column.

### Current Row selected

 Ag-grid set the current cell selected by a click. If we naviguate with the keyboard, ag-grid sent a new event onCellFocused but the cell isn't selected. AgGrid allows to change this behavior by adding a method *navigateToNextCell* on theses options. Each times that we move to a next cell, this cell is selected. The current selected rows is hightlight by the class *.ag-row-focus*. This class can be overrided by the class *.ag-row-focus* is many row is selected.

 ## Ag-Grid Configuration

 ### global configuration

  * suppressDragLeaveHidesColumns: Set to false to avoid, by default, ag-grid deletes a column when we drag an column outside the grid, ag-grid

### columns definition

 * lockPosition: Set to true on the pinned column to avoid to drag a no pinned column before the pinned columns
 * lockPinned: Set to true on no pinned column to prevent when we drag a column to set it like to a pinned column

## Ag-Grid Performance

[ag-grid tips](https://www.ag-grid.com/javascript-grid-performance/)

Although that Ag-Grid recommands to avoid to use custom cell renderer to renderer the cell, we used because a cell can't have only text but many elements on this: quality indicator, comments, invisible chars, ...

This choice creates a issue when we quickly scroll,  by the mouse, the scrollbar. With the scroll whell, the performance is acceptable.

For IE11, we use Graceful Degradation.
