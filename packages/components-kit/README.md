# React CMF Containers for Talend Component Kit

This package provides [react-cmf](https://github.com/Talend/ui/blob/master/packages/cmf/README.md) containers which work with [Talend Component Kit](https://github.com/Talend/component-runtime)

## How to dev

`yarn start` will start a webpack with a mock of the backend so you can play with it.

## ComponentForm

The first citizen component every body wants is the form to let the enduser create instance of components.

How to use:

```javascript
import cmf from '@talend/react-cmf';
import kit from '@talend/react-components-kit';

cmf.bootstrap({
    modules: [kit],
});
```

Then you can Inject `ComponentForm` or using JSX:


```javascript
import { Inject } from '@talend/react-cmf';

export default function AddForm(props) {
    return (
        <Inject
            component="ComponentForm"
            definitionURL="/api/v1/dataset-spec"
            triggerURL="/api/v1/components/action/execute"
        />
    );
}
```

props table:

| Name | Type | Description |
|--|--|--|
| definitionURL | `string` | URL to get the UISpec. If the URL props change, the new uiSpec will be fetched. |
| triggerURL | `string` | URL to call on trigger. |

## ComponentForm events

ComponentForm is completely integrated with redux. The events are only dispatch actions.

| Type | Description |
|--|--|--|
| TCOMP_FORM_DEFINITION_URL_CHANGE | URL to get uiSpec definition changes. |
| TCOMP_FORM_CHANGE | A change is done on the form. To enable those dispatches, you need to pass a `props.dispatchOnChange`. WARNING : this can lead to performance issues, as it will dispatch an event at every changes. |
| TCOMP_FORM_SUBMIT | The submit action. |

## ComponentPalette

TODO

## ComponentTree

TODO
