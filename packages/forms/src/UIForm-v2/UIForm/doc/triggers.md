# Triggers

Triggers are advanced ways to control properties and errors.

*Warning*
Use triggers only if you can't perform what you want with another feature listed in the [documentation](../README.md).

## What are triggers ?

Triggers are asynchronous calls, performed during event handling. The events are defined by the widgets implementation.

You can do whatever you want outside of the forms, such as
- getting info from outside, REST calls, etc
- perform advanced validation
- change value in another widget
- ...

## TD;LR

To create a trigger you need
- (widget) to define events that will run the trigger
- (trigger implementation) to define trigger actions
- (uiSchema) to map actions with events

## How to configure triggers ?

Trigger definitions are defined in the uiSchema. They are mappings that link widget event to trigger implementations.

Depending on the form, you can have different trigger definitions for a widget.

### Example

```json
{
    "uiSchema": [
        {
            "key": "datasetId",
            "triggers": [
                { "onEvent": "change", "action": "fillNameField" }
                { "onEvent": "filter", "action": "filterDatasets", "customParam": "lol" }
            ],
            "widget": "resourcePicker"
        }
    ]
}
```

In the example above
- we render a `resourcePicker` widget
- on widget value change, we execute `fillNameField` action
- on filter, we execute the `filterDatasets` action, passing a `customParam` extra value

`Actions` are code you write and execute (see [How to write a trigger implementation](#how-to-write-a-trigger-implementation-).

`Events` are identifiers that the widget supports.

### Definition

A trigger definition have 2 mandatory properties: onEvent and action.

| Trigger definition property | Type | Description |
|---|---|---|
| onEvent | `string` | This is consumed by the widget. The widget will get the definition corresponding to the user event, and call the trigger implementation with it. |
| action | `string` | This is consumed by the trigger implementation. Unique action identifier to determine which action to perform. |
| other | `any` | You can pass any additional parameters, that the trigger implementation will receive. |

## How to write a trigger implementation ?

Trigger implementations are based on the trigger definition `action` value. Depending on the action, it will perform a corresponding task.

### Example

```javascript
import React from 'react';
import { UIForm } from '@talend/react-forms/lib/UIForm';

class MyComponent extends React.Component {

	onTrigger({ trigger, schema, value, properties, errors, ...otherOptions }) {
		const triggerResult = {};
		switch (trigger.action) {
			case 'fillNameField':
				// perform some filter
				triggerResult.properties = (oldProperties) => ({ ...oldProperties, name: value.name });
				triggerResult.errors = (oldErrors) => {
					const newErrors = { ...oldErrors };
					delete newErrors.name;
					return newErrors;
				};
				break;
			...
        }

        return Promise.resolve(triggerResult);
	}

	render() {
		return (
			<UIForm
				{...props}
				onTrigger={this.onTrigger}
			/>
		);
	}
}
```

In the example above, for trigger definitions that points to `fillNameField` action
- we set the name in the form properties
- we remove name field errors

### onTrigger input definition

| Argument | Type | Description |
|---|---|---|
| trigger | `object` | The trigger definition from uiSchema |
| schema | `object` | The widget schema that performed the trigger |
| value | `any` | The widget value |
| properties | `object` | The whole form data |
| errors | `object` | The whole form errors |
| otherOptions | `any` | The trigger implementation will receive any additional information the widget want to pass |

### onTrigger output definition

Any `onTrigger` implementation must return a promise. This promise must results an object containing any information the widget will get.

Anyway, there are information that are consumed by the form itself.

| Promise result key | Type | Description |
|---|---|---|
| errors | `function` | An errors modifier. `(currentErrors) => { /* change the errors*/ return newErrors; }` |
| properties | `function` | A form data modifier. `(currentProperties) => { /* change the data*/ return newProperties; }` |

## How to call a trigger on a widget event ?

The triggers are called depending on the widget. The widget defines the events it supports.

### Example

```javascript
class ResourcePickerWidget extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event, value) {
        this.props.onChange(event, value);

        const triggerDef = this.props
            .schema
            .triggers
            .find(({ onEvent }) => onEvent === 'change');
        if (triggerDef) {
            this.props.onTrigger(event, {
                trigger: triggerDef,
                schema: this.props.schema,
                value,
            })
        }
    }

    render() {
        return (
            <ResourcePicker {...props} onChange={this.onChange} />
        );
    }
}
```

In the example above,
- the widget calls a trigger on value change
- the call is done only if it is defined in uiSchema
- it passes the trigger definition, the widget schema, the new value. The whole form properties and errors are injected afterward. The trigger implementation then has all the information.

### Widget trigger definition

| Props | Type | Description |
|---|---|---|
| onTrigger | `function` | The trigger callback |
| schema.triggers | `array` | The trigger definitions from uiSchema |
