---
'@talend/react-components': patch
---

fix(SSO-2658): stop List rendering arbitrary array fields as action buttons

`ListToVirtualizedList` no longer guesses the `actions` cell renderer from the runtime shape of the first item's fields. A column is rendered as actions only when it is configured with `type: 'actions'`; otherwise the configured column type (or the default renderer) is used.
