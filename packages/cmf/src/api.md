# CMF API


```javascript
import cmf from '@talend/react-cmf';
```

The API is the most used item accessible.
Here is the list of the first level access:

* `actionCreator` to register your action creators
* `action` to register your actions
* `actions` to call basic action creators which CMF provides to you
* `component` to register your components
* `expression` to register your expressions
* `saga` to use CMF with redux-saga

## cmf.actionCreator

Documentation can be found [here](actionCreator.md).

## cmf.actions

```javascript
import cmf, { cmfConnect } from '@talend/react-cmf';

function MyButton(props) {
    return <button onclick={() => props.dispatch(cmf.actions.http.get('/foo/bar'))}>Get</button>;
}
export default cmfConnect({})(MyButton);
```

You can also handle collections using the following cmf.

```javascript
import React from 'react';
import cmf, { cmfConnect } from '@talend/react-cmf';

class MyCollectionManager extends React.Component {

    constructor(props) {
        this.increment = this.increment.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(cmf.actions.collections.addOrReplace('count', 0));
    }

    increment() {
        this.props.dispatch(
            cmf.actions.collections.addOrReplace(
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


## cmf.component

```javascript
import * as components from '@talend/containers';

cmf.component.register('MyComponent', MyComponent);
cmf.component.registerMany(components);
cmf.component.registerMany({
    MyComponent,
});
```

## cmf.expression

```javascript
function myExpression({ context, payload}, ...args) {
    // context - react context
    // payload - depends on the expression caller
    // args    - arguments given at the call time
}
cmf.expressions.register('myExpression', myExpression);
```

Expressions can be used for props resolution.
In this case, the payload is the current props.


## [cmf.expressions](./expressions/index.md)

## cmf.saga

You can register your saga in the cmf registry to be able to use the saga props
supported by `cmfConnect`.

```javascript
function* mySaga(action) {
    //...
}
cmf.sagas.register('mySaga', mySaga);
```

This is related to the `component` saga that you must initialize.

Most of them are documented [here](sagas/index.md)

```javascript
cmf.sagas.putActionCreator('myaction', event, data, optionalContext);
```

This will call the registered `myAction` action creator.
It's an equivalent of dispatchActionCreator using saga.

## [cmf.selectors](./selectors/index.md)
