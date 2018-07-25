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
import twoDigits from '../utils/twoDigits';
import DateTimePicker from '../DateTimePicker';
import theme from './InputDateTimePicker.scss';

const splitDateAndTimeRegex = new RegExp(/^(.*),(.*)$/);
const dateRegex = new RegExp(/^\s*([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})\s*$/);
const timeRegex = new RegExp(/^\s*([0-9]{1,2}):([0-9]{2})\s*$/);

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

	const dateText = `${twoDigits(day)}/${twoDigits(month)}/${year}`;

	if (time === undefined) {
		return dateText;
	}

	const hours = Math.floor(time / 60);
	const minutes = time % 60;

	const timeText = `, ${twoDigits(hours)}:${twoDigits(minutes)}`;

	return dateText + timeText;
}


class InputDateTimePicker extends React.Component {
	static propTypes = {
		selectedDateTime: PropTypes.instanceOf(Date),
		onChange: PropTypes.func.isRequired,
		inputProps: PropTypes.object,
	};

	constructor(props) {
		super(props);

		this.state = (() => {
			const selectedDateTime = this.props.selectedDateTime;
			if (selectedDateTime !== undefined) {
				const date = selectedDateTime;
				const hours = getHours(selectedDateTime);
				const minutes = getMinutes(selectedDateTime);
				const time = hoursAndMinutesToTime(hours, minutes);
				return {
					date,
					time,
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
		const text = event.target.value;

		const splitMatches = text.match(splitDateAndTimeRegex);

		if (!splitMatches) {
			console.warn('DATETIME - INCORRECT FORMAT:', text);
			this.updateDateTime(undefined, undefined, text);
			return;
		}

		const [
			,
			dateText,
			timeText,
		] = splitMatches;

		const date = (() => {
			const dateMatches = dateText.match(dateRegex);
			if (!dateMatches) {
				console.warn('DATE - INCORRECT FORMAT:', dateText);
				return undefined;
			}

			const [
				,
				dayString,
				monthString,
				yearString,
			] = dateMatches;

			const day = parseInt(dayString, 10);
			const month = parseInt(monthString, 10);
			const monthIndex = month - 1;
			const year = parseInt(yearString, 10);

			if (month === 0 || month > 12) {
				console.warn('DATE - INCORRECT MONTH NUMBER:', dateText);
				return undefined;
			}

			if (day === 0) {
				console.warn('DATE - INCORRECT DAY NUMBER:', dateText);
				return undefined;
			}

			const monthDate = new Date(year, monthIndex);
			const lastDateOfMonth = lastDayOfMonth(monthDate);

			if (day > getDate(lastDateOfMonth)) {
				console.warn('DATE - INCORRECT DAY NUMBER RELATIVE TO MONTH:', dateText);
				return undefined;
			}

			const dateValidated = setDate(monthDate, day);

			return dateValidated;
		})();


		const time = (() => {
			const timeMatches = timeText.match(timeRegex);
			if (!timeMatches) {
				console.warn('TIME - INCORRECT FORMAT:', timeText);
				return undefined;
			}

			const [
				,
				hoursString,
				minutesString,
			] = timeMatches;

			const hours = parseInt(hoursString, 10);

			if (hours >= 24) {
				console.warn('TIME - INCORRECT HOUR NUMBER:', timeText);
				return undefined;
			}

			const minutes = parseInt(minutesString, 10);

			if (minutes >= 60) {
				console.warn('TIME - INCORRECT MINUTES NUMBER:', timeText);
				return undefined;
			}

			return hoursAndMinutesToTime(hours, minutes);
		})();

		this.updateDateTime(date, time, text);
	}

	updateDateTime(date, time, textInput = getTextDate(date, time)) {
		this.setState({
			date,
			time,
			textInput,
		});

		const fullDate = (() => {
			if (date === undefined || time === undefined) {
				return undefined;
			}

			return setMinutes(date, time);
		})();
		this.props.onChange(fullDate);
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
