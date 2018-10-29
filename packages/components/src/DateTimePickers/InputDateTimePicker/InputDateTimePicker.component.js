import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import DebounceInput from 'react-debounce-input';
import { Overlay, Popover } from 'react-bootstrap';
import isSameMinute from 'date-fns/is_same_minute';

import uuid from 'uuid';
import DateTimePicker from '../DateTimePicker';
import theme from './InputDateTimePicker.scss';

import {
	INTERNAL_INVALID_DATE,
	INPUT_FULL_FORMAT,
	splitDateAndTimePartsRegex,
	extractDateTimeParts,
	extractDate,
	extractTime,
	getTextDate,
	getDateTimeFrom,
	isDateValid,
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
		this.onFocusInput = this.onFocusInput.bind(this);
		this.onBlurInput = this.onBlurInput.bind(this);
		this.documentHandler = this.documentHandler.bind(this);
		this.componentContainerHandler = this.componentContainerHandler.bind(this);
	}

	/** *******************************************************************************************
	 * Focus management, could be in a HOC
	 * *******************************************************************************************/
	componentDidMount() {
		this.mountDocumentHandler();
		this.mountComponentContainerHandler();
	}

	componentWillUnmount() {
		this.unmountDocumentHandler();
		this.unmountComponentContainerHandler();
	}

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
			if (!this.state.isDropdownShown) {
				this.switchDropdownVisibility(false);
			}
		} else {
			this.componentContainerEvents.splice(eventIndex, 1);
		}
	}

	componentContainerHandler(e) {
		this.componentContainerEvents.push(e);
	}

	/** *******************************************************************************************
	 * Component logic
	 *********************************************************************************************/
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

	onSubmitPicker(event, { date, time }) {
		event.persist();
		const nextState = {
			date,
			time,
			textInput: getTextDate(date, time),
			datetime: getDateTimeFrom(date, time),
			errorMessage: undefined,

			isDropdownShown: false,
		};
		return this.onChange(event, nextState, 'PICKER');
	}

	onChangeInput(event) {
		const textInput = event.target.value;
		let nextState;

		if (textInput === '') {
			nextState = {
				date: undefined,
				time: undefined,
				textInput,
				datetime: undefined,
				errorMessage: undefined,
			};
		} else {
			const splitMatches = textInput.match(splitDateAndTimePartsRegex);
			const canParseTextInput = splitMatches !== null;

			const dateTextToParse = canParseTextInput ? splitMatches[1] : textInput;
			const [date, errorMessageDate] = extractDate(dateTextToParse);

			const timeTextToParse = canParseTextInput ? splitMatches[2] : textInput;
			const [time, errorMessageTime] = extractTime(timeTextToParse);

			const datetime = getDateTimeFrom(date, time);
			const errorMessage = canParseTextInput
				? errorMessageDate || errorMessageTime
				: 'DATETIME - INCORRECT FORMAT';

			nextState = {
				date,
				time,
				textInput,
				datetime,
				errorMessage,
			};
		}

		return this.onChange(event, nextState, 'INPUT');
	}

	onFocusInput() {
		this.setState({
			inputFocused: true,
		});

		if (!this.props.readOnly) {
			this.switchDropdownVisibility(true);
		}
	}

	onBlurInput(event) {
		this.setState({
			inputFocused: false,
		});

		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
	}

	switchDropdownVisibility(isShown) {
		if (this.state.isDropdownShown === isShown) {
			return;
		}

		this.setState({
			isDropdownShown: isShown,
		});
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
		const needInvalidPlaceholder = !isDatetimeValid && !inputFocused;

		const placeholder = needInvalidPlaceholder
			? INVALID_PLACEHOLDER
			: inputProps.placeholder || INPUT_FULL_FORMAT;

		const textInput = needInvalidPlaceholder ? '' : this.state.textInput;

		return (
			<div
				ref={ref => {
					this.containerRef = ref;
				}}
			>
				<DebounceInput
					{...inputProps}
					type="text"
					onFocus={this.onFocusInput}
					onBlur={this.onBlurInput}
					placeholder={placeholder}
					value={textInput}
					debounceTimeout={DEBOUNCE_TIMEOUT}
					onChange={this.onChangeInput}
					className="form-control"
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
