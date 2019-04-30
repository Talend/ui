import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import DisplayModeToggle from './DisplayModeToggle.component';

const props = {
	onChange: jest.fn(),
};
describe('DisplayModeToggle', () => {
	it('should render', () => {
		// when
		const wrapper = shallow(<DisplayModeToggle {...props} />);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
	it('should render table mode selected', () => {
		// when
		const wrapper = shallow(<DisplayModeToggle {...props} mode="table" />);

		// then
		expect(
			wrapper
				.find('ActionIconToggle')
				.at(0)
				.prop('active'),
		).toEqual(true);
	});
	it('should call onChange when change display mode', () => {
		// when
		const wrapper = shallow(<DisplayModeToggle {...props} mode="table" />);
		wrapper
			.find('ActionIconToggle')
			.at(1)
			.simulate('click', {});

		// then
		expect(props.onChange).toHaveBeenCalledWith({}, 'large');
	});
});
