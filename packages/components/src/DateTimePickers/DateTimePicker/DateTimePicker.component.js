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
			isDateTimeView: true,
			currentCalendar: Immutable.Map({
				monthIndex: now.getMonth(),
				year: now.getFullYear(),
			}),
		};

		this.setDateTimeView = this.setView.bind(this, true);
		this.setMonthYearView = this.setView.bind(this, false);
		this.onMonthSelected = this.onMonthSelected.bind(this);
		this.onYearSelected = this.onYearSelected.bind(this);
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

	setView(isDateTimeView) {
		this.setState({ isDateTimeView });
	}

	render() {
		let viewElement;

		if (this.state.isDateTimeView) {
			viewElement = (<DateTimeView
				onTitleClick={this.setMonthYearView}
				monthIndexSelected={this.state.currentCalendar.get('monthIndex')}
				yearSelected={this.state.currentCalendar.get('year')}
				onMonthSelected={this.onMonthSelected}
				onYearSelected={this.onYearSelected}
			/>);
		} else {
			viewElement = (<MonthYearView
				onBackClick={this.setDateTimeView}
				monthIndexSelected={this.state.currentCalendar.get('monthIndex')}
				yearSelected={this.state.currentCalendar.get('year')}
				onMonthSelected={this.onMonthSelected}
				onYearSelected={this.onYearSelected}
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
