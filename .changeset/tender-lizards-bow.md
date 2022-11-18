---
'@talend/react-datagrid': major
---

**Breaking change**
Update `getColumnDefs` function from `datasetSerializer` : attribute `headerName` in returned object is now valued by display name (prop named `talend.component.label` in avro schema) in prior to technical name (prop named `name`).

So priority to value attribute `headerName` is now :

1. `doc`
2. `talend.component.label`
3. `name`

To allow each project to customize headerName, props `doc`, `talend.component.label` and `name` are now returned in object returned by function `getColumnDefs`.
