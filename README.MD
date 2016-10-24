[![Build Status](https://travis-ci.org/acateland/react-flow-designer.svg?branch=master)](https://travis-ci.org/acateland/react-flow-designer)

[![dependencies Status](https://david-dm.org/acateland/react-flow-designer/status.svg)](https://david-dm.org/acateland/react-flow-designer)

[![Coverage Status](https://coveralls.io/repos/github/acateland/react-flow-designer/badge.svg)](https://coveralls.io/github/acateland/react-flow-designer)

LIB in active development, concept are not fully scoped

Do Not Use !

# Datastream Designer

Use D3 for calculations.
Redux as a state manager.

## Designed inside dataflow webapp but meant to be used as a module.

### How to use it

#### Use the rendering component
```js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';node
import configureStore from './store/configureStore';

import { DatastreamDesigner } from './datastream_designer/';

const store = configureStore();

render(
  <Provider store={store}>
    <DatastreamDesigner />
  </Provider>,
  document.getElementById('app')
);
```
#### integrate the reducer into your redux data store

```js
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { datastreamDesignerReducer } from '../datastream_designer/';

const rootReducer = combineReducers({
    routing: routerReducer,
    datastream: datastreamDesignerReducer,
});

export default rootReducer;
```


the datastream_designer module expose its components, reducers, and action type constants.

Action type constants are exposed for the sake of listening to them and add new feature to your application arround the datastream designer.

Exemple a reducer listening for 'DATASTREAM_DESIGNER_NODE_SELECTED' could trigger a form so you can edit the node data.

## Redux API


