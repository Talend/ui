import React from 'react';
import PropTypes from 'prop-types';
import theme from './DateTimePicker.scss';
import DateTimeView from '../views/DateTimeView';
import MonthYearView from '../views/MonthYearView';

class DateTimePicker extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isCalendarView: true,
		};

		this.onDateTimeViewTitleClick = this.onDateTimeViewTitleClick.bind(this);
		this.onMonthYearViewBackClick = this.onMonthYearViewBackClick.bind(this);


		this.dateTimeView = (
			<DateTimeView
				onTitleClick={this.onDateTimeViewTitleClick}
			/>
		);

		this.monthYearView = (
			<MonthYearView
				onBackClick={this.onMonthYearViewBackClick}
			/>
		);
	}

	onDateTimeViewTitleClick() {
		this.setState({
			isCalendarView: false,
		});
	}

	onMonthYearViewBackClick() {
		this.setState({
			isCalendarView: true,
		});
	}

	render() {
		const viewComponent = this.state.isCalendarView
			? this.dateTimeView
			: this.monthYearView;

		return (
			<div className={theme.container}>
				{viewComponent}
			</div>
		);
	}
}

DateTimePicker.propTypes = {
};

export default DateTimePicker;
