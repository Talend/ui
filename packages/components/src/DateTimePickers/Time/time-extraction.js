import getErrorMessage from '../shared/error-messages';

const timePartRegex = new RegExp(/^(.*):(.*)$/);
const timeWithSecondsPartRegex = new RegExp(/^(.*):(.*):(.*)$/);

function TimePickerException(code, message) {
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
 * Check if hours are correct
 */
function checkHours(hours) {
	const hoursNum = Number(hours);
	if (hours === '') {
		return new TimePickerException('INVALID_HOUR', 'INVALID_HOUR_EMPTY');
	} else if (hours.length !== 2 || isNaN(hoursNum) || hoursNum < 0 || hoursNum > 23) {
		return new TimePickerException('INVALID_HOUR', 'INVALID_HOUR_NUMBER');
	}
	return null;
}

/**
 * Check if checkMinutes are correct
 */
function checkMinutes(minutes) {
	const minsNum = Number(minutes);
	if (minutes === '') {
		return new TimePickerException('INVALID_MINUTES', 'INVALID_MINUTES_EMPTY');
	} else if (minutes.length !== 2 || isNaN(minsNum) || minsNum < 0 || minsNum > 59) {
		return new TimePickerException('INVALID_MINUTES', 'INVALID_MINUTES_NUMBER');
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
		return new TimePickerException('INVALID_SECONDS', 'INVALID_SECONDS_EMPTY');
	} else if (seconds.length !== 2 || isNaN(secondsNum) || secondsNum < 0 || secondsNum > 59) {
		return new TimePickerException('INVALID_SECONDS', 'INVALID_SECONDS_NUMBER');
	}
	return null;
}

/**
 * Check if time is correct
 */
function checkTime(time) {
	if (!time) {
		throw new TimePickerException('INVALID_TIME_EMPTY', 'INVALID_TIME_EMPTY');
	}
	const { hours, minutes, seconds } = time;

	const hoursError = checkHours(hours);
	if (hoursError) {
		throw hoursError;
	}

	const minutesError = checkMinutes(minutes);
	if (minutesError) {
		throw minutesError;
	}

	const secondsError = checkSeconds(seconds);
	if (secondsError) {
		throw secondsError;
	}
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
		throw new TimePickerException('TIME_FORMAT_INVALID', 'TIME_FORMAT_INVALID');
	}

	const hours = timeMatches[1];
	const minutes = timeMatches[2];
	const seconds = useSeconds ? timeMatches[3] : '00';

	return { hours, minutes, seconds };
}

/**
 * Convert time object to string
 * @param {object} time {{hours: string|number, minutes: string|number, seconds: string|number}}
 * @param {boolean} useSeconds
 */
function timeToStr(time, useSeconds) {
	if (!time) return '';
	const hours = pad(time.hours);
	const minutes = pad(time.minutes);
	const seconds = pad(time.seconds);
	return `${hours}:${minutes}${useSeconds ? `:${seconds}` : ''}`;
}
/**
 * get time format base on useSeconds
 * @param {string} useSeconds
 */
function getTimeFormat(useSeconds) {
	return useSeconds ? 'HH:mm:ss' : 'HH:mm';
}

export default function extractTime(selectedTime, useSeconds) {
	const errors = [];
	let time;
	if (!selectedTime) {
		return {
			time: null,
			textInput: '',
			errors: [],
			errorMessage: null,
		};
	}
	try {
		time = typeof selectedTime === 'string' ? strToTime(selectedTime, useSeconds) : selectedTime;
		checkTime(time);
	} catch (error) {
		errors.push(error);
	}

	return {
		time,
		textInput: typeof selectedTime === 'string' ? selectedTime : timeToStr(time, useSeconds),
		errors,
		errorMessage: errors[0] ? errors[0].message : null,
	};
}

export {
	checkHours,
	checkMinutes,
	checkSeconds,
	checkTime,
	getTimeFormat,
	pad,
	strToTime,
	timeToStr,
};
