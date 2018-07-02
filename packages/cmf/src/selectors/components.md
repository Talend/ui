# components selectors

## cmf.selectors.components.get

How to use:

```javascript
import { selectors } from '@talend/react-cmf';

function mapStateToProps(state) {
    return {
        my: selectors.components.get(state, 'my.data');
    }
}
```

This selector accept the following arguments:

| name | description |
| -- | -- |
| state| redux state |
| path | path to collections which is stored in cmf.components (support dotted accessor like lodash get) |
| default value | the default value |

The selector works the same as selectors.collections.get, just it returns data that is stored in cmf.components,
not in cmf.collections

## cmf.selectors.components.toJSMemorized

Unlike cmf.selectors.components.get, cmf.selectors.components.toJSMemorized gets collection from state,
converts it to POJOs (plain old Java Script objects), and memorizes (caches) it,
therefore it will convert toJS (which is expensive operation, especially in mapStateToProps) only if object references
has been changed, so you keep good performance

## cmf.selectors.components.getFormData

```javascript
import { selectors } from '@talend/react-cmf';

function mapStateToProps(state) {
    return {
        my: selectors.components.getFormData(state, 'MY_FORM_ID');
    }
}
```

Accepts the following arguments:

| name | description |
| -- | -- |
| state | redux state |
| formId | id of the form from which you want to get the state () |

Using this selector you can get form data

## cmf.selectors.components.getFormDataToJS

This selector is the same as above, just it returns POJO without creating a new reference on each state mutation


