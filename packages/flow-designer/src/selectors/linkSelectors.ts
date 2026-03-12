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
	(links: LinkRecordMap, ports: PortRecordMap) =>
		Object.fromEntries(
			Object.entries(links || {}).filter(
				([, link]) =>
					!Object.values(ports || {}).find(
						(port: PortRecord) => port.id === (link as LinkRecord).sourceId,
					) ||
					!Object.values(ports || {}).find(
						(port: PortRecord) => port.id === (link as LinkRecord).targetId,
					),
			),
		),
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
	return Object.values(outMap).reduce<Record<string, string>>(
		(reduction, portLinks) => ({ ...reduction, ...(portLinks as Record<string, string>) }),
		{},
	);
}

/**
 * get inGoing linkId from a node
 *
 * @return number
 */
export function inLink(state: State, nodeId: Id) {
	const inMap = state.in?.[nodeId] || {};
	return Object.values(inMap).reduce<Record<string, string>>(
		(reduction, portLinks) => ({ ...reduction, ...(portLinks as Record<string, string>) }),
		{},
	);
}

export default getDetachedLinks;
