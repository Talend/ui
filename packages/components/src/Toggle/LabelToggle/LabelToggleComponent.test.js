import React from 'react';
import { mount } from 'enzyme';

import LabelToggle from './LabelToggle.component';

describe('LabelToggle', () => {
	it('should render three radio buttons', () => {
		const props = {
			values: [
				{ label: 'A', value: 'A' },
				{ label: 'B', value: 'B' },
				{ label: 'C', value: 'C' },
			],
			name: 'name',
			value: 'A',
			handlePreviewToggleState: jest.fn(),
			onChange: jest.fn(),
		};

		const wrapper = mount(<LabelToggle {...props} />);
		expect(wrapper.find('label')).toHaveLength(3);
	});
	it('should be checked the "checked" value', () => {
		const props = {
			id: 'test',
			values: [
				{ label: 'A', value: 'a' },
				{ label: 'B', value: 'b' },
				{ label: 'C', value: 'c' },
			],
			name: 'name',
			value: 'a',
			onChange: jest.fn(),
		};

		const wrapper = mount(<LabelToggle {...props} />);
		expect(wrapper.find('#test-radio-a').props().checked).toEqual(true);
		expect(wrapper.find('label')).toHaveLength(3);
		expect(props.onChange).toHaveBeenCalledTimes(0);
	});
	it('should change the default value', () => {
		const props = {
			id: 'test',
			values: [
				{ label: 'A', value: 'a' },
				{ label: 'B', value: 'b' },
				{ label: 'C', value: 'c' },
			],
			name: 'name',
			value: 'a',
			onChange: jest.fn(),
		};
		const wrapper = mount(<LabelToggle {...props} />);
		wrapper.find('#test-radio-b').simulate('change', { target: { checked: true } });
		expect(props.onChange).toHaveBeenCalledTimes(1);
		expect(wrapper.find('label')).toHaveLength(3);
	});
});
