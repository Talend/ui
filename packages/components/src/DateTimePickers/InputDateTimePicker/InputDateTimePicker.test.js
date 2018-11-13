import React from 'react';
import { shallow, mount } from 'enzyme';

import cases from 'jest-in-case';
import isSameDay from 'date-fns/is_same_day';
import isEqual from 'date-fns/is_equal';

import InputDateTimePicker from './InputDateTimePicker.component';
import keycode from 'keycode/index';

const DEFAULT_ID = 'DEFAULT_ID';

describe('InputDateTimePicker', () => {
	it('should render', () => {
		// when
		const wrapper = shallow(
			<InputDateTimePicker id={DEFAULT_ID} selectedDateTime={new Date(2017, 3, 4, 15, 27)} />,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	cases(
		'initial state',
		({ initialDate, expectedTextInput, expectedDate, expectedTime }) => {
			// when
			const wrapper = shallow(
				<InputDateTimePicker id={DEFAULT_ID} selectedDateTime={initialDate} />,
			);

			// then
			const textInput = wrapper.find('DebounceInput').prop('value');
			expect(textInput).toBe(expectedTextInput);

			const { date, time } = wrapper.find('DateTimePicker').prop('selection');
			expect(date).toEqual(expectedDate);
			expect(time).toEqual(expectedTime);
		},
		[
			{
				name: 'should init default state',
				initialDate: undefined,
				expectedTextInput: '',
				expectedDate: undefined,
				expectedTime: undefined,
			},
			{
				name: 'should init default state from props invalid date',
				initialDate: new Date(''), // invalid date
				expectedTextInput: '',
				expectedDate: undefined,
				expectedTime: undefined,
			},
			{
				name: 'should init state from props',
				initialDate: new Date(2015, 3, 4, 12, 36),
				expectedTextInput: '2015-04-04 12:36',
				expectedDate: new Date(2015, 3, 4),
				expectedTime: { hours: 12, minutes: 36 },
			},
		],
	);

	cases(
		'props update should update state',
		({ initialDate, newDate, expectedTextInput, expectedDate, expectedTime }) => {
			// given
			const wrapper = shallow(
				<InputDateTimePicker id={DEFAULT_ID} selectedDateTime={initialDate} />,
			);

			// when
			wrapper.setProps({
				selectedDateTime: newDate,
			});

			// then
			const textInput = wrapper.find('DebounceInput').prop('value');
			expect(textInput).toBe(expectedTextInput);

			const { date, time } = wrapper.find('DateTimePicker').prop('selection');
			expect(date).toEqual(expectedDate);
			expect(time).toEqual(expectedTime);
		},
		[
			{
				name: 'from undefined props',
				initialDate: new Date(),
				newDate: undefined,
				expectedTextInput: '',
				expectedDate: undefined,
				expectedTime: undefined,
			},
			{
				name: 'from props invalid date',
				initialDate: new Date(),
				newDate: new Date(''), // invalid date
				expectedTextInput: '',
				expectedDate: undefined,
				expectedTime: undefined,
			},
			{
				name: 'from props valid date',
				initialDate: new Date(),
				newDate: new Date(2015, 3, 4, 12, 36),
				expectedTextInput: '2015-04-04 12:36',
				expectedDate: new Date(2015, 3, 4),
				expectedTime: { hours: 12, minutes: 36 },
			},
		],
	);

	cases(
		'props update should NOT update state',
		({ initialDate, newDate }) => {
			// given
			const wrapper = shallow(
				<InputDateTimePicker id={DEFAULT_ID} selectedDateTime={initialDate} />,
			);
			const previousState = wrapper.state();

			// when
			wrapper.setProps({
				selectedDateTime: newDate,
			});

			// then
			expect(wrapper.state()).toBe(previousState);
		},
		[
			{
				name: "when date ref doesn't change",
				initialDate: undefined,
				newDate: undefined,
			},
			{
				name: 'when the dates are equals',
				initialDate: new Date(2015, 1, 5, 21, 52),
				newDate: new Date(2015, 1, 5, 21, 52),
			},
		],
	);

	describe('focus/blur', () => {
		it('should open picker on focus', () => {
			// given
			const wrapper = mount(<InputDateTimePicker id={DEFAULT_ID} />);
			expect(wrapper.find('DateTimePicker').length).toBe(0);

			// when
			wrapper.simulate('focus');

			// then
			expect(wrapper.find('DateTimePicker').length).toBe(1);
		});

		it('should close picker on blur', done => {
			// given
			const wrapper = mount(<InputDateTimePicker id={DEFAULT_ID} />);
			wrapper.simulate('focus');

			// when
			wrapper.simulate('blur');

			// then
			setTimeout(() => {
				wrapper.update();
				expect(wrapper.find('DateTimePicker').length).toBe(0);
				done();
			}, 300); // overlay fade animation
		});
	});

	describe('keydown', () => {
		it('should close the picker and focus on input with ESC', done => {
			// given
			const wrapper = mount(<InputDateTimePicker id={DEFAULT_ID} />);
			wrapper.simulate('focus');
			const event = { keyCode: keycode.codes.esc };

			// when
			wrapper.simulate('keydown', event);

			// then
			setTimeout(() => {
				wrapper.update();
				expect(wrapper.find('DateTimePicker').length).toBe(0);
				done();
			}, 300); // overlay fade animation
		});

		it('should focus open picker if it is closed with input DOWN', () => {
			// given
			const wrapper = mount(<InputDateTimePicker id={DEFAULT_ID} />);
			expect(wrapper.find('DateTimePicker').length).toBe(0);
			const event = { keyCode: keycode.codes.down };

			// when
			wrapper.find('input').simulate('keydown', event);

			// then
			expect(wrapper.find('DateTimePicker').length).toBe(1);
		});

		it('should focus on calendar day if it is open with input DOWN', () => {
			// given
			const wrapper = mount(<InputDateTimePicker id={DEFAULT_ID} />);
			wrapper.simulate('focus');
			const event = { keyCode: keycode.codes.down };

			// when
			wrapper
				.find('input')
				.first()
				.simulate('keydown', event);

			// then
			expect(document.activeElement.classList.contains('tc-date-picker-day')).toBe(true);
		});
	});

	describe('input blur', () => {
		it('should trigger props.onBlur', () => {
			// given
			const onBlur = jest.fn();
			const event = { target: {} };
			const wrapper = shallow(<InputDateTimePicker id={DEFAULT_ID} onBlur={onBlur} />);
			expect(onBlur).not.toBeCalled();

			// when
			wrapper.find('DebounceInput').simulate('blur', event);

			// then
			expect(onBlur).toBeCalledWith(event);
		});
	});

	describe('input change', () => {
		cases(
			'should update picker',
			({ textInput, expectedDate, expectedTime }) => {
				// given
				const event = { target: { value: textInput } };
				const wrapper = shallow(<InputDateTimePicker id={DEFAULT_ID} />);

				// when
				wrapper.find('DebounceInput').simulate('change', event);

				// then
				const textInputProps = wrapper.find('DebounceInput').prop('value');
				expect(textInputProps).toBe(textInput);

				const { date, time } = wrapper.find('DateTimePicker').prop('selection');
				expect(date).toEqual(expectedDate);
				expect(time).toEqual(expectedTime);
			},
			[
				{
					name: 'with valid datetime',
					textInput: '2015-01-15 15:45',
					expectedDate: new Date(2015, 0, 15),
					expectedTime: { hours: 15, minutes: 45 },
				},
				{
					name: 'with invalid date',
					textInput: '2015aze-01-15 15:45',
					expectedDate: undefined,
					expectedTime: { hours: 15, minutes: 45 },
				},
				{
					name: 'with invalid time',
					textInput: '2015-01-15 15aze:45',
					expectedDate: new Date(2015, 0, 15),
					expectedTime: { hours: '15aze', minutes: 45 },
				},
				{
					name: 'with empty string',
					textInput: '',
					expectedDate: undefined,
					expectedTime: undefined,
				},
			],
		);

		it('should trigger props.onChange with valid datetime', () => {
			// given
			const onChange = jest.fn();
			const event = { target: { value: '2015-01-15 15:45' } };
			const wrapper = shallow(<InputDateTimePicker id={DEFAULT_ID} onChange={onChange} />);
			expect(onChange).not.toBeCalled();

			// when
			wrapper.find('DebounceInput').simulate('change', event);

			// then
			expect(onChange).toBeCalledWith(event, {
				errorMessage: undefined,
				datetime: new Date(2015, 0, 15, 15, 45),
				origin: 'INPUT',
			});
		});

		it('should trigger props.onChange with invalid date', () => {
			// given
			const onChange = jest.fn();
			const event = { target: { value: '2015aze-01-15 15:45' } };
			const wrapper = shallow(<InputDateTimePicker id={DEFAULT_ID} onChange={onChange} />);
			expect(onChange).not.toBeCalled();

			// when
			wrapper.find('DebounceInput').simulate('change', event);

			// then
			expect(onChange).toBeCalled();
			const args = onChange.mock.calls[0];
			expect(args[0]).toBe(event);
			expect(args[1].errorMessage).toBe('DATE - INCORRECT FORMAT');
			expect(isNaN(args[1].datetime.getTime())).toBe(true);
			expect(args[1].origin).toBe('INPUT');
		});
	});

	describe('picker change', () => {
		cases(
			'should update input',
			({ date, time, expectedTextInput }) => {
				// given
				const wrapper = shallow(<InputDateTimePicker id={DEFAULT_ID} />);

				// when
				wrapper.find('DateTimePicker').prop('onSubmit')({}, { date, time });
				wrapper.update();

				// then
				const textInputProps = wrapper.find('DebounceInput').prop('value');
				expect(textInputProps).toBe(expectedTextInput);

				const selection = wrapper.find('DateTimePicker').prop('selection');
				expect(selection.date).toBe(date);
				expect(selection.time).toBe(time);
			},
			[
				{
					name: 'with valid datetime',
					date: new Date(2015, 0, 15),
					time: { hours: 15, minutes: 45 },
					expectedTextInput: '2015-01-15 15:45',
				},
				{
					name: 'with invalid time',
					date: new Date(2015, 0, 15),
					time: { hours: '15aze', minutes: 45 },
					expectedTextInput: '2015-01-15 15aze:45',
				},
			],
		);

		it('should trigger props.onChange with valid datetime', () => {
			// given
			const onChange = jest.fn();
			const event = { target: {} };
			const wrapper = shallow(<InputDateTimePicker id={DEFAULT_ID} onChange={onChange} />);
			expect(onChange).not.toBeCalled();

			// when
			wrapper.find('DateTimePicker').prop('onSubmit')(event, {
				date: new Date(2015, 0, 15),
				time: { hours: 15, minutes: 45 },
			});

			// then
			expect(onChange).toBeCalledWith(event, {
				errorMessage: undefined,
				datetime: new Date(2015, 0, 15, 15, 45),
				origin: 'PICKER',
			});
		});

		it('should trigger props.onChange with invalid time', () => {
			// given
			const onChange = jest.fn();
			const event = { target: {} };
			const wrapper = shallow(<InputDateTimePicker id={DEFAULT_ID} onChange={onChange} />);
			expect(onChange).not.toBeCalled();

			// when
			wrapper.find('DateTimePicker').prop('onSubmit')(event, {
				date: new Date(2015, 0, 15),
				time: { hours: '15aze', minutes: 45 },
			});

			// then
			expect(onChange).toBeCalled();
			const args = onChange.mock.calls[0];
			expect(args[0]).toBe(event);
			expect(args[1].errorMessage).toBe('TIME - INCORRECT HOUR NUMBER');
			expect(isNaN(args[1].datetime.getTime())).toBe(true);
			expect(args[1].origin).toBe('PICKER');
		});
	});
});
