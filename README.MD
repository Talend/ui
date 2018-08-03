[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1391fe51ad7e4a409f9bdb7df0ad7754)](https://www.codacy.com/app/Talend/react-flow-designer_2?utm_source=github.com&utm_medium=referral&utm_content=Talend/react-flow-designer&utm_campaign=badger)
[![Build Status](https://travis-ci.org/Talend/react-flow-designer.svg?branch=master)](https://travis-ci.org/Talend/react-flow-designer.svg?branch=master)

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
the idea is to reduce the surface api of the redux action, encouraging batching multiple transformation in a transaction
### Graph
- Graph
  - transaction [List<Action<Node|Link|Port>>]
- Node
  - add NodeRecord
  - update NodeRecord
  - delete NodeRecord
  - moveStart nodeId Position
  - move nodeId Vector
  - moveEnd nodeId Position
- Link
  - add LinkRecord
  - update LinkRecord
  - delete LinkRecord
- Port
  - add PortRecord
  - update PortRecord
  - delete PortRecord

each of those action are intended to be used with the apply function

Each of those action are backed by the graph API wich check graph integrity, if one action fail to apply the whole transaction is void and the original graph is returned, one or many errors are logged.

special action for movement are kept for optimisation purpose, nothing prevent the user to update position via the `update` action

#### deprecate
removeNode
removeNodeData
setNodeData
removeNodeGraphicalAttribute
setNodeGraphicalAttributes
setNodeType
setNodeSize
moveNodeToEnd
applyMovementTo
moveNodeTo
startMoveNodeTo

## Element API

### Node
### Link
### Port
### Graph
### Data
### Size
### Position
