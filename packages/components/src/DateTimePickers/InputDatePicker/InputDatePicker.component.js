import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import uuid from 'uuid';
import classnames from 'classnames';
import { Popper } from 'react-popper';

import FocusManager from '../../FocusManager';
import { focusOnCalendar } from '../../Gesture/withCalendarGesture';

import DatePicker from '../Date';
import TimeZone from '../TimeZone';
import useInputPickerHandlers from '../hooks/useInputPickerHandlers';

import theme from './InputDatePicker.scss';

const PROPS_TO_OMIT_FOR_INPUT = [
	't',
	'id',
	'dateFormat',
	'required',
	'value',
	'useUTC',
	'onBlur',
	'onChange',
	'timezone',
	'hideTimezone',
	'startDate',
	'endDate',
];

function onMouseDown(event) {
	event.stopPropagation();
}

export default function InputDatePicker(props) {
	const popoverId = `date-picker-${props.id || uuid.v4()}`;

	const inputRef = useRef(null);
	const containerRef = useRef(null);

	const handlers = useInputPickerHandlers({
		disabled: props.disabled,
		handleBlur: props.onBlur,
		handleChange: props.onChange,
		handleKeyDown: () => focusOnCalendar(containerRef.current),
	});

	const inputProps = omit(props, PROPS_TO_OMIT_FOR_INPUT);
	const datePicker = [
		<DatePicker.Input {...inputProps} id={`${props.id}-input`} key="input" inputRef={inputRef} />,
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
					<div
						id={popoverId}
						className={theme.popper}
						style={style}
						ref={ref}
						onMouseDown={onMouseDown}
					>
						<DatePicker.Picker {...props} />
					</div>
				)}
			</Popper>
		),
		!props.hideTimezone && props.timezone && <TimeZone key="timezone" timezone={props.timezone} />,
	].filter(Boolean);
	return (
		<DatePicker.Manager
			value={props.value}
			dateFormat={props.dateFormat}
			onChange={(...args) => handlers.onChange(...args, inputRef.current)}
			useUTC={props.useUTC}
			timezone={props.timezone}
		>
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
				{datePicker}
			</FocusManager>
		</DatePicker.Manager>
	);
}
InputDatePicker.displayName = 'InputDatePicker';

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
	value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
	timezone: PropTypes.string,
	hideTimezone: PropTypes.bool,
	useUTC: PropTypes.bool,
	disabled: PropTypes.bool,
};
