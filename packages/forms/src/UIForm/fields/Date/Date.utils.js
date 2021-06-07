import memoizeOne from 'memoize-one';
import { isoDateTimeRegExp } from '../../customFormats';

function isoStrToDate(isoStr) {
	if (isoDateTimeRegExp.test(isoStr)) {
		return new Date(isoStr);
	}
	return isoStr;
}

function dateToIsoStr(date) {
	return date.toISOString();
}

const memorizedDateToIsoStr = memoizeOne(dateToIsoStr);

function convertDate(value, textInput, schema) {
	let converted = value;
	if (schema.format === 'iso-datetime') {
		converted = memorizedDateToIsoStr(value);
	} else if (schema.type === 'number') {
		converted = value.getTime();
	} else {
		converted = textInput;
	}
	return converted;
}

function isBefore(date, dateToCompare) {
	const converted = typeof dateToCompare === 'string' ? isoStrToDate(dateToCompare) : dateToCompare;
	if (converted instanceof Date) {
		converted.setHours(0, 0, 0, 0);
		return date.getTime() < converted.getTime();
	}
	return false;
}

function isAfter(date, dateToCompare) {
	const converted = typeof dateToCompare === 'string' ? isoStrToDate(dateToCompare) : dateToCompare;
	if (converted instanceof Date) {
		converted.setHours(23, 59, 59, 999);
		return date.getTime() > converted.getTime();
	}
	return false;
}

export { convertDate, isoStrToDate, isBefore, isAfter };
