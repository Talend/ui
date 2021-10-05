import invariant from 'invariant';
import { Map, fromJS } from 'immutable';

import { PortRecord, PositionRecord } from '../constants/flowdesigner.model';
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

/**
 * get ports attached to a node
 */
function filterPortsByNode(ports: PortRecordMap, nodeId: Id): PortRecordMap {
	return ports.filter((port: PortRecordType) => port.nodeId === nodeId) as PortRecordMap;
}

/**
 * get ports of direction EMITTER or SINK
 */
function filterPortsByDirection(ports: PortRecordMap, direction: PortDirection): PortRecordMap {
	return ports.filter(
		(port: PortRecordType) => port.getPortDirection() === direction,
	) as PortRecordMap;
}

/**
 * for a new port calculate its index by retrieving all its siblings
 */
function calculateNewPortIndex(ports: PortRecordMap, port: PortRecordType): number {
	return filterPortsByDirection(
		filterPortsByNode(ports, port.nodeId),
		port.graphicalAttributes.properties.type,
	).size;
}

function indexPortMap(ports: PortRecordMap): PortRecordMap {
	let i = 0;
	return ports
		.sort((a, b) => {
			if (a.getIndex() < b.getIndex()) {
				return -1;
			}
			if (a.getIndex() > b.getIndex()) {
				return 1;
			}
			return 0;
		})
		.map(port => {
			i += 1;
			return port.setIndex(i - 1);
		}) as PortRecordMap;
}

/**
 * @todo migration to new API
 * @param {*} state
 * @param {*} port
 */
function setPort(state: State, port: PortRecordType) {
	const index: number =
		port.graphicalAttributes.properties.index ||
		calculateNewPortIndex(state.get('ports'), port);
	const newState = state.setIn(
		['ports', port.id],
		new PortRecord({
			id: port.id,
			nodeId: port.nodeId,
			data: Map(port.data).set(
				'properties',
				fromJS(port.data && port.data.properties) || Map(),
			),
			graphicalAttributes: Map(port.graphicalAttributes)
				.set('position', new PositionRecord(port.graphicalAttributes.position))
				.set(
					'properties',
					fromJS(
						port.graphicalAttributes && {
							index,
							...port.graphicalAttributes.properties,
						},
					) || Map(),
				),
		}),
	);
	const type = port.graphicalAttributes.properties.type;
	if (type === PORT_SOURCE) {
		return newState.setIn(['out', port.nodeId, port.id], Map());
	} else if (type === PORT_SINK) {
		return newState.setIn(['in', port.nodeId, port.id], Map());
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
			if (!state.getIn(['nodes', action.nodeId])) {
				invariant(
					false,
					`Can't set a new port ${action.id} on non existing node ${action.nodeId}`,
				);
			}

			return setPort(state, {
				id: action.id,
				nodeId: action.nodeId,
				data: action.data,
				graphicalAttributes: action.graphicalAttributes,
			});
		case FLOWDESIGNER_PORT_ADDS: {
			const localAction = action;
			if (!state.getIn(['nodes', action.nodeId])) {
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
		case FLOWDESIGNER_PORT_SET_GRAPHICAL_ATTRIBUTES:
			if (!state.getIn(['ports', action.portId])) {
				invariant(
					false,
					`Can't set an graphical attribute on non existing port ${action.portId}`,
				);
			}

			try {
				return state.mergeIn(
					['ports', action.portId, 'graphicalAttributes'],
					fromJS(action.graphicalAttributes),
				);
			} catch (error) {
				console.error(error);
				return state.mergeIn(
					['ports', action.portId, 'graphicalAttributes', 'properties'],
					fromJS(action.graphicalAttributes),
				);
			}

		case FLOWDESIGNER_PORT_REMOVE_GRAPHICAL_ATTRIBUTES:
			if (!state.getIn(['ports', action.portId])) {
				invariant(
					false,
					`Can't remove a graphical attribute on non existing port ${action.portId}`,
				);
			}

			return state.deleteIn([
				'ports',
				action.portId,
				'graphicalAttributes',
				'properties',
				action.graphicalAttributesKey,
			]);
		case FLOWDESIGNER_PORT_SET_DATA:
			if (!state.getIn(['ports', action.portId])) {
				invariant(false, `Can't set a data on non existing port ${action.portId}`);
			}

			try {
				return state.mergeIn(['ports', action.portId, 'data'], fromJS(action.data));
			} catch (error) {
				console.error(error);
				return state.mergeIn(
					['ports', action.portId, 'data', 'properties'],
					fromJS(action.data),
				);
			}

		case FLOWDESIGNER_PORT_REMOVE_DATA:
			if (!state.getIn(['ports', action.portId])) {
				invariant(false, `Can't remove a data on non existing port ${action.portId}`);
			}

			return state.deleteIn(['ports', action.portId, 'data', 'properties', action.dataKey]);
		case FLOWDESIGNER_PORT_REMOVE: {
			if (!state.getIn(['ports', action.portId])) {
				invariant(false, `Can not remove port ${action.portId} since it doesn't exist`);
			}
			const port: PortRecordType | null | undefined = state.getIn(['ports', action.portId]);
			if (port) {
				const newState = portInLink(state, action.portId)
					.reduce(
						(cumulativeState: State, link: LinkRecordType) =>
							linkReducer(cumulativeState, removeLink(link.id)),
						portOutLink(state, action.portId).reduce(
							(cumulativeState: State, link: LinkRecordType) =>
								linkReducer(cumulativeState, removeLink(link.id)),
							state,
						),
					)
					.deleteIn(['ports', action.portId])
					.deleteIn([
						'out',
						state.getIn(['ports', action.portId, 'nodeId']),
						action.portId,
					])
					.deleteIn([
						'in',
						state.getIn(['ports', action.portId, 'nodeId']),
						action.portId,
					]);
				return newState.mergeDeep({
					ports: indexPortMap(
						filterPortsByDirection(
							filterPortsByNode(newState.get('ports'), port.nodeId),
							port.getPortDirection(),
						),
					),
				});
			}
			return state;
		}
		default:
			return state;
	}
}
