---
'@talend/react-datagrid': major
---

Rewrite header cell renderer to include all projects use cases + cleanup its API:
- Custom properties (type, column description, style...) are now provided in `colDef.headerComponentParams` field.
  - See `HeaderComponentParams`for available fields
- Quality information is simplified (see: `HeaderComponentParams`)

Please remove custom renderers from projects
