# Middleware

By dispatching an action, with routerReplace/routerPush, the middleware will convert the action to the [react-redux-router](https://github.com/reactjs/react-router-redux/blob/master/src/actions.js) format.

```javascript
const pushAction = {
    cmf: {
        routerPush: '/my/new/route'
    }
}
dispatch(pushAction);

...

const replaceAction = {
    cmf: {
        routerReplace: '/my/new/route'
    }
}
dispatch(replaceAction);
```

The value of routerReplace/routerPush can be a `function` that accepts the action and returns the new route.

