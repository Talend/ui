import React from 'react';
import PropTypes from 'prop-types';
import theme from './DateTimePicker.scss';
import DateTimeView from '../views/DateTimeView';
import MonthYearView from '../views/MonthYearView';

class DateTimePicker extends React.Component {

	constructor(props) {
		super(props);

		const now = new Date();

		this.state = {
			isDateTimeView: true,
			calendar: {
				monthIndex: now.getMonth(),
				year: now.getFullYear(),
			},
		};

		this.setDateTimeView = this.setView.bind(this, true);
		this.setMonthYearView = this.setView.bind(this, false);
		this.onSelectCalendarMonth = this.onSelectCalendarMonth.bind(this);
		this.onSelectCalendarYear = this.onSelectCalendarYear.bind(this);
		this.onSelectCalendarMonthYear = this.onSelectCalendarMonthYear.bind(this);
		this.onSelectDate = this.onSelectDate.bind(this);
		this.onSelectTime = this.onSelectTime.bind(this);
	}

	onSelectDate(selectedDate) {
		this.setState({ selectedDate });
	}

	onSelectTime(selectedTime) {
		this.setState({ selectedTime });
	}

	onSelectCalendarMonthYear(newCalendar) {
		this.setState(previousState => ({
			calendar: {
				...previousState.calendar,
				...newCalendar,
			},
		}));
	}

	onSelectCalendarMonth(monthIndex) {
		this.onSelectCalendarMonthYear({ monthIndex });
	}

	onSelectCalendarYear(year) {
		this.onSelectCalendarMonthYear({ year });
	}

	setView(isDateTimeView) {
		this.setState({ isDateTimeView });
	}

	render() {
		let viewElement;

		if (this.state.isDateTimeView) {
			viewElement = (<DateTimeView
				onClickTitle={this.setMonthYearView}
				calendar={this.state.calendar}
				onSelectMonthYear={this.onSelectCalendarMonthYear}
				onSelectDate={this.onSelectDate}
				selectedDate={this.state.selectedDate}
				onSelectTime={this.onSelectTime}
				selectedTime={this.state.selectedTime}
			/>);
		} else {
			viewElement = (<MonthYearView
				onClickBack={this.setDateTimeView}
				selectedMonthIndex={this.state.calendar.monthIndex}
				selectedYear={this.state.calendar.year}
				onSelectMonth={this.onSelectCalendarMonth}
				onSelectYear={this.onSelectCalendarYear}
			/>);
		}

		return (
			<div className={theme.container}>
				{viewElement}
			</div>
		);
	}
}

DateTimePicker.propTypes = {
};

export default DateTimePicker;
