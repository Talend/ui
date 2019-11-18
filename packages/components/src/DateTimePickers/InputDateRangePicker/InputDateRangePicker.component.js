import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import uuid from 'uuid';
import classnames from 'classnames';
import { Popper } from 'react-popper';

import FocusManager from '../../FocusManager';
import { focusOnCalendar } from '../../Gesture/withCalendarGesture';

import DateRange from '../DateRange';
import { DateRangeContext } from '../DateRange/Context';
import useInputPickerHandlers from '../hooks/useInputPickerHandlers';

import theme from './InputDateRangePicker.scss';

const PROPS_TO_OMIT_FOR_INPUT = ['id', 'dateFormat', 'required', 'value', 'onBlur', 'onChange'];

export default function InputDateRangePicker(props) {
	const popoverId = `date-range-picker-${props.id || uuid.v4()}`;

	const startDateInputRef = useRef(null);
	const endDateInputRef = useRef(null);
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
		return null;
	}

	function onChange(event, payload) {
		if (payload.origin === 'START_PICKER' && endDateInputRef) {
			endDateInputRef.current.focus();
		}
		handlers.onChange(event, payload);
	}
	return (
		<DateRange.Manager
			startDate={props.startDate}
			endDate={props.endDate}
			dateFormat={props.dateFormat}
			onChange={onChange}
		>
			<DateRangeContext.Consumer>
				{({ inputManagement, startDate, endDate }) => {
					const { onStartChange, onEndChange } = inputManagement;
					return (
						<FocusManager
							className={classnames(theme['date-picker'], 'date-picker')}
							divRef={containerRef}
							onClick={handlers.onClick}
							onFocusIn={handlers.onFocus}
							onFocusOut={event => {
								inputManagement.onFocus(event, null);
								handlers.onBlur(event);
							}}
							onKeyDown={event => {
								handlers.onKeyDown(event, inputRef.current);
							}}
						>
							{[
								<DateRange.Input
									{...inputProps}
									id={`${props.id || uuid.v4()}-start-input`}
									date={startDate}
									onChange={onStartChange}
									onFocus={() => {
										setInputRef(startDateInputRef);
									}}
									ref={startDateInputRef}
								/>,
								<DateRange.Input
									{...inputProps}
									id={`${props.id || uuid.v4()}-end-input`}
									date={endDate}
									onChange={onEndChange}
									onFocus={() => setInputRef(endDateInputRef)}
									ref={endDateInputRef}
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
											<div id={popoverId} className={theme.popper} style={style} ref={ref}>
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
	required: true,
	useUTC: false,
};

InputDateRangePicker.propTypes = {
	id: PropTypes.string.isRequired,
	dateFormat: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	startDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
	endDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
};
