import renderer from 'react-test-renderer';

import AbstractNode from './AbstractNode.component';
import {
	NodeGraphicalAttributes,
	NodeRecord,
	PositionRecord,
	SizeRecord,
} from '../../constants/flowdesigner.model';

jest.mock('d3', () => {
	const original = jest.requireActual('d3');
	return {
		...original,
		select() {
			return { data() {}, call() {} };
		},
	};
});

const noOp = () => {};

describe('<AbstractNode />', () => {
	it('renders correctly', () => {
		const node = new NodeRecord({
			id: 'id',
			graphicalAttributes: new NodeGraphicalAttributes({
				position: new PositionRecord({ x: 100, y: 100 }),
				nodeSize: new SizeRecord({ width: 125, height: 75 }),
			}),
		});
		const tree = renderer
			.create(
				<AbstractNode node={node} startMoveNodeTo={noOp} moveNodeTo={noOp} moveNodeToEnd={noOp}>
					<rect />
				</AbstractNode>,
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
