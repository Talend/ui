# CollapsibleFieldset

This widget allows you to create a fieldset that user can collapse.
It is possible to customize the title displayed as header.

**Json Schema**

```json
{
  "jsonSchema": {
    "type": "object",
    "title": "Comment",
    "properties": {
      "lastname": {
        "type": "string"
      },
      "firstname": {
        "type": "string"
      },
      "comment": {
        "type": "string",
        "maxLength": 20
      }
    },
    "required": [
      "firstname",
      "firstname",
      "comment"
    ]
  }
}
```

**UI Schema**

| Property | Description | Default |
|---|---|---|
| key | Mandatory, it indicates where to set the `isClosed` state flag. |  |
| title | The default `CollapsiblePanel` displays this title in the header. |  |
| items | The UI schema of its body. |  |
| widget | The widget to use. | `collapsibleFieldset` |

```json
[
  {
    "widget": "collapsibleFieldset",
    "key": "technical.basic",
    "title": "Basic",
    "items": [
      {
        "key": "lastname",
        "title": "Last Name (with description)",
        "description": "Hint: this is the last name"
      },
      {
        "key": "firstname",
        "title": "First Name (with placeholder)",
        "placeholder": "Enter your firstname here"
      }
    ]
  }
]
```

**Result**

![collapsible](screenshot.jpg)

**How to customize the title**

1. Create your collapsiblePanel with the provided `createCollapsibleFieldset()` function.
```javascript
import createCollapsibleFieldset from '@talend/react-forms/lib/CollapsibleFieldset';

/**
* Create a title from values and schema. It can return a react component instance.
* Value: the object value associated to the UI schema key
* Schema: the merged schema associated to the key
*/
function title(value, schema) {
	return `My awesome ${schema.title}`;
}
const MyCustomCollapsiblePanel = createCollapsibleFieldset(title);
```

2. Register your component while using `<UIForms>`
```javascript
import { UIForms } from '@talend/react-forms';

...
    const widgets = { myCustomCollapsibleFieldset: MyCustomCollapsiblePanel };

    return <UIForm
        {...props}
        widgets={widgets}
    />;

```

3. Define your UI schema to use your custom fieldset
```json
[
  {
    "widget": "myCustomCollapsibleFieldset",
    "key": "technical.basic",
    "title": "Basic title",
    "items": [
      {
        "key": "lastname",
        "title": "Last Name (with description)",
        "description": "Hint: this is the last name"
      },
      {
        "key": "firstname",
        "title": "First Name (with placeholder)",
        "placeholder": "Enter your firstname here"
      }
    ]
  }
]
```
