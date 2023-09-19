import { SampleArray, SampleItem, SampleLeaf, SampleNode } from '../CommonDataViewer.types';
import { RecordArray } from './RecordArray.component';
import { RecordLeaf } from './RecordLeaf.component';
import { RecordNode } from './RecordNode.component';

export function renderRecordNode(node: SampleItem, path: string[], key?: string | number) {
	if (node.hasOwnProperty('fields')) {
		return <RecordNode node={node as SampleNode} path={path} key={key} />;
	}
	if (node.hasOwnProperty('items')) {
		return <RecordArray array={node as SampleArray} path={path} key={key} />;
	}
	return <RecordLeaf leaf={node as SampleLeaf} path={path} key={key} />;
}
