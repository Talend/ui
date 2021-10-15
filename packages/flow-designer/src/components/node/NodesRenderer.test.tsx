import React from 'react';
import renderer from 'react-test-renderer';
import { List, Map } from 'immutable';

import NodesRenderer from './NodesRenderer.component';
import { NestedNodeRecord, NodeRecord, NodeGraphicalAttributes } from '../../constants/flowdesigner.model';
import { NodeRecord as NodeRecordType } from '../../customTypings/index.d';

const MockNode = () => <span>MockNodes</span>;

const noOp = () => {};

describe('<NodesRenderer />', () => {
	it('renders correctly', () => {
		const nodes = Map<string, NodeRecordType>().set(
			'id',
			new NodeRecord({
				id: 'id',
				type: 'id',
				graphicalAttributes: new NodeGraphicalAttributes({
					nodeType: 'id',
				}),
			}),
		);
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
		const nodes = Map<string, NodeRecordType>().set(
			'id',
			new NestedNodeRecord({
				id: 'id',
				type: 'id',
				graphicalAttributes: new NodeGraphicalAttributes({
					nodeType: 'id',
				}),
				components: List(),
			}),
		);
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
