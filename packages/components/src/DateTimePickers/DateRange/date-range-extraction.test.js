import cases from 'jest-in-case';

import { extractRangePartsFromDate, extractRangePartsFromTextInput } from './date-range-extraction';

describe('Date Range extraction', () => {
	describe('extractPartsFromDateRange', () => {
		it('should extract parts when select start date', () => {
			// given
			const selectedDate = new Date(2019, 9, 11);
			const state = {
				startDate: {},
				endDate: {},
				focusedInput: 'startDate',
			};
			const options = {
				dateFormat: 'YYYY-MM-DD',
			};
			// when
			const parts = extractRangePartsFromDate(selectedDate, state, options);
			// then
			expect(parts.startDate).toEqual({ value: selectedDate, textInput: '2019-10-11' });
			expect(parts.focusedInput).toEqual('endDate');
		});
		it('should extract parts when select end date', () => {
			// given
			const selectedDate = new Date(2019, 9, 19);
			const state = {
				startDate: {
					value: new Date(2019, 9, 11),
				},
				focusedInput: 'endDate',
			};
			const options = {
				dateFormat: 'YYYY-MM-DD',
			};
			// when
			const parts = extractRangePartsFromDate(selectedDate, state, options);
			// then
			expect(parts.endDate).toEqual({ value: selectedDate, textInput: '2019-10-19' });
		});
		it('should clear endDate when try to select a day after existing endDate as startDate', () => {
			// given
			const selectedDate = new Date(2019, 9, 19);
			const state = {
				endDate: {
					value: new Date(2019, 9, 11),
				},
				focusedInput: 'startDate',
			};
			const options = {
				dateFormat: 'YYYY-MM-DD',
			};
			// when
			const parts = extractRangePartsFromDate(selectedDate, state, options);
			// then
			expect(parts.startDate).toEqual({ value: selectedDate, textInput: '2019-10-19' });
			expect(parts.endDate).toEqual({ value: undefined, textInput: '' });
		});
		it('should reset start date when try to select a date before start date for "to" field', () => {
			// given
			const selectedDate = new Date(2019, 9, 11);
			const state = {
				startDate: {
					value: new Date(2019, 9, 19),
				},
				focusedInput: 'endDate',
			};
			const options = {
				dateFormat: 'YYYY-MM-DD',
			};
			// when
			const parts = extractRangePartsFromDate(selectedDate, state, options);
			// then
			expect(parts.startDate).toEqual({ value: selectedDate, textInput: '2019-10-11' });
		});
	});
	describe('extractPartsFromTextInputRange', () => {
		cases(
			'should extract parts from input',
			({
				textInput,
				focusedInput,
				options,
				expectedStartDate,
				expectedEndDate,
				expectedErrorMessage,
				expectedErrors,
			}) => {
				// when
				const parts = extractRangePartsFromTextInput(textInput, focusedInput, options);
				// then
				expect(parts.startDate).toEqual(expectedStartDate);
				expect(parts.endDate).toEqual(expectedEndDate);
				expect(parts.errorMessage).toBe(expectedErrorMessage);
				expect(parts.errors).toEqual(expectedErrors);
			},
			[
				{
					name: 'when input start date with valid date string',
					focusedInput: 'startDate',
					textInput: '2019-10-11',
					options: { dateFormat: 'YYYY-MM-DD' },
					expectedStartDate: { value: new Date(2019, 9, 11), textInput: '2019-10-11' },
					expectedErrors: [],
					expectedErrorMessage: null,
				},
				{
					name: 'when input end date with valid date string',
					focusedInput: 'endDate',
					textInput: '2019-10-11',
					options: { dateFormat: 'YYYY-MM-DD' },
					expectedEndDate: { value: new Date(2019, 9, 11), textInput: '2019-10-11' },
					expectedErrors: [],
					expectedErrorMessage: null,
				},
				{
					name: 'when input start date with invalid date string',
					focusedInput: 'startDate',
					textInput: '2019-10-99',
					options: { dateFormat: 'YYYY-MM-DD' },
					expectedStartDate: { value: undefined, textInput: '2019-10-99' },
					expectedErrors: [
						{
							code: 'INVALID_DAY_OF_MONTH',
							message: "Day value doesn't match an existing day in the month",
						},
					],
					expectedErrorMessage: "Day value doesn't match an existing day in the month",
				},
				{
					name: 'when input end date with invalid date string',
					focusedInput: 'endDate',
					textInput: '201ddd9-10-11',
					options: { dateFormat: 'YYYY-MM-DD' },
					expectedEndDate: { value: undefined, textInput: '201ddd9-10-11' },
					expectedErrors: [{ code: 'INVALID_DATE_FORMAT', message: 'Date format is invalid' }],
					expectedErrorMessage: 'Date format is invalid',
				},
			],
		);
	});
});
