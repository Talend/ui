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
export { convertDate, isoStrToDate };
