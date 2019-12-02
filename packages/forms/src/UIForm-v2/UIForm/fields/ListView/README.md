# ListView

This widget allows you to render a ListView to select multiple items.

**Json Schema**

| Property | Description |
|---|---|
| type | `array` |
| items.type | The type of array items |
| items.enum | The array of values |


```json
{
  "type": "object",
  "title": "ListView",
  "properties": {
    "mappedListView": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [ "country1", "country2", "country3", "country4", "country5", "country6" ]
      }
    }
  }
}
```

**UI Schema**

| Property | Description | Default |
|---|---|---|
| description | A description to display below the ListView |  |
| emptyLabel | The label to display when there is no item | `This list is empty.` |
| noResultLabel | The label to display when filter result is empty | `No result found.` |
| placeholder | The search input placeholder |  |
| title | The title to display in the ListView header |  |
| titleMap | Optional. A mapping of value/label to display. If not provided `jsonSchema.items.enum` are used as value and label. |  |
| widget | The widget to use | `listView` |

```json
[
    {
      "key": "mappedListView",
      "description": "This ListView displays a mapping of the values",
      "emptyLabel": "There is no countries",
      "noResultLabel": "No country matching your filter",
      "placeholder": "Search filter",
      "title": "Mapped List View",
      "titleMap": {
        "country1": "Afghanistan",
        "country2": "Albania",
        "country3": "Algeria",
        "country4": "Andorra",
        "country5": "Angola",
        "country6": "Anguilla"
      },
      "widget": "listView"
    }
  ]
```

**Result**

![Listview](screenshot.gif)
