import { createSelector } from 'reselect';
import memoize from 'lodash/memoize';

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

const getNodes = (state: State): NodeRecordMap => state.nodes;
const getPorts = (state: State): PortRecordMap => state.ports;
const getLinks = (state: State): LinkRecordMap => state.links;

/**
 * return a list of outgoing port for this node
 */
export function outPort(state: State, nodeId: string) {
	return state.out?.[nodeId] || {};
}

/**
 * return a list of ingoing port for this node
 */
export function inPort(state: State, nodeId: string) {
	return state.in?.[nodeId] || {};
}

/**
 * Create and return function who will return all ports for a specific node
 * @return {getPortsForNode}
 */
export const getPortsForNode = createSelector(
	getPorts,
	(ports: PortRecordMap): PortRecord =>
		memoize((nodeId: string) =>
			Object.fromEntries(
				Object.entries(ports || {}).filter(
					([, port]) => Port.getNodeId(port as PortRecord) === nodeId,
				),
			),
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
		Object.fromEntries(
			Object.entries(ports || {}).filter(
				([, port]) => Port.getTopology(port as any) === PORT_SOURCE,
			),
		) as any,
);

/**
 * Get all the data Sink port attached to every nodes as a single map of port
 * map key is the port id
 * @return Map
 */
export const getSinkPorts = createSelector(
	getPorts,
	(ports: PortRecordMap): PortRecord =>
		Object.fromEntries(
			Object.entries(ports || {}).filter(([, port]) => Port.getTopology(port as any) === PORT_SINK),
		) as any,
);

/**
 * Create and return function who will return all Emitter ports for a specific node
 */
export const getEmitterPortsForNode = createSelector(
	getEmitterPorts as any,
	(ports: PortRecordMap): PortRecord =>
		(nodeId: string) =>
			Object.fromEntries(
				Object.entries(ports || {}).filter(([, port]) => Port.getNodeId(port as any) === nodeId),
			),
);

/**
 * Create and return function who will return all Sink ports for a specific node
 */
export const getSinkPortsForNode = createSelector(
	getSinkPorts as any,
	(ports: PortRecordMap): PortRecord =>
		(nodeId: string) =>
			Object.fromEntries(
				Object.entries(ports || {}).filter(([, port]) => Port.getNodeId(port as any) === nodeId),
			),
);

/**
 * Get all the data Sink port attached to every nodes not attached at a single edge
 * as a single map of port
 * map key is the port id
 * @return Map
 */
export const getFreeSinkPorts = createSelector(
	[getSinkPorts, getLinks],
	(sinkPorts: PortRecordMap, links: LinkRecordMap) =>
		Object.fromEntries(
			Object.entries(sinkPorts || {}).filter(
				([, sinkPort]) =>
					!Object.values(links || {}).find(
						(link: LinkRecord) => link.targetId === Port.getId(sinkPort as PortRecord),
					),
			),
		) as PortRecordMap,
);

/**
 * Get all the data Emitter port attached to every nodes not attached at a single edge
 * as a single map of port
 * map key is the port id
 * @return Map
 */
export const getFreeEmitterPorts = createSelector(
	[getEmitterPorts as any, getLinks as any],
	(emitterPorts: PortRecordMap, links: LinkRecordMap) =>
		Object.fromEntries(
			Object.entries(emitterPorts || {}).filter(
				([, emitterPort]) =>
					!Object.values(links || {}).find(
						(link: LinkRecord) => link.sourceId === Port.getId(emitterPort as PortRecord),
					),
			),
		),
);

/**
 * Get all the data sink port attached to every node not attached at a single edge
 * as single map of port with an generated attached key
 * map key is the port id
 * @return Map
 */
export const getActionKeyedPorts = createSelector(
	getFreeSinkPorts as any,
	(freeSinkPorts: PortRecordMap) =>
		Object.fromEntries(
			Object.entries(freeSinkPorts || {}).filter(([, sinkPort]) => (sinkPort as any).accessKey),
		),
);

export const getDetachedPorts = createSelector(
	[getPorts as any, getNodes as any],
	(ports: PortRecordMap, nodes: NodeRecordMap) =>
		Object.fromEntries(
			Object.entries(ports || {}).filter(
				([, port]) =>
					!Object.values(nodes || {}).find((node: any) => node.id === Port.getNodeId(port as any)),
			),
		),
);
