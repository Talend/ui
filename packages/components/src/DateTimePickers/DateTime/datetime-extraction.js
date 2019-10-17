import format from 'date-fns/format';
import setSeconds from 'date-fns/set_seconds';
import { convertToTimeZone } from 'date-fns-timezone';

import getErrorMessage from '../shared/error-messages';
import { convertDateToTimezone, extractDateOnly } from '../Date/date-extraction';
import { checkTime, pad, timeToStr, strToTime } from '../Time/time-extraction';

const splitDateAndTimePartsRegex = new RegExp(/^\s*(.*)\s+((.*):(.*)(:.*)?)\s*$/);

const INTERNAL_INVALID_DATE = new Date('INTERNAL_INVALID_DATE');

export function DateTimePickerException(code, message) {
	this.message = getErrorMessage(message);
	this.code = code;
}

function isEmpty(value) {
	return value === undefined || value === null || value === '';
}

/**
 * Convert a date in local TZ to UTC
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
 * @throws DateTimePickerException
 */
function dateAndTimeToDateTime(date, time, options) {
	if (isEmpty(date)) {
		throw new DateTimePickerException('INVALID_DATE_EMPTY', 'INVALID_DATE_EMPTY');
	}
	if (isEmpty(time)) {
		throw new DateTimePickerException('INVALID_TIME_EMPTY', 'INVALID_TIME_EMPTY');
	}
	let timeObject = time;
	if (typeof time === 'string') {
		timeObject = strToTime(time, options.useSeconds);
	}
	const { hours, minutes, seconds } = timeObject;
	const timeInSeconds = timeToSeconds(hours, minutes, seconds);
	const localTimezoneDate = setSeconds(date, timeInSeconds);
	return convertDateToTimezone(localTimezoneDate, options);
}

function dateAndTimeToStr(date = '', time = '', options) {
	const dateStr = date instanceof Date ? format(date, options.dateFormat) : date;
	const timeStr = typeof time === 'string' ? time : timeToStr(time, options.useSeconds);

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
	let datetime;
	let errors = [];

	try {
		const splitMatches = textInput.match(splitDateAndTimePartsRegex) || [];
		if (!splitMatches.length) {
			throw new DateTimePickerException('DATETIME_INVALID_FORMAT', 'DATETIME_INVALID_FORMAT');
		} else {
			date = splitMatches[1];
			time = splitMatches[2];
			datetime = dateAndTimeToDateTime(date, time, options);
		}
	} catch (error) {
		errors = [error];
	}

	return {
		date,
		time,
		datetime,
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
/**
 * re-compute state (date/datetime/textInput) on date change.
 * @param datePickerPayload {Object} payload passed by date picker
 * @param time {string | {hours: string, minutes: string, seconds: string}}
 * 	time stored in DateTimeManager state
 * @param options {Object}
 */
function updatePartsOnDateChange(datePickerPayload, time, options) {
	const { errors = [], date, textInput: dateTextInput } = datePickerPayload;
	let datetime;
	const nextErrors = errors;
	if (errors.length > 0) {
		datetime = INTERNAL_INVALID_DATE;
	} else {
		try {
			datetime = dateAndTimeToDateTime(date, time, options);
		} catch (error) {
			datetime = INTERNAL_INVALID_DATE;
			nextErrors.push(error);
		}
	}

	return {
		date: date || dateTextInput,
		datetime,
		textInput: dateAndTimeToStr(date || dateTextInput, time, options),
		errors,
		errorMessage: nextErrors[0] ? nextErrors[0].message : null,
	};
}

/**
 * re-compute state (time/datetime/textInput) on time change.
 * @param timePickerPayload {Object} payload passed by time picker
 * @param date {Date|string|number} date stored in DateTimeManager state
 * @param options {Object}
 */
function updatePartsOnTimeChange(timePickerPayload, date, options) {
	const { errors = [], time, textInput: timeTextInput } = timePickerPayload;
	let datetime;
	const nextErrors = errors;
	if (errors.length > 0) {
		datetime = INTERNAL_INVALID_DATE;
	} else {
		try {
			datetime = dateAndTimeToDateTime(date, time, options);
		} catch (error) {
			datetime = INTERNAL_INVALID_DATE;
			nextErrors.push(error);
		}
	}

	return {
		time: time || timeTextInput,
		datetime,
		textInput: dateAndTimeToStr(date, time || timeTextInput, options),
		errors,
		errorMessage: nextErrors[0] ? nextErrors[0].message : null,
	};
}

export {
	convertToUTC,
	extractParts,
	extractPartsFromDateTime,
	extractPartsFromTextInput,
	updatePartsOnDateChange,
	updatePartsOnTimeChange,
};
