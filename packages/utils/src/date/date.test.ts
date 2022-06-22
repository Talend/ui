import dateFnsFormat from 'date-fns/format';
import {
	convertToLocalTime,
	convertToTimeZone,
	convertToUTC,
	format,
	FORMAT,
	formatReadableUTCOffset,
	formatToTimeZone,
	getUTCOffset,
	timeZoneExists,
} from './index';

jest.mock('date-fns/format', () => {
	const actualFormat = jest.requireActual('date-fns/format');
	return {
		__esModule: true,
		default: jest.fn().mockImplementation(actualFormat),
	};
});

describe('date', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
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
		test.each([
			[0, '+00:00'],
			[540, '+09:00'],
			[-360, '-06:00'],
		])('it should format a %s minutes offset', (offset: number, expectedOffset: string) => {
			expect(formatReadableUTCOffset(offset)).toEqual(expectedOffset);
		});
	});

	describe('formatToTimeZone', () => {
		it('should format a locale date to a given timezone in a specific format', () => {
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
		it('should pass locale to datefns format method', () => {
			// given
			const mockLocal = { format: () => {} };
			const dateObj = new Date('2020-12-20, 20:00');
			const formatString = 'ddd YYYY-MM-DD HH:mm:ss';
			const options = {
				timeZone: timeZones['UTC+5'],
				locale: mockLocal,
			};

			// when
			formatToTimeZone(dateObj, formatString, options);

			// then
			expect(dateFnsFormat).toHaveBeenCalledWith(
				expect.anything(),
				expect.anything(),
				expect.objectContaining({
					locale: mockLocal,
				}),
			);
		});
		it('should be formatted to a correct winter time and summer time for specific timezone', () => {
			// given
			const formatString = 'ddd YYYY-MM-DD HH:mm:ss';
			const timeZone = 'Europe/Berlin';
			const winterTimestamp = 1643095932000; //  2022-01-25 08:32:12
			const expectedWinterTime = 'Tue 2022-01-25 08:32:12';
			const summerTimestamp = 1654068732000; // 2022-06-01 08:32:12
			const expectedSummerTime = 'Wed 2022-06-01 09:32:12';

			// when for winter time
			const winterTime = formatToTimeZone(winterTimestamp, formatString, { timeZone });

			// then
			expect(winterTime).toEqual(expectedWinterTime);

			// when for summer time
			const summerTime = formatToTimeZone(summerTimestamp, formatString, { timeZone });

			// then
			expect(summerTime).toEqual(expectedSummerTime);
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
		test.each([
			['Africa/Bamako', 0],
			['Asia/Seoul', 540],
			['America/Swift_Current', -360],
		])('it should get %s timezone offset', (timezone: string, expectedOffset: number) => {
			expect(getUTCOffset(timezone)).toEqual(expectedOffset);
		});
		test.each([
			['Africa/Bamako', new Date('2022-01-25 08:32:12'), 0],
			['Asia/Seoul', new Date('2022-06-14 08:32:12'), 540],
			['Europe/Berlin', new Date('2022-01-25 08:32:12'), 60], // winter time
			['Europe/Berlin', new Date('2022-06-1 08:32:12'), 120], // summer time
		])(
			'it should get %s timezone offset with specific date',
			(timezone: string, date: Date, expectedOffset: number) => {
				expect(getUTCOffset(timezone, date)).toEqual(expectedOffset);
			},
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

	describe('dateFormat', () => {
		it('should format date according to the format and the lang', () => {
			// given
			const dateObj = new Date('2020-05-13, 20:00');

			// when
			const formatedDate = format(dateObj, FORMAT.MDY_LONG, 'en');

			// then
			expect(formatedDate).toEqual('May 13, 2020');
		});

		it('should format date according to the format and the lang', () => {
			// given
			const dateObj = new Date('2020-05-13, 20:00');

			// when
			const formatedDate = format(dateObj, FORMAT.MY_LONG, 'fr');

			// then
			expect(formatedDate).toEqual('mai 2020');
		});

		it('should format date without year', () => {
			// given
			const dateObj = new Date('2020-05-13, 20:00');

			// then
			expect(format(dateObj, FORMAT.MD, 'fr')).toEqual('13/05');

			// and
			expect(format(dateObj, FORMAT.MD, 'en')).toEqual('5/13');
		});
	});
});
