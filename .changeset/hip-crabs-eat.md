---
'@talend/react-datagrid': major
---

- Remove cmf module
- Immutable data support is no longer tested & documented

Migration: renderer are no longer provided through CMF registry using their id, they have to be provided as props;
```
BEFORE
<Datagrid headerRenderer="myComponentIdInRegistry" />
AFTER
<Datagrid headerRenderer={MyComponent} />
```
