import React from 'react';
import PropTypes from 'prop-types';
import getMonth from 'date-fns/get_month';
import getYear from 'date-fns/get_year';

import theme from './DateTimePicker.scss';
import DateTimeView from '../views/DateTimeView';
import MonthYearView from '../views/MonthYearView';

class DateTimePicker extends React.Component {

	constructor(props) {
		super(props);

		const initialCalendarDate = props.selectedDate === undefined
			? new Date()
			: props.selectedDate;

		this.state = {
			isDateTimeView: true,
			calendar: {
				monthIndex: getMonth(initialCalendarDate),
				year: getYear(initialCalendarDate),
			},
			selectedDate: props.selectedDate,
			selectedTime: props.selectedTime,
		};

		this.setDateTimeView = this.setView.bind(this, true);
		this.setMonthYearView = this.setView.bind(this, false);
		this.onSelectCalendarMonth = this.onSelectCalendarMonth.bind(this);
		this.onSelectCalendarYear = this.onSelectCalendarYear.bind(this);
		this.onSelectCalendarMonthYear = this.onSelectCalendarMonthYear.bind(this);
		this.onSelectDate = this.onSelectDate.bind(this);
		this.onSelectTime = this.onSelectTime.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const isSelectedDateUpdated = this.props.selectedDate !== nextProps.selectedDate;
		const isSelectedTimeUpdated = this.props.selectedTime !== nextProps.selectedTime;

		if (isSelectedDateUpdated || isSelectedTimeUpdated) {
			const canUpdateCalendar = isSelectedDateUpdated && nextProps.selectedDate !== undefined;
			this.setState({
				...(isSelectedDateUpdated && { selectedDate: nextProps.selectedDate }),
				...(isSelectedTimeUpdated && { selectedTime: nextProps.selectedTime }),
				...(canUpdateCalendar && {
					calendar: {
						monthIndex: getMonth(nextProps.selectedDate),
						year: getYear(nextProps.selectedDate),
					},
				}),
			});
		}
	}

	onSelectDate(selectedDate) {
		this.setState({ selectedDate }, () => {
			this.trySubmit();
		});
	}

	onSelectTime(selectedTime) {
		this.setState({ selectedTime }, () => {
			this.trySubmit();
		});
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

	trySubmit() {
		if (this.state.selectedDate !== undefined &&
			this.state.selectedTime !== undefined) {
			this.submit();
		}
	}

	submit() {
		this.props.onSubmit({
			date: this.state.selectedDate,
			time: this.state.selectedTime,
		});
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
	selectedDate: PropTypes.instanceOf(Date),
	selectedTime: PropTypes.number,
	onSubmit: PropTypes.func.isRequired,
};

export default DateTimePicker;
