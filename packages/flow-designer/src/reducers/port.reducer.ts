import invariant from 'invariant';
import cloneDeep from 'lodash/cloneDeep';

import {
	PortRecord,
	PortData,
	PortGraphicalAttributes,
	PositionRecord,
} from '../constants/flowdesigner.model';
import { removeLink } from '../actions/link.actions';
import linkReducer from './link.reducer';
import { portOutLink, portInLink } from '../selectors/linkSelectors';

import {
	FLOWDESIGNER_PORT_ADD,
	FLOWDESIGNER_PORT_ADDS,
	FLOWDESIGNER_PORT_SET_GRAPHICAL_ATTRIBUTES,
	FLOWDESIGNER_PORT_REMOVE_GRAPHICAL_ATTRIBUTES,
	FLOWDESIGNER_PORT_SET_DATA,
	FLOWDESIGNER_PORT_REMOVE_DATA,
	FLOWDESIGNER_PORT_REMOVE,
	PORT_SINK,
	PORT_SOURCE,
} from '../constants/flowdesigner.constants';
import {
	PortRecordMap,
	Id,
	LinkRecord as LinkRecordType,
	PortRecord as PortRecordType,
	PortDirection,
	State,
	PortAction,
} from '../customTypings/index.d';
import { setIn, deleteIn } from './state-utils';

/**
 * get ports attached to a node
 */
function filterPortsByNode(ports: PortRecordMap, nodeId: Id): PortRecordMap {
	return Object.fromEntries(
		Object.entries(ports).filter(([, port]) => (port as PortRecordType).nodeId === nodeId),
	) as PortRecordMap;
}

/**
 * get ports of direction EMITTER or SINK
 */
function filterPortsByDirection(ports: PortRecordMap, direction: PortDirection): PortRecordMap {
	return Object.fromEntries(
		Object.entries(ports).filter(
			([, port]) => (port as PortRecordType).getPortDirection() === direction,
		),
	) as PortRecordMap;
}

/**
 * for a new port calculate its index by retrieving all its siblings
 */
function calculateNewPortIndex(ports: PortRecordMap, port: PortRecordType): number {
	return Object.keys(
		filterPortsByDirection(
			filterPortsByNode(ports, port.nodeId),
			port.graphicalAttributes.properties.type,
		),
	).length;
}

function indexPortMap(ports: PortRecordMap): PortRecordMap {
	let i = 0;
	return Object.fromEntries(
		Object.entries(ports)
			.sort(([, a], [, b]) => {
				const pa = a as PortRecordType;
				const pb = b as PortRecordType;
				if (pa.getIndex() < pb.getIndex()) return -1;
				if (pa.getIndex() > pb.getIndex()) return 1;
				return 0;
			})
			.map(([k, port]) => {
				i += 1;
				return [k, (port as PortRecordType).setIndex(i - 1)];
			}),
	) as PortRecordMap;
}

/**
 * @todo migration to new API
 * @param {*} state
 * @param {*} port
 */
function setPort(state: State, port: PortRecordType) {
	const index: number =
		port.graphicalAttributes.properties.index || calculateNewPortIndex(state.ports, port);
	const newState: State = {
		...state,
		ports: {
			...state.ports,
			[port.id]: new PortRecord({
				id: port.id,
				nodeId: port.nodeId,
				data: new PortData({
					...port.data,
					properties: cloneDeep((port.data as any)?.properties) || {},
				}),
				graphicalAttributes: new PortGraphicalAttributes({
					...port.graphicalAttributes,
					position: new PositionRecord(port.graphicalAttributes.position),
					properties: {
						index,
						...(port.graphicalAttributes?.properties || {}),
					},
				}),
			}),
		},
	};
	const type = port.graphicalAttributes.properties.type;
	if (type === PORT_SOURCE) {
		return setIn(newState, ['out', port.nodeId, port.id], {});
	} else if (type === PORT_SINK) {
		return setIn(newState, ['in', port.nodeId, port.id], {});
	}
	invariant(
		false,
		`Can't set a new port ${port.id} if it
		data.graphicalAttributes.properties.type !== EMITTER || SINK,
		given ${port.graphicalAttributes.properties.type}`,
	);
	return state;
}

export default function portReducer(state: State, action: PortAction): State {
	switch (action.type) {
		case FLOWDESIGNER_PORT_ADD:
			if (!state.nodes?.[action.nodeId]) {
				invariant(false, `Can't set a new port ${action.id} on non existing node ${action.nodeId}`);
			}

			return setPort(state, {
				id: action.id,
				nodeId: action.nodeId,
				data: action.data,
				graphicalAttributes: action.graphicalAttributes,
			});
		case FLOWDESIGNER_PORT_ADDS: {
			const localAction = action;
			if (!state.nodes?.[action.nodeId]) {
				invariant(false, `Can't set a new ports on non existing node ${action.nodeId}`);
			}
			return action.ports.reduce(
				(cumulatedState, port) =>
					setPort(cumulatedState, {
						id: port.id,
						nodeId: localAction.nodeId,
						data: port.data,
						graphicalAttributes: port.graphicalAttributes,
					}),
				state,
			);
		}
		case FLOWDESIGNER_PORT_SET_GRAPHICAL_ATTRIBUTES: {
			if (!state.ports?.[action.portId]) {
				invariant(false, `Can't set an graphical attribute on non existing port ${action.portId}`);
			}

			const port = state.ports[action.portId] as PortRecord;
			try {
				return {
					...state,
					ports: {
						...state.ports,
						[action.portId]: port.set(
							'graphicalAttributes',
							port.graphicalAttributes.merge(action.graphicalAttributes),
						),
					},
				};
			} catch (error) {
				console.error(error);
				return {
					...state,
					ports: {
						...state.ports,
						[action.portId]: port.set(
							'graphicalAttributes',
							port.graphicalAttributes.set('properties', {
								...(port.graphicalAttributes?.properties || {}),
								...action.graphicalAttributes,
							}),
						),
					},
				};
			}
		}
		case FLOWDESIGNER_PORT_REMOVE_GRAPHICAL_ATTRIBUTES:
			if (!state.ports?.[action.portId]) {
				invariant(
					false,
					`Can't remove a graphical attribute on non existing port ${action.portId}`,
				);
			}

			return deleteIn(state, [
				'ports',
				action.portId,
				'graphicalAttributes',
				'properties',
				action.graphicalAttributesKey,
			]);
		case FLOWDESIGNER_PORT_SET_DATA: {
			if (!state.ports?.[action.portId]) {
				invariant(false, `Can't set a data on non existing port ${action.portId}`);
			}

			const port = state.ports[action.portId] as PortRecord;
			try {
				return {
					...state,
					ports: {
						...state.ports,
						[action.portId]: port.set(
							'data',
							new PortData({ ...(port.data as any), ...action.data }),
						),
					},
				};
			} catch (error) {
				console.error(error);
				return setIn(state, ['ports', action.portId, 'data', 'properties'], {
					...(port.data as any)?.properties,
					...action.data,
				});
			}
		}
		case FLOWDESIGNER_PORT_REMOVE_DATA:
			if (!state.ports?.[action.portId]) {
				invariant(false, `Can't remove a data on non existing port ${action.portId}`);
			}

			return deleteIn(state, ['ports', action.portId, 'data', 'properties', action.dataKey]);
		case FLOWDESIGNER_PORT_REMOVE: {
			if (!state.ports?.[action.portId]) {
				invariant(false, `Can not remove port ${action.portId} since it doesn't exist`);
			}
			const port = state.ports[action.portId] as PortRecord;
			if (port) {
				const outLinks = Object.values(portOutLink(state, action.portId));
				const inLinks = Object.values(portInLink(state, action.portId));

				let newState: State = [...outLinks, ...inLinks].reduce<State>(
					(cumulativeState, link) =>
						linkReducer(cumulativeState, removeLink((link as LinkRecordType).id)),
					state,
				);

				newState = deleteIn(newState, ['ports', action.portId]);
				newState = deleteIn(newState, ['out', port.nodeId, action.portId]);
				newState = deleteIn(newState, ['in', port.nodeId, action.portId]);

				const reindexed = indexPortMap(
					filterPortsByDirection(
						filterPortsByNode(newState.ports, port.nodeId),
						port.getPortDirection(),
					),
				);

				return {
					...newState,
					ports: {
						...newState.ports,
						...reindexed,
					},
				};
			}
			return state;
		}
		default:
			return state;
	}
}
