# Triggers

Triggers are advanced ways to controle properties and errors.

*Warning*
Use only triggers if you can't perform what you want with another feature listed in the [documentation](../README.md).

## What are triggers ?

Triggers are asynchronous calls that you can perform in your custom widgets.

You can do whatever you want outside of the forms, such as
- getting info from outside, REST calls, etc
- perform advanced validation
- change value in another widget
- ...

The only info that the form use are
- properties: update the current properties
- errors: update the current errors

## How to configure triggers

// TODO explain uiSchema trigger definition with convention action/onEvent
// TODO add example that will be the same example for each part
### uiSchema

Triggers are defined in the uiSchema. Depending on the form, you can have different trigger definitions for a widget.

```json
{
    "uiSchema": [
        {
            "key": "datasetId",
            "triggers": [
                { "onEvent": "change", "action": "fillNameField" }
                { "onEvent": "filter", "action": "filterDatasets", "customParam": "lol" }
            ]
        }
    ]
}
```

| Trigger definition property | Type | Description |
|---|---|---|
| onEvent | `string` | This is consumed by the widget. The widget will get the definition corresponding to the user event, and call the trigger implementation with it. |
| action | `string` | Unique action identifier. It will be consumed by the trigger implementation to determine which action to do. |
| other | `any` | You can pass any additional parameters, that the trigger implementation will receive. |

### Example

## How to write a trigger implementation ?

Triggers implementation are based on the trigger definition `action` value. Depending on the action, it will perform a corresponding task.

```javascript
import React from 'react';
import { UIForm } from '@talend/react-forms/lib/UIForm';

class MyComponent extends React.Component {

	onTrigger({ trigger, schema, value, properties, errors, ...otherOptions }) {
	    const triggerResult = {};
        switch (trigger.action) {
            case filterAction:
                // perform some filter
                // fill triggerResult
                break;
            ...
        }

        return Promise.resolve(triggerResult);
	}

	render() {
		return (<UIForm
		    {...props}
            onTrigger={this.onTrigger}
		/>);
	}
}
```

### onTrigger input

| Argument | Type | Description |
|---|---|---|
| trigger | `object` | The trigger definition from uiSchema |
| schema | `object` | The widget schema that performed the trigger |
| value | `any` | The widget value |
| properties | `object` | The whole form data |
| errors | `object` | The whole form errors |
| otherOptions | `any` | The trigger implementation will receive any additional information the widget want to pass |

### onTrigger output

Any `onTrigger` implementation must return a promise. This promise must result an object containing any value the widget will get.

Anyway, there are values that are consumed by the form itself.

| Promise result key | Type | Description |
|---|---|---|
| errors | `function` | An errors modifier. `(currentErrors) => { /* change the errors*/ return newErrors; }` |
| properties | `function` | A form data modifier. `(currentProperties) => { /* change the data*/ return newProperties; }` |

### Example

## How to call a trigger on a widget event ?

The triggers are called depending on the widget. The widget defines the events it supports.

```javascript
class MyWidget extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        const newValue = event.target.value;
        this.props.onChange(event, newValue);

        const triggerDef = this.props
            .schema
            .triggers
            .find(({ onEvent }) => onEvent === 'change');
        if (triggerDef) {
            this.props.onTrigger(event, {
                trigger: triggerDef,
                schema: this.props.schema,
                value: newValue,
            })
        }
    }

    render() {
        return (
            <input onChange={this.onChange} />
        );
    }
}
```

| Props | Type | Description |
|---|---|---|
| onTrigger | `function` | The trigger callback |
| schema.triggers | `array` | The trigger definitions from uiSchema |

### Example
