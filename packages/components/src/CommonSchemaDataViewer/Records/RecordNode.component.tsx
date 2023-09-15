import { SampleNode } from '../CommonDataViewer.types';

export type RecordNodeProps = {
	node: SampleNode;
	path: string[];
};

export function RecordNode({ node, path }: RecordNodeProps) {
	return <div>{node.name}</div>;
}
