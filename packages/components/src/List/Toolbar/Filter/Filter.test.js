import React from 'react';
import { mount } from 'enzyme';

import Filter from './Filter.component';

jest.useFakeTimers();

let defaultProps = {};
beforeEach(() => {
	defaultProps = {
		docked: false,
		onBlur: jest.fn(),
		onFilter: jest.fn(),
		onToggle: jest.fn(),
		ref: 'inputFilter',
	};
});

describe('Filter', () => {
	it('should call onToggle on search icon click', () => {
		// given
		const props = {
			...defaultProps,
			docked: true,
		};
		const filterInstance = mount(<Filter {...props} />);

		// when
		filterInstance.find('button').simulate('click', { button: 0 });

		// then
		expect(props.onToggle).toBeCalled();
	});

	it('should call onToggle on cross icon click', () => {
		// given
		const props = {
			...defaultProps,
		};
		const filterInstance = mount(<Filter {...props} />);

		// when
		filterInstance.find('button').simulate('click', { button: 0 });

		// then
		expect(props.onToggle).toBeCalled();
	});

	it('should call onFilter when input value change', () => {
		// given
		const props = { ...defaultProps };
		const filterInstance = mount(<Filter {...props} />);

		// when
		filterInstance.find('input').simulate('change');

		// then
		expect(props.onFilter).toBeCalled();
	});

	it('should call onBlur on input blur', () => {
		// given
		const props = { ...defaultProps };
		const filterInstance = mount(<Filter {...props} />);

		// when
		filterInstance.find('input').simulate('blur');

		// then
		expect(props.onBlur).toBeCalled();
	});

	it('should call onToggle on ESC keydown', () => {
		// given
		const props = { ...defaultProps };
		const filterInstance = mount(<Filter {...props} />);

		// when
		filterInstance.find('input').simulate('keydown', { keyCode: 27 });

		// then
		expect(props.onToggle).toBeCalled();
	});

	it('should call onToggle on ENTER keydown', () => {
		// given
		const props = { ...defaultProps };
		const filterInstance = mount(<Filter {...props} />);

		// when
		filterInstance.find('input').simulate('keydown', { keyCode: 13 });

		// then
		expect(props.onBlur).toBeCalled();
	});

	it('should call onFilter with debounce options', () => {
		// given
		const initialTimeoutCount = setTimeout.mock.calls.length;
		const debounceTimeout = 300;
		const props = {
			...defaultProps,
			debounceTimeout,
		};
		const filterInstance = mount(<Filter {...props} />);

		// when
		filterInstance.find('input').simulate('change');

		// then
		expect(setTimeout.mock.calls.length).toBe(initialTimeoutCount + 1);
		expect(setTimeout.mock.calls[0][1]).toBe(debounceTimeout);
	});

	it('should call onFilter with debounceMinLength options', () => {
		// given
		const initialTimeoutCount = setTimeout.mock.calls.length;
		const debounceTimeout = 300;
		const props = {
			...defaultProps,
			debounceTimeout,
			debounceMinLength: 3,
		};
		const underMinLengthEvent = { target: { value: '2' } };
		const overMinLengthEvent = { target: { value: 'toto' } };

		const filterInstance = mount(<Filter {...props} />);

		// when
		filterInstance.find('input').simulate('change', underMinLengthEvent);

		// then
		expect(setTimeout.mock.calls.length).toBe(initialTimeoutCount);

		// when
		filterInstance.find('input').simulate('change', overMinLengthEvent);

		// then
		expect(setTimeout.mock.calls.length).toBe(initialTimeoutCount + 1);
		expect(setTimeout.mock.calls[0][1]).toBe(debounceTimeout);
	});
});
