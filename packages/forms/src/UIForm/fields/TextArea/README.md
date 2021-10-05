# TextArea

This widget allows you to render a textarea for a string field.

**Json Schema**
```json
{
  "type": "object",
  "title": "Comment",
  "properties": {
    "comment": {
      "type": "string"
    }
  }
}
```

**UI Schema**

| Property | Description | Default |
|---|---|---|
| widget | Value : `textarea` |  |
| title | The title to display above field |  |
| hint | Configuration for tooltip with help information, that will be displayed when clicking on action icon (optional) | |
| hint.icon | icon name for action button (optional) | info-circle |
| hint.overlayComponent | component to display in tooltip content (JSX) | |
| hint.overlayPlacement | component placement relative to the action icon (optional) | right |
| autoFocus | Focus on input on render | `false` |
| disabled | Disable the input | `false` |
| placeholder | Text to display as placeholder |  |
| readOnly | Set the input as non modifiable | `false` |
| rows | Number of rows |  |

```json
[
  {
    "key": "comment",
    "widget": "textarea",
    "title": "Comment",
    "hint": {
      "icon": "my custom icon name",
      "overlayComponent": <span>My custom popover content</span>,
      "overlayPlacement": "My custom overlay placement"
    },
    "autoFocus": false,
    "disabled": false,
    "placeholder": "Type here...",
    "readOnly": false,
    "rows": 5
  }
]
```

**Result**

![Textarea](screenshot.png)
![Textarea with error](screenshot-with-error.png)
