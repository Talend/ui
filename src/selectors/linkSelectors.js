import { createSelector } from 'reselect';
import { Map } from 'immutable';

const getPorts = state => state.get('ports');
const getLinks = state => state.get('links');

export const getDetachedLinks = createSelector(
	[getLinks, getPorts],
	(links, ports) => (
		links.filter(
			link => !ports.find(port => port.id === link.sourceId)
				|| !ports.find(port => port.id === link.targetId)
		)
	)
);

/**
 * get outgoing link from a port
 *
 * @return {Link}
 */
export function portOutLink(state, portId) {
	return state.get('links').filter(link => link.sourceId === portId) || new Map();
}

/**
 * get ingoing link from a port
 *
 * @return {Link}
 */
export function portInLink(state, portId) {
	return state.get('links').filter(link => link.targetId === portId) || new Map();
}

/**
 * get outgoing linkId from a node
 *
 * @return number
 */
export function outLink(state, nodeId) {
	return state.getIn(['out', nodeId]).reduce((reduction, port) =>
		reduction.merge(port)
	, new Map());
}

/**
 * get inGoing linkId from a node
 *
 * @return number
 */
export function inLink(state, nodeId) {
	return state.getIn(['in', nodeId]).reduce((reduction, port) =>
		reduction.merge(port)
	, new Map());
}

export default getDetachedLinks;
