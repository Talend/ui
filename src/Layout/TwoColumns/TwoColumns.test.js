import React from 'react';
import renderer from 'react-test-renderer';

import TwoColumns from './TwoColumns.component';

describe('TwoColumns', () => {
	it('should render its name', () => {
		const wrapper = renderer.create(<TwoColumns name="Hello world" />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
