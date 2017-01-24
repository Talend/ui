import React from 'react';
import renderer from 'react-test-renderer';

import Home from './Home.component';

describe('Home', () => {
	it('should render its name', () => {
		const wrapper = renderer.create(<Home name="Hello world" />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
