CMF uses [redux](http://redux.js.org/)

## Initialise the store
```javascript
import { store as cmfstore } from 'react-cmf';
import appReducer from './reducers';

// ...

const store = cmfstore.initialize(appReducer, preloadedState, enhancer, middleware);
```


| Argument | Type | Description | Mandatory |
|---|---|---|---|
| appReducer | function &#124; object | Your app root reducer | false |
| preloadedState | object | Your initial state | false |
| enhancer | function | Redux store enhancer | false |
| middleware | array &#124; function | Your app redux middleware | false |

## Reducers

The CMF store comes with some reducers out of the box
* router reducer from [react-router-redux](https://github.com/reactjs/react-router-redux)
* CMF internal reducer (settings, ...)


## Middlewares

The CMF store comes with some middlewares out of the box
* router middleware from [react-router-redux](https://github.com/reactjs/react-router-redux) using `hash` history
* [redux-thunk](https://github.com/gaearon/redux-thunk)
* CMF [http](middlewares/http/index.md) middleware
* CMF [internal](middlewares/http/cmf.md) middleware

**How to change router middleware ?**
```javascript
import { store as cmfstore } from 'react-cmf';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

//...

cmfstore.setRouterMiddleware(routerMiddleware(browserHistory));
const store = cmfstore.initialize(appReducer, preloadedState, enhancer, middleware);
```

## Store layout

The results is a store with the following layout:

* state.cmf.settings
* state.cmf.components (Immutable)
* state.cmf.collections (Immutable)

