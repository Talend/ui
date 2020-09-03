# The ItemsNumber component

This component allows you to show the total number of items in a list

| prop | type | description |
|------|------|---------|
| id   | string | id |
| selected | number | Number of selected elements in the list |
| totalItems | number | Total number of elements in the list |
| label | string | X apples |
| labelSelected | string | Y/X apples |

If `label` is not provided, the default label **X items** will be used.

If `labelSelected` is not provided, the default label **Y/X items** will be used.

Plural is managed by the default label. For customized label, plural must be managed/translated in the app.