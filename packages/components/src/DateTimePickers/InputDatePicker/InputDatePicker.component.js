import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import uuid from 'uuid';
import { Popper } from 'react-popper';

import FocusManager from '../../FocusManager';
import Date from '../Date';

import theme from './InputDatePicker.scss';
import useInputPickerHandlers from '../hooks/useInputPickerHandlers';
import { focusOnCalendar } from '../../Gesture/withCalendarGesture';

const PROPS_TO_OMIT_FOR_INPUT = ['id', 'required', 'value', 'useSeconds', 'onBlur', 'onChange'];

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
	].filter(Boolean);
	return (
		<Date.Manager
			selectedDate={props.selectedDate}
			dateFormat={props.dateFormat}
			onChange={(...args) => handlers.onChange(...args, inputRef.current)}
		>
			<FocusManager
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

InputDatePicker.propTypes = {
	id: PropTypes.string.isRequired,
	dateFormat: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	selectedDate: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.number,
		PropTypes.string,
	]),
};
