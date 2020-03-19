# Radio or Select

This widget allows you to render a radio if it has less than 2 possible options, a select box otherwise.

**Json Schema**

Take a look at Select or Radio documentation for configuration.

```json
{
  "type": "object",
  "title": "Choice",
  "properties": {
    "radios": {
      "type": "string",
      "enum": [
        "foo",
        "bar"
      ]
    },
    "select": {
      "type": "string",
      "enum": [
        "foo",
        "bar",
        "fuzz",
        "qux"
      ]
    }
  }
}
```

**UI Schema**

Take a look at Select or Radio documentation for more configuration.

```json
[
  {
    "key": "radios",
    "title": "Type of things",
    "description": "This field has less that 2 possible items, it should be rendered as Radios",
    "widget": "radioOrSelect"
  },
  {
    "key": "select",
    "title": "Type of things",
    "description": "This field has more that 2 possible items, it should be rendered as Select",
    "widget": "radioOrSelect"
  }
]
```

**Result**

![RadioOrSelect](screenshot.png)
