import {
	dateAndTimeToDateTime,
	dateTimeToStr,
	extractDateTimeParts,
	isDateValid,
	strToDate,
	strToTime,
} from './date-extraction';

describe('Date extraction', () => {
	describe('extractDateTimeParts', () => {
		it('should return empty parts on invalid date', () => {
			// given
			const invalidDate = 'lol';

			// when
			const parts = extractDateTimeParts(invalidDate);

			// then
			expect(parts).toEqual({
				date: undefined,
				time: undefined,
				datetime: 'lol',
				textInput: '',
			});
		});

		it('should return valid date parts', () => {
			// given
			const validDate = new Date(2015, 8, 15, 12, 58);

			// when
			const parts = extractDateTimeParts(validDate);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				datetime: validDate,
				textInput: '2015-09-15 12:58',
				time: 778,
			});
		});
	});

	describe('strToDate', () => {
		it('should convert valid date', () => {
			// given
			const strToParse = '2014-12-25';

			// when
			const [date, error] = strToDate(strToParse);

			// then
			expect(error).toBeUndefined();
			expect(date).toEqual(new Date(2014, 11, 25));
		});

		it('should return error with incorrect month', () => {
			// given
			const strWithZeroMonth = '2014-0-25';
			const strWithTooHighMonth = '2014-15-25';

			// when/then
			const [zeroDate, zeroError] = strToDate(strWithZeroMonth);
			expect(zeroError).toBe('DATE - INCORRECT MONTH NUMBER');
			expect(zeroDate).toBeUndefined();

			// when/then
			const [tooHighDate, tooHighError] = strToDate(strWithTooHighMonth);
			expect(tooHighError).toBe('DATE - INCORRECT MONTH NUMBER');
			expect(tooHighDate).toBeUndefined();
		});

		it('should return error with incorrect day', () => {
			// given
			const strWithZeroDay = '2014-11-00';
			const strWithTooHighDay = '2014-02-31';

			// when/then
			const [zeroDate, zeroError] = strToDate(strWithZeroDay);
			expect(zeroError).toBe('DATE - INCORRECT DAY NUMBER');
			expect(zeroDate).toBeUndefined();

			// when/then
			const [tooHighDate, tooHighError] = strToDate(strWithTooHighDay);
			expect(tooHighError).toBe('DATE - INCORRECT DAY NUMBER RELATIVE TO MONTH');
			expect(tooHighDate).toBeUndefined();
		});
	});

	describe('strToTime', () => {
		it('should convert valid time', () => {
			// given
			const strToParse = '02:52';

			// when
			const [time, error] = strToTime(strToParse);

			// then
			expect(error).toBeUndefined();
			expect(time).toEqual(172);
		});

		it('should return error with incorrect format', () => {
			// given
			const strToParse = 'azerty';

			// when
			const [time, error] = strToTime(strToParse);

			// then
			expect(error).toBe('TIME - INCORRECT FORMAT');
			expect(time).toBeUndefined();
		});

		it('should return error with incorrect hour', () => {
			// given
			const strToParse = '25:45';

			// when
			const [time, error] = strToTime(strToParse);

			// then
			expect(error).toBe('TIME - INCORRECT HOUR NUMBER');
			expect(time).toBeUndefined();
		});

		it('should return error with incorrect minutes', () => {
			// given
			const strToParse = '23:66';

			// when
			const [time, error] = strToTime(strToParse);

			// then
			expect(error).toBe('TIME - INCORRECT MINUTES NUMBER');
			expect(time).toBeUndefined();
		});
	});

	describe('dateTimeToStr', () => {
		it('should return empty string with no date', () => {
			// given
			const date = undefined;
			const time = 172;

			// when
			const result = dateTimeToStr(date, time);

			// then
			expect(result).toBe('');
		});

		it('should convert only the date', () => {
			// given
			const date = new Date(2015, 8, 15);
			const time = undefined;

			// when
			const result = dateTimeToStr(date, time);

			// then
			expect(result).toBe('2015-09-15');
		});

		it('should convert date and time', () => {
			// given
			const date = new Date(2015, 8, 15);
			const time = 172;

			// when
			const result = dateTimeToStr(date, time);

			// then
			expect(result).toBe('2015-09-15 02:52');
		});
	});

	describe('dateAndTimeToDateTime', () => {
		it('should merge date and time to a Date', () => {
			// given
			const date = new Date(2015, 8, 15);
			const time = 172;

			// when
			const result = dateAndTimeToDateTime(date, time);

			// then
			expect(result).toEqual(new Date(2015, 8, 15, 2, 52));
		});

		it('should return invalid date', () => {
			// given
			const date = new Date(2015, 8, 15);
			const time = 172;

			// when
			const resultWithoutDate = dateAndTimeToDateTime(undefined, time);
			const resultWithoutTime = dateAndTimeToDateTime(date, undefined);

			// then
			expect(resultWithoutDate.getTime()).toEqual(NaN);
			expect(resultWithoutTime.getTime()).toEqual(NaN);
		});
	});

	describe('isDateValid', () => {
		it('should return true with valid date', () => {
			// given
			const date = new Date(2015, 8, 15);

			// when
			const isValid = isDateValid(date);

			// then
			expect(isValid).toBe(true);
		});

		it('should return true with undefined', () => {
			// when
			const isValid = isDateValid(undefined);

			// then
			expect(isValid).toBe(true);
		});

		it('should return false with non date', () => {
			// when
			const isValid = isDateValid('aze');

			// then
			expect(isValid).toBe(false);
		});

		it('should return false with invalid date', () => {
			// when
			const isValid = isDateValid(new Date('lol'));

			// then
			expect(isValid).toBe(false);
		});
	});
});
