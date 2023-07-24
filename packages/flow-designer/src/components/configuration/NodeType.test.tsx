import { render } from '@testing-library/react';
import NodeType from './NodeType.component';

const mockComponent = () => <div />;

describe('Testing <NodeType>', () => {
	it('should log an error if rendered', () => {
		expect(() => {
			render(<NodeType type="string" component={mockComponent} />);
		}).toThrowError(
			'<NodeType> elements are for DataFlow configuration only and should not be rendered',
		);
	});
});
