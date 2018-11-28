import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import memoize from 'lodash/memoize';
import isToday from 'date-fns/is_today';
import getDate from 'date-fns/get_date';
import getMonth from 'date-fns/get_month';
import getYear from 'date-fns/get_year';
import isSameDay from 'date-fns/is_same_day';

import theme from './DatePicker.scss';
import { buildDayNames, buildWeeks } from '../../generator';
import { withCalendarGesture } from '../../../Gesture/withCalendarGesture';
import getDefaultT from '../../../translate';

const getDayNames = memoize(buildDayNames);

class DatePicker extends React.PureComponent {
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

	isCurrentYear(date) {
		return getYear(date) === this.props.calendar.year;
	}

	isSelectedInCurrentCalendar() {
		const { selectedDate } = this.props;
		if (!selectedDate) {
			return false;
		}
		return this.isCurrentYear(selectedDate) && this.isCurrentMonth(selectedDate);
	}

	render() {
		const { year, monthIndex } = this.props.calendar;

		const weeks = this.getWeeks(year, monthIndex);
		const dayNames = getDayNames(undefined, this.props.t);
		const selectedInCurrentCalendar = this.isSelectedInCurrentCalendar();

		return (
			<table
				className={theme.container}
				ref={ref => {
					this.calendarRef = ref;
				}}
			>
				<caption className="sr-only">TODO: caption, days aria-label, today aria-label</caption>
				<thead>
					<tr className={theme['calendar-header']}>
						{dayNames.map((dayName, i) => (
							<th scope="col" key={i}>
								<abbr key={i} title={dayName.full}>
									{dayName.abbr}
								</abbr>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{weeks.map((week, i) => (
						<tr
							key={i}
							className={classNames(theme['calendar-row'], 'tc-date-picker-calendar-row')}
						>
							{week.map((date, j) => {
								if (this.isCurrentMonth(date)) {
									const day = getDate(date);
									const disabled = this.isDisabledDate(date);
									const selected = this.isSelectedDate(date);
									const shouldBeFocussable =
										(selectedInCurrentCalendar && selected) ||
										(!selectedInCurrentCalendar && day === 1);

									const className = classNames(
										theme['calendar-day'],
										{
											[theme.selected]: selected,
											[theme.today]: isToday(date),
										},
										'tc-date-picker-day',
									);

									const tdProps = {
										key: j,
										className: theme['calendar-col'],
									};
									if (selected) {
										tdProps['aria-current'] = 'date';
									}
									return (
										<td {...tdProps}>
											<button
												type="button"
												className={className}
												onClick={event => {
													this.props.onSelect(event, date);
												}}
												disabled={disabled}
												tabIndex={this.props.allowFocus && shouldBeFocussable ? 0 : -1}
												onKeyDown={event => this.props.onKeyDown(event, this.calendarRef, day - 1)}
											>
												{day}
											</button>
										</td>
									);
								}
								return <td key={j} />;
							})}
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}
DatePicker.displayName = 'DatePicker';
DatePicker.propTypes = {
	allowFocus: PropTypes.bool,
	calendar: PropTypes.shape({
		monthIndex: PropTypes.number.isRequired,
		year: PropTypes.number.isRequired,
	}).isRequired,
	onSelect: PropTypes.func.isRequired,
	selectedDate: PropTypes.instanceOf(Date),
	isDisabledChecker: PropTypes.func,
	onKeyDown: PropTypes.func.isRequired,
	t: PropTypes.func,
};

DatePicker.defaultProps = {
	t: getDefaultT(),
};

export default withCalendarGesture(DatePicker);
