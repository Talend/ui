---
id: core-onevent
title: onEvent
---

The same as expressions, `onEventDispatch` has been created to create event handler in the settings.

It comes from the fact that we always write the same handler when we use redux:

```javascript
class Foo extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(event) {
        this.props.dispatch({
            type: 'MY_SUPER_TYPE',
            // some data from props or event
        });
    }
    render() {
        return (<button onClick={this.onClick}>me<button>);
    }
}
export default connect()(Foo);
```

So this can be just done this way:

```javascript
function Foo() {
    return <button onClick={props.onClick}>me<button>;
}

export default cmfConnect({
    defaultProps: {
        onClickDipatch: {
            type: 'MY_SUPER_TYPE',
        }
    }
})(Foo);
```

This force you a bit to send simple action and keep the complexity at the saga level.

[Read more on it here](https://github.com/Talend/ui/tree/master/packages/cmf/src/onEvent.md)
