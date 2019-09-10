# Introduction

The concept here is to create handler (`onClick` for example).

A handler is function that received most of the time an event as first param and maybe some other params.

React pure component often take handler as props so you can add some business or trigger some changes in your app.

We will expose here three options to build handlers:

* `onEventDispatch`
* `onEventActionCreator`
* `onEventSetState`

For all the following example we take this pure component:

```javascript
import React from 'react';
import { cmfConnect } from '@talend/react-cmf';

function MyButton({children, ...props}) {
    return <button {...props}>{children}</button>
}
MyButton.displayName = 'MyButton';
export default cmfConnect({})(MyButton);
```

# onEventDispatch

This handler will just dispatch the payload to redux.

```javascript
const onClickDispatch = {
    type: 'CLICK_ON_MY_BUTTON',
};
function MyComponent(props) {
    return (
        <MyButton onClickDispatch={onClickDispatch}>
            Click me will dispatch
        </MyButton>;
}
```

# onEventActionCreator

In CMF we like action creator to build dynamic payload:

```javascript
const onClickActionCreator = {
    id: 'myActionCreator',
    data: { foo: 'bar' }
};
function MyComponent(props) {
    return (
        <MyButton onClickActionCreator={onClickActionCreator}>
            Click me will dispatch
        </MyButton>;
}
```

# onEventSetState

## static example

If you want to disable the button when the user click, you can do the following:

```javascript
const onClickSetState = {
    disabled: true,
};
function MyComponent(props) {
    return (
        <MyButton
            onClickSetState={onClickSetState}
            initialState={{ disabled: false }}
            spreadCMFState
        >
            Click me once
        </MyButton>;
}
```

The initialState props will tell cmfConnect to initialize this MyButton component state in redux.

The `spreadCMFState` props will request cmfConnect to
transform the content of the state into props

It's not required, it you put onClickSetState props it will
detect you want that behavior

## dynamic example

Context: the event handler is called with arguments and you need the value of an argument.
For example on input an onChange is called with event as first argument and we want the event.target.value:

```javascript
{
    onChangeSetState: {
        value: [0, 'target.value'],
    },
};
```

CMF will detect you pass an array in this case, the first argument is a number which is index of arguments[index] and the second one is the path inside the object (we use lodash.get here).

## toggle example

```javascript
function MyCheckbox(props) {
    return (
         <input
            type="checkbox"
            name={props.name}
            value={props.value}
            {...props}
        />
    );
}
export default cmfConnect({})(MyCheckbox);
```

later on

```javascript
function MyForm(props) {
    return <MyCheckBox initialState={{checked: false}} onClickSetState={{checked: 'toggle'}} />;
}
```

So here what happens. First we set initialState props so we tell CMF to create a props.state from this state which will be transformed to immutable.

Next each click will do `props.setState((state) => {value: !state.value})` to the opposite boolean value.
Note: it use the callback version of the setState to ensure the read state is the good one.
