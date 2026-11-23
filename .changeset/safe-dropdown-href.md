---
'@talend/react-components': patch
---

fix(components): ActionDropdown and ActionSplitDropdown (items and the split button href) drop an `href` that is not an http(s) or relative url, so a `javascript:` url is no longer rendered on the menu item anchor
