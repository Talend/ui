import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import cases from 'jest-in-case';

import Manager from './Manager.component';
import { DateRangeContext } from '../Context';

const DEFAULT_ID = 'DEFAULT_ID';

function DateRangeConsumerDiv() {
	return <div />;
}
// eslint-disable-next-line react/prop-types
function DateRangeConsumer() {
	return (
		<DateRangeContext.Consumer>
			{contextValue => <DateRangeConsumerDiv {...contextValue} />}
		</DateRangeContext.Consumer>
	);
}

describe('DateRange.Manager', () => {
	it('should render its children', () => {
		// when
		const wrapper = shallow(
			<Manager id={DEFAULT_ID} startDate={new Date(2017, 3, 4)} endDate={new Date(2017, 3, 10)}>
				<DateRangeConsumer />
			</Manager>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	describe('state management', () => {
		cases(
			'initial state',
			({ startDate, endDate, expectedStartDate, expectedEndDate }) => {
				// when
				const wrapper = mount(
					<Manager id={DEFAULT_ID} startDate={startDate} endDate={endDate}>
						<DateRangeConsumer />
					</Manager>,
				);

				// then
				const contextValue = wrapper.find('DateRangeConsumerDiv').props();
				expect(contextValue.startDate).toEqual(expectedStartDate);
				expect(contextValue.endDate).toEqual(expectedEndDate);
			},
			[
				{
					name: 'should init default state',
					startDate: undefined,
					endDate: undefined,
					expectedStartDate: {
						value: undefined,
						textInput: '',
					},
					expectedEndDate: {
						value: undefined,
						textInput: '',
					},
				},
				{
					name: 'should init default state from props invalid date',
					startDate: undefined,
					endDate: undefined,
					expectedStartDate: {
						value: undefined,
						textInput: '',
					},
					expectedEndDate: {
						value: undefined,
						textInput: '',
					},
				},
				{
					name: 'should init state from date object',
					startDate: new Date(2019, 9, 1),
					endDate: new Date(2019, 9, 10),
					expectedStartDate: {
						value: new Date(2019, 9, 1),
						textInput: '2019-10-01',
					},
					expectedEndDate: {
						value: new Date(2019, 9, 10),
						textInput: '2019-10-10',
					},
				},
				{
					name: 'should init state from datetime string',
					startDate: '2019-10-01',
					endDate: '2019-10-10',
					expectedStartDate: {
						value: new Date(2019, 9, 1),
						textInput: '2019-10-01',
					},
					expectedEndDate: {
						value: new Date(2019, 9, 10),
						textInput: '2019-10-10',
					},
				},
			],
		);

		// cases(
		// 	'props update should update state',
		// 	({ initialDate, newDate, expectedDate, expectedTime, useSeconds }) => {
		// 		// given
		// 		const wrapper = mount(
		// 			<Manager id={DEFAULT_ID} value={initialDate} useSeconds={useSeconds}>
		// 				<DateRangeConsumer />
		// 			</Manager>,
		// 		);

		// 		// when
		// 		act(() => {
		// 			wrapper.setProps({
		// 				value: newDate,
		// 			});
		// 		});
		// 		wrapper.update();

		// 		// then
		// 		const contextValue = wrapper.find('DateRangeConsumerDiv').props();
		// 		expect(contextValue.date).toEqual(expectedDate);
		// 		expect(contextValue.time).toEqual(expectedTime);
		// 	},
		// 	[
		// 		{
		// 			name: 'from undefined props(Date type)',
		// 			initialDate: new Date(),
		// 			newDate: undefined,
		// 			expectedDate: undefined,
		// 			expectedTime: undefined,
		// 		},
		// 		{
		// 			name: 'from undefined props(string type)',
		// 			initialDate: '2019-09-30 12:00',
		// 			newDate: undefined,
		// 			expectedDate: undefined,
		// 			expectedTime: undefined,
		// 		},
		// 		{
		// 			name: 'from props invalid date',
		// 			initialDate: new Date(),
		// 			newDate: new Date(''), // invalid date
		// 			expectedDate: undefined,
		// 			expectedTime: undefined,
		// 		},
		// 		{
		// 			name: 'from props valid date',
		// 			initialDate: new Date(),
		// 			newDate: new Date(2015, 3, 4, 12, 36),
		// 			expectedDate: new Date(2015, 3, 4),
		// 			expectedTime: { hours: '12', minutes: '36', seconds: '00' },
		// 		},
		// 		{
		// 			name: 'from props valid date with seconds',
		// 			initialDate: new Date(),
		// 			newDate: new Date(2015, 3, 4, 12, 36, 30),
		// 			expectedDate: new Date(2015, 3, 4),
		// 			expectedTime: { hours: '12', minutes: '36', seconds: '30' },
		// 			useSeconds: true,
		// 		},
		// 	],
		// );

		// cases(
		// 	'props update should NOT update state',
		// 	({ initialDate, newDate }) => {
		// 		// given
		// 		const wrapper = mount(
		// 			<Manager id={DEFAULT_ID} value={initialDate}>
		// 				<DateRangeConsumer />
		// 			</Manager>,
		// 		);
		// 		const previousState = wrapper.find('DateRangeConsumerDiv').props();

		// 		// when
		// 		act(() => {
		// 			wrapper.setProps({
		// 				value: newDate,
		// 			});
		// 		});
		// 		wrapper.update();

		// 		// then
		// 		const nextState = wrapper.find('DateRangeConsumerDiv').props();
		// 		expect(previousState.date).toEqual(nextState.date);
		// 		expect(previousState.time).toEqual(nextState.time);
		// 	},
		// 	[
		// 		{
		// 			name: "when date ref doesn't change",
		// 			initialDate: undefined,
		// 			newDate: undefined,
		// 		},
		// 		{
		// 			name: 'when the dates are equals',
		// 			initialDate: new Date(2015, 1, 5, 21, 52),
		// 			newDate: new Date(2015, 1, 5, 21, 52),
		// 		},
		// 	],
		// );
		// describe('on change', () => {
		// 	cases(
		// 		'should update state when date change',
		// 		({ expectedDate, expectedTime, textInput, dateFormat, useSeconds }) => {
		// 			// given
		// 			const event = { target: { value: textInput } };
		// 			const wrapper = mount(
		// 				<Manager id={DEFAULT_ID} dateFormat={dateFormat} useSeconds={useSeconds}>
		// 					<DateRangeConsumer />
		// 				</Manager>,
		// 			);

		// 			// when
		// 			act(() => {
		// 				wrapper
		// 					.find('DateRangeConsumerDiv')
		// 					.props()
		// 					.onDateChange(event, { date: expectedDate, textInput, errors: [] });
		// 			});
		// 			wrapper.update();

		// 			// then
		// 			const props = wrapper.find('DateRangeConsumerDiv').props();

		// 			expect(props.date).toEqual(expectedDate);
		// 			expect(props.time).toEqual(expectedTime);
		// 		},
		// 		[
		// 			{
		// 				name: 'with valid date',
		// 				textInput: '2015-01-15',
		// 				expectedDate: new Date(2015, 0, 15),
		// 				expectedTime: undefined,
		// 			},
		// 			{
		// 				name: 'with invalid date',
		// 				textInput: '2015aze-01-15',
		// 				expectedDate: '2015aze-01-15',
		// 				expectedTime: undefined,
		// 			},
		// 			{
		// 				name: 'with empty string',
		// 				textInput: '',
		// 				expectedDate: '',
		// 				expectedTime: undefined,
		// 			},
		// 			{
		// 				name: 'with custom date format',
		// 				textInput: '15/01/2015',
		// 				expectedDate: new Date(2015, 0, 15),
		// 				expectedTime: undefined,
		// 				dateFormat: 'DD/MM/YYYY',
		// 			},
		// 		],
		// 	);
		// 	cases(
		// 		'should update state when time change',
		// 		({ expectedDateRange, expectedDate, expectedTime, textInput, dateFormat, useSeconds }) => {
		// 			// given
		// 			const event = { target: { value: textInput } };
		// 			const wrapper = mount(
		// 				<Manager
		// 					id={DEFAULT_ID}
		// 					dateFormat={dateFormat}
		// 					useSeconds={useSeconds}
		// 					value={expectedDateRange}
		// 				>
		// 					<DateRangeConsumer />
		// 				</Manager>,
		// 			);

		// 			// when
		// 			act(() => {
		// 				wrapper
		// 					.find('DateRangeConsumerDiv')
		// 					.props()
		// 					.onTimeChange(event, { time: expectedTime, textInput, errors: [] });
		// 			});
		// 			wrapper.update();

		// 			// then
		// 			const props = wrapper.find('DateRangeConsumerDiv').props();

		// 			expect(props.date).toEqual(expectedDate);
		// 			expect(props.time).toEqual(expectedTime);
		// 		},
		// 		[
		// 			{
		// 				name: 'with valid time with seconds',
		// 				textInput: '15:45:22',
		// 				expectedDateRange: new Date(2015, 0, 15, 15, 45, 22),
		// 				expectedDate: new Date(2015, 0, 15),
		// 				expectedTime: { hours: '15', minutes: '45', seconds: '22' },
		// 				useSeconds: true,
		// 			},
		// 			{
		// 				name: 'with invalid time',
		// 				textInput: '15aze:45',
		// 				expectedDate: new Date(2015, 0, 15),
		// 				expectedDateRange: new Date(2015, 0, 15),
		// 				expectedTime: { hours: '15aze', minutes: '45', seconds: '00' },
		// 			},
		// 		],
		// 	);

		// 	it('should trigger props.onChange when date change', () => {
		// 		// given
		// 		const onChange = jest.fn();
		// 		const event = { target: { value: '2015-01-15' } };
		// 		const wrapper = mount(
		// 			<Manager id={DEFAULT_ID} onChange={onChange}>
		// 				<DateRangeConsumer />
		// 			</Manager>,
		// 		);
		// 		expect(onChange).not.toBeCalled();

		// 		// when
		// 		act(() => {
		// 			wrapper
		// 				.find('DateRangeConsumerDiv')
		// 				.props()
		// 				.onDateChange(event, {
		// 					date: new Date(2015, 0, 15),
		// 					textInput: '2015-01-15',
		// 					errors: [],
		// 				});
		// 		});
		// 		wrapper.update();

		// 		// then
		// 		expect(onChange).toBeCalled();
		// 		const args = onChange.mock.calls[0];
		// 		expect(args[0]).toBe(event);
		// 		expect(isNaN(args[1].datetime.getTime())).toBe(true);
		// 		expect(args[1].textInput).toBe('2015-01-15');
		// 		expect(args[1].errors).toEqual([
		// 			{ code: 'INVALID_TIME_EMPTY', message: 'Time is required' },
		// 		]);
		// 		expect(args[1].errorMessage).toBe('Time is required');
		// 	});

		// 	it('should trigger props.onChange with invalid date', () => {
		// 		// given
		// 		const onChange = jest.fn();
		// 		const event = { target: { value: '2015aze-01-15' } };
		// 		const wrapper = mount(
		// 			<Manager id={DEFAULT_ID} onChange={onChange}>
		// 				<DateRangeConsumer />
		// 			</Manager>,
		// 		);
		// 		expect(onChange).not.toBeCalled();

		// 		// when
		// 		act(() => {
		// 			wrapper
		// 				.find('DateRangeConsumerDiv')
		// 				.props()
		// 				.onDateChange(event, {
		// 					date: null,
		// 					textInput: '2015aze-01-15',
		// 					errors: [{ code: 'INVALID_DATE_FORMAT', message: 'Date format is invalid' }],
		// 				});
		// 		});
		// 		wrapper.update();

		// 		// then
		// 		expect(onChange).toBeCalled();
		// 		const args = onChange.mock.calls[0];
		// 		expect(args[0]).toBe(event);
		// 		expect(args[1].errorMessage).toBe('Date format is invalid');
		// 		expect(args[1].errors).toEqual([
		// 			{ code: 'INVALID_DATE_FORMAT', message: 'Date format is invalid' },
		// 		]);
		// 		expect(isNaN(args[1].datetime.getTime())).toBe(true);
		// 	});

		// 	it('should trigger props.onChange when time change', () => {
		// 		// given
		// 		const onChange = jest.fn();
		// 		const dateEvent = { target: { value: '2015-01-15' } };
		// 		const timeEvent = { target: { value: '12:45' } };
		// 		const wrapper = mount(
		// 			<Manager id={DEFAULT_ID} onChange={onChange}>
		// 				<DateRangeConsumer />
		// 			</Manager>,
		// 		);
		// 		expect(onChange).not.toBeCalled();

		// 		// when
		// 		act(() => {
		// 			wrapper
		// 				.find('DateRangeConsumerDiv')
		// 				.props()
		// 				.onDateChange(dateEvent, {
		// 					date: new Date(2015, 0, 15),
		// 					textInput: '2015-01-15',
		// 					errors: [],
		// 				});
		// 		});
		// 		wrapper.update();
		// 		act(() => {
		// 			wrapper
		// 				.find('DateRangeConsumerDiv')
		// 				.props()
		// 				.onTimeChange(timeEvent, {
		// 					time: { hours: '12', minutes: '45', seconds: '00' },
		// 					textInput: '12:45',
		// 					errors: [],
		// 				});
		// 		});
		// 		wrapper.update();
		// 		expect(onChange).toHaveBeenCalledTimes(2);
		// 		const args = onChange.mock.calls[1];
		// 		expect(args[0]).toBe(timeEvent);
		// 		expect(args[1].datetime).toEqual(new Date(2015, 0, 15, 12, 45));
		// 		expect(args[1].textInput).toBe('2015-01-15 12:45');
		// 		expect(args[1].errors).toEqual([]);
		// 		expect(args[1].errorMessage).toBe(null);
		// 	});
		// 	it('should trigger props.onChange with invalid time', () => {
		// 		// given
		// 		const onChange = jest.fn();
		// 		const dateEvent = { target: { value: '2015-01-15' } };
		// 		const timeEvent = { target: { value: '12dfd:45' } };
		// 		const wrapper = mount(
		// 			<Manager id={DEFAULT_ID} onChange={onChange}>
		// 				<DateRangeConsumer />
		// 			</Manager>,
		// 		);
		// 		expect(onChange).not.toBeCalled();

		// 		// when
		// 		act(() => {
		// 			wrapper
		// 				.find('DateRangeConsumerDiv')
		// 				.props()
		// 				.onDateChange(dateEvent, {
		// 					date: new Date(2015, 0, 15),
		// 					textInput: '2015-01-15',
		// 					errors: [],
		// 				});
		// 		});
		// 		wrapper.update();
		// 		act(() => {
		// 			wrapper
		// 				.find('DateRangeConsumerDiv')
		// 				.props()
		// 				.onTimeChange(timeEvent, {
		// 					textInput: '12dfd:45',
		// 					errors: [{ code: 'TIME_FORMAT_INVALID', message: 'Time is invalid' }],
		// 				});
		// 		});
		// 		wrapper.update();
		// 		expect(onChange).toHaveBeenCalledTimes(2);
		// 		const args = onChange.mock.calls[1];
		// 		expect(args[0]).toBe(timeEvent);
		// 		expect(isNaN(args[1].datetime.getTime())).toBe(true);
		// 		expect(args[1].textInput).toBe('2015-01-15 12dfd:45');
		// 		expect(args[1].errors).toEqual([
		// 			{ code: 'TIME_FORMAT_INVALID', message: 'Time is invalid' },
		// 		]);
		// 		expect(args[1].errorMessage).toBe('Time is invalid');
		// 	});
		// });
	});
	describe('picker change', () => {
		cases(
			'should update input',
			({ date, expectedTextInput, dateFormat }) => {
				// given
				const event = { preventDefault: () => {} };
				const wrapper = mount(
					<Manager id={DEFAULT_ID} dateFormat={dateFormat}>
						<DateRangeConsumer />
					</Manager>,
				);

				// when
				act(() => {
					wrapper
						.find('DateRangeConsumerDiv')
						.prop('inputManagement')
						.onFocus(event, 'startDate');
				});
				wrapper.update();

				act(() => {
					wrapper
						.find('DateRangeConsumerDiv')
						.prop('pickerManagement')
						.onSubmit(event, { date });
				});
				wrapper.update();

				// then
				const dateValue = wrapper.find('DateRangeConsumerDiv').props();
				expect(dateValue.startDate.textInput).toBe(expectedTextInput);
				expect(dateValue.startDate.value).toEqual(date);
			},
			[
				{
					name: 'with valid date',
					date: new Date(2015, 0, 15),
					expectedTextInput: '2015-01-15',
				},
				{
					name: 'with custom date format',
					date: new Date(2015, 0, 15),
					dateFormat: 'DD/MM/YYYY',
					expectedTextInput: '15/01/2015',
				},
			],
		);

		it('should trigger props.onChange with valid date', () => {
			// given
			const onChange = jest.fn();
			const event = { target: {}, preventDefault: () => {} };
			const wrapper = mount(
				<Manager id={DEFAULT_ID} onChange={onChange}>
					<DateRangeConsumer />
				</Manager>,
			);

			expect(onChange).not.toBeCalled();

			// when
			act(() => {
				wrapper
					.find('DateRangeConsumerDiv')
					.prop('inputManagement')
					.onFocus(event, 'startDate');
			});
			wrapper.update();
			act(() => {
				wrapper
					.find('DateRangeConsumerDiv')
					.prop('pickerManagement')
					.onSubmit(event, {
						date: new Date(2015, 0, 15),
					});
			});
			wrapper.update();
			// then
			expect(onChange).toBeCalledWith(
				event,
				{
					startDate: new Date(2015, 0, 15),
					endDate: undefined,
					errorMessage: undefined,
					errors: [],
					field: 'startDate',
					origin: 'RANGE_PICKER',
				},
				'endDate',
			);
		});
	});
});
