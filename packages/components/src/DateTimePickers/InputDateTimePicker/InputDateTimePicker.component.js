import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import DebounceInput from 'react-debounce-input';
import { Overlay, Popover } from 'react-bootstrap';
import isSameSecond from 'date-fns/is_same_second';
import keycode from 'keycode';
import uuid from 'uuid';

import DateTimeValidation from './DateTimeValidation.component';
import DateTimePicker from '../DateTimePicker';
import { ErrorContext } from './InputDateTimePickerContext';
import { focusOnCalendar } from '../../Gesture/withCalendarGesture';
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
} from './date-extraction';
import {
	HOUR_ERRORS,
	MINUTES_ERRORS,
	SECONDS_ERRORS,
	FIELD_HOURS,
	FIELD_MINUTES,
	FIELD_SECONDS,
} from './constants';

import theme from './InputDateTimePicker.scss';

const warnOnce = {};

const PROPS_TO_OMIT_FOR_INPUT = [
	'dateFormat',
	'formMode',
	'onChange',
	'onBlur',
	'selectedDateTime',
	'useSeconds',
	'useTime',
	'useUTC',
];

class InputDateTimePicker extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		selectedDateTime: PropTypes.oneOfType([
			PropTypes.instanceOf(Date),
			PropTypes.number,
			PropTypes.string,
		]),
		onChange: PropTypes.func,
		onBlur: PropTypes.func,
		readOnly: PropTypes.bool,
		dateFormat: PropTypes.string,
		useSeconds: PropTypes.bool,
		useTime: PropTypes.bool,
		useUTC: PropTypes.bool,
		formMode: PropTypes.bool,
	};

	static defaultProps = {
		dateFormat: 'YYYY-MM-DD',
		useSeconds: false,
		useTime: false,
		useUTC: false,
		formMode: false,
	};

	constructor(props) {
		super(props);

		if (!warnOnce.unstable) {
			// eslint-disable-next-line
			console.warn(
				"UNSTABLE WARNING: The 'InputDateTimePicker' and all the sub components aren't ready to be used in Apps. Code can (will) change outside the release process until it's ready.",
			);
			warnOnce.unstable = true;
		}

		checkSupportedDateFormat(props.dateFormat);
		this.popoverId = `date-time-picker-${props.id || uuid.v4()}`;
		this.inputErrorId = `${props.id}-input-error`;
		this.hoursErrorId = `${props.id}-hours-error`;
		this.minutesErrorId = `${props.id}-minutes-error`;
		this.secondsErrorId = `${props.id}-seconds-error`;
		this.initialState = extractParts(props.selectedDateTime, this.getDateOptions());
		this.state = {
			...this.initialState,
			showPicker: false,
			focusedInput: this.inputErrorId,
		};

		this.onInputFocus = this.onInputFocus.bind(this);
		this.hasError = this.hasError.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.onPickerChange = this.onPickerChange.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.openPicker = this.setPickerVisibility.bind(this, true);
		this.closePicker = this.setPickerVisibility.bind(this, false);
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
		const { errorMessage, datetime, textInput, errors, previousErrors } = this.state;

		const errorUpdated = JSON.stringify(previousErrors) !== JSON.stringify(errors);

		if (this.props.onChange && (this.dateHasChanged() || errorUpdated)) {
			// we need to update the initial state once it has been changed
			this.initialState = { ...this.state };
			this.props.onChange(event, { errors, errorMessage, datetime, textInput, origin });
		}
	}

	onInputChange(event) {
		const textInput = event.target.value;
		const nextState = extractPartsFromTextInput(textInput, this.getDateOptions());
		this.setState({ previousErrors: this.state.errors, ...nextState }, () => {
			if (!this.props.formMode) {
				this.onChange(event, 'INPUT');
			}
		});
	}

	onKeyDown(event) {
		switch (event.keyCode) {
			case keycode.codes.esc:
				this.inputRef.focus();
				this.resetDate();
				this.setPickerVisibility(false);
				break;
			case keycode.codes.down:
				if (event.target !== this.inputRef) {
					return;
				}

				if (this.state.showPicker) {
					focusOnCalendar(this.containerRef);
				} else {
					this.setPickerVisibility(true);
				}
				break;
			default:
				break;
		}
	}

	onPickerChange(event, { date, time, field }) {
		const ignoreDate = [FIELD_HOURS, FIELD_MINUTES, FIELD_SECONDS].includes(field);
		const nextState = extractPartsFromDateAndTime(date, time, this.getDateOptions(), ignoreDate);

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

		const nextErrors = this.state.errors.filter(
			error =>
				(field === FIELD_HOURS && !HOUR_ERRORS.includes(error.code)) ||
				(field === FIELD_MINUTES && !MINUTES_ERRORS.includes(error.code)) ||
				(field === FIELD_SECONDS && !SECONDS_ERRORS.includes(error.code)),
		);
		if (newError) {
			nextErrors.push(newError);
		}

		this.setState({ previousErrors: this.state.errors, ...nextState, errors: nextErrors }, () => {
			if (!this.props.formMode) {
				this.onChange(event, 'PICKER');
			}
		});
	}

	onBlur(event) {
		/*
		 This is wrapped in a timeout because when you switch focus via clic or gesture
		 within the picker, you will have a blur event followed by a focus event.
		 We don't want it to trigger the onBlur and to hide the picker if a focus happens just after.
		 So here we schedule it, and on focus we cancel it.
		 */
		this.blurTimeout = setTimeout(() => {
			this.resetDate();
			this.closePicker();
			if (this.props.onBlur) {
				this.props.onBlur(event);
			}
		});
	}

	onFocus() {
		clearTimeout(this.blurTimeout);
		this.openPicker();
	}

	onSubmit(event, origin) {
		event.preventDefault();
		const errors = check(this.state.date, this.state.time);
		if (errors.length) {
			this.setState({ errors });
		} else {
			this.onChange(event, origin);
			this.closePicker();
		}
	}

	onInputFocus(event, focusedId = this.inputErrorId) {
		this.setState({ focusedInput: focusedId });
	}

	getDateOptions() {
		return {
			dateFormat: this.props.dateFormat,
			useTime: this.props.useTime,
			useSeconds: this.props.useSeconds,
			useUTC: this.props.useUTC,
		};
	}

	setPickerVisibility(isShown) {
		if (this.props.readOnly) {
			return;
		}

		this.setState(({ showPicker }) => {
			if (showPicker === isShown) {
				return null;
			}
			return { showPicker: isShown };
		});
	}

	hasError(error) {
		// no error management in component when not in formMode
		if (!this.props.formMode) {
			return false;
		}
		if (Array.isArray(error)) {
			return !!this.state.errors.find(stateError => error.indexOf(stateError.code) > -1);
		}
		return !!this.state.errors.find(stateError => stateError.code === error);
	}

	resetDate() {
		if (this.props.formMode) {
			this.setState({ ...this.initialState });
		}
	}

	dateHasChanged() {
		const datetime = this.state.datetime;
		return (
			datetime !== this.initialState.datetime && !isSameSecond(datetime, this.initialState.datetime)
		);
	}

	render() {
		const inputProps = omit(this.props, PROPS_TO_OMIT_FOR_INPUT);

		const dateTimePicker = (
			<div>
				<DebounceInput
					{...inputProps}
					inputRef={ref => {
						this.inputRef = ref;
					}}
					type="text"
					placeholder={getFullDateFormat(this.getDateOptions())}
					value={this.state.textInput}
					debounceTimeout={300}
					onChange={this.onInputChange}
					onnFocus={this.onInputFocus}
					className="form-control"
					autoComplete="off"
					aria-describedby={this.inputErrorId}
				/>
				<div
					className={theme['dropdown-wrapper']}
					ref={ref => {
						this.dropdownWrapperRef = ref;
					}}
				>
					<Overlay container={this.dropdownWrapperRef} show={this.state.showPicker}>
						<Popover className={theme.popover} id={this.popoverId}>
							<ErrorContext.Provider
								value={{
									onInputFocus: this.onInputFocus,
									hasError: this.hasError,
									formMode: this.props.formMode,
									hoursErrorId: this.hoursErrorId,
									minutesErrorId: this.minutesErrorId,
									secondsErrorId: this.secondsErrorId,
								}}
							>
								<DateTimePicker
									manageFocus
									selection={{
										date: this.state.date,
										time: this.state.time,
									}}
									onSubmit={this.onPickerChange}
									useTime={this.props.useTime}
									useSeconds={this.props.useSeconds}
									useUTC={this.props.useUTC}
									errors={this.state.errors}
								/>
							</ErrorContext.Provider>
							{this.props.formMode && (
								<DateTimeValidation
									focusedInput={this.state.focusedInput}
									errors={this.state.errors}
									hoursErrorId={this.hoursErrorId}
									minutesErrorId={this.minutesErrorId}
									secondsErrorId={this.secondsErrorId}
									inputErrorId={this.inputErrorId}
								/>
							)}
						</Popover>
					</Overlay>
				</div>
			</div>
		);

		return (
			// eslint-disable-next-line jsx-a11y/no-static-element-interactions
			<div
				ref={ref => {
					this.containerRef = ref;
				}}
				onKeyDown={this.onKeyDown}
				onFocus={this.onFocus}
				onBlur={this.onBlur}
			>
				{this.props.formMode ? (
					<form onSubmit={this.onSubmit}>{dateTimePicker}</form>
				) : (
					dateTimePicker
				)}
			</div>
		);
	}
}
export default InputDateTimePicker;
