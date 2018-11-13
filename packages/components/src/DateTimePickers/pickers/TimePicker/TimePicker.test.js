import React from 'react';
import { shallow } from 'enzyme';

import TimePicker from './TimePicker.component';

describe('TimePicker', () => {
	it('should render', () => {
		// when
		const wrapper = shallow(<TimePicker value={{ hours: 15, minutes: 38 }} onChange={jest.fn()} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should trigger onChange on hours change', () => {
		// given
		const onChange = jest.fn();
		const wrapper = shallow(<TimePicker value={{ hours: 15, minutes: 38 }} onChange={onChange} />);
		const event = { target: { value: '17' } };
		expect(onChange).not.toBeCalled();

		// when
		wrapper
			.find('DebounceInput')
			.at(0)
			.simulate('change', event);

		// then
		expect(onChange).toBeCalledWith(event, { hours: 17, minutes: 38 });
	});

	it('should trigger onChange on minutes change', () => {
		// given
		const onChange = jest.fn();
		const wrapper = shallow(<TimePicker value={{ hours: 15, minutes: 38 }} onChange={onChange} />);
		const event = { target: { value: '17' } };
		expect(onChange).not.toBeCalled();

		// when
		wrapper
			.find('DebounceInput')
			.at(1)
			.simulate('change', event);

		// then
		expect(onChange).toBeCalledWith(event, { hours: 15, minutes: 17 });
	});

	it('should manage tabIndex', () => {
		// given
		const wrapper = shallow(<TimePicker onChange={jest.fn()} />);
		expect(
			wrapper
				.find('DebounceInput')
				.at(0)
				.prop('tabIndex'),
		).toBe(-1);
		expect(
			wrapper
				.find('DebounceInput')
				.at(1)
				.prop('tabIndex'),
		).toBe(-1);

		// when
		wrapper.setProps({ allowFocus: true });

		// then
		expect(
			wrapper
				.find('DebounceInput')
				.at(0)
				.prop('tabIndex'),
		).toBe(0);
		expect(
			wrapper
				.find('DebounceInput')
				.at(1)
				.prop('tabIndex'),
		).toBe(0);
	});
});
