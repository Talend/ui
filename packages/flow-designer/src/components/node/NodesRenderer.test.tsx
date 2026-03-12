import renderer from 'react-test-renderer';

import NodesRenderer from './NodesRenderer.component';
import {
	NestedNodeRecord,
	NodeRecord,
	NodeGraphicalAttributes,
} from '../../constants/flowdesigner.model';
import { NodeRecordMap } from '../../customTypings/index.d';

const MockNode = () => <span>MockNodes</span>;

const noOp = () => {};

describe('<NodesRenderer />', () => {
	it('renders correctly', () => {
		const nodes: NodeRecordMap = {
			id: new NodeRecord({
				id: 'id',
				type: 'id',
				graphicalAttributes: new NodeGraphicalAttributes({
					nodeType: 'id',
				}),
			}),
		};
		const nodeTypeMap = { id: { id: 'id', component: MockNode } };
		const tree = renderer
			.create(
				<NodesRenderer
					nodes={nodes}
					nodeTypeMap={nodeTypeMap}
					startMoveNodeTo={noOp}
					moveNodeTo={noOp}
					moveNodeToEnd={noOp}
					snapToGrid
				/>,
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('renders correctly if nested', () => {
		const nodes: NodeRecordMap = {
			id: new NestedNodeRecord({
				id: 'id',
				type: 'id',
				graphicalAttributes: new NodeGraphicalAttributes({
					nodeType: 'id',
				}),
				components: {},
			}),
		};
		const nodeTypeMap = { id: { id: 'id', component: MockNode } };
		const tree = renderer
			.create(
				<NodesRenderer
					nodes={nodes}
					nodeTypeMap={nodeTypeMap}
					startMoveNodeTo={noOp}
					moveNodeTo={noOp}
					moveNodeToEnd={noOp}
					snapToGrid
				/>,
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
