import React from 'react';
import { mount } from 'enzyme';
import Toggle from './Toggle.component';

const defaultProps = {
	id: 'id',
	onChange: jest.fn(),
	onBlur: jest.fn(),
};

describe('Toggle', () => {
	it('should trigger a change event', () => {
		// given

		// when
		const toggle = (
			<Toggle {...defaultProps} />
		);
		const wrapper = mount(toggle);
		wrapper.find('input').simulate('change');

		// then
		expect(defaultProps.onChange).toHaveBeenCalled();
	});

	it('should trigger a blur event', () => {
		// given

		// when
		const toggle = (
			<Toggle {...defaultProps} />
		);
		const wrapper = mount(toggle);
		wrapper.find('input').simulate('blur');

		// then
		expect(defaultProps.onBlur).toHaveBeenCalled();
	});
});
