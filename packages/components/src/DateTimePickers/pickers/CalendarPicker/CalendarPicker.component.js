import React from 'react';
import PropTypes from 'prop-types';
import getMonth from 'date-fns/get_month';
import getYear from 'date-fns/get_year';
import startOfDay from 'date-fns/start_of_day';
import classNames from 'classnames';

import theme from './CalendarPicker.scss';
import DateView from '../../views/DateView';
import MonthYearView from '../../views/MonthYearView';
import { focusOnCalendar } from '../../../Gesture/withCalendarGesture';
import Action from '../../../Actions/Action/Action.component';
import getDefaultT from '../../../translate';

class CalendarPicker extends React.Component {
	constructor(props) {
		super(props);

		const { selectedDate, startDate, endDate, from, to } = props;

		let initialCalendarDate = selectedDate;
		if (initialCalendarDate === undefined) {
			if (from && startDate) {
				initialCalendarDate = startDate;
			} else if (to && endDate) {
				initialCalendarDate = endDate;
			} else {
				initialCalendarDate = new Date();
			}
		}

		this.state = {
			isDateView: true,
			calendar: {
				monthIndex: getMonth(initialCalendarDate),
				year: getYear(initialCalendarDate),
			},
			selectedDate,
			allowFocus: !props.manageFocus,
		};

		this.onSelectCalendarMonth = this.onSelectCalendarMonth.bind(this);
		this.onSelectCalendarYear = this.onSelectCalendarYear.bind(this);
		this.onSelectCalendarMonthYear = this.onSelectCalendarMonthYear.bind(this);
		this.onSelectDate = this.onSelectDate.bind(this);

		this.allowFocus = this.setAllowFocus.bind(this, true);
		this.disallowFocus = this.setAllowFocus.bind(this, false);
		this.setDateView = this.setView.bind(this, true);
		this.setMonthYearView = this.setView.bind(this, false);
		this.onClickToday = this.onClickToday.bind(this);
	}

	componentDidMount() {
		if (this.props.manageFocus) {
			this.pickerRef.addEventListener('focusin', this.allowFocus);
			this.pickerRef.addEventListener('focusout', this.disallowFocus);
		}
	}

	componentWillReceiveProps(nextProps) {
		const newSelectedDate = nextProps.selectedDate;
		const needToUpdateDate = newSelectedDate !== this.state.selectedDate;

		if (!needToUpdateDate) {
			return;
		}

		const newState = {
			selectedDate: newSelectedDate,
		};
		if (needToUpdateDate && newSelectedDate) {
			newState.calendar = {
				monthIndex: getMonth(newSelectedDate),
				year: getYear(newSelectedDate),
			};
		}

		this.setState(newState);
	}

	componentWillUnmount() {
		if (this.props.manageFocus) {
			this.pickerRef.removeEventListener('focusin', this.allowFocus);
			this.pickerRef.removeEventListener('focusout', this.disallowFocus);
		}
	}

	onSelectDate(event, selectedDate) {
		event.persist();
		this.setState({ selectedDate }, () => {
			this.submit(event);
		});
	}

	onSelectCalendarMonthYear(newCalendar, callback) {
		this.setState(
			previousState => ({
				calendar: {
					...previousState.calendar,
					...newCalendar,
				},
			}),
			callback,
		);
	}

	onSelectCalendarMonth(event, monthIndex) {
		this.onSelectCalendarMonthYear({ monthIndex });
	}

	onSelectCalendarYear(event, year) {
		this.onSelectCalendarMonthYear({ year });
	}

	onClickToday(event) {
		const now = new Date();
		if (!this.state.isDateView) {
			this.onSelectCalendarYear(event, getYear(now));
			this.onSelectCalendarMonth(event, getMonth(now));
			this.setView(true);
		}
		this.onSelectDate(event, startOfDay(now));
	}

	setAllowFocus(value) {
		this.setState({ allowFocus: value });
	}

	setView(isDateView) {
		this.setState({ isDateView }, () => {
			focusOnCalendar(this.pickerRef);
		});
	}

	submit(event, field) {
		this.props.onSubmit(event, {
			date: this.state.selectedDate,
			field,
		});
	}

	render() {
		let viewElement;

		if (this.state.isDateView) {
			viewElement = (
				<DateView
					allowFocus={this.state.allowFocus}
					calendar={this.state.calendar}
					onSelectDate={this.onSelectDate}
					onSelectMonthYear={this.onSelectCalendarMonthYear}
					onTitleClick={this.setMonthYearView}
					selectedDate={this.state.selectedDate}
					startDate={this.props.startDate}
					endDate={this.props.endDate}
				/>
			);
		} else {
			viewElement = (
				<MonthYearView
					allowFocus={this.state.allowFocus}
					onBackClick={this.setDateView}
					onSelectMonth={this.onSelectCalendarMonth}
					onSelectYear={this.onSelectCalendarYear}
					selectedMonthIndex={this.state.calendar.monthIndex}
					selectedYear={this.state.calendar.year}
				/>
			);
		}

		const isTodayFocusable =
			this.pickerRef && this.pickerRef.contains(document.activeElement) ? 0 : -1;

		return (
			<div
				className={theme.container}
				ref={ref => {
					this.pickerRef = ref;
				}}
				tabIndex={this.state.allowFocus ? 0 : -1}
				aria-label="Date picker"
			>
				{viewElement}
				<div
					className={classNames(theme.footer, {
						[theme['date-padding']]: this.state.isDateView,
					})}
				>
					<Action
						label={this.props.t('DATEPICKER_TODAY', {
							defaultValue: 'Today',
						})}
						aria-label={this.props.t('DATEPICKER_PICK_TODAY', {
							defaultValue: 'Pick Today',
						})}
						onClick={this.onClickToday}
						className="btn-tertiary btn-info"
						tabIndex={isTodayFocusable}
					/>
				</div>
			</div>
		);
	}
}

CalendarPicker.propTypes = {
	/**
	 * By default, element in picker are focusable. So it is usable as is.
	 * But when we want to disable focus to not interact with a form flow,
	 * this option must be turned on.
	 * It allows to disable focus, and activate it when the focus is set in the picker.
	 */
	manageFocus: PropTypes.bool,
	/**
	 * Current selected date
	 */
	selectedDate: PropTypes.instanceOf(Date),
	/**
	 * start day of date range
	 */
	startDate: PropTypes.instanceOf(Date),
	/**
	 * end day of date range
	 */
	endDate: PropTypes.instanceOf(Date),
	/**
	 * field for picking date range start
	 */
	from: PropTypes.bool,
	/**
	 * field for picking date range end
	 */
	to: PropTypes.bool,
	/**
	 * Callback triggered when date is selected
	 */
	onSubmit: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

CalendarPicker.defaultProps = {
	t: getDefaultT(),
};

export default CalendarPicker;
