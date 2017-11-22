import React from 'react';
import { shallow, mount } from 'enzyme';

import FilterBar from './FilterBar.component';

jest.useFakeTimers();

let defaultProps = {};

describe('FilterBar', () => {
	beforeEach(() => {
		defaultProps = {
			docked: false,
			onFocus: jest.fn(),
			onBlur: jest.fn(),
			onFilter: jest.fn(),
			onToggle: jest.fn(),
			ref: 'inputFilter',
		};
	});
	it('should call onToggle on search icon click', () => {
		// given
		const filterInstance = shallow(<FilterBar {...defaultProps} docked />);

		// when
		filterInstance.find('Action').simulate('click');

		// then
		expect(defaultProps.onToggle).toBeCalled();
	});

	it('should render the filter if not dockabled', () => {
		// given
		const filterInstance = shallow(<FilterBar {...defaultProps} dockable={false} />);

		// then
		expect(filterInstance.find('FilterInput').length).toBe(1);
	});

	it('should support external props', () => {
		// given
		const filterInstance = shallow(<FilterBar {...defaultProps} className="custom-test" />);

		// then
		expect(filterInstance.props().className).toContain('custom-test');
	});

	it('should be able to switch autofocus to false', () => {
		// given
		const filterInstance = shallow(<FilterBar {...defaultProps} autoFocus={false} />);

		// then
		expect(filterInstance.find('FilterInput').props().autoFocus).toBe(false);
	});

	it('should setstate focus to true onFocus event', () => {
		// given
		const instance = shallow(<FilterBar {...defaultProps} />);
		expect(instance.state('focus')).toBe(false);

		// when
		instance.find('FilterInput').simulate('focus');

		// then
		expect(instance.state('focus')).toBe(true);
		expect(defaultProps.onFocus).toHaveBeenCalled();
	});

	it('should setstate focus to false onBlur event', () => {
		// given
		const instance = shallow(<FilterBar {...defaultProps} />);
		expect(instance.state('focus')).toBe(false);

		// when
		instance.find('FilterInput').simulate('focus');
		instance.find('FilterInput').simulate('blur');

		// then
		expect(instance.state('focus')).toBe(false);
		expect(defaultProps.onBlur).toHaveBeenCalled();
	});

	it('should call onToggle on cross icon click', () => {
		// given
		const filterInstance = mount(<FilterBar {...defaultProps} />);

		// when
		filterInstance.find('button').simulate('click');

		// then
		expect(defaultProps.onToggle).toBeCalled();
	});

	it('should call onFilter when input value change', () => {
		// given
		const filterInstance = mount(<FilterBar {...defaultProps} />);

		// when
		filterInstance.find('input').simulate('change');

		// then
		expect(defaultProps.onFilter).toBeCalled();
	});

	it('should call onBlur on input blur', () => {
		// given
		const props = { ...defaultProps };
		const filterInstance = mount(<FilterBar {...props} />);

		// when
		filterInstance.find('input').simulate('blur');

		// then
		expect(props.onBlur).toBeCalled();
	});

	it('should call onToggle on ESC keydown', () => {
		// given
		const props = { ...defaultProps };
		const filterInstance = mount(<FilterBar {...props} />);

		// when
		filterInstance.find('input').simulate('keydown', { keyCode: 27 });

		// then
		expect(props.onToggle).toBeCalled();
	});

	it('should call onToggle on ENTER keydown', () => {
		// given
		const props = { ...defaultProps };
		const filterInstance = mount(<FilterBar {...props} />);

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
		const filterInstance = mount(<FilterBar {...props} />);

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

		const filterInstance = mount(<FilterBar {...props} />);

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
