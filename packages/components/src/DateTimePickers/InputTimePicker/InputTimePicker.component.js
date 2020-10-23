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

	const handlers = useInputPickerHandlers({
		handleBlur: props.onBlur,
		handleChange: props.onChange,
		handleKeyDown: () => focusOnTime(containerRef.current),
	});

	const inputProps = omit(props, PROPS_TO_OMIT_FOR_INPUT);

	return (
		<div />
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
