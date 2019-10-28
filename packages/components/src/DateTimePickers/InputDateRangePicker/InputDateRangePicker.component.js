import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import uuid from 'uuid';
import classnames from 'classnames';
import { Popper } from 'react-popper';

import FocusManager from '../../FocusManager';
import { focusOnCalendar } from '../../Gesture/withCalendarGesture';

import DateRange from '../DateRange';
import { DateRangeContext } from '../DateRange/Context';
import { START_DATE } from '../DateRange/constants';
import useInputPickerHandlers from '../hooks/useInputPickerHandlers';

import theme from './InputDateRangePicker.scss';

const PROPS_TO_OMIT_FOR_INPUT = [
	'id',
	'dateFormat',
	'required',
	'value',
	'useUTC',
	'onBlur',
	'onChange',
	'timezone',
	'hideTimezone',
];

export default function InputDatePicker(props) {
	const popoverId = `date-range-picker-${props.id || uuid.v4()}`;

	const startDateInputRef = useRef(null);
	const endDateInputRef = useRef(null);
	const containerRef = useRef(null);

	const handlers = useInputPickerHandlers({
		handleBlur: props.onBlur,
		handleChange: props.onChange,
		handleKeyDown: () => focusOnCalendar(containerRef.current),
	});

	const inputProps = omit(props, PROPS_TO_OMIT_FOR_INPUT);

	return (
		<DateRange.Manager
			startDate={props.startDate}
			endDate={props.endDate}
			dateFormat={props.dateFormat}
			onChange={handlers.onChange}
		>
			<DateRangeContext.Consumer>
				{({ inputManagement }) => {
					const { focusedInput } = inputManagement;
					const inputRef = focusedInput === START_DATE ? startDateInputRef : endDateInputRef;
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
								<DateRange.Inputs
									{...inputProps}
									id={`${props.id}-input`}
									key="input"
									startInputRef={ref => {
										startDateInputRef.current = ref;
									}}
									endInputRef={ref => {
										endDateInputRef.current = ref;
									}}
								/>,
								handlers.showPicker && (
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
												<DateRange.Picker {...props} />
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
InputDatePicker.displayName = 'InputDateRangePicker';

InputDatePicker.defaultProps = {
	dateFormat: 'YYYY-MM-DD',
	required: true,
	useUTC: false,
};

InputDatePicker.propTypes = {
	id: PropTypes.string.isRequired,
	dateFormat: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	startDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
	endDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
};
