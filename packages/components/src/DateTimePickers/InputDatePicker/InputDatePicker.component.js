import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import uuid from 'uuid';
import classnames from 'classnames';
import { Popper } from 'react-popper';

import FocusManager from '../../FocusManager';
import { focusOnCalendar } from '../../Gesture/withCalendarGesture';

import Date from '../Date';
import TimeZone from '../TimeZone';
import useInputPickerHandlers from '../hooks/useInputPickerHandlers';

import theme from './InputDatePicker.scss';

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
	const popoverId = `date-picker-${props.id || uuid.v4()}`;

	const inputRef = useRef(null);
	const containerRef = useRef(null);

	const handlers = useInputPickerHandlers({
		handleBlur: props.onBlur,
		handleChange: props.onChange,
		handleKeyDown: () => focusOnCalendar(containerRef.current),
	});

	const inputProps = omit(props, PROPS_TO_OMIT_FOR_INPUT);
	const timePicker = [
		<Date.Input {...inputProps} id={`${props.id}-input`} key="input" inputRef={inputRef} />,
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
						<Date.Picker {...props} />
					</div>
				)}
			</Popper>
		),
		!props.hideTimezone && props.timezone && <TimeZone timezone={props.timezone} />,
	].filter(Boolean);
	return (
		<Date.Manager
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
				{timePicker}
			</FocusManager>
		</Date.Manager>
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
};
