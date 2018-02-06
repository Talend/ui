CMF API
==

```javascript
import { api } from '@talend/react-cmf';
```

The API is the most used items accessible. Here is the list of the first level access:

* `actionCreator` to register your action creators
* `action` to register your actions
* `actions` to call basic action creator which CMF provide to you
* `component` to register your components
* `expression` to register your expressions
* `saga` to use CMF in redux-saga

api.actionCreator
--

the can be found [here](actionCreator.md).

api.actions
--

```javascript
import { api, cmfConnect } from '@talend/react-cmf';
function MyButton(props) {
    return <button onclick={() => props.dispatch(api.actions.http.get('/foo/bar'))}>Get</button>;
}
export default cmfConnect({})(MyButton);
```

You can also handle collections using the following api

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



api.component
--

```javascript
import * as components from '@talend/containers';

api.component.register('MyComponent', MyComponent);
api.component.registerMany(components);
api.component.registerMany({
    MyComponent,
});
```

api.expression
--

```javascript
function myexpression({ context, payload}, ...args) {
    // context is react context
    // payload depend on the expression caller
    // args are arguments given at the call time
}
api.expressions.register('myexpression', myexpression);
```

Using cmfConnect for example expression can be used for props resolution.
in this case the payload is the current props.

api.saga
--

```javascript
api.saga.putActionCreator('myaction', event, data, optionalContext);
```

This will call the registered action creator `myaction`.
It's the saga brother of dispatchActionCreator.
