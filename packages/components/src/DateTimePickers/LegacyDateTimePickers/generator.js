import addDays from 'date-fns/addDays';
import chunk from 'lodash/chunk';
import addMonths from 'date-fns/addMonths';
import format from 'date-fns/format';
import getYear from 'date-fns/getYear';
import setDay from 'date-fns/setDay';
import startOfWeek from 'date-fns/startOfWeek';
import memoize from 'lodash/memoize';
import getLocale from '../../i18n/DateFnsLocale/locale';
import getDefaultT from '../../translate';

function buildDateFnsLocale(t) {
	return { locale: getLocale(t || getDefaultT()) };
}

export const getPickerLocale = memoize(buildDateFnsLocale);

/**
 * Generate days of week, starting from the provided index
 */
export function buildDayNames(firstDayOfweek = 1, t) {
	const pickerLocale = getPickerLocale(t);
	return new Array(7)
		.fill(0)
		.map((_, i) => (i + firstDayOfweek) % 7)
		.map(dayOfWeek => setDay(new Date(0), dayOfWeek))
		.map(headerDate => ({
			abbr: format(headerDate, 'd', pickerLocale),
			full: format(headerDate, 'dddd', pickerLocale),
		}));
}

/**
 * Generate the set of weeks for a specific month
 */
export function buildWeeks(year, monthIndex, firstDayOfWeek = 1) {
	const firstDateOfMonth = new Date(year, monthIndex);
	const firstDateOfCalendar = startOfWeek(firstDateOfMonth, {
		weekStartsOn: firstDayOfWeek,
	});

	const dates = new Array(7 * 6).fill(0).map((_, i) => addDays(firstDateOfCalendar, i));

	return chunk(dates, 7);
}

/**
 * Generate th sets of months, each set has the size of provided "chunkSize"
 */
export function buildMonths(chunkSize, t) {
	const pickerLocale = getPickerLocale(t);
	const months = new Array(12)
		.fill(0)
		.map((_, i) => i)
		.map(index => ({
			index,
			name: format(addMonths(new Date(0), index), 'MMMM', pickerLocale),
		}));
	return chunk(months, chunkSize);
}

/**
 * Generate a years window, centered on the current year by default, or the provided one
 */
export function buildYears(middle, window = 3) {
	const middleYear = middle === undefined ? getYear(new Date()) : middle;
	const start = middleYear - window;
	const end = middleYear + window;
	const years = [];
	for (let i = start; i <= end; i += 1) {
		years.push(i);
	}
	return years;
}
