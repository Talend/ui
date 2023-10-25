/* eslint-disable react/prop-types */
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Manager from './Manager.component';
import { TimeContext } from '../Context';

const DEFAULT_ID = 'DEFAULT_ID';

function TimeConsumerDiv(props) {
	return (
		<div data-testid="TimeConsumerDiv" data-props={JSON.stringify(props)}>
			<input
				data-testid="inputManagement"
				placeholder={props.inputManagement.placeholder}
				value={props.time?.textInput}
				onChange={e => props.inputManagement.onChange(e)}
			/>
			<button onClick={e => props.pickerManagement.onChange(e, props.testPicker)}>Picker</button>
		</div>
	);
}
// eslint-disable-next-line react/prop-types
function TimeConsumer(props) {
	return (
		<TimeContext.Consumer>
			{contextValue => <TimeConsumerDiv {...contextValue} {...props} />}
		</TimeContext.Consumer>
	);
}

describe('Time.Manager', () => {
	it('should render its children', () => {
		// when
		const { container } = render(
			<Manager id={DEFAULT_ID} value="12:15">
				<TimeConsumer />
			</Manager>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
		const props = JSON.parse(screen.getByTestId('TimeConsumerDiv').getAttribute('data-props'));
		expect(props).toEqual({
			inputManagement: {
				// onChange: expect.any(Function),
				placeholder: 'HH:mm',
			},
			pickerManagement: {
				// onChange: expect.any(Function),
			},
			time: {
				textInput: '12:15',
				time: {
					hours: '12',
					minutes: '15',
					seconds: '00',
				},
				timezone: undefined,
			},
		});
	});
	describe('time management', () => {
		test.each([
			{
				name: 'init state with passed time value',
				value: '12:15',
				expectedTime: { hours: '12', minutes: '15', seconds: '00' },
				expectedTextInput: '12:15',
			},
			{
				name: 'init state when no time value provided',
				value: undefined,
				expectedTime: null,
				expectedTextInput: '',
			},
		])('$name', ({ value, expectedTime, expectedTextInput }) => {
			// when
			render(
				<Manager id={DEFAULT_ID} value={value}>
					<TimeConsumer />
				</Manager>,
			);

			// then
			const contextValue = JSON.parse(screen.getByTestId('TimeConsumerDiv').dataset.props);
			expect(contextValue.time.textInput).toBe(expectedTextInput);
			expect(contextValue.time.time).toEqual(expectedTime);
		});
		describe('input change', () => {
			test.each([
				{
					name: 'with valid time',
					textInput: '07:20',
					expectedTime: { hours: '07', minutes: '20', seconds: '00' },
					expectedValue: '07:20',
				},
				{
					name: 'with invalid time',
					textInput: '25:20',
					expectedTime: { hours: '25', minutes: '20', seconds: '00' },
					expectedValue: '25:20',
				},
			])('$name', async ({ textInput, expectedTime, expectedValue }) => {
				// given
				render(
					<Manager id={DEFAULT_ID}>
						<TimeConsumer />
					</Manager>,
				);

				// when
				await userEvent.click(screen.getByRole('textbox'));
				await userEvent.keyboard(textInput);

				// then
				const contextValue = JSON.parse(screen.getByTestId('TimeConsumerDiv').dataset.props);
				expect(contextValue.time.textInput).toBe(expectedValue);
				expect(contextValue.time.time).toEqual(expectedTime);
			});
			it('should trigger props.onChange with valid time', () => {
				// given
				const onChange = jest.fn();
				render(
					<Manager id={DEFAULT_ID} onChange={onChange}>
						<TimeConsumer />
					</Manager>,
				);
				expect(onChange).not.toBeCalled();

				// when
				userEvent.click(screen.getByRole('textbox'));
				userEvent.keyboard('15:45');

				// then
				expect(onChange).toBeCalledWith(expect.anything(), {
					time: {
						hours: '15',
						minutes: '45',
						seconds: '00',
					},
					origin: 'INPUT',
					textInput: '15:45',
					errors: [],
					errorMessage: null,
				});
			});

			it('should trigger props.onChange with invalid time', () => {
				// given
				const onChange = jest.fn();
				render(
					<Manager id={DEFAULT_ID} onChange={onChange}>
						<TimeConsumer />
					</Manager>,
				);
				expect(onChange).not.toBeCalled();

				// when
				userEvent.click(screen.getByRole('textbox'));
				userEvent.keyboard('ddrer');

				// then
				expect(onChange).toBeCalled();
				const args = onChange.mock.calls[0];
				expect(args[1].errorMessage).toBe('Time is invalid');
				expect(args[1].errors).toEqual([
					{ code: 'TIME_FORMAT_INVALID', message: 'Time is invalid' },
				]);
				expect(args[1].origin).toBe('INPUT');
			});
		});
		describe('picker change', () => {
			test.each([
				{
					name: 'with valid time',
					time: { hours: '15', minutes: '45', seconds: '00' },
					textInput: '15:45',
					expectedTextInput: '15:45',
					useSeconds: false,
				},
				{
					name: 'with valid time with seconds',
					time: { hours: '15', minutes: '45', seconds: '00' },
					textInput: '15:45:00',
					expectedTextInput: '15:45:00',
					useSeconds: true,
				},
			])('$name', ({ time, textInput, expectedTextInput, useSeconds }) => {
				// given

				render(
					<Manager id={DEFAULT_ID} useSeconds={useSeconds}>
						<TimeConsumer testPicker={{ time, textInput }} />
					</Manager>,
				);

				// when
				userEvent.click(screen.getByRole('textbox'));
				userEvent.keyboard(textInput);

				userEvent.click(screen.getByText('Picker'));

				// then
				const props = JSON.parse(screen.getByTestId('TimeConsumerDiv').dataset.props);
				expect(props.time.textInput).toBe(expectedTextInput);
				expect(props.time.time).toEqual(time);
			});

			it('should trigger props.onChange with valid time', () => {
				// given
				const onChange = jest.fn();
				render(
					<Manager id={DEFAULT_ID} onChange={onChange}>
						<TimeConsumer
							testPicker={{
								time: { hours: '15', minutes: '45', seconds: '00' },
								textInput: '15:45',
							}}
						/>
					</Manager>,
				);

				expect(onChange).not.toBeCalled();

				// when
				userEvent.click(screen.getByText('Picker'));

				// then
				expect(onChange).toBeCalledWith(expect.anything(), {
					origin: 'PICKER',
					textInput: '15:45',
					time: { hours: '15', minutes: '45', seconds: '00' },
					errors: [],
					errorMessage: null,
				});
			});
		});
	});
});
