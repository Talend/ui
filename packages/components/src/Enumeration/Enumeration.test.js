import React from 'react';
import renderer from 'react-test-renderer';

import Enumeration from './Enumeration.component';

describe('Enumeration', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Enumeration name="Hello world" />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
