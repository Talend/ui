import React from 'react';
import { shallow, mount } from 'enzyme';

import isSameDay from 'date-fns/is_same_day';
import isEqual from 'date-fns/is_equal';

import InputDateTimePicker from './InputDateTimePicker.component';
import DateTimePicker from '../DateTimePicker';

const DEFAULT_ID = 'DEFAULT_ID';

describe('InputDateTimePicker', () => {
	describe('render', () => {
		it('should render', () => {
			// when
			const wrapper = shallow(
				<InputDateTimePicker id={DEFAULT_ID} selectedDateTime={new Date(2017, 3, 4, 15, 27)} />,
			);

			// then
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should init default state', () => {
			// when
			const wrapper = shallow(<InputDateTimePicker id={DEFAULT_ID} />);

			// then
			expect(wrapper.state()).toEqual({
				date: undefined,
				time: undefined,
				datetime: undefined,
				textInput: '',
				inputFocused: false,
				showPicker: false,
			});
		});

		it('should init state from props invalid date', () => {
			// when
			const wrapper = shallow(
				<InputDateTimePicker id={DEFAULT_ID} selectedDateTime={new Date('')} />,
			);

			// then
			const textInput = wrapper.find('DebounceInput').prop('value');
			expect(textInput).toBe('');

			const { date, time } = wrapper.find('DateTimePicker').prop('selection');
			expect(date).toBe(undefined);
			expect(time).toBe(undefined);
		});

		it('should init state from props', () => {
			// given
			const initialDate = new Date(2015, 3, 4, 12, 36);

			// when
			const wrapper = shallow(
				<InputDateTimePicker id={DEFAULT_ID} selectedDateTime={initialDate} />,
			);

			// then
			const textInput = wrapper.find('DebounceInput').prop('value');
			expect(textInput).toBe('2015-04-04 12:36');

			const { date, time } = wrapper.find('DateTimePicker').prop('selection');
			expect(date).toEqual(new Date(2015, 3, 4));
			expect(time).toEqual({ hours: 12, minutes: 36 });
		});
	});
	/*
	describe('props update', () => {
		it('should update state based on new "selectedDateTime" props', () => {
			// given
			const defaultDate = new Date(2014, 1, 9, 12, 21, 3, 452);
			const date = new Date(2015, 3, 4, 12, 36, 42, 125);
			const wrapper = shallow(
				<InputDateTimePicker id={DEFAULT_ID} selectedDateTime={defaultDate} />,
				{
					disableLifecycleMethods: true,
				},
			);

			// when
			wrapper.setProps({
				selectedDateTime: date,
			});
			wrapper.update();

			// then
			const testedDate = wrapper.state('date');
			const expectedDate = new Date(2015, 3, 4);
			expect(isEqual(testedDate, expectedDate)).toBe(true);

			const testedTime = wrapper.state('time');
			const expectedTime = 12 * 60 + 36;
			expect(testedTime).toBe(expectedTime);

			const testedTextInput = wrapper.state('textInput');
			const expectedTextInput = '2015-04-04 12:36';
			expect(testedTextInput).toBe(expectedTextInput);

			const testedDatetime = wrapper.state('datetime');
			const expectedDatetime = new Date(2015, 3, 4, 12, 36);
			expect(isEqual(testedDatetime, expectedDatetime)).toBe(true);
		});

		it('should reset state on new undefined "selectedDateTime" props', () => {
			// given
			const defaultDate = new Date(2014, 1, 9, 12, 21, 3, 452);
			const wrapper = shallow(
				<InputDateTimePicker id={DEFAULT_ID} selectedDateTime={defaultDate} />,
				{
					disableLifecycleMethods: true,
				},
			);

			// when
			wrapper.setProps({
				selectedDateTime: undefined,
			});
			wrapper.update();

			// then
			expect(wrapper.state('date')).toBeUndefined();
			expect(wrapper.state('time')).toBeUndefined();
			expect(wrapper.state('textInput')).toBe('');
			expect(wrapper.state('datetime')).toBeUndefined();
		});

		it('should update state on new invalid "selectedDateTime" props', () => {
			// given
			const defaultDate = new Date(2014, 1, 9, 12, 21, 3, 452);
			const wrapper = shallow(
				<InputDateTimePicker id={DEFAULT_ID} selectedDateTime={defaultDate} />,
				{
					disableLifecycleMethods: true,
				},
			);

			// when
			wrapper.setProps({
				selectedDateTime: new Date(''),
			});
			wrapper.update();

			// then
			expect(wrapper.state('date')).toBeUndefined();
			expect(wrapper.state('time')).toBeUndefined();
			expect(wrapper.state('textInput')).toBe('');
			const stateDatetime = wrapper.state('datetime');
			expect(stateDatetime).toBeInstanceOf(Date);
			expect(isNaN(stateDatetime.getTime())).toBe(true);
		});

		it('should NOT update state when "selectedDateTime" props does not change', () => {
			// given
			const initialDate = new Date(2014, 1, 9, 12, 21, 3, 452);
			const sameDate = new Date(2014, 1, 9, 12, 21, 3, 452);
			const wrapper = shallow(
				<InputDateTimePicker id={DEFAULT_ID} selectedDateTime={initialDate} />,
				{
					disableLifecycleMethods: true,
				},
			);
			const previousState = wrapper.state();

			// when
			wrapper.setProps({
				selectedDateTime: sameDate,
			});
			wrapper.update();

			// then
			expect(wrapper.state()).toBe(previousState);
		});

		it('should NOT update state when "selectedDateTime" props is the same as current state', () => {
			// given
			const initialDate = new Date(2014, 1, 9, 12, 21, 3, 452);
			const sameDate = new Date(2014, 1, 9, 12, 21, 3, 452);
			const wrapper = shallow(<InputDateTimePicker id={DEFAULT_ID} />, {
				disableLifecycleMethods: true,
			});
			wrapper.setState({ datetime: initialDate });
			const previousState = wrapper.state();

			// when
			wrapper.setProps({
				selectedDateTime: sameDate,
			});
			wrapper.update();

			// then
			expect(wrapper.state()).toBe(previousState);
		});
	});

	describe('onChangeInput', () => {
		function getEvent(value) {
			return { target: { value } };
		}

		it('should reset state on empty value', () => {
			// given
			const wrapper = shallow(
				<InputDateTimePicker id={DEFAULT_ID} selectedDateTime={new Date(2015, 0, 1)} />,
				{
					disableLifecycleMethods: true,
				},
			);

			// when
			const inputWrapper = wrapper.find('DebounceInput');
			inputWrapper.prop('onChange')(getEvent(''));

			// then
			expect(wrapper.state('date')).toBeUndefined();
			expect(wrapper.state('time')).toBeUndefined();
			expect(wrapper.state('datetime')).toBeUndefined();
			expect(wrapper.state('textInput')).toBe('');
			expect(wrapper.state('errorMessage')).toBeUndefined();
		});

		it('should set error state with invalid format', () => {
			// given
			const wrapper = shallow(
				<InputDateTimePicker id={DEFAULT_ID} selectedDateTime={new Date(2015, 0, 1)} />,
				{
					disableLifecycleMethods: true,
				},
			);

			// when
			const inputWrapper = wrapper.find('DebounceInput');
			inputWrapper.prop('onChange')(getEvent('aze'));

			// then
			expect(wrapper.state('date')).toBeUndefined();
			expect(wrapper.state('time')).toBeUndefined();
			expect(wrapper.state('datetime').getTime()).toEqual(NaN);
			expect(wrapper.state('textInput')).toBe('aze');
			expect(wrapper.state('errorMessage')).toBe('DATETIME - INCORRECT FORMAT');
		});

		it('should set error state with invalid date', () => {
			// given
			const wrapper = shallow(
				<InputDateTimePicker id={DEFAULT_ID} selectedDateTime={new Date(2015, 0, 1)} />,
				{
					disableLifecycleMethods: true,
				},
			);

			// when
			const inputWrapper = wrapper.find('DebounceInput');
			inputWrapper.prop('onChange')(getEvent('2015-35-35 01:25'));

			// then
			expect(wrapper.state('date')).toBeUndefined();
			expect(wrapper.state('time')).toBe(85);
			expect(wrapper.state('datetime').getTime()).toEqual(NaN);
			expect(wrapper.state('textInput')).toBe('2015-35-35 01:25');
			expect(wrapper.state('errorMessage')).toBe('DATE - INCORRECT MONTH NUMBER');
		});

		it('should set error state with invalid time', () => {
			// given
			const wrapper = shallow(
				<InputDateTimePicker id={DEFAULT_ID} selectedDateTime={new Date(2015, 0, 1)} />,
				{
					disableLifecycleMethods: true,
				},
			);

			// when
			const inputWrapper = wrapper.find('DebounceInput');
			inputWrapper.prop('onChange')(getEvent('2015-11-25 65:65'));

			// then
			expect(wrapper.state('date')).toEqual(new Date(2015, 10, 25));
			expect(wrapper.state('time')).toBeUndefined();
			expect(wrapper.state('datetime').getTime()).toEqual(NaN);
			expect(wrapper.state('textInput')).toBe('2015-11-25 65:65');
			expect(wrapper.state('errorMessage')).toBe('TIME - INCORRECT HOUR NUMBER');
		});

		it('should set state with valid time', () => {
			// given
			const wrapper = shallow(
				<InputDateTimePicker id={DEFAULT_ID} selectedDateTime={new Date(2015, 0, 1)} />,
				{
					disableLifecycleMethods: true,
				},
			);

			// when
			const inputWrapper = wrapper.find('DebounceInput');
			inputWrapper.prop('onChange')(getEvent('2015-11-25 01:15'));

			// then
			expect(wrapper.state('date')).toEqual(new Date(2015, 10, 25));
			expect(wrapper.state('time')).toBe(75);
			expect(wrapper.state('datetime')).toEqual(new Date(2015, 10, 25, 1, 15));
			expect(wrapper.state('textInput')).toBe('2015-11-25 01:15');
			expect(wrapper.state('errorMessage')).toBeUndefined();
		});

		it('should call onChange', () => {
			// given
			const onChange = jest.fn();
			const event = getEvent('2015-11-25 01:15');
			const wrapper = shallow(
				<InputDateTimePicker
					id={DEFAULT_ID}
					selectedDateTime={new Date(2015, 0, 1)}
					onChange={onChange}
				/>,
				{
					disableLifecycleMethods: true,
				},
			);
			expect(onChange).not.toBeCalled();

			// when
			const inputWrapper = wrapper.find('DebounceInput');
			inputWrapper.prop('onChange')(event);

			// then
			expect(onChange).toBeCalledWith(event, {
				datetime: new Date(2015, 10, 25, 1, 15),
				errorMessage: undefined,
				origin: 'INPUT',
			});
		});
	});

	describe('onPickerSubmit', () => {
		it('should update state on picker selection', () => {
			// given
			const testedDate = new Date(2015, 11, 30);
			const testedTime = 1250;
			const wrapper = shallow(
				<InputDateTimePicker id={DEFAULT_ID} selectedDateTime={new Date(2015, 0, 1, 10, 35)} />,
				{ disableLifecycleMethods: true },
			);

			// when
			wrapper.find(DateTimePicker).prop('onSubmit')(
				{ persist: jest.fn() },
				{
					date: testedDate,
					time: testedTime,
				},
			);

			// then
			expect(wrapper.state('date')).toBe(testedDate);
			expect(wrapper.state('time')).toBe(testedTime);
			expect(wrapper.state('datetime')).toEqual(new Date(2015, 11, 30, 20, 50));
			expect(wrapper.state('textInput')).toBe('2015-12-30 20:50');
			expect(wrapper.state('errorMessage')).toBeUndefined();
		});

		it('should close picker', () => {
			// given
			const wrapper = shallow(
				<InputDateTimePicker id={DEFAULT_ID} selectedDateTime={new Date(2015, 0, 1, 10, 35)} />,
				{ disableLifecycleMethods: true },
			);
			wrapper.setState({ isDropdownShown: true });
			wrapper.update();

			// when
			wrapper.find(DateTimePicker).prop('onSubmit')(
				{ persist: jest.fn() },
				{
					date: new Date(2015, 11, 30),
					time: 1250,
				},
			);

			// then
			expect(wrapper.state('isDropdownShown')).toBe(false);
		});

		it('should call onChange', () => {
			// given
			const onChange = jest.fn();
			const testedDate = new Date(2015, 11, 30);
			const testedTime = 1250;
			const wrapper = shallow(
				<InputDateTimePicker
					id={DEFAULT_ID}
					selectedDateTime={new Date(2015, 0, 1, 10, 35)}
					onChange={onChange}
				/>,
				{ disableLifecycleMethods: true },
			);
			expect(onChange).not.toBeCalled();
			const event = { persist: jest.fn() };

			// when
			wrapper.find(DateTimePicker).prop('onSubmit')(event, {
				date: testedDate,
				time: testedTime,
			});

			// then
			expect(onChange).toBeCalledWith(event, {
				datetime: new Date(2015, 11, 30, 20, 50),
				errorMessage: undefined,
				origin: 'PICKER',
			});
		});
	});

	describe('onFocus', () => {
		it('should update state', () => {
			// given
			const wrapper = mount(<InputDateTimePicker id={DEFAULT_ID} />, {
				disableLifecycleMethods: true,
			});
			expect(wrapper.state('inputFocused')).toBe(false);

			// when
			wrapper.find('input').simulate('focus');

			// then
			expect(wrapper.state('inputFocused')).toBe(true);
		});

		it('should show picker', () => {
			// given
			const wrapper = mount(<InputDateTimePicker id={DEFAULT_ID} />, {
				disableLifecycleMethods: true,
			});
			expect(wrapper.state('isDropdownShown')).toBe(false);

			// when
			wrapper.find('input').simulate('focus');

			// then
			expect(wrapper.state('isDropdownShown')).toBe(true);
		});

		it('should NOT show picker on readonly mode', () => {
			// given
			const wrapper = mount(<InputDateTimePicker id={DEFAULT_ID} readOnly />, {
				disableLifecycleMethods: true,
			});
			expect(wrapper.state('isDropdownShown')).toBe(false);

			// when
			wrapper.find('input').simulate('focus');

			// then
			expect(wrapper.state('isDropdownShown')).toBe(false);
		});
	});

	describe('onBlur', () => {
		it('should update state', () => {
			// given
			const wrapper = mount(<InputDateTimePicker id={DEFAULT_ID} />, {
				disableLifecycleMethods: true,
			});
			wrapper.setState({ inputFocused: true });

			// when
			wrapper.find('input').simulate('blur');

			// then
			expect(wrapper.state('inputFocused')).toBe(false);
		});

		it('should call onBlur callback', () => {
			// given
			const onBlur = jest.fn();
			const wrapper = mount(<InputDateTimePicker id={DEFAULT_ID} onBlur={onBlur} />, {
				disableLifecycleMethods: true,
			});
			expect(onBlur).not.toBeCalled();

			// when
			wrapper.find('input').simulate('blur');

			// then
			expect(onBlur).toBeCalled();
		});
	});
	*/
});
