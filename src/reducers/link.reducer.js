import { Map } from 'immutable';

import {
    FLOWDESIGNER_LINK_ADD,
    FLOWDESIGNER_LINK_SET_TARGET,
    FLOWDESIGNER_LINK_SET_SOURCE,
    FLOWDESIGNER_LINK_REMOVE,
    FLOWDESIGNER_LINK_SET_ATTR,
} from '../constants/flowdesigner.constants';

import { LinkRecord } from '../constants/flowdesigner.model';

const defaultState = new Map();

export default function linkReducer(state = defaultState, action) {
    switch (action.type) {
    case FLOWDESIGNER_LINK_ADD:
        return state.set(action.linkId, new LinkRecord({
            id: action.linkId,
            sourceId: action.sourceId,
            targetId: action.targetId,
            linkType: action.linkType,
            attr: new Map(action.attr),
        }));
    case FLOWDESIGNER_LINK_SET_TARGET:
        return state.setIn([action.linkId, 'targetId'], action.targetId);
    case FLOWDESIGNER_LINK_SET_SOURCE:
        return state.setIn([action.linkId, 'sourceId'], action.sourceId);
    case FLOWDESIGNER_LINK_REMOVE:
        return state.delete(action.linkId);
    case FLOWDESIGNER_LINK_SET_ATTR:
        return state.mergeIn([action.linkId, 'attr'], new Map(action.attr));
    default:
        return state;
    }
}
