import React from 'react';
import { shallow } from 'enzyme';
import DateInputField from './DateInputField.component';

describe('Date input field', () => {
	it('Should submit value on blur', () => {
		const onChange = jest.fn();
		const component = shallow(<DateInputField value={1262300400000} onChange={onChange} />);

		// @ts-ignore
    component.find('InputDatePicker').invoke('onChange')!({}, { textInput: '2015-01-01' } as any);
		expect(onChange).not.toHaveBeenCalled();

		component.find('InputDatePicker').invoke('onBlur')!({} as any);
		expect(onChange).toHaveBeenCalledWith(1420066800000);
	});

	it('Should reset value on Esc', () => {
		const onChange = jest.fn();
		const component = shallow(<DateInputField value={1262300400000} onChange={onChange} />);

		// @ts-ignore
    component.find('InputDatePicker').invoke('onChange')!({}, { textInput: '2015-01-01' } as any);
		component.find('InputDatePicker').invoke('onKeyDown')!({ key: 'Escape' } as any);

		expect(component.find('InputDatePicker').prop('value')).toBe('2010-01-01');
	});

	it('Should submit value on Enter', () => {
		const onChange = jest.fn();
		const component = shallow(<DateInputField value={1262300400000} onChange={onChange} />);

		// @ts-ignore
    component.find('InputDatePicker').invoke('onChange')!({}, { textInput: '2015-01-01' } as any);
		component.find('InputDatePicker').invoke('onKeyDown')!({ key: 'Enter' } as any);

		expect(onChange).toHaveBeenCalledWith(1420066800000);
	});

	it('Should reset value on blur with invalid input', () => {
		const onChange = jest.fn();
		const component = shallow(<DateInputField value={1262300400000} onChange={onChange} />);

    // @ts-ignore
    component.find('InputDatePicker').invoke('onChange')!({}, { textInput: '2010-24-24' } as any);
    component.find('InputDatePicker').invoke('onBlur')!({} as any);

		expect(component.find('InputDatePicker').prop('value')).toBe('2010-01-01');
	});
});
