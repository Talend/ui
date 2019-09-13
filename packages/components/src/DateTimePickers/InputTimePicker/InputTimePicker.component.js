import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import uuid from 'uuid';
import { Popper } from 'react-popper';

import FocusManager from '../../FocusManager';
import Time from '../Time';

import theme from './InputTimePicker.scss';
import useInputPickerHandlers from '../hooks/useInputPickerHandlers';
import focusOnTime from '../gesture/timePickerGesture';

const PROPS_TO_OMIT_FOR_INPUT = ['id', 'required', 'value', 'useSeconds', 'onBlur', 'onChange'];

export default function InputTimePicker(props) {
	const popoverId = `time-picker-${props.id || uuid.v4()}`;

	const inputRef = useRef(null);
	const containerRef = useRef(null);

	const handlers = useInputPickerHandlers({
		handleBlur: props.onBlur,
		handleChange: props.onChange,
		handleKeyDown: () => focusOnTime(containerRef.current),
	});

	const inputProps = omit(props, PROPS_TO_OMIT_FOR_INPUT);
	const timePicker = [
		<Time.Input {...inputProps} id={`${props.id}-input`} key="input" inputRef={inputRef} />,
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
						<Time.Picker {...props} />
					</div>
				)}
			</Popper>
		),
	].filter(Boolean);
	return (
		<Time.Manager
			value={props.value}
			useSeconds={props.useSeconds}
			onChange={(...args) => handlers.onChange(...args, inputRef.current)}
		>
			<FocusManager
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
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

InputTimePicker.defaultProps = {
	useSeconds: false,
};
