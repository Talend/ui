import { createSelector } from 'reselect';

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

export default getDetachedLinks;
