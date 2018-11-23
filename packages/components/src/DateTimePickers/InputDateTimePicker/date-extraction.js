import getDate from 'date-fns/get_date';
import startOfDay from 'date-fns/start_of_day';
import setMinutes from 'date-fns/set_minutes';
import getMinutes from 'date-fns/get_minutes';
import lastDayOfMonth from 'date-fns/last_day_of_month';
import setDate from 'date-fns/set_date';
import format from 'date-fns/format';
import startOfMinute from 'date-fns/start_of_minute';
import getHours from 'date-fns/get_hours';

const splitDateAndTimePartsRegex = new RegExp(/^\s*(.*)\s+((.*):(.*))\s*$/);
const timePartRegex = new RegExp(/^(.*):(.*)$/);

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
 */
function getFullDateFormat(dateFormat) {
	const timeFormat = 'HH:mm';
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
function checkTime({ hours, minutes }) {
	const hoursNum = Number(hours);
	if (hours.length !== 2 || isNaN(hoursNum) || hoursNum < 0 || hoursNum > 23) {
		throw new Error('TIME - INCORRECT HOUR NUMBER');
	}

	const minsNum = Number(minutes);
	if (minutes.length !== 2 || isNaN(minsNum) || minsNum < 0 || minsNum > 59) {
		throw new Error('TIME - INCORRECT MINUTES NUMBER');
	}
}

/**
 * Convert hour and minutes into minutes
 * @param hours {string}
 * @param minutes {string}
 * @returns {number}
 */
function hoursAndMinutesToTime(hours, minutes) {
	checkTime({ hours, minutes });
	return Number(hours) * 60 + Number(minutes);
}

/**
 * Convert date and time to string with 'YYYY-MM-DD HH:mm' format
 * @param date {Date}
 * @param time {{hours: string, minutes: string}}
 * @param dateFormat {string}
 * @returns {string}
 */
function dateTimeToStr(date, time, dateFormat) {
	if (date === undefined) {
		return '';
	}

	if (time === undefined) {
		return format(date, dateFormat);
	}

	const { hours, minutes } = time;
	try {
		const timeInMinutes = hoursAndMinutesToTime(hours, minutes);
		const fullDate = setMinutes(date, timeInMinutes);
		return format(fullDate, getFullDateFormat(dateFormat));
	} catch (e) {
		const dateStr = format(date, dateFormat);
		if (hours !== '' && minutes !== '') {
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
		const { hours, minutes } = time;
		const timeInMinutes = hoursAndMinutesToTime(hours, minutes);
		return setMinutes(date, timeInMinutes);
	} catch (e) {
		return INTERNAL_INVALID_DATE;
	}
}

/**
 * Convert string in 'YYYY-MM-DD' format to date
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
 * @returns {{ hours: string, minutes: string }}
 */
function strToTime(strToParse) {
	const timeMatches = strToParse.match(timePartRegex);
	if (!timeMatches) {
		throw new Error('TIME - INCORRECT FORMAT');
	}

	const hours = timeMatches[1];
	const minutes = timeMatches[2];

	return { hours, minutes };
}

function pad(num, size) {
	let s = String(num);
	while (s.length < (size || 2)) {
		s = `0${s}`;
	}
	return s;
}

/**
 * Extract parts (date, time, date/time, string conversion) from a Date
 * @param selectedDateTime {Date}
 * @param dateFormat {string}
 * @returns
 *  {{date: Date, time: { hours: string, minutes: string }, datetime: Date, textInput: string}}
 */
function extractDateTimeParts(selectedDateTime, dateFormat) {
	const isDateTimeValid = isDateValid(selectedDateTime);

	if (selectedDateTime !== undefined && isDateTimeValid) {
		const date = startOfDay(selectedDateTime);
		const hours = getHours(selectedDateTime);
		const minutes = getMinutes(selectedDateTime);
		const time = {
			hours: pad(hours, 2),
			minutes: pad(minutes, 2),
		};
		const datetime = startOfMinute(selectedDateTime);

		return {
			date,
			time,
			datetime,
			textInput: dateTimeToStr(date, time, dateFormat),
		};
	}

	return {
		date: undefined,
		time: { hours: '', minutes: '' },
		datetime: selectedDateTime,
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
	isDateValid,
	strToDate,
	strToTime,
};
