import { combineReducers } from 'redux';
import nodesReducer from './node.reducer';
import linksReducer from './link.reducer';
import portsReducer from './port.reducer';
import nodeTypeReducer from './nodeType.reducer';

export default combineReducers({
    nodes: nodesReducer,
    links: linksReducer,
    ports: portsReducer,
    nodeTypes: nodeTypeReducer,
});
