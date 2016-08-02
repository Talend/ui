import { OrderedMap } from 'immutable';
import {
    PortRecord,
} from '../constants/flowdesigner.model';

const defaultState = new OrderedMap();

import {
  FLOWDESIGNER_PORT_ADD,
  FLOWDESIGNER_PORT_SET_ATTR,
  FLOWDESIGNER_PORT_REMOVE,
  FLOWDESIGNER_NODE_MOVE,
  FLOWDESIGNER_PORT_MERGE,
  FLOWDESIGNER_NODE_REMOVE,
} from '../constants/flowdesigner.constants';


export default function portReducer(state = defaultState, action) {
    switch (action.type) {
    case FLOWDESIGNER_PORT_ADD:
        return state.set(action.portId, new PortRecord({
            id: action.portId,
            nodeId: action.nodeId,
            portType: action.portType,
            attr: new Map(action.attr),
        }));
    case FLOWDESIGNER_PORT_SET_ATTR:
        return state.mergeIn([action.portId, 'attr'], new Map(action.attr));
    case FLOWDESIGNER_PORT_REMOVE:
        return state.delete(action.id);
    case FLOWDESIGNER_PORT_MERGE:
        return state.merge(action.ports);
    case FLOWDESIGNER_NODE_MOVE:
        if (action.ports) {
            return state.merge(action.ports);
        }
        return state;
    case FLOWDESIGNER_NODE_REMOVE:
        return state.filter(port => port.nodeId !== action.nodeId);
    default:
        return state;
    }
}
