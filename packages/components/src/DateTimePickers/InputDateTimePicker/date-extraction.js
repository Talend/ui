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
 * Build the date format with time.
 * @param dateFormat {string}
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
 * @param time {{hours: string, minutes: string}}
 * @returns {Date}
 */
function dateAndTimeToDateTime(date, time) {
	if (date === undefined || time === undefined) {
		return INTERNAL_INVALID_DATE;
	}

	try {
		const { hours, minutes, seconds = '00' } = time;
		const timeInSeconds = timeToSeconds(hours, minutes, seconds);
		return setSeconds(date, timeInSeconds);
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
 * Extract parts (date, time, date/time, string conversion) from a Date
 * @param datetime {Date}
 * @param options {Object}
 * @returns
 *  {{date: Date, time: { hours: string, minutes: string }, datetime: Date, textInput: string}}
 */
function extractDateTimeParts(datetime, options) {
	const isDateTimeValid = isDateValid(datetime);
	let time = initTime(options);

	if (datetime !== undefined && isDateTimeValid) {
		const date = startOfDay(datetime);

		if (options.useTime) {
			const hours = getHours(datetime);
			const minutes = getMinutes(datetime);
			const seconds = getSeconds(datetime);

			time = {
				hours: pad(hours, 2),
				minutes: pad(minutes, 2),
				seconds: pad(seconds, 2),
			};
		}

		return {
			date,
			time,
			datetime: startOfSecond(datetime),
			textInput: dateTimeToStr(date, time, options),
		};
	}

	return {
		date: undefined,
		time,
		datetime,
		textInput: '',
	};
}

export {
	splitDateAndTimePartsRegex,
	checkSupportedDateFormat,
	checkTime,
	dateAndTimeToDateTime,
	dateTimeToStr,
	extractDateTimeParts,
	getFullDateFormat,
	initTime,
	isDateValid,
	strToDate,
	strToTime,
	getDateRegexp,
};
