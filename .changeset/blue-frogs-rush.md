---
'@talend/design-system': major
---

chore(TUX-1228): update CollapsiblePanel to support multiple actions

## BREAKING CHANGES:

`CollapsiblePanel` now supports multiple actions. The `action` property has been replaced by `actions` which is an array of objects with the same shape used before.

```diff
  <CollapsiblePanel
    ...
-   action={{
+   actions={[
      {
        icon: 'plus',
        tooltip: 'action tooltip',
        callback: () => window.alert('action callback'),
      },
    ]}
-   }}
  >
    ...
  </CollapsiblePanel>
```
