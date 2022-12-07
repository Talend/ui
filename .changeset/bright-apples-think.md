---
'@talend/react-components': minor
---

fix(TDP-11600): allow the datalist to create new value with a better ux

On the datalist, new props called 
- `allowAddNewElements` can be passed to let the user create new value with a hint to tell him that the value was not existing in the current titlemap.
- `allowAddNewElementsSuffix` allow to override the "(new)" suffix by another one.