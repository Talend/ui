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
const timePartRegex = new RegExp(/^\s*([0-9]{1,2}):([0-9]{2})\s*$/);

const INPUT_FULL_FORMAT = 'YYYY-MM-DD HH:mm';
const INPUT_DATE_ONLY_FORMAT = 'YYYY-MM-DD';
const INTERNAL_INVALID_DATE = new Date('INTERNAL_INVALID_DATE');

function isDateValid(date) {
	if (date === undefined) {
		return true;
	}

	return date instanceof Date && !isNaN(date.getTime());
}

function hoursAndMinutesToTime(hours, minutes) {
	return hours * 60 + minutes;
}

function dateTimeToStr(date, time) {
	if (date === undefined) {
		return '';
	}

	if (time === undefined) {
		return format(date, INPUT_DATE_ONLY_FORMAT);
	}

	const fullDate = setMinutes(date, time);
	return format(fullDate, INPUT_FULL_FORMAT);
}

function dateAndTimeToDateTime(date, time) {
	if (date === undefined || time === undefined) {
		return INTERNAL_INVALID_DATE;
	}

	return setMinutes(date, time);
}

function strToDate(strToParse) {
	const dateMatches = strToParse.match(datePartRegex);

	if (!dateMatches) {
		const errMsg = 'DATE - INCORRECT FORMAT';
		return [undefined, errMsg];
	}

	const yearString = dateMatches[1];
	const monthString = dateMatches[2];
	const dayString = dateMatches[3];

	const day = parseInt(dayString, 10);
	const month = parseInt(monthString, 10);
	const monthIndex = month - 1;
	const year = parseInt(yearString, 10);

	if (month === 0 || month > 12) {
		const errMsg = 'DATE - INCORRECT MONTH NUMBER';
		return [undefined, errMsg];
	}

	if (day === 0) {
		const errMsg = 'DATE - INCORRECT DAY NUMBER';
		return [undefined, errMsg];
	}

	const monthDate = new Date(year, monthIndex);
	const lastDateOfMonth = lastDayOfMonth(monthDate);

	if (day > getDate(lastDateOfMonth)) {
		const errMsg = 'DATE - INCORRECT DAY NUMBER RELATIVE TO MONTH';
		return [undefined, errMsg];
	}

	const dateValidated = setDate(monthDate, day);

	return [dateValidated];
}

function strToTime(strToParse) {
	const timeMatches = strToParse.match(timePartRegex);

	if (!timeMatches) {
		const errMsg = 'TIME - INCORRECT FORMAT';
		return [undefined, errMsg];
	}

	const hoursString = timeMatches[1];
	const minutesString = timeMatches[2];

	const hours = parseInt(hoursString, 10);

	if (hours >= 24) {
		const errMsg = 'TIME - INCORRECT HOUR NUMBER';
		return [undefined, errMsg];
	}

	const minutes = parseInt(minutesString, 10);

	if (minutes >= 60) {
		const errMsg = 'TIME - INCORRECT MINUTES NUMBER';
		return [undefined, errMsg];
	}

	const timeValidated = hoursAndMinutesToTime(hours, minutes);

	return [timeValidated];
}

function extractDateTimeParts(selectedDateTime) {
	const isDateTimeValid = isDateValid(selectedDateTime);

	if (selectedDateTime !== undefined && isDateTimeValid) {
		const date = startOfDay(selectedDateTime);
		const hours = getHours(selectedDateTime);
		const minutes = getMinutes(selectedDateTime);
		const time = hoursAndMinutesToTime(hours, minutes);
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
	dateAndTimeToDateTime,
	dateTimeToStr,
	extractDateTimeParts,
	isDateValid,
	strToDate,
	strToTime,
};
