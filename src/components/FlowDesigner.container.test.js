import React from 'react';
import renderer from 'react-test-renderer';
import { Map } from 'immutable';

import { FlowDesigner } from './FlowDesigner.container';
import NodeType from './configuration/NodeType.component';

jest.mock('./ZoomHandler.component');

const noOp = () => {};

describe('<FlowDesigner /> renders correctly', () => {
	it('<FlowDesigner /> renders correctly', () => {
		const mockGrid = <g />;
		const nodes = new Map();
		const ports = new Map();
		const links = new Map();
		const tree = renderer
			.create(
				<FlowDesigner
					moveNodeTo={noOp}
					moveNodeToEnd={noOp}
					setNodeTypes={noOp}
					nodes={nodes}
					ports={ports}
					links={links}
					grid={mockGrid}
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
