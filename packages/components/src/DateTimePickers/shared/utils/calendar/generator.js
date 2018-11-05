import addDays from 'date-fns/add_days';
import chunk from 'lodash/chunk';
import differenceInCalendarWeeks from 'date-fns/difference_in_calendar_weeks';
import startOfWeek from 'date-fns/start_of_week';
import endOfMonth from 'date-fns/end_of_month';
import format from 'date-fns/format';
import setDay from 'date-fns/set_day';
import BASE_DATE from '../constants/baseDate';

export function buildDayNames(firstDayOfweek) {
	return new Array(7)
		.fill(0)
		.map((_, i) => (i + firstDayOfweek) % 7)
		.map(dayOfWeek => setDay(BASE_DATE, dayOfWeek))
		.map(headerDate => format(headerDate, 'dddd'));
}

export function buildWeeks(year, monthIndex, firstDayOfWeek) {
	const firstDateOfMonth = new Date(year, monthIndex);
	const firstDateOfCalendar = startOfWeek(firstDateOfMonth, {
		weekStartsOn: firstDayOfWeek,
	});

	const lastDateOfMonth = endOfMonth(firstDateOfMonth);
	const diffWeeks = differenceInCalendarWeeks(lastDateOfMonth, firstDateOfCalendar, {
		weekStartsOn: firstDayOfWeek,
	});
	const nbWeeksToRender = diffWeeks + 1;

	const dates = new Array(7 * nbWeeksToRender)
		.fill(0)
		.map((_, i) => addDays(firstDateOfCalendar, i));

	return chunk(dates, 7);
}
