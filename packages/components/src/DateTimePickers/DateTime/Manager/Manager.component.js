import React from 'react';
import PropTypes from 'prop-types';
import isSameSecond from 'date-fns/is_same_second';

import { DateTimeContext } from '../Context';
import {
	check,
	checkSupportedDateFormat,
	extractParts,
	extractPartsFromDateAndTime,
	getTimeFormat,
	extractDateFromTextInput,
	extractTimeFromTextInput,
} from '../date-extraction';
import {
	ALL_INPUT_ERRORS,
} from '../constants';

class ContextualManager extends React.Component {
	static displayName = 'DateTime.Manager';
	static propTypes = {
		children: PropTypes.node,
		dateFormat: PropTypes.string,
		id: PropTypes.string.isRequired,
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
		// default behaviour is to forbid empty values
		required: true,
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

		this.onSubmit = this.onSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.onDateInputChange = this.onDateInputChange.bind(this);
		this.onTimeInputChange = this.onTimeInputChange.bind(this);
		this.onPickerChange = this.onPickerChange.bind(this);
		this.onDatePickerChange = this.onDatePickerChange.bind(this);
		this.onTimePickerChange = this.onTimePickerChange.bind(this);
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
		const { errorMessage, datetime, dateTextInput, timeTextInput, errors } = this.state;
		let textInput = '';
		if (dateTextInput) {
			textInput = `${dateTextInput}${timeTextInput ? ` ${timeTextInput}` : ''}`;
		}
		// we need to update the initial state once it has been changed
		this.initialState = { ...this.state };
		this.props.onChange(
			event,
			{ errors, errorMessage, datetime, textInput, origin }
		);
	}

	onInputChange(event, nextState) {
		this.setState({ previousErrors: this.state.errors, ...nextState }, () => {
			this.onChange(event, 'INPUT');
		});
	}

	onDateInputChange(event) {
		const dateTextInput = event.target.value;
		const { time } = this.state;
		const nextState = extractDateFromTextInput(dateTextInput, this.getDateOptions(), time);
		this.onInputChange(event, nextState);
	}

	onTimeInputChange(event) {
		const timeTextInput = event.target.value;
		const { date } = this.state;
		const nextState = extractTimeFromTextInput(timeTextInput, this.getDateOptions(), date);
		this.onInputChange(event, nextState);
	}

	onPickerChange(event, nextState) {
		// we need to retrieve the input error from nextState to add them to the current one
		// because, by changing the picker, we update the textInput so we need to update its errors
		const nextErrors = this.state.errors
			// remove old main input errors
			.filter(error => !ALL_INPUT_ERRORS.includes(error.code))
			// add new main input errors
			.concat(nextState.errors.filter(error => ALL_INPUT_ERRORS.includes(error.code)));
		this.setState({ previousErrors: this.state.errors, ...nextState, errors: nextErrors }, () => {
			this.onChange(event, 'PICKER');
		});
	}

	onDatePickerChange(event, { date }) {
		const dateToUse = date;
		const { time } = this.state;
		const nextState = extractPartsFromDateAndTime(dateToUse, time, this.getDateOptions());
		this.onPickerChange(event, nextState);
	}

	onTimePickerChange(event, { time }) {
		const dateToUse = this.state.date;
		const nextState = extractPartsFromDateAndTime(dateToUse, time, this.getDateOptions());
		this.onPickerChange(event, nextState);
	}

	onSubmit(event, origin) {
		event.preventDefault();

		// validation
		// to avoid having error message change on invalid elements,
		// we don't replace the error on those elements
		let errors = check(this.state.date, this.state.time, this.getDateOptions());
		errors = this.state.errors
			.filter(({ code }) => !errors.find(error => error.code === code))
			.concat(errors);

		this.setState({ errors, errorMessage: errors[0] ? errors[0].message : '' }, () => {
			if (!errors.length) {
				this.onChange(event, origin);
			}
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
						dateTextInput: this.state.dateTextInput,
						timeTextInput: this.state.timeTextInput,
						date: this.state.date,
						time: this.state.time,
					},

					inputManagement: {
						onChange: this.onInputChange,
					},

					dateInputManagement: {
						placeholder: this.props.dateFormat,
						onChange: this.onDateInputChange,
					},

					timeInputManagement: {
						placeholder: getTimeFormat(this.props.useSeconds),
						onChange: this.onTimeInputChange,
						useSeconds: this.props.useSeconds,
					},

					pickerManagement: {
						useTime: this.props.useTime,
						useSeconds: this.props.useSeconds,
						useUTC: this.props.useUTC,
					},

					datePickerManagement: {
						onSubmit: this.onDatePickerChange,
					},

					timePickerManagement: {
						onSubmit: this.onTimePickerChange,
					},
				}}
			>
				{this.props.children}
			</DateTimeContext.Provider>
		);
	}
}
export default ContextualManager;
