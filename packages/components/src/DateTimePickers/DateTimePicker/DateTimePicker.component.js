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
			currentCalendar: {
				monthIndex: now.getMonth(),
				year: now.getFullYear(),
			},
			selectedDate: undefined,
		};

		this.setDateTimeView = this.setView.bind(this, true);
		this.setMonthYearView = this.setView.bind(this, false);
		this.onSelectMonth = this.onSelectMonth.bind(this);
		this.onSelectYear = this.onSelectYear.bind(this);
		this.onSelectMonthYear = this.onSelectMonthYear.bind(this);
		this.onSelectDate = this.onSelectDate.bind(this);
	}

	onSelectDate(selectedDate) {
		this.setState({ selectedDate });
	}

	onSelectMonthYear(newCalendar) {
		this.setState(previousState => ({
			currentCalendar: {
				...previousState.currentCalendar,
				...newCalendar,
			},
		}));
	}

	onSelectMonth(monthIndex) {
		this.onSelectMonthYear({ monthIndex });
	}

	onSelectYear(year) {
		this.onSelectMonthYear({ year });
	}

	setView(isDateTimeView) {
		this.setState({ isDateTimeView });
	}

	render() {
		let viewElement;

		if (this.state.isDateTimeView) {
			viewElement = (<DateTimeView
				onClickTitle={this.setMonthYearView}
				selectedMonthIndex={this.state.currentCalendar.monthIndex}
				selectedYear={this.state.currentCalendar.year}
				onSelectMonthYear={this.onSelectMonthYear}
				onSelectDate={this.onSelectDate}
				selectedDate={this.state.selectedDate}
			/>);
		} else {
			viewElement = (<MonthYearView
				onClickBack={this.setDateTimeView}
				selectedMonthIndex={this.state.currentCalendar.monthIndex}
				selectedYear={this.state.currentCalendar.year}
				onSelectMonth={this.onSelectMonth}
				onSelectYear={this.onSelectYear}
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
