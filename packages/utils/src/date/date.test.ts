import {
	convertToLocalTime,
	convertToTimeZone,
	convertToUTC,
	formatReadableUTCOffset,
	formatToTimeZone,
	getUTCOffset,
	timeZoneExists,
} from './index';

describe('date', () => {
	// "Locale date" here means Europe/Paris, according to the test command described in package.json

	const timeZones = {
		'UTC+5': 'Asia/Oral',
		'UTC+1': 'Europe/London',
		'UTC-3': 'America/Sao_Paulo',
		'UTC-6': 'America/Belize',
	};

	describe('convertToLocalTime', () => {
		it('should convert a date object of a timezone to the locale timezone', () => {
			// given
			const dateObj = new Date('2020-05-13, 20:00');
			const options = { timeZone: timeZones['UTC+5'] };

			// when
			const localDate = convertToLocalTime(dateObj, options);

			// then
			expect(localDate).toEqual(new Date('2020-05-13, 17:00'));
		});

		it('should convert a date string of a timezone to the locale timezone', () => {
			// given
			const dateObj = '2020-05-13T20:00:00';
			const options = { timeZone: timeZones['UTC-3'] };

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
			const options = { timeZone: timeZones['UTC+5'] };

			// when
			const localDate = convertToTimeZone(dateObj, options);

			// then
			expect(localDate).toEqual(new Date('2020-05-13, 23:00'));
		});

		it('should convert a locale date string to the given timezone time', () => {
			// given
			const dateObj = '2020-05-13T20:00:00';
			const options = { timeZone: timeZones['UTC-3'] };

			// when
			const localDate = convertToTimeZone(dateObj, options);

			// then
			expect(localDate).toEqual(new Date('2020-05-13, 15:00'));
		});

		it('should convert a date from a specific timezone to the target timezone time', () => {
			// given
			const dateObj = '2020-05-13T20:00:00';
			const options = {
				sourceTimeZone: timeZones['UTC+1'],
				timeZone: timeZones['UTC-6'],
			};

			// when
			const localDate = convertToTimeZone(dateObj, options);

			// then
			expect(localDate).toEqual(new Date('2020-05-13, 13:00'));
		});
	});

	describe('formatReadableUTCOffset', () => {
		test.each(
			[
				[0, '+00:00'],
				[600, '+10:00'],
				[-360, '-06:00'],
			]
		)(
			'it should format a %s minutes offset',
			(offset: number, expectedOffset: string) => {
				expect(formatReadableUTCOffset(offset)).toEqual(expectedOffset);
			}
		);
	});

	describe('formatToTimeZone', () => {
		it('should format a locale date to a given timezone in a specifc format', () => {
			// given
			const dateObj = new Date('2020-05-13, 20:00');
			const formatString = 'YYYY-MM-DD[T]HH:mm:ssZZ';
			const options = { timeZone: timeZones['UTC+5'] };

			// when
			const localDate = formatToTimeZone(dateObj, formatString, options);

			// then
			expect(localDate).toEqual('2020-05-13T23:00:00+0500');
		});

		it('should not change timezone tokens that are wrapped in hooks', () => {
			// given
			const dateObj = new Date('2020-05-13, 20:00');
			const formatString = 'YYYY-MM-DD[T]HH:mm:ss[Z]';
			const options = { timeZone: timeZones['UTC+5'] };

			// when
			const localDate = formatToTimeZone(dateObj, formatString, options);

			// then
			expect(localDate).toEqual('2020-05-13T23:00:00Z');
		});
	});

	describe('convertToUTC', () => {
		it('should do convertion of bad date', () => {
			// when
			// lets create Date object in local TZ
			const dateObj = new Date('2020-05-13, 20:00');

			// then
			expect(convertToUTC(dateObj).getUTCHours()).toBe(20);
			expect(convertToUTC(dateObj).getUTCMinutes()).toBe(0);
		});
	});

	describe('getUTCOffset', () => {
		test.each(
			[
				['Africa/Bamako', 0],
				['Australia/Melbourne', 600],
				['America/Swift_Current', -360],
			]
		)(
			'it should get %s timezone offset',
			(timezone: string, expectedOffset: number) => {
				expect(getUTCOffset(timezone)).toEqual(expectedOffset);
			}
		);
	});

	describe('timeZoneExists', () => {
		it('should return true when the timezone exists', () => {
			// given
			const timezone = 'Europe/Paris';

			// when
			const exists = timeZoneExists(timezone);

			// then
			expect(exists).toBe(true);
		});

		it('should return false when the timezone exists', () => {
			// given
			const timezone = 'Europe/Beauvais';

			// when
			const exists = timeZoneExists(timezone);

			// then
			expect(exists).toBe(false);
		});
	});
});
