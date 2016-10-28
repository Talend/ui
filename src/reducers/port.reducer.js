import invariant from 'invariant';
import { Map, OrderedMap } from 'immutable';
import {
	PortRecord,
} from '../constants/flowdesigner.model';
import { removeLink } from '../actions/link.actions';
import linkReducer from './link.reducer';
import { portOutLink, portInLink } from '../selectors/linkSelectors';

import {
	FLOWDESIGNER_PORT_ADD,
	FLOWDESIGNER_PORT_ADDS,
	FLOWDESIGNER_PORT_SET_ATTR,
	FLOWDESIGNER_PORT_REMOVE_ATTR,
	FLOWDESIGNER_PORT_REMOVE,
} from '../constants/flowdesigner.constants';

const defaultState = new OrderedMap();

const setPort = (state, port) => {
	const newState = state.setIn(['ports', port.id], new PortRecord({
		id: port.id,
		nodeId: port.nodeId,
		portType: port.portType,
		attributes: new Map(port.attributes),
	}));
	if (port.attributes.get('type') === 'EMITTER') {
		return newState.setIn(['out', port.nodeId, port.id], new Map());
	} else if (port.attributes.get('type') === 'SINK') {
		return newState.setIn(['in', port.nodeId, port.id], new Map());
	}
	invariant(false,
		`Can't set a new port ${port.id} if its attribute.type !== EMITTER || SINK,
		given ${port.attributes.get('type')}`);
	return state;
};

export default function portReducer(state = defaultState, action) {
	switch (action.type) {
	case FLOWDESIGNER_PORT_ADD:
		if (!state.getIn(['nodes', action.nodeId])) {
			invariant(false,
					`Can't set a new port ${action.portId} on non existing node ${action.nodeId}`);
		}
		return setPort(state, {
			id: action.portId,
			nodeId: action.nodeId,
			portType: action.portType,
			attributes: new Map(action.attributes),
		});
	case FLOWDESIGNER_PORT_ADDS:
		if (!state.getIn(['nodes', action.nodeId])) {
			invariant(false,
					`Can't set a new port ${action.portId} on non existing node ${action.nodeId}`);
		}
		return action.ports.reduce(
				(cumulatedState, port) =>
					setPort(cumulatedState, {
						id: port.portId,
						nodeId: action.nodeId,
						portType: port.portType,
						attributes: new Map(port.attributes),
					})
				, state);
	case FLOWDESIGNER_PORT_SET_ATTR:
		if (!state.getIn(['ports', action.portId])) {
			invariant(false,
					`Can't set an attribute on non existing port ${action.portId}`);
		}
		return state.mergeIn(['ports', action.portId, 'attributes'], new Map(action.attributes));
	case FLOWDESIGNER_PORT_REMOVE_ATTR:
		if (!state.getIn(['ports', action.portId])) {
			invariant(false,
					`Can't remove an attribute on non existing port ${action.portId}`);
		}
		return state.deleteIn(['ports', action.portId, 'attributes', action.attributesKey]);
	case FLOWDESIGNER_PORT_REMOVE:
		if (!state.getIn(['ports', action.portId])) {
			invariant(false,
					`Can not remove port ${action.portId} since it doesn't exist`);
		}
		return portInLink(state, action.portId).reduce(
				(cumulativeState, link) => linkReducer(cumulativeState, removeLink(link.id)),
				portOutLink(state, action.portId).reduce(
					(cumulativeState, link) => linkReducer(cumulativeState, removeLink(link.id)),
					state
				)
			)
			.deleteIn(['ports', action.portId])
			.deleteIn(['out', state.getIn(['ports', action.portId]).nodeId, action.portId])
			.deleteIn(['in', state.getIn(['ports', action.portId]).nodeId, action.portId]);
	default:
		return state;
	}
}
