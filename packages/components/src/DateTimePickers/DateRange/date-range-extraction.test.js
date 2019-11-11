import cases from 'jest-in-case';

import { extractPartsFromDateRange, extractPartsFromTextInputRange } from './date-range-extraction';

describe('Date Range extraction', () => {
	describe('extractPartsFromDateRange', () => {
		it('should extract parts when select start date', () => {
			// given
			const selectedDate = new Date(2019, 9, 11);
			const state = {
				focusedInput: 'startDate',
			};
			const options = {
				dateFormat: 'YYYY-MM-DD',
			};
			// when
			const parts = extractPartsFromDateRange(selectedDate, state, options);
			// then
			expect(parts).toEqual({
				focusedInput: 'endDate',
				startDate: selectedDate,
				startDateTextInput: '2019-10-11',
			});
		});
		it('should extract parts when select end date', () => {
			// given
			const selectedDate = new Date(2019, 9, 19);
			const state = {
				startDate: new Date(2019, 9, 11),
				focusedInput: 'endDate',
			};
			const options = {
				dateFormat: 'YYYY-MM-DD',
			};
			// when
			const parts = extractPartsFromDateRange(selectedDate, state, options);
			// then
			expect(parts).toEqual({
				focusedInput: null,
				endDate: selectedDate,
				endDateTextInput: '2019-10-19',
			});
		});
		it('should reset end date when try to select a new startDate after end date for "from" field', () => {
			// given
			const selectedDate = new Date(2019, 9, 19);
			const state = {
				endDate: new Date(2019, 9, 11),
				focusedInput: 'startDate',
			};
			const options = {
				dateFormat: 'YYYY-MM-DD',
			};
			// when
			const parts = extractPartsFromDateRange(selectedDate, state, options);
			// then
			expect(parts).toEqual({
				focusedInput: 'endDate',
				startDate: selectedDate,
				startDateTextInput: '2019-10-19',
				endDate: undefined,
				endDateTextInput: '',
			});
		});
		it('should reset start date when try to select a date before start date for "to" field', () => {
			// given
			const selectedDate = new Date(2019, 9, 11);
			const state = {
				startDate: new Date(2019, 9, 19),
				focusedInput: 'endDate',
			};
			const options = {
				dateFormat: 'YYYY-MM-DD',
			};
			// when
			const parts = extractPartsFromDateRange(selectedDate, state, options);
			// then
			expect(parts).toEqual({
				focusedInput: 'startDate',
				startDate: selectedDate,
				startDateTextInput: '2019-10-11',
			});
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
				expectedStartDateTextInput,
				expectedEndDate,
				expectedEndDateTextInput,
				expectedErrorMessage,
				expectedErrors,
			}) => {
				// when
				const parts = extractPartsFromTextInputRange(textInput, focusedInput, options);
				// then
				expect(parts.startDate).toEqual(expectedStartDate);
				expect(parts.startDateTextInput).toEqual(expectedStartDateTextInput);
				expect(parts.endDate).toEqual(expectedEndDate);
				expect(parts.endDateTextInput).toEqual(expectedEndDateTextInput);
				expect(parts.errorMessage).toBe(expectedErrorMessage);
				expect(parts.errors).toEqual(expectedErrors);
			},
			[
				{
					name: 'when input start date with valid date string',
					focusedInput: 'startDate',
					textInput: '2019-10-11',
					options: { dateFormat: 'YYYY-MM-DD' },
					expectedStartDate: new Date(2019, 9, 11),
					expectedStartDateTextInput: '2019-10-11',
					expectedErrors: [],
					expectedErrorMessage: null,
				},
				{
					name: 'when input end date with valid date string',
					focusedInput: 'endDate',
					textInput: '2019-10-11',
					options: { dateFormat: 'YYYY-MM-DD' },
					expectedEndDate: new Date(2019, 9, 11),
					expectedEndDateTextInput: '2019-10-11',
					expectedErrors: [],
					expectedErrorMessage: null,
				},
				{
					name: 'when input start date with invalid date string',
					focusedInput: 'startDate',
					textInput: '2019-10-99',
					options: { dateFormat: 'YYYY-MM-DD' },
					expectedStartDate: undefined,
					expectedStartDateTextInput: '2019-10-99',
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
					expectedEndDate: undefined,
					expectedEndDateTextInput: '201ddd9-10-11',
					expectedErrors: [{ code: 'INVALID_DATE_FORMAT', message: 'Date format is invalid' }],
					expectedErrorMessage: 'Date format is invalid',
				},
			],
		);
	});
});
