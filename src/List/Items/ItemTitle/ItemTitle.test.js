import React from 'react';
import { mount } from 'enzyme';
import { Button } from 'react-bootstrap';

import ItemTitle from './ItemTitle.component';

const value = 'Hello world';
const inputProps = {
	value,
	display: 'input',
	onChange: jest.fn(),
	onSubmit: jest.fn(),
	onCancel: jest.fn(),
};

describe('ItemTitle', () => {
	it('should trigger callback on button title click', () => {
		// given
		const props = {
			value,
			display: 'button',
			onClick: jest.fn(),
		};
		const titleInstance = <ItemTitle {...props} />;

		// when
		const wrapper = mount(titleInstance);
		wrapper.find(Button).simulate('click', { stopPropagation: () => {} });

		// then
		expect(props.onClick).toBeCalled();
		const callArgs = props.onClick.mock.calls[0];
		expect(callArgs.length).toBe(1);
	});

	it('should trigger callback on input title blur', () => {
		// given
		const titleInstance = <ItemTitle {...inputProps} />;

		// when
		const wrapper = mount(titleInstance);
		wrapper.find('input').simulate('blur', { target: { value: 'my new title' } });

		// then
		expect(inputProps.onSubmit).toBeCalled();
		const callArgs = inputProps.onSubmit.mock.calls[0];
		expect(callArgs.length).toBe(1);
	});

	it('should trigger callback on input title ENTER', () => {
		// given
		const titleInstance = <ItemTitle {...inputProps} />;

		// when
		const wrapper = mount(titleInstance);
		wrapper.find('input').simulate('keyUp', { keyCode: 13, target: { value: 'my new title' } });

		// then
		expect(inputProps.onSubmit).toBeCalled();
		const callArgs = inputProps.onSubmit.mock.calls[0];
		expect(callArgs.length).toBe(1);
	});

	it('should trigger callback on input title ESC', () => {
		// given
		const titleInstance = <ItemTitle {...inputProps} />;

		// when
		const wrapper = mount(titleInstance);
		wrapper.find('input').simulate('keyUp', { keyCode: 27 });

		// then
		expect(inputProps.onCancel).toBeCalled();
		const callArgs = inputProps.onCancel.mock.calls[0];
		expect(callArgs.length).toBe(1);
	});
});
