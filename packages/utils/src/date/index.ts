import format from 'date-fns/format';
import toDate from 'date-fns/toDate';
import parseISO from 'date-fns/parseISO';
import { enUS, fr, de, ja } from 'date-fns/locale';

type DateFnsFormatInput = Date | number | string;

interface ConversionOptions {
	timeZone: string,
	sourceTimeZone?: string,
}

interface Map {
	[key: string]: object,
  }

/**
 * Get the offset between a timezone and the UTC time (in minutes)
 * @param {string} timeZone Timezone IANA name
 * @returns {Number}
 *
 * @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
export function getUTCOffset(timeZone: string): number {
	// Build localized formats for UTC and the target timezone
	const formatOptions: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	};

	const locale = 'en-US';
	const utcFormat = new Intl.DateTimeFormat(locale, { ...formatOptions, timeZone: 'Etc/UTC' });
	const timezoneFormat = new Intl.DateTimeFormat(locale, { ...formatOptions, timeZone });

	// Create the same date in UTC timezone and the target timezone
	const date = new Date();
	const utcDate = new Date(utcFormat.format(date));
	const timezoneDate = new Date(timezoneFormat.format(date));

	// Compute delta between dates
	return (timezoneDate.getTime() - utcDate.getTime()) / (1000 * 60);
}

/**
 * Format an UTC offset from minutes to [+/-][HH][separator][mm]
 * @param {Number} offset UTC offset
 * @param {string} separator Separator between hours and minutes
 * @returns {string} Formatted UTC offset
 */
function formatUTCOffset(offset: number, separator: string): string {
	const sign = offset >= 0 ? '+' : '-';

	const absoluteOffset = Math.abs(offset);
	const min = absoluteOffset % 60;
	const hours = (absoluteOffset - min) / 60;

	const paddedHours = hours.toString().padStart(2, '0');
	const paddedMin = min.toString().padStart(2, '0');

	return `${sign}${paddedHours}${separator}${paddedMin}`;
}

/**
 * Format a human-readable UTC offset
 * @param offset Timezone offset to UTC expressed in minutes
 * @returns The human readable offset (+03:00, -06:00 ...)
 */
export function formatReadableUTCOffset(offset: number): string {
	return formatUTCOffset(offset, ':');
}

/**
 * Replace timezone token(s) in the date format pattern to a specific timezone's value(s).
 * This should be maintained along with the date-fns formats (see linked API doc).
 * @param {string} dateFormat
 * @param {string} timeZone
 * @returns {string}
 *
 * @see https://date-fns.org/v2.22.1/docs/format
 * @see https://github.com/prantlf/date-fns-timezone/blob/master/src/formatToTimeZone.js#L131
 */
function formatTimeZoneTokens(dateFormat: string, timeZone: string): string {
	return dateFormat.replace(/(?<!\[)(x|XX?)/g, match => {
		const offset = getUTCOffset(timeZone);
		const separator = match === 'X' ? ':' : '';
		return formatUTCOffset(offset, separator);
	});
}

/**
 * No more parse method with Date, string or number in date-fns 2.x
 * @param date DateFnsFormatInput
 * @returns Date object
 */
function parse(date: DateFnsFormatInput) {
	if (date instanceof Date) {
		return date;
	}
	if (typeof date === 'number') {
		return toDate(date);
	}
	// string
	return parseISO(date);
}

/**
 * Converts the given date from the given time zone to the local time and returns a new Date object.
 * @param {DateFnsFormatInput} date Date to format
 * @param {ConversionOptions} options
 * @returns {Date}
 *
 * @see https://github.com/prantlf/date-fns-timezone/blob/HEAD/docs/API.md#converttolocaltime
 */
export function convertToLocalTime(date: DateFnsFormatInput, options: ConversionOptions): Date {
	const parsedDate = parse(date);
	const offset = getUTCOffset(options.timeZone) + parsedDate.getTimezoneOffset();

	return new Date(parsedDate.getTime() - offset * 60 * 1000);
}

/**
 * Converts the given date from the local time (or from specified source timezone) to
 * the given timezone and returns a new Date object.
 * @param {DateFnsFormatInput} date Date to format
 * @param {ConversionOptions} options
 * @returns {Date}
 *
 * @see https://github.com/prantlf/date-fns-timezone/blob/master/src/convertToTimeZone.js
 */
export function convertToTimeZone(date: DateFnsFormatInput, options: ConversionOptions): Date {
	const { timeZone, sourceTimeZone } = options;

	const parsedDate = parse(date);

	let offset = getUTCOffset(timeZone) + parsedDate.getTimezoneOffset();

	if (sourceTimeZone) {
		offset -= new Date().getTimezoneOffset();
		offset -= getUTCOffset(sourceTimeZone);
	}

	return new Date(parsedDate.getTime() + offset * 60 * 1000);
}

/**
 * Returns the formatted date string in the given format, after converting it to the given time zone.
 * @param {DateFnsFormatInput} date Date to format
 * @param {string} formatString Output format (see date-fns supported formats)
 * @param {ConversionOptions} options
 * @returns {string}
 *
 * @see https://github.com/prantlf/date-fns-timezone/blob/master/src/formatToTimeZone.js
 */
export function formatToTimeZone(date: DateFnsFormatInput, formatString: string, options: ConversionOptions): string {
	const dateConvertedToTimezone = convertToTimeZone(date, options);

	// Replace timezone token(s) in the string format with timezone values, since format() will use local timezone
	const dateFnsFormatWithTimeZoneValue = formatTimeZoneTokens(formatString, options.timeZone);

	return format(dateConvertedToTimezone, dateFnsFormatWithTimeZoneValue);
}

/**
 * Convert a date in local TZ to UTC
 * 20:00 in local TZ become 20:00 in UTC
 * @param {Date} date
 * @returns {Date}
 */
export function convertToUTC(date: Date): Date {
	return new Date(
		Date.UTC(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			date.getHours(),
			date.getMinutes(),
			date.getSeconds(),
		),
	);
}

/**
 * Check wether a timezone exists or not.
 * @param timeZone {string}
 * @returns {boolean}
 */
export function timeZoneExists(timeZone: string): boolean {
	try {
		// eslint-disable-next-line no-new
		new Intl.DateTimeFormat(undefined, { timeZone });
		return true;
	} catch (e) {
		return false;
	}
}

const locales: Map = { fr, ja, de, en: enUS };

export const localizedFormat = (t: any) => ({
	MDY_LONG: t('DATE_FORMAT_MONTH_DAY_YEAR_LONG', { defaultValue: 'MMMM do, yyyy' }), // June 25th, 2021
	MY_LONG: t('DATE_FORMAT_MONTH_YEAR_LONG', { defaultValue: 'MMMM yyyy' }), // June 2021
	MDY: t('DATE_FORMAT_MONTH_DAY_YEAR', { defaultValue: 'MM/dd/yyyy' }), // 06/25/2021
	MDYHM: t('DATE_FORMAT_MONTH_DAY_YEAR_HOUR_MIN', { defaultValue: 'MM/dd/yyyy hh:mm aaa' }), // 06/25/2021 11:44 am
});

/**
 * Format date using the user langguage.
 * @param {Object} date A date object or String
 * @param {String} localizedDateFormat The date format to use
 * @param {string} lang The user language
 * @returns {String} The date formated using the user language.
 */
export const dateFormat = (date: DateFnsFormatInput, localizedDateFormat: string, lang: string): string => {
	return format(parse(date), localizedDateFormat, { locale: locales[lang] });
};

export default {
	convertToLocalTime,
	convertToTimeZone,
	convertToUTC,
	formatReadableUTCOffset,
	formatToTimeZone,
	getUTCOffset,
	timeZoneExists,
};
