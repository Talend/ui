import React from 'react';
import PropTypes from 'prop-types';
import isSameSecond from 'date-fns/is_same_second';

import { DateTimeContext } from '../Context';
import {
	checkSupportedDateFormat,
	extractParts,
	extractPartsFromDateAndTime,
	extractPartsFromTextInput,
	strToTime,
} from '../date-extraction';
import {
	checkHours,
	checkMinutes,
	checkSeconds,
	getTimeFormat,
} from '../../Time/time-extraction';
import {
	HOUR_ERRORS,
	MINUTES_ERRORS,
	SECONDS_ERRORS,
	FIELD_HOURS,
	FIELD_MINUTES,
	FIELD_SECONDS,
	INPUT_ERRORS,
} from '../constants';

class ContextualManager extends React.Component {
	static displayName = 'DateTime.Manager';
	static propTypes = {
		children: PropTypes.node,
		dateFormat: PropTypes.string,
		onChange: PropTypes.func,
		required: PropTypes.bool,
		selectedDateTime: PropTypes.oneOfType([
			PropTypes.instanceOf(Date),
			PropTypes.number,
			PropTypes.string,
		]),
		useSeconds: PropTypes.bool,
		useTime: PropTypes.bool,
		useUTC: PropTypes.bool,
	};

	static defaultProps = {
		dateFormat: 'YYYY-MM-DD',
		useSeconds: false,
		useTime: false,
		useUTC: false,
	};

	constructor(props) {
		super(props);

		checkSupportedDateFormat(props.dateFormat);
		this.initialState = extractParts(props.selectedDateTime, this.getDateOptions());
		this.state = {
			...this.initialState,
			previousErrors: [],
		};

		this.onInputChange = this.onInputChange.bind(this);
		this.onPickerChange = this.onPickerChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const newSelectedDateTime = nextProps.selectedDateTime;

		const needDateTimeStateUpdate =
			newSelectedDateTime !== this.props.selectedDateTime && // selectedDateTime props updated
			newSelectedDateTime !== this.state.datetime && // not the same ref as state date time
			!isSameSecond(newSelectedDateTime, this.state.datetime); // not the same value as state

		if (nextProps.dateFormat !== this.props.dateFormat) {
			checkSupportedDateFormat(nextProps.dateFormat);
		}

		if (needDateTimeStateUpdate) {
			const dateRelatedPartState = extractParts(newSelectedDateTime, this.getDateOptions());
			this.setState(dateRelatedPartState);
		}
	}

	onChange(event, origin) {
		if (!this.props.onChange) {
			return;
		}
		const { errorMessage, datetime, textInput, errors } = this.state;
		// we need to update the initial state once it has been changed
		this.initialState = { ...this.state };
		this.props.onChange(event, { errors, errorMessage, datetime, textInput, origin });
	}

	onInputChange(event) {
		const textInput = event.target.value;
		const nextState = extractPartsFromTextInput(textInput, this.getDateOptions());
		this.setState({ previousErrors: this.state.errors, ...nextState }, () => {
			this.onChange(event, 'INPUT');
		});
	}

	onPickerChange(event, { date, time, field }) {
		const isTimeUpdate = [FIELD_HOURS, FIELD_MINUTES, FIELD_SECONDS].includes(field);
		const nextState = extractPartsFromDateAndTime(date, time, this.getDateOptions());

		// we need to retrieve the input error from nextState to add them to the current one
		// because, by changing the picker, we update the textInput so we need to update its errors
		let nextErrors = this.state.errors
			// remove old main input errors
			.filter(error => !INPUT_ERRORS.includes(error.code))
			// add new main input errors
			.concat(nextState.errors.filter(error => INPUT_ERRORS.includes(error.code)));

		if (isTimeUpdate) {
			// to avoid having errors on untouched time elements, we check only the updated part
			let newError;
			switch (field) {
				case FIELD_HOURS:
					newError = checkHours(time.hours);
					break;
				case FIELD_MINUTES:
					newError = checkMinutes(time.minutes);
					break;
				case FIELD_SECONDS:
					newError = checkSeconds(time.seconds);
					break;
				default:
					break;
			}

			// remove old error on updated time part
			nextErrors = nextErrors.filter(
				error =>
					(field === FIELD_HOURS && !HOUR_ERRORS.includes(error.code)) ||
					(field === FIELD_MINUTES && !MINUTES_ERRORS.includes(error.code)) ||
					(field === FIELD_SECONDS && !SECONDS_ERRORS.includes(error.code)),
			);
			// add the new error on updated time part
			if (newError) {
				nextErrors.push(newError);
			}
		}

		this.setState({ previousErrors: this.state.errors, ...nextState, errors: nextErrors }, () => {
			this.onChange(event, 'PICKER');
		});
	}

	getDateOptions() {
		return {
			dateFormat: this.props.dateFormat,
			useTime: this.props.useTime,
			useSeconds: this.props.useSeconds,
			useUTC: this.props.useUTC,
			required: this.props.required,
		};
	}

	render() {
		return (
			<DateTimeContext.Provider
				value={{
					datetime: {
						textInput: this.state.textInput,
						date: this.state.date,
						time: this.state.time,
					},

					inputManagement: {
						inputRef: ref => {
							this.inputRef = ref;
						},
						onChange: this.onInputChange,
					},

					dateInputManagement: {
						placeholder: this.props.dateFormat,
					},

					timeInputManagement: {
						placeholder: getTimeFormat(this.props.useSeconds),
					},

					pickerManagement: {
						onSubmit: this.onPickerChange,
						useTime: this.props.useTime,
						useSeconds: this.props.useSeconds,
						useUTC: this.props.useUTC,
					},
				}}
			>
				{this.props.children}
			</DateTimeContext.Provider>
		);
	}
}
export default ContextualManager;
