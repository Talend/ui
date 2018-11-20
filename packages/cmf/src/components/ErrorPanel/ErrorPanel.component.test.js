import React from 'react';
import { shallow } from 'enzyme';

import Component from './ErrorPanel.component';

describe('Component ErrorPanel', () => {
	it('should render a panel', () => {
		const wrapper = shallow(
			<Component />
		);
		expect(wrapper.props().className).toBe('panel panel-default');
		expect(wrapper.find('.panel-heading').props().children).toBe('Whoops, an error occured');
	});
	it('should render the error', () => {
		const error = {
			name: 'Error',
			description: 'cannot call blabla of undefined',
			stack: 'here it is',
		};
		const wrapper = shallow(
			<Component error={error} reported response={{ id: 42 }} />
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
