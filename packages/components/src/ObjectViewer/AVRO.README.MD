# PoC on Hierarchical view

## Guideline

1. A [generic object viewer](./Generic/README.md) has been created. It allows to put in one place common things (open/close management, highlight, node level, background on hover, icons, etc).
2. To display [schema model](./Model/README.md), there is a customized version of generic viewer.
3. To display [records](./Records/README.md), there is a customized version of generic viewer.
4. The records viewer use [Avro renderers](./AvroRenderer/README.md) that have been duplicated and modified from datagrid for this PoC. The idea is to put those renderers in @talend/components and use them in datagrid.

## Demo

You can see the [storybook](../../stories/AvroViewer.js).  

Bonus
* open/close state-based HOC
* highlight communication between model and records, where the model json path is converted into a json path regex

## TODO (general)

* i18n
* tests
* containers
