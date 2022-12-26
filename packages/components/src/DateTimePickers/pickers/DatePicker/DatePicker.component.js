import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import memoize from 'lodash/memoize';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import isToday from 'date-fns/isToday';
import isWithinRange from 'date-fns/isWithinInterval';
import format from 'date-fns/format';
import getDate from 'date-fns/getDate';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import setMonth from 'date-fns/setMonth';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';

import theme from './DatePicker.module.scss';
import { buildDayNames, buildWeeks, getPickerLocale } from '../../generator';
import { Gesture } from '@talend/react-a11y';
import getDefaultT from '../../../translate';

const getDayNames = memoize(buildDayNames);

class DatePicker extends PureComponent {
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

	isDateInCurrentCalendar(date) {
		const { calendar } = this.props;
		const { year, monthIndex } = calendar;
		const weeks = this.getWeeks(year, monthIndex, 1);
		return isWithinRange(date, { start: weeks[0][0], end: weeks[5][6] });
	}

	isDateWithinRange(date) {
		const { selectedDate, startDate, endDate } = this.props;
		if (startDate && isAfter(selectedDate, startDate)) {
			return isWithinRange(date, { start: startOfDay(startDate), end: selectedDate });
		} else if (endDate && isBefore(selectedDate, endDate)) {
			return isWithinRange(date, { start: selectedDate, end: endDate });
		}
		return false;
	}

	isStartDate(date) {
		const { selectedDate, startDate, endDate } = this.props;
		if (startDate) {
			return isSameDay(date, startDate);
		} else if (endDate) {
			return isSameDay(date, selectedDate);
		}
		return false;
	}

	isEndDate(date) {
		const { selectedDate, endDate, startDate } = this.props;
		if (startDate) {
			return isSameDay(date, selectedDate);
		} else if (endDate) {
			return isSameDay(date, endDate);
		}
		return false;
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
		const { calendar, t } = this.props;
		const { year, monthIndex } = calendar;
		const pickerLocale = getPickerLocale(t);

		const weeks = this.getWeeks(year, monthIndex, 1);
		const dayNames = getDayNames(undefined, this.props.t);
		const selectedInCurrentCalendar = this.isSelectedInCurrentCalendar();

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
								const isStart = this.isStartDate(date);
								const isEnd = this.isEndDate(date);
								const isInRange = this.isDateWithinRange(date);

								if (isInRange) {
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
										[theme.selected]: selected || isStart || isEnd,
										[theme.today]: today,
										[theme['not-current-month']]: !this.isCurrentMonth(date),
									},
									'tc-date-picker-day',
								);

								const tdProps = {
									className: classNames(theme['calendar-col'], cellTheme),
								};

								let ariaLabel = format(date, 'dddd DD MMMM YYYY', pickerLocale);
								if (isInRange) {
									if (isStart) {
										ariaLabel = t('DATEPICKER_DAY_RANGE_START', {
											defaultValue: 'Range: start date, {{date}}',
											date: ariaLabel,
										});
									} else if (isEnd) {
										ariaLabel = t('DATEPICKER_DAY_RANGE_END', {
											defaultValue: 'Range: end date, {{date}}',
											date: ariaLabel,
										});
									} else {
										ariaLabel = t('DATEPICKER_DAY_WITHIN_RANGE', {
											defaultValue: 'Included in range, {{date}}',
											date: ariaLabel,
										});
									}
								}
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
								if (disabled) {
									ariaLabel = t('DATEPICKER_DAY_INVALID', {
										defaultValue: 'Date is not allowed, {{date}}',
										date: ariaLabel,
									});
								}

								const buttonProps = this.isCurrentMonth(date) ? { 'data-value': day } : undefined;

								return (
									<td key={j} {...tdProps}>
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

export default Gesture.withCalendarGesture(DatePicker);
