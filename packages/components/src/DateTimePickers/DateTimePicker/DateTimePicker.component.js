import React from 'react';
import PropTypes from 'prop-types';
import getMonth from 'date-fns/get_month';
import getYear from 'date-fns/get_year';

import theme from './DateTimePicker.scss';
import DateTimeView from '../views/DateTimeView';
import MonthYearView from '../views/MonthYearView';

const warnOnce = {};

class DateTimePicker extends React.Component {
	constructor(props) {
		super(props);

		if (!warnOnce.unstable) {
			// eslint-disable-next-line
			console.warn(
				"UNSTABLE WARNING: The 'DateTimePicker' and all the sub components aren't ready to be used in Apps. Code can (will) change outside the release process until it's ready.",
			);
			warnOnce.unstable = true;
		}

		const selectedDate = props.selection.date;
		const selectedTime = props.selection.time;

		const initialCalendarDate = selectedDate === undefined ? new Date() : selectedDate;

		this.state = {
			isDateTimeView: true,
			calendar: {
				monthIndex: getMonth(initialCalendarDate),
				year: getYear(initialCalendarDate),
			},
			selectedDate,
			selectedTime,
			allowFocus: false,
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
		const selectionPropNotUpdated = this.props.selection === nextProps.selection;

		if (selectionPropNotUpdated) {
			return;
		}

		const newSelectedDate = nextProps.selection.date;
		const newSelectedTime = nextProps.selection.time;
		const needToUpdateDate = newSelectedDate !== this.state.selectedDate;
		const needToUpdateTime = newSelectedTime !== this.state.selectedTime;
		const noNeedToUpdateState = !needToUpdateDate && !needToUpdateTime;

		if (noNeedToUpdateState) {
			return;
		}

		const needToUpdateCalendar = needToUpdateDate && newSelectedDate !== undefined;

		const newState = {};

		if (needToUpdateDate) {
			newState.selectedDate = newSelectedDate;
		}

		if (needToUpdateTime) {
			newState.selectedTime = newSelectedTime;
		}

		if (needToUpdateCalendar) {
			newState.calendar = {
				monthIndex: getMonth(newSelectedDate),
				year: getYear(newSelectedDate),
			};
		}

		this.setState(newState);
	}

	componentDidMount() {
		this.ref.addEventListener('focusin', event => {
			console.log('focusin', event.target);
			this.setState({ allowFocus: true });
		});
		this.ref.addEventListener('focusout', event => {
			console.log('focusout', event.target);
			this.setState({ allowFocus: false });
		});
	}

	onSelectDate(event, selectedDate) {
		event.persist();
		this.setState({ selectedDate }, () => {
			this.trySubmit(event);
		});
	}

	onSelectTime(event, selectedTime) {
		event.persist();
		this.setState({ selectedTime }, () => {
			this.trySubmit(event);
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

	setView(isDateTimeView) {
		this.setState({ isDateTimeView });
	}

	trySubmit(event) {
		if (this.state.selectedDate !== undefined && this.state.selectedTime !== undefined) {
			this.props.onSubmit(event, {
				date: this.state.selectedDate,
				time: this.state.selectedTime,
			});
		}
	}

	render() {
		let viewElement;

		if (this.state.isDateTimeView) {
			viewElement = (
				<DateTimeView
					onClickTitle={this.setMonthYearView}
					calendar={this.state.calendar}
					onSelectMonthYear={this.onSelectCalendarMonthYear}
					onSelectDate={this.onSelectDate}
					selectedDate={this.state.selectedDate}
					onSelectTime={this.onSelectTime}
					selectedTime={this.state.selectedTime}
					allowFocus={this.state.allowFocus}
				/>
			);
		} else {
			viewElement = (
				<MonthYearView
					onClickBack={this.setDateTimeView}
					selectedMonthIndex={this.state.calendar.monthIndex}
					selectedYear={this.state.calendar.year}
					onSelectMonth={this.onSelectCalendarMonth}
					onSelectYear={this.onSelectCalendarYear}
				/>
			);
		}

		return (
			<div
				className={theme.container}
				ref={ref => {
					this.ref = ref;
				}}
			>
				{viewElement}
			</div>
		);
	}
}

DateTimePicker.propTypes = {
	selection: PropTypes.shape({
		date: PropTypes.instanceOf(Date),
		time: PropTypes.number,
	}),
	onSubmit: PropTypes.func.isRequired,
};

DateTimePicker.defaultProps = {
	selection: {},
};

export default DateTimePicker;
