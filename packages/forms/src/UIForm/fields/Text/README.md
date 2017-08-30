# Text

This widget allows you to render a text/number input.

**Json Schema**

| Property | Description |
|---|---|
| type | `string` or `number` |

```json
{
  "type": "object",
  "title": "Comment",
  "properties": {
    "lastname": {
      "type": "string"
    }
  }
}
```

**UI Schema**

| Property | Description | Default |
|---|---|---|
| widget | `text` &#124; `password` &#124; `number` | `text` (for strings), `number` (for number) |
| title | The title to display above field |  |
| autoFocus | Focus on input on render | `false` |
| disabled | Disable the input | `false` |
| placeholder | Text to display as placeholder |  |
| readOnly | Set the input as non modifiable | `false` |

```json
[
  {
    "key": "lastname",
    "widget": "text",
    "title": "Last name",
    "autoFocus": false,
    "disabled": false,
    "placeholder": "Type here...",
    "readOnly": false
  }
]
```

**Result**

![Text](screenshot.gif)
![Text with error](screenshot-with-error.png)
