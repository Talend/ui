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
	checkSupportedDateFormat,
	extractParts,
	extractPartsFromDateAndTime,
	extractPartsFromTextInput,
	getFullDateFormat,
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
	};

	static defaultProps = {
		dateFormat: 'YYYY-MM-DD',
		useSeconds: false,
		useTime: false,
		useUTC: false,
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
			...extractParts(props.selectedDateTime, this.getDateOptions()),
			showPicker: false,
		};

		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);
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

	onChange(event, nextState, origin) {
		const { errorMessage, datetime, textInput } = nextState;

		const datetimeUpdated =
			datetime !== this.state.datetime && !isSameSecond(datetime, this.state.datetime);

		const errorUpdated = errorMessage !== this.state.errorMessage;

		this.setState(nextState, () => {
			if (this.props.onChange && (datetimeUpdated || errorUpdated)) {
				this.props.onChange(event, { errorMessage, datetime, textInput, origin });
			}
		});
	}

	onInputChange(event) {
		const textInput = event.target.value;
		const nextState = extractPartsFromTextInput(textInput, this.getDateOptions());
		return this.onChange(event, nextState, 'INPUT');
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
		const nextState = extractPartsFromDateAndTime(date, time, this.getDateOptions());
		return this.onChange(event, nextState, 'PICKER');
	}

	onBlur(event) {
		/*
		 This is wrapped in a timeout because when you switch focus via clic or gesture
		 within the picker, you will have a blur event followed by a focus event.
		 We don't want it to trigger the onBlur and to hide the picker if a focus happens just after.
		 So here we schedule it, and on focus we cancel it.
		 */
		this.blurTimeout = setTimeout(() => {
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

	getDateOptions() {
		return {
			dateFormat: this.props.dateFormat,
			useTime: this.props.useTime,
			useSeconds: this.props.useSeconds,
			useUTC: this.props.useUTC,
		};
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
				onFocus={this.onFocus}
				onBlur={this.onBlur}
			>
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
								useUTC={this.props.useUTC}
							/>
						</Popover>
					</Overlay>
				</div>
			</div>
		);
	}
}

export default InputDateTimePicker;
