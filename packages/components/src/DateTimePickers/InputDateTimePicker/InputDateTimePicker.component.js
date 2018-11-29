import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import DebounceInput from 'react-debounce-input';
import { Overlay, Popover } from 'react-bootstrap';
import isSameSecond from 'date-fns/is_same_second';
import keycode from 'keycode';
import uuid from 'uuid';

import DateTimePicker from '../DateTimePicker';
import { focusOnCalendar } from '../../Gesture/withCalendarGesture';
import {
	splitDateAndTimePartsRegex,
	checkSupportedDateFormat,
	checkTime,
	extractDateTimeParts,
	dateTimeToStr,
	dateAndTimeToDateTime,
	getFullDateFormat,
	strToDate,
	strToTime,
} from './date-extraction';

import theme from './InputDateTimePicker.scss';

const warnOnce = {};

const PROPS_TO_OMIT_FOR_INPUT = [
	'selectedDateTime',
	'onChange',
	'onBlur',
	'dateFormat',
	'useSeconds',
	'useTime',
];

class InputDateTimePicker extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		selectedDateTime: PropTypes.instanceOf(Date),
		onChange: PropTypes.func,
		onBlur: PropTypes.func,
		readOnly: PropTypes.bool,
		dateFormat: PropTypes.string,
		useSeconds: PropTypes.bool,
		useTime: PropTypes.bool,
	};

	static defaultProps = {
		dateFormat: 'YYYY-MM-DD',
		useSeconds: false,
		useTime: false,
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
		this.state = {
			...extractDateTimeParts(this.props.selectedDateTime, this.getDateOptions()),
			showPicker: false,
		};

		this.onInputChange = this.onInputChange.bind(this);
		this.onPickerChange = this.onPickerChange.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.openPicker = this.setPickerVisibility.bind(this, true, /* force */ true);
		this.closePicker = this.setPickerVisibility.bind(this, false, /* force */ true);
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
			const dateRelatedPartState = extractDateTimeParts(newSelectedDateTime, this.getDateOptions());
			this.setState(dateRelatedPartState);
		}
	}

	onChange(event, nextState, origin) {
		const { errorMessage, datetime } = nextState;

		const datetimeUpdated =
			datetime !== this.state.datetime && !isSameSecond(datetime, this.state.datetime);

		const errorUpdated = errorMessage !== this.state.errorMessage;

		this.setState(nextState, () => {
			if (this.props.onChange && (datetimeUpdated || errorUpdated)) {
				this.props.onChange(event, { errorMessage, datetime, origin });
			}
		});
	}

	onInputChange(event) {
		const textInput = event.target.value;
		if (textInput === '') {
			return this.onChange(event, extractDateTimeParts(), 'INPUT');
		}

		let date;
		let time = { hours: '00', minutes: '00', seconds: '00' };
		let errorMessage;
		let dateTextToParse = textInput;

		if (this.props.useTime) {
			// extract date part from datetime
			const splitMatches = textInput.match(splitDateAndTimePartsRegex) || [];
			dateTextToParse = splitMatches[1] || textInput;

			if (!splitMatches.length) {
				errorMessage = 'DATETIME - INCORRECT FORMAT';
			}

			// extract time part and parse it
			try {
				const timeTextToParse = splitMatches[2] || textInput;
				time = strToTime(timeTextToParse, this.props.useSeconds);
				checkTime(time);
			} catch (error) {
				time = time || { hours: '', minutes: '', seconds: '' };
				errorMessage = errorMessage || error.message;
			}
		}

		// parse date
		try {
			date = strToDate(dateTextToParse, this.props.dateFormat);
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
				this.inputRef.focus();
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

	onPickerChange(event, { date, time }) {
		let errorMessage;
		const startOfDayTime = { hours: '00', minutes: '00', seconds: '00' };

		try {
			checkTime(time);
		} catch (error) {
			errorMessage = error.message;
		}

		const nextState = {
			date,
			time,
			textInput: dateTimeToStr(date, time, this.getDateOptions()),
			datetime: dateAndTimeToDateTime(date, this.props.useTime ? time : startOfDayTime),
			errorMessage,
		};
		return this.onChange(event, nextState, 'PICKER');
	}

	getDateOptions() {
		return {
			dateFormat: this.props.dateFormat,
			useTime: this.props.useTime,
			useSeconds: this.props.useSeconds,
		};
	}

	setPickerVisibility(isShown, force) {
		if (this.props.readOnly) {
			return;
		}
		/*
		 * We have a force arg because we have the check, comparing current state with wanted state.
		 * We have 2 events : blur (we hide picker), focus (we open picker).
		 * The problem is when we loose focus to focus on another element within the picker.
		 * It triggers a hide + show (in this order. But with the check, the show is stripped,
		 * so in this case, the picker is always hidden.
		 *
		 * With force, we force the state, so we will have hide + show in the same bash of state update,
		 * changing nothing. The picker is still open.
		 */
		if (!force && this.state.showPicker === isShown) {
			return;
		}
		this.setState({ showPicker: isShown });
	}

	render() {
		const inputProps = omit(this.props, PROPS_TO_OMIT_FOR_INPUT);

		return (
			// eslint-disable-next-line jsx-a11y/no-static-element-interactions
			<div
				ref={ref => {
					this.containerRef = ref;
				}}
				onKeyDown={this.onKeyDown}
				onFocus={this.openPicker}
				onBlur={this.closePicker}
			>
				<DebounceInput
					{...inputProps}
					inputRef={ref => {
						this.inputRef = ref;
					}}
					type="text"
					onFocus={this.onInputFocus}
					onBlur={this.props.onBlur}
					placeholder={getFullDateFormat(this.getDateOptions())}
					value={this.state.textInput}
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
								manageFocus
								selection={{
									date: this.state.date,
									time: this.state.time,
								}}
								onSubmit={this.onPickerChange}
								useTime={this.props.useTime}
								useSeconds={this.props.useSeconds}
							/>
						</Popover>
					</Overlay>
				</div>
			</div>
		);
	}
}

export default InputDateTimePicker;
