import React from 'react';
import { mount } from 'enzyme';
import { NumberInputField, NumberRangeHandler } from './NumberRangeHandler';

describe('Number input field', () => {
	it('Should submit value on blur', () => {
		const onChange = jest.fn();
		const component = mount(<NumberInputField id="" value={10} onChange={onChange} />);

		component.find('input').simulate('change', { target: { value: '20' } });
		expect(onChange).not.toHaveBeenCalled();

		component.find('input').simulate('blur');
		expect(onChange).toHaveBeenCalledWith(20);
	});

	it('Should not trigger onChange if value did not change', () => {
		const onChange = jest.fn();
		const component = mount(<NumberInputField id="" value={10} onChange={onChange} />);

		component.find('input').simulate('blur');
		expect(onChange).not.toHaveBeenCalled();
	});

	it('Should reset value on Esc', () => {
		const onChange = jest.fn();
		const component = mount(<NumberInputField id="" value={10} onChange={onChange} />);

		component.find('input').simulate('change', { target: { value: '20' } });
		component.find('input').simulate('keydown', { key: 'Escape' });

		expect(component.find('input').prop('value')).toEqual('10');
	});

	it('Should submit value on Enter', () => {
		const onChange = jest.fn();
		const component = mount(<NumberInputField id="" value={10} onChange={onChange} />);

		component.find('input').simulate('change', { target: { value: '20' } });
		component.find('input').simulate('keydown', { key: 'Enter' });

		expect(onChange).toHaveBeenCalledWith(20);
	});
	it('Should create ticks', () => {
		const ticks = NumberRangeHandler.getTicks({
			min: 2177.87,
			max: 9530.28,
		});

		expect(ticks).toEqual({
			'2177.87': '2,177.87',
			'4000': '4,000',
			'6000': '6,000',
			'8000': '8,000',
			'9530.28': '9,530.28',
		});
	});
});
