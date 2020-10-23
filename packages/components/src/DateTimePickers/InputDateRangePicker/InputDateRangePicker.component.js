import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import classnames from 'classnames';

import FocusManager from '../../FocusManager';
import { focusOnCalendar } from '../../Gesture/withCalendarGesture';
import Icon from '../../Icon';

import DateRange from '../DateRange';
import { DateRangeContext } from '../DateRange/Context';
import useInputPickerHandlers from '../hooks/useInputPickerHandlers';

import getDefaultT from '../../translate';

import theme from './InputDateRangePicker.scss';

const PROPS_TO_OMIT_FOR_INPUT = ['id', 'dateFormat', 'onBlur', 'onChange', 't'];

export default function InputDateRangePicker(props) {
	const popoverId = `date-range-picker-${props.id}`;

	const startDateInputRef = useRef(null);
	const endDateInputRef = useRef(null);
	const containerRef = useRef(null);
	const [inputRef, setInputRef] = useState(null);

	const handlers = useInputPickerHandlers({
		handleBlur: props.onBlur,
		handleChange: props.onChange,
		handleKeyDown: () => focusOnCalendar(containerRef.current),
	});

	const inputProps = omit(props, PROPS_TO_OMIT_FOR_INPUT);

	function getFocusedInput() {
		if (inputRef === startDateInputRef) {
			return 'startDate';
		}
		if (inputRef === endDateInputRef) {
			return 'endDate';
		}
		return null;
	}

	function onChange(event, payload) {
		if (payload.origin === 'START_PICKER' && endDateInputRef) {
			endDateInputRef.current.focus();
		}
		handlers.onChange(event, payload, inputRef.current);
	}
	return (
		<div />
	);
}
InputDateRangePicker.displayName = 'InputDateRangePicker';

InputDateRangePicker.defaultProps = {
	dateFormat: 'YYYY-MM-DD',
	t: getDefaultT(),
};

InputDateRangePicker.propTypes = {
	id: PropTypes.string.isRequired,
	dateFormat: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	startDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
	endDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
	t: PropTypes.func,
};
