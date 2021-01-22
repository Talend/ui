import React from 'react';
import { mount } from 'enzyme';
import { DateTimeInputField, DateTimeRangeHandler } from './DateTimeRangeHandler';
import { DateRangeHandler } from '../DateRangeHandler/DateRangeHandler';

describe('DateTimeRangeHandler', () => {
	it('Should submit value on blur', () => {
		const onChange = jest.fn();
		const component = mount(<DateTimeInputField id="" value={1262300400000} onChange={onChange} />);

		// @ts-ignore
		component.find('InputDateTimePicker').invoke('onChange')({}, {
			textInput: '2015-01-01 02:00:00',
		} as any);
		expect(onChange).not.toHaveBeenCalled();

		component.find('InputDateTimePicker').invoke('onBlur')!({} as any);
		expect(onChange).toHaveBeenCalledWith(new Date('2015-01-01T02:00:00').getTime());
	});

	it('Should reset value on Esc', () => {
		const onChange = jest.fn();
		const component = mount(<DateTimeInputField id="" value={1262300400000} onChange={onChange} />);

		component.find('InputDateTimePicker').invoke('onChange')!(
			{},
			// @ts-ignore
			{ textInput: '2015-01-01 02:00:00' },
		);
		component.find('InputDateTimePicker').invoke('onKeyDown')!({ key: 'Escape' } as any);

		expect(component.find('InputDateTimePicker').prop('value')).toBe('2010-01-01 00:00:00');
	});

	it('Should reset value on blur with invalid input', () => {
		const onChange = jest.fn();
		const component = mount(
			<DateTimeInputField
				id=""
				value={new Date('2010-01-01T02:00:00').getTime()}
				onChange={onChange}
			/>,
		);

		// @ts-ignore
		component.find('InputDateTimePicker').invoke('onChange')!({}, {
			textInput: '2010-24-24 02:00:00',
		} as any);
		component.find('InputDateTimePicker').invoke('onBlur')!({} as any);

		expect(component.find('InputDateTimePicker').prop('value')).toBe('2010-01-01 02:00:00');
	});

	it('Should set min value to current timezone second start', () => {
		const min = DateTimeRangeHandler.getMinValue!(
			new Date('2015-01-01T12:01T12:01T12.200').getTime(),
		);
		expect(min).toEqual(new Date('2015-01-01T12:01T12:01T12.000').getTime());
	});

	it('Should set max value to current timezone second end', () => {
		const max = DateTimeRangeHandler.getMaxValue!(new Date('2015-01-01T12:12:12.000').getTime());
		expect(max).toEqual(new Date('2015-01-01T12:12:12.999').getTime());
	});

	it('Should create ticks', () => {
		const ticks = DateRangeHandler.getTicks({
			min: new Date('2000-01-01T12:00:00').getTime(),
			max: new Date('2030-01-01T12:00:00').getTime(),
		});
		expect(ticks).toEqual({
			'946724400000': '2000-01-01',
			'1262300400000': '2010-01-01',
			'1577833200000': '2020-01-01',
			'1893452400000': '2030-01-01',
		});
	});
});
