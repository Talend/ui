import React from 'react';
import renderer from 'react-test-renderer';

import Filter from './Filter.component';

jest.mock('react-dom');

describe('Filter', () => {
	it('should render its name', () => {
		const wrapper = renderer.create(<Filter name="Hello world" />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
