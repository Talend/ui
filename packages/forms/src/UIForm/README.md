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

### Conditional rendering

It is possible to render parts of the forms defined in uiSchema, depending on properties values.
The uiSchema accepts a `condition` property, which use [jsonLogic](http://jsonlogic.com). So please first go their and read the doc.


Let's take this example:
```json
{
  "jsonSchema": {
    "type": "object",
    "title": "Comment",
    "properties": {
      "entity": {
        "type": "object",
        "properties": {
          "kind": {
            "type": "string",
            "enum": ["human", "animal", "thing"]
          },
          "civility": {
            "type": "string",
            "enum": ["Mr", "Mrs"]
          },
          "lastname": {
            "type": "string"
          },
          "firstname": {
            "type": "string"
          }
        }
      }
    }
  }
}
```

We want
* `civility` to appear only for humans
* `lastname` and `firstname` to appear only for humans and animals

```json
{
  "uiSchema": [
    {
      "widget": "fieldset",
      "condition": {
        "in": [{ "var": "entity.kind"}, ["human", "animal"]]
      },
      "items": [
        {
          "key": "entity.civility",
          "title": "Civility",
          "description": "This should be visible only for humans",
          "condition": {
            "===": [{ "var": "entity.kind"}, "human"]
          }
        },
        {
          "key": "entity.lastname",
          "title": "Last Name",
          "description": "This should be visible only for humans and animals"
        },
        {
          "key": "entity.firstname",
          "title": "First Name",
          "description": "This should be visible only for humans and animals"
        }
      ]
    }
  ]
}
```

## How to use

### React state based

```javascript
import React from 'react';
import { UIForm } from '@talend/react-forms/lib/UIForm';

class MyComponent extends React.Component {
	customValidation(schema, value, properties) {
		return `The field ${schema.key} is not valid. Value: ${value}`;
	}

	onChange(event, { schema, value, oldProperties, properties }) {

	}

	onErrors(event, errors) {

	}

	onTrigger(event, { trigger, schema, properties }) {

	}

	onSubmit(event, properties) {

	}

	render() {
		return (<UIForm
		    {...props}
		    id={'my-unique-form-id'}
		    data={{ jsonSchema, uiSchema, properties, errors }}
		/>);
	}
}
```

UIForms manage its own state based on its `props.data`. But if you need to manage this state from outside, please read next sections.

### How to synchronize data

You have 2 states changed internally, that you can synchronize : `properties` (the forms data), and `errors`.

```javascript
import React from 'react';
import { UIForm } from '@talend/react-forms/lib/UIForm';

class MyComponent extends React.Component {

	onChange(event, { schema, value, oldProperties, properties }) {
		// save properties in your app state
	}

	onErrors(event, errors) {
		// save errors in your app state
	}

	render() {
		// get properties and errors from your app state
		// inject them back to the forms
		const properties = myAppState.properties;
		const errors = myAppState.errors;

		return (<UIForm
		    {...props}
		    id={'my-unique-form-id'}
		    data={{ jsonSchema, uiSchema, properties, errors }}
		    onErrors={this.onErrors.bind(this)}
		    onChange={this.onChange.bind(this)}
		/>);
	}
}
```

Changing UIForm's `props.data` will replace the existing pieces in the form.

So you need to synchronize the UIForm's state with your own stat system

### Custom widgets

You can add new widgets, or override an existing widget by passing a widget dictionary to the form.

```javascript
import React from 'react';
import { UIForm } from '@talend/react-forms/lib/UIForm';

function MyComponent(props) {
	const customWidgets = {
		text: MyCustomIText, // this overrides the default text input widget
		fancyInput: MyFancyInput, // this adds a new widget, with "fancyInput" name
	};

	return (<UIForm
		{...props}
		widgets={customWidgets}
	/>);
}
```

To develop a custom widget, you can use the following template

```javascript
import PropTypes from 'prop-types';
import React from 'react';
import FieldTemplate from '@talend/react-forms/lib/UIForm/fields/FieldTemplate';

export default function MyWidget(props) {
	const { id, isValid, errorMessage, onChange, onFinish, schema, value } = props;
	const {
		autoFocus,
		description,
		disabled,
		placeholder,
		readOnly,
		title,
		type,
	} = schema;

	return (
		<FieldTemplate
			description={description}
			errorMessage={errorMessage}
			id={id}
			isValid={isValid}
			label={title}
			labelAfter
			required={schema.required}
		>
			{// do whatever you want here}
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Text.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
			title: PropTypes.string,
			type: PropTypes.string,
		}),
		value: PropTypes.any,
	};
}

Text.defaultProps = {
	isValid: true,
	schema: {},
	value: '',
};
```

| Props | Type | Description |
|---|---|---|
| id | `string` | This is your widget id, you want use it as it is without any modification. |
| isValid | `boolean` | If the field is valid (used by FieldTemplate). |
| errorMessage | `string` | The error to display if the field is not valid (used by FieldTemplate). |
| onChange | `function` | Call this when the value is supposed to be edited. |
| onFinish | `function` | Call this when your value edition is finished. It triggers validation. |
| schema | `object` | The merged json/ui schema. |
| value | `any` | The value your widget handle. |


### Display mode

UIForm accept a `displayMode` props. The value `text` will switch display to a definition list, following the ui specs.

```javascript
import React from 'react';
import { UIForm } from '@talend/react-forms/lib/UIForm';

function MyComponent(props) {
	return (<UIForm
		{...props}
		displayMode="text"
	/>);
}
```

The rendered widgets will be selected with the name `${widgetId}_${displayMode}`.
For example, the textarea will be the one registered under `textarea_text` id.
You can pass custom widgets for text mode with the `widgets` props.
