---
'@talend/react-datagrid': major
---

- Support multi column selection.
- The main components were migrated to typescript
- Better separation of concern between data mapping & grid rendering
  - To render a dataset sample, use `DatasetSerializer.getColumnDefs`
  - To render data from another source, build your own `columnDefs`
- Replaced enzyme by RTL

Lots of breaking changes on this one, to have a cleaner API and a faster grid.

__API changes:__
1. [Props] `columnSelection`: defaults to single
2. [Props] `onColumnSelectionChanged`: triggered when selected column(s) changed
3. [Props] `selection.columnIds`: controlled column selection

__API breaking changes:__
1. [Props] `avroRenderer` and `onVerticalScroll` removed (not used)
2. [Props] `data` and `getRowDataFn` removed: use `rowData` instead (less parsing + cleaner API)
3. [Props] `cellRenderer`, `headerRenderer`, `pinHeaderRenderer` removed: set `columnDef.cellRenderer` and `columnDef.headerComponent` instead
4. [Props] `getPinnedColumnDefsFn`, `getColumnDefsFn`, `getValueByCellFn` removed: use `columnDefs` instead
5. [Export] `DatasetSerializer.parseRow` removed, mapping data is expensive, use `columnDef.valueGetter` instead
6. [Export] `DatasetSerializer` is no longer export as `Datagrid.components.DatasetSerializer`, use `import { DatasetSerializer } from '@talend/react-datagrid'`

__Deprecations:__
1. Replace default cmfModule import (`Datagrid.components.MyComponent`) by named imports
