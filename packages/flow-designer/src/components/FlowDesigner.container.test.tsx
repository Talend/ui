import renderer from 'react-test-renderer';

import { FlowDesigner } from './FlowDesigner.container';
import NodeType from './configuration/NodeType.component';
import { NodeRecordMap, PortRecordMap, LinkRecordMap } from '../customTypings/index.d';

vi.mock('./ZoomHandler.component');
vi.mock('./grid/Grid.component', () => {
	return {
		default: () => null,
	};
});

const noOp = () => {};

describe('<FlowDesigner /> renders correctly', () => {
	it('<FlowDesigner /> renders correctly', () => {
		const nodes: NodeRecordMap = {};
		const ports: PortRecordMap = {};
		const links: LinkRecordMap = {};
		const tree = renderer
			.create(
				<FlowDesigner
					startMoveNodeTo={noOp}
					moveNodeTo={noOp}
					moveNodeToEnd={noOp}
					setNodeTypes={noOp}
					nodes={nodes}
					ports={ports}
					links={links}
					reduxMountPoint="mountPoint"
				>
					<NodeType type="test" component={NodeType} />
					<NodeType type="test2" component={NodeType} />
				</FlowDesigner>,
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
