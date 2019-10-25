import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import memoize from 'lodash/memoize';
import isSameDay from 'date-fns/is_same_day';
import isToday from 'date-fns/is_today';
import isWithinRange from 'date-fns/is_within_range';
import format from 'date-fns/format';
import getDate from 'date-fns/get_date';
import getMonth from 'date-fns/get_month';
import getYear from 'date-fns/get_year';
import setMonth from 'date-fns/set_month';
import startOfMonth from 'date-fns/start_of_month';

import theme from './DatePicker.scss';
import { buildDayNames, buildWeeks, getPickerLocale } from '../../generator';
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

		if (props.selectedDate && (props.startDate || props.endDate)) {
			// eslint-disable-next-line no-console
			console.warn(
				'startDate and endDate are for date range, they cannot be used with selectedDate at the same time',
			);
		}
	}

	isSelectedDate(date) {
		const isSelectedDate =
			this.props.selectedDate !== undefined && isSameDay(this.props.selectedDate, date);
		const isStartDate = this.props.startDate !== undefined && isSameDay(this.props.startDate, date);
		const isEndDate = this.props.endDate !== undefined && isSameDay(this.props.endDate, date);
		return isSelectedDate || isStartDate || isEndDate;
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

	isDateInCurrentCalendar(date) {
		const { calendar } = this.props;
		const { year, monthIndex } = calendar;
		const weeks = this.getWeeks(year, monthIndex, 1);
		return isWithinRange(date, weeks[0][0], weeks[5][6]);
	}

	isRangeInCurrentCalendar() {
		const { startDate, endDate } = this.props;
		if (!startDate && !endDate) {
			return false;
		}
		return (
			(startDate && this.isDateInCurrentCalendar(startDate)) ||
			(endDate && this.isDateInCurrentCalendar(endDate))
		);
	}

	selectDate(event, date, year, monthIndex) {
		if (!this.isCurrentMonth(date)) {
			if (date < startOfMonth(new Date(year, monthIndex))) {
				this.props.goToPreviousMonth();
			} else {
				this.props.goToNextMonth();
			}
		}
		this.props.onSelect(event, date);
	}

	render() {
		const { calendar, startDate, endDate, t } = this.props;
		const { year, monthIndex } = calendar;
		const pickerLocale = getPickerLocale(t);

		const weeks = this.getWeeks(year, monthIndex, 1);
		const dayNames = getDayNames(undefined, this.props.t);
		const selectedInCurrentCalendar = this.isSelectedInCurrentCalendar();
		const isRangeInCurrentCalendar = this.isRangeInCurrentCalendar();

		const monthStr = format(setMonth(new Date(0), monthIndex), 'MMMM', pickerLocale);

		return (
			<table
				className={theme.container}
				ref={ref => {
					this.calendarRef = ref;
				}}
			>
				<caption className="sr-only">{`${monthStr} ${year}`}</caption>
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
								const day = getDate(date);
								const disabled = this.isDisabledDate(date);
								const selected = this.isSelectedDate(date);
								const today = isToday(date);
								const shouldBeFocussable =
									(selectedInCurrentCalendar && selected) ||
									(!selectedInCurrentCalendar && day === 1);

								const cellTheme = {};
								const dayTheme = {};
								const isInRange =
									isRangeInCurrentCalendar && isWithinRange(date, startDate, endDate);

								if (isInRange) {
									const isStart = isSameDay(date, startDate);
									const isEnd = isSameDay(date, endDate);
									const isMiddle = !isStart && !isEnd && isInRange;
									cellTheme[theme['date-range']] = isInRange;
									cellTheme[theme['range-middle']] = isMiddle;
									cellTheme[theme['range-start']] = isStart;
									cellTheme[theme['range-end']] = isEnd;
									dayTheme[theme.range] = isMiddle;
								}

								const className = classNames(
									theme['calendar-day'],
									{
										...dayTheme,
										[theme.selected]: selected,
										[theme.today]: today,
										[theme['not-current-month']]: !this.isCurrentMonth(date),
									},
									'tc-date-picker-day',
									'btn-tertiary',
									'btn-default',
								);

								let ariaLabel = format(date, 'dddd DD MMMM YYYY', pickerLocale);
								const tdProps = {
									key: j,
									className: classNames(theme['calendar-col'], cellTheme),
								};
								if (selected) {
									tdProps['aria-current'] = 'date';
									ariaLabel = t('DATEPICKER_DAY_SELECTED', {
										defaultValue: '{{date}}, selected',
										date: ariaLabel,
									});
								}
								if (today) {
									ariaLabel = t('DATEPICKER_DAY_TODAY', {
										defaultValue: 'Today, {{date}}',
										date: ariaLabel,
									});
								}
								const buttonProps = this.isCurrentMonth(date) ? { 'data-value': day } : undefined;
								return (
									<td {...tdProps}>
										<button
											type="button"
											className={className}
											onClick={event => this.selectDate(event, date, year, monthIndex)}
											disabled={disabled}
											tabIndex={this.props.allowFocus && shouldBeFocussable ? 0 : -1}
											onKeyDown={event => this.props.onKeyDown(event, this.calendarRef, day - 1)}
											aria-label={ariaLabel}
											{...buttonProps}
										>
											{day}
										</button>
									</td>
								);
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
	startDate: PropTypes.instanceOf(Date),
	endDate: PropTypes.instanceOf(Date),
	isDisabledChecker: PropTypes.func,
	onKeyDown: PropTypes.func.isRequired,
	t: PropTypes.func,
	goToPreviousMonth: PropTypes.func.isRequired,
	goToNextMonth: PropTypes.func.isRequired,
};

DatePicker.defaultProps = {
	t: getDefaultT(),
};

export default withCalendarGesture(DatePicker);
