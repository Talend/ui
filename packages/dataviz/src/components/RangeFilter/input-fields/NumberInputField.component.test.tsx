import React from 'react';
import { mount } from 'enzyme';
import NumberInputField from './NumberInputField.component';

describe('Number input field', () => {
	it('Should submit value on blur', () => {
		const onChange = jest.fn();
		const component = mount(<NumberInputField value={10} onChange={onChange} />);

		component.find('input').simulate('change', { target: { value: '20' } });
		expect(onChange).not.toHaveBeenCalled();

		component.find('input').simulate('blur');
		expect(onChange).toHaveBeenCalledWith(20);
	});

  it('Should not trigger onChange if value did not change', () => {
    const onChange = jest.fn();
    const component = mount(<NumberInputField value={10} onChange={onChange} />);

    component.find('input').simulate('blur');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('Should reset value on Esc', () => {
    const onChange = jest.fn();
    const component = mount(<NumberInputField value={10} onChange={onChange} />);

    component.find('input').simulate('change', { target: { value: '20' } });
    component.find('input').simulate('keydown', { key: 'Escape' } );

    expect(component.find('input').prop('value')).toEqual('10');
  });

  it('Should submit value on Enter', () => {
    const onChange = jest.fn();
    const component = mount(<NumberInputField value={10} onChange={onChange} />);

    component.find('input').simulate('change', { target: { value: '20' } });
    component.find('input').simulate('keydown', { key: 'Enter' } );

    expect(onChange).toHaveBeenCalledWith(20);
  });
});
