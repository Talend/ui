import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import DebounceInput from 'react-debounce-input';
import getMinutes from 'date-fns/get_minutes';
import getHours from 'date-fns/get_hours';
import getDate from 'date-fns/get_date';
import setDate from 'date-fns/set_date';
import setMinutes from 'date-fns/set_minutes';
import lastDayOfMonth from 'date-fns/last_day_of_month';
import isSameMinute from 'date-fns/is_same_minute';
import startOfDay from 'date-fns/start_of_day';
import startOfMinute from 'date-fns/start_of_minute';
import format from 'date-fns/format';
import twoDigits from '../shared/utils/format/twoDigits';
import DateTimePicker from '../DateTimePicker';
import theme from './InputDateTimePicker.scss';

const DEBOUNCE_TIMEOUT = 300;

/*
 * Split the date and time parts based on the middle space
 * ex: '  whatever   other-string  ' => ['whatever', 'other-string']
 */
const splitDateAndTimePartsRegex = new RegExp(/^\s*([^\s]+?)\s+([^\s]+?)\s*$/);
/*
 * Split the date part into year, month and day
 * ex : ' 2018-2-05  ' => ['2018', '2', '05']
 */
const datePartRegex = new RegExp(/^\s*([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})\s*$/);
/*
 * Split the time part into hours and minutes
 * ex : ' 14:35  ' => ['14', '35']
 */
const timePartRegex = new RegExp(/^\s*([0-9]{1,2}):([0-9]{2})\s*$/);

function hoursAndMinutesToTime(hours, minutes) {
	return hours * 60 + minutes;
}

function getTextDate(date, time) {
	if (date === undefined) {
		return '';
	}

	const dateText = format(date, 'YYYY-MM-DD');

	if (time === undefined) {
		return dateText;
	}

	const hours = Math.floor(time / 60);
	const minutes = time % 60;

	const timeText = `${twoDigits(hours)}:${twoDigits(minutes)}`;

	return `${dateText} ${timeText}`;
}

function extractDate(strToParse) {
	const dateMatches = strToParse.match(datePartRegex);

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
}

function extractTime(strToParse) {
	const timeMatches = strToParse.match(timePartRegex);

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
}

const PROPS_TO_OMIT_FOR_INPUT = ['selectedDateTime', 'onChange', 'onError'];

class InputDateTimePicker extends React.Component {
	static propTypes = {
		selectedDateTime: PropTypes.instanceOf(Date),
		onChange: PropTypes.func,
		onError: PropTypes.func,
	};

	constructor(props) {
		super(props);

		// eslint-disable-next-line
		console.warn(
			"UNSTABLE WARNING: The 'InputDateTimePicker' and all the sub components aren't ready to be used in Apps. Code can (will) change outside the release process until it's ready.",
		);

		const selectedDateTime = this.props.selectedDateTime;
		if (selectedDateTime !== undefined) {
			const date = startOfDay(selectedDateTime);
			const hours = getHours(selectedDateTime);
			const minutes = getMinutes(selectedDateTime);
			const time = hoursAndMinutesToTime(hours, minutes);
			const fullDate = startOfMinute(selectedDateTime);

			this.state = {
				date,
				time,
				lastFullDate: fullDate,
				textInput: getTextDate(date, time),
			};
		} else {
			this.state = {
				textInput: '',
			};
		}

		this.onChangeInput = this.onChangeInput.bind(this);
		this.onSubmitPicker = this.onSubmitPicker.bind(this);
	}

	onSubmitPicker({ date, time }) {
		this.updateDateTime(date, time);
	}

	onChangeInput(event) {
		const fullString = event.target.value;
		const splitMatches = fullString.match(splitDateAndTimePartsRegex);
		const canParseFullString = splitMatches !== null;

		const dateStrToParse = canParseFullString ? splitMatches[1] : fullString;
		const [date, errMsgDate] = extractDate(dateStrToParse);

		const timeStrToParse = canParseFullString ? splitMatches[2] : fullString;
		const [time, errMsgTime] = extractTime(timeStrToParse);

		const errMsg = canParseFullString ? errMsgDate || errMsgTime : 'DATETIME - INCORRECT FORMAT';
		this.updateDateTime(date, time, fullString, errMsg);
	}

	updateDateTime(date, time, textInput = getTextDate(date, time), errorMsg) {
		const fullDate = (() => {
			if (date === undefined || time === undefined) {
				return undefined;
			}

			return setMinutes(date, time);
		})();

		const fullDateUpdated =
			fullDate !== this.state.lastFullDate && !isSameMinute(fullDate, this.state.lastFullDate);

		if (fullDateUpdated && this.props.onChange) {
			this.props.onChange(fullDate);
		}

		const errorUpdated = errorMsg !== this.state.lastErrMsg;
		if (errorUpdated && this.props.onError) {
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
		const inputProps = omit(this.props, PROPS_TO_OMIT_FOR_INPUT);
		return (
			<div>
				<DebounceInput
					{...inputProps}
					type="text"
					placeholder={inputProps.placeholder || 'YYYY-MM-DD hh:mm'}
					value={this.state.textInput}
					debounceTimeout={DEBOUNCE_TIMEOUT}
					onChange={this.onChangeInput}
				/>
				<div className={theme.dropdown}>
					<DateTimePicker
						selection={{
							date: this.state.date,
							time: this.state.time,
						}}
						onSubmit={this.onSubmitPicker}
					/>
				</div>
			</div>
		);
	}
}

export default InputDateTimePicker;
