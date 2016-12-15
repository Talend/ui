import React from 'react';
import renderer from 'react-test-renderer';

import Filter from './Filter.component';

jest.mock('react-dom');

describe('Filter', () => {
	it('should render its name', () => {
		// when
		const wrapper = renderer.create(<Filter name="Hello world" />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render id if provided', () => {
		// when
		const wrapper = renderer.create(<Filter id="toolbar-filter" name="Hello world" />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
