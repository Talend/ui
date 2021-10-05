import React from 'react';
import invariant from 'invariant';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function NodeType({ type, component }: { type: string; component: React.ReactNode }) {
	invariant(
		false,
		'<NodeType> elements are for DataFlow configuration only and should not be rendered',
	);
	return null;
}

NodeType.displayName = 'NodeType';

export default NodeType;
