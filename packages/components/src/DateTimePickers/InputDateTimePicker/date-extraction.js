import getDate from 'date-fns/get_date';
import startOfDay from 'date-fns/start_of_day';
import setMinutes from 'date-fns/set_minutes';
import getMinutes from 'date-fns/get_minutes';
import lastDayOfMonth from 'date-fns/last_day_of_month';
import setDate from 'date-fns/set_date';
import format from 'date-fns/format';
import startOfMinute from 'date-fns/start_of_minute';
import getHours from 'date-fns/get_hours';

const splitDateAndTimePartsRegex = new RegExp(/^\s*([^\s]+?)\s+([^\s]+?)\s*$/);
/*
 * Split the date part into year, month and day
 * ex : ' 2018-2-05  ' => ['2018', '2', '05']
 */
const datePartRegex = new RegExp(/^\s*([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})\s*$/);
/*
 * Split the time part into hours and minutes
 * ex : ' 14:35  ' => ['14', '35']
 */
const timePartRegex = new RegExp(/^(.*):(.*)$/);

const INPUT_FULL_FORMAT = 'YYYY-MM-DD HH:mm';
const INPUT_DATE_ONLY_FORMAT = 'YYYY-MM-DD';
const INTERNAL_INVALID_DATE = new Date('INTERNAL_INVALID_DATE');

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
	if (typeof hours !== 'number' || hours < 0 || hours > 23) {
		throw new Error('TIME - INCORRECT HOUR NUMBER');
	}
	if (typeof minutes !== 'number' || minutes < 0 || minutes > 59) {
		throw new Error('TIME - INCORRECT MINUTES NUMBER');
	}
}

/**
 * Convert hour and minutes into minutes
 * @param hours {number}
 * @param minutes {number}
 * @returns {number}
 */
function hoursAndMinutesToTime(hours, minutes) {
	checkTime({ hours, minutes });
	return hours * 60 + minutes;
}

/**
 * Convert date and time to string with 'YYYY-MM-DD HH:mm' format
 * @param date {Date}
 * @param time {number}
 * @returns {string}
 */
function dateTimeToStr(date, time) {
	if (date === undefined) {
		return '';
	}

	if (time === undefined) {
		return format(date, INPUT_DATE_ONLY_FORMAT);
	}

	const { hours, minutes } = time;
	try {
		const timeInMinutes = hoursAndMinutesToTime(hours, minutes);
		const fullDate = setMinutes(date, timeInMinutes);
		return format(fullDate, INPUT_FULL_FORMAT);
	} catch (e) {
		const dateStr = format(date, INPUT_DATE_ONLY_FORMAT);
		if (hours !== undefined && minutes !== undefined) {
			return `${dateStr} ${hours}:${minutes}`;
		}
		return dateStr;
	}
}

/**
 * Set the time to the provided date
 * @param date {Date}
 * @param time {number}
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
function strToDate(strToParse) {
	const dateMatches = strToParse.match(datePartRegex);
	if (!dateMatches) {
		throw new Error('DATE - INCORRECT FORMAT');
	}

	const monthString = dateMatches[2];
	const month = parseInt(monthString, 10);
	if (month === 0 || month > 12) {
		throw new Error('DATE - INCORRECT MONTH NUMBER');
	}

	const dayString = dateMatches[3];
	const day = parseInt(dayString, 10);
	if (day === 0) {
		throw new Error('DATE - INCORRECT DAY NUMBER');
	}

	const yearString = dateMatches[1];
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
 * @returns {{ hours: number, minutes: number }}
 */
function strToTime(strToParse) {
	const timeMatches = strToParse.match(timePartRegex);
	if (!timeMatches) {
		throw new Error('TIME - INCORRECT FORMAT');
	}

	const numbersRegex = /^\d+$/;
	const hoursString = timeMatches[1];
	const hours = numbersRegex.test(hoursString) ? parseInt(hoursString, 10) : hoursString;

	const minutesString = timeMatches[2];
	const minutes = numbersRegex.test(minutesString) ? parseInt(minutesString, 10) : minutesString;

	return { hours, minutes };
}

/**
 * Extract parts (date, time, date/time, string conversion) from a Date
 * @param selectedDateTime {Date}
 * @returns {{date: Date, time: number, datetime: Date, textInput: string}}
 */
function extractDateTimeParts(selectedDateTime) {
	const isDateTimeValid = isDateValid(selectedDateTime);

	if (selectedDateTime !== undefined && isDateTimeValid) {
		const date = startOfDay(selectedDateTime);
		const hours = getHours(selectedDateTime);
		const minutes = getMinutes(selectedDateTime);
		const time = { hours, minutes };
		const datetime = startOfMinute(selectedDateTime);

		return {
			date,
			time,
			datetime,
			textInput: dateTimeToStr(date, time),
		};
	}

	return {
		date: undefined,
		time: undefined,
		datetime: selectedDateTime,
		textInput: '',
	};
}

export {
	INPUT_FULL_FORMAT,
	splitDateAndTimePartsRegex,
	checkTime,
	dateAndTimeToDateTime,
	dateTimeToStr,
	extractDateTimeParts,
	isDateValid,
	strToDate,
	strToTime,
};
