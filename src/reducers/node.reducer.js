/* @flow */

import { Map, fromJS } from 'immutable';
import invariant from 'invariant';
import { removePort } from '../actions/port.actions';
import portReducer from './port.reducer';
import { outPort, inPort } from '../selectors/portSelectors';

import type { FlowState, FlowAction } from '../flow-typed';

import {
	FLOWDESIGNER_NODE_ADD,
	FLOWDESIGNER_NODE_MOVE,
	FLOWDESIGNER_NODE_APPLY_MOVEMENT,
	FLOWDESIGNER_NODE_MOVE_END,
	FLOWDESIGNER_NODE_SET_GRAPHICAL_ATTRIBUTES,
	FLOWDESIGNER_NODE_REMOVE_GRAPHICAL_ATTRIBUTES,
	FLOWDESIGNER_NODE_SET_DATA,
	FLOWDESIGNER_NODE_REMOVE_DATA,
	FLOWDESIGNER_NODE_SET_SIZE,
	FLOWDESIGNER_NODE_REMOVE,
} from '../constants/flowdesigner.constants';
import {
	NodeRecord, PositionRecord, SizeRecord, NodeGraphicalAttributes, NodeData,
} from '../constants/flowdesigner.model';

const defaultState = new Map();
const nodeReducer = (state: FlowState = defaultState, action: FlowAction): FlowState => {
	switch (action.type) {
	case FLOWDESIGNER_NODE_ADD:
		if (state.getIn(['nodes', action.nodeId])) {
			invariant(false, `Can not create node ${action.nodeId} since it does already exist`);
		}
		return state.setIn(['nodes', action.nodeId], new NodeRecord({
			id: action.nodeId,
			type: action.nodeType,
			data: new NodeData(action.data)
				.set('properties', fromJS(action.data && action.data.properties) || new Map()),
			graphicalAttributes: new NodeGraphicalAttributes(fromJS(action.graphicalAttributes))
				.set('nodeSize', new SizeRecord(action.graphicalAttributes.nodeSize))
				.set('position', new PositionRecord(action.graphicalAttributes.position))
				.set('properties', fromJS(action.graphicalAttributes.properties) || new Map()),
		}))
		.setIn(['nodesPositions', action.nodeId], new PositionRecord(action.graphicalAttributes.position))
		.setIn(['out', action.nodeId], new Map())
		.setIn(['in', action.nodeId], new Map())
		.setIn(['childrens', action.nodeId], new Map())
		.setIn(['parents', action.nodeId], new Map());
	case FLOWDESIGNER_NODE_MOVE || FLOWDESIGNER_NODE_MOVE_END:
		if (!state.getIn('nodes', action.nodeId)) {
			invariant(false, `Can't move node ${action.nodeId} since it doesn't exist`);
		}
		return state.setIn(
				['nodes', action.nodeId, 'graphicalAttributes', 'position'],
				new PositionRecord(action.nodePosition),
			)
			.setIn(['nodesPositions', action.nodeId], new PositionRecord(action.nodePosition));
	case FLOWDESIGNER_NODE_APPLY_MOVEMENT: {
		const localAction = action;
		return state.update('nodes', nodes => nodes.map((node, nodeId) => {
			if (localAction.nodesId.find(id => id === nodeId)) {
				return node
					.setIn(['graphicalAttributes', 'position', 'x'], node.getPosition().x + localAction.movement.x)
					.setIn(['graphicalAttributes', 'position', 'y'], node.getPosition().y + localAction.movement.y);
			}
			return node;
		}))
		.update('nodePositions', nodesPositions => nodesPositions.map((nodePosition, nodeId) => {
			if (localAction.nodesId.find(id => id === nodeId)) {
				return nodePosition
					.set('x', nodePosition.x + localAction.movement.x)
					.set('y', nodePosition.y + localAction.movement.y);
			}
			return nodePosition;
		}));
	}
	case FLOWDESIGNER_NODE_SET_SIZE:
		if (!state.getIn(['nodes', action.nodeId])) {
			invariant(false, `Can't set size on node ${action.nodeId} since it doesn't exist`);
		}
		return state.setIn(
				['nodes', action.nodeId, 'graphicalAttributes', 'nodeSize'],
				new SizeRecord(action.nodeSize),
			);
	case FLOWDESIGNER_NODE_SET_GRAPHICAL_ATTRIBUTES:
		if (!state.getIn(['nodes', action.nodeId])) {
			invariant(false, `Can't set a graphical attribute on non existing node ${action.nodeId}`);
		}
		try {
			return state.mergeIn(['nodes', action.nodeId, 'graphicalAttributes'], fromJS(action.graphicalAttributes));
		} catch (error) {
			return state.mergeIn(['nodes', action.nodeId, 'graphicalAttributes', 'properties'], fromJS(action.graphicalAttributes));
		}
	case FLOWDESIGNER_NODE_REMOVE_GRAPHICAL_ATTRIBUTES:
		if (!state.getIn(['nodes', action.nodeId])) {
			invariant(false, `Can't remove a graphical attribute on non existing node ${action.nodeId}`);
		}
		return state.deleteIn(['nodes', action.nodeId, 'graphicalAttributes', 'properties', action.graphicalAttributesKey]);
	case FLOWDESIGNER_NODE_SET_DATA:
		if (!state.getIn(['nodes', action.nodeId])) {
			invariant(false, `Can't set a data on non existing node ${action.nodeId}`);
		}
		try {
			return state.mergeIn(['nodes', action.nodeId, 'data'], fromJS(action.data));
		} catch (error) {
			return state.mergeIn(['nodes', action.nodeId, 'data', 'properties'], fromJS(action.data));
		}
	case FLOWDESIGNER_NODE_REMOVE_DATA:
		if (!state.getIn(['nodes', action.nodeId])) {
			invariant(false, `Can't remove a data on non existing node ${action.nodeId}`);
		}
		return state.deleteIn(['nodes', action.nodeId, 'data', 'properties', action.dataKey]);
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
