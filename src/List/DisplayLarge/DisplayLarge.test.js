import React from 'react';
import renderer from 'react-test-renderer';

import DisplayLarge from './DisplayLarge.component';

jest.mock('react-dom');

describe('DisplayLarge', () => {
	it('should render its name', () => {
		const wrapper = renderer.create(<DisplayLarge name="Hello world" />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
