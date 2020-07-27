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
| hint | Configuration for tooltip with help information, that will be displayed when clicking on action icon (optional) | |
| hint.icon | icon name for action button (optional) | info-circle |
| hint.overlayComponent | component to display in tooltip content (JSX) | |
| hint.overlayPlacement | component placement relative to the action icon (optional) | right |
| widget | The widget to use | `datalist` |

```json
[
    {
      "key": "simpleDatalist",
      "restricted": false,
      "title": "Simple Datalist",
      "description": "This datalist accepts values that are not in the list of suggestions",
      "hint": {
        "icon": "my custom icon name",
        "overlayComponent": <span>My custom popover content</span>,
        "overlayPlacement": "My custom overlay placement"
      },
      "widget": "datalist"
    }
  ]
```

**Result**

![Datalist](screenshot.gif)
