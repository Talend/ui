import React from 'react';
import renderer from 'react-test-renderer';

import App from './App.component';

describe('App', () => {
	it('should render its name', () => {
		const wrapper = renderer.create(<App name="Hello world" />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
