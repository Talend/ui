# Buttons

This widget allows you to render buttons.

**Json Schema**

The json schema is not impacted because there is no value associated to a button.

```json
{
  "type": "object",
  "title": "Comment",
  "properties": {}
}
```

**UI Schema**

| Property for a single button | Description |
|---|---|
| widget | `button` |
| title | The button text |
| bsStyle | The bootstrap style to apply |
| triggers | List of trigger types. Only the first one is triggered (for now) |
| type | The button type :<br>`reset` - restore the form values to initial values<br>`button` - perform the trigger<br>`submit` - submit the form |
| hint | Configuration for tooltip with help information, that will be displayed when clicking on action icon (optional) |
| hint.icon | icon for action button (optional, default is info-circle) |
| hint.overlayComponent | component to display in tooltip content (JSX) |
| hint.overlayPlacement | component placement relative to the action icon (optional, default is right) |

| Property for a set of buttons | Description |
|---|---|
| widget | `buttons` |
| items | An array of button definitions |
| items[].position | Default: `left`. Set it to `right` to align it to right |

```json
[
  {
    "key": "check",
    "title": "Check me",
    "widget": "button",
    "triggers": ["after"],
    "hint": {
      "icon": "my custom icon",
      "overlayComponent": "<span>My custom popover content</span>",
      "overlayPlacement": "My custom overlay placement"
    },
    "description": "This should trigger a successful check"
  },
  {
    "widget": "buttons",
    "description": "By default the buttons have space between them. To align things on the left and right you can play with the center button auto-margin",
    "items": [
      {
        "title": "Reset",
        "type": "reset",
        "widget": "button"
      },
      {
        "title": "Test",
        "triggers": ["test"],
        "type": "button",
        "widget": "button"
      },
      {
        "bsStyle": "primary",
        "title": "Submit",
        "type": "submit",
        "widget": "button"
      }
    ]
  },
  {
    "widget": "buttons",
    "description": "To align things on the left or right you can pass a 'position' (left | right)",
    "items": [
      {
        "title": "Reset",
        "type": "reset",
        "name": "reset",
        "widget": "button"
      },
      {
        "position": "right",
        "title": "Test",
        "triggers": ["test"],
        "name": "test",
        "type": "button",
        "widget": "button"
      },
      {
        "bsStyle": "primary",
        "title": "Submit",
        "name": "submit",
        "type": "submit",
        "widget": "button"
      }
    ]
  }
]
```

**Result**

![Buttons](screenshot.png)
