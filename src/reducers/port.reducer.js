import { Map, OrderedMap } from 'immutable';
import {
    PortRecord,
} from '../constants/flowdesigner.model';

import {
  FLOWDESIGNER_PORT_ADD,
  FLOWDESIGNER_PORT_SET_ATTR,
  FLOWDESIGNER_PORT_REMOVE,
} from '../constants/flowdesigner.constants';

const defaultState = new OrderedMap();

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
        return state.delete(action.portId);
    default:
        return state;
    }
}
