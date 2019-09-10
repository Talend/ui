# Widgets

UIForms comes with a set of widgets. But you can create you own widgets.

## Widget api

```javascript
export default function MyCustomWidget(props) {
	const {
		id,
		isValid,
		errors,
		errorMessage,
		onChange,
		onFinish,
		onTrigger,
		properties,
		schema,
		value,
		valueIsUpdating,
	} = props;

	const {
		autoFocus,
		description,
		disabled = false,
		options,
		placeholder,
		readOnly = false,
		title,
		type,
	} = schema;

	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);

	return (
		<FieldTemplate
			description={description}
			descriptionId={descriptionId}
			errorId={errorId}
			errorMessage={errorMessage}
			id={id}
			isValid={isValid}
			label={title}
			labelAfter
			required={schema.required}
			valueIsUpdating={valueIsUpdating}
		>
			// do whatever you want
		</FieldTemplate>
	);
}
```

| Props | Type | Description |
|---|---|---|
| id | `string` | The id to place on your input |
| isValid | `boolean` | Indicates if the current value is valid |
| errors | `object` | The whole form error map |
| errorMessage | `string` | If the value is not valid, this prop will contains the error to display |
| onChange | `function` | Function to propagate the new value to the form. WARNING: no validation is done |
| onFinish | `function` | Function to indicates that the user has finish to edit the value. This will trigger the validation |
| onTrigger | `function` | Function to call a trigger. See [Trigger documentation](./triggers.md) |
| properties | `object` | The whole form data |
| schema | `object` | The widget schema that is a merge of jsonSchema/uiSchema |
| value | `any` | The current widget value |
| valueIsUpdating | `boolean` | Flag that set the updating animation on the widget. The inputs should be disabled. |

## How to register it

```javascript
import React from 'react';
import { UIForm } from '@talend/react-forms/lib/UIForm';
import MyCustomWidget from './MyCustomWidget';
import MyCustomIText from './MyCustomIText';

function MyComponent(props) {
    const customWidgets = {
		text: MyCustomIText, // this overrides the default text input widget
		customWidgetId: MyCustomWidget, // this adds a new widget
	};

	render() {
		return (<UIForm
			{...props}
			widgets={customWidgets}
		/>);
	}
}
```

| Props | Type | Description |
|---|---|---|
| widgets | `object` | Add the key/value in the object where key is a unique widget identifier, and the value is the widget component. You can override an existing widget. |

## How to use it

```json
{
    "uiSchema": [
        {
            "key": "name",
            "widget": "customWidgetId",
            // rest of the widget configuration
        }
    ]
}
```

## Next

[Go to next step: Display mode](./display-mode.md)
