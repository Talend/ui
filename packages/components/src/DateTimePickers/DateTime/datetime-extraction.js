import format from 'date-fns/format';
import setSeconds from 'date-fns/set_seconds';
import getErrorMessage from '../shared/error-messages';
import { checkTime, pad, timeToStr, strToTime } from '../Time/time-extraction';

const splitDateAndTimePartsRegex = new RegExp(/^\s*(.*)\s+((.*):(.*)(:.*)?)\s*$/);

const INTERNAL_INVALID_DATE = new Date('INTERNAL_INVALID_DATE');

export function DateTimePickerException(code, message) {
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
 * Set the time to the provided date
 * @param date {Date} Date in current TZ
 * @param time {{hours: string, minutes: string, seconds: string}} Time in current TZ
 * @param useUTC {boolean} Indicates that we ask for a date in UTC TZ
 * @returns {Date}
 */
function dateAndTimeToDateTime(date, time, { useUTC, useSeconds }) {
	if (date === undefined || time === undefined) {
		return INTERNAL_INVALID_DATE;
	}

	try {
		if (typeof time === 'string') {
			// eslint-disable-next-line no-param-reassign
			time = strToTime(time, useSeconds);
		}
		const { hours, minutes, seconds } = time;
		const timeInSeconds = timeToSeconds(hours, minutes, seconds);
		const localTimezoneDate = setSeconds(date, timeInSeconds);
		return useUTC ? convertToUTC(localTimezoneDate) : localTimezoneDate;
	} catch (e) {
		return INTERNAL_INVALID_DATE;
	}
}

function dateAndTimeToStr(date = '', time = '', options) {
	const dateStr = date instanceof Date ? format(date, options.dateFormat) : date;
	const timeStr = typeof time === 'string' ? time : timeToStr(time);

	return `${dateStr} ${timeStr}`.trim();
}

/**
 * Extract parts (date, time, date/time, textInput) from a Date
 * @param datetime {Date}
 * @param options {Object}
 * @returns
 *	{{
 *		date: Date,
 *		time: { hours: string, minutes: string, seconds: string },
 * 	}}
 */
function extractPartsFromDateTime(datetime, options) {
	if (isNaN(datetime.getTime())) {
		return {
			date: undefined,
			time: undefined,
			datetime: undefined,
		};
	}
	return {
		date: extractDateOnly(datetime, options),
		time: extractTimeOnly(datetime, options),
		datetime,
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
			date: '',
			time: '',
			errors: [],
			errorMessage: null,
		};
	}

	let date;
	let time;
	let errors = [];

	try {
		const splitMatches = textInput.match(splitDateAndTimePartsRegex) || [];
		if (!splitMatches.length) {
			throw new DateTimePickerException('DATETIME_INVALID_FORMAT', 'DATETIME_INVALID_FORMAT');
		} else {
			date = splitMatches[1];
			time = splitMatches[2];
		}
	} catch (error) {
		errors = [error];
	}

	return {
		date,
		time,
		datetime: dateAndTimeToDateTime(date, time, options),
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
		errors: [],
	};
}

function updateDatetimeOnDateChange(payload, time, options) {
	let datetime;
	const { errors = [], date, textInput: dateTextInput } = payload;
	const nextErrors = errors;
	if (errors.length > 0) {
		datetime = INTERNAL_INVALID_DATE;
	} else if (date === undefined || date === null || date === '') {
		datetime = INTERNAL_INVALID_DATE;
		nextErrors.push(new DateTimePickerException('INVALID_DATE_EMPTY', 'INVALID_DATE_EMPTY'));
	} else if (time === undefined || time === null || time === '') {
		datetime = INTERNAL_INVALID_DATE;
		nextErrors.push(new DateTimePickerException('INVALID_TIME_EMPTY', 'INVALID_TIME_EMPTY'));
	} else {
		datetime = dateAndTimeToDateTime(date, time, options);
	}

	return {
		date: date || dateTextInput,
		datetime,
		textInput: dateAndTimeToStr(date || dateTextInput, time, options),
		errors,
		errorMessage: nextErrors[0] ? nextErrors[0].message : null,
	};
}

function updateDatetimeOnTimeChange(payload, date, options) {
	let datetime;
	const { errors = [], time, textInput: timeTextInput } = payload;
	const nextErrors = errors;
	if (errors.length > 0) {
		datetime = INTERNAL_INVALID_DATE;
	} else if (date === undefined || date === null || date === '') {
		datetime = INTERNAL_INVALID_DATE;
		nextErrors.push(new DateTimePickerException('INVALID_DATE_EMPTY', 'INVALID_DATE_EMPTY'));
	} else if (time === undefined || time === null || time === '') {
		datetime = INTERNAL_INVALID_DATE;
		nextErrors.push(new DateTimePickerException('INVALID_TIME_EMPTY', 'INVALID_TIME_EMPTY'));
	} else {
		datetime = dateAndTimeToDateTime(date, time, options);
	}

	return {
		time: time || timeTextInput,
		datetime,
		textInput: dateAndTimeToStr(date, time || timeTextInput, options),
		errors,
		errorMessage: errors[0] ? errors[0].message : null,
	};
}

export {
	extractParts,
	extractPartsFromDateTime,
	extractPartsFromTextInput,
	updateDatetimeOnDateChange,
	updateDatetimeOnTimeChange,
};
