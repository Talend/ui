# SelectMultiple component

Features:

* support thousands of items
* pass your own component to render item
* search
* select all
* create new item
* default focus as any form widget
* i18n

Incoming features / TODO:

* tests
* a11y with keyboard gestures
* default render support icon and description
* categories

Props table

| name | type | default value | description |
| -- | -- | -- | -- |
| options | object | undefined | **requried** This object all the list of values |
| name | string | | The name of the field input search |
| placeholder | string | | Displayed in the input search |
| selected | [string] | [] | This old the list of selected values so you can control it |
| itemOptionRender | func | MultiSelect.Item | render each item in the dropdown |
| itemViewRender | func | MultiSelect.ItemView | render each selected item under the search input |
| withCreateNew | bool | false | Activate the possibility to create new entry. The new entry will have value === name in the options |

