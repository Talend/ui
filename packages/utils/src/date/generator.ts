import startOfWeek from 'date-fns/start_of_week';
import addDays from 'date-fns/add_days';
import chunk from 'lodash/chunk';

/**
 * Generate the set of weeks for a specific month
 */
export function buildWeeks(year: number, monthIndex: number, firstDayOfWeek = 1) {
	const firstDateOfMonth = new Date(year, monthIndex);
	const firstDateOfCalendar = startOfWeek(firstDateOfMonth, {
		weekStartsOn: firstDayOfWeek,
	});

	const dates = new Array(7 * 6).fill(0).map((_, i) => addDays(firstDateOfCalendar, i));

	return chunk(dates, 7);
}
