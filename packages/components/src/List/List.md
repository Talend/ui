# The List component

This component display a list with two optional toolbars


## Props

| name | description |
|----|----|
| getComponent | support for the [Inject API](../Inject/Inject.md) |
| components | same. Look below for the possible values |
| toolbar | ListToolBar component props |
| list |  spread to the real List |
| id | html id |
| displayMode | oneOf 'large', 'table'|
| defaultHeight | |
| rowHeight | |

**ListToolBar Props**

| name | description |
|----|----|
| id | html id |
| actionBar | spread to the ActionBar component |
| selectAllCheckbox | |
| display | |
| sort | |
| pagination | |
| filter | |

**List Props**

| name | description |
|----|----|


## Customization

`components` props support the following slots:

* before-toolbar
* after-toolbar
* before-list
* after-list
* after_list-wrap

To access slot of the toolbar and inside the list use `components.toolbar` and `components.list`

