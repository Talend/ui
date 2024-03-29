import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import omit from 'lodash/omit';
import { usePopper } from 'react-popper';
import { randomUUID } from '@talend/utils';

import FocusManager from '../../FocusManager';
import Time from '../Time';
import TimeZone from '../TimeZone';

import theme from './InputTimePicker.module.scss';
import useInputPickerHandlers from '../hooks/useInputPickerHandlers';
import focusOnTime from '../gesture/timePickerGesture';

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
	const popoverId = `time-picker-${props.id || randomUUID()}`;

	const containerRef = useRef(null);

	const [referenceElement, setReferenceElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);
	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		modifiers: [
			{ name: 'hide', enabled: false },
			{ name: 'preventOverflow', enabled: false },
		],
		strategy: 'fixed',
		placement: 'bottom-start',
	});

	const handlers = useInputPickerHandlers({
		disabled: props.disabled,
		handleBlur: props.onBlur,
		handleChange: props.onChange,
		handleKeyDown: () => focusOnTime(containerRef.current),
	});

	const inputProps = omit(props, PROPS_TO_OMIT_FOR_INPUT);
	const timePicker = [
		<Time.Input
			{...inputProps}
			id={`${props.id}-input`}
			key="input"
			inputRef={setReferenceElement}
		/>,
		handlers.showPicker && (
			<div
				key="popper"
				id={popoverId}
				className={theme.popper}
				ref={setPopperElement}
				style={styles.popper}
				{...attributes.popper}
			>
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
			onChange={(...args) => handlers.onChange(...args, referenceElement)}
		>
			<FocusManager
				className={classnames(theme['time-picker'], 'time-picker')}
				divRef={containerRef}
				onClick={handlers.onClick}
				onFocusIn={handlers.onFocus}
				onFocusOut={handlers.onBlur}
				onKeyDown={event => {
					handlers.onKeyDown(event, referenceElement, containerRef.current);
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
	disabled: PropTypes.bool,
};

InputTimePicker.defaultProps = {
	useSeconds: false,
};
