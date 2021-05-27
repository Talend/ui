import { formatToTimeZone, convertToLocalTime, convertToTimeZone, convertToUTC } from './date';

describe('date', () => {
	// "Locale date" here means Europe/Paris, according to the test command described in package.json

	const timeZones = {
		'GMT+5': 'Asia/Oral',
		'GMT-3': 'America/Sao_Paulo',
	};

	describe('convertToLocalTime', () => {
		it('should convert a date object of a timezone to the locale timezone', () => {
			// given
			const dateObj = new Date('2020-05-13, 20:00');
			const options = { timeZone: timeZones['GMT+5'] };

			// when
			const localDate = convertToLocalTime(dateObj, options);

			// then
			expect(localDate).toEqual(new Date('2020-05-13, 17:00'));
		});

		it('should convert a date string of a timezone to the locale timezone', () => {
			// given
			const dateObj = '2020-05-13T20:00:00';
			const options = { timeZone: timeZones['GMT-3'] };

			// when
			const localDate = convertToLocalTime(dateObj, options);

			// then
			expect(localDate).toEqual(new Date('2020-05-14, 01:00'));
		});
	});

	describe('convertToTimeZone', () => {
		it('should convert a locale date object to the given timezone time', () => {
			// given
			const dateObj = new Date('2020-05-13, 20:00');
			const options = { timeZone: timeZones['GMT+5'] };

			// when
			const localDate = convertToTimeZone(dateObj, options);

			// then
			expect(localDate).toEqual(new Date('2020-05-13, 23:00'));
		});

		it('should convert a locale date string to the given timezone time', () => {
			// given
			const dateObj = '2020-05-13T20:00:00';
			const options = { timeZone: timeZones['GMT-3'] };

			// when
			const localDate = convertToTimeZone(dateObj, options);

			// then
			expect(localDate).toEqual(new Date('2020-05-13, 15:00'));
		});
	});

	describe('formatToTimeZone', () => {
		it('should format a locale date to a given timezone in a specifc format', () => {
			// given
			const dateObj = new Date('2020-05-13, 20:00');
			const formatString = 'YYYY-MM-DD[T]HH:mm:ssZZ';
			const options = { timeZone: timeZones['GMT+5'] };

			// when
			const localDate = formatToTimeZone(dateObj, formatString, options);

			// then
			expect(localDate).toEqual('2020-05-13T23:00:00+0500');
		});
	});
	describe('convertToUTC', () => {
		it('should do convertion of bad date', () => {
			// lets create Date object in local TZ
			const dateObj = new Date('2020-05-13, 20:00');
			expect(convertToUTC(dateObj).getUTCHours()).toBe(20);
			expect(convertToUTC(dateObj).getUTCMinutes()).toBe(0);
		});
	});
});
