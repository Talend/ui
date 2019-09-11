import {
	extractParts,
	extractPartsFromDateAndTime,
	extractPartsFromDateTime,
	extractPartsFromTextInput,
} from './datetime-extraction';

describe('Date extraction', () => {
	describe('extractParts', () => {
		it('should return empty parts on undefined value', () => {
			// given
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useSeconds: true,
			};

			// when
			const parts = extractParts(undefined, options);

			// then
			expect(parts).toEqual({
				date: undefined,
				time: undefined,
				datetime: undefined,
				textInput: '',
				errors: [],
				timeTextInput: '',
				dateTextInput: '',
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
				textInput: '2015-09-15 12:58',
				errors: [],
				time: { hours: '12', minutes: '58', seconds: '00' },
				timeTextInput: '12:58',
				dateTextInput: '2015-09-15',
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
				textInput: '2015-09-15 12:58',
				errors: [],
				time: { hours: '12', minutes: '58', seconds: '00' },
				dateTextInput: '2015-09-15',
				timeTextInput: '12:58',
			});
		});

		it('should return parts from string', () => {
			// given
			const value = '2015-09-15 10:05';
			const options = { dateFormat: 'YYYY-MM-DD' };

			// when
			const parts = extractParts(value, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				datetime: new Date(2015, 8, 15, 10, 5),
				textInput: value,
				errors: [],
				errorMessage: null,
				time: { hours: '10', minutes: '05', seconds: '00' },
			});
		});
	});

	describe('extractPartsFromDateTime', () => {
		it('should return empty parts on invalid date', () => {
			// given
			const invalidDate = 'lol';
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromDateTime(invalidDate, options);

			// then
			expect(parts).toEqual({
				date: undefined,
				time: undefined,
				datetime: 'lol',
				textInput: '',
				errors: [],
				timeTextInput: '',
				dateTextInput: '',
			});
		});

		it('should return valid date parts with time', () => {
			// given
			const validDate = new Date(2015, 8, 15, 12, 58, 22);
			const options = {
				dateFormat: 'YYYY-MM-DD',
			};

			// when
			const parts = extractPartsFromDateTime(validDate, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				dateTextInput: '2015-09-15',
				datetime: validDate,
				textInput: '2015-09-15 12:58',
				time: { hours: '12', minutes: '58', seconds: '00' },
				timeTextInput: '12:58',
				errors: [],
			});
		});

		it('should return valid date parts with seconds', () => {
			// given
			const validDate = new Date(2015, 8, 15, 12, 58, 22);
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromDateTime(validDate, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				dateTextInput: '2015-09-15',
				datetime: validDate,
				textInput: '2015-09-15 12:58:22',
				errors: [],
				time: { hours: '12', minutes: '58', seconds: '22' },
				timeTextInput: '12:58:22',
			});
		});

		it('should create the gmt date from utc value', () => {
			// given
			// date is 2015-09-15T10:58:22.000Z UTC
			const validDate = new Date(1442314702000);
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useSeconds: true,
				useUTC: true,
			};

			// when
			const parts = extractPartsFromDateTime(validDate, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				dateTextInput: '2015-09-15',
				datetime: validDate,
				textInput: '2015-09-15 10:58:22',
				errors: [],
				time: { hours: '10', minutes: '58', seconds: '22' },
				timeTextInput: '10:58:22',
			});
		});

		it('should create the gmt date from utc value (previous day)', () => {
			// given
			// date is 2015-09-15T10:58:22.000Z UTC
			const validDate = new Date(2015, 8, 15, 1, 0, 22);
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useSeconds: true,
				useUTC: true,
			};

			// when
			const parts = extractPartsFromDateTime(validDate, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 14),
				dateTextInput: '2015-09-14',
				datetime: validDate,
				textInput: '2015-09-14 23:00:22',
				errors: [],
				time: { hours: '23', minutes: '00', seconds: '22' },
				timeTextInput: '23:00:22',
			});
		});
	});

	describe('extractPartsFromDateAndTime', () => {
		it('should extract parts from date with time', () => {
			// given
			const date = new Date(2015, 8, 15);
			const time = { hours: '12', minutes: '58', seconds: '00' };
			const options = {
				dateFormat: 'YYYY-MM-DD',
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
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromDateAndTime(date, time, options);

			// then
			expect(parts.date).toBe(date);
			expect(parts.datetime).toBe(null);
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
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromDateAndTime(date, time, options);

			// then
			expect(parts.date).toBe(date);
			expect(parts.datetime).toBe(null);
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
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromDateAndTime(date, time, options);

			// then
			expect(parts.date).toBe(date);
			expect(parts.datetime).toBe(null);
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
			};

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(parts).toEqual({
				date: undefined,
				time: undefined,
				datetime: undefined,
				textInput: '',
				errors: [],
			});
		});

		it('should extract parts with valid date and time', () => {
			// given
			const textInput = '2018-12-25 22:58';
			const options = {
				dateFormat: 'YYYY-MM-DD',
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
	});
});
