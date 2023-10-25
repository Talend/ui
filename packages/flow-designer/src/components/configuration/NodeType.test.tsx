import { render } from '@testing-library/react';
import NodeType from './NodeType.component';

const MockComponent = () => <div />;
MockComponent.displayName = 'MockComponent';

describe('Testing <NodeType>', () => {
	it('should log an error if rendered', () => {
		expect(() => {
			render(<NodeType type="string" component={MockComponent} />);
		}).toThrowError(
			'<NodeType> elements are for DataFlow configuration only and should not be rendered',
		);
	});
});
