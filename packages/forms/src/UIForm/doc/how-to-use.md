# How to use

## Installation

```
yarn install @talend/react-forms
```

## Show me the code !

```javascript
import React from 'react';
import { UIForm } from '@talend/react-forms/lib/UIForm';

class MyComponent extends React.Component {
	onChange(event, { schema, value, oldProperties, properties }) {

	}

	onErrors(event, errors) {

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

UIForms manage its own state based on its `props.data`. But if you need to manage this state from outside, please read next sections [How to synchronize data](#how-to-synchronize-data).

### onChange

This is called at each value change, as the user type.

| Argument | Type | Description |
|---|---|---|
| event | `object` | The event that triggered the change. |
| payload.schema | `object` | The widget schema. See [principles](./principles.md). |
| payload.value | `any` | The widget new value. |
| payload.oldProperties | `object` | The whole form data before the change. |
| payload.properties | `object` | The whole form data after the change. |### onChange

### onErrors

This is called at each new validation errors.

| Argument | Type | Description |
|---|---|---|
| event | `object` | The event that triggered the error. |
| errors | `object` | The whole form error map by property key. |

### onSubmit

This is called on form submit.

| Argument | Type | Description |
|---|---|---|
| event | `object` | The event that triggered the submit. |
| properties | `object` | The whole form data. |


## How to synchronize data

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

So you need to synchronize the UIForm's state with your own state system.


## Next

[Go to next step: Validation](./validation.md)
