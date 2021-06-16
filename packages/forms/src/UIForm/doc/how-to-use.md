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

## Lifecycle

![lifecycle schema](http://www.plantuml.com/plantuml/png/ZP11IyGm48NlyolcBEp1rLCFibV1Wx17yH2RqGuaQKYcBYB-TsEJ3gq8zLHU-jx7bvooc2IJTp2m9IGVvGCjvJvn51u3F5qzu-5mX_U1XOqxYn7ga6l2rp5vFFS3UGFh1cgbnao2ClvdvlYTTZTG6vlffwhE-RghYtumuOsWdgtnKxJbO_72ClnHdKc529eNycqZ9og6i1mzhBrdw4QlzN21RboFZPYd5yyDULm_uGQhLrYAQleBUuDTMJY7YNeg8unfZ1dglqxrb1xeylZJQ3BrgMjRxxTVLPqlE56matVV)

## Next

[Go to next step: Conditional rendering](./conditional-rendering.md)
