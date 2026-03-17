import { createSelector } from 'reselect';
import { Map } from 'immutable';
import {
	State,
	PortRecordMap,
	LinkRecordMap,
	LinkRecord,
	PortRecord,
	Id,
} from '../customTypings/index.d';

const getPorts = (state: State): PortRecordMap => state.get('ports');
const getLinks = (state: State): LinkRecordMap => state.get('links');

export const getDetachedLinks = createSelector(
	[getLinks, getPorts],
	(links: LinkRecordMap, ports: PortRecordMap) =>
		links.filter(
			(link: LinkRecord) =>
				!ports.find((port: PortRecord) => port.id === link.sourceId) ||
				!ports.find((port: PortRecord) => port.id === link.targetId),
		),
);

/**
 * get outgoing link from a port
 *
 * @return {Link}
 */
export function portOutLink(state: State, portId: Id) {
	return state.get('links').filter((link: LinkRecord) => link.sourceId === portId) || Map();
}

/**
 * get ingoing link from a port
 *
 * @return {Link}
 */
export function portInLink(state: State, portId: Id) {
	return state.get('links').filter((link: LinkRecord) => link.targetId === portId) || Map();
}

/**
 * get outgoing linkId from a node
 *
 * @return number
 */
export function outLink(state: State, nodeId: Id) {
	return state
		.getIn(['out', nodeId])
		.reduce((reduction: PortRecordMap, port: PortRecord) => reduction.merge(port), Map());
}

/**
 * get inGoing linkId from a node
 *
 * @return number
 */
export function inLink(state: State, nodeId: Id) {
	return state
		.getIn(['in', nodeId])
		.reduce((reduction: PortRecordMap, port: PortRecord) => reduction.merge(port), Map());
}

export default getDetachedLinks;
