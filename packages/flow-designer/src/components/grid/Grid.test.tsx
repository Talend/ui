import renderer from 'react-test-renderer';

import Grid from './Grid.component';

describe('Grid.component', () => {
	it('should render a grid by default', () => {
		const tree = renderer.create(<Grid transformData={{ k: 1, x: 0, y: 0 }} />);
		expect(tree).toMatchSnapshot();
	});
});
