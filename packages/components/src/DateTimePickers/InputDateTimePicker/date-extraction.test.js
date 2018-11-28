import {
	checkTime,
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
			const parts = extractDateTimeParts(invalidDate, { dateFormat: 'YYYY-MM-DD' });

			// then
			expect(parts).toEqual({
				date: undefined,
				time: { hours: '', minutes: '', seconds: '' },
				datetime: 'lol',
				textInput: '',
			});
		});

		it('should return valid date parts', () => {
			// given
			const validDate = new Date(2015, 8, 15, 12, 58);

			// when
			const parts = extractDateTimeParts(validDate, { dateFormat: 'YYYY-MM-DD', useTime: true });

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				datetime: validDate,
				textInput: '2015-09-15 12:58',
				time: { hours: '12', minutes: '58', seconds: '00' },
			});
		});
		it('should return valid date parts with seconds', () => {
			// given
			const validDate = new Date(2015, 8, 15, 12, 58, 22);

			// when
			const parts = extractDateTimeParts(validDate, {
				dateFormat: 'YYYY-MM-DD',
				useTime: true,
				useSeconds: true,
			});

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				datetime: validDate,
				textInput: '2015-09-15 12:58:22',
				time: { hours: '12', minutes: '58', seconds: '22' },
			});
		});
	});

	describe('strToDate', () => {
		it('should convert valid date', () => {
			// given
			const strToParse = '2014-12-25';

			// when
			const date = strToDate(strToParse, 'YYYY-MM-DD');

			// then
			expect(date).toEqual(new Date(2014, 11, 25));
		});

		it('should return error with incorrect month', done => {
			// given
			const strWithZeroMonth = '2014-0-25';
			const strWithTooHighMonth = '2014-15-25';

			// when/then
			try {
				strToDate(strWithZeroMonth, 'YYYY-MM-DD');
				done.fail('strToDate should have thrown an error with incorrect month');
			} catch (error) {
				expect(error.message).toBe('DATE - INCORRECT FORMAT');
			}

			// when/then
			try {
				strToDate(strWithTooHighMonth, 'YYYY-MM-DD');
				done.fail('strToDate should have thrown an error with incorrect month');
			} catch (error) {
				expect(error.message).toBe('DATE - INCORRECT MONTH NUMBER');
			}

			done();
		});

		it('should return error with incorrect day', done => {
			// given
			const strWithZeroDay = '2014-11-00';
			const strWithTooHighDay = '2014-02-31';

			// when/then
			try {
				strToDate(strWithZeroDay, 'YYYY-MM-DD');
				done.fail('strToDate should have thrown an error with incorrect day');
			} catch (error) {
				expect(error.message).toBe('DATE - INCORRECT DAY NUMBER');
			}

			// when/then
			try {
				strToDate(strWithTooHighDay, 'YYYY-MM-DD');
				done.fail('strToDate should have thrown an error with incorrect day');
			} catch (error) {
				expect(error.message).toBe('DATE - INCORRECT DAY NUMBER RELATIVE TO MONTH');
			}

			done();
		});
	});

	describe('strToTime', () => {
		it('should convert valid time', () => {
			// given
			const strToParse = '02:52';

			// when
			const time = strToTime(strToParse);

			// then
			expect(time).toEqual({ hours: '02', minutes: '52', seconds: '00' });
		});

		it('should convert valid time using seconds', () => {
			// given
			const strToParse = '02:52:22';

			// when
			const time = strToTime(strToParse, true);

			// then
			expect(time).toEqual({ hours: '02', minutes: '52', seconds: '22' });
		});

		it('should return error with incorrect format', done => {
			// given
			const strToParse = 'azerty';

			try {
				// when
				strToTime(strToParse);
				done.fail('strToTime should have thrown an error with incorrect format');
			} catch (error) {
				// then
				expect(error.message).toBe('TIME - INCORRECT FORMAT');
			}

			done();
		});

		it('should convert invalid string that match xx:xx format', () => {
			// given
			const strToParse = 'aze:66toto';

			// when
			const time = strToTime(strToParse);

			// then
			expect(time).toEqual({
				hours: 'aze',
				minutes: '66toto',
				seconds: '00',
			});
		});

		it('should convert invalid string that match xx:xx:xx format using seconds part', () => {
			// given
			const strToParse = 'aze:66toto:tata';

			// when
			const time = strToTime(strToParse, true);

			// then
			expect(time).toEqual({
				hours: 'aze',
				minutes: '66toto',
				seconds: 'tata',
			});
		});
	});

	describe('dateTimeToStr', () => {
		it('should return empty string with no date', () => {
			// given
			const date = undefined;
			const time = { hours: '02', minutes: '52' };

			// when
			const result = dateTimeToStr(date, time, { dateFormat: 'YYYY-MM-DD' });

			// then
			expect(result).toBe('');
		});

		it('should convert only the date', () => {
			// given
			const date = new Date(2015, 8, 15);
			const time = undefined;

			// when
			const result = dateTimeToStr(date, time, { dateFormat: 'YYYY-MM-DD' });

			// then
			expect(result).toBe('2015-09-15');
		});

		it('should convert date and time', () => {
			// given
			const date = new Date(2015, 8, 15);
			const time = { hours: '02', minutes: '52' };

			// when
			const result = dateTimeToStr(date, time, { dateFormat: 'YYYY-MM-DD' });

			// then
			expect(result).toBe('2015-09-15 02:52');
		});

		it('should convert date and invalid time', () => {
			// given
			const date = new Date(2015, 8, 15);
			const time = { hours: 'aze', minutes: '66' };

			// when
			const result = dateTimeToStr(date, time, { dateFormat: 'YYYY-MM-DD' });

			// then
			expect(result).toBe('2015-09-15 aze:66');
		});
	});

	describe('dateAndTimeToDateTime', () => {
		it('should merge date and time to a Date', () => {
			// given
			const date = new Date(2015, 8, 15);
			const time = { hours: '02', minutes: '52' };

			// when
			const result = dateAndTimeToDateTime(date, time);

			// then
			expect(result).toEqual(new Date(2015, 8, 15, 2, 52));
		});

		it('should return invalid date with undefined parts', () => {
			// when
			const resultWithoutDate = dateAndTimeToDateTime(undefined, { hours: '02', minutes: '25' });
			const resultWithoutTime = dateAndTimeToDateTime(new Date(2015, 8, 15), undefined);

			// then
			expect(resultWithoutDate.getTime()).toEqual(NaN);
			expect(resultWithoutTime.getTime()).toEqual(NaN);
		});

		it('should return invalid date with invalid time', () => {
			// when
			const result = dateAndTimeToDateTime(new Date(2015, 8, 15), { hours: '2', minutes: '66' });

			// then
			expect(result.getTime()).toEqual(NaN);
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

	describe('checkTime', () => {
		it('should return error with incorrect hour', done => {
			// given
			const time = { hours: '25', minutes: '45' };

			try {
				// when
				checkTime(time);
				done.fail('strToTime should have thrown an error with incorrect hour');
			} catch (error) {
				// then
				expect(error.message).toBe('TIME - INCORRECT HOUR NUMBER');
			}

			done();
		});

		it('should return error with incorrect minutes', done => {
			// given
			const time = { hours: '23', minutes: '66' };

			// when
			try {
				// when
				checkTime(time);
				done.fail('strToTime should have thrown an error with incorrect minutes');
			} catch (error) {
				// then
				expect(error.message).toBe('TIME - INCORRECT MINUTES NUMBER');
			}

			done();
		});
	});
});
