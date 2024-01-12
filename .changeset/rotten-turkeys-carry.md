---
'@talend/react-faceted-search': major
---

TDOPS-5724 - Restyle faceted search to remove bootstrap and use more Design System elements

# BREAKING CHANGE
- Lot of styling and classes has changed so your overrides might not work anymore
- DOM has changed too so your tests might need to be upgraded
- `tags` type for badges does not exists enymore, use `checkbox` instead as it is the same kind of component but with more possibilities
