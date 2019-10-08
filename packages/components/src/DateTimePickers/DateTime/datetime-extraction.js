import format from 'date-fns/format';
import addSeconds from 'date-fns/add_seconds';
import { convertToTimeZone } from 'date-fns-timezone';

import getErrorMessage from '../shared/error-messages';
import { extractDateOnly } from '../Date/date-extraction';
import { checkTime, pad, timeToStr, strToTime } from '../Time/time-extraction';

const splitDateAndTimePartsRegex = new RegExp(/^\s*(.*)\s+((.*):(.*)(:.*)?)\s*$/);

const INTERNAL_INVALID_DATE = new Date('INTERNAL_INVALID_DATE');

export function DatePickerException(code, message) {
	this.message = getErrorMessage(message);
	this.code = code;
}

/**
 * Extract time
 * @param date {Date} The date to extract
 * @param useSeconds {boolean} Indicates if we should extract seconds
 * @param useUTC {boolean} Indicates if date is in UTC
 * @param timezone {string} Indicates if use specific timezone
 * @returns {*}
 */
function extractTimeOnly(date, { useSeconds, useUTC, timezone }) {
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	if (useUTC) {
		hours = date.getUTCHours();
		minutes = date.getUTCMinutes();
		seconds = date.getUTCSeconds();
	} else if (timezone) {
		const converted = convertToTimeZone(date, { timeZone: timezone });
		hours = converted.getHours();
		minutes = converted.getMinutes();
		seconds = converted.getSeconds();
	}

	return {
		hours: pad(hours, 2),
		minutes: pad(minutes, 2),
		seconds: useSeconds ? pad(seconds, 2) : '00',
	};
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
 * @returns {Date}
 */
function dateAndTimeToDateTime(date, time) {
	if (date === undefined || time === undefined) {
		return INTERNAL_INVALID_DATE;
	}

	try {
		if (typeof time === 'string') {
			// eslint-disable-next-line no-param-reassign
			time = strToTime(time);
		}
		const { hours, minutes, seconds } = time;
		const timeInSeconds = timeToSeconds(hours, minutes, seconds);
		return addSeconds(date, timeInSeconds);
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
		};
	}
	return {
		date: extractDateOnly(datetime, options),
		time: extractTimeOnly(datetime, options),
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
function extractPartsFromTextInput(textInput) {
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
			throw new DatePickerException('DATETIME_INVALID_FORMAT', 'DATETIME_INVALID_FORMAT');
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

export {
	dateAndTimeToDateTime,
	dateAndTimeToStr,
	extractParts,
	extractPartsFromDateTime,
	extractPartsFromTextInput,
};
