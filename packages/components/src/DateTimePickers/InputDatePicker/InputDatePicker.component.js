import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import uuid from 'uuid';
import classnames from 'classnames';

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
		handleBlur: props.onBlur,
		handleChange: props.onChange,
		handleKeyDown: () => focusOnCalendar(containerRef.current),
	});

	const inputProps = omit(props, PROPS_TO_OMIT_FOR_INPUT);

	return (
		<div />
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
