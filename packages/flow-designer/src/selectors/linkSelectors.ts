import { createSelector } from 'reselect';
import {
	State,
	PortRecordMap,
	LinkRecordMap,
	LinkRecord,
	PortRecord,
	Id,
} from '../customTypings/index.d';

const getPorts = (state: State): PortRecordMap => state.ports;
const getLinks = (state: State): LinkRecordMap => state.links;

export const getDetachedLinks = createSelector(
	[getLinks, getPorts],
	(links: LinkRecordMap, ports: PortRecordMap) => {
		const portIds = new Set(Object.values(ports || {}).map((port: PortRecord) => port.id));
		return Object.fromEntries(
			Object.entries(links || {}).filter(
				([, link]) =>
					!portIds.has((link as LinkRecord).sourceId) ||
					!portIds.has((link as LinkRecord).targetId),
			),
		);
	},
);

/**
 * get outgoing link from a port
 *
 * @return {Link}
 */
export function portOutLink(state: State, portId: Id) {
	const links = state.links || {};
	return Object.fromEntries(
		Object.entries(links).filter(([, link]) => (link as LinkRecord).sourceId === portId),
	);
}

/**
 * get ingoing link from a port
 *
 * @return {Link}
 */
export function portInLink(state: State, portId: Id) {
	const links = state.links || {};
	return Object.fromEntries(
		Object.entries(links).filter(([, link]) => (link as LinkRecord).targetId === portId),
	);
}

/**
 * get outgoing linkId from a node
 *
 * @return number
 */
export function outLink(state: State, nodeId: Id) {
	const outMap = state.out?.[nodeId] || {};
	return Object.assign({}, ...Object.values(outMap)) as Record<string, string>;
}

/**
 * get inGoing linkId from a node
 *
 * @return number
 */
export function inLink(state: State, nodeId: Id) {
	const inMap = state.in?.[nodeId] || {};
	return Object.assign({}, ...Object.values(inMap)) as Record<string, string>;
}

export default getDetachedLinks;
