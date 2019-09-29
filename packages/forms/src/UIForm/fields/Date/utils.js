import { isoDateTimeRegExp } from '../../customFormats';

const INVALID_DATE = new Date('');

function isoStrToDate(isoStr) {
	if (isoDateTimeRegExp.test(isoStr)) {
		return new Date(isoStr);
	}
	return INVALID_DATE;
}

function dateToIsoStr(date) {
	return date.toISOString();
}

export { isoStrToDate, dateToIsoStr };
