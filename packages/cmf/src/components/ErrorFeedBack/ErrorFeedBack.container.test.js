import React from 'react';
import { shallow } from 'enzyme';

import Component from './ErrorFeedBack.component';
import Container from './ErrorFeedBack.container';

describe('Container ErrorFeedBack', () => {
	it('should render ErrorFeedBack with props', () => {
		const wrapper = shallow(
			<Container />
		);
		expect(wrapper.find(Component).length).toBe(1);
		expect(wrapper.props()).toMatchSnapshot();
	});
});
