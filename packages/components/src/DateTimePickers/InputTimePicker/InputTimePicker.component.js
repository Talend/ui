import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import uuid from 'uuid';
import { Popper } from 'react-popper';

import FocusManager from '../../FocusManager';
import Time from '../Time';
import { TimeContext } from '../Time/Context';
import TimePicker from '../pickers/TimePicker';

import theme from './InputTimePicker.scss';
import useInputPickerHandlers from '../hooks/useInputPickerHandlers';


const PROPS_TO_OMIT_FOR_INPUT = [
	'id',
	'required',
	'selectedTime',
	'useSeconds',
	'onBlur',
	'onChange',
];

function InputTimePicker(props) {
	const popoverId = `time-picker-${props.id || uuid.v4()}`;

	const inputRef = useRef(null);
	const containerRef = useRef(null);

	const handlers = useInputPickerHandlers({
		handleBlur: props.onBlur,
	});

	const { time, pickerManagement } = useContext(TimeContext);

	const inputProps = omit(props, PROPS_TO_OMIT_FOR_INPUT);
	const timePicker = [
		<Time.Input
			{...inputProps}
			id={`${props.id}-input`}
			key="input"
			inputRef={inputRef}
			part="time"
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
							<TimePicker
								textInput={time.textInput}
								useSeconds={props.useSeconds}
								onChange={(...args) => {
									pickerManagement.onChange(...args);
									handlers.onChange(...args, inputRef.current);
								}}
							/>
						</div>
					)}
				</Popper>
		),
	].filter(Boolean);
	return (
		<FocusManager
			divRef={containerRef}
			onFocusIn={handlers.onFocus}
			onFocusOut={handlers.onBlur}
			onKeyDown={event => {
				handlers.onKeyDown(event, inputRef.current);
			}}
		>
			{timePicker}
		</FocusManager>
	);
}

InputTimePicker.displayName = 'InputTimePicker';

InputTimePicker.propTypes = {
	id: PropTypes.string.isRequired,
	useSeconds: PropTypes.bool,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
};

InputTimePicker.defaultProps = {
	useSeconds: false,
};

export default function ContexualInputTimePicker(props) {
	return (
		<Time.Manager
			selectedTime={props.selectedTime}
			useSeconds={props.useSeconds}
			onChange={props.onChange}
			timeOnly
		>
			<InputTimePicker {...props} />
		</Time.Manager>
	);
}

ContexualInputTimePicker.displayName = 'ContexualInputTimePicker';
ContexualInputTimePicker.propTypes = {
	...InputTimePicker.propTypes,
	selectedTime: PropTypes.string,
};
ContexualInputTimePicker.defaultProps = {
	useSeconds: false,
};
