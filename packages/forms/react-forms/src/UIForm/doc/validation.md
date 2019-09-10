# Validation

This section explain how built-in validation works and how to use it.

You can add custom validation on single values, but for more advanced use cases, please see [Triggers](./triggers.md).

## Single validation

By default the widgets trigger validation at different moments.
For example, Text widget triggers validation on input blur, while Datalist will trigger validation on selection.

In custom widgets, you have this control too, see [Widgets page](./widgets.md).

Validation is controlled by your json schema definition.

## Global validation

On submit, a whole form validation is triggered. The submission is not performed if the form contains errors.

## Custom validation

Custom validation is possible. It is done if schema static validation returns no error.

How to use custom validation

```json
{
    "uiSchema": [
        {
            "key": "name",
            "customValidation": true // enable custom validation on name value
        },
    ]
}
```

```javascript
import React from 'react';
import { UIForm } from '@talend/react-forms/lib/UIForm';

class MyComponent extends React.Component {

	customValidation(schema, value, properties) {
		switch (schema.key.toString()) {
			case nameKey:
				if(value.length < 2) {
					return 'Name should have at least 2 characters.'; // returns the error message
				}
				break;
			default:
				return null;
		}
	}

	render() {
		return (
			<UIForm
			    {...props}
        	    customValidation={customValidation}
			/>
		);
	}
}
```

| Argument | Type | Description |
|---|---|---|
| schema | `object` | The widget schema. |
| value | `any` | The widget value. |
| properties | `object` | The whole form data. |


## Next

[Got to next step: Create new widgets](./widgets.md)
