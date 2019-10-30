import Immutable, { Map, fromJS } from 'immutable';
import invariant from 'invariant';
import { removePort } from '../actions/port.actions';
import portReducer from './port.reducer';
import { outPort, inPort } from '../selectors/portSelectors';

import {
	FLOWDESIGNER_NODE_ADD,
	FLOWDESIGNER_NODE_MOVE_START,
	FLOWDESIGNER_NODE_MOVE,
	FLOWDESIGNER_NODE_APPLY_MOVEMENT,
	FLOWDESIGNER_NODE_MOVE_END,
	FLOWDESIGNER_NODE_SET_TYPE,
	FLOWDESIGNER_NODE_SET_GRAPHICAL_ATTRIBUTES,
	FLOWDESIGNER_NODE_REMOVE_GRAPHICAL_ATTRIBUTES,
	FLOWDESIGNER_NODE_SET_DATA,
	FLOWDESIGNER_NODE_REMOVE_DATA,
	FLOWDESIGNER_NODE_SET_SIZE,
	FLOWDESIGNER_NODE_REMOVE,
	FLOWDESIGNER_NODE_UPDATE,
} from '../constants/flowdesigner.constants';
import { Node } from './../api';
import {
	NodeRecord,
	PositionRecord,
	SizeRecord,
	NodeGraphicalAttributes,
} from '../constants/flowdesigner.model';

const defaultState = new Map();
const nodeReducer = (state = defaultState, action) => {
	switch (action.type) {
		case FLOWDESIGNER_NODE_ADD:
			if (state.getIn(['nodes', action.nodeId])) {
				invariant(
					false,
					`Can not create node ${action.nodeId} since it does already exist`,
				);
			}
			return state
				.setIn(
					['nodes', action.nodeId],
					new NodeRecord({
						id: action.nodeId,
						type: action.nodeType,
						data: new Immutable.Map(action.data).set(
							'properties',
							fromJS(action.data && action.data.properties) || new Map(),
						),
						graphicalAttributes: new NodeGraphicalAttributes(
							fromJS(action.graphicalAttributes),
						)
							.set('nodeSize', new SizeRecord(action.graphicalAttributes.nodeSize))
							.set(
								'position',
								new PositionRecord(action.graphicalAttributes.position),
							)
							.set(
								'properties',
								fromJS(action.graphicalAttributes.properties) || new Map(),
							),
					}),
				)
				.setIn(['out', action.nodeId], new Map())
				.setIn(['in', action.nodeId], new Map())
				.setIn(['childrens', action.nodeId], new Map())
				.setIn(['parents', action.nodeId], new Map());
		case FLOWDESIGNER_NODE_UPDATE:
			if (action.nodeId === Node.getId(action.node)) {
				return state.setIn(['nodes', Node.getId(action.node)], action.node);
			}
			// special case here, the id got changed and it have lots of implication
			return state
				.setIn(['nodes', Node.getId(action.node)], action.node)
				.deleteIn(['nodes', action.nodeId])
				.setIn(['out', Node.getId(action.node)], new Map())
				.setIn(['in', Node.getId(action.node)], new Map())
				.setIn(['childrens', Node.getId(action.node)], new Map())
				.setIn(['parents', Node.getId(action.node)], new Map());
		case FLOWDESIGNER_NODE_MOVE_START:
			if (!state.getIn('nodes', action.nodeId)) {
				invariant(false, `Can't move node ${action.nodeId} since it doesn't exist`);
			}
			return state.setIn(
				['nodes', action.nodeId, 'graphicalAttributes', 'properties', 'startPosition'],
				new PositionRecord(action.nodePosition),
			);
		case FLOWDESIGNER_NODE_MOVE:
			if (!state.getIn('nodes', action.nodeId)) {
				invariant(false, `Can't move node ${action.nodeId} since it doesn't exist`);
			}
			return state.setIn(
				['nodes', action.nodeId, 'graphicalAttributes', 'position'],
				new PositionRecord(action.nodePosition),
			);
		case FLOWDESIGNER_NODE_MOVE_END:
			if (!state.getIn('nodes', action.nodeId)) {
				invariant(false, `Can't move node ${action.nodeId} since it doesn't exist`);
			}
			return state
				.setIn(
					['nodes', action.nodeId, 'graphicalAttributes', 'position'],
					new PositionRecord(action.nodePosition),
				)
				.deleteIn([
					'nodes',
					action.nodeId,
					'graphicalAttributes',
					'properties',
					'startPosition',
				]);
		case FLOWDESIGNER_NODE_APPLY_MOVEMENT:
			return state.update('nodes', nodes =>
				nodes.map(node => {
					if (action.nodesId.find(id => id === node.id)) {
						return node
							.setIn(
								['graphicalAttributes', 'position', 'x'],
								node.getPosition().x + action.movement.x,
							)
							.setIn(
								['graphicalAttributes', 'position', 'y'],
								node.getPosition().y + action.movement.y,
							);
					}
					return node;
				}),
			);
		case FLOWDESIGNER_NODE_SET_SIZE:
			if (!state.getIn(['nodes', action.nodeId])) {
				invariant(false, `Can't set size on node ${action.nodeId} since it doesn't exist`);
			}
			return state.setIn(
				['nodes', action.nodeId, 'graphicalAttributes', 'nodeSize'],
				new SizeRecord(action.nodeSize),
			);
		case FLOWDESIGNER_NODE_SET_TYPE:
			if (!state.getIn(['nodes', action.nodeId])) {
				invariant(
					false,
					`Can't set node.type on node ${action.nodeid} since it doesn't exist`,
				);
			}
			return state.setIn(['nodes', action.nodeId, 'type'], action.nodeType);
		case FLOWDESIGNER_NODE_SET_GRAPHICAL_ATTRIBUTES:
			if (!state.getIn(['nodes', action.nodeId])) {
				invariant(
					false,
					`Can't set a graphical attribute on non existing node ${action.nodeId}`,
				);
			}
			try {
				return state.mergeIn(
					['nodes', action.nodeId, 'graphicalAttributes'],
					fromJS(action.graphicalAttributes),
				);
			} catch (error) {
				console.error(error);
				return state.mergeIn(
					['nodes', action.nodeId, 'graphicalAttributes', 'properties'],
					fromJS(action.graphicalAttributes),
				);
			}
		case FLOWDESIGNER_NODE_REMOVE_GRAPHICAL_ATTRIBUTES:
			if (!state.getIn(['nodes', action.nodeId])) {
				invariant(
					false,
					`Can't remove a graphical attribute on non existing node ${action.nodeId}`,
				);
			}
			return state.deleteIn([
				'nodes',
				action.nodeId,
				'graphicalAttributes',
				'properties',
				action.graphicalAttributesKey,
			]);
		case FLOWDESIGNER_NODE_SET_DATA:
			if (!state.getIn(['nodes', action.nodeId])) {
				invariant(false, `Can't set a data on non existing node ${action.nodeId}`);
			}
			try {
				return state.mergeIn(['nodes', action.nodeId, 'data'], fromJS(action.data));
			} catch (error) {
				console.error(error);
				return state.mergeIn(
					['nodes', action.nodeId, 'data', 'properties'],
					fromJS(action.data),
				);
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
			return inPort(state, action.nodeId)
				.reduce(
					(cumulativeState, port, key) => portReducer(cumulativeState, removePort(key)),
					outPort(state, action.nodeId).reduce(
						(cumulativeState, port, key) =>
							portReducer(cumulativeState, removePort(key)),
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
