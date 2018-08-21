import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import memoize from 'lodash/memoize';
import { chunk } from 'lodash';
import format from 'date-fns/format';
import endOfMonth from 'date-fns/end_of_month';
import startOfWeek from 'date-fns/start_of_week';
import isToday from 'date-fns/is_today';
import getDate from 'date-fns/get_date';
import setDay from 'date-fns/set_day';
import getMonth from 'date-fns/get_month';
import isSameDay from 'date-fns/is_same_day';
import differenceInCalendarWeeks from 'date-fns/difference_in_calendar_weeks';

import addDays from 'date-fns/add_days';
import theme from './DatePicker.scss';
import DayPickerAction from './DayPickerAction';
import BASE_DATE from '../../shared/utils/constants/baseDate';

const FIRST_DAY_OF_WEEK = 1;
const NB_DAYS_IN_WEEK = 7;

function buildDayNames(firstDayOfweek) {
	return new Array(NB_DAYS_IN_WEEK)
		.fill(0)
		.map((_, i) => (i + firstDayOfweek) % NB_DAYS_IN_WEEK)
		.map(dayOfWeek => setDay(BASE_DATE, dayOfWeek))
		.map(headerDate => format(headerDate, 'dddd'));
}

const getDayNames = memoize(buildDayNames);

function buildWeeks(year, monthIndex, firstDayOfWeek) {
	const firstDateOfMonth = new Date(year, monthIndex);
	const firstDateOfCalendar = startOfWeek(firstDateOfMonth, {
		weekStartsOn: firstDayOfWeek,
	});

	const lastDateOfMonth = endOfMonth(firstDateOfMonth);
	const diffWeeks = differenceInCalendarWeeks(lastDateOfMonth, firstDateOfCalendar, {
		weekStartsOn: firstDayOfWeek,
	});
	const nbWeeksToRender = diffWeeks + 1;

	const dates = new Array(NB_DAYS_IN_WEEK * nbWeeksToRender)
		.fill(0)
		.map((_, i) => addDays(firstDateOfCalendar, i));

	return chunk(dates, NB_DAYS_IN_WEEK);
}

class DatePicker extends React.Component {
	constructor(props) {
		super(props);

		this.getWeeks = memoize(
			buildWeeks,
			(year, monthIndex, firstDayOfWeek) => `${year}-${monthIndex}|${firstDayOfWeek}`,
		);
	}

	isSelectedDate(date) {
		return this.props.selectedDate !== undefined && isSameDay(this.props.selectedDate, date);
	}

	isDisabledDate(date) {
		if (!this.props.isDisabledChecker) {
			return false;
		}

		return this.props.isDisabledChecker(date);
	}

	isCurrentMonth(date) {
		return getMonth(date) === this.props.calendar.monthIndex;
	}

	render() {
		const { year, monthIndex } = this.props.calendar;

		const weeks = this.getWeeks(year, monthIndex, FIRST_DAY_OF_WEEK);
		const dayNames = getDayNames(FIRST_DAY_OF_WEEK);

		return (
			<div className={theme.container}>
				<div className={classNames('tc-date-picker-calendar-header', theme['calendar-header'])}>
					<div className={classNames('tc-date-picker-calendar-row', theme['calendar-row'])}>
						{dayNames.map((dayName, i) => (
							<abbr
								className={classNames('tc-date-picker-calendar-item', theme['calendar-item'])}
								key={i}
								title={dayName}
							>
								{dayName.charAt(0)}
							</abbr>
						))}
					</div>
					<hr className={theme.separator} />
				</div>

				<div className={classNames('tc-date-picker-calendar-body', theme['calendar-body'])}>
					{weeks.map((week, i) => (
						<div
							className={classNames('tc-date-picker-calendar-row', theme['calendar-row'])}
							key={i}
						>
							{week.map((date, j) => {
								const isDisabled = this.isDisabledDate(date);
								const dateNumber = getDate(date);

								return (
									<div
										className={classNames('tc-date-picker-calendar-item', theme['calendar-item'])}
										key={j}
									>
										{this.isCurrentMonth(date) && (
											<DayPickerAction
												label={dateNumber}
												isSelected={this.isSelectedDate(date)}
												isDisabled={isDisabled}
												isToday={isToday(date)}
												aria-label={isDisabled ? 'Unselectable date' : `Select '${dateNumber}'`}
												onClick={event => {
													this.props.onSelect(event, date);
												}}
											/>
										)}
									</div>
								);
							})}
						</div>
					))}
				</div>
			</div>
		);
	}
}

DatePicker.propTypes = {
	calendar: PropTypes.shape({
		monthIndex: PropTypes.number.isRequired,
		year: PropTypes.number.isRequired,
	}).isRequired,
	onSelect: PropTypes.func.isRequired,
	selectedDate: PropTypes.instanceOf(Date),
	isDisabledChecker: PropTypes.func,
};

export default DatePicker;
