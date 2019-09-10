# Store

CMF uses [redux](http://redux.js.org/)

## Initialize the store
```javascript
import { store as cmfstore } from 'react-cmf';
import appReducer from './reducers';

// ...

const store = cmfstore.initialize(appReducer, preloadedState, enhancer, middleware);
```

| Argument | Type | Description | Mandatory |
|---|---|---|---|
| `appReducer` | function &#124; object | Your app root reducer | false |
| `preloadedState` | object | Your initial state | false |
| `enhancer` | function | Redux store enhancer | false |
| `middleware` | array &#124; function | Your app redux middleware | false |

## Reducers

The CMF store comes with some reducers out of the box
* settings
* component state
* collections

## Middlewares

The CMF store comes with some middlewares out of the box
* [redux-thunk](https://github.com/gaearon/redux-thunk)
* CMF [http](middlewares/http/index.md) middleware
* CMF [internal](middlewares/http/cmf.md) middleware

## Store hierarchy

The results is a store with the following hierarchy:

* `state.cmf.settings`
* `state.cmf.components` (Immutable)
* `state.cmf.collections` (Immutable)
