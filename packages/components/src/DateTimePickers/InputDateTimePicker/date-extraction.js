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
const timeWithSecondsPartRegex = new RegExp(/^(.*):(.*):(.*)$/);
const timePartRegex = new RegExp(/^(.*):(.*)$/);

const INPUT_FULL_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const INPUT_WITHOUT_SECOND_FORMAT = 'YYYY-MM-DD HH:mm';
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
 * @returns {string}
 */
function dateTimeToStr(date, time, useSeconds) {
	if (date === undefined) {
		return '';
	}

	if (time === undefined) {
		return format(date, INPUT_DATE_ONLY_FORMAT);
	}

	const { hours, minutes, seconds } = time;
	try {
		const timeInSeconds = timeToSeconds(hours, minutes, seconds);
		const fullDate = setSeconds(date, timeInSeconds);
		return format(fullDate, useSeconds ? INPUT_FULL_FORMAT : INPUT_WITHOUT_SECOND_FORMAT);
	} catch (e) {
		const dateStr = format(date, INPUT_DATE_ONLY_FORMAT);
		if (hours !== '' && minutes !== '') {
			if (useSeconds && seconds !== '') {
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
 * @returns {{ hours: string, minutes: string }}
 */
function strToTime(strToParse, useSeconds) {
	const timeMatches = strToParse.match(timeWithSecondsPartRegex) ?
		strToParse.match(timeWithSecondsPartRegex) : strToParse.match(timePartRegex);
	if (!timeMatches) {
		throw new Error('TIME - INCORRECT FORMAT');
	}

	const hours = timeMatches[1];
	const minutes = timeMatches[2];

	const seconds = !useSeconds || timeMatches[3] === undefined ? '00' : timeMatches[3];
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
 * Extract parts (date, time, date/time, string conversion) from a Date
 * @param selectedDateTime {Date}
 * @returns
 *  {{date: Date, time: { hours: string, minutes: string }, datetime: Date, textInput: string}}
 */
function extractDateTimeParts(selectedDateTime, useSeconds) {
	const isDateTimeValid = isDateValid(selectedDateTime);

	if (selectedDateTime !== undefined && isDateTimeValid) {
		const date = startOfDay(selectedDateTime);
		const hours = getHours(selectedDateTime);
		const minutes = getMinutes(selectedDateTime);
		const seconds = getSeconds(selectedDateTime);

		const time = {
			hours: pad(hours, 2),
			minutes: pad(minutes, 2),
			seconds: pad(seconds, 2),
		};
		const datetime = startOfSecond(selectedDateTime);

		return {
			date,
			time,
			datetime,
			textInput: dateTimeToStr(date, time, useSeconds),
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
