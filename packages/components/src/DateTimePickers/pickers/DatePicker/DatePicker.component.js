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

	static buildWeeks(year, monthIndex, firstDayOfWeek) {
		const firstDateOfMonth = new Date(year, monthIndex);
		const firstDateOfCalendar = startOfWeek(firstDateOfMonth, {
			weekStartsOn: firstDayOfWeek,
		});

		const lastDateOfMonth = endOfMonth(firstDateOfMonth);
		const diffWeeks = differenceInCalendarWeeks(lastDateOfMonth, firstDateOfCalendar, {
			weekStartsOn: firstDayOfWeek,
		});
		const nbWeeksToRender = diffWeeks + 1;

		const dates = (new Array(7 * nbWeeksToRender))
						.fill(0)
						.map((_, i) => addDays(firstDateOfCalendar, i));

		return chunk(dates, 7);
	}

	constructor(props) {
		super(props);

		this.getWeeks = memoize(DatePicker.buildWeeks, (year, monthIndex, firstDayOfWeek) => `${year}-${monthIndex}|${firstDayOfWeek}`);
	}

	isSelectedDate(date) {
		return this.props.selectedDate !== undefined
			&& isSameDay(this.props.selectedDate, date);
	}

	isDisabledDate(dateToCheck) {
		const disabledRules = this.props.disabledRules;
		if (!disabledRules) {
			return false;
		}

		return disabledRules
			.some(disabledRule => {
				if (typeof disabledRules !== 'object') {
					return false;
				}

				switch (disabledRule.constructor) {
					case Date:
						return isSameDay(disabledRule, dateToCheck);

					case Array:
						return disabledRule
							.some(disabledDateRule => isSameDay(disabledDateRule, dateToCheck));

					default:
						return false;
				}
			});
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
				<div className={theme['calendar-header']}>
					<div className={classNames(theme['calendar-row'])}>
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
				</div>


				<div className={theme['calendar-body']}>
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
											isSelected={this.isSelectedDate(date)}
											isDisabled={this.isDisabledDate(date)}
											isToday={isToday(date)}
											aria-label={this.isDisabledDate(date)
												? 'Unselectable date'
												: `Select '${getDate(date)}'`}
											onClick={() => { this.props.onSelect(date); }}
										/>
									}
								</div>
							)}
						</div>
					)}
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
	disabledRules: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.arrayOf(PropTypes.instanceOf(Date)),
	])),
};

export default DatePicker;
