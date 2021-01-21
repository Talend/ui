import React from 'react';
import { shallow } from 'enzyme';
import parseISO from 'date-fns/parseISO';
import { DateInputField, DateRangeHandler } from './DateRangeHandler';

describe('DateRangeHandler', () => {
	it('Should submit value on blur', () => {
		const onChange = jest.fn();
		const component = shallow(<DateInputField id="" value={1262300400000} onChange={onChange} />);

		// @ts-ignore
		component.find('InputDatePicker').invoke('onChange')!({}, { textInput: '2015-01-01' } as any);
		expect(onChange).not.toHaveBeenCalled();

		component.find('InputDatePicker').invoke('onBlur')!({} as any);
		expect(onChange).toHaveBeenCalledWith(parseISO('2015-01-01').getTime());
	});

	it('Should reset value on Esc', () => {
		const onChange = jest.fn();
		const component = shallow(<DateInputField id="" value={1262300400000} onChange={onChange} />);

		// @ts-ignore
		component.find('InputDatePicker').invoke('onChange')!({}, { textInput: '2015-01-01' } as any);
		component.find('InputDatePicker').invoke('onKeyDown')!({ key: 'Escape' } as any);

		expect(component.find('InputDatePicker').prop('value')).toBe('2010-01-01');
	});

	it('Should submit value on Enter', () => {
		const onChange = jest.fn();
		const component = shallow(<DateInputField id="" value={1262300400000} onChange={onChange} />);

		// @ts-ignore
		component.find('InputDatePicker').invoke('onChange')!({}, { textInput: '2015-01-01' } as any);
		component.find('InputDatePicker').invoke('onKeyDown')!({ key: 'Enter' } as any);

		expect(onChange).toHaveBeenCalledWith(parseISO('2015-01-01').getTime());
	});

	it('Should reset value on blur with invalid input', () => {
		const onChange = jest.fn();
		const component = shallow(<DateInputField id="" value={1262300400000} onChange={onChange} />);

		// @ts-ignore
		component.find('InputDatePicker').invoke('onChange')!({}, { textInput: '2010-24-24' } as any);
		component.find('InputDatePicker').invoke('onBlur')!({} as any);

		expect(component.find('InputDatePicker').prop('value')).toBe('2010-01-01');
	});

	it('Should set min value to current timezone day start', () => {
		const min = DateRangeHandler.getMinValue!(parseISO('2015-01-01T12:00:00').getTime());
		expect(min).toEqual(parseISO('2015-01-01T00:00:00.000').getTime());
	});

	it('Should set max value to current timezone day end', () => {
		const max = DateRangeHandler.getMaxValue!(new Date('2015-01-01T12:00:00').getTime());
		expect(max).toEqual(parseISO('2015-01-01T23:59:59.999').getTime());
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
	it('Should create ticks for tiny range', () => {
		const ticks = DateRangeHandler.getTicks({
			min: new Date('2000-01-01T12:00:00').getTime(),
			max: new Date('2000-01-02T12:00:00').getTime(),
		});
		expect(ticks).toEqual({
			'946724400000': '2000-01-01',
			'946767600000': '2000-01-02',
		});
	});
});
