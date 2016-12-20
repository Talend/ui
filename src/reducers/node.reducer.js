import { Map } from 'immutable';
import invariant from 'invariant';
import { removePort } from '../actions/port.actions';
import portReducer from './port.reducer';
import { outPort, inPort } from '../selectors/portSelectors';

import {
	FLOWDESIGNER_NODE_ADD,
	FLOWDESIGNER_NODE_MOVE,
	FLOWDESIGNER_NODE_APPLY_MOVEMENT,
	FLOWDESIGNER_NODE_MOVE_END,
	FLOWDESIGNER_NODE_SET_ATTR,
	FLOWDESIGNER_NODE_REMOVE_ATTR,
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
		if (state.getIn(['nodes', action.nodeId])) {
			invariant(false, `Can not create node ${action.nodeId} since it does already exist`);
		}
		return state.setIn(['nodes', action.nodeId], new NodeRecord({
			id: action.nodeId,
			position: new PositionRecord(action.nodePosition),
			nodeSize: new SizeRecord(action.nodeSize),
			nodeType: action.nodeType,
			attributes: new Map(action.attributes),
		}))
		.setIn(['out', action.nodeId], new Map())
		.setIn(['in', action.nodeId], new Map())
		.setIn(['childrens', action.nodeId], new Map())
		.setIn(['parents', action.nodeId], new Map());
	case FLOWDESIGNER_NODE_MOVE || FLOWDESIGNER_NODE_MOVE_END:
		if (!state.getIn('nodes', action.nodeId)) {
			invariant(false, `Can't move node ${action.nodeId} since it doesn't exist`);
		}
		return state.setIn(
				['nodes', action.nodeId, 'position'],
				new PositionRecord(action.nodePosition),
			);
	case FLOWDESIGNER_NODE_APPLY_MOVEMENT:
		return state.update('nodes', nodes => nodes.map((node) => {
			if (action.nodesId.find(id => id === node.id)) {
				return node.set('position', node.position
					.set('x', node.position.x + action.movement.x)
					.set('y', node.position.y + action.movement.y),
				);
			}
			return node;
		}));
	case FLOWDESIGNER_NODE_SET_SIZE:
		if (!state.getIn(['nodes', action.nodeId])) {
			invariant(false, `Can't set size on node ${action.nodeId} since it doesn't exist`);
		}
		return state.setIn(
				['nodes', action.nodeId, 'nodeSize'],
				new SizeRecord(action.nodeSize),
			);
	case FLOWDESIGNER_NODE_SET_ATTR:
		if (!state.getIn(['nodes', action.nodeId])) {
			invariant(false, `Can't set an attribute on non existing node ${action.nodeId}`);
		}
		return state.mergeIn(['nodes', action.nodeId, 'attributes'], new Map(action.attributes));
	case FLOWDESIGNER_NODE_REMOVE_ATTR:
		if (!state.getIn(['nodes', action.nodeId])) {
			invariant(false, `Can't remove an attribute on non existing node ${action.nodeId}`);
		}
		return state.deleteIn(['nodes', action.nodeId, 'attributes', action.attributesKey]);
	case FLOWDESIGNER_NODE_REMOVE:
		if (!state.getIn(['nodes', action.nodeId])) {
			invariant(false, `Can not remove node ${action.nodeId} since it doesn't exist`);
		}
		return inPort(state, action.nodeId).reduce(
			(cumulativeState, port, key) => portReducer(cumulativeState, removePort(key)),
			outPort(state, action.nodeId).reduce(
				(cumulativeState, port, key) => portReducer(cumulativeState, removePort(key)),
				state,
			),
		)
		.deleteIn(['nodes', action.nodeId])
		.deleteIn(['out', action.nodeId])
		.deleteIn(['in', action.nodeId])
		.deleteIn(['childrens', action.nodeId])
		.deleteIn(['parents', action.nodeId]);
	default:
		return state;
	}
};

export default nodeReducer;
