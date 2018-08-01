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

| name             | type   | desc                                                     |
| ---------------- | ------ | -------------------------------------------------------- |
| definitionURL\*  | string | url to GET the `uiSpec`                                  |
| triggerURL\*     | string | url to POST on event trigger                             |
| [submitURL]      | string | url to POST the content if action is of type "submit"    |
| [uiSpecPath]     | string | to get the `uiSpec` from the result of GET definitionURL |
| [lang]           | string | language code                                            |
| [customTriggers] | object | registry used to let uiSchema point to it                |

All other props will be spread to the UIForm

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
          ]
        }
      ]
    },
```

`action`, `family` and `type` define the trigger identifier.
`parameters` define the payload to send to the backend. the `key` attribute define key in the payload for this parameter and the `path` is used to get the value of it inside the current form payload.

## Life cycle

![Life cycle of ComponentForm](http://www.plantuml.com/plantuml/svg/XLJBRjim43oNNx583vMGzWS4k4ZI8e1H0owg-9OBJQqbmX99YAkawTTtAOco5Tcj3dfnTfOpEzAT9zbIrzJYqtr7TcrKtHKeI5EDiD471FMc-DOUu9jjd3LewD6sZTXvRE7BLxXtBeEjGoFszZVSlE9UEdS37pUwhEYXxb1ySDn1A-saeG0NC1xdx-VaivB-pQMQi90ViKQovY9WjxvQcyjI2ZG5yAu5Rof8cUq1CYZme8qcRStkr-Rpiw5MboMskxRc1z_j6qsy85OhM0UOhFKV6T2mMeav5vE7QmOjjyGsgQqij2bJSRuQfKIKa8hqYoIS2rqm1oaPz7CybVJwmYaW7gGwCcK61oHLdUaIuyg9fjEvGpLLpffn4wISc3v9W-f-0nkMWiN_9G_4gIZmignODCniKJOLZJCD_P-6UOJUKnnZkQgrEWBFGbMeZZpaPvEyQgfW768g1kG5aTQCn4j5av4_j_bJf0ePEFFn7LkBdXyzBidU0Qb2aqI3qoKyAdEjTHuwLp2ijo7lanXSk6h245ROTnIiFYcFm1VERk3ZJ-GjP1Du_Dfu0i_sDV9VNWtThwMoqDv9pjmoYhs3qqS4jx7rCfBHGTZ-c6ZwlyxtaJmP7V2TKeX5AkwuddzfVm40 'Life cycle of ComponentForm')

## TODO

- Support sync in store of data
