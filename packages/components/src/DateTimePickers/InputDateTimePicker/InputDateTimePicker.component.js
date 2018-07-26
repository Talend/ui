import React from 'react';
import PropTypes from 'prop-types';

import getMinutes from 'date-fns/get_minutes';
import getHours from 'date-fns/get_hours';
import getDate from 'date-fns/get_date';
import getMonth from 'date-fns/get_month';
import getYear from 'date-fns/get_year';
import setDate from 'date-fns/set_date';
import setMinutes from 'date-fns/set_minutes';
import lastDayOfMonth from 'date-fns/last_day_of_month';
import isSameMinute from 'date-fns/is_same_minute';
import startOfDay from 'date-fns/start_of_day';
import startOfMinute from 'date-fns/start_of_minute';
import twoDigits from '../shared/utils/format/twoDigits';
import DateTimePicker from '../DateTimePicker';
import theme from './InputDateTimePicker.scss';

const splitPartsRegex = new RegExp(/^\s*([^\s]+?)\s+([^\s]+?)\s*$/);
const datePartRegex = new RegExp(/^\s*([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})\s*$/);
const timePartRegex = new RegExp(/^\s*([0-9]{1,2}):([0-9]{2})\s*$/);

function hoursAndMinutesToTime(hours, minutes) {
	return hours * 60 + minutes;
}

function getTextDate(date, time) {
	if (date === undefined) {
		return '';
	}

	const day = getDate(date);
	const month = getMonth(date) + 1;
	const year = getYear(date);

	const dateText = `${year}-${twoDigits(month)}-${twoDigits(day)}`;

	if (time === undefined) {
		return dateText;
	}

	const hours = Math.floor(time / 60);
	const minutes = time % 60;

	const timeText = `${twoDigits(hours)}:${twoDigits(minutes)}`;

	return `${dateText} ${timeText}`;
}


class InputDateTimePicker extends React.Component {
	static propTypes = {
		selectedDateTime: PropTypes.instanceOf(Date),
		onChange: PropTypes.func.isRequired,
		onError: PropTypes.func.isRequired,
		inputProps: PropTypes.object,
	};

	constructor(props) {
		super(props);

		this.state = (() => {
			const selectedDateTime = this.props.selectedDateTime;
			if (selectedDateTime !== undefined) {
				const date = startOfDay(selectedDateTime);
				const hours = getHours(selectedDateTime);
				const minutes = getMinutes(selectedDateTime);
				const time = hoursAndMinutesToTime(hours, minutes);
				const fullDate = startOfMinute(selectedDateTime);

				return {
					date,
					time,
					lastFullDate: fullDate,
					textInput: getTextDate(date, time),
				};
			}

			return {
				textInput: '',
			};
		})();

		this.onChangeInput = this.onChangeInput.bind(this);
		this.onSubmitPicker = this.onSubmitPicker.bind(this);
	}

	onSubmitPicker({ date, time }) {
		this.updateDateTime(date, time);
	}

	onChangeInput(event) {
		const fullString = event.target.value;

		const splitMatches = fullString.match(splitPartsRegex);

		const canParseFullString = splitMatches !== null;

		const [date, errMsgDate] = (() => {
			const stringToParse = canParseFullString
				? splitMatches[1]
				: fullString;

			const dateMatches = stringToParse.match(datePartRegex);

			if (!dateMatches) {
				const errMsg = 'DATE - INCORRECT FORMAT';
				return [undefined, errMsg];
			}

			const yearString = dateMatches[1];
			const monthString = dateMatches[2];
			const dayString = dateMatches[3];

			const day = parseInt(dayString, 10);
			const month = parseInt(monthString, 10);
			const monthIndex = month - 1;
			const year = parseInt(yearString, 10);

			if (month === 0 || month > 12) {
				const errMsg = 'DATE - INCORRECT MONTH NUMBER';
				return [undefined, errMsg];
			}

			if (day === 0) {
				const errMsg = 'DATE - INCORRECT DAY NUMBER';
				return [undefined, errMsg];
			}

			const monthDate = new Date(year, monthIndex);
			const lastDateOfMonth = lastDayOfMonth(monthDate);

			if (day > getDate(lastDateOfMonth)) {
				const errMsg = 'DATE - INCORRECT DAY NUMBER RELATIVE TO MONTH';
				return [undefined, errMsg];
			}

			const dateValidated = setDate(monthDate, day);

			return [dateValidated];
		})();


		const [time, errMsgTime] = (() => {
			const stringToParse = canParseFullString
				? splitMatches[2]
				: fullString;

			const timeMatches = stringToParse.match(timePartRegex);

			if (!timeMatches) {
				const errMsg = 'TIME - INCORRECT FORMAT';
				return [undefined, errMsg];
			}

			const hoursString = timeMatches[1];
			const minutesString = timeMatches[2];

			const hours = parseInt(hoursString, 10);

			if (hours >= 24) {
				const errMsg = 'TIME - INCORRECT HOUR NUMBER';
				return [undefined, errMsg];
			}

			const minutes = parseInt(minutesString, 10);

			if (minutes >= 60) {
				const errMsg = 'TIME - INCORRECT MINUTES NUMBER';
				return [undefined, errMsg];
			}

			const timeValidated = hoursAndMinutesToTime(hours, minutes);

			return [timeValidated];
		})();

		const errMsg = canParseFullString
			? errMsgDate || errMsgTime
			: 'DATETIME - INCORRECT FORMAT';

		this.updateDateTime(date, time, fullString, errMsg);
	}

	updateDateTime(date, time, textInput = getTextDate(date, time), errorMsg) {
		const fullDate = (() => {
			if (date === undefined || time === undefined) {
				return undefined;
			}

			return setMinutes(date, time);
		})();

		const fullDateUpdated = fullDate !== this.state.lastFullDate
								&& !isSameMinute(fullDate, this.state.lastFullDate);

		if (fullDateUpdated) {
			this.props.onChange(fullDate);
		}

		const errorUpdated = errorMsg !== this.state.lastErrMsg;
		if (errorUpdated) {
			this.props.onError(errorMsg);
		}

		this.setState({
			date,
			time,
			textInput,
			lastFullDate: fullDate,
			lastErrMsg: errorMsg,
		});
	}

	render() {
		const {
			date,
			time,
			textInput,
		} = this.state;

		return (
			<div>
				<input
					{...this.props.inputProps}
					type="text"
					placeholder="DD/MM/YYYY, hh:mm"
					value={textInput}
					onChange={this.onChangeInput}
				/>
				<div className={theme.dropdown}>
					<DateTimePicker
						selectedDate={date}
						selectedTime={time}
						onSubmit={this.onSubmitPicker}
					/>
				</div>
			</div>
		);
	}
}

export default InputDateTimePicker;
