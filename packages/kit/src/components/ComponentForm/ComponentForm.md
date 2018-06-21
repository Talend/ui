# ComponentForm

This component has been designed to take URLs of the service has entry point and display the corresponding form

## How to use

```javascript
import ComponentForm from 'component-kit.js/lib/ComponentForm';
export default function MyComponent(props) {
    return (
        <ComponentForm
            definitionURL="/api/v1/mycomponents/component-id"
            triggerURL="/api/v1/components/action/execute"
        />
    );
}

// in a saga
function* handleForm() {
    const action = yield take(ComponentForm.ON_SUBMIT);
    // do what you want with it
    action === {
        type: ComponentForm.ON_SUBMIT,
        event,
        jsonSchema,
        uiSchema,
        properties,  // your data
    }
}

function* syncProperties() {
    const action = yield take(ComponentForm.ON_SUBMIT);
    // do what you want with it
    action === {
        type: ComponentForm.ON_SUBMIT,
        event,
        jsonSchema,
        uiSchema,
        properties,  // your data
    }
}
```

definitionURL: url to fetch to get the form uiSpec
triggerURL: url to fetch on trigger
