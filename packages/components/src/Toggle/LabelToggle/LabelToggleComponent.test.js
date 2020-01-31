import React from 'react';
import { mount } from 'enzyme';

import LabelToggle from './LabelToggle.component';

describe('LabelToggle', () => {
	let onChange;
	let props;
	beforeEach(() => {
		onChange = jest.fn();
		props = {
			values: [
				{ label: 'A', value: 'a' },
				{ label: 'B', value: 'b' },
				{ label: 'C', value: 'c' },
			],
			id: 'test',
			name: 'name',
			value: 'b',
			onChange,
		};
	});

	it('should render three radio buttons', () => {
		const wrapper = mount(<LabelToggle {...props} />);
		expect(wrapper.find('label')).toHaveLength(3);
	});
	it('should be checked the "checked" value', () => {
		const wrapper = mount(<LabelToggle {...props} />);
		expect(wrapper.find('#test-radio-b').props().checked).toEqual(true);
		expect(wrapper.find('label')).toHaveLength(3);
		expect(onChange).toHaveBeenCalledTimes(0);
	});
	it('should change the default value', () => {
		const wrapper = mount(<LabelToggle {...props} />);
		wrapper.find('#test-radio-c').simulate('change', { target: { checked: true } });
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(wrapper.find('label')).toHaveLength(3);
	});
});
