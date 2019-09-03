import React from 'react';
import { shallow } from 'enzyme';

import Component from './ErrorPanel.component';

// missing in jsdom: https://github.com/jsdom/jsdom/issues/1721
global.window.URL.createObjectURL = jest.fn();

describe('Component ErrorPanel', () => {
	it('should render a div', () => {
		const wrapper = shallow(<Component />);
		expect(wrapper.type()).toBe('div');
	});
	it('should render the error', () => {
		const error = {
			name: 'Error',
			description: 'cannot call blabla of undefined',
			stack: 'here it is',
		};
		const wrapper = shallow(<Component error={error} reported response={{ id: 42 }} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
