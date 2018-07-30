# ComponentForm

This component has been designed to take URLs of the service has entry point and display the corresponding form

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
    action === {
        type: ComponentForm.ON_SUBMIT_SUCCEED,
        data,
        componentId
    }
}
```

definitionURL: url to fetch the form uiSpec
triggerURL: url to fetch on trigger
submitURL: url to POST the content


# TODO:

* add option to sync in redux the properties (props ?)
