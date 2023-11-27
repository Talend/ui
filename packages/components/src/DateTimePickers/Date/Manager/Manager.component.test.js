import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Manager from './Manager.component';
import { DateContext } from '../Context';

const DEFAULT_ID = 'DEFAULT_ID';

function DateConsumerDiv(props) {
	return (
		<div data-testid="DateConsumerDiv" data-props={JSON.stringify(props)}>
			<input
				type="text"
				data-testid="DateConsumerDivInput"
				value={props.value.textInput}
				onChange={props.inputManagement.onChange}
			/>
			<button
				type="submit"
				data-testid="DateConsumerDivSubmit"
				onClick={e => props.pickerManagement.onSubmit(e, props.value)}
			>
				Submit
			</button>
		</div>
	);
}

// eslint-disable-next-line react/prop-types
function DateConsumer() {
	return (
		<DateContext.Consumer>
			{contextValue => <DateConsumerDiv {...contextValue} />}
		</DateContext.Consumer>
	);
}

describe('Date.Manager', () => {
	it('should render its children with context value', () => {
		// when
		render(
			<Manager id={DEFAULT_ID} value={new Date(2017, 3, 4)}>
				<DateConsumer />
			</Manager>,
		);

		// then
		expect(screen.getByTestId('DateConsumerDiv')).toBeVisible();
		const props = JSON.parse(screen.getByTestId('DateConsumerDiv').dataset.props);
		expect(props).toEqual({
			value: {
				textInput: '2017-04-04',
				date: '2017-04-04T00:00:00.000Z',
			},
			inputManagement: {
				placeholder: 'YYYY-MM-DD',
			},
			pickerManagement: {
				useUTC: false,
			},
		});
	});

	describe('value management', () => {
		test.each([
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
				expectedDate: '2015-04-04T00:00:00.000Z',
			},
		])('$name', ({ initialDate, expectedTextInput, expectedDate }) => {
			// when
			render(
				<Manager id={DEFAULT_ID} value={initialDate}>
					<DateConsumer />
				</Manager>,
			);

			// then
			expect(screen.getByTestId('DateConsumerDiv')).toBeVisible();
			const props = JSON.parse(screen.getByTestId('DateConsumerDiv').dataset.props);
			expect(props.value.textInput).toBe(expectedTextInput);
			expect(props.value.date).toBe(expectedDate);
		});
		test.each([
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
				expectedDate: '2015-04-04T00:00:00.000Z',
			},
		])('$name', ({ initialDate, newDate, expectedTextInput, expectedDate }) => {
			// given
			const { rerender } = render(
				<Manager id={DEFAULT_ID} value={initialDate}>
					<DateConsumer />
				</Manager>,
			);

			// when
			rerender(
				<Manager id={DEFAULT_ID} value={newDate}>
					<DateConsumer />
				</Manager>,
			);

			// then
			const props = JSON.parse(screen.getByTestId('DateConsumerDiv').dataset.props);
			expect(props.value.textInput).toBe(expectedTextInput);
			expect(props.value.date).toEqual(expectedDate);
		});

		test.each([
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
		])('$name', ({ initialDate, newDate }) => {
			// given
			const { rerender } = render(
				<Manager id={DEFAULT_ID} value={initialDate}>
					<DateConsumer />
				</Manager>,
			);
			const prevProps = JSON.parse(screen.getByTestId('DateConsumerDiv').dataset.props);

			// when
			rerender(
				<Manager id={DEFAULT_ID} value={newDate}>
					<DateConsumer />
				</Manager>,
			);

			// then
			const props = JSON.parse(screen.getByTestId('DateConsumerDiv').dataset.props);
			expect(prevProps.value.textInput).toBe(props.value.textInput);
			expect(prevProps.value.date).toBe(props.value.date);
		});

		describe('input change', () => {
			test.each([
				{
					name: 'with valid date',
					textInput: '2015-01-15',
					expectedDate: '2015-01-15T00:00:00.000Z',
				},
				{
					name: 'with invalid date',
					textInput: '2015aze-01-15',
					expectedDate: undefined,
				},
				{
					name: 'with empty string',
					textInput: ' ',
					expectedDate: undefined,
				},
				{
					name: 'with custom date format',
					textInput: '15/01/2015',
					expectedDate: '2015-01-15T00:00:00.000Z',
					dateFormat: 'DD/MM/YYYY',
				},
			])('$name', async ({ textInput, expectedDate, dateFormat }) => {
				// given
				render(
					<Manager id={DEFAULT_ID} dateFormat={dateFormat}>
						<DateConsumer />
					</Manager>,
				);

				// when
				await userEvent.click(screen.getByTestId('DateConsumerDivInput'));
				await userEvent.keyboard(textInput);

				// then
				const props = JSON.parse(screen.getByTestId('DateConsumerDiv').dataset.props);
				expect(props.value.textInput).toBe(textInput);

				const { date } = props.value;
				expect(date).toEqual(expectedDate);
			});

			it('should trigger props.onChange with valid date', async () => {
				// given
				const onChange = jest.fn();
				render(
					<Manager id={DEFAULT_ID} onChange={onChange}>
						<DateConsumer />
					</Manager>,
				);
				expect(onChange).not.toBeCalled();

				// when
				await userEvent.click(screen.getByTestId('DateConsumerDivInput'));
				await userEvent.keyboard('2015-01-15');

				// then
				expect(onChange).toBeCalledWith(expect.anything(), {
					date: new Date(2015, 0, 15),
					origin: 'INPUT',
					textInput: '2015-01-15',
					errors: [],
					errorMessage: null,
				});
			});

			it('should trigger props.onChange with invalid date', async () => {
				// given
				const onChange = jest.fn();
				render(
					<Manager id={DEFAULT_ID} onChange={onChange}>
						<DateConsumer />
					</Manager>,
				);
				expect(onChange).not.toBeCalled();

				// when
				await userEvent.click(screen.getByTestId('DateConsumerDivInput'));
				await userEvent.keyboard('2015-01-15');

				// then
				expect(onChange).toBeCalled();
				const args = onChange.mock.calls[0];
				expect(args[0]).toMatchObject({
					type: 'change',
					target: expect.anything({
						value: '2015-01-15',
					}),
				});
				expect(args[1].errorMessage).toBe('Date format is invalid');
				expect(args[1].errors).toEqual([
					{ code: 'INVALID_DATE_FORMAT', message: 'Date format is invalid' },
				]);
				expect(isNaN(args[1].date)).toBe(true);
				expect(args[1].origin).toBe('INPUT');
			});
		});

		describe('picker change', () => {
			test.each([
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
			])('$name', async ({ date, expectedTextInput, dateFormat }) => {
				// given
				render(
					<Manager id={DEFAULT_ID} dateFormat={dateFormat} value={date}>
						<DateConsumer />
					</Manager>,
				);

				// when
				await userEvent.click(screen.getByRole('button'));

				// then
				const props = JSON.parse(screen.getByTestId('DateConsumerDiv').dataset.props);
				expect(props.value.textInput).toBe(expectedTextInput);
			});

			it('should trigger props.onChange with valid date', async () => {
				// given
				const onChange = jest.fn();
				const event = { target: {}, preventDefault: () => {} };
				render(
					<Manager id={DEFAULT_ID} onChange={onChange}>
						<DateConsumer />
					</Manager>,
				);

				expect(onChange).not.toBeCalled();

				// when
				await userEvent.click(screen.getByTestId('DateConsumerDivInput'));
				await userEvent.keyboard('2015-01-15');
				await userEvent.click(screen.getByRole('button'));

				// then
				expect(onChange).toBeCalledWith(
					expect.anything({
						type: 'change',
						target: expect.anything({
							value: '2015-01-15',
						}),
					}),
					{
						date: new Date(2015, 0, 15),
						origin: 'PICKER',
						textInput: '2015-01-15',
						errors: [],
						errorMessage: null,
					},
				);
			});
		});

		describe('picker management', () => {
			it('should pass date options', () => {
				// when
				render(
					<Manager id={DEFAULT_ID} useUTC={false}>
						<DateConsumer />
					</Manager>,
				);

				// then
				const props = JSON.parse(screen.getByTestId('DateConsumerDiv').dataset.props);
				expect(props.pickerManagement.useUTC).toBe(false);
			});
		});
	});
});
