import { createSelector } from 'reselect';
import memoize from 'lodash/memoize';
import { Map } from 'immutable';

import { Port } from '../api';
import { PORT_SINK, PORT_SOURCE } from '../constants/flowdesigner.constants';
import {
	PortRecordMap,
	PortRecord,
	NodeRecordMap,
	LinkRecordMap,
	State,
	LinkRecord,
} from '../customTypings/index.d';

const getNodes = (state: State): NodeRecordMap => state.get('nodes');
const getPorts = (state: State): PortRecordMap => state.get('ports');
const getLinks = (state: State): LinkRecordMap => state.get('links');

/**
 * return a list of outgoing port for this node
 */
export function outPort(state: State, nodeId: string) {
	return state.getIn(['out', nodeId]) || Map();
}

/**
 * return a list of ingoing port for this node
 */
export function inPort(state: State, nodeId: string) {
	return state.getIn(['in', nodeId]) || Map();
}

/**
 * Create and return function who will return all ports for a specific node
 * @return {getPortsForNode}
 */
export const getPortsForNode = createSelector(
	getPorts,
	(ports: PortRecordMap): PortRecord =>
		memoize((nodeId: string) =>
			ports.filter((port: PortRecord) => Port.getNodeId(port) === nodeId),
		),
);

/**
 * Get all the data Emitter port attached to every nodes as a single map of port
 * map key is the port id
 * @return Map
 */
export const getEmitterPorts = createSelector(
	getPorts,
	(ports: PortRecordMap): PortRecord =>
		ports.filter((port: any) => Port.getTopology(port) === PORT_SOURCE),
);

/**
 * Get all the data Sink port attached to every nodes as a single map of port
 * map key is the port id
 * @return Map
 */
export const getSinkPorts = createSelector(
	getPorts,
	(ports: PortRecordMap): PortRecord =>
		ports.filter((port: any) => Port.getTopology(port) === PORT_SINK),
);

/**
 * Create and return function who will return all Emitter ports for a specific node
 */
export const getEmitterPortsForNode = createSelector(
	getEmitterPorts,
	(ports: PortRecordMap): PortRecord => (nodeId: string) =>
		ports.filter((port: any) => Port.getNodeId(port) === nodeId),
);

/**
 * Create and return function who will return all Sink ports for a specific node
 */
export const getSinkPortsForNode = createSelector(
	getSinkPorts,
	(ports: PortRecordMap): PortRecord => (nodeId: string) =>
		ports.filter((port: any) => Port.getNodeId(port) === nodeId),
);

/**
 * Get all the data Sink port attached to every nodes not attached at a single edge
 * as a single map of port
 * map key is the port id
 * @return Map
 */
export const getFreeSinkPorts = createSelector(
	[getSinkPorts, getLinks],
	(sinkPorts: PortRecordMap, links: LinkRecordMap) => {
		return sinkPorts.filter(
			(sinkPort: PortRecord) =>
				!links.find((link: LinkRecord) => link.targetId === Port.getId(sinkPort)),
		) as PortRecordMap;
	},
);

/**
 * Get all the data Emitter port attached to every nodes not attached at a single edge
 * as a single map of port
 * map key is the port id
 * @return Map
 */
export const getFreeEmitterPorts = createSelector(
	[getEmitterPorts, getLinks],
	(emitterPorts: PortRecordMap, links: LinkRecordMap) =>
		emitterPorts.filter(
			(emitterPort: PortRecord) =>
				!links.find((link: LinkRecord) => link.sourceId === Port.getId(emitterPort)),
		),
);

/**
 * Get all the data sink port attached to every node not attached at a single edge
 * as single map of port with an generated attached key
 * map key is the port id
 * @return Map
 */
export const getActionKeyedPorts = createSelector(
	getFreeSinkPorts,
	(freeSinkPorts: PortRecordMap) =>
		freeSinkPorts.filter((sinkPort: { accessKey: any }) => sinkPort.accessKey),
);

export const getDetachedPorts = createSelector(
	[getPorts, getNodes],
	(ports: PortRecordMap, nodes: NodeRecordMap) =>
		ports.filter(
			(port: any) => !nodes.find((node: { id: any }) => node.id === Port.getNodeId(port)),
		),
);
