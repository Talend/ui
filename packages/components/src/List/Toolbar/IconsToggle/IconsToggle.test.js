import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import IconsToggle from './IconsToggle.component';

const props = {
	onChange: jest.fn(),
	options: [{ name: 'table', icon: 'talend-table', label: 'table', araiLabel: 'table view' },
		{ name: 'large', icon: 'talend-expanded', label: 'large', araiLabel: 'large view' },
	],
	selected: 'table',
};
describe('IconsToggle', () => {
	it('should render a display mode toggle', () => {
		// when
		const wrapper = mount(<IconsToggle {...props} />);

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});
	it('should render table mode selected', () => {
		// when
		const wrapper = mount(<IconsToggle {...props} />);

		// then
		expect(wrapper.find('ActionIconToggle').at(0).prop('active')).toEqual(true);
	});
	it('should call onChange when change display mode', () => {
		// when
		const wrapper = mount(<IconsToggle {...props} />);
		wrapper.find('ActionIconToggle').at(1).simulate('click');

		// then
		expect(props.onChange).toHaveBeenCalledWith(expect.anything(), 'large');
	});
});
