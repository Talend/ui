# Checkboxes

This widget allows you to render checkboxes input.

**Json Schema**

| Property for single checkbox | Description |
|---|---|
| type | `boolean` |

| Property for multiple checkboxes | Description |
|---|---|
| type | `array` |
| items.type | Type of the items |
| items.enum | Possible values |

```json
{
  "type": "object",
  "title": "Booleans",
  "properties": {
    "standard": {
      "type": "boolean"
    },
    "multipleChoices": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "foo",
          "bar",
          "fuzz",
          "qux"
        ]
      }
    },
    "customMultipleChoices": {
      "type": "array",
      "items": {
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
}
```

**UI Schema**

| Property | Description | Default |
|---|---|---|
| title | The title to display next to the field |  |
| autoFocus | Focus on input on render | `false` |
| disabled | Disable the input | `false` |
| titleMap | A mapping of value/label to display |  |
| hint | Configuration for tooltip with help information, that will be displayed when clicking on action icon (optional) | |
| hint.icon | icon name for action button (optional) | info-circle |
| hint.overlayComponent | component to display in tooltip content (JSX) | |
| hint.overlayPlacement | component placement relative to the action icon (optional) | right |
| data-feature | A `data-feature` value to set on the checkbox label |  |

```json
[
  {
    "key": "standard",
    "title": "Check if you are happy (standard)"
  },
  {
    "key": "multipleChoices",
    "title": "Select multiple values"
  },
  {
    "key": "customMultipleChoices",
    "title": "Select multiple values",
    "titleMap": {
      "foo": "My custom foo title",
      "bar": "My custom bar title",
      "fuzz": "My custom fuzz title",
      "qux": "my custom qux title"
    },
    "hint": {
      "icon": "my custom icon name",
      "overlayComponent": <span>My custom popover content</span>,
      "overlayPlacement": "My custom overlay placement"
    }
  }
]
```

**Result**

![Checkboxes](screenshot.png)
