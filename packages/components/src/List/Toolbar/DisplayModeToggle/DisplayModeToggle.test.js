import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import DisplayModeToggle from './DisplayModeToggle.component';

const props = {
	onChange: jest.fn(),
};
describe('DisplayModeToggle', () => {
	it('should render', () => {
		// when
		const wrapper = mount(<DisplayModeToggle {...props} />);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
	it('should render table mode selected', () => {
		// when
		const wrapper = mount(<DisplayModeToggle {...props} mode="table" />);
		// then
		expect(wrapper.find('ButtonIconToggle').at(0).prop('isActive')).toEqual(true);
	});
	it('should call onChange when change display mode', () => {
		// when
		const wrapper = mount(<DisplayModeToggle {...props} mode="table" />);

		wrapper.find('ButtonIconToggle').at(1).simulate('click', {});

		// then
		expect(props.onChange).toHaveBeenCalledWith(expect.anything(), 'large');
	});
});
