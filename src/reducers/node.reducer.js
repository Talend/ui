import { Map } from 'immutable';

import {
   FLOWDESIGNER_NODE_ADD,
   FLOWDESIGNER_NODE_MOVE,
   FLOWDESIGNER_NODE_MOVE_END,
   FLOWDESIGNER_NODE_UPDATE_TYPE,
   FLOWDESIGNER_NODE_SET_ATTR,
   FLOWDESIGNER_NODE_SET_SIZE,
   FLOWDESIGNER_NODE_REMOVE,
} from '../constants/flowdesigner.constants';
import {
    NodeRecord, PositionRecord, SizeRecord,
} from '../constants/flowdesigner.model';

const defaultState = new Map();
const nodeReducer = (state = defaultState, action) => {
    switch (action.type) {
    case FLOWDESIGNER_NODE_ADD:
        return state.set(action.nodeId, new NodeRecord({
            id: action.nodeId,
            position: new PositionRecord(action.nodePosition),
            nodeSize: new SizeRecord(action.nodeSize),
            nodeType: action.nodeType,
            attr: new Map(action.attr),
        }));
    case FLOWDESIGNER_NODE_MOVE || FLOWDESIGNER_NODE_MOVE_END:
        return state.setIn(
            [action.nodeId, 'position'],
            new PositionRecord(action.nodePosition)
        );
    case FLOWDESIGNER_NODE_SET_SIZE:
        return state.setIn(
            [action.nodeId, 'nodeSize'],
            new SizeRecord(action.nodeSize)
        );
    case FLOWDESIGNER_NODE_UPDATE_TYPE:
        return state.setIn([action.nodeId, 'nodeType'], action.nodeType);
    case FLOWDESIGNER_NODE_SET_ATTR:
        return state.mergeIn([action.nodeId, 'attr'], new Map(action.attr));
    case FLOWDESIGNER_NODE_REMOVE:
        return state.delete(action.nodeId);
    default:
        return state;
    }
};

export default nodeReducer;
