jest.mock('d3-selection', () => ({
	select() {
		return { data() {}, call() {} };
	},
}));

import React from 'react';
import renderer from 'react-test-renderer';

import AbstractNode from './AbstractNode.component';
import { NodeGraphicalAttributes, NodeRecord, PositionRecord, SizeRecord } from '../../constants/flowdesigner.model';

describe('<AbstractNode />', () => {
	it('renders correctly', () => {
		const node = new NodeRecord({
			id: 'id',
			graphicalAttributes: new NodeGraphicalAttributes({
				position: new PositionRecord({ x: 100, y: 100 }),
				nodeSize: new SizeRecord({ width: 125, height: 75 }),
			}),
		});
		const tree = renderer.create(
			<AbstractNode node={node}>
				<rect />
			</AbstractNode>,
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
