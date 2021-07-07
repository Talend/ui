import dateFnsFormat from 'date-fns/format';
import parse from 'date-fns/parse';

type DateFnsFormatInput = Date | number | string;

interface ConversionOptions {
	timeZone: string,
	sourceTimeZone?: string,
}

interface DateFormatOptions {
	[key: string]: Intl.DateTimeFormatOptions,
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
 * @see https://date-fns.org/v1.27.2/docs/format
 * @see https://github.com/prantlf/date-fns-timezone/blob/master/src/formatToTimeZone.js#L131
 */
function formatTimeZoneTokens(dateFormat: string, timeZone: string): string {
	return dateFormat.replace(/(?<!\[)(z|ZZ?)/g, match => {
		const offset = getUTCOffset(timeZone);
		const separator = match === 'Z' ? ':' : '';
		return formatUTCOffset(offset, separator);
	});
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

	return dateFnsFormat(dateConvertedToTimezone, dateFnsFormatWithTimeZoneValue);
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

/**
 * Date format options
 * @enum string
 */
export const FORMAT = {
	/** en: June 29, 2021 / fr: 29 juin 2020 / ja: 2020年6月29日 / de 29. Juni 2020 */
	MDY_LONG: 'MDY_LONG',
	/** en: June 2020 / fr: juin 2020 / ja: 2020年6月 / Juni 2020 */
	MY_LONG: 'MY_LONG',
	/** en: 06/29/2020 / fr: 29/06/2020 / ja: 2020/06/29 / de: 29.06.2020 */
	MDY: 'MDY',
	/** en: 6/29/20, 10:00 PM / fr: 29/06/2020 22:00 / ja: 2020/06/29 22:00 / de: 29.06.20, 22:00 */
	MDYHM: 'MDYHM',
};

const options: DateFormatOptions = {
	[FORMAT.MDY_LONG]: { year: 'numeric', month: 'long', day: 'numeric' },
	[FORMAT.MY_LONG]: { year: 'numeric', month: 'long' },
	[FORMAT.MDY]: { year: 'numeric', month: '2-digit', day: '2-digit' },
	[FORMAT.MDYHM]: { dateStyle: 'short', timeStyle: 'short' },
};

/**
 * Format a date using Intl.
 * @param date {DateFnsFormatInput} A date: Date, string or Number
 * @param dateOption {string} Comes from `FORMAT` enum
 * @param lang {string} language
 * @returns The formated date
 */
export function format(date: DateFnsFormatInput, dateOption: string, lang: string): string {
	return new Intl.DateTimeFormat(lang, options[dateOption]).format(parse(date));
}; 

export default {
	convertToLocalTime,
	convertToTimeZone,
	convertToUTC,
	format,
	FORMAT,
	formatReadableUTCOffset,
	formatToTimeZone,
	getUTCOffset,
	timeZoneExists,
};
