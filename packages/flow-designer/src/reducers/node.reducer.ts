import invariant from 'invariant';
import cloneDeep from 'lodash/cloneDeep';
import { removePort } from '../actions/port.actions';
import portReducer from './port.reducer';
import { outPort, inPort } from '../selectors/portSelectors';
import { setIn, deleteIn } from './state-utils';

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
import { Node } from '../api';
import {
	NodeRecord,
	PositionRecord,
	SizeRecord,
	NodeGraphicalAttributes,
	NodeData,
} from '../constants/flowdesigner.model';
import { Id, State, NodeRecord as NodeRecordType } from '../customTypings/index.d';

const nodeReducer = (state: State, action: any) => {
	switch (action.type) {
		case FLOWDESIGNER_NODE_ADD: {
			if (state.nodes?.[action.nodeId]) {
				invariant(false, `Can not create node ${action.nodeId} since it does already exist`);
			}
			return {
				...state,
				nodes: {
					...state.nodes,
					[action.nodeId]: new NodeRecord({
						id: action.nodeId,
						type: action.nodeType,
						data: new NodeData({
							...action.data,
							properties: cloneDeep(action.data?.properties) || {},
						}),
						graphicalAttributes: new NodeGraphicalAttributes(action.graphicalAttributes)
							.set('nodeSize', new SizeRecord(action.graphicalAttributes?.nodeSize))
							.set('position', new PositionRecord(action.graphicalAttributes?.position))
							.set('properties', cloneDeep(action.graphicalAttributes?.properties) || {}),
					}),
				},
				out: { ...state.out, [action.nodeId]: {} },
				in: { ...state.in, [action.nodeId]: {} },
				childrens: { ...state.childrens, [action.nodeId]: {} },
				parents: { ...state.parents, [action.nodeId]: {} },
			};
		}
		case FLOWDESIGNER_NODE_UPDATE: {
			const newId = Node.getId(action.node) as string;
			if (action.nodeId === newId) {
				return { ...state, nodes: { ...state.nodes, [newId]: action.node } };
			}
			const { [action.nodeId]: _removed, ...remainingNodes } = state.nodes || {};
			return {
				...state,
				nodes: { ...remainingNodes, [newId]: action.node },
				out: { ...state.out, [newId]: {} },
				in: { ...state.in, [newId]: {} },
				childrens: { ...state.childrens, [newId]: {} },
				parents: { ...state.parents, [newId]: {} },
			};
		}
		case FLOWDESIGNER_NODE_MOVE_START:
			if (!state.nodes?.[action.nodeId]) {
				invariant(false, `Can't move node ${action.nodeId} since it doesn't exist`);
			}
			return setIn(
				state,
				['nodes', action.nodeId, 'graphicalAttributes', 'properties', 'startPosition'],
				new PositionRecord(action.nodePosition),
			);
		case FLOWDESIGNER_NODE_MOVE:
			if (!state.nodes?.[action.nodeId]) {
				invariant(false, `Can't move node ${action.nodeId} since it doesn't exist`);
			}
			return setIn(
				state,
				['nodes', action.nodeId, 'graphicalAttributes', 'position'],
				new PositionRecord(action.nodePosition),
			);
		case FLOWDESIGNER_NODE_MOVE_END:
			if (!state.nodes?.[action.nodeId]) {
				invariant(false, `Can't move node ${action.nodeId} since it doesn't exist`);
			}
			return deleteIn(
				setIn(
					state,
					['nodes', action.nodeId, 'graphicalAttributes', 'position'],
					new PositionRecord(action.nodePosition),
				),
				['nodes', action.nodeId, 'graphicalAttributes', 'properties', 'startPosition'],
			);
		case FLOWDESIGNER_NODE_APPLY_MOVEMENT: {
			const updatedNodes = Object.fromEntries(
				Object.entries(state.nodes || {}).map(([id, node]) => {
					const n = node as NodeRecord;
					if (action.nodesId.find((nId: Id) => nId === n.id)) {
						return [
							id,
							n
								.setIn(
									['graphicalAttributes', 'position', 'x'],
									n.getPosition().x + action.movement.x,
								)
								.setIn(
									['graphicalAttributes', 'position', 'y'],
									n.getPosition().y + action.movement.y,
								),
						];
					}
					return [id, node];
				}),
			);
			return { ...state, nodes: updatedNodes };
		}
		case FLOWDESIGNER_NODE_SET_SIZE:
			if (!state.nodes?.[action.nodeId]) {
				invariant(false, `Can't set size on node ${action.nodeId} since it doesn't exist`);
			}
			return setIn(
				state,
				['nodes', action.nodeId, 'graphicalAttributes', 'nodeSize'],
				new SizeRecord(action.nodeSize),
			);
		case FLOWDESIGNER_NODE_SET_TYPE:
			if (!state.nodes?.[action.nodeId]) {
				invariant(false, `Can't set node.type on node ${action.nodeid} since it doesn't exist`);
			}
			return setIn(state, ['nodes', action.nodeId, 'type'], action.nodeType);
		case FLOWDESIGNER_NODE_SET_GRAPHICAL_ATTRIBUTES: {
			if (!state.nodes?.[action.nodeId]) {
				invariant(false, `Can't set a graphical attribute on non existing node ${action.nodeId}`);
			}
			const node = state.nodes[action.nodeId] as NodeRecord;
			try {
				return {
					...state,
					nodes: {
						...state.nodes,
						[action.nodeId]: node.set(
							'graphicalAttributes',
							node.graphicalAttributes.merge(action.graphicalAttributes),
						),
					},
				};
			} catch (error) {
				console.error(error);
				return {
					...state,
					nodes: {
						...state.nodes,
						[action.nodeId]: node.set(
							'graphicalAttributes',
							node.graphicalAttributes.set('properties', {
								...(node.graphicalAttributes?.properties || {}),
								...action.graphicalAttributes,
							}),
						),
					},
				};
			}
		}
		case FLOWDESIGNER_NODE_REMOVE_GRAPHICAL_ATTRIBUTES:
			if (!state.nodes?.[action.nodeId]) {
				invariant(
					false,
					`Can't remove a graphical attribute on non existing node ${action.nodeId}`,
				);
			}
			return deleteIn(state, [
				'nodes',
				action.nodeId,
				'graphicalAttributes',
				'properties',
				action.graphicalAttributesKey,
			]);
		case FLOWDESIGNER_NODE_SET_DATA: {
			if (!state.nodes?.[action.nodeId]) {
				invariant(false, `Can't set a data on non existing node ${action.nodeId}`);
			}
			const node = state.nodes[action.nodeId] as NodeRecord;
			try {
				return {
					...state,
					nodes: {
						...state.nodes,
						[action.nodeId]: node.set(
							'data',
							new NodeData({ ...(node.data as any), ...action.data }),
						),
					},
				};
			} catch (error) {
				console.error(error);
				return setIn(state, ['nodes', action.nodeId, 'data', 'properties'], {
					...(node.data as any)?.properties,
					...action.data,
				});
			}
		}
		case FLOWDESIGNER_NODE_REMOVE_DATA:
			if (!state.nodes?.[action.nodeId]) {
				invariant(false, `Can't remove a data on non existing node ${action.nodeId}`);
			}
			return deleteIn(state, ['nodes', action.nodeId, 'data', 'properties', action.dataKey]);
		case FLOWDESIGNER_NODE_REMOVE: {
			if (!state.nodes?.[action.nodeId]) {
				invariant(false, `Can not remove node ${action.nodeId} since it doesn't exist`);
			}
			const outPorts = outPort(state, action.nodeId);
			const inPorts = inPort(state, action.nodeId);
			let newState = Object.entries(outPorts).reduce<State>(
				(cumulativeState, [key]) => portReducer(cumulativeState, removePort(key)),
				state,
			);
			newState = Object.entries(inPorts).reduce<State>(
				(cumulativeState, [key]) => portReducer(cumulativeState, removePort(key)),
				newState,
			);
			newState = deleteIn(newState, ['nodes', action.nodeId]);
			newState = deleteIn(newState, ['out', action.nodeId]);
			newState = deleteIn(newState, ['in', action.nodeId]);
			newState = deleteIn(newState, ['childrens', action.nodeId]);
			newState = deleteIn(newState, ['parents', action.nodeId]);
			return newState;
		}
		default:
			return state;
	}
};

export default nodeReducer;
