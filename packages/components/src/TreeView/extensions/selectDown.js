function threeStateFlow(checked) {
	if (checked === 'intermediate') {
		return false;
	} else if (checked === true) {
		return false;
	}

	return true;
}

function selectNodes(nodes, selected) {
	return nodes.map(n => ({
		...n,
		children: n.children ? selectNodes(n.children, selected) : [],
		state: {
			...n.state,
			selected,
		},
	}));
}
/*
export default function seledtDownHandler(nodes, updatedNode) {
	console.log('seledtDownHandler', nodes);
	console.log('updatedNode', updatedNode);
	console.log('atm nodes', updatedNode);
	const updatedNodes = nodes.map(node => {
		if (node.id === updatedNode.id) {
			return {
				...updatedNode,
				children: node.children ? selectNodes(node.children, updatedNode.state.selected) : [],
			};
		}

		if (node.children) {
			return { ...node, children: seledtDownHandler(node.children, updatedNode) };
		}

		return node;
	});
	return updatedNodes;
}
*/
