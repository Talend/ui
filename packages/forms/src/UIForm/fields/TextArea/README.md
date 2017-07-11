# Fieldset

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

| Property | Description |
|---|---|
| widget | Value : "textarea" |
| title | The title to display above field |
| items | Array of widget definitions |
| disabled | Default: false |
| placeholder | Text to display as placeholder |
| readOnly | Default: false |
| rows | Number of rows |

```json
  [
    {
      "key": "comment",
      "widget": "textarea",
      "title": "Comment",
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
