import type { ComponentType } from 'react';
import invariant from 'invariant';

export type NodeTypeProps = {
	type: string;
	component: ComponentType<any>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function NodeType({ type, component }: NodeTypeProps) {
	invariant(
		false,
		'<NodeType> elements are for DataFlow configuration only and should not be rendered',
	);
	return null;
}

NodeType.displayName = 'NodeType';

export default NodeType;
