import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import classnames from 'classnames';
import { Popper } from 'react-popper';

import FocusManager from '../../FocusManager';
import { focusOnCalendar } from '../../Gesture/withCalendarGesture';
import Icon from '../../Icon';

import DateRange from '../DateRange';
import { DateRangeContext } from '../DateRange/Context';
import useInputPickerHandlers from '../hooks/useInputPickerHandlers';

import getDefaultT from '../../translate';

import theme from './InputDateRangePicker.scss';

const PROPS_TO_OMIT_FOR_INPUT = ['id', 'dateFormat', 'onBlur', 'onChange'];

export default function InputDateRangePicker(props) {
	const popoverId = `date-range-picker-${props.id}`;

	const startDateInputRef = useRef(null);
	const endDateInputRef = useRef(null);
	const startTimeInputRef = useRef(null);
	const endTimeInputRef = useRef(null);
	const containerRef = useRef(null);
	const [inputRef, setInputRef] = useState(null);

	const handlers = useInputPickerHandlers({
		handleBlur: props.onBlur,
		handleChange: props.onChange,
		handleKeyDown: () => focusOnCalendar(containerRef.current),
	});

	const inputProps = omit(props, PROPS_TO_OMIT_FOR_INPUT);

	function getFocusedInput() {
		if (inputRef === startDateInputRef) {
			return 'startDate';
		}
		if (inputRef === endDateInputRef) {
			return 'endDate';
		}
		if (inputRef === startTimeInputRef) {
			return 'startTime';
		}
		if (inputRef === endTimeInputRef) {
			return 'endTime';
		}
		return null;
	}

	function onChange(event, payload) {
		if (payload.origin === 'START_PICKER' && startTimeInputRef) {
			startTimeInputRef.current.focus();
		}
		if (payload.origin === 'START_TIME_PICKER' && endDateInputRef) {
			endDateInputRef.current.focus();
		}
		if (payload.origin === 'END_PICKER' && endTimeInputRef) {
			endTimeInputRef.current.focus();
		}
		handlers.onChange(event, payload, inputRef.current);
	}

	function getClassName() {
		if (getFocusedInput().includes('Date')) {
			return theme['date-popper'];
		}
		return theme['time-popper'];
	}
	return (
		<DateRange.Manager
			startDate={props.startDate}
			endDate={props.endDate}
			dateFormat={props.dateFormat}
			onChange={onChange}
		>
			<DateRangeContext.Consumer>
				{({ inputManagement, startDate, endDate, startTime, endTime }) => {
					const { onStartChange, onEndChange, onTimeChange } = inputManagement;
					return (
						<FocusManager
							className={classnames(theme['date-picker'], 'date-picker')}
							divRef={containerRef}
							onClick={handlers.onClick}
							onFocusIn={handlers.onFocus}
							onFocusOut={handlers.onBlur}
							onKeyDown={event => {
								handlers.onKeyDown(event, inputRef.current);
							}}
						>
							{[
								<DateRange.Input
									{...inputProps}
									id={`${props.id}-start-input`}
									date={startDate}
									time={startTime}
									onChange={onStartChange}
									onTimeChange={(...args) => onTimeChange(...args, 'startTime', 'START_TIME_INPUT')}
									onFocus={r => setInputRef(r)}
									label={props.t('TC_DATE_PICKER_RANGE_FROM', { defaultValue: 'From' })}
									ref={startDateInputRef}
									timeInputRef={startTimeInputRef}
								/>,
								<span className={theme.arrow}>
									<Icon name="talend-arrow-right" className={theme.icon} />
								</span>,
								<DateRange.Input
									{...inputProps}
									id={`${props.id}-end-input`}
									date={endDate}
									time={endTime}
									onChange={onEndChange}
									onTimeChange={(...args) => onTimeChange(...args, 'endTime', 'END_TIME_INPUT')}
									onFocus={r => setInputRef(r)}
									label={props.t('TC_DATE_PICKER__RANGE_TO', { defaultValue: 'To' })}
									ref={endDateInputRef}
									timeInputRef={endTimeInputRef}
								/>,
								handlers.showPicker && inputRef && (
									<Popper
										key="popper"
										modifiers={{
											hide: {
												enabled: false,
											},
											preventOverflow: {
												enabled: false,
											},
										}}
										placement={handlers.getPopperPlacement(inputRef.current)}
										positionFixed
										referenceElement={inputRef.current}
									>
										{({ ref, style }) => (
											<div id={popoverId} className={getClassName()} style={style} ref={ref}>
												<DateRange.Picker {...props} focusedInput={getFocusedInput()} />
											</div>
										)}
									</Popper>
								),
							].filter(Boolean)}
						</FocusManager>
					);
				}}
			</DateRangeContext.Consumer>
		</DateRange.Manager>
	);
}
InputDateRangePicker.displayName = 'InputDateRangePicker';

InputDateRangePicker.defaultProps = {
	dateFormat: 'YYYY-MM-DD',
	t: getDefaultT(),
};

InputDateRangePicker.propTypes = {
	id: PropTypes.string.isRequired,
	dateFormat: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	startDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
	endDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
	t: PropTypes.func.isRequired,
};
