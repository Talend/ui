import React from 'react';
import { mount } from 'enzyme';

import Filter from './Filter.component';

jest.useFakeTimers();

const defaultProps = {
	onFilter: jest.fn(),
	ref: 'inputFilter',
};

describe('Filter', () => {
	it('should call onFilter', () => {
		// given
		const props = { ...defaultProps };
		const filterInstance = mount(<Filter {...props} />);

		// when
		filterInstance.find('input').simulate('change');

		// then
		expect(props.onFilter).toBeCalled();
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
