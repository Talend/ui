import React from 'react';
import renderer from 'react-test-renderer';

import SelectDisplayMode from './SelectDisplayMode.component';

jest.mock('react-dom');

describe('SelectDisplayMode', () => {
	it('should render its name', () => {
		const wrapper = renderer.create(<SelectDisplayMode name="Hello world" />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
