import React from 'react';
import { shallow, mount } from 'enzyme';
import cases from 'jest-in-case';

import Manager from './Manager.component';
import { DateContext } from '../Context';

const DEFAULT_ID = 'DEFAULT_ID';

function DateTimeConsumerDiv() {
	return <div />;
}
// eslint-disable-next-line react/prop-types
function DateTimeConsumer() {
	return (
		<DateContext.Consumer>
			{contextValue => <DateTimeConsumerDiv {...contextValue} />}
		</DateContext.Consumer>
	);
}

describe('Date.Manager', () => {
	it('should render its children', () => {
		// when
		const wrapper = shallow(
			<Manager id={DEFAULT_ID} selectedDateTime={new Date(2017, 3, 4)}>
				<DateTimeConsumer />
			</Manager>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	describe('value management', () => {
		cases(
			'initial state',
			({ initialDate, expectedTextInput, expectedDate }) => {
				// when
				const wrapper = mount(
					<Manager id={DEFAULT_ID} selectedDate={initialDate}>
						<DateTimeConsumer />
					</Manager>,
				);

				// then
				const contextValue = wrapper.find('DateTimeConsumerDiv').props();
				expect(contextValue.value.textInput).toBe(expectedTextInput);
				expect(contextValue.value.date).toEqual(expectedDate);
			},
			[
				{
					name: 'should init default state',
					initialDate: undefined,
					expectedTextInput: '',
					expectedDate: undefined,
				},
				{
					name: 'should init default state from props invalid date',
					initialDate: new Date(''), // invalid date
					expectedTextInput: '',
					expectedDate: undefined,
				},
				{
					name: 'should init state from props',
					initialDate: new Date(2015, 3, 4),
					expectedTextInput: '2015-04-04',
					expectedDate: new Date(2015, 3, 4),
				},
			],
		);

		cases(
			'props update should update state',
			({ initialDate, newDate, expectedTextInput, expectedDate }) => {
				// given
				const wrapper = mount(
					<Manager id={DEFAULT_ID} selectedDateTime={initialDate}>
						<DateTimeConsumer />
					</Manager>,
				);

				// when
				wrapper.setProps({
					selectedDate: newDate,
				});

				// then
				const contextValue = wrapper.find('DateTimeConsumerDiv').props();
				expect(contextValue.value.textInput).toBe(expectedTextInput);
				expect(contextValue.value.date).toEqual(expectedDate);
			},
			[
				{
					name: 'from undefined props',
					initialDate: new Date(),
					newDate: undefined,
					expectedTextInput: '',
					expectedDate: undefined,
				},
				{
					name: 'from props invalid date',
					initialDate: new Date(),
					newDate: new Date(''), // invalid date
					expectedTextInput: '',
					expectedDate: undefined,
				},
				{
					name: 'from props valid date',
					initialDate: new Date(),
					newDate: new Date(2015, 3, 4),
					expectedTextInput: '2015-04-04',
					expectedDate: new Date(2015, 3, 4),
				},
			],
		);

		cases(
			'props update should NOT update state',
			({ initialDate, newDate }) => {
				// given
				const wrapper = mount(
					<Manager id={DEFAULT_ID} selectedDate={initialDate}>
						<DateTimeConsumer />
					</Manager>,
				);
				const previousState = wrapper.find('DateTimeConsumerDiv').props('value');

				// when
				wrapper.setProps({
					selectedDate: newDate,
				});

				// then
				const nextState = wrapper.find('DateTimeConsumerDiv').props('value');
				expect(previousState.textInput).toBe(nextState.textInput);
				expect(previousState.date).toBe(nextState.date);
			},
			[
				{
					name: "when date ref doesn't change",
					initialDate: undefined,
					newDate: undefined,
				},
				{
					name: 'when the dates are equals',
					initialDate: new Date(2015, 1, 5),
					newDate: new Date(2015, 1, 5),
				},
			],
		);

		describe('input change', () => {
			cases(
				'should update picker',
				({ textInput, expectedDate, dateFormat }) => {
					// given
					const event = { target: { value: textInput } };
					const wrapper = mount(
						<Manager id={DEFAULT_ID} dateFormat={dateFormat}>
							<DateTimeConsumer />
						</Manager>,
					);

					// when
					wrapper
						.find('DateTimeConsumerDiv')
						.prop('inputManagement')
						.onChange(event);
					wrapper.update();

					// then
					const value = wrapper.find('DateTimeConsumerDiv').prop('value');
					expect(value.textInput).toBe(textInput);

					const { date } = value;
					expect(date).toEqual(expectedDate);
				},
				[
					{
						name: 'with valid date',
						textInput: '2015-01-15',
						expectedDate: new Date(2015, 0, 15),
					},
					{
						name: 'with invalid date',
						textInput: '2015aze-01-15',
						expectedDate: undefined,
					},
					{
						name: 'with empty string',
						textInput: '',
						expectedDate: undefined,
					},
					{
						name: 'with custom date format',
						textInput: '15/01/2015',
						expectedDate: new Date(2015, 0, 15),
						dateFormat: 'DD/MM/YYYY',
					},
				],
			);

			it('should trigger props.onChange with valid date', () => {
				// given
				const onChange = jest.fn();
				const event = { target: { value: '2015-01-15' } };
				const wrapper = mount(
					<Manager id={DEFAULT_ID} onChange={onChange}>
						<DateTimeConsumer />
					</Manager>,
				);
				expect(onChange).not.toBeCalled();

				// when
				wrapper
					.find('DateTimeConsumerDiv')
					.prop('inputManagement')
					.onChange(event);

				// then
				expect(onChange).toBeCalledWith(event, {
					date: new Date(2015, 0, 15),
					origin: 'INPUT',
					textInput: '2015-01-15',
					errors: [],
					errorMessage: null,
				});
			});

			it('should trigger props.onChange with invalid date', () => {
				// given
				const onChange = jest.fn();
				const event = { target: { value: '2015aze-01-15' } };
				const wrapper = mount(
					<Manager id={DEFAULT_ID} onChange={onChange}>
						<DateTimeConsumer />
					</Manager>,
				);
				expect(onChange).not.toBeCalled();

				// when
				wrapper
					.find('DateTimeConsumerDiv')
					.prop('inputManagement')
					.onChange(event);

				// then
				expect(onChange).toBeCalled();
				const args = onChange.mock.calls[0];
				expect(args[0]).toBe(event);
				expect(args[1].errorMessage).toBe('Date format is invalid');
				expect(args[1].errors).toEqual([
					{ code: 'INVALID_DATE_FORMAT', message: 'Date format is invalid' },
				]);
				expect(args[1].date).toBe(undefined);
				expect(args[1].origin).toBe('INPUT');
			});
		});

		describe('picker change', () => {
			cases(
				'should update input',
				({ date, expectedTextInput, dateFormat }) => {
					// given
					const event = { preventDefault: () => {} };
					const wrapper = mount(
						<Manager id={DEFAULT_ID} dateFormat={dateFormat}>
							<DateTimeConsumer />
						</Manager>,
					);

					// when
					wrapper
						.find('DateTimeConsumerDiv')
						.prop('pickerManagement')
						.onSubmit(event, { date });
					wrapper.update();

					// then
					const dateValue = wrapper.find('DateTimeConsumerDiv').prop('value');
					expect(dateValue.textInput).toBe(expectedTextInput);
					expect(dateValue.date).toEqual(date);
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
						<DateTimeConsumer />
					</Manager>,
				);

				expect(onChange).not.toBeCalled();

				// when
				wrapper
					.find('DateTimeConsumerDiv')
					.prop('pickerManagement')
					.onSubmit(event, {
						date: new Date(2015, 0, 15),
					});
				// then
				expect(onChange).toBeCalledWith(event, {
					date: new Date(2015, 0, 15),
					origin: 'PICKER',
					textInput: '2015-01-15',
					errors: [],
					errorMessage: null,
				});
			});
		});

		describe('picker management', () => {
			it('should pass date options', () => {
				// when
				const wrapper = mount(
					<Manager id={DEFAULT_ID} useUTC={false}>
						<DateTimeConsumer />
					</Manager>,
				);

				// then
				const { useUTC } = wrapper.find('DateTimeConsumerDiv').prop('pickerManagement');
				expect(useUTC).toBe(false);
			});
		});
	});
});
