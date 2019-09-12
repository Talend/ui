import React from 'react';
import PropTypes from 'prop-types';
import getMonth from 'date-fns/get_month';
import getYear from 'date-fns/get_year';

import theme from './DateTimePicker.scss';
import DateView from '../../views/DateView';
import MonthYearView from '../../views/MonthYearView';
import { focusOnCalendar } from '../../../Gesture/withCalendarGesture';

class DateTimePicker extends React.Component {
	constructor(props) {
		super(props);

		const selectedDate = props.selection.date;
		const selectedTime = props.selection.time;

		const initialCalendarDate = selectedDate === undefined ? new Date() : selectedDate;

		this.state = {
			isDateView: true,
			calendar: {
				monthIndex: getMonth(initialCalendarDate),
				year: getYear(initialCalendarDate),
			},
			selectedDate,
			selectedTime,
			allowFocus: !props.manageFocus,
		};

		this.onSelectCalendarMonth = this.onSelectCalendarMonth.bind(this);
		this.onSelectCalendarYear = this.onSelectCalendarYear.bind(this);
		this.onSelectCalendarMonthYear = this.onSelectCalendarMonthYear.bind(this);
		this.onSelectDate = this.onSelectDate.bind(this);
		this.onSelectTime = this.onSelectTime.bind(this);

		this.allowFocus = this.setAllowFocus.bind(this, true);
		this.disallowFocus = this.setAllowFocus.bind(this, false);
		this.setDateTimeView = this.setView.bind(this, true);
		this.setMonthYearView = this.setView.bind(this, false);
	}

	componentDidMount() {
		if (this.props.manageFocus) {
			this.pickerRef.addEventListener('focusin', this.allowFocus);
			this.pickerRef.addEventListener('focusout', this.disallowFocus);
		}
	}

	componentWillReceiveProps(nextProps) {
		const newSelectedDate = nextProps.selection.date;
		const newSelectedTime = nextProps.selection.time;
		const needToUpdateDate = newSelectedDate !== this.state.selectedDate;
		const needToUpdateTime = newSelectedTime !== this.state.selectedTime;
		const noNeedToUpdateState = !needToUpdateDate && !needToUpdateTime;

		if (noNeedToUpdateState) {
			return;
		}

		const newState = {
			selectedDate: newSelectedDate,
			selectedTime: newSelectedTime,
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

	onSelectTime(event, selectedTime, field) {
		event.persist();
		this.setState({ selectedTime }, () => {
			this.submit(event, field);
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
			time: this.state.selectedTime,
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
					onSelectTime={this.onSelectTime}
					onTitleClick={this.setMonthYearView}
					selectedDate={this.state.selectedDate}
					useUTC={this.props.useUTC}
				/>
			);
		} else {
			viewElement = (
				<MonthYearView
					allowFocus={this.state.allowFocus}
					onBackClick={this.setDateTimeView}
					onSelectMonth={this.onSelectCalendarMonth}
					onSelectYear={this.onSelectCalendarYear}
					selectedMonthIndex={this.state.calendar.monthIndex}
					selectedYear={this.state.calendar.year}
				/>
			);
		}

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
			</div>
		);
	}
}

DateTimePicker.propTypes = {
	/**
	 * By default, element in picker are focusable. So it is usable as is.
	 * But when we want to disable focus to not interact with a form flow,
	 * this option must be turned on.
	 * It allows to disable focus, and activate it when the focus is set in the picker.
	 */
	manageFocus: PropTypes.bool,
	/**
	 * Current selected date/time
	 */
	selection: PropTypes.shape({
		date: PropTypes.instanceOf(Date),
		time: PropTypes.shape({
			hours: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			minutes: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		}),
	}),
	/**
	 * Callback triggered when date and time are selected
	 */
	onSubmit: PropTypes.func.isRequired,
	/**
	 * Timezone is UTC
	 */
	useUTC: PropTypes.bool,
};

DateTimePicker.defaultProps = {
	selection: {},
};

export default DateTimePicker;
