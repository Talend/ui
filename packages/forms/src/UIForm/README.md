# Guide to UIForms

## Implementation principles

### TD;LR

1. User provide initial schema and data (jsonSchema, uiSchema, properties, errors)

2. json-schema-form-core lib process the jsonSchema and uiSchema to produce a mergedSchema

3. The mergedSchema describe what widgets to render.

4. The form is autonomous, it has its own lifecycle, but there are ways to change things from outside.

### Schema and data

#### jsonSchema
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
    "comment": "",
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

#### uiSchema
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


#### properties

This is a plain object that follows the jsonSchema model. It provides initial values.

#### errors

It represents the validation errors. The format is the error message for the composed key. A field is invalid if it has a error message.

```json
{
  "user,lastname": "Please enter your lastname",
  "user,firstname": "Please enter your firstname",
  "age": "You must be at least 18 years old"
}
```

### JSFC (json-schema-form-core)

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

### Lifecycle

The jsonSchema/uiSchema/properties/errors that is provided to UIForm are the initial values. Those values are stored (state or redux) and live their lives. They may be modified depending on user's actions.

**Validations**

As the user type, the value is validated by :

* the static validation (ex: pattern, required, etc)
* the provided customValidation function if the static validation pass.

Those validations change the `errors` object accordingly.

**Triggers**

This is a way to alter everything in the form. To add a trigger in a field, you must pass the additionnal property in it's uiSchema.

```json
[
  ...
  {
    "key": "user.gender",
    "triggers": ["after"]
  }
  ...
]
```

There is at least 2 ways to trigger a trigger:

* onChange on a field with an `"after"` trigger in uiSchema
* onClick on a button, passing the trigger type
* other ways depending on the widgets

The `onTrigger` function is called.
Triggers are concepts introduced with Daikkon. The goal is to write an `onTrigger` compatible with Daikkon forms as available implementation.

```javascript
function onTrigger(type, properties, schema, value) {
	...

	return new Promise(() => ({
	    jsonSchema: {}, // the new jsonSchema
	    uiSchema: [], // the new uiSchema
	    properties: {}, // the new properties
	    errors: {}, // the errors to add/alter to the current errors
	}))
}
```

The `onTrigger` should return a promise that resolves an object containing

| Result | Description |
|---|---|
| jsonSchema | This replace the current jsonSchema |
| uiSchema | This replace the current uiSchema |
| properties | This replace the current properties |
| errors | This is merged with the current errors |

**Redux actions**

If you use the redux implementation of UIForm, you dispatch the actions to alter the form configurations.

Take a look at

* form.actions.js : actions creators on the form
* model.actions.js : actions creators to alter the properties
* validation.actions.js : actions creators to alter the errors

## How to use

### React state based

```javascript
import React from 'react';
import { UIForm } from '@talend/react-forms/lib/UIForm';

class MyComponent extends React.Component {
	customValidation(schema, value, properties) {
		return `The field ${schema.key} is not valid. Value: ${value}`;
	}

	onChange(schema, value, properties) {
		...
	}

	onTrigger(type, schema, value, properties) {
		...
	}

	render() {
		return (<UIForm
		    {...props}
		    id={'my-unique-form-id'}
		/>);
	}
}
```

### Redux based

```javascript
import { createStore, combineReducers } from 'redux';
import { formReducer } from '@talend/react-forms/lib/UIForm';

const reducers = {
  // ... your other reducers here ...
  form: formReducer
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)
```

```javascript
import React from 'react';
import { ConnectedUIForm } from '@talend/react-forms/lib/UIForm';

class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.customValidation = this.customValidation.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onTrigger = this.onTrigger.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	customValidation(schema, value, properties) {
		return `The field ${schema.key} is not valid. Value: ${value}`;
	}

	onChange(schema, value, properties) {
		...
	}

	onTrigger(type, schema, value, properties) {
		...
	}

	onSubmit(event, properties) {
		... // properties is the model values
	}

	render() {
		return (<ConnectedUIForm
		    data={{
		    	jsonSchema,
		    	uiSchema,
		    	properties,
		    	errors
		    }}
		    id={'my-unique-form-id'}
		    customValidation={this.customValidation}
		    onChange={this.onChange}
		    onTrigger={this.onTrigger}
		    onSubmit={this.onSubmit}
		/>);
	}
}
```
