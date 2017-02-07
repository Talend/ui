import React from 'react';
import renderer from 'react-test-renderer';

import Grid from './Grid.component';

describe('Grid.component', () => {
	it('should render a grid by default', () => {
		const tree = renderer.create(<Grid transform={{ k: 1, x: 0, y: 0 }} />);
		expect(tree).toMatchSnapshot();
	});

	it('should render custom component with transform injected', () => {
		function component() {
			return <g />;
		}
		const tree = renderer.create(
			<Grid transform={{ k: 1, x: 0, y: 0 }} gridComponent={component} />,
		);
		expect(tree).toMatchSnapshot();
	});
});
