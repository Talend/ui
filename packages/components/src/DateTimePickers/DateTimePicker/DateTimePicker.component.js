import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import theme from './DateTimePicker.scss';
import DateTimeView from '../views/DateTimeView';
import MonthYearView from '../views/MonthYearView';

class DateTimePicker extends React.Component {

	constructor(props) {
		super(props);

		const now = new Date();

		this.state = {
			isCalendarView: true,
			currentCalendar: Immutable.Map({
				monthIndex: now.getMonth(),
				year: now.getFullYear(),
			}),
		};

		this.onDateTimeViewTitleClick = this.onDateTimeViewTitleClick.bind(this);
		this.onMonthYearViewBackClick = this.onMonthYearViewBackClick.bind(this);
		this.onMonthSelected = this.onMonthSelected.bind(this);
		this.onYearSelected = this.onYearSelected.bind(this);
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

	onMonthSelected(monthIndex) {
		this.setState(previousState => ({
			currentCalendar: previousState.currentCalendar.merge({ monthIndex }),
		}));
	}

	onYearSelected(year) {
		this.setState(previousState => ({
			currentCalendar: previousState.currentCalendar.merge({ year }),
		}));
	}

	render() {
		const dateTimeView = (
			<DateTimeView
				onTitleClick={this.onDateTimeViewTitleClick}
				monthSelected={this.state.currentCalendar.get('monthIndex')}
				yearSelected={this.state.currentCalendar.get('year')}
				onMonthSelected={this.onMonthSelected}
				onYearSelected={this.onYearSelected}
			/>
		);

		const monthYearView = (
			<MonthYearView
				onBackClick={this.onMonthYearViewBackClick}
				monthSelected={this.state.currentCalendar.get('monthIndex')}
				yearSelected={this.state.currentCalendar.get('year')}
				onMonthSelected={this.onMonthSelected}
				onYearSelected={this.onYearSelected}
			/>
		);


		const viewComponent = this.state.isCalendarView
			? dateTimeView
			: monthYearView;

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
