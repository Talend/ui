/* eslint-disable react/prop-types */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Manager from './Manager.component';
import { DateTimeContext } from '../Context';

const DEFAULT_ID = 'DEFAULT_ID';

function DateTimeConsumerDiv(props) {
	return (
		<div data-testid="DateTimeConsumerDiv">
			<button type="button" onClick={() => props.getProps(props)} data-testid="getProps">
				getProps
			</button>
			<button
				type="button"
				onClick={e => props.onDateChange(e, { ...props, ...props.testValue })}
				data-testid="onDateChange"
			>
				change the date
			</button>
			<button
				type="button"
				onClick={e => props.onTimeChange(e, { ...props, ...props.testValue })}
				data-testid="onTimeChange"
			>
				change the time
			</button>
		</div>
	);
}
// eslint-disable-next-line react/prop-types
function DateTimeConsumer(props) {
	return (
		<DateTimeContext.Consumer>
			{contextValue => <DateTimeConsumerDiv {...props} {...contextValue} />}
		</DateTimeContext.Consumer>
	);
}

describe('DateTime.Manager', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});
	it('should render its children', () => {
		// when
		render(
			<Manager id={DEFAULT_ID} selectedDateTime={new Date(2017, 3, 4, 15, 27)}>
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
				expectedDate: undefined,
				expectedTime: undefined,
			},
			{
				name: 'should init default state from props invalid date',
				initialDate: new Date(''), // invalid date
				expectedDate: undefined,
				expectedTime: undefined,
			},
			{
				name: 'should init state from props',
				initialDate: new Date(2015, 3, 4, 12, 36),
				expectedDate: new Date(2015, 3, 4),
				expectedTime: { hours: '12', minutes: '36', seconds: '00' },
			},
			{
				name: 'should init state from datetime string',
				initialDate: '2019-10-11 12:34',
				expectedDate: '2019-10-11',
				expectedTime: '12:34',
			},
		])('$name', async ({ initialDate, expectedDate, expectedTime }) => {
			// when
			const getProps = jest.fn();
			render(
				<Manager id={DEFAULT_ID} value={initialDate} useSeconds>
					<DateTimeConsumer getProps={getProps} />
				</Manager>,
			);

			// then
			await userEvent.click(screen.getByTestId('getProps'));
			const props = getProps.mock.calls[0][0];
			expect(props.date).toStrictEqual(expectedDate);
			expect(props.time).toStrictEqual(expectedTime);
		});

		test.each([
			{
				name: 'from undefined props(Date type)',
				initialDate: new Date(),
				newDate: undefined,
				expectedDate: undefined,
				expectedTime: undefined,
			},
			{
				name: 'from undefined props(string type)',
				initialDate: '2019-09-30 12:00',
				newDate: undefined,
				expectedDate: undefined,
				expectedTime: undefined,
			},
			{
				name: 'from props invalid date',
				initialDate: new Date(),
				newDate: new Date(''), // invalid date
				expectedDate: undefined,
				expectedTime: undefined,
			},
			{
				name: 'from props valid date',
				initialDate: new Date(),
				newDate: new Date(2015, 3, 4, 12, 36),
				expectedDate: new Date(2015, 3, 4),
				expectedTime: { hours: '12', minutes: '36', seconds: '00' },
			},
			{
				name: 'from props valid date with seconds',
				initialDate: new Date(),
				newDate: new Date(2015, 3, 4, 12, 36, 30),
				expectedDate: new Date(2015, 3, 4),
				expectedTime: { hours: '12', minutes: '36', seconds: '30' },
				useSeconds: true,
			},
		])('$name', async ({ initialDate, newDate, expectedDate, expectedTime, useSeconds }) => {
			// given

			const getProps = jest.fn();
			const { rerender } = render(
				<Manager id={DEFAULT_ID} value={initialDate} useSeconds={useSeconds}>
					<DateTimeConsumer />
				</Manager>,
			);

			// when
			rerender(
				<Manager id={DEFAULT_ID} value={newDate} useSeconds={useSeconds}>
					<DateTimeConsumer getProps={getProps} />
				</Manager>,
			);

			// then
			await userEvent.click(screen.getByTestId('getProps'));
			const props = getProps.mock.calls[0][0];
			expect(props.date).toEqual(expectedDate);
			expect(props.time).toEqual(expectedTime);
		});

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
				<Manager id={DEFAULT_ID} value={initialDate}>
					<DateTimeConsumer getProps={getProps} />
				</Manager>,
			);
			userEvent.click(screen.getByTestId('getProps'));
			const previousState = getProps.mock.calls[0][0];

			// when
			rerender(
				<Manager id={DEFAULT_ID} value={newDate}>
					<DateTimeConsumer getProps={getProps} />
				</Manager>,
			);
			userEvent.click(screen.getByTestId('getProps'));

			// then
			const nextState = getProps.mock.calls[1][0];
			expect(previousState.date).toEqual(nextState.date);
			expect(previousState.time).toEqual(nextState.time);
		});
		describe('on change', () => {
			test.each([
				{
					name: 'with valid date',
					textInput: '2015-01-15',
					expectedDate: '2015-01-15',
					expectedTime: undefined,
				},
				{
					name: 'with invalid date',
					textInput: '2015aze-01-15',
					expectedDate: '2015aze-01-15',
					expectedTime: undefined,
				},
				{
					name: 'with empty string',
					textInput: '',
					expectedDate: '',
					expectedTime: undefined,
				},
				{
					name: 'with custom date format',
					textInput: '15/01/2015',
					expectedDate: '15/01/2015',
					expectedTime: undefined,
					dateFormat: 'DD/MM/YYYY',
				},
			])('$name', async ({ expectedDate, expectedTime, textInput, dateFormat, useSeconds }) => {
				// given
				const getProps = jest.fn();
				render(
					<Manager id={DEFAULT_ID} dateFormat={dateFormat} useSeconds={useSeconds}>
						<DateTimeConsumer testValue={{ textInput }} getProps={getProps} />
					</Manager>,
				);

				// when
				await userEvent.click(screen.getByTestId('onDateChange'));
				await userEvent.click(screen.getByTestId('getProps'));
				// then
				const props = getProps.mock.calls[0][0];
				expect(props.date).toEqual(expectedDate);
				expect(props.time).toEqual(expectedTime);
			});
			test.each([
				{
					name: 'with valid time with seconds',
					textInput: '15:45:22',
					expectedDateTime: new Date(2015, 0, 15, 15, 45, 22),
					expectedDate: new Date(2015, 0, 15),
					expectedTime: { hours: '15', minutes: '45', seconds: '22' },
					useSeconds: true,
				},
				{
					name: 'with invalid time',
					textInput: '15aze:45',
					expectedDate: new Date(2015, 0, 15),
					expectedDateTime: new Date(2015, 0, 15),
					expectedTime: { hours: '00', minutes: '00', seconds: '00' },
				},
			])(
				'$name',
				async ({
					expectedDateTime,
					expectedDate,
					expectedTime,
					textInput,
					dateFormat,
					useSeconds,
				}) => {
					// given
					const getProps = jest.fn();

					render(
						<Manager
							id={DEFAULT_ID}
							dateFormat={dateFormat}
							useSeconds={useSeconds}
							value={expectedDateTime}
						>
							<DateTimeConsumer getProps={getProps} testValue={{ textInput }} />
						</Manager>,
					);

					// when
					await userEvent.click(screen.getByTestId('onTimeChange'));
					await userEvent.click(screen.getByTestId('getProps'));
					// then
					const props = getProps.mock.calls[0][0];

					expect(props.date).toEqual(expectedDate);
					expect(props.time).toEqual(expectedTime);
				},
			);

			it('should trigger props.onChange when date change', async () => {
				// given
				const onChange = jest.fn();
				render(
					<Manager id={DEFAULT_ID} onChange={onChange} date={new Date(2015, 0, 15)}>
						<DateTimeConsumer
							testValue={{
								date: new Date(2015, 0, 15),
								textInput: '2015-01-15',
								errors: [],
							}}
						/>
					</Manager>,
				);
				expect(onChange).not.toBeCalled();

				// when
				await userEvent.click(screen.getByTestId('onDateChange'));

				// then
				expect(onChange).toBeCalled();
				const args = onChange.mock.calls[0];
				expect(args[0]).toEqual(expect.anything({ type: 'click' }));
				// expect(isNaN(args[1].datetime.getTime())).toBe(true);
				expect(args[1].textInput).toBe('2015-01-15');
				expect(args[1].errors).toEqual([
					{ code: 'INVALID_TIME_EMPTY', message: 'Time is required' },
				]);
				expect(args[1].errorMessage).toBe('Time is required');
			});

			it('should trigger props.onChange when date change with default time', async () => {
				// given
				const onChange = jest.fn();
				render(
					<Manager
						id={DEFAULT_ID}
						onChange={onChange}
						defaultTimeValue={{ hours: '01', minutes: '02' }}
					>
						<DateTimeConsumer
							testValue={{ date: new Date(2015, 0, 15), textInput: '2015-01-15' }}
						/>
					</Manager>,
				);
				expect(onChange).not.toBeCalled();

				// when
				await userEvent.click(screen.getByTestId('onDateChange'));

				// then
				expect(onChange).toBeCalled();
				const args = onChange.mock.calls[0];
				expect(isNaN(args[1].datetime.getTime())).toBe(true);
				expect(args[1].textInput).toBe('2015-01-15 01:02'); // default time included
			});

			it('should trigger props.onChange with invalid date', async () => {
				// given
				const onChange = jest.fn();
				render(
					<Manager id={DEFAULT_ID} onChange={onChange}>
						<DateTimeConsumer
							testValue={{
								date: null,
								textInput: '2015aze-01-15',
								errors: [{ code: 'INVALID_DATE_FORMAT', message: 'Date format is invalid' }],
							}}
						/>
					</Manager>,
				);
				expect(onChange).not.toBeCalled();

				// when
				await userEvent.click(screen.getByTestId('onDateChange'));
				// then
				expect(onChange).toBeCalled();
				const args = onChange.mock.calls[0];
				expect(args[1].errorMessage).toBe('Date format is invalid');
				expect(args[1].errors).toEqual([
					{ code: 'INVALID_DATE_FORMAT', message: 'Date format is invalid' },
				]);
				expect(isNaN(args[1].datetime.getTime())).toBe(true);
			});

			it('should trigger props.onChange when time change', async () => {
				// given
				const onChange = jest.fn();
				const { rerender } = render(
					<Manager id={DEFAULT_ID} onChange={onChange}>
						<DateTimeConsumer
							testValue={{
								date: new Date(2015, 0, 15),
								textInput: '2015-01-15',
								errors: [],
							}}
						/>
					</Manager>,
				);
				expect(onChange).not.toBeCalled();

				// when
				await userEvent.click(screen.getByTestId('onDateChange'));
				rerender(
					<Manager id={DEFAULT_ID} onChange={onChange}>
						<DateTimeConsumer
							testValue={{
								time: { hours: '12', minutes: '45', seconds: '00' },
								textInput: '12:45',
								errors: [],
							}}
						/>
					</Manager>,
				);
				await userEvent.click(screen.getByTestId('onTimeChange'));

				expect(onChange).toHaveBeenCalledTimes(2);
				const args = onChange.mock.calls[1];
				// expect(args[0]).toBe(timeEvent);
				expect(args[1].datetime).toEqual(new Date(2015, 0, 15, 12, 45));
				expect(args[1].textInput).toBe('2015-01-15 12:45');
				expect(args[1].errors).toEqual([]);
				expect(args[1].errorMessage).toBe(null);
			});
			it("shouldn't trigger props.onChange if the default datetime is valid", async () => {
				const onChange = jest.fn();
				const getProps = jest.fn();
				const textInput = '2015-01-15 11:11';
				render(
					<Manager id={DEFAULT_ID} onChange={onChange} value={textInput}>
						<DateTimeConsumer getProps={getProps} />
					</Manager>,
				);
				expect(onChange).not.toBeCalled();
				await userEvent.click(screen.getByTestId('getProps'));
				const contextValue = getProps.mock.calls[0][0];
				expect(contextValue.date).toEqual('2015-01-15');
				expect(contextValue.time).toEqual('11:11');
			});
			it('should trigger props.onChange when default datetime is changed', () => {
				const onChange = jest.fn();
				const textInput = '2015-01-15';
				render(
					<Manager id={DEFAULT_ID} onChange={onChange} value={textInput}>
						<DateTimeConsumer />
					</Manager>,
				);
				expect(onChange).toHaveBeenCalledTimes(1);
			});
			it('should propagate error via props.onChange for invalid datetime text input', () => {
				// given
				let data = null;
				const onChange = (event, payload) => {
					data = payload;
				};
				const textInput = '2015-01-15';
				render(
					<Manager id={DEFAULT_ID} onChange={onChange} value={textInput}>
						<DateTimeConsumer />
					</Manager>,
				);
				expect(data.errors.length).toEqual(1);
				expect(data.errors[0].code).toEqual('INVALID_TIME_EMPTY');
			});
			it('should trigger props.onChange with invalid time', async () => {
				// given
				const onChange = jest.fn();
				const { rerender } = render(
					<Manager id={DEFAULT_ID} onChange={onChange}>
						<DateTimeConsumer
							testValue={{
								date: new Date(2015, 0, 15),
								textInput: '2015-01-15',
								errors: [],
							}}
						/>
					</Manager>,
				);
				expect(onChange).not.toBeCalled();

				// when
				await userEvent.click(screen.getByTestId('onDateChange'));
				rerender(
					<Manager id={DEFAULT_ID} onChange={onChange}>
						<DateTimeConsumer
							testValue={{
								textInput: '12dfd:45',
								errors: [{ code: 'TIME_FORMAT_INVALID', message: 'Time is invalid' }],
							}}
						/>
					</Manager>,
				);
				await userEvent.click(screen.getByTestId('onTimeChange'));

				// then
				expect(onChange).toHaveBeenCalledTimes(2);
				const args = onChange.mock.calls[1];
				expect(isNaN(args[1].datetime.getTime())).toBe(true);
				expect(args[1].textInput).toBe('2015-01-15 12dfd:45');
				expect(args[1].errors).toEqual([
					{ code: 'TIME_FORMAT_INVALID', message: 'Time is invalid' },
				]);
				expect(args[1].errorMessage).toBe('Time is invalid');
			});
		});
	});
});
