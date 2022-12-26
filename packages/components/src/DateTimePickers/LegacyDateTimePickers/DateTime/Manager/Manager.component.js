import { Component } from 'react';
import PropTypes from 'prop-types';
import isSameSecond from 'date-fns/isSameSecond';

import { DateTimeContext } from '../Context';
import {
	check,
	checkHours,
	checkMinutes,
	checkSeconds,
	checkSupportedDateFormat,
	extractParts,
	extractPartsFromDateAndTime,
	extractPartsFromTextInput,
	getFullDateFormat,
} from '../date-extraction';
import {
	HOUR_ERRORS,
	MINUTES_ERRORS,
	SECONDS_ERRORS,
	FIELD_HOURS,
	FIELD_MINUTES,
	FIELD_SECONDS,
	INPUT_ERRORS,
} from '../constants';

class ContextualManager extends Component {
	static displayName = 'DateTime.Manager';

	static propTypes = {
		children: PropTypes.node,
		dateFormat: PropTypes.string,
		formMode: PropTypes.bool,
		id: PropTypes.string.isRequired,
		onChange: PropTypes.func,
		hybridMode: PropTypes.bool,
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
		formMode: false,
		hybridMode: false,
		// default behaviour is to forbid empty values
		required: true,
		useSeconds: false,
		useTime: false,
		useUTC: false,
	};

	constructor(props) {
		super(props);

		checkSupportedDateFormat(props.dateFormat);
		this.inputErrorId = `${props.id}-input-error`;
		this.hoursErrorId = `${props.id}-hours-error`;
		this.minutesErrorId = `${props.id}-minutes-error`;
		this.secondsErrorId = `${props.id}-seconds-error`;
		this.initialState = extractParts(props.selectedDateTime, this.getDateOptions());
		this.state = {
			...this.initialState,
			previousErrors: [],
		};

		this.onInputFocus = this.onInputFocus.bind(this);
		this.hasError = this.hasError.bind(this);
		this.onReset = this.onReset.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.onPickerChange = this.onPickerChange.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		const newSelectedDateTime = this.props.selectedDateTime;

		const needDateTimeStateUpdate =
			newSelectedDateTime !== prevProps.selectedDateTime && // selectedDateTime props updated
			newSelectedDateTime !== prevState.datetime && // not the same ref as state date time
			!isSameSecond(newSelectedDateTime, prevState.datetime); // not the same value as state

		if (prevProps.dateFormat !== this.props.dateFormat) {
			checkSupportedDateFormat(this.props.dateFormat);
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
		this.setState(
			oldState => ({ previousErrors: oldState.errors, ...nextState }),
			() => {
				if (!this.props.formMode) {
					this.onChange(event, 'INPUT');
				}
			},
		);
	}

	onPickerChange(event, { date, time, field }) {
		const nextState = extractPartsFromDateAndTime(date, time, this.getDateOptions());
		const isTimeUpdate = [FIELD_HOURS, FIELD_MINUTES, FIELD_SECONDS].includes(field);
		const isTimeEmpty = !nextState.time.hours && !nextState.time.minutes && !nextState.time.seconds;
		const isHybridMode = this.getDateOptions().hybridMode;

		// we need to retrieve the input error from nextState to add them to the current one
		// because, by changing the picker, we update the textInput so we need to update its errors
		let nextErrors = this.state.errors
			// remove old main input errors
			.filter(error => !INPUT_ERRORS.includes(error.code))
			// add new main input errors
			.concat(nextState.errors.filter(error => INPUT_ERRORS.includes(error.code)));

		if (isTimeUpdate) {
			if (isHybridMode && isTimeEmpty) {
				nextErrors = nextErrors.filter(
					error =>
						!HOUR_ERRORS.includes(error.code) &&
						!MINUTES_ERRORS.includes(error.code) &&
						!SECONDS_ERRORS.includes(error.code),
				);
			} else {
				// to avoid having errors on untouched time elements, we check only the updated part
				let newError;
				switch (field) {
					case FIELD_HOURS:
						newError = checkHours(time.hours, this.getDateOptions().hybridMode);
						break;
					case FIELD_MINUTES:
						newError = checkMinutes(time.minutes, this.getDateOptions().hybridMode);
						break;
					case FIELD_SECONDS:
						newError = checkSeconds(time.seconds, this.getDateOptions().hybridMode);
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
		}

		this.setState({ previousErrors: this.state.errors, ...nextState, errors: nextErrors }, () => {
			if (!this.props.formMode) {
				this.onChange(event, 'PICKER');
			}
		});
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

	onInputFocus(event, focusedId) {
		this.setState({ focusedInput: focusedId });
	}

	onReset() {
		// in form mode user has to explicitly validate the persist the selected date
		// Otherwise, on picker close, the date is reset to the previous value
		if (this.props.formMode) {
			this.setState({ ...this.initialState });
		}
	}

	getDateOptions() {
		return {
			dateFormat: this.props.dateFormat,
			useTime: this.props.useTime,
			useSeconds: this.props.useSeconds,
			useUTC: this.props.useUTC,
			required: this.props.required,
			hybridMode: this.props.hybridMode,
		};
	}

	hasError(errorCodes) {
		// no error management in component when not in formMode
		if (!this.props.formMode) {
			return false;
		}

		const errorCodesArray = Array.isArray(errorCodes) ? errorCodes : [errorCodes];
		return !!this.state.errors.find(stateError => errorCodesArray.indexOf(stateError.code) > -1);
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

					errorManagement: {
						onInputFocus: this.onInputFocus,
						focusedInput: this.state.focusedInput,
						errors: this.state.errors,
						hasError: this.hasError,
						formMode: this.props.formMode,
						inputErrorId: this.inputErrorId,
						hoursErrorId: this.hoursErrorId,
						minutesErrorId: this.minutesErrorId,
						secondsErrorId: this.secondsErrorId,
					},

					inputManagement: {
						inputRef: ref => {
							this.inputRef = ref;
						},
						onChange: this.onInputChange,
						placeholder: getFullDateFormat(this.getDateOptions()),
					},

					pickerManagement: {
						onSubmit: this.onPickerChange,
						useTime: this.props.useTime,
						useSeconds: this.props.useSeconds,
						useUTC: this.props.useUTC,
					},

					formManagement: {
						onReset: this.onReset,
						onSubmit: this.onSubmit,
					},
				}}
			>
				{this.props.children}
			</DateTimeContext.Provider>
		);
	}
}
export default ContextualManager;
