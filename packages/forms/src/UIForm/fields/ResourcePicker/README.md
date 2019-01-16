# ResourcePicker

This widget allows you to render a resource picker to select one or multiple resources.

**Json Schema**

| Property | Description |
|---|---|
| type | `string` |


```json
{
    "type": "object",
    "title": "ResourcePicker",
    "properties": {
        "asyncResourcePicker": {
            "type": "string"
        }
    }
}
```

**UI Schema**

| Property | Description | Default |
|---|---|---|
| options.multi | Allow multiselection | `false` |
| title | The title to display next to the field |  |
| widget | The widget to use | `resourcePicker` |

```json
[
    {
      "key": "asyncResourcePicker",
      "title": "ResourcePicker multi selection",
      "widget": "resourcePicker",
      "options": {
        "multi": true
      }
    },
  ]
```

**Result**

![ResourcePicker](screenshot.png)
