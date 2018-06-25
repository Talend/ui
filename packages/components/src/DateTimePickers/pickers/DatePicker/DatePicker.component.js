import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import memoize from 'lodash/memoize';
import { chunk } from 'lodash';
import format from 'date-fns/format';
import endOfMonth from 'date-fns/end_of_month';
import startOfWeek from 'date-fns/start_of_week';
import getDate from 'date-fns/get_date';
import setDay from 'date-fns/set_day';
import getMonth from 'date-fns/get_month';
import isSameDay from 'date-fns/is_same_day';
import differenceInCalendarWeeks from 'date-fns/difference_in_calendar_weeks';

import addDays from 'date-fns/add_days';
import theme from './DatePicker.scss';
import DayPickerAction from './DayPickerAction';

const FIRST_DAY_OF_WEEK = 1;
const BASE_DATE = new Date(0);

function buildDayNames(firstDayOfweek) {
	return (new Array(7))
		.fill(0)
		.map((_, i) => (i + firstDayOfweek) % 7)
		.map(dayOfWeek => setDay(BASE_DATE, dayOfWeek))
		.map(headerDate => format(headerDate, 'dddd'));
}

const getDayNames = memoize(buildDayNames);

class DatePicker extends React.Component {

	static buildWeeks(year, monthIndex) {
		const firstDateOfMonth = new Date(year, monthIndex);
		const firstDateOfCalendar = startOfWeek(firstDateOfMonth, {
			weekStartsOn: FIRST_DAY_OF_WEEK,
		});

		const lastDateOfMonth = endOfMonth(firstDateOfMonth);
		const diffWeeks = differenceInCalendarWeeks(lastDateOfMonth, firstDateOfCalendar, {
			weekStartsOn: FIRST_DAY_OF_WEEK,
		});
		const nbWeeksToRender = diffWeeks + 1;

		const days = (new Array(7 * nbWeeksToRender))
						.fill(0)
						.map((_, i) => addDays(firstDateOfCalendar, i));

		return chunk(days, 7);
	}

	constructor(props) {
		super(props);

		this.getWeeks = memoize(DatePicker.buildWeeks, (year, monthIndex) => `${year}-${monthIndex}`);

		this.selectedDay = new Date(2018, 5, 12);
		this.disabledDays = [
			new Date(2018, 5, 6),
			new Date(2018, 5, 15),
		];
	}

	isSelectedDay(date) {
		return isSameDay(this.selectedDay, date);
	}

	isDisabledDay(date) {
		return this.disabledDays
			.some(disabledDay => isSameDay(disabledDay, date));
	}

	isCurrentDay(date) {
		return isSameDay(this.props.currentDate, date);
	}

	isCurrentMonth(date) {
		return getMonth(date) === this.props.calendar.monthIndex;
	}

	render() {
		const { year, monthIndex } = this.props.calendar;

		const weeks = this.getWeeks(year, monthIndex);
		const dayNames = getDayNames(FIRST_DAY_OF_WEEK);

		return (
			<div className={theme.container}>
				<div className={classNames(theme['calendar-row'], theme['calendar-header-row'])}>
					{dayNames.map((dayName, i) =>
						<abbr
							className={theme['calendar-item']}
							key={i}
							title={dayName}
						>
							{dayName.charAt(0)}
						</abbr>
					)}
				</div>

				<hr className={theme.separator} />

				{weeks.map((week, i) =>
					<div
						className={classNames(theme['calendar-row'], theme['calendar-body-row'])}
						key={i}
					>
						{week.map((date, j) =>
							<div
								className={theme['calendar-item']}
								key={j}
							>
								{
									this.isCurrentMonth(date) &&
									<DayPickerAction
										label={getDate(date).toString()}
										isSelectedDay={this.isSelectedDay(date)}
										isDisabledDay={this.isDisabledDay(date)}
										isCurrentDay={this.isCurrentDay(date)}
										aria-label={this.isDisabledDay(date)
											? 'Unselectable date'
											: `Select '${getDate(date)}'`}
									/>
								}
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}

DatePicker.propTypes = {
	calendar: PropTypes.shape({
		monthIndex: PropTypes.number.isRequired,
		year: PropTypes.number.isRequired,
	}).isRequired,
	currentDate: PropTypes.instanceOf(Date).isRequired,
};

export default DatePicker;
