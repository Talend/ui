import getDate from 'date-fns/get_date';
import startOfDay from 'date-fns/start_of_day';
import setSeconds from 'date-fns/set_seconds';
import getMinutes from 'date-fns/get_minutes';
import getSeconds from 'date-fns/get_seconds';
import lastDayOfMonth from 'date-fns/last_day_of_month';
import setDate from 'date-fns/set_date';
import format from 'date-fns/format';
import startOfSecond from 'date-fns/start_of_second';
import getHours from 'date-fns/get_hours';

const splitDateAndTimePartsRegex = new RegExp(/^\s*(.*)\s+((.*):(.*)(:.*)?)\s*$/);
const timePartRegex = new RegExp(/^(.*):(.*)$/);
const timeWithSecondsPartRegex = new RegExp(/^(.*):(.*):(.*)$/);

const INTERNAL_INVALID_DATE = new Date('INTERNAL_INVALID_DATE');

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
 * @param useTime {boolean}
 * @param useSeconds {boolean}
 */
function getFullDateFormat({ dateFormat, useTime, useSeconds }) {
	if (!useTime) {
		return dateFormat;
	}
	const timeFormat = useSeconds ? 'HH:mm:ss' : 'HH:mm';
	return `${dateFormat} ${timeFormat}`;
}

/**
 * Check if a date is a valid date.
 */
function isDateValid(date) {
	if (date === undefined) {
		return true;
	}

	return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Convert a date in local timezone to UTC
 * @param date {Object} a valid Date object
 */
export function convertToUTC(date, dateIsUtc = false) {
	// the date is already in UTC
	// converting the date to get UTC values
	if (dateIsUtc) {
		return new Date(
			date.getUTCFullYear(),
			date.getUTCMonth(),
			date.getUTCDate(),
			date.getUTCHours(),
			date.getUTCMinutes(),
			date.getUTCSeconds(),
		);
	}
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
 * Check if time is correct
 */
function checkTime({ hours, minutes, seconds }) {
	const hoursNum = Number(hours);
	if (hours.length !== 2 || isNaN(hoursNum) || hoursNum < 0 || hoursNum > 23) {
		throw new Error('TIME - INCORRECT HOUR NUMBER');
	}

	const minsNum = Number(minutes);
	if (minutes.length !== 2 || isNaN(minsNum) || minsNum < 0 || minsNum > 59) {
		throw new Error('TIME - INCORRECT MINUTES NUMBER');
	}
	const secondsNum = Number(seconds);
	if (seconds.length !== 2 || isNaN(secondsNum) || secondsNum < 0 || secondsNum > 59) {
		throw new Error('TIME - INCORRECT SECONDS NUMBER');
	}
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

	const { dateFormat, useTime } = options;
	if (time === undefined || useTime === false) {
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
 * @param date {Date}
 * @param time {{hours: string, minutes: string, seconds: string}}
 * @returns {Date}
 */
function dateAndTimeToDateTime(date, time, options) {
	if (date === undefined || time === undefined) {
		return INTERNAL_INVALID_DATE;
	}

	try {
		const { hours, minutes, seconds } = time;
		const timeInSeconds = timeToSeconds(hours, minutes, seconds);
		const localTimezoneDate = setSeconds(date, timeInSeconds);
		return options.useUTC ? convertToUTC(localTimezoneDate) : localTimezoneDate;
	} catch (e) {
		return INTERNAL_INVALID_DATE;
	}
}

/**
 * Convert string in dateFormat to date
 */
function strToDate(strToParse, dateFormat) {
	const { partsOrder, regexp } = getDateRegexp(dateFormat);
	const dateMatches = strToParse.match(regexp);
	if (!dateMatches) {
		throw new Error('DATE - INCORRECT FORMAT');
	}

	const yearIndex = partsOrder.indexOf('YYYY');
	const monthIndex = partsOrder.indexOf('MM');
	const dayIndex = partsOrder.indexOf('DD');

	const monthString = dateMatches[monthIndex + 1];
	const month = parseInt(monthString, 10);
	if (month === 0 || month > 12) {
		throw new Error('DATE - INCORRECT MONTH NUMBER');
	}

	const dayString = dateMatches[dayIndex + 1];
	const day = parseInt(dayString, 10);
	if (day === 0) {
		throw new Error('DATE - INCORRECT DAY NUMBER');
	}

	const yearString = dateMatches[yearIndex + 1];
	const year = parseInt(yearString, 10);
	const monthDate = new Date(year, month - 1);
	const lastDateOfMonth = lastDayOfMonth(monthDate);
	if (day > getDate(lastDateOfMonth)) {
		throw new Error('DATE - INCORRECT DAY NUMBER RELATIVE TO MONTH');
	}

	return setDate(monthDate, day);
}

/**
 * Convert string in 'HH:mm' format into the corresponding number of minutes
 * @param strToParse {string}
 * @param useSeconds {boolean}
 * @returns {{ hours: string, minutes: string }}
 */
function strToTime(strToParse, useSeconds) {
	const timeRegex = useSeconds ? timeWithSecondsPartRegex : timePartRegex;
	const timeMatches = strToParse.match(timeRegex);
	if (!timeMatches) {
		throw new Error('TIME - INCORRECT FORMAT');
	}

	const hours = timeMatches[1];
	const minutes = timeMatches[2];
	const seconds = useSeconds ? timeMatches[3] : '00';

	return { hours, minutes, seconds };
}

function pad(num, size) {
	let s = String(num);
	while (s.length < (size || 2)) {
		s = `0${s}`;
	}
	return s;
}

/**
 * Init time (hours, minutes, seconds), depending on the options.
 * If a part is not used, it is init to 00, otherwise it's empty, so user have to enter it.
 */
function initTime({ useTime, useSeconds }) {
	if (!useTime) {
		return { hours: '00', minutes: '00', seconds: '00' };
	} else if (!useSeconds) {
		return { hours: '', minutes: '', seconds: '00' };
	}
	return { hours: '', minutes: '', seconds: '' };
}

/**
 * Check that the date format is a composition of YYYY, MM, DD.
 * If not, it throws an error.
 * @param dateFormat {string}
 */
function checkSupportedDateFormat(dateFormat) {
	const partsOrder = dateFormat.split(/[^A-Za-z]/);
	if (
		partsOrder.indexOf('YYYY') === -1 ||
		partsOrder.indexOf('MM') === -1 ||
		partsOrder.indexOf('DD') === -1
	) {
		throw new Error(
			`DATE FORMAT ${dateFormat} - NOT SUPPORTED. Please provide a composition of YYYY, MM, DD`,
		);
	}
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
	let time = initTime(options);
	if (!isDateValid(datetime)) {
		return {
			date: undefined,
			time,
			datetime,
			textInput: '',
		};
	}

	const date = options.useUTC ? convertToUTC(datetime, true) : datetime;
	if (options.useTime) {
		const hours = getHours(date);
		const minutes = getMinutes(date);
		const seconds = getSeconds(date);

		time = {
			hours: pad(hours, 2),
			minutes: pad(minutes, 2),
			seconds: options.useSeconds ? pad(seconds, 2) : '00',
		};
	}

	return {
		date: startOfDay(date),
		time,
		datetime: startOfSecond(datetime),
		textInput: dateTimeToStr(startOfDay(date), time, options),
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
	let errorMessage;
	let timeToUse = time;

	if (options.useTime) {
		try {
			checkTime(time);
		} catch (error) {
			errorMessage = error.message;
		}
	} else {
		timeToUse = initTime(options);
	}

	return {
		date,
		time: timeToUse,
		textInput: dateTimeToStr(date, timeToUse, options),
		datetime: dateAndTimeToDateTime(date, timeToUse, options),
		errorMessage,
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
	let time = initTime(options);
	if (textInput === '') {
		return {
			date: undefined,
			time,
			datetime: undefined,
			textInput,
		};
	}

	let date;
	let errorMessage;
	let dateTextToParse = textInput;

	if (options.useTime) {
		const splitMatches = textInput.match(splitDateAndTimePartsRegex) || [];
		if (!splitMatches.length) {
			errorMessage = 'DATETIME - INCORRECT FORMAT';
		}

		// extract date part from datetime
		dateTextToParse = splitMatches[1] || textInput;

		// extract time part and parse it
		try {
			const timeTextToParse = splitMatches[2] || textInput;
			time = strToTime(timeTextToParse, options.useSeconds);
			checkTime(time);
		} catch (error) {
			errorMessage = errorMessage || error.message;
		}
	}

	// parse date
	try {
		date = strToDate(dateTextToParse, options.dateFormat);
	} catch (error) {
		errorMessage = errorMessage || error.message;
	}

	return {
		date,
		time,
		datetime: dateAndTimeToDateTime(date, time, options),
		textInput,
		errorMessage,
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
		time: initTime(options),
		datetime: undefined,
		textInput: '',
	};
}

export {
	checkSupportedDateFormat,
	extractParts,
	extractPartsFromDateTime,
	extractPartsFromDateAndTime,
	extractPartsFromTextInput,
	getFullDateFormat,
};
