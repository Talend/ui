import format from 'date-fns/format';
import parse from 'date-fns/parse';

/**
 * Get the offset between a timezone and the UTC time (in minutes)
 * @param {String} timeZone Timezone IANA name
 * @returns {Number}
 *
 * @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
function getUTCOffset(timeZone) {
	// Build localized formats for UTC and the target timezone
	const formatOptions = {
		hourCycle: 'h23',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	};

	const locale = 'en-US';
	const utcFormat = new Intl.DateTimeFormat(locale, { ...formatOptions, timeZone: 'Etc/UTC' });
	const timezoneFormat = new Intl.DateTimeFormat(locale, { ...formatOptions, timeZone });

	// Create the same date in UTC timezone and the target timezone
	const date = new Date();
	const utcDate = new Date(utcFormat.format(date));
	const timezoneDate = new Date(timezoneFormat.format(date));

	// Compute delta between dates
	return (timezoneDate - utcDate) / (1000 * 60);
}

/**
 * Ensure a numeric value is expressed on two digits (01, 02, 10 ...)
 * @param {Number} value
 * @returns {String}
 */
function padTwoDigits(value) {
	return value > 9 ? value : `0${value}`;
}

/**
 * Format an UTC offset from minutes to [+/-][HH][separator][mm]
 * @param {Number} offset UTC offset
 * @param {String} separator Separator between hours and minutes
 * @returns {String} Formatted UTC offset
 */
function formatUtcOffset(offset, separator) {
	const sign = offset >= 0 ? '+' : '-';

	const absoluteOffset = Math.abs(offset);
	const min = absoluteOffset % 60;
	const hours = (absoluteOffset - min) / 60;

	return `${sign}${padTwoDigits(hours)}${separator}${padTwoDigits(min)}`;
}

/**
 * Replace timezone token(s) in the date format pattern to a specific timezone's value(s).
 * This should be maintained along with the date-fns formats (see linked API doc).
 * @param {String} dateFormat
 * @param {String} timeZone
 * @returns {String}
 *
 * @see https://date-fns.org/v1.27.2/docs/format
 * @see https://github.com/prantlf/date-fns-timezone/blob/master/src/formatToTimeZone.js#L131
 */
function formatTimeZoneTokens(dateFormat, timeZone) {
	return dateFormat.replace(/z|ZZ?/g, match => {
		const offset = getUTCOffset(timeZone);
		const separator = match === 'Z' ? ':' : '';
		return formatUtcOffset(offset, separator);
	});
}

/**
 * Converts the given date from the given time zone to the local time and returns a new Date object.
 * @param {Date|Number|String} date Date to format
 * @param {*} options
 *
 * @see https://github.com/prantlf/date-fns-timezone/blob/HEAD/docs/API.md#converttolocaltime
 */
export function convertToLocalTime(date, options) {
	const parsedDate = parse(date);
	const offset = getUTCOffset(options.timeZone) + parsedDate.getTimezoneOffset();

	return new Date(parsedDate.getTime() - offset * 60 * 1000);
}

/**
 * Converts the given date from the local time to the given time zone and returns a new Date object.
 * @param {Date|Number|String} date Date to format
 * @param {*} options
 * @param {*} options.timeZone
 * @returns {Date}
 *
 * @see https://github.com/prantlf/date-fns-timezone/blob/master/src/convertToTimeZone.js
 */
export function convertToTimeZone(date, options) {
	const parsedDate = parse(date);
	const offset = getUTCOffset(options.timeZone) + parsedDate.getTimezoneOffset();

	return new Date(parsedDate.getTime() + offset * 60 * 1000);
}

/**
 * Returns the formatted date string in the given format, after converting it to the given time zone.
 * @param {Date|Number|String} date Date to format
 * @param {String} formatString Output format (see date-fns supported formats)
 * @param {Object} options
 * @param {String} options.timeZone Target timezone
 * @returns {String}
 *
 * @see https://github.com/prantlf/date-fns-timezone/blob/master/src/formatToTimeZone.js
 */
export function formatToTimeZone(date, formatString, options) {
	const dateConvertedToTimezone = convertToTimeZone(date, options);

	// Replace timezone token(s) in the string format with timezone values, since format() will use local timezone
	const dateFnsFormatWithTimeZoneValue = formatTimeZoneTokens(formatString, options.timeZone);

	return format(dateConvertedToTimezone, dateFnsFormatWithTimeZoneValue);
}


/**
 * Convert a date in local TZ to UTC
 */
export function convertToUTC(date) {
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
