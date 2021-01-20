import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import omit from 'lodash/omit';
import uuid from 'uuid';

import FocusManager from '../../FocusManager';
import Time from '../Time';
import TimeZone from '../TimeZone';

import theme from './InputTimePicker.scss';
import useInputPickerHandlers from '../hooks/useInputPickerHandlers';
import focusOnTime from '../gesture/timePickerGesture';
import { usePopper } from '../../usePopper';

const PROPS_TO_OMIT_FOR_INPUT = [
	'id',
	'required',
	'value',
	'useSeconds',
	'onBlur',
	'onChange',
	'timezone',
];

export default function InputTimePicker(props) {
	const popoverId = `time-picker-${props.id || uuid.v4()}`;

	const inputRef = useRef(null);
	const containerRef = useRef(null);
	const ref = useRef(null);

	const handlers = useInputPickerHandlers({
		handleBlur: props.onBlur,
		handleChange: props.onChange,
		handleKeyDown: () => focusOnTime(containerRef.current),
	});
	usePopper(inputRef, ref, {
		modifiers: [
			{ name: 'hide', enabled: false },
			{ name: 'preventOverflow', enabled: false },
		],
		placement: inputRef ? handlers.getPopperPlacement(inputRef.current) : 'bottom-start',
		strategy: 'fixed',
	});
	const inputProps = omit(props, PROPS_TO_OMIT_FOR_INPUT);
	const timePicker = [
		<Time.Input {...inputProps} id={`${props.id}-input`} key="input" inputRef={inputRef} />,
		handlers.showPicker && (
			<div id={popoverId} className={theme.popper} ref={ref}>
				<Time.Picker {...props} />
			</div>
		),
		props.timezone && <TimeZone key="timezone" timezone={props.timezone} />,
	].filter(Boolean);
	return (
		<Time.Manager
			value={props.value}
			useSeconds={props.useSeconds}
			timezone={props.timezone}
			onChange={(...args) => handlers.onChange(...args, inputRef.current)}
		>
			<FocusManager
				className={classnames(theme['time-picker'], 'time-picker')}
				divRef={containerRef}
				onClick={handlers.onClick}
				onFocusIn={handlers.onFocus}
				onFocusOut={handlers.onBlur}
				onKeyDown={event => {
					handlers.onKeyDown(event, inputRef.current, containerRef.current);
				}}
			>
				{timePicker}
			</FocusManager>
		</Time.Manager>
	);
}

InputTimePicker.displayName = 'InputTimePicker';

InputTimePicker.propTypes = {
	id: PropTypes.string.isRequired,
	useSeconds: PropTypes.bool,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	timezone: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

InputTimePicker.defaultProps = {
	useSeconds: false,
};
