import {
	checkSupportedDateFormat,
	extractParts,
	extractPartsFromDateAndTime,
	extractPartsFromDateTime,
	extractPartsFromTextInput,
	getFullDateFormat,
	check,
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

	describe('extractParts', () => {
		it('should return empty parts on undefined value', () => {
			// given
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				useSeconds: true,
			};

			// when
			const parts = extractParts(undefined, options);

			// then
			expect(parts).toEqual({
				date: undefined,
				time: { hours: '', minutes: '', seconds: '' },
				datetime: undefined,
				textInput: '',
				errors: [],
			});
		});

		it('should return parts from timestamp', () => {
			// given
			const date = new Date(2015, 8, 15, 12, 58, 22);
			const timestamp = date.getTime();
			const options = { dateFormat: 'YYYY-MM-DD' };

			// when
			const parts = extractParts(timestamp, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				datetime: date,
				textInput: '2015-09-15',
				errors: [],
				time: { hours: '00', minutes: '00', seconds: '00' },
			});
		});

		it('should return parts from Date', () => {
			// given
			const validDate = new Date(2015, 8, 15, 12, 58, 22);
			const options = { dateFormat: 'YYYY-MM-DD' };

			// when
			const parts = extractParts(validDate, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				datetime: validDate,
				textInput: '2015-09-15',
				errors: [],
				time: { hours: '00', minutes: '00', seconds: '00' },
			});
		});

		it('should return parts from string', () => {
			// given
			const value = '2015-09-15';
			const options = { dateFormat: 'YYYY-MM-DD' };

			// when
			const parts = extractParts(value, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				datetime: new Date(2015, 8, 15),
				textInput: value,
				errors: [],
				errorMessage: null,
				time: { hours: '00', minutes: '00', seconds: '00' },
			});
		});
	});

	describe('extractPartsFromDateTime', () => {
		it('should return empty parts on invalid date', () => {
			// given
			const invalidDate = 'lol';
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromDateTime(invalidDate, options);

			// then
			expect(parts).toEqual({
				date: undefined,
				time: { hours: '', minutes: '', seconds: '' },
				datetime: 'lol',
				textInput: '',
				errors: [],
			});
		});

		it('should return valid date parts', () => {
			// given
			const validDate = new Date(2015, 8, 15, 12, 58, 22);
			const options = { dateFormat: 'YYYY-MM-DD' };

			// when
			const parts = extractPartsFromDateTime(validDate, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				datetime: validDate,
				textInput: '2015-09-15',
				time: { hours: '00', minutes: '00', seconds: '00' },
				errors: [],
			});
		});

		it('should return valid date parts with time', () => {
			// given
			const validDate = new Date(2015, 8, 15, 12, 58, 22);
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
			};

			// when
			const parts = extractPartsFromDateTime(validDate, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				datetime: validDate,
				textInput: '2015-09-15 12:58',
				time: { hours: '12', minutes: '58', seconds: '00' },
				errors: [],
			});
		});

		it('should return valid date parts with seconds', () => {
			// given
			const validDate = new Date(2015, 8, 15, 12, 58, 22);
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromDateTime(validDate, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				datetime: validDate,
				textInput: '2015-09-15 12:58:22',
				errors: [],
				time: { hours: '12', minutes: '58', seconds: '22' },
			});
		});

		it('should create the gmt date from utc value', () => {
			// given
			// date is 2015-09-15T10:58:22.000Z UTC
			const validDate = new Date(1442314702000);
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				useSeconds: true,
				useUTC: true,
			};

			// when
			const parts = extractPartsFromDateTime(validDate, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				datetime: validDate,
				textInput: '2015-09-15 10:58:22',
				errors: [],
				time: { hours: '10', minutes: '58', seconds: '22' },
			});
		});

		it('should create the gmt date from utc value (previous day)', () => {
			// given
			// date is 2015-09-15T10:58:22.000Z UTC
			const validDate = new Date(2015, 8, 15, 1, 0, 22);
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				useSeconds: true,
				useUTC: true,
			};

			// when
			const parts = extractPartsFromDateTime(validDate, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 14),
				datetime: validDate,
				textInput: '2015-09-14 23:00:22',
				errors: [],
				time: { hours: '23', minutes: '00', seconds: '22' },
			});
		});
	});

	describe('extractPartsFromDateAndTime', () => {
		it('should extract parts from date', () => {
			// given
			const date = new Date(2015, 8, 15);
			const time = { hours: '12', minutes: '58', seconds: '22' };
			const options = { dateFormat: 'YYYY-MM-DD' };

			// when
			const parts = extractPartsFromDateAndTime(date, time, options);

			// then
			expect(parts).toEqual({
				date,
				datetime: date,
				textInput: '2015-09-15',
				errors: [],
				errorMessage: null,
				time: { hours: '00', minutes: '00', seconds: '00' },
			});
		});

		it('should extract parts from date with time', () => {
			// given
			const date = new Date(2015, 8, 15);
			const time = { hours: '12', minutes: '58', seconds: '00' };
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
			};

			// when
			const parts = extractPartsFromDateAndTime(date, time, options);

			// then
			expect(parts).toEqual({
				date,
				datetime: new Date(2015, 8, 15, 12, 58),
				textInput: '2015-09-15 12:58',
				errors: [],
				errorMessage: null,
				time: { hours: '12', minutes: '58', seconds: '00' },
			});
		});

		it('should extract parts from date with seconds', () => {
			// given
			const date = new Date(2015, 8, 15);
			const time = { hours: '12', minutes: '58', seconds: '22' };
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromDateAndTime(date, time, options);

			// then
			expect(parts).toEqual({
				date,
				datetime: new Date(2015, 8, 15, 12, 58, 22),
				textInput: '2015-09-15 12:58:22',
				time,
				errors: [],
				errorMessage: null,
			});
		});

		it('should extract parts with invalid hours', () => {
			// given
			const date = new Date(2015, 8, 15);
			const time = { hours: '66', minutes: '58', seconds: '12' };
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromDateAndTime(date, time, options);

			// then
			expect(parts.date).toBe(date);
			expect(isNaN(parts.datetime.getTime())).toBe(true);
			expect(parts.textInput).toBe('2015-09-15 66:58:12');
			expect(parts.time).toBe(time);
			expect(parts.errors).toEqual([
				{ code: 'INVALID_HOUR', message: 'Hour must be between 00 and 23' },
			]);
			expect(parts.errorMessage).toBe('Hour must be between 00 and 23');
		});

		it('should extract parts with invalid minutes', () => {
			// given
			const date = new Date(2015, 8, 15);
			const time = { hours: '12', minutes: '66', seconds: '12' };
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromDateAndTime(date, time, options);

			// then
			expect(parts.date).toBe(date);
			expect(isNaN(parts.datetime.getTime())).toBe(true);
			expect(parts.textInput).toBe('2015-09-15 12:66:12');
			expect(parts.time).toBe(time);
			expect(parts.errors).toEqual([
				{ code: 'INVALID_MINUTES', message: 'Minutes value must be between 00 and 59' },
			]);
			expect(parts.errorMessage).toBe('Minutes value must be between 00 and 59');
		});

		it('should extract parts with invalid minutes and seconds', () => {
			// given
			const date = new Date(2015, 8, 15);
			const time = { hours: '12', minutes: '90', seconds: '66' };
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromDateAndTime(date, time, options);

			// then
			expect(parts.date).toBe(date);
			expect(isNaN(parts.datetime.getTime())).toBe(true);
			expect(parts.textInput).toBe('2015-09-15 12:90:66');
			expect(parts.time).toBe(time);
			expect(parts.errors).toEqual([
				{ code: 'INVALID_MINUTES', message: 'Minutes value must be between 00 and 59' },
				{ code: 'INVALID_SECONDS', message: 'Seconds value must be between 00 and 59' },
			]);
			expect(parts.errorMessage).toBe('Minutes value must be between 00 and 59');
		});

		it('should extract parts with invalid date', () => {
			// given
			const date = 'lol';
			const time = { hours: '12', minutes: '58', seconds: '12' };
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromDateAndTime(date, time, options);

			// then
			expect(parts.date).toBe(date);
			expect(isNaN(parts.datetime.getTime())).toBe(true);
			expect(parts.textInput).toBe('Invalid Date');
			expect(parts.time).toBe(time);
		});

		it('should convert date to UTC', () => {
			// given
			const date = new Date(2015, 8, 15);
			const time = { hours: '12', minutes: '58', seconds: '22' };
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				useSeconds: true,
				useUTC: true,
			};

			// when
			const parts = extractPartsFromDateAndTime(date, time, options);

			// then
			expect(parts).toEqual({
				date,
				datetime: new Date(2015, 8, 15, 14, 58, 22),
				textInput: '2015-09-15 12:58:22',
				time,
				errorMessage: null,
				errors: [],
			});
		});
	});

	describe('extractPartsFromTextInput', () => {
		it('should extract parts with empty string', () => {
			// given
			const textInput = '';
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
			};

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(parts).toEqual({
				date: undefined,
				time: { hours: '', minutes: '', seconds: '00' },
				datetime: undefined,
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
				time: { hours: '00', minutes: '00', seconds: '00' },
				datetime: new Date(2018, 11, 25),
				textInput,
				errorMessage: null,
				errors: [],
			});
		});

		it('should extract parts with valid date and time', () => {
			// given
			const textInput = '2018-12-25 22:58';
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
			};

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(parts).toEqual({
				date: new Date(2018, 11, 25),
				time: { hours: '22', minutes: '58', seconds: '00' },
				datetime: new Date(2018, 11, 25, 22, 58),
				textInput,
				errorMessage: null,
				errors: [],
			});
		});

		it('should extract parts with valid date and time with seconds', () => {
			// given
			const textInput = '2018-12-25 22:58:12';
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(parts).toEqual({
				date: new Date(2018, 11, 25),
				time: { hours: '22', minutes: '58', seconds: '12' },
				datetime: new Date(2018, 11, 25, 22, 58, 12),
				textInput,
				errorMessage: null,
				errors: [],
			});
		});

		it('should extract parts with invalid day', () => {
			// given
			const textInput = '2018-12-36 22:58:12';
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(parts.date).toBe(undefined);
			expect(isNaN(parts.datetime.getTime())).toBe(true);
			expect(parts.textInput).toBe(textInput);
			expect(parts.time).toEqual({ hours: '22', minutes: '58', seconds: '12' });
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
			const textInput = '2018-13-25 22:58:12';
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(parts.date).toBe(undefined);
			expect(isNaN(parts.datetime.getTime())).toBe(true);
			expect(parts.textInput).toBe(textInput);
			expect(parts.time).toEqual({ hours: '22', minutes: '58', seconds: '12' });
			expect(parts.errorMessage).toBe('Month must be between 01 and 12');
			expect(parts.errors).toEqual([
				{ code: 'INVALID_MONTH', message: 'Month must be between 01 and 12' },
			]);
		});

		it('should extract parts with hour', () => {
			// given
			const textInput = '2018-12-25 66:58:12';
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(parts.date).toEqual(new Date(2018, 11, 25));
			expect(isNaN(parts.datetime.getTime())).toBe(true);
			expect(parts.textInput).toBe(textInput);
			expect(parts.time).toEqual({ hours: '66', minutes: '58', seconds: '12' });
			expect(parts.errorMessage).toBe('Hour must be between 00 and 23');
			expect(parts.errors).toEqual([
				{ code: 'INVALID_HOUR', message: 'Hour must be between 00 and 23' },
			]);
		});

		it('should extract parts with invalid hours and minutes', () => {
			// given
			const textInput = '2018-12-25 55:66:12';
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(parts.date).toEqual(new Date(2018, 11, 25));
			expect(isNaN(parts.datetime.getTime())).toBe(true);
			expect(parts.textInput).toBe(textInput);
			expect(parts.time).toEqual({ hours: '55', minutes: '66', seconds: '12' });
			expect(parts.errorMessage).toBe('Hour must be between 00 and 23');
			expect(parts.errors).toEqual([
				{ code: 'INVALID_HOUR', message: 'Hour must be between 00 and 23' },
				{ code: 'INVALID_MINUTES', message: 'Minutes value must be between 00 and 59' },
			]);
		});

		it('should extract parts with invalid hh:mm:ss', () => {
			// given
			const textInput = '2018-12-25 44:90:66';
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(parts.date).toEqual(new Date(2018, 11, 25));
			expect(isNaN(parts.datetime.getTime())).toBe(true);
			expect(parts.textInput).toBe(textInput);
			expect(parts.time).toEqual({ hours: '44', minutes: '90', seconds: '66' });
			expect(parts.errorMessage).toBe('Hour must be between 00 and 23');
			expect(parts.errors).toEqual([
				{ code: 'INVALID_HOUR', message: 'Hour must be between 00 and 23' },
				{ code: 'INVALID_MINUTES', message: 'Minutes value must be between 00 and 59' },
				{ code: 'INVALID_SECONDS', message: 'Seconds value must be between 00 and 59' },
			]);
		});

		it('should convert date to UTC', () => {
			// given
			const textInput = '2018-12-25 22:58:12';
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				useSeconds: true,
				useUTC: true,
			};

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(parts).toEqual({
				date: new Date(2018, 11, 25),
				time: { hours: '22', minutes: '58', seconds: '12' },
				datetime: new Date(2018, 11, 25, 23, 58, 12),
				textInput,
				errorMessage: null,
				errors: [],
			});
		});

		it('should extract date only with valid date in hybrid mode', () => {
			// given
			const textInput = '2018-12-25';
			const options = { dateFormat: 'YYYY-MM-DD', hybridMode: true };

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(parts).toEqual({
				date: new Date(2018, 11, 25),
				time: { hours: '', minutes: '', seconds: '' },
				datetime: new Date(2018, 11, 25),
				textInput,
				errorMessage: null,
				errors: [],
			});
		});

		it('should extract time only with valid time in hybrid mode', () => {
			// given
			const textInput = '14:33:00';
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				hybridMode: true,
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(parts).toEqual({
				date: undefined,
				time: { hours: '14', minutes: '33', seconds: '00' },
				datetime: undefined,
				textInput,
				errorMessage: null,
				errors: [],
			});
		});

		it('should extract valid datetime in hybrid mode', () => {
			// given
			const textInput = '2018-12-25 22:58:12';
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				useSeconds: true,
				hybridMode: true,
			};

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(parts).toEqual({
				date: new Date(2018, 11, 25),
				time: { hours: '22', minutes: '58', seconds: '12' },
				datetime: new Date(2018, 11, 25, 22, 58, 12),
				textInput,
				errorMessage: null,
				errors: [],
			});
		});

		it('should extract an invalid date in hybrid mode', () => {
			// given
			const textInput = '2018-12-44';
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				hybridMode: true,
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(parts).toEqual({
				date: undefined,
				time: { hours: '', minutes: '', seconds: '' },
				datetime: undefined,
				textInput,
				errorMessage: "Day value doesn't match an existing day in the month",
				errors: [
					{
						code: 'INVALID_DAY_OF_MONTH',
						message: "Day value doesn't match an existing day in the month",
					},
				],
			});
		});
	});

	describe('getFullDateFormat', () => {
		it('should return date format only', () => {
			// given
			const options = { dateFormat: 'YYYY-MM-DD' };

			// when
			const format = getFullDateFormat(options);

			// then
			expect(format).toBe('YYYY-MM-DD');
		});

		it('should return date format with time', () => {
			// given
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
			};

			// when
			const format = getFullDateFormat(options);

			// then
			expect(format).toBe('YYYY-MM-DD HH:mm');
		});

		it('should return date format with time and seconds', () => {
			// given
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				useSeconds: true,
			};

			// when
			const format = getFullDateFormat(options);

			// then
			expect(format).toBe('YYYY-MM-DD HH:mm:ss');
		});
	});
	describe('check', () => {
		it('should return date format error when date is empty', () => {
			// when
			const errors = check(
				undefined,
				{
					hours: '22',
					minutes: '11',
					seconds: '00',
				},
				{ required: true },
			);

			// then
			expect(errors.length).toBe(1);
			expect(errors[0].code).toBe('INVALID_DATE_FORMAT');
		});
		it('should return error on hours', () => {
			// when
			const errors = check(
				new Date(),
				{
					hours: '',
					minutes: '11',
					seconds: '00',
				},
				{ required: true },
			);

			// then
			expect(errors.length).toBe(1);
			expect(errors[0].message).toBe('Hour is required');
		});
		it('should return no error when option required is false', () => {
			// when
			const errors = check(
				undefined,
				{
					hours: '',
					minutes: '',
					seconds: '',
				},
				{ required: false },
			);

			// then
			expect(errors.length).toBe(0);
		});
	});
});
