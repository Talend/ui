import { createSelector } from 'reselect';
import { Map } from 'immutable';

const getNodes = state => state.get('nodes');
const getPorts = state => state.get('ports');

export const getNodesWithPorts = createSelector(
	[getNodes, getPorts],
	(nodes, ports) => {
		let nodesWithPorts = new Map();
		nodes.forEach(node => {
			nodesWithPorts = nodesWithPorts.set(
				node.id, new Map({ node, ports: ports.filter(port => port.nodeId === node.id) })
			);
		});
		return nodesWithPorts;
	}
);

export default getNodesWithPorts;
