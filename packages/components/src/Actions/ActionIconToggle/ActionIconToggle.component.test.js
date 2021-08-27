import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '@talend/react-bootstrap';
import ActionIconToggle from './ActionIconToggle.component';
import Icon from '../../Icon';

const inactiveIconToggle = {
	className: 'my-icon-toggle',
	icon: 'talend-panel-opener-right',
	iconTransform: 'rotate-90',
	id: 'my-inactive-action',
	label: "Click me, I'm inactive",
	onClick: jest.fn(),
	tooltipPlacement: 'top',
	'data-feature': 'action.feature',
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

	it('should pass correct props to <Icon />', () => {
		const wrapper = shallow(<ActionIconToggle {...inactiveIconToggle} />);
		const { icon, iconTransform } = inactiveIconToggle;
		expect(wrapper.find(Icon).props()).toEqual({ name: icon, transform: iconTransform });
	});
});
