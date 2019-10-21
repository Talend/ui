function threeStateFlow(checked) {
	if (checked === 'intermediate') {
		return false;
	} else if (checked === true) {
		return false;
	}

	return true;
}

function selectNodes(nodes, checked) {
	return nodes.map(n => ({
		...n,
		children: n.children ? selectNodes(n.children, checked) : [],
		state: {
			...n.state,
			checked,
		},
	}));
}

export default function nodeSelectionHandler(nodes, updatedNode) {
	console.log('nodeSelectionHandler', nodes);
	console.log('updatedNode', updatedNode);

	debugger;
	const updatedNodes = nodes.map(node => {
		if (node.id === updatedNode.id) {
			return {
				...updatedNode,
				children: node.children ? selectNodes(node.children, updatedNode.state.selected) : [],
			};
		}

		if (node.children) {
			return { ...node, children: nodeSelectionHandler(node.children, updatedNode) };
		}

		return node;
	});
	return updatedNodes;
}
