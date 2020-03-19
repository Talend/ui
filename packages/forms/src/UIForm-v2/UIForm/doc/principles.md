# Implementation principles

## TD;LR

1. User provide initial schema and data (jsonSchema, uiSchema, properties, errors)

2. json-schema-form-core lib process the jsonSchema and uiSchema to produce a mergedSchema

3. The mergedSchema describe what widgets to render.

4. The form is autonomous, it has its own lifecycle, but there are ways to change things from outside.

## Schema and data

The forms are based on 4

### jsonSchema
It defines the properties model. It should define the expected value (type, pattern, etc).
Those info will be used for synchronous validation on the frontend side.

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
      "age": {
        "type": "number"
      },
      "email": {
        "type": "string",
        "pattern": "^\\S+@\\S+$"
      },
      "comment": {
        "type": "string",
        "maxLength": 20
      }
    },
    "required": [
      "lastname",
      "firstname",
      "email"
    ]
  }
}
```

This will produce a flat properties :

```json
{
    "lastname": "",
    "firstname": "",
    "age": 0,
    "email": "",
    "comment": ""
}
```

You can structure it like the following example :

```json
{
  "jsonSchema": {
    "type": "object",
    "title": "Comment",
    "properties": {
      "user": {
        "type": "object",
        "properties": {
          "lastname": {
            "type": "string"
          },
          "firstname": {
            "type": "string"
          },
          "age": {
            "type": "number"
          }
        },
        "required": [
          "lastname",
          "firstname"
        ]
      },
      "email": {
        "type": "string",
        "pattern": "^\\S+@\\S+$"
      },
      "comment": {
        "type": "string",
        "maxLength": 20
      }
    },
    "required": [
      "email"
    ]
  }
}
```

This will produce a structured properties :

```json
{
    "user": {
        "lastname": "",
        "firstname": "",
        "age": 0
    },
    "email": "",
    "comment": ""
}
```

### uiSchema
It defines the form fields model. It is an ordered array, each element can represent a field or fieldsets.

**Field example**
For simple inputs with nothing special, you can only pass the key from jsonSchema
```json
[
  "user.lastname",
  "user.firstname",
  "user.age",
  "email",
  "comment"
]
```

For more complicated inputs, you can pass objects with additional properties
```json
[
  "user.lastname",
  {
    "key": "user.firstname",
    "widget": "my-widget",
    "title": "First Name (with placeholder)",
    "placeholder": "Enter your firstname here"
  },
  "user.age",
  "email",
  "comment"
]
```

| Mandatory property | Description |
|---|---|
| key | The corresponding key in jsonSchema |
| type | The widget name in widget mapping |

The additional values depends on the widget you use. Refers to the widget for that.
Example for the `widget: "text"` type :

| Additional property | Description | Mandatory |
|---|---|---|
| title | The input title/label | false |
| placeholder | The input placeholder | false |
| description | A comment under the input. Can be hints/instructions | false |
| validationMessage | A custom validation message if synchronous validation fails | false |
| readOnly | Specifies if the input is in readonly mode | false |

**Fieldsets example**

What we define as `fieldset` is all the complex widgets that manage fieldsets (fieldsets, tabs, columns, ...).

Each of those widgets should be defined as an object in the uiSchema array.
```json
[{
  "widget": "tabs",
  "items": [
    {
      "title": "User",
      "items": [
        {
          "key": "name",
          "title": "Name"
        },
        {
          "key": "lastname",
          "title": "Last Name (with description)",
          "description": "Hint: this is the last name"
        },
        {
          "key": "firstname",
          "title": "First Name (with placeholder)",
          "placeholder": "Enter your firstname here"
        },
        {
          "key": "age",
          "title": "Age"
        }
      ]
    },
    {
      "title": "Other",
      "items": [
        {
          "key": "email",
          "title": "Email (with pattern validation and custom validation message)",
          "description": "Email will be used for evil.",
          "validationMessage": "Please enter a valid email address, e.g. user@email.com"
        },
        {
          "key": "nochange",
          "title": "Field (read only mode)",
          "readOnly": true
        },
        {
          "key": "comment",
          "widget": "textarea",
          "title": "Comment",
          "placeholder": "Make a comment",
          "validationMessage": "Don't be greedy!"
        }
      ]
    }
  ]
}]
```

| Mandatory property | Description |
|---|---|
| widget | The widget name in widget mapping |
| items | The array of contents of this type of fieldset manager. For tab widget, it represents each tab. Each tab content is a fieldset. |


### properties

This is a plain object that follows the jsonSchema model. It provides initial values.

### errors

It represents the validation errors. The format is the error message for the composed key. A field is invalid if it has a error message.

```json
{
  "user,lastname": "Please enter your lastname",
  "user,firstname": "Please enter your firstname",
  "age": "You must be at least 18 years old"
}
```

## JSFC (json-schema-form-core)

We use [json-schema-form-core](https://github.com/json-schema-form/json-schema-form-core). It takes the jsonSchema and uiSchema, process them, and merge them to have only 1 array of widgets to render.

For example, it transforms the user lastname jsonSchema/uiSchema into this mergedSchema :
```json
{
  "description": "Hint: this is the last name",
  "key": ["user", "lastname"],
  "required": true,
  "schema": {
    "type": "string"
  },
  "title": "Last Name (with description)",
  "type": "text"
}
```

The content depends on the jsonSchema/uiSchema and is the entry that configures the widget.

## Next

[Go to next step: How to use @talend/react-forms](./how-to-use.md)
