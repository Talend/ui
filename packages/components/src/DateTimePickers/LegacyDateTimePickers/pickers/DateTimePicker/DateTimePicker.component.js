import { Component } from 'react';
import PropTypes from 'prop-types';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import startOfDay from 'date-fns/startOfDay';
import classNames from 'classnames';

import theme from './DateTimePicker.module.scss';
import DateTimeView from '../../views/DateTimeView';
import MonthYearView from '../../views/MonthYearView';
import { focus } from '@talend/react-a11y';
import Action from '../../../../Actions/Action/Action.component';
import getDefaultT from '../../../../translate';

class DateTimePicker extends Component {
	constructor(props) {
		super(props);

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
		this.onClickToday = this.onClickToday.bind(this);
	}

	componentDidMount() {
		if (this.props.manageFocus) {
			this.pickerRef.addEventListener('focusin', this.allowFocus);
			this.pickerRef.addEventListener('focusout', this.disallowFocus);
		}
	}

	componentDidUpdate(prevProps) {
		const newSelectedDate = this.props.selection.date;
		const newSelectedTime = this.props.selection.time;
		const datePropsHasChanged = prevProps.selection.date !== newSelectedDate;
		const timePropsHasChanged = prevProps.selection.time !== newSelectedTime;
		const needToUpdateDate = datePropsHasChanged && newSelectedDate !== this.state.selectedDate;
		const needToUpdateTime = timePropsHasChanged && newSelectedTime !== this.state.selectedTime;

		if (!needToUpdateDate && !needToUpdateTime) {
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

	onClickToday(event) {
		const now = new Date();
		if (!this.state.isDateTimeView) {
			this.onSelectCalendarYear(event, getYear(now));
			this.onSelectCalendarMonth(event, getMonth(now));
			this.setView(true);
		}
		this.onSelectDate(event, startOfDay(now));
	}

	setAllowFocus(value) {
		this.setState({ allowFocus: value });
	}

	setView(isDateTimeView) {
		this.setState({ isDateTimeView }, () => {
			focus.focusOnCalendar(this.pickerRef);
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

		if (this.state.isDateTimeView) {
			viewElement = (
				<DateTimeView
					allowFocus={this.state.allowFocus}
					calendar={this.state.calendar}
					onSelectDate={this.onSelectDate}
					onSelectMonthYear={this.onSelectCalendarMonthYear}
					onSelectTime={this.onSelectTime}
					onTitleClick={this.setMonthYearView}
					selectedDate={this.state.selectedDate}
					selectedTime={this.state.selectedTime}
					useSeconds={this.props.useSeconds}
					useTime={this.props.useTime}
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
				// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
				tabIndex={this.state.allowFocus ? 0 : -1}
				aria-label="Date picker"
			>
				{viewElement}
				<div
					className={classNames(theme.footer, {
						[theme['date-padding']]: this.state.isDateTimeView,
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
					/>
				</div>
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
	 * Display the seconds
	 */
	useSeconds: PropTypes.bool,
	/**
	 * Display time picker
	 */
	useTime: PropTypes.bool,
	/**
	 * Timezone is UTC
	 */
	useUTC: PropTypes.bool,

	t: PropTypes.func,
};

DateTimePicker.defaultProps = {
	t: getDefaultT(),
	selection: {},
};

export default DateTimePicker;
