import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import memoize from 'lodash/memoize';
import isToday from 'date-fns/is_today';
import getDate from 'date-fns/get_date';
import getMonth from 'date-fns/get_month';
import isSameDay from 'date-fns/is_same_day';

import theme from './DatePicker.scss';
import { buildDayNames, buildWeeks } from '../../shared/utils/calendar/generator';

const FIRST_DAY_OF_WEEK = 1;

const getDayNames = memoize(buildDayNames);

class DatePicker extends React.Component {
	constructor(props) {
		super(props);

		this.getWeeks = memoize(
			buildWeeks,
			(year, monthIndex, firstDayOfWeek) => `${year}-${monthIndex}|${firstDayOfWeek}`,
		);

		this.state = {};
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
			<table className={theme.container}>
				<tr className={theme['calendar-header']}>
					{dayNames.map((dayName, i) => (
						<th scope="col">
							<abbr key={i} title={dayName}>
								{dayName.charAt(0)}
							</abbr>
						</th>
					))}
				</tr>
				{weeks.map((week, i) => (
					<tr key={i} className={classNames(theme['calendar-row'], 'tc-date-picker-calendar-row')}>
						{week.map((date, j) => {
							if (this.isCurrentMonth(date)) {
								const isDisabled = this.isDisabledDate(date);
								const isSelected = this.isSelectedDate(date);
								const className = classNames(
									theme['calendar-day'],
									{
										[theme.selected]: isSelected,
										[theme.today]: isToday(date),
									},
									'tc-date-picker-day',
								);
								return (
									// eslint-disable-next-line jsx-a11y/no-static-element-interactions
									<td key={j} className={theme['calendar-col']}>
										<button
											className={className}
											onClick={event => {
												this.props.onSelect(event, date);
											}}
											disabled={isDisabled}
											// a11y
											tabIndex={this.props.focusin && isSelected ? 0 : -1}
											aria-disabled={isDisabled}
											aria-selected={isSelected}
										>
											{getDate(date)}
										</button>
									</td>
								);
							}
							return <td />;
						})}
					</tr>
				))}
			</table>
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
	focusin: PropTypes.bool,
};

export default DatePicker;
