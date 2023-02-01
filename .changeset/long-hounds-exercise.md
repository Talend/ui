---
'@talend/react-forms': major
---

Forms - Change UI Form hint to use design system popover and **fix alignement**

## Breaking changes :
UI Forms hint definition does not support some properties anymore
- **id** has been removed, you should rely on **data-test** attributes to target elements
- **className** has been removed because design system component should not be customized

``` diff
hint: {
    overlayComponent: ...,
-   id: "id",
-   className: "class",
}
```

## New additions :
UI Forms hint definition can now handle some **data-test** attributes
- **data-test** has been added to target the hint popover content
- **icon-data-test** has been added to target the hint icon

``` diff
hint: {
    overlayComponent: ...,
+   "data-test": "my-popover-content",
+   "icon-data-test": "my-popover-icon",
}
```
