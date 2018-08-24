import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import DebounceInput from 'react-debounce-input';
import { Overlay, Popover } from 'react-bootstrap';
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
const DEFAULT_PLACEHOLDER = 'YYYY-MM-DD hh:mm';
const INVALID_PLACEHOLDER = 'INVALID DATE';

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

function isDateValid(date) {
	if (date === undefined) {
		return true;
	}

	return date instanceof Date && !isNaN(date.getTime());
}

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

function getObjectDate(date, time) {
	if (date === undefined || time === undefined) {
		return undefined;
	}

	return setMinutes(date, time);
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

function computeDateRelatedState(selectedDateTime) {
	const isDateTimeValid = isDateValid(selectedDateTime);

	if (selectedDateTime !== undefined && isDateTimeValid) {
		const date = startOfDay(selectedDateTime);
		const hours = getHours(selectedDateTime);
		const minutes = getMinutes(selectedDateTime);
		const time = hoursAndMinutesToTime(hours, minutes);
		const fullDate = startOfMinute(selectedDateTime);

		return {
			date,
			time,
			datetime: fullDate,
			textInput: getTextDate(date, time),
		};
	}

	return {
		date: undefined,
		time: undefined,
		datetime: selectedDateTime,
		textInput: '',
	};
}

const PROPS_TO_OMIT_FOR_INPUT = ['selectedDateTime', 'onChange'];

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

		// eslint-disable-next-line
		console.warn(
			"UNSTABLE WARNING: The 'InputDateTimePicker' and all the sub components aren't ready to be used in Apps. Code can (will) change outside the release process until it's ready.",
		);

		const dateRelatedPartState = computeDateRelatedState(this.props.selectedDateTime);

		this.state = {
			...dateRelatedPartState,
			inputFocused: false,
			isDropdownShown: false,
		};

		this.componentContainerEvents = [];

		this.onChangeInput = this.onChangeInput.bind(this);
		this.onSubmitPicker = this.onSubmitPicker.bind(this);
		this.setContainerRef = this.setContainerRef.bind(this);
		this.setDropdownWrapperRef = this.setDropdownWrapperRef.bind(this);
		this.onFocusInput = this.onFocusInput.bind(this);
		this.onBlurInput = this.onBlurInput.bind(this);
		this.documentHandler = this.documentHandler.bind(this);
		this.componentContainerHandler = this.componentContainerHandler.bind(this);
	}

	componentDidMount() {
		this.mountComponentContainerHandler();
	}

	componentWillReceiveProps(nextProps) {
		const newSelectedDateTime = nextProps.selectedDateTime;

		const selectedDateTimePropsUpdated = newSelectedDateTime !== this.props.selectedDateTime;
		const selectedDateTimePropDivergedFromState = newSelectedDateTime !== this.state.datetime;
		const needDateTimeStateUpdate =
			selectedDateTimePropsUpdated && selectedDateTimePropDivergedFromState;

		if (needDateTimeStateUpdate) {
			const dateRelatedPartState = computeDateRelatedState(newSelectedDateTime);

			this.setState({
				...dateRelatedPartState,
			});
		}
	}

	componentDidUpdate(prevProp, prevState) {
		const isDropdownShown = this.state.isDropdownShown;
		if (prevState.isDropdownShown !== isDropdownShown) {
			if (isDropdownShown) {
				this.mountDocumentHandler();
			} else {
				this.unmountDocumentHandler();
			}
		}
	}

	componentWillUnmount() {
		this.unmountDocumentHandler();
		this.unmountComponentContainerHandler();
	}

	onSubmitPicker(event, { date, time }) {
		const datetime = getObjectDate(date, time);
		const errorMessage = undefined;

		this.updateDatePartStateAndTriggerChange(event, {
			date,
			time,
			textInput: getTextDate(date, time),
			datetime,
			errorMessage,
		});

		this.switchDropdownVisibility(false);
		this.triggerBlur(event);
	}

	onChangeInput(event) {
		const textInput = event.target.value;

		if (textInput === '') {
			this.updateDatePartStateAndTriggerChange(event, {
				date: undefined,
				time: undefined,
				textInput,
				datetime: undefined,
				errorMessage: undefined,
			});
			return;
		}

		const splitMatches = textInput.match(splitDateAndTimePartsRegex);
		const canParseTextInput = splitMatches !== null;

		const dateTextToParse = canParseTextInput ? splitMatches[1] : textInput;
		const [date, errMsgDate] = extractDate(dateTextToParse);

		const timeTextToParse = canParseTextInput ? splitMatches[2] : textInput;
		const [time, errMsgTime] = extractTime(timeTextToParse);

		const fullDate = getObjectDate(date, time);
		const errorMessage = canParseTextInput
			? errMsgDate || errMsgTime
			: 'DATETIME - INCORRECT FORMAT';

		this.updateDatePartStateAndTriggerChange(event, {
			date,
			time,
			textInput,
			datetime: fullDate,
			errorMessage,
		});
	}

	onFocusInput() {
		this.setState({
			inputFocused: true,
		});

		if (!this.props.readOnly) {
			this.switchDropdownVisibility(true);
		}
	}

	onBlurInput() {
		this.setState({
			inputFocused: false,
		});
	}

	setContainerRef(ref) {
		this.containerRef = ref;
	}

	setDropdownWrapperRef(ref) {
		this.dropdownWrapperRef = ref;
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
			this.switchDropdownVisibility(false);
			this.triggerBlur(event);
		} else {
			this.componentContainerEvents.splice(eventIndex, 1);
		}
	}

	componentContainerHandler(e) {
		this.componentContainerEvents.push(e);
	}

	switchDropdownVisibility(isShown) {
		if (this.state.isDropdownShown === isShown) {
			return;
		}

		this.setState({
			isDropdownShown: isShown,
		});
	}

	updateDatePartStateAndTriggerChange(event, dateStatePart) {
		const lastInfos = {
			datetime: this.state.datetime,
			errorMessage: this.state.errorMessage,
		};
		this.setState(dateStatePart, () => {
			const newInfos = {
				datetime: dateStatePart.datetime,
				errorMessage: dateStatePart.errorMessage,
			};
			this.triggerChange(event, lastInfos, newInfos);
		});
	}

	triggerChange(event, lastInfos, newInfos = {}) {
		const fullDateUpdated =
			newInfos.datetime !== lastInfos.datetime &&
			!isSameMinute(newInfos.datetime, lastInfos.datetime);

		const errorUpdated = newInfos.errorMessage !== lastInfos.errorMessage;

		if (this.props.onChange && (fullDateUpdated || errorUpdated)) {
			this.props.onChange(event, newInfos.errorMessage, newInfos.datetime);
		}
	}

	triggerBlur(event) {
		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
	}

	render() {
		const inputProps = omit(this.props, PROPS_TO_OMIT_FOR_INPUT);

		const isDateTimeValid = isDateValid(this.state.datetime);
		const inputFocused = this.state.inputFocused;
		const needInvalidPlaceholder = !isDateTimeValid && !inputFocused;

		const placeholder = needInvalidPlaceholder
			? INVALID_PLACEHOLDER
			: inputProps.placeholder || DEFAULT_PLACEHOLDER;

		const textInput = needInvalidPlaceholder ? '' : this.state.textInput;

		return (
			<div ref={this.setContainerRef}>
				<div className={theme['input-container']}>
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
				</div>
				<div className={theme['dropdown-wrapper']} ref={this.setDropdownWrapperRef}>
					<Overlay container={this.dropdownWrapperRef} show={this.state.isDropdownShown}>
						<Popover className={theme.popover} id={`${this.props.id}-popover`}>
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
