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

	describe('value management', () => {
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

		cases(
			'props update should update state',
			({ initialDate, newDate, field, expectedDate }) => {
				// given
				const props = { [field]: initialDate };
				const wrapper = mount(
					<Manager id={DEFAULT_ID} {...props}>
						<DateRangeConsumer />
					</Manager>,
				);

				// when
				act(() => {
					wrapper.setProps({
						[field]: newDate,
					});
				});
				wrapper.update();

				// then
				const contextValue = wrapper.find('DateRangeConsumerDiv').props();
				expect(contextValue[field].value).toEqual(expectedDate);
			},
			[
				{
					name: 'startDate - from undefined props(Date type)',
					initialDate: new Date(),
					newDate: undefined,
					expectedDate: undefined,
					field: 'startDate',
				},
				{
					name: 'endDate - from undefined props(Date type)',
					initialDate: new Date(),
					newDate: undefined,
					expectedDate: undefined,
					field: 'endDate',
				},
				{
					name: 'startDate - from undefined props(string type)',
					initialDate: '2019-09-30',
					newDate: undefined,
					expectedDate: undefined,
					field: 'startDate',
				},
				{
					name: 'endDate - from undefined props(string type)',
					initialDate: '2019-09-30',
					newDate: undefined,
					expectedDate: undefined,
					field: 'endDate',
				},
				{
					name: 'startDate - from props invalid date',
					initialDate: new Date(),
					newDate: new Date(''), // invalid date
					expectedDate: undefined,
					field: 'startDate',
				},
				{
					name: 'endDate - from props invalid date',
					initialDate: new Date(),
					newDate: new Date(''), // invalid date
					expectedDate: undefined,
					field: 'endDate',
				},
				{
					name: 'startDate - from props valid date',
					initialDate: new Date(),
					newDate: new Date(2015, 3, 4, 12, 36),
					expectedDate: new Date(2015, 3, 4),
					field: 'startDate',
				},
				{
					name: 'endDate - from props valid date',
					initialDate: new Date(),
					newDate: new Date(2015, 3, 4, 12, 36),
					expectedDate: new Date(2015, 3, 4),
					field: 'endDate',
				},
			],
		);

		cases(
			'props update should NOT update state',
			({ initialDate, newDate, field }) => {
				// given
				const props = { [field]: initialDate };
				const wrapper = mount(
					<Manager id={DEFAULT_ID} {...props}>
						<DateRangeConsumer />
					</Manager>,
				);
				const previousState = wrapper.find('DateRangeConsumerDiv').props();

				// when
				act(() => {
					wrapper.setProps({
						[field]: newDate,
					});
				});
				wrapper.update();

				// then
				const nextState = wrapper.find('DateRangeConsumerDiv').props();
				expect(previousState[field].value).toEqual(nextState[field].value);
			},
			[
				{
					name: "startDate - when date ref doesn't change",
					initialDate: undefined,
					newDate: undefined,
					field: 'startDate',
				},
				{
					name: "endDate - when date ref doesn't change",
					initialDate: undefined,
					newDate: undefined,
					field: 'endDate',
				},
				{
					name: 'startDate - when the dates are equals',
					initialDate: new Date(2015, 1, 5, 21, 52),
					newDate: new Date(2015, 1, 5, 21, 52),
					field: 'startDate',
				},
				{
					name: 'endDate - when the dates are equals',
					initialDate: new Date(2015, 1, 5, 21, 52),
					newDate: new Date(2015, 1, 5, 21, 52),
					field: 'endDate',
				},
			],
		);
		describe('input change', () => {
			cases(
				'should update picker',
				({ field, textInput, expectedDate, dateFormat }) => {
					// given
					const event = { target: { value: textInput } };
					const wrapper = mount(
						<Manager id={DEFAULT_ID} dateFormat={dateFormat}>
							<DateRangeConsumer />
						</Manager>,
					);

					// when
					act(() => {
						const props = wrapper.find('DateRangeConsumerDiv').prop('inputManagement');
						if (field === 'startDate') {
							props.onStartChange(event);
						} else {
							props.onEndChange(event);
						}
					});
					wrapper.update();

					// then
					const value = wrapper.find('DateRangeConsumerDiv').props();
					expect(value[field].textInput).toBe(textInput);
					expect(value[field].value).toEqual(expectedDate);
				},
				[
					{
						name: 'startDate - with valid date',
						field: 'startDate',
						textInput: '2015-01-15',
						expectedDate: new Date(2015, 0, 15),
					},
					{
						name: 'endDate - with valid date',
						field: 'endDate',
						textInput: '2015-01-15',
						expectedDate: new Date(2015, 0, 15),
					},
					{
						name: 'startDate - with invalid date',
						field: 'startDate',
						textInput: '2015aze-01-15',
						expectedDate: undefined,
					},
					{
						name: 'endDate - with invalid date',
						field: 'endDate',
						textInput: '2015aze-01-15',
						expectedDate: undefined,
					},
					{
						name: 'startDate - with empty string',
						field: 'startDate',
						textInput: '',
						expectedDate: undefined,
					},
					{
						name: 'endDate - with empty string',
						field: 'endDate',
						textInput: '',
						expectedDate: undefined,
					},
					{
						name: 'startDate - with custom date format',
						field: 'startDate',
						textInput: '15/01/2015',
						expectedDate: new Date(2015, 0, 15),
						dateFormat: 'DD/MM/YYYY',
					},
					{
						name: 'endDate - with custom date format',
						field: 'endDate',
						textInput: '15/01/2015',
						expectedDate: new Date(2015, 0, 15),
						dateFormat: 'DD/MM/YYYY',
					},
				],
			);

			cases(
				'should trigger props.onChange with valid startDate/endDate',
				({ field, inputText, expectedStartDate, expectedEndDate, expectedOrigin }) => {
					// given
					const onChange = jest.fn();
					const event = { target: { value: inputText } };
					const wrapper = mount(
						<Manager id={DEFAULT_ID} onChange={onChange} dateFormat="YYYY-MM-DD">
							<DateRangeConsumer />
						</Manager>,
					);
					expect(onChange).not.toBeCalled();

					// when
					act(() => {
						const props = wrapper.find('DateRangeConsumerDiv').prop('inputManagement');
						if (field === 'startDate') {
							props.onStartChange(event);
						} else {
							props.onEndChange(event);
						}
					});
					wrapper.update();

					// then
					expect(onChange).toBeCalledWith(event, {
						startDate: expectedStartDate,
						endDate: expectedEndDate,
						errors: [],
						errorMessage: null,
						origin: expectedOrigin,
					});
				},
				[
					{
						name: 'when input valid date on from field',
						field: 'startDate',
						inputText: '2019-10-11',
						expectedStartDate: new Date(2019, 9, 11),
						expectedOrigin: 'START_INPUT',
					},
					{
						name: 'when input valid date on to field',
						field: 'endDate',
						inputText: '2019-10-11',
						expectedEndDate: new Date(2019, 9, 11),
						expectedOrigin: 'END_INPUT',
					},
				],
			);

			cases(
				'should trigger props.onChange with invalid date when input startDate/endDate',
				({ field, inputText, errors, errorMessage, expectedStartDate, expectedEndDate }) => {
					// given
					const onChange = jest.fn();
					const event = { target: { value: inputText } };
					const wrapper = mount(
						<Manager id={DEFAULT_ID} onChange={onChange}>
							<DateRangeConsumer />
						</Manager>,
					);
					expect(onChange).not.toBeCalled();

					act(() => {
						const props = wrapper.find('DateRangeConsumerDiv').prop('inputManagement');
						if (field === 'startDate') {
							props.onStartChange(event);
						} else {
							props.onEndChange(event);
						}
					});
					wrapper.update();

					// then
					expect(onChange).toBeCalled();
					const args = onChange.mock.calls[0];
					expect(args[0]).toBe(event);
					expect(args[1].errorMessage).toBe(errorMessage);
					expect(args[1].errors).toEqual(errors);
					expect(args[1].startDate).toBe(expectedStartDate);
					expect(args[1].endDate).toBe(expectedEndDate);
				},
				[
					{
						name: 'when input invalid date on from field',
						field: 'startDate',
						inputText: '0000dfd99',
						expectedStartDate: undefined,
						errors: [{ code: 'INVALID_DATE_FORMAT', message: 'Date format is invalid' }],
						errorMessage: 'Date format is invalid',
					},
					{
						name: 'when input invalid date on to field',
						field: 'endDate',
						inputText: '0000dfd99',
						expectedEndDate: undefined,
						errors: [{ code: 'INVALID_DATE_FORMAT', message: 'Date format is invalid' }],
						errorMessage: 'Date format is invalid',
					},
				],
			);
		});
		describe('picker change', () => {
			cases(
				'should update input',
				({ field, date, expectedTextInput, dateFormat }) => {
					// given
					const event = { preventDefault: () => {} };
					const wrapper = mount(
						<Manager id={DEFAULT_ID} dateFormat={dateFormat}>
							<DateRangeConsumer />
						</Manager>,
					);
					// when
					act(() => {
						const props = wrapper.find('DateRangeConsumerDiv').prop('pickerManagement');

						if (field === 'startDate') {
							props.onStartChange(event, { date });
						} else {
							props.onEndChange(event, { date });
						}
					});
					wrapper.update();
					// then
					const dateValue = wrapper.find('DateRangeConsumerDiv').props();
					expect(dateValue[field].textInput).toBe(expectedTextInput);
					expect(dateValue[field].value).toEqual(date);
				},
				[
					{
						name: 'startDate - with valid date',
						field: 'startDate',
						date: new Date(2015, 0, 15),
						expectedTextInput: '2015-01-15',
					},
					{
						name: 'startDate - with custom date format',
						field: 'startDate',
						date: new Date(2015, 0, 15),
						dateFormat: 'DD/MM/YYYY',
						expectedTextInput: '15/01/2015',
					},
					{
						name: 'endDate - with valid date',
						field: 'endDate',
						date: new Date(2015, 0, 15),
						expectedTextInput: '2015-01-15',
					},
					{
						name: 'endDate - with custom date format',
						field: 'endDate',
						date: new Date(2015, 0, 15),
						dateFormat: 'DD/MM/YYYY',
						expectedTextInput: '15/01/2015',
					},
				],
			);
			cases(
				'should trigger props.onChange with valid date',
				({ field, selectedDate, expectedStartDate, expectedEndDate, expectedOrigin }) => {
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
						const props = wrapper.find('DateRangeConsumerDiv').prop('pickerManagement');
						if (field === 'startDate') {
							props.onStartChange(event, {
								date: selectedDate,
							});
						} else {
							props.onEndChange(event, {
								date: selectedDate,
							});
						}
					});
					wrapper.update();
					// then
					expect(onChange).toBeCalledWith(event, {
						startDate: expectedStartDate,
						endDate: expectedEndDate,
						errorMessage: null,
						errors: [],
						origin: expectedOrigin,
					});
				},
				[
					{
						name: 'select date from startDate picker',
						field: 'startDate',
						selectedDate: new Date(2019, 9, 11),
						expectedStartDate: new Date(2019, 9, 11),
						expectedOrigin: 'START_PICKER',
					},
					{
						name: 'select date from endDate picker',
						field: 'endDate',
						selectedDate: new Date(2019, 9, 11),
						expectedEndDate: new Date(2019, 9, 11),
						expectedOrigin: 'END_PICKER',
					},
				],
			);
		});
	});
});
