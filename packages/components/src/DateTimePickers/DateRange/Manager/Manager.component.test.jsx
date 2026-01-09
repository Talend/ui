/* eslint-disable react/prop-types */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DateRangeContext } from '../Context';
import Manager from './Manager.component';

const DEFAULT_ID = 'DEFAULT_ID';

function DateRangeConsumerDiv(props) {
	return (
		<div data-testid="DateRangeConsumerDiv" data-props={JSON.stringify(props)}>
			<input
				type="text"
				data-testid="startDate"
				onChange={e => props.inputManagement.onStartChange(e, props.startDate)}
				value={props.startDate.textInput}
			/>
			<input
				type="text"
				data-testid="endDate"
				onChange={e => props.inputManagement.onEndChange(e, props.endDate)}
				value={props.endDate.textInput}
			/>
			<button
				data-testid={`picker-${props.pickerField}`}
				onClick={e => props.pickerManagement[props.pickerHandler](e, props.pickerValue)}
			/>
		</div>
	);
}
// eslint-disable-next-line react/prop-types
function DateRangeConsumer(props) {
	return (
		<DateRangeContext.Consumer>
			{contextValue => <DateRangeConsumerDiv {...contextValue} {...props} />}
		</DateRangeContext.Consumer>
	);
}

describe('DateRange.Manager', () => {
	it('should render its children', () => {
		// when
		render(
			<Manager id={DEFAULT_ID} startDate={new Date(2017, 3, 4)} endDate={new Date(2017, 3, 10)}>
				<DateRangeConsumer />
			</Manager>,
		);

		// then
		const consumer = screen.getByTestId('DateRangeConsumerDiv');
		const props = JSON.parse(consumer.getAttribute('data-props'));
		expect(props.startDate).toEqual({
			value: '2017-04-04T00:00:00.000Z',
			textInput: '2017-04-04',
		});
		expect(props.endDate).toEqual({
			value: '2017-04-10T00:00:00.000Z',
			textInput: '2017-04-10',
		});
	});

	describe('value management', () => {
		test.each([
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
		])('$name', ({ startDate, endDate, expectedStartDate, expectedEndDate }) => {
			// when
			render(
				<Manager id={DEFAULT_ID} startDate={startDate} endDate={endDate}>
					<DateRangeConsumer />
				</Manager>,
			);

			// then
			const props = JSON.parse(
				screen.getByTestId('DateRangeConsumerDiv').getAttribute('data-props'),
			);
			expect(props.startDate.value).toEqual(expectedStartDate.value?.toISOString());
			expect(props.endDate.value).toEqual(expectedEndDate.value?.toISOString());
		});

		test.each([
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
		])('$name', async ({ initialDate, newDate, field, expectedDate }) => {
			// given
			const props = { [field]: initialDate };
			const { rerender } = render(
				<Manager id={DEFAULT_ID} {...props}>
					<DateRangeConsumer />
				</Manager>,
			);

			// when
			const newProps = { [field]: newDate };
			rerender(
				<Manager id={DEFAULT_ID} {...newProps}>
					<DateRangeConsumer />
				</Manager>,
			);

			// then
			const contextValue = JSON.parse(
				screen.getByTestId('DateRangeConsumerDiv').getAttribute('data-props'),
			);
			expect(contextValue[field].value).toEqual(expectedDate?.toISOString());
		});

		test.each([
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
		])('$name', ({ initialDate, newDate, field }) => {
			// given
			const props = { [field]: initialDate };
			const { rerender } = render(
				<Manager id={DEFAULT_ID} {...props}>
					<DateRangeConsumer />
				</Manager>,
			);
			const previousState = JSON.parse(
				screen.getByTestId('DateRangeConsumerDiv').getAttribute('data-props'),
			);

			// when
			const newProps = { [field]: newDate };
			rerender(
				<Manager id={DEFAULT_ID} {...newProps}>
					<DateRangeConsumer />
				</Manager>,
			);

			// then
			const nextState = JSON.parse(
				screen.getByTestId('DateRangeConsumerDiv').getAttribute('data-props'),
			);
			expect(previousState[field].value).toEqual(nextState[field].value);
		});
		describe('input change', () => {
			test.each([
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
					name: 'startDate - with space',
					field: 'startDate',
					textInput: ' ',
					expectedDate: undefined,
				},
				{
					name: 'endDate - with space',
					field: 'endDate',
					textInput: ' ',
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
			])('$name', async ({ field, textInput, expectedDate, dateFormat }) => {
				const user = userEvent.setup();

				// given
				// let onChange = 'onEndChange';
				// if (field === 'startDate') {
				// 	onChange = 'onStartChange';
				// }
				// function DateRangeConsumerBis(props) {
				// 	return (
				// 		<input
				// 			data-props={JSON.stringify(props)}
				// 			type="text"
				// 			data-testid={field}
				// 			onChange={e => props.ctx.inputManagement[onChange](e, props.ctx[field])}
				// 			value={props.ctx[field].textInput}
				// 		/>
				// 	);
				// }
				// render(
				// 	<Manager id={DEFAULT_ID} dateFormat={dateFormat}>
				// 		<DateRangeContext.Consumer>
				// 			{contextValue => <DateRangeConsumerBis ctx={contextValue} />}
				// 		</DateRangeContext.Consumer>
				// 	</Manager>,
				// );
				render(
					<Manager id={DEFAULT_ID} dateFormat={dateFormat}>
						<DateRangeConsumer />
					</Manager>,
				);

				// when
				await user.click(screen.getByTestId(field));
				await user.keyboard(textInput);

				// then
				const props = JSON.parse(screen.getByTestId('DateRangeConsumerDiv').dataset.props);
				// expect(props).toBe();
				expect(props[field].textInput).toBe(textInput);
				expect(props[field].value).toEqual(expectedDate?.toISOString());
			});

			test.each([
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
			])(
				'$name',
				async ({ field, inputText, expectedStartDate, expectedEndDate, expectedOrigin }) => {
					const user = userEvent.setup();
					// given
					const onChange = jest.fn();
					render(
						<Manager id={DEFAULT_ID} onChange={onChange} dateFormat="YYYY-MM-DD">
							<DateRangeConsumer />
						</Manager>,
					);
					expect(onChange).not.toHaveBeenCalled();

					// when
					await user.click(screen.getByTestId(field));
					await user.keyboard(inputText);

					// then
					expect(onChange).toHaveBeenCalledWith(expect.anything(), {
						startDate: expectedStartDate,
						endDate: expectedEndDate,
						errors: [],
						errorMessage: null,
						origin: expectedOrigin,
					});
				},
			);

			test.each([
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
			])(
				'$name',
				async ({ field, inputText, errors, errorMessage, expectedStartDate, expectedEndDate }) => {
					const user = userEvent.setup();

					// given
					const onChange = jest.fn();

					render(
						<Manager id={DEFAULT_ID} onChange={onChange}>
							<DateRangeConsumer />
						</Manager>,
					);
					expect(onChange).not.toHaveBeenCalled();
					//when
					await user.click(screen.getByTestId(field));
					await user.keyboard(inputText);

					// then
					expect(onChange).toHaveBeenCalled();
					const args = onChange.mock.calls[0];
					expect(args[1].errorMessage).toBe(errorMessage);
					expect(args[1].errors).toEqual(errors);
					expect(args[1].startDate).toBe(expectedStartDate);
					expect(args[1].endDate).toBe(expectedEndDate);
				},
			);
		});
		describe('picker change', () => {
			test.each([
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
			])('$name', async ({ field, date, expectedTextInput, dateFormat }) => {
				const user = userEvent.setup();
				// given
				const pickerHandler = field === 'endDate' ? 'onEndChange' : 'onStartChange';
				render(
					<Manager id={DEFAULT_ID} dateFormat={dateFormat}>
						<DateRangeConsumer
							pickerField={field}
							pickerValue={{ date }}
							pickerHandler={pickerHandler}
						/>
					</Manager>,
				);
				// when
				await user.click(screen.getByTestId(`picker-${field}`));
				const props = JSON.parse(screen.getByTestId('DateRangeConsumerDiv').dataset.props);
				expect(props[field].textInput).toBe(expectedTextInput);
				expect(props[field].value).toEqual(date?.toISOString());
			});
			test.each([
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
			])(
				'$name',
				async ({ field, selectedDate, expectedStartDate, expectedEndDate, expectedOrigin }) => {
					const user = userEvent.setup();
					// given
					const pickerHandler = field === 'endDate' ? 'onEndChange' : 'onStartChange';
					const onChange = jest.fn();
					render(
						<Manager id={DEFAULT_ID} onChange={onChange}>
							<DateRangeConsumer
								pickerField={field}
								pickerValue={{ date: selectedDate }}
								pickerHandler={pickerHandler}
							/>
						</Manager>,
					);
					expect(onChange).not.toHaveBeenCalled();

					// when
					await user.click(screen.getByTestId(`picker-${field}`));

					// then
					expect(onChange).toHaveBeenCalledWith(
						expect.anything({
							type: 'change',
						}),
						{
							startDate: expectedStartDate,
							endDate: expectedEndDate,
							errorMessage: null,
							errors: [],
							origin: expectedOrigin,
						},
					);
				},
			);
		});
	});
});
