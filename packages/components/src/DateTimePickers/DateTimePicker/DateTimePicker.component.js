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
			selectedDate: undefined,
		};

		this.setDateTimeView = this.setView.bind(this, true);
		this.setMonthYearView = this.setView.bind(this, false);
		this.onSelectCalendarMonth = this.onSelectCalendarMonth.bind(this);
		this.onSelectCalendarYear = this.onSelectCalendarYear.bind(this);
		this.onSelectCalendarMonthYear = this.onSelectCalendarMonthYear.bind(this);
		this.onSelectDate = this.onSelectDate.bind(this);
	}

	onSelectDate(selectedDate) {
		this.setState({ selectedDate });
	}

	onSelectCalendarMonthYear(newCalendar) {
		this.setState(previousState => ({
			calendar: {
				...previousState.calendar,
				...newCalendar,
			},
		}));
	}

	onSelectCalendarMonth(calendarMonthIndex) {
		this.onSelectCalendarMonthYear({
			monthIndex: calendarMonthIndex,
		});
	}

	onSelectCalendarYear(calendarYear) {
		this.onSelectCalendarMonthYear({
			year: calendarYear,
		});
	}

	setView(isDateTimeView) {
		this.setState({ isDateTimeView });
	}

	render() {
		let viewElement;

		if (this.state.isDateTimeView) {
			viewElement = (<DateTimeView
				onClickTitle={this.setMonthYearView}
				selectedMonthIndex={this.state.calendar.monthIndex}
				selectedYear={this.state.calendar.year}
				onSelectMonthYear={this.onSelectCalendarMonthYear}
				onSelectDate={this.onSelectDate}
				selectedDate={this.state.selectedDate}
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
