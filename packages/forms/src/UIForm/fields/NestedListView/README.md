# NestedListView

This widget allows you to render a nested ListView to select multiple items with a 2 levels hierarchy.
More than 2 levels is currently not supported.

| Property | Type | Description |
|---|---|---|
| type | `object` | 
| properties | `object` | Every property of the value object (the key used in `properties` being the value's key)
| properties[key] | `object` | 
| properties[key].type | `array` | 
| properties[key].items | `object` | 
| properties[key].items.enum | `array` | The list of available values for this key of the value
| properties[key].items.enumNames | `array` | The list of labels display for each value


```json
"food": {
  "title": "Food",
  "type": "object",
  "properties": {
    "fruits": {
      "title": "Fruits",
      "type": "array",
      "items": {
        "type": "string",
        "enum": ["orange", "pear", "passion_fruit"],
        "enumNames": ["Orange", "Pear", "Passion fruit"]
      }
    },
    "vegetables": {
      "title": "Vegetables",
      "type": "array",
      "items": {
        "type": "string",
        "enum": ["carot", "lettuce", "turnip"],
        "enumNames": ["Carot", "Lettuce", "Turnip"]
      }
    }
  }
}
```

**UI Schema**

| Property | Description | Default |
|---|---|---|
| key |  |  |
| title | The title to display in the ListView header |  |
| description | A description to display below the ListView |  |
| placeholder | The search input placeholder |  |
| widget | The widget to use | `nestedListView` |

```json
[
    {
      "key": "nestedListView",
      "title": "My NestedListView",
      "description": "NestedListView's description",
      "placeholder": "Search filter",
      "widget": "nestedListView"
    }
  ]
```

![NestedListview](screenshot.gif)
