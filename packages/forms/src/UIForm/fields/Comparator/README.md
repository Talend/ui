# Comparator

This widget allows you to render a comparator pair of inputs.

**Json Schema**

| Property | Description |
|---|---|
| type | `object` |
| properties.operator | It allows to configure the `operator` list jsonSchema. |
| properties.value | It allows to configure the `value` jsonSchema. |
| required | You can pass `value` string, to make it mandatory. Note that this is only valid if the mandatory fields have a proper json schema configuration (default configurations stay not mandatory) |

Simple configuration
```json
{
    "type": "object",
    "required": ["value"],
    "properties": {
        "operator": {
            "type": "string",
            "enum": [">", "<", "="]
        },
        "value": {
            "type": "string"
        }
    }
}
```

Advanced configuration
```json
{
    "advancedKeyValue": {
        "type": "object",
        "required": ["value"],
        "properties": {
            "operator": {
                "type": "string",
                "enum": ["<=", ">="]
            },
            "value": {
                "type": "number",
                "minimum": -100,
                "maximum": 100,
                "step": 0.01
            }
        }
    }
}
```

**UI Schema**

| Property | Description | Default |
|---|---|---|
| description | A description to display below the widget |  |
| disabled | Disable the input | `false` |
| items | Configure the comparator uiSchema |  |
| title | The title to display on top of the widget |  |
| widget | The widget to use | `comparator` |

Simple configuration
```json
[
    {
      "key": "simpleComparator",
      "description": "This is a default comparator widget. Input is text.",
      "title": "Simple Comparator",
      "widget": "comparator"
    }
  ]
```
