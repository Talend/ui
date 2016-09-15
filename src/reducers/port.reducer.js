import invariant from 'invariant';
import { Map, OrderedMap } from 'immutable';
import {
	PortRecord,
} from '../constants/flowdesigner.model';

import {
	FLOWDESIGNER_PORT_ADD,
	FLOWDESIGNER_PORT_ADDS,
	FLOWDESIGNER_PORT_SET_ATTR,
	FLOWDESIGNER_PORT_REMOVE_ATTR,
	FLOWDESIGNER_PORT_REMOVE,
} from '../constants/flowdesigner.constants';

const defaultState = new OrderedMap();

const setPort = (state, port) => (
	state.setIn(['ports', port.id], new PortRecord({
		id: port.id,
		nodeId: port.nodeId,
		portType: port.portType,
		attr: new Map(port.attr),
	}))
);

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
			attr: new Map(action.attr),
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
					attr: new Map(port.attr),
				})
			, state);
	case FLOWDESIGNER_PORT_SET_ATTR:
		if (!state.getIn(['ports', action.portId])) {
			invariant(false,
				`Can't set an attribute on non existing port ${action.portId}`);
		}
		return state.mergeIn(['ports', action.portId, 'attr'], new Map(action.attr));
	case FLOWDESIGNER_PORT_REMOVE_ATTR:
		if (!state.getIn(['ports', action.portId])) {
			invariant(false,
				`Can't remove an attribute on non existing port ${action.portId}`);
		}
		return state.deleteIn(['ports', action.portId, 'attr', action.attrKey]);
	case FLOWDESIGNER_PORT_REMOVE:
		if (!state.getIn(['ports', action.portId])) {
			invariant(false,
				`Can not remove port ${action.portId} since it doesn't exist`);
		}
		return state.deleteIn(['ports', action.portId]);
	default:
		return state;
	}
}
