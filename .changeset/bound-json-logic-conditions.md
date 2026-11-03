---
'@talend/react-forms': patch
---

fix(SSO-2658): bound json-logic map reduce merge in UI-schema conditions

UI-schema conditions that are too big, too deep, nest more than 2 iteration operators (map, filter, reduce, all, none, some) or grow a reduce accumulator (merge, cat, arrays of non-literal values in the reduce logic) are now rejected (the item is not rendered) instead of being evaluated with an unbounded cost.
