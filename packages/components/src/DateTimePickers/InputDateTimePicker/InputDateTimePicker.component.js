import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import DebounceInput from 'react-debounce-input';
import { Overlay, Popover } from 'react-bootstrap';
import isSameMinute from 'date-fns/is_same_minute';
import keycode from 'keycode';

import uuid from 'uuid';
import DateTimePicker from '../DateTimePicker';
import theme from './InputDateTimePicker.scss';

import {
	INPUT_FULL_FORMAT,
	splitDateAndTimePartsRegex,
	extractDateTimeParts,
	dateTimeToStr,
	dateAndTimeToDateTime,
	isDateValid,
	strToDate,
	strToTime,
} from './date-extraction';

const INVALID_PLACEHOLDER = 'INVALID DATE';

const warnOnce = {};

const PROPS_TO_OMIT_FOR_INPUT = ['selectedDateTime', 'onChange', 'onBlur'];

class InputDateTimePicker extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		selectedDateTime: PropTypes.instanceOf(Date),
		onChange: PropTypes.func,
		onBlur: PropTypes.func,
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

		// will intercept events from children to check if the event comes from date picker
		// this is used to close the picker on click event from outside the picker
		this.componentContainerEvents = [];
		this.popoverId = `date-time-picker-${props.id || uuid.v4()}`;
		this.state = {
			...extractDateTimeParts(this.props.selectedDateTime),
			inputFocused: false,
			showPicker: false,
		};

		this.onInputChange = this.onInputChange.bind(this);
		this.onPickerSubmit = this.onPickerSubmit.bind(this);
		this.onInputFocus = this.onInputFocus.bind(this);
		this.onInputBlur = this.onInputBlur.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.openPicker = this.setPickerVisibility.bind(this, true, /* force */ true);
		this.closePicker = this.setPickerVisibility.bind(this, false, /* force */ true);
	}

	componentDidMount() {
		this.containerRef.addEventListener('focusin', this.openPicker);
		this.containerRef.addEventListener('focusout', this.closePicker);
	}

	componentWillReceiveProps(nextProps) {
		const newSelectedDateTime = nextProps.selectedDateTime;

		const needDateTimeStateUpdate =
			newSelectedDateTime !== this.props.selectedDateTime && // selectedDateTime props updated
			newSelectedDateTime !== this.state.datetime && // not the same ref as state date time
			!isSameMinute(newSelectedDateTime, this.state.datetime); // not the same value as state

		if (needDateTimeStateUpdate) {
			const dateRelatedPartState = extractDateTimeParts(newSelectedDateTime);
			this.setState(dateRelatedPartState);
		}
	}

	componentWillUnmount() {
		this.containerRef.removeEventListener('focusin', this.openPicker);
		this.containerRef.removeEventListener('focusout', this.closePicker);
	}

	onChange(event, nextState, origin) {
		const { errorMessage, datetime } = nextState;

		const datetimeUpdated =
			datetime !== this.state.datetime && !isSameMinute(datetime, this.state.datetime);

		const errorUpdated = errorMessage !== this.state.errorMessage;

		this.setState(nextState, () => {
			if (this.props.onChange && (datetimeUpdated || errorUpdated)) {
				this.props.onChange(event, { errorMessage, datetime, origin });
			}
		});
	}

	onInputBlur(event) {
		this.setState({
			inputFocused: false,
		});

		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
	}

	onInputChange(event) {
		const textInput = event.target.value;
		if (textInput === '') {
			return this.onChange(
				event,
				{
					textInput,
					errorMessage: undefined,
					date: undefined,
					time: undefined,
					datetime: undefined,
				},
				'INPUT',
			);
		}

		let date;
		let time;
		let errorMessage;

		const splitMatches = textInput.match(splitDateAndTimePartsRegex) || [];
		const dateTextToParse = splitMatches[1] || textInput;
		const timeTextToParse = splitMatches[2] || textInput;
		if (!splitMatches.length) {
			errorMessage = 'DATETIME - INCORRECT FORMAT';
		}

		try {
			date = strToDate(dateTextToParse);
		} catch (error) {
			errorMessage = errorMessage || error.message;
		}

		try {
			time = strToTime(timeTextToParse);
		} catch (error) {
			errorMessage = errorMessage || error.message;
		}

		return this.onChange(
			event,
			{
				textInput,
				errorMessage,
				date,
				time,
				datetime: dateAndTimeToDateTime(date, time),
			},
			'INPUT',
		);
	}

	onInputFocus() {
		this.setState({
			inputFocused: true,
		});
	}

	onKeyDown(event) {
		switch (event.keyCode) {
			case keycode.codes.esc:
				this.focusOnInput();
				this.setPickerVisibility(false);
				break;
			case keycode.codes.down:
				if (event.target !== this.inputRef) {
					return;
				}

				if (this.state.showPicker) {
					this.focusOnPicker();
				} else {
					this.setPickerVisibility(true);
				}
				break;
			default:
				break;
		}
	}

	onPickerSubmit(event, { date, time }) {
		event.persist();
		const nextState = {
			date,
			time,
			textInput: dateTimeToStr(date, time),
			datetime: dateAndTimeToDateTime(date, time),
			errorMessage: undefined,
		};
		return this.onChange(event, nextState, 'PICKER');
	}

	setPickerVisibility(isShown, force) {
		if (!force && this.state.showPicker === isShown) {
			return;
		}
		this.setState({ showPicker: isShown });
	}

	focusOnInput() {
		this.inputRef.focus();
	}

	focusOnPicker() {
		let target = this.containerRef.querySelector('[aria-current="date"] > .tc-date-picker-day');
		if (!target) {
			target = this.containerRef.querySelector('.tc-date-picker-day[disabled=false]');
		}
		if (!target) {
			target = this.containerRef.querySelector('.tc-date-picker-day');
		}
		if (target) {
			target.focus();
		}
	}

	render() {
		const inputProps = omit(this.props, PROPS_TO_OMIT_FOR_INPUT);

		const isDatetimeValid = isDateValid(this.state.datetime);
		const inputFocused = this.state.inputFocused;

		let placeholder = inputProps.placeholder || INPUT_FULL_FORMAT;
		if (!isDatetimeValid && !inputFocused) {
			placeholder = INVALID_PLACEHOLDER;
		}
		const textInput = this.state.textInput;

		return (
			// eslint-disable-next-line jsx-a11y/no-static-element-interactions
			<div
				ref={ref => {
					this.containerRef = ref;
				}}
				onKeyDown={this.onKeyDown}
			>
				<DebounceInput
					{...inputProps}
					inputRef={ref => {
						this.inputRef = ref;
					}}
					type="text"
					onFocus={this.onInputFocus}
					onBlur={this.onInputBlur}
					placeholder={placeholder}
					value={textInput}
					debounceTimeout={300}
					onChange={this.onInputChange}
					className="form-control"
					autoComplete="off"
				/>
				<div
					className={theme['dropdown-wrapper']}
					ref={ref => {
						this.dropdownWrapperRef = ref;
					}}
				>
					<Overlay container={this.dropdownWrapperRef} show={this.state.showPicker}>
						<Popover className={theme.popover} id={this.popoverId}>
							<DateTimePicker
								selection={{
									date: this.state.date,
									time: this.state.time,
								}}
								onSubmit={this.onPickerSubmit}
							/>
						</Popover>
					</Overlay>
				</div>
			</div>
		);
	}
}

export default InputDateTimePicker;
