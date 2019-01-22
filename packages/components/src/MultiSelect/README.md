# SelectMultiple component

Features:

* support thousands of items
* pass your own component to render item
* search
* select all
* create new item
* default focus as any form widget

Incoming features / TODO:

* a11y with keyboard gestures
* default render support icon and description
* tests
* categories

Props table

| name | type | default value | description |
| -- | -- | -- | -- |
| titleMap | object | undefined | **requried** This object all the list of values |
| name | string | | The name of the field input search |
| placeholder | string | | Displayed in the input search |
| itemHeight | number | 40 | fix the height of each item. |
| selected | [string] | [] | This old the list of selected values so you can control it |
| itemOptionRender | func | MultiSelect.Item | render each item in the dropdown |
| itemViewRender | func | MultiSelect.ItemView | render each selected item under the search input |
| withCreateNew | bool | false | Activate the possibility to create new entry. The new entry will have value === name in the titleMap |

