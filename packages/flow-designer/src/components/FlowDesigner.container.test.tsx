import React from 'react';
import renderer from 'react-test-renderer';
import { Map } from 'immutable';

import { FlowDesigner } from './FlowDesigner.container';
import NodeType from './configuration/NodeType.component';
import { NodeRecord, Id, PortRecord, LinkRecord } from '../customTypings/index.d';

jest.mock('./ZoomHandler.component');
jest.mock('./grid/Grid.component', () => {
	return null;
});

const noOp = () => {};

describe('<FlowDesigner /> renders correctly', () => {
	it('<FlowDesigner /> renders correctly', () => {
		const nodes = Map<Id, NodeRecord>();
		const ports = Map<Id, PortRecord>();
		const links = Map<Id, LinkRecord>();
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
