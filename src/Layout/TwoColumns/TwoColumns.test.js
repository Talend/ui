import React from 'react';
import renderer from 'react-test-renderer';

import TwoColumns from './TwoColumns.component';

describe('TwoColumns', () => {
	it('should render two columns', () => {
		const wrapper = renderer.create(
			<TwoColumns one="Hello world">
				<span>children</span>
			</TwoColumns>).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
