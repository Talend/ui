# ComponentForm

This component has been designed to take URLs of the service has entry point and display the corresponding form

## Concept

`uiSpec` is a datastructure that represent the form itself. It is an object composed of three attributes:

- `jsonSchema` the schema that let the backend describe the data structure to submit
- `uiSchema` the schema that let the frontend build the form
- `properties` the original payload (if you want to edit a data)

The backend used with this component is described at https://talend.github.io/component-runtime.

## How to use

The common use case is to edit a component:

```javascript
import ComponentForm from '@talend/react-containers/lib/ComponentForm';
export default function MyComponent(props) {
	return (
		<ComponentForm
			definitionURL="/api/v1/components/component-id"
			triggerURL="/api/v1/action/execute"
			submitURL="/api/v1/persist"
		/>
	);
}

// in a saga
function* handleForm() {
	const action = yield take(ComponentForm.ON_SUBMIT_SUCCEED);
	// do what you want with it
	action ===
		{
			type: ComponentForm.ON_SUBMIT_SUCCEED,
			data,
			componentId,
		};
}
```

## Props

| name               | type    | desc                                                                                                                                             |
| ------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| definitionURL\*    | string  | url to GET the `uiSpec`                                                                                                                          |
| triggerURL\*       | string  | url to POST on event trigger                                                                                                                     |
| submitURL          | string  | url to POST the content if action is of type "submit"                                                                                            |
| uiSpecPath         | string  | to get the `uiSpec` from the result of GET definitionURL                                                                                         |
| lang               | string  | language code used by the backend to produce translated uiSpec                                                                                   |
| customTriggers     | object  | registry used to let uiSchema point to it                                                                                                        |
| dispatchOnChange   | boolean | if this props is true an action is dispatch on every form change                                                                                 |
| CSRFTokenCookieKey | string  | control cookie key to read to get CSRF token value (otherwise http saga default configuration will be used)                                      |
| CSRFTokenHeaderKey | string  | control http header key to send to let server control CSRF token on each trigger called (otherwise http saga default configuration will be used) |

All other props will be spread to the UIForm

## Actions dispatched

The component dispatch some actions in redux so you can take them to add your side effects. The types are available as static variables attached to the component `Form`.

| name                           | value                              | when its dispatched                                 |
| ------------------------------ | ---------------------------------- | --------------------------------------------------- |
| Form.ON_CHANGE                 | 'TCOMP_FORM_CHANGE'                | On every change if `dispatchOnChange` props is true |
| Form.ON_SUBMIT                 | 'TCOMP_FORM_SUBMIT'                | On any of submit action is called                   |
| Form.ON_SUBMIT_SUCCEED         | 'TCOMP_FORM_SUBMIT_SUCCEED'        | When the form submitURL POST response is OK         |
| Form.ON_SUBMIT_FAILED          | 'TCOMP_FORM_SUBMIT_FAILED'         | When the form submitURL POST response is not OK     |
| Form.ON_TRIGGER_BEGIN          | 'TCOMP_FORM_TRIGGER_BEGIN'         | Before calling the backend on a trigger             |
| Form.ON_TRIGGER_END            | 'TCOMP_FORM_TRIGGER_END'           | On the trigger response OK                          |
| Form.ON_DEFINITION_URL_CHANGED | 'TCOMP_FORM_DEFINITION_URL_CHANGE' | On props update if `definitionURL` has changed      |

## Actions available

An action is available to reset the dirty status of the form. The action is available in ComponentForm.actions.js :

- setComponentFormDirtyState( componentId , dirty ) : set for the given component form (determined by the componentId) the dirty state passed

## Triggers

A trigger is described in the uiSpec and is called by a widget when an event happens.
By default trigger are called on `blur` but it can be called on `change` event (on checkbox for example) if blur doesn t make sens.

The trigger may also define the event he wants to be called on. For example to fetch the list of suggestions for a field you may want to call the backend on `focus` event.

Example:

```javascript
    {
      "key": "asyncTitleMap",
      "title": "Datalist with async options",
      "widget": "datalist",
      "triggers":[
        {
          "action": "SuggestionForDemo",
          "family": "remote",
          "type": "suggestions",
          "onEvent": "focus",
          "parameters":[
            {
              "key": "query",
              "path": "asyncTitleMap"
            }
          ],
          "options": ["asyncTitleMap"]
        }
      ]
    },
```

`action`, `family` and `type` define the trigger identifier.
`parameters` define the payload to send to the backend. the `key` attribute define key in the payload for this parameter and the `path` is used to get the value of it inside the current form payload.
`options` define the list of path that will be modified by the trigger. Thoses path will be used to manage the _updating_ props of UIForm which make fields disabled and displayed using the heartbeat effect.

A trigger is a piece of code on the backend and on the frontend. So your app can produce any wanted effects on a given form.

A trigger can be only client side. For that you only have to add the property `"remote": false`. In that case the onTrigger function will not call fetch.

You can read more on [default triggers](./kit/defaultRegistry.md)

## customTriggers

Lets take an example of a custom trigger.

You want to create an addform where the user wants to select a component. So your form is not static.

You can split your payload in two piece:

- `$metadata` (label, type)
- `component`

To support the change of the form on the fly you will need a trigger, lets call it reloadForm:

```javascript
function reloadForm({ body, properties }) {
	return {
		...body,
		properties: { $metadata: properties.$metadata },
	};
}

export default {
	reloadForm,
};
```

And the UISpec:

```javascript
{
    "key": "$metdata.type",
    "title": "Types",
    "titleMap": [...]
    "triggers": [
        {
            "action": "builtin::root::reloadFromId",
            "family": "builtin::family",
            "parameters": [
                {
                    "key": "id",
                    "path": "$metadata.type"
                }
            ],
            "type": "reloadForm"
        }
    ],
    "widget": "datalist"
},
```

So next you just have to call the form with it

```javascript
import Form from '@talend/containers/lib/ComponentForm';
import customTriggers from './reloadForm';

export default function AddForm(props) {
	return <Form customTriggers={customTriggers} {...props} />;
}
```

The backend will do the job to find the uispec of a given type and send it to the frontend.

on the backend response the function we wrote is called.

The form support a sets of keys in the payload returned by the trigger function:

- properties: replace the current properties in the form.
- jsonSchema, uiSchema: replace the current form spec.
- titleMap: use by datalist widget to create the suggestions

More to come in the future.

## Life cycle

![Life cycle of ComponentForm](http://www.plantuml.com/plantuml/svg/XLJBRjim43oNNx583vMGzWS4k4ZI8e1H0owg-9OBJQqbmX99YAkawTTtAOco5Tcj3dfnTfOpEzAT9zbIrzJYqtr7TcrKtHKeI5EDiD471FMc-DOUu9jjd3LewD6sZTXvRE7BLxXtBeEjGoFszZVSlE9UEdS37pUwhEYXxb1ySDn1A-saeG0NC1xdx-VaivB-pQMQi90ViKQovY9WjxvQcyjI2ZG5yAu5Rof8cUq1CYZme8qcRStkr-Rpiw5MboMskxRc1z_j6qsy85OhM0UOhFKV6T2mMeav5vE7QmOjjyGsgQqij2bJSRuQfKIKa8hqYoIS2rqm1oaPz7CybVJwmYaW7gGwCcK61oHLdUaIuyg9fjEvGpLLpffn4wISc3v9W-f-0nkMWiN_9G_4gIZmignODCniKJOLZJCD_P-6UOJUKnnZkQgrEWBFGbMeZZpaPvEyQgfW768g1kG5aTQCn4j5av4_j_bJf0ePEFFn7LkBdXyzBidU0Qb2aqI3qoKyAdEjTHuwLp2ijo7lanXSk6h245ROTnIiFYcFm1VERk3ZJ-GjP1Du_Dfu0i_sDV9VNWtThwMoqDv9pjmoYhs3qqS4jx7rCfBHGTZ-c6ZwlyxtaJmP7V2TKeX5AkwuddzfVm40 'Life cycle of ComponentForm')

## TODO

- Support sync in store of data using `dispatchOnChange`
