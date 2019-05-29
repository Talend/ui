# The List component

This component displays a list with two optional toolbars

## Props

| name           | description                                         |
| -------------- | --------------------------------------------------- |
| getComponent   |  support for the [Inject API](../Inject/Inject.md)  |
| components     | same. Look below for the possible values            |
| toolbar        |  ListToolBar component props                        |
| list           |   spread to the real List                           |
| id             | html id                                             |
| displayMode    | oneOf 'large', 'table'                              |
|  defaultHeight |                                                     |
| rowHeight      |                                                     |

**ListToolBar Props**

| name              | description                                                                     |
| ----------------- | ------------------------------------------------------------------------------- |
| id                | html id                                                                         |
| actionBar         | spread to the ActionBar component                                               |
| selectAllCheckbox |                                                                                 |
| display           | { onChange } to control the change on display mode                              |
| sort              | `{ field: 'name', onChange: action(), options: [{ id: 'id', name: 'id'}]`       |
| pagination        | `{itemsPerPage: 5, totalResults: 10, onChange: action('pagination.onChange') }` |
| filter            | FilterBar props                                                                 |

**List Props**

| name             | description                                                                   |
| ---------------- | ----------------------------------------------------------------------------- |
| columns          | Array of {key, label, type, order, hidden} define which columns to display    |
| items            | Array of object to display                                                    |
| titleProps       | object to control the title cell                                              |
| itemProps        |                                                                               |
| cellDictionary   | object with key = renderer name to use in columns props/ value = the renderer |
| headerDictionary | object with key = renderer name to use in list's columns props                |

## Customization

`components` props support the following slots:

* before-component
* before-toolbar
* `.toolbar`
  * before-actionbar
  * after-actionbar
  * before-display
  * after-display
  * before-sort
  * after-sort
  * before-pagination
  * after-pagination
  * before-filter
  * after-filter
* after-toolbar
* before-list-wrapper
* before-list
* after-list
* after-list-wrapper
