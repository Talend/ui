/* eslint-disable react/prop-types */
import { shallow, mount } from 'enzyme';
import cases from 'jest-in-case';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Manager from './Manager.component';
import { DateTimeContext } from '../Context';
import { FIELD_HOURS } from '../constants';

const DEFAULT_ID = 'DEFAULT_ID';

function DateTimeConsumerDiv(props) {
	return (
		<div data-testid="DateTimeConsumerDiv">
			<button type="text" data-testid="getProps" onClick={() => props.getProps(props)} />
			<input
				type="text"
				data-testid="textInput"
				value={props.datetime.textInput}
				onChange={props.inputManagement.onChange}
			/>
			<button type="button" onClick={e => props.pickerManagement.onSubmit(e, props.testSubmit)}>
				submit
			</button>
		</div>
	);
}
// eslint-disable-next-line react/prop-types
function DateTimeConsumer(props) {
	return (
		<DateTimeContext.Consumer>
			{contextValue => <DateTimeConsumerDiv {...contextValue} {...props} />}
		</DateTimeContext.Consumer>
	);
}

describe('DateTime.Manager', () => {
	it('should render its children', () => {
		// when
		render(
			<Manager id={DEFAULT_ID} selectedDateTime={new Date(2017, 3, 4, 15, 27)} useTime>
				<DateTimeConsumer />
			</Manager>,
		);

		// then
		expect(screen.getByTestId('DateTimeConsumerDiv')).toBeVisible();
	});

	describe('datetime management', () => {
		test.each([
			{
				name: 'should init default state',
				initialDate: undefined,
				expectedTextInput: '',
				expectedDate: undefined,
				expectedTime: { hours: '', minutes: '', seconds: '' },
			},
			{
				name: 'should init default state from props invalid date',
				initialDate: new Date(''), // invalid date
				expectedTextInput: '',
				expectedDate: undefined,
				expectedTime: { hours: '', minutes: '', seconds: '' },
			},
			{
				name: 'should init state from props',
				initialDate: new Date(2015, 3, 4, 12, 36),
				expectedTextInput: '2015-04-04 12:36:00',
				expectedDate: new Date(2015, 3, 4),
				expectedTime: { hours: '12', minutes: '36', seconds: '00' },
			},
		])('$name', async ({ initialDate, expectedTextInput, expectedDate, expectedTime }) => {
			// when
			const getProps = jest.fn();
			render(
				<Manager id={DEFAULT_ID} selectedDateTime={initialDate} useTime useSeconds>
					<DateTimeConsumer getProps={getProps} />
				</Manager>,
			);

			// then
			await userEvent.click(screen.getByTestId('getProps'));
			const contextValue = getProps.mock.calls[0][0];
			expect(contextValue.datetime.textInput).toBe(expectedTextInput);
			expect(contextValue.datetime.date).toEqual(expectedDate);
			expect(contextValue.datetime.time).toEqual(expectedTime);
		});

		test.each([
			{
				name: 'from undefined props',
				initialDate: new Date(),
				newDate: undefined,
				expectedTextInput: '',
				expectedDate: undefined,
				expectedTime: { hours: '', minutes: '', seconds: '00' },
			},
			{
				name: 'from props invalid date',
				initialDate: new Date(),
				newDate: new Date(''), // invalid date
				expectedTextInput: '',
				expectedDate: undefined,
				expectedTime: { hours: '', minutes: '', seconds: '00' },
			},
			{
				name: 'from props valid date',
				initialDate: new Date(),
				newDate: new Date(2015, 3, 4, 12, 36),
				expectedTextInput: '2015-04-04 12:36',
				expectedDate: new Date(2015, 3, 4),
				expectedTime: { hours: '12', minutes: '36', seconds: '00' },
			},
			{
				name: 'from props valid date with seconds',
				initialDate: new Date(),
				newDate: new Date(2015, 3, 4, 12, 36, 30),
				expectedTextInput: '2015-04-04 12:36:30',
				expectedDate: new Date(2015, 3, 4),
				expectedTime: { hours: '12', minutes: '36', seconds: '30' },
				useSeconds: true,
			},
		])(
			'$name',
			async ({
				initialDate,
				newDate,
				expectedTextInput,
				expectedDate,
				expectedTime,
				useSeconds,
			}) => {
				// given
				const getProps = jest.fn();
				const { rerender } = render(
					<Manager id={DEFAULT_ID} selectedDateTime={initialDate} useSeconds={useSeconds} useTime>
						<DateTimeConsumer />
					</Manager>,
				);

				// when
				rerender(
					<Manager id={DEFAULT_ID} selectedDateTime={newDate} useSeconds={useSeconds} useTime>
						<DateTimeConsumer getProps={getProps} />
					</Manager>,
				);

				// then
				await userEvent.click(screen.getByTestId('getProps'));
				const contextValue = getProps.mock.calls[0][0];
				expect(contextValue.datetime.textInput).toBe(expectedTextInput);
				expect(contextValue.datetime.date).toEqual(expectedDate);
				expect(contextValue.datetime.time).toEqual(expectedTime);
			},
		);

		test.each([
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
		])('$name', async ({ initialDate, newDate }) => {
			// given
			const getProps = jest.fn();
			const { rerender } = render(
				<Manager id={DEFAULT_ID} selectedDateTime={initialDate} useTime>
					<DateTimeConsumer getProps={getProps} />
				</Manager>,
			);
			await userEvent.click(screen.getByTestId('getProps'));
			const previousState = getProps.mock.calls[0][0].datetime;

			// when
			rerender(
				<Manager id={DEFAULT_ID} selectedDateTime={newDate} useTime>
					<DateTimeConsumer getProps={getProps} />
				</Manager>,
			);

			// then
			await userEvent.click(screen.getByTestId('getProps'));
			const nextState = getProps.mock.calls[1][0].datetime;
			expect(previousState.textInput).toBe(nextState.textInput);
			expect(previousState.date).toBe(nextState.date);
			expect(previousState.time).toBe(nextState.time);
		});

		describe('input change', () => {
			test.each([
				{
					name: 'with valid datetime',
					textInput: '2015-01-15 15:45',
					expectedDate: new Date(2015, 0, 15),
					expectedTime: { hours: '15', minutes: '45', seconds: '00' },
				},
				{
					name: 'with valid datetime with seconds',
					textInput: '2015-01-15 15:45:22',
					expectedDate: new Date(2015, 0, 15),
					expectedTime: { hours: '15', minutes: '45', seconds: '22' },
					useSeconds: true,
				},
				{
					name: 'with invalid date',
					textInput: '2015aze-01-15 15:45',
					expectedDate: undefined,
					expectedTime: { hours: '15', minutes: '45', seconds: '00' },
				},
				{
					name: 'with invalid time',
					textInput: '2015-01-15 15aze:45',
					expectedDate: new Date(2015, 0, 15),
					expectedTime: { hours: '15aze', minutes: '45', seconds: '00' },
				},
				{
					name: 'with empty string',
					textInput: '',
					expectedDate: undefined,
					expectedTime: { hours: '', minutes: '', seconds: '00' },
				},
				{
					name: 'with custom date format',
					textInput: '15/01/2015 15:45',
					expectedDate: new Date(2015, 0, 15),
					expectedTime: { hours: '15', minutes: '45', seconds: '00' },
					dateFormat: 'DD/MM/YYYY',
				},
			])('$name', async ({ textInput, expectedDate, expectedTime, dateFormat, useSeconds }) => {
				// given
				// const event = { target: { value: textInput } };
				const getProps = jest.fn();
				render(
					<Manager id={DEFAULT_ID} dateFormat={dateFormat} useSeconds={useSeconds} useTime>
						<DateTimeConsumer getProps={getProps} />
					</Manager>,
				);

				// when
				await userEvent.click(screen.getByRole('textbox'));
				await userEvent.keyboard(textInput);
				await userEvent.click(screen.getByTestId('getProps'));

				// then
				const contextValue = getProps.mock.calls[0][0];
				expect(contextValue.datetime.textInput).toBe(textInput);

				const { date, time } = contextValue.datetime;
				expect(date).toEqual(expectedDate);
				expect(time).toEqual(expectedTime);
			});

			it('should trigger props.onChange with valid datetime', async () => {
				// given
				const onChange = jest.fn();
				render(
					<Manager id={DEFAULT_ID} onChange={onChange} useTime>
						<DateTimeConsumer />
					</Manager>,
				);
				expect(onChange).not.toBeCalled();

				// when
				await userEvent.click(screen.getByRole('textbox'));
				await userEvent.keyboard('2015-01-15 15:45');

				// then
				expect(onChange).toBeCalledWith(expect.anything(), {
					datetime: new Date(2015, 0, 15, 15, 45),
					origin: 'INPUT',
					textInput: '2015-01-15 15:45',
					errors: [],
					errorMessage: null,
				});
			});

			it('should not trigger props.onChange when in formMode', async () => {
				// given
				const onChange = jest.fn();
				render(
					<Manager id={DEFAULT_ID} onChange={onChange} useTime formMode>
						<DateTimeConsumer />
					</Manager>,
				);
				expect(onChange).not.toBeCalled();

				// when
				await userEvent.click(screen.getByRole('textbox'));
				await userEvent.keyboard('2015-01-15 15:45');

				// then
				expect(onChange).not.toBeCalled();
			});

			it('should trigger props.onChange with invalid date', async () => {
				// given
				const onChange = jest.fn();
				render(
					<Manager id={DEFAULT_ID} onChange={onChange} useTime>
						<DateTimeConsumer />
					</Manager>,
				);
				expect(onChange).not.toBeCalled();

				// when
				await userEvent.click(screen.getByRole('textbox'));
				await userEvent.keyboard('2015aze-01-15 15:45');

				// then
				expect(onChange).toBeCalled();
				const args = onChange.mock.calls[0];
				expect(args[1].errorMessage).toBe('Datetime is invalid');
				expect(args[1].errors).toEqual([
					{ code: 'DATETIME_INVALID_FORMAT', message: 'Datetime is invalid' },
				]);
				expect(isNaN(args[1].datetime.getTime())).toBe(true);
				expect(args[1].origin).toBe('INPUT');
			});
		});

		describe('picker change', () => {
			test.each([
				{
					name: 'with valid datetime',
					date: new Date(2015, 0, 15),
					time: { hours: '15', minutes: '45', seconds: '00' },
					expectedTextInput: '2015-01-15 15:45',
				},
				{
					name: 'with invalid time',
					date: new Date(2015, 0, 15),
					time: { hours: '15aze', minutes: '45', seconds: '00' },
					field: FIELD_HOURS,
					expectedTextInput: '2015-01-15 15aze:45',
				},
				{
					name: 'with custom date format',
					date: new Date(2015, 0, 15),
					time: { hours: '15', minutes: '45', seconds: '00' },
					expectedTextInput: '15/01/2015 15:45',
					dateFormat: 'DD/MM/YYYY',
				},
			])('$name', async ({ date, time, expectedTextInput, dateFormat, field = '' }) => {
				// given
				const getProps = jest.fn();
				render(
					<Manager id={DEFAULT_ID} dateFormat={dateFormat} useTime>
						<DateTimeConsumer getProps={getProps} testSubmit={{ date, time, field }} />
					</Manager>,
				);

				// when
				await userEvent.click(screen.getByText('submit'));
				await userEvent.click(screen.getByTestId('getProps'));

				// then
				const datetime = getProps.mock.calls[0][0].datetime;
				expect(datetime.textInput).toBe(expectedTextInput);
				expect(datetime.date).toEqual(date);
				expect(datetime.time).toEqual(time);
			});

			it('should trigger props.onChange with valid datetime', () => {
				// given
				const onChange = jest.fn();
				const event = { target: {}, preventDefault: () => {} };
				const wrapper = mount(
					<Manager id={DEFAULT_ID} onChange={onChange} useTime>
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
						time: { hours: '15', minutes: '45', seconds: '00' },
					});

				// then
				expect(onChange).toBeCalledWith(event, {
					datetime: new Date(2015, 0, 15, 15, 45),
					origin: 'PICKER',
					textInput: '2015-01-15 15:45',
					errors: [],
					errorMessage: null,
				});
			});

			it('should trigger not props.onChange in formMode', () => {
				// given
				const onChange = jest.fn();
				const event = { target: {}, preventDefault: () => {} };
				const wrapper = mount(
					<Manager id={DEFAULT_ID} onChange={onChange} useTime formMode>
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
						time: { hours: '15', minutes: '45', seconds: '00' },
					});

				// then
				expect(onChange).not.toBeCalled();
			});

			it('should trigger props.onChange with invalid time', () => {
				// given
				const onChange = jest.fn();
				const event = { target: {}, preventDefault: () => {} };
				const wrapper = mount(
					<Manager id={DEFAULT_ID} onChange={onChange} useTime>
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
						time: { hours: '15aze', minutes: '45', seconds: '00' },
						field: FIELD_HOURS,
					});

				// then
				expect(onChange).toBeCalled();
				const args = onChange.mock.calls[0];
				expect(args[0]).toBe(event);
				expect(args[1].errors).toEqual([
					{ code: 'INVALID_HOUR', message: 'Hour must be between 00 and 23' },
				]);
				expect(args[1].errorMessage).toBe('Hour must be between 00 and 23');
				expect(isNaN(args[1].datetime.getTime())).toBe(true);
				expect(args[1].origin).toBe('PICKER');
			});
		});
	});

	describe('input management', () => {
		cases(
			'should pass placeholder',
			({ dateFormat, useTime, useSeconds, expectedPlaceholder }) => {
				// when
				const wrapper = mount(
					<Manager
						id={DEFAULT_ID}
						dateFormat={dateFormat}
						useTime={useTime}
						useSeconds={useSeconds}
					>
						<DateTimeConsumer />
					</Manager>,
				);

				// then
				const { placeholder } = wrapper.find('DateTimeConsumerDiv').prop('inputManagement');
				expect(placeholder).toBe(expectedPlaceholder);
			},
			[
				{
					name: '(default)',
					dateFormat: undefined,
					useTime: false,
					useSeconds: false,
					expectedPlaceholder: 'YYYY-MM-DD',
				},
				{
					name: 'with time',
					dateFormat: undefined,
					useTime: true,
					useSeconds: false,
					expectedPlaceholder: 'YYYY-MM-DD HH:mm',
				},
				{
					name: 'with time and seconds',
					dateFormat: undefined,
					useTime: true,
					useSeconds: true,
					expectedPlaceholder: 'YYYY-MM-DD HH:mm:ss',
				},
				{
					name: 'with custom format',
					dateFormat: 'DD/MM/YYYY',
					useTime: false,
					useSeconds: false,
					expectedPlaceholder: 'DD/MM/YYYY',
				},
			],
		);
	});

	describe('picker management', () => {
		it('should pass date options', () => {
			// when
			const wrapper = mount(
				<Manager id={DEFAULT_ID} useTime useSeconds useUTC={false}>
					<DateTimeConsumer />
				</Manager>,
			);

			// then
			const { useTime, useSeconds, useUTC } = wrapper
				.find('DateTimeConsumerDiv')
				.prop('pickerManagement');
			expect(useTime).toBe(true);
			expect(useSeconds).toBe(true);
			expect(useUTC).toBe(false);
		});
	});

	describe('form management', () => {
		it('should reset value', () => {
			// given
			const initialDate = new Date(2017, 3, 4);
			const wrapper = mount(
				<Manager id={DEFAULT_ID} selectedDateTime={initialDate} formMode>
					<DateTimeConsumer />
				</Manager>,
			);

			const event = { target: { value: '2001-01-02' } };
			wrapper.find('DateTimeConsumerDiv').prop('inputManagement').onChange(event);
			wrapper.update();
			expect(wrapper.find('DateTimeConsumerDiv').prop('datetime').textInput).toBe('2001-01-02');

			// when
			wrapper.find('DateTimeConsumerDiv').prop('formManagement').onReset();
			wrapper.update();

			// then
			expect(wrapper.find('DateTimeConsumerDiv').prop('datetime').textInput).toBe('2017-04-04');
		});

		it('should submit value', () => {
			// given
			const initialDate = new Date(2017, 3, 4);
			const onChange = jest.fn();
			const wrapper = mount(
				<Manager id={DEFAULT_ID} selectedDateTime={initialDate} onChange={onChange} formMode>
					<DateTimeConsumer />
				</Manager>,
			);

			const event = { target: { value: '2001-01-02' } };
			wrapper.find('DateTimeConsumerDiv').prop('inputManagement').onChange(event);
			wrapper.update();
			expect(onChange).not.toBeCalled();

			// when
			const submitEvent = { target: {}, preventDefault: jest.fn() };
			wrapper.find('DateTimeConsumerDiv').prop('formManagement').onSubmit(submitEvent, 'PICKER');

			// then
			expect(submitEvent.preventDefault).toBeCalled();
			expect(onChange).toBeCalledWith(submitEvent, {
				datetime: new Date(2001, 0, 2),
				errorMessage: '',
				errors: [],
				origin: 'PICKER',
				textInput: '2001-01-02',
			});
		});
	});

	describe('error management', () => {
		it('should generate error ids', () => {
			// when
			const wrapper = mount(
				<Manager id={DEFAULT_ID}>
					<DateTimeConsumer />
				</Manager>,
			);

			// then
			const { inputErrorId, hoursErrorId, minutesErrorId, secondsErrorId } = wrapper
				.find('DateTimeConsumerDiv')
				.prop('errorManagement');
			expect(inputErrorId).toBe('DEFAULT_ID-input-error');
			expect(hoursErrorId).toBe('DEFAULT_ID-hours-error');
			expect(minutesErrorId).toBe('DEFAULT_ID-minutes-error');
			expect(secondsErrorId).toBe('DEFAULT_ID-seconds-error');
		});

		it('should pass formMode', () => {
			// when
			const wrapper = mount(
				<Manager id={DEFAULT_ID} formMode>
					<DateTimeConsumer />
				</Manager>,
			);

			// then
			const { formMode } = wrapper.find('DateTimeConsumerDiv').prop('errorManagement');
			expect(formMode).toBe(true);
		});

		it('should pass errors and error getter', () => {
			// given
			const wrapper = mount(
				<Manager id={DEFAULT_ID} formMode>
					<DateTimeConsumer />
				</Manager>,
			);

			// when
			const event = { target: { value: 'lol' } };
			wrapper.find('DateTimeConsumerDiv').prop('inputManagement').onChange(event);
			wrapper.update();

			// then
			const { errors, hasError } = wrapper.find('DateTimeConsumerDiv').prop('errorManagement');
			expect(errors).toEqual([{ code: 'INVALID_DATE_FORMAT', message: 'Date format is invalid' }]);
			expect(hasError('INVALID_DATE_FORMAT')).toBe(true);
			expect(hasError('INVALID_HOUR_EMPTY')).toBe(false);
		});

		it('should pass focused input and its modifier', () => {
			// when
			const wrapper = mount(
				<Manager id={DEFAULT_ID} formMode>
					<DateTimeConsumer />
				</Manager>,
			);

			const { focusedInput, onInputFocus } = wrapper
				.find('DateTimeConsumerDiv')
				.prop('errorManagement');
			expect(focusedInput).toBe(undefined);

			// when
			const nextFocusedInput = `${DEFAULT_ID}-minutes-error`;
			onInputFocus(null, nextFocusedInput);
			wrapper.update();

			// then
			expect(wrapper.find('DateTimeConsumerDiv').prop('errorManagement').focusedInput).toBe(
				nextFocusedInput,
			);
		});
	});
});
