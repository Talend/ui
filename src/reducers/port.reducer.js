import { Map, OrderedMap } from 'immutable';
import {
    PortRecord,
} from '../constants/flowdesigner.model';

import {
    FLOWDESIGNER_PORT_ADD,
    FLOWDESIGNER_PORT_ADDS,
    FLOWDESIGNER_PORT_SET_ATTR,
    FLOWDESIGNER_PORT_REMOVE,
} from '../constants/flowdesigner.constants';

const defaultState = new OrderedMap();

const setPort = (state, port) => (
    state.set(port.id, new PortRecord({
        id: port.id,
        nodeId: port.nodeId,
        portType: port.portType,
        attr: new Map(port.attr),
    }))
);

export default function portReducer(state = defaultState, action) {
    switch (action.type) {
    case FLOWDESIGNER_PORT_ADD:
        return setPort(state, {
            id: action.portId,
            nodeId: action.nodeId,
            portType: action.portType,
            attr: new Map(action.attr),
        });
    case FLOWDESIGNER_PORT_ADDS:
        let newState = state;
        action.ports.forEach(port => {
            newState = setPort(newState, {
                id: port.portId,
                nodeId: action.nodeId,
                portType: port.portType,
                attr: new Map(port.attr),
            });
        });
        return newState;
    case FLOWDESIGNER_PORT_SET_ATTR:
        return state.mergeIn([action.portId, 'attr'], new Map(action.attr));
    case FLOWDESIGNER_PORT_REMOVE:
        return state.delete(action.portId);
    default:
        return state;
    }
}
