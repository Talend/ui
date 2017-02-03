import React from 'react';
import renderer from 'react-test-renderer';

import TwoColumns from './TwoColumns.component';

describe('TwoColumns', () => {
	it('should render two columns', () => {
		// given
		const one = <div>Hello world</div>;

		// when
		const wrapper = renderer.create(
			<TwoColumns one={one} style={{ display: 'flex' }}>
				<span>children</span>
			</TwoColumns>
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
