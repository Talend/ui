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
		expect(wrapper.props()).toEqual({ errors: [] });
	});
	it('should pass errors from its state', () => {
		const wrapper = shallow(
			<Container />
		);
		const errors = [{ foo: 'foo' }];
		wrapper.setState({ errors });
		expect(wrapper.props()).toEqual({ errors });
	});
});
