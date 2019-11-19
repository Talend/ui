import { subHours } from 'date-fns';
import {
	checkSupportedDateFormat,
	extractDate,
	extractPartsFromTextInput,
	extractPartsFromDate,
	extractDateOnly,
} from './date-extraction';

describe('Date extraction', () => {
	describe('checkSupportedDateFormat', () => {
		it('should pass', () => {
			// given
			const format = 'DD/MM/YYYY';

			// when
			try {
				checkSupportedDateFormat(format);
			} catch (e) {
				// then
				fail(
					`checkSupportedDateFormat() should not throw an error on ${format} because it is a composition of YYY MM DD`,
				);
			}
		});

		it('should throw an error when not a composition of YYYY MM DD', () => {
			// given
			const format = 'YYYY MMM DD';

			// when
			try {
				checkSupportedDateFormat(format);
			} catch (e) {
				// then
				expect(e.message).toBe(
					'DATE FORMAT YYYY MMM DD - NOT SUPPORTED. Please provide a composition of YYYY, MM, DD',
				);
				return;
			}
			fail(
				`checkSupportedDateFormat() should throw an error on ${format} because it is not a composition of YYY MM DD`,
			);
		});
	});

	describe('extractDate', () => {
		it('should return empty parts on undefined value', () => {
			// given
			const options = {
				dateFormat: 'YYYY-MM-DD',
			};

			// when
			const parts = extractDate(undefined, options);

			// then
			expect(parts).toEqual({
				date: undefined,
				textInput: '',
				errors: [],
			});
		});

		it('should return parts from timestamp', () => {
			// given
			const date = new Date(2015, 8, 15);
			const timestamp = date.getTime();
			const options = { dateFormat: 'YYYY-MM-DD' };

			// when
			const parts = extractDate(timestamp, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				localDate: new Date(2015, 8, 15),
				textInput: '2015-09-15',
				errors: [],
				errorMessage: null,
			});
		});

		it('should return parts from Date', () => {
			// given
			const validDate = new Date(2015, 8, 15);
			const options = { dateFormat: 'YYYY-MM-DD' };

			// when
			const parts = extractDate(validDate, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				localDate: new Date(2015, 8, 15),
				textInput: '2015-09-15',
				errors: [],
				errorMessage: null,
			});
		});

		it('should return parts from string', () => {
			// given
			const value = '2015-09-15';
			const options = { dateFormat: 'YYYY-MM-DD' };

			// when
			const parts = extractDate(value, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				localDate: new Date(2015, 8, 15),
				textInput: value,
				errors: [],
				errorMessage: null,
			});
		});
	});

	describe('extractPartsFromDate', () => {
		it('should return empty parts on invalid date', () => {
			// given
			const invalidDate = 'lol';
			const options = {
				dateFormat: 'YYYY-MM-DD',
			};

			// when
			const parts = extractPartsFromDate(invalidDate, options);

			// then
			expect(parts).toEqual({
				date: undefined,
				textInput: '',
				errors: [],
				errorMessage: null,
			});
		});

		it('should return valid date parts', () => {
			// given
			const validDate = new Date(2015, 8, 15);
			const options = { dateFormat: 'YYYY-MM-DD' };

			// when
			const parts = extractPartsFromDate(validDate, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				localDate: new Date(2015, 8, 15),
				textInput: '2015-09-15',
				errors: [],
				errorMessage: null,
			});
		});
	});

	describe('extractPartsFromTextInput', () => {
		it('should extract parts with empty string', () => {
			// given
			const textInput = '';
			const options = {
				dateFormat: 'YYYY-MM-DD',
			};

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(parts).toEqual({
				date: undefined,
				textInput: '',
				errors: [],
			});
		});

		it('should extract parts with valid date', () => {
			// given
			const textInput = '2018-12-25';
			const options = { dateFormat: 'YYYY-MM-DD' };

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(parts).toEqual({
				date: new Date(2018, 11, 25),
				localDate: new Date(2018, 11, 25),
				textInput,
				errorMessage: null,
				errors: [],
			});
		});

		it('should extract parts with invalid day', () => {
			// given
			const textInput = '2018-12-36';
			const options = {
				dateFormat: 'YYYY-MM-DD',
			};

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(isNaN(parts.date.getTime())).toBe(true);
			expect(parts.localDate).toBe(undefined);
			expect(parts.textInput).toBe(textInput);
			expect(parts.errorMessage).toBe("Day value doesn't match an existing day in the month");
			expect(parts.errors).toEqual([
				{
					code: 'INVALID_DAY_OF_MONTH',
					message: "Day value doesn't match an existing day in the month",
				},
			]);
		});

		it('should extract parts with invalid month', () => {
			// given
			const textInput = '2018-13-25';
			const options = {
				dateFormat: 'YYYY-MM-DD',
			};

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(isNaN(parts.date.getTime())).toBe(true);
			expect(parts.localDate).toBe(undefined);
			expect(parts.textInput).toBe(textInput);
			expect(parts.errorMessage).toBe('Month must be between 01 and 12');
			expect(parts.errors).toEqual([
				{ code: 'INVALID_MONTH', message: 'Month must be between 01 and 12' },
			]);
		});

		it('should convert date to UTC', () => {
			// given
			const textInput = '2018-12-25';
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useUTC: true,
			};

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(parts).toEqual({
				localDate: new Date(2018, 11, 25),
				date: new Date(Date.UTC(2018, 11, 25)),
				textInput,
				errorMessage: null,
				errors: [],
			});
		});
		it('should convert date to timezone', () => {
			// given
			const textInput = '2018-12-25';
			const options = {
				dateFormat: 'YYYY-MM-DD',
				timezone: 'Asia/Tokyo',
			};

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(parts).toEqual({
				localDate: new Date(2018, 11, 25),
				date: subHours(new Date(2018, 11, 25), 8),
				textInput,
				errorMessage: null,
				errors: [],
			});
		});
	});
	describe('extractDateOnly', () => {
		it('should extract date only', () => {
			// given
			const datetime = new Date(2019, 8, 26, 6, 20, 39);
			const options = {
				dateFormat: 'YYYY-MM-DD',
			};

			// when
			const date = extractDateOnly(datetime, options);

			// then
			expect(date).toEqual(new Date(2019, 8, 26));
		});
		it('should extract date when useUTC', () => {
			// given
			const datetime = new Date(2019, 8, 26, 0, 20, 39);
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useUTC: true,
			};

			// when
			const date = extractDateOnly(datetime, options);

			// then
			expect(date).toEqual(new Date(2019, 8, 25));
		});
		it('should extract date when timezone provided', () => {
			// given
			const datetime = new Date(2019, 8, 26, 23, 20, 39);
			const options = {
				dateFormat: 'YYYY-MM-DD',
				timezone: 'Asia/Shanghai',
			};

			// when
			const date = extractDateOnly(datetime, options);

			// then
			expect(date).toEqual(new Date(2019, 8, 27));
		});
	});
});
