import format from 'date-fns/format';
import getDate from 'date-fns/get_date';
import lastDayOfMonth from 'date-fns/last_day_of_month';
import setSeconds from 'date-fns/set_seconds';
import setDate from 'date-fns/set_date';
import startOfSecond from 'date-fns/start_of_second';
import getErrorMessage from './error-messages';
import { checkTime, pad, strToTime, timeToStr } from '../Time/time-extraction';

const splitDateAndTimePartsRegex = new RegExp(/^\s*(.*)\s+((.*):(.*)(:.*)?)\s*$/);

const INTERNAL_INVALID_DATE = new Date('INTERNAL_INVALID_DATE');

export function DatePickerException(code, message) {
	this.message = getErrorMessage(message);
	this.code = code;
}

/**
 * Extract date and apply the current timezone, from datetime
 * Ex :
 * 2014-03-25 23:00:00 (UTC) 		--> 2014-03-25 OO:OO:OO (current TZ)
 * 2014-03-25 23:00:00 (current TZ) --> 2014-03-25 OO:OO:OO (current TZ)
 * @param date {Date} The date to extract
 * @param useUTC {boolean} Indicates if date is in UTC
 */
function extractDateOnly(date, { useUTC }) {
	if (useUTC) {
		return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
	}
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Extract time
 * @param date {Date} The date to extract
 * @param useSeconds {boolean} Indicates if we should extract seconds
 * @param useUTC {boolean} Indicates if date is in UTC
 * @returns {*}
 */
function extractTimeOnly(date, { useSeconds, useUTC }) {
	let hours;
	let minutes;
	let seconds;
	if (useUTC) {
		hours = date.getUTCHours();
		minutes = date.getUTCMinutes();
		seconds = date.getUTCSeconds();
	} else {
		hours = date.getHours();
		minutes = date.getMinutes();
		seconds = date.getSeconds();
	}

	return {
		hours: pad(hours, 2),
		minutes: pad(minutes, 2),
		seconds: useSeconds ? pad(seconds, 2) : '00',
	};
}

/**
 * Build date regexep from date format.
 * It returns the YYYY, MM, DD parts order too.
 * @param dateFormat {string}
 * @returns {{partsOrder: array, regexp: RegExp}}
 */
function getDateRegexp(dateFormat) {
	const partsOrder = dateFormat.split(/[^A-Za-z]/);
	const dateFormatAsRegexp = dateFormat
		.replace(/[A-Za-z]{4}/g, '([0-9]{4})')
		.replace(/[A-Za-z]{2}/g, '([0-9]{2})');
	return {
		partsOrder,
		regexp: new RegExp(`^\\s*${dateFormatAsRegexp}\\s*$`),
	};
}

/**
 * Build the date format with time.
 * @param dateFormat {string}
 * @param useSeconds {boolean}
 */
function getFullDateFormat({ dateFormat, useSeconds }) {
	const timeFormat = useSeconds ? 'HH:mm:ss' : 'HH:mm';
	return `${dateFormat} ${timeFormat}`;
}

/**
 * Check if a date is a valid date.
 */
function isDateValid(date, options) {
	if (!options.required && date === undefined) {
		return true;
	}

	return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Convert a date in local TZ to UTC
 * Ex: 2015-05-23 23:58:46 (current TZ) --> 2015-05-23 23:58:46 (UTC)
 */
function convertToUTC(date) {
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
 * Convert hour minutes and seconds into seconds
 * @param hours {string}
 * @param minutes {string}
 * @param seconds {string}
 * @returns {number}
 */
function timeToSeconds(hours, minutes, seconds) {
	checkTime({ hours, minutes, seconds });
	return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
}

/**
 * Convert date and time to string with 'YYYY-MM-DD HH:mm' format
 * @param date {Date}
 * @param time {{hours: string, minutes: string, seconds: string}}
 * @param options {Object}
 * @returns {string}
 */
function dateTimeToStr(date, time, options) {
	if (date === undefined) {
		return '';
	}

	const { dateFormat } = options;
	if (time === undefined) {
		return format(date, dateFormat);
	}

	const { hours, minutes, seconds } = time;
	try {
		const timeInSeconds = timeToSeconds(hours, minutes, seconds);
		const fullDate = setSeconds(date, timeInSeconds);
		return format(fullDate, getFullDateFormat(options));
	} catch (e) {
		const dateStr = format(date, dateFormat);
		if (hours !== '' && minutes !== '') {
			if (options.useSeconds && seconds !== '') {
				return `${dateStr} ${hours}:${minutes}:${seconds}`;
			}
			return `${dateStr} ${hours}:${minutes}`;
		}
		return dateStr;
	}
}

/**
 * Set the time to the provided date
 * @param date {Date} Date in current TZ
 * @param time {{hours: string, minutes: string, seconds: string}} Time in current TZ
 * @param useUTC {boolean} Indicates that we ask for a date in UTC TZ
 * @returns {Date}
 */
function dateAndTimeToDateTime(date, time, { useUTC }) {
	if (date === undefined || time === undefined) {
		return INTERNAL_INVALID_DATE;
	}

	try {
		const { hours, minutes, seconds } = time;
		const timeInSeconds = timeToSeconds(hours, minutes, seconds);
		const localTimezoneDate = setSeconds(date, timeInSeconds);
		return useUTC ? convertToUTC(localTimezoneDate) : localTimezoneDate;
	} catch (e) {
		return INTERNAL_INVALID_DATE;
	}
}

/**
 * Convert string in dateFormat to date
 */
function strToDate(strToParse, dateFormat) {
	const dateErrors = [];
	const { partsOrder, regexp } = getDateRegexp(dateFormat);
	const dateMatches = strToParse.match(regexp);
	if (!dateMatches) {
		dateErrors.push(new DatePickerException('INVALID_DATE_FORMAT', 'INVALID_DATE_FORMAT'));
		throw dateErrors;
	}

	const yearIndex = partsOrder.indexOf('YYYY');
	const monthIndex = partsOrder.indexOf('MM');
	const dayIndex = partsOrder.indexOf('DD');

	const monthString = dateMatches[monthIndex + 1];
	const month = parseInt(monthString, 10);
	if (month === 0 || month > 12) {
		dateErrors.push(new DatePickerException('INVALID_MONTH', 'INVALID_MONTH_NUMBER'));
	}

	const dayString = dateMatches[dayIndex + 1];
	const day = parseInt(dayString, 10);
	if (day === 0) {
		dateErrors.push(new DatePickerException('INVALID_DAY_NUMBER', 'INVALID_DAY_NUMBER'));
	}

	const yearString = dateMatches[yearIndex + 1];
	const year = parseInt(yearString, 10);
	const monthDate = new Date(year, month - 1);
	const lastDateOfMonth = lastDayOfMonth(monthDate);
	if (day > getDate(lastDateOfMonth)) {
		dateErrors.push(new DatePickerException('INVALID_DAY_OF_MONTH', 'INVALID_DAY_OF_MONTH'));
	}
	if (dateErrors.length > 0) {
		throw dateErrors;
	}
	return setDate(monthDate, day);
}

/**
 * Extract parts (date, time, date/time, textInput) from a Date
 * @param datetime {Date}
 * @param options {Object}
 * @returns
 *	{{
 *		date: Date,
 *		time: { hours: string, minutes: string, seconds: string },
 *		datetime: Date,
 *		textInput: string
 * 	}}
 */
function extractPartsFromDateTime(datetime, options) {
	if (!isDateValid(datetime, options)) {
		return {
			date: undefined,
			time: undefined,
			datetime,
			textInput: '',
			dateTextInput: '',
			timeTextInput: '',
			errors: [],
		};
	}

	const date = extractDateOnly(datetime, options);
	const time = extractTimeOnly(datetime, options);

	return {
		date,
		time,
		dateTextInput: dateTimeToStr(date, undefined, options),
		timeTextInput: timeToStr(time, options.useSeconds),
		datetime: startOfSecond(datetime),
		textInput: dateTimeToStr(date, time, options),
		errors: [],
	};
}

/**
 * Extract parts (date, time, date/time, textInput) from a Date and time definition
 * @param date {Date}
 * @param time {Object}
 * @param options {Object}
 * @returns
 *	{{
 *		date: Date,
 *		time: { hours: string, minutes: string, seconds: string },
 *		datetime: Date,
 *		textInput: string
 * 	}}
 */
function extractPartsFromDateAndTime(date, time, options) {
	try {
		checkTime(time);
	} catch (errors) {
		return {
			date,
			time,
			textInput: dateTimeToStr(date, time, options),
			datetime: null,
			errors,
			errorMessage: errors[0] ? errors[0].message : null,
		};
	}
	return {
		date,
		time,
		textInput: dateTimeToStr(date, time, options),
		datetime: dateAndTimeToDateTime(date, time, options),
		errors: [],
		errorMessage: null,
	};
}

/**
 * Extract parts (date, time, date/time, textInput) from a string
 * @param textInput {string}
 * @param options {Object}
 * @returns
 *	{{
 *		date: Date,
 *		time: { hours: string, minutes: string, seconds: string },
 *		datetime: Date,
 *		textInput: string
 * 	}}
 */
function extractPartsFromTextInput(textInput, options) {
	if (textInput === '') {
		return {
			date: undefined,
			time: undefined,
			datetime: undefined,
			textInput,
			errors: [],
		};
	}

	let date;
	let time;
	let errors = [];
	let dateTextToParse = textInput;

	try {
		const splitMatches = textInput.match(splitDateAndTimePartsRegex) || [];
		if (!splitMatches.length) {
			throw new DatePickerException('DATETIME_INVALID_FORMAT', 'DATETIME_INVALID_FORMAT');
		} else {
			// extract date part from datetime
			dateTextToParse = splitMatches[1];

			// extract time part and parse it
			try {
				const timeTextToParse = splitMatches[2];
				time = strToTime(timeTextToParse, options.useSeconds);
				checkTime(time);
			} catch (error) {
				errors = errors.concat(error);
			}
		}

		// parse date
		try {
			date = strToDate(dateTextToParse, options.dateFormat);
		} catch (error) {
			errors = errors.concat(error);
		}
	} catch (error) {
		errors = [error];
	}

	return {
		date,
		time,
		datetime: dateAndTimeToDateTime(date, time, options),
		textInput,
		errors,
		errorMessage: errors[0] ? errors[0].message : null,
	};
}

/**
 * Extract parts (date, time, date/time, textInput) from a value with
 * different possible types
 * @param value {string | Date | number}
 * @param options {Object}
 * @returns
 *	{{
 *		date: Date,
 *		time: { hours: string, minutes: string, seconds: string },
 *		datetime: Date,
 *		textInput: string
 * 	}}
 */
function extractParts(value, options) {
	const typeOfValue = typeof value;
	if (typeOfValue === 'number') {
		return extractPartsFromDateTime(new Date(value), options);
	} else if (typeOfValue === 'string') {
		return extractPartsFromTextInput(value, options);
	} else if (value instanceof Date) {
		return extractPartsFromDateTime(value, options);
	}

	return {
		date: undefined,
		time: undefined,
		datetime: undefined,
		textInput: '',
		dateTextInput: '',
		timeTextInput: '',
		errors: [],
	};
}

export {
	extractParts,
	extractPartsFromDateTime,
	extractPartsFromDateAndTime,
	extractPartsFromTextInput,
};
