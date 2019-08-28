import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import uuid from 'uuid';
import { Popper } from 'react-popper';

import FocusManager from '../../FocusManager';
import DateTime from '../DateTime';
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

export default function InputTimePicker(props) {
	const popoverId = `time-picker-${props.id || uuid.v4()}`;
	const inputRef = useRef(null);
	const containerRef = useRef(null);
	const handlers = useInputPickerHandlers({
		handleBlur: props.onBlur,
		handleChange: props.onChange,
	});
	const inputProps = omit(props, PROPS_TO_OMIT_FOR_INPUT);
	const timePicker = [
		<DateTime.Input
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
								useSeconds={props.useSeconds}
								onChange={(event, payload) =>
									handlers.onChange(event, { ...payload, origin: 'PICKER' }, inputRef.current)
								}
							/>
						</div>
					)}
				</Popper>
		),
	].filter(Boolean);
	return (
		<DateTime.Manager
			selectedTime={props.selectedTime}
			useSeconds={props.useSeconds}
			onChange={(...args) => handlers.onChange(...args, inputRef.current)}
		>
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
		</DateTime.Manager>
	);
}

InputTimePicker.displayName = 'InputTimePicker';

InputTimePicker.propTypes = {
	id: PropTypes.string.isRequired,
	selectedTime: PropTypes.string,
	useSeconds: PropTypes.bool,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
};
InputTimePicker.defaultProps = {
	useSeconds: false,
};
