import React from 'react';
import { shallow } from 'enzyme';

import Component from './ErrorFeedBack.component';

describe('Component ErrorFeedBack', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Component />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
