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
            onSubmit={props.onSubmit}
        />
    );
}
```

props table:

|name|type| description|
|--|--|--|
| definitionURL | `string` | URL to get the UISpec |
| triggerURL | `string` | URL to let the triggers in UISpec call the backend API |
| onSubmit| `function`| function call when the user submit the form |


## ComponentPalette

TODO

## ComponentTree

TODO
