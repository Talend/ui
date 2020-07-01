import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import Component from './ErrorPanel.component';

// missing in jsdom: https://github.com/jsdom/jsdom/issues/1721
global.window.URL.createObjectURL = jest.fn();

describe('Component ErrorPanel', () => {
	it('should render the error', () => {
		const error = {
			name: 'Error',
			description: 'cannot call blabla of undefined',
			stack: 'here it is',
		};
		const wrapper = shallow(<Component error={error} reported response={{ id: 42 }} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should call revoke on unmount', () => {
		window.URL.revokeObjectURL = jest.fn();
		const error = {
			name: 'Error',
			description: 'cannot call blabla of undefined',
			stack: 'here it is',
		};
		let wrapper;
		act(() => {
			wrapper = mount(<Component error={error} reported response={{ id: 42 }} />);
			wrapper.unmount();
		});
		expect(window.URL.revokeObjectURL).toHaveBeenCalled();
	});
});
