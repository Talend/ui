# Datalist

This widget allows you to render a Typeahead.

**Json Schema**

| Property | Description |
|---|---|
| type | `string` |
| enum | The array of possible suggestions |


```json
{
  "type": "object",
  "title": "Datalist",
  "properties": {
    "simpleDatalist": {
      "type": "string",
      "enum": [ "Apple", "Pine[apple]", "Banana", "Cher[ry", "Lemo}n", "Grapefruit" ]
    }
  },
  "required": [
    "simpleDatalist"
  ]
}
```

**UI Schema**

| Property | Description | Default |
|---|---|---|
| autoFocus | If the input should has autoFocus | `false` |
| description | A description to display below the input |  |
| disabled | Disable the input | `false` |
| placeholder | The input placeholder |  |
| readOnly | If the input should be readonly | `false` |
| restricted | If the value is restricted to the possible suggestions | `true` |
| title | The title to display next to the field |  |
| titleMap | A mapping of value/label to display |  |
| widget | The widget to use | `datalist` |

```json
[
    {
      "key": "simpleDatalist",
      "restricted": false,
      "title": "Simple Datalist",
      "description": "This datalist accepts values that are not in the list of suggestions",
      "widget": "datalist"
    }
  ]
```

**Result**

![Datalist](screenshot.gif)
