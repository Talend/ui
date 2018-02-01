import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'react-bootstrap';
import ActionIconToggle from './ActionIconToggle.component';

const inactiveIconToggle = {
	className: 'my-icon-toggle',
	icon: 'talend-panel-opener-right',
	id: 'my-inactive-action',
	label: "Click me, I'm inactive",
	onClick: jest.fn(),
	tooltipPlacement: 'top',
};

describe('ActionIconToggle', () => {
	it('should render a button', () => {
		// when
		const wrapper = shallow(<ActionIconToggle {...inactiveIconToggle} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render an active button', () => {
		// when
		const wrapper = shallow(<ActionIconToggle {...inactiveIconToggle} active />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should call click callback', () => {
		// given
		const wrapper = shallow(<ActionIconToggle {...inactiveIconToggle} />);
		expect(inactiveIconToggle.onClick).not.toBeCalled();

		// when
		wrapper.find(Button).simulate('click');

		// then
		expect(inactiveIconToggle.onClick).toBeCalled();
	});
});
