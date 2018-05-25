# CMF API


```javascript
import { api } from '@talend/react-cmf';
```

The API is the most used item accessible.
Here is the list of the first level access:

* `actionCreator` to register your action creators
* `action` to register your actions
* `actions` to call basic action creators which CMF provides to you
* `component` to register your components
* `expression` to register your expressions
* `saga` to use CMF with redux-saga

## api.actionCreator

Documentation can be found [here](actionCreator.md).

## api.actions

```javascript
import { api, cmfConnect } from '@talend/react-cmf';

function MyButton(props) {
    return <button onclick={() => props.dispatch(api.actions.http.get('/foo/bar'))}>Get</button>;
}
export default cmfConnect({})(MyButton);
```

You can also handle collections using the following API.

```javascript
import React from 'react';
import { api, cmfConnect } from '@talend/react-cmf';

class MyCollectionManager extends React.Component {

    constructor(props) {
        this.increment = this.increment.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(api.actions.collections.addOrReplace('count', 0));
    }

    increment() {
        this.props.dispatch(
            api.actions.collections.addOrReplace(
                'count', this.props.count + 1
            )
        );
    }

    render() {
        return (
            <div>
                {this.props.count}
                <button onclick={this.increnment}>+</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        count: state.cmf.collections.get('count');
    };
}

export default cmfConnect({})(MyCollectionmanager);
```


## api.component

```javascript
import * as components from '@talend/containers';

api.component.register('MyComponent', MyComponent);
api.component.registerMany(components);
api.component.registerMany({
    MyComponent,
});
```

## api.expression

```javascript
function myExpression({ context, payload}, ...args) {
    // context - react context
    // payload - depends on the expression caller
    // args    - arguments given at the call time
}
api.expressions.register('myExpression', myExpression);
```

Expressions can be used for props resolution.
In this case, the payload is the current props.


## [api.expressions](./expressions/index.md)

## api.saga

You can register your saga in the cmf registry to be able to use the saga props
supported by `cmfConnect`.

```javascript
function* mySaga(action) {
    //...
}
api.sagas.register('mySaga', mySaga);
```

This is related to the `component` saga that you must initialize.

Most of them are documented [here](sagas/index.md)

```javascript
api.sagas.putActionCreator('myaction', event, data, optionalContext);
```

This will call the registered `myAction` action creator.
It's an equivalent of dispatchActionCreator using saga.

## [api.selectors](./selectors/index.md)
