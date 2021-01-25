import format from 'date-fns/format';
import getDate from 'date-fns/get_date';
import lastDayOfMonth from 'date-fns/last_day_of_month';
import setSeconds from 'date-fns/set_seconds';
import setDate from 'date-fns/set_date';
import startOfSecond from 'date-fns/start_of_second';
import getErrorMessage from './error-messages';

const splitDateAndTimePartsRegex = new RegExp(/^\s*(.*)\s+((.*):(.*)(:.*)?)\s*$/);
const timePartRegex = new RegExp(/^(.*):(.*)$/);
const timeWithSecondsPartRegex = new RegExp(/^(.*):(.*):(.*)$/);

const INTERNAL_INVALID_DATE = new Date('INTERNAL_INVALID_DATE');

export function DatePickerException(code, message) {
	this.message = getErrorMessage(message);
	this.code = code;
}

function pad(num, size) {
	let s = String(num);
	while (s.length < (size || 2)) {
		s = `0${s}`;
	}
	return s;
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
 * Check if hours are correct
 */
function checkHours(hours) {
	const hoursNum = Number(hours);
	if (hours === '') {
		return new DatePickerException('INVALID_HOUR', 'INVALID_HOUR_EMPTY');
	} else if (hours.length !== 2 || isNaN(hoursNum) || hoursNum < 0 || hoursNum > 23) {
		return new DatePickerException('INVALID_HOUR', 'INVALID_HOUR_NUMBER');
	}
	return null;
}

/**
 * Check if checkMinutes are correct
 */
function checkMinutes(minutes) {
	const minsNum = Number(minutes);
	if (minutes === '') {
		return new DatePickerException('INVALID_MINUTES', 'INVALID_MINUTES_EMPTY');
	} else if (minutes.length !== 2 || isNaN(minsNum) || minsNum < 0 || minsNum > 59) {
		return new DatePickerException('INVALID_MINUTES', 'INVALID_MINUTES_NUMBER');
	}
	return null;
}

/**
 * Check if seconds are correct.
 * This function throws the errors
 */
function checkSeconds(seconds) {
	const secondsNum = Number(seconds);
	if (seconds === '') {
		return new DatePickerException('INVALID_SECONDS', 'INVALID_SECONDS_EMPTY');
	} else if (seconds.length !== 2 || isNaN(secondsNum) || secondsNum < 0 || secondsNum > 59) {
		return new DatePickerException('INVALID_SECONDS', 'INVALID_SECONDS_NUMBER');
	}
	return null;
}

/**
 * Check if time is correct
 */
function checkTime({ hours, minutes, seconds }, hybridMode = false) {
	const timeErrors = [];

	if (!hours && !minutes && !seconds && hybridMode) {
		return;
	}

	const hoursError = checkHours(hours);
	if (hoursError) {
		timeErrors.push(hoursError);
	}

	const minutesError = checkMinutes(minutes);
	if (minutesError) {
		timeErrors.push(minutesError);
	}

	const secondsError = checkSeconds(seconds);
	if (secondsError) {
		timeErrors.push(secondsError);
	}

	if (timeErrors.length > 0) {
		throw timeErrors;
	}
}

/**
 * Check if the time is empty
 */
function isTimeEmpty(time) {
	if (time.hours || time.minutes || time.seconds) {
		return false;
	}
	return true;
}

/**
 * Check if the date and time are correct
 */
function check(date, time, options) {
	let errors = [];
	const isPickerEmpty = !date && isTimeEmpty(time);

	if (isPickerEmpty && !options.required) {
		return errors;
	}
	try {
		checkTime(time);
	} catch (timeErrors) {
		errors = errors.concat(timeErrors);
	}

	if (!isDateValid(date, options)) {
		errors.push(new DatePickerException('INVALID_DATE_FORMAT', 'INVALID_DATE_FORMAT'));
	}
	return errors;
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
		if (options.useTime) {
			const { hours, minutes, seconds } = time;
			return options.useSeconds ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`;
		}
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
 * @param date {Date} Date in current TZ
 * @param time {{hours: string, minutes: string, seconds: string}} Time in current TZ
 * @param useUTC {boolean} Indicates that we ask for a date in UTC TZ
 * @returns {Date}
 */
function dateAndTimeToDateTime(date, time, { useUTC, hybridMode }) {
	if (!hybridMode && (date === undefined || time === undefined)) {
		return INTERNAL_INVALID_DATE;
	}

	try {
		const { hours, minutes, seconds } = time;
		const timeInSeconds = timeToSeconds(hours, minutes, seconds);
		const localTimezoneDate = setSeconds(date, timeInSeconds);
		return useUTC ? convertToUTC(localTimezoneDate) : localTimezoneDate;
	} catch (e) {
		// if (hybridMode) {
		// 	return '';
		// }
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
 * Convert string in 'HH:mm' format into the corresponding number of minutes
 * @param strToParse {string}
 * @param useSeconds {boolean}
 * @returns {{ hours: string, minutes: string }}
 */
function strToTime(strToParse, useSeconds) {
	const timeRegex = useSeconds ? timeWithSecondsPartRegex : timePartRegex;
	const timeMatches = strToParse.match(timeRegex);
	if (!timeMatches) {
		throw new DatePickerException('TIME_FORMAT_INVALID', 'TIME_FORMAT_INVALID');
	}

	const hours = timeMatches[1];
	const minutes = timeMatches[2];
	const seconds = useSeconds ? timeMatches[3] : '00';

	return { hours, minutes, seconds };
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
	if (!isDateValid(datetime, options)) {
		return {
			date: undefined,
			time,
			datetime,
			textInput: '',
			errors: [],
		};
	}

	const date = extractDateOnly(datetime, options);
	if (options.useTime) {
		time = extractTimeOnly(datetime, options);
	}

	return {
		date,
		time,
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
	let errors = [];
	let timeToUse = time;

	if (options.useTime) {
		try {
			checkTime(time, options.hybridMode);
		} catch (error) {
			errors = errors.concat(error);
		}
	} else {
		timeToUse = initTime(options);
	}

	return {
		date,
		time: timeToUse,
		textInput: dateTimeToStr(date, timeToUse, options),
		datetime: dateAndTimeToDateTime(date, timeToUse, options),
		errorMessage: errors[0] ? errors[0].message : null,
		errors,
	};
}

function extractDateOrTimeHybridMode(textInput, options) {
	let date;
	let time;
	let errors = [];
	try {
		date = strToDate(textInput, options.dateFormat);
	} catch (dateError) {
		// if not a format valid date check for time
		if (dateError[0].code !== 'INVALID_DATE_FORMAT') {
			errors = errors.concat(dateError);
		} else {
			try {
				time = strToTime(textInput, options.useSeconds);
				checkTime(time);
			} catch (timError) {
				errors = errors.concat(timError);
			}
		}
	}
	return { date, time, errors };
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
			errors: [],
		};
	}

	let date;
	let errors = [];
	let dateTextToParse = textInput;

	try {
		if (options.useTime) {
			const splitMatches = textInput.match(splitDateAndTimePartsRegex) || [];
			if (!splitMatches.length) {
				if (!options.hybridMode) {
					throw new DatePickerException('DATETIME_INVALID_FORMAT', 'DATETIME_INVALID_FORMAT');
				}
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
		}

		if (options.hybridMode) {
			// parse date
			const hybridDateTime = extractDateOrTimeHybridMode(textInput, options);
			date = hybridDateTime.date;
			time = hybridDateTime.time;
			errors = errors.concat(hybridDateTime.errors);
		} else {
			// parse date
			try {
				date = strToDate(dateTextToParse, options.dateFormat);
			} catch (error) {
				errors = errors.concat(error);
			}
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
		time: initTime(options),
		datetime: undefined,
		textInput: '',
		errors: [],
	};
}

export {
	check,
	checkHours,
	checkMinutes,
	checkSeconds,
	checkSupportedDateFormat,
	extractParts,
	extractPartsFromDateTime,
	extractPartsFromDateAndTime,
	extractPartsFromTextInput,
	getFullDateFormat,
};
