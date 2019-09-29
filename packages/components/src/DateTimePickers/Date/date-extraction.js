import format from 'date-fns/format';
import getDate from 'date-fns/get_date';
import lastDayOfMonth from 'date-fns/last_day_of_month';
import setDate from 'date-fns/set_date';
import getErrorMessage from '../shared/error-messages';


export function DatePickerException(code, message) {
	this.message = getErrorMessage(message);
	this.code = code;
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
 * Check if a date is a valid date.
 */
function isDateValid(date, options) {
	if (!options.required && date === undefined) {
		return true;
	}

	return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Convert date to string with provided format
 * @param {Date} date
 * @param {Object} options
 */
function dateToStr(date, options) {
	const { dateFormat } = options;
	return format(date, dateFormat);
}
/**
 * Convert a date in local TZ to UTC
 */
function convertToUTC(date) {
	return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
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
 * Extract parts (date, textInput) from a Date
 * @param date {Date}
 * @param options {Object}
 * @returns
 *	{{
 *		date: Date,
 *		textInput: string
 * 	}}
 */
function extractPartsFromDate(date, options) {
	if (!isDateValid(date, options)) {
		return {
			date: undefined,
			textInput: '',
			errors: [],
			errorMessage: null,
		};
	}

	return {
		date: options.useUTC ? convertToUTC(date) : date,
		textInput: dateToStr(date, options),
		errors: [],
		errorMessage: null,
	};
}

/**
 * Extract parts (date, textInput) from a string
 * @param textInput {string}
 * @param options {Object}
 * @returns
 *	{{
 *		date: Date,
 *		textInput: string
 * 	}}
 */
function extractDateFromTextInput(textInput, options) {
	if (textInput === '') {
		return {
			date: undefined,
			textInput,
			errors: [],
		};
	}

	let date = null;
	let errors = [];

	try {
		date = strToDate(textInput, options.dateFormat);
	} catch (error) {
		errors = errors.concat(error);
	}

	return {
		date: options.useUTC ? convertToUTC(date) : date,
		textInput,
		errors,
		errorMessage: errors[0] ? errors[0].message : null,
	};
}

function extractDate(value, options) {
	const typeOfValue = typeof value;
	if (typeOfValue === 'number') {
		return extractPartsFromDate(new Date(value), options);
	} else if (typeOfValue === 'string') {
		return extractDateFromTextInput(value, options);
	} else if (value instanceof Date) {
		return extractPartsFromDate(value, options);
	}
	return {
		date: undefined,
		textInput: '',
		errors: [],
	};
}

export { checkSupportedDateFormat, extractDate, extractDateFromTextInput, extractPartsFromDate };
