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

const DEBOUNCE_TIMEOUT = 300;
const INVALID_PLACEHOLDER = 'INVALID DATE';

const warnOnce = {};

const PROPS_TO_OMIT_FOR_INPUT = ['selectedDateTime', 'onChange', 'onBlur'];

class InputDateTimePicker extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		selectedDateTime: PropTypes.instanceOf(Date),
		onChange: PropTypes.func,
		onBlur: PropTypes.func,
		readOnly: PropTypes.bool,
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
			isDropdownShown: false,
		};

		this.onChangeInput = this.onChangeInput.bind(this);
		this.onSubmitPicker = this.onSubmitPicker.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.documentHandler = this.documentHandler.bind(this);
		this.componentContainerHandler = this.componentContainerHandler.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
	}

	/* Start of focus management. TODO : extract it in a HOC */

	componentDidMount() {
		this.mountDocumentHandler();
		this.mountComponentContainerHandler();
	}

	componentWillUnmount() {
		this.unmountDocumentHandler();
		this.unmountComponentContainerHandler();
	}

	// eslint-disable-next-line react/sort-comp
	mountDocumentHandler() {
		document.addEventListener('click', this.documentHandler);
		document.addEventListener('focusin', this.documentHandler);
	}

	unmountDocumentHandler() {
		document.removeEventListener('click', this.documentHandler);
		document.removeEventListener('focusin', this.documentHandler);
	}

	mountComponentContainerHandler() {
		this.containerRef.addEventListener('click', this.componentContainerHandler);
		this.containerRef.addEventListener('focusin', this.componentContainerHandler);
	}

	unmountComponentContainerHandler() {
		this.containerRef.removeEventListener('click', this.componentContainerHandler);
		this.containerRef.removeEventListener('focusin', this.componentContainerHandler);
	}

	documentHandler(event) {
		const eventIndex = this.componentContainerEvents.indexOf(event);
		const isActionOutOfComponent = eventIndex === -1;

		if (isActionOutOfComponent) {
			this.setPickerVisibility(false);
		} else {
			this.componentContainerEvents.splice(eventIndex, 1);
		}
	}

	componentContainerHandler(e) {
		this.componentContainerEvents.push(e);
	}

	/* End of possible HOC */

	// eslint-disable-next-line react/sort-comp
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

	onChangeInput(event) {
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

	onKeyDown(event) {
		switch (event.keyCode) {
			case keycode.codes.esc:
				this.setPickerVisibility(false);
				this.focusOnInput();
				break;
			case keycode.codes.down:
				if (event.target !== this.inputRef) {
					return;
				}

				if (this.state.isDropdownShown) {
					this.focusOnPicker();
				} else {
					this.setPickerVisibility(true);
				}
				break;
			default:
				break;
		}
	}

	onSubmitPicker(event, { date, time }) {
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

	onFocus() {
		this.setState({
			inputFocused: true,
		});

		if (!this.props.readOnly) {
			this.setPickerVisibility(true);
		}
	}

	onBlur(event) {
		this.setState({
			inputFocused: false,
		});

		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
	}

	setPickerVisibility(isShown) {
		if (this.state.isDropdownShown === isShown) {
			return;
		}

		this.setState({ isDropdownShown: isShown });
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
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					placeholder={placeholder}
					value={textInput}
					debounceTimeout={DEBOUNCE_TIMEOUT}
					onChange={this.onChangeInput}
					className="form-control"
					autoComplete="off"
				/>
				<div
					className={theme['dropdown-wrapper']}
					ref={ref => {
						this.dropdownWrapperRef = ref;
					}}
				>
					<Overlay container={this.dropdownWrapperRef} show={this.state.isDropdownShown}>
						<Popover className={theme.popover} id={this.popoverId}>
							<DateTimePicker
								selection={{
									date: this.state.date,
									time: this.state.time,
								}}
								onSubmit={this.onSubmitPicker}
							/>
						</Popover>
					</Overlay>
				</div>
			</div>
		);
	}
}

export default InputDateTimePicker;
