import React, { useState } from 'react';
import PropTypes from 'prop-types';
import isBefore from 'date-fns/is_before';

import { DateTimeRangeContext } from '../Context';
import getErrorMessage from '../../shared/error-messages';

export function DateTimeRangePickerException(code, message) {
	this.message = getErrorMessage(message);
	this.code = code;
}

function DateTimeRangeManager(props) {
	const initialState = {
		startDateTime: props.startDateTime,
		endDateTime: props.endDateTime,
	};
	const [state, setState] = useState(initialState);

	function onChange(event, nextState, origin) {
		const errors = [...(nextState.errors || [])];
		const { startDateTime, endDateTime } = nextState;

		if (startDateTime && endDateTime) {
			if (!isBefore(startDateTime, endDateTime)) {
				errors.push(
					new DateTimeRangePickerException(
						'INVALID_RANGE_START_AFTER_END',
						'INVALID_RANGE_START_AFTER_END',
					),
				);
			}
		}
		const payload = {
			nextState,
			origin,
			errors,
			errorMessage: errors[0] ? errors[0].message : null,
		};
		props.onChange(event, payload);
	}

	function onStartChange(event, payload) {
		const nextState = { ...state, startDateTime: payload.datetime, errors: payload.errors };
		setState(nextState);
		onChange(event, nextState, 'RANGE_START');
	}

	function onEndChange(event, payload) {
		const nextState = { ...state, endDateTime: payload.datetime, errors: payload.errors };
		setState(nextState);
		onChange(event, nextState, 'RANGE_END');
	}

	return (
		<DateTimeRangeContext.Provider
			value={{
				startDateTime: state.startDateTime,
				endDateTime: state.endDateTime,
				onStartChange,
				onEndChange,
			}}
		>
			{props.children}
		</DateTimeRangeContext.Provider>
	);
}
DateTimeRangeManager.displayName = 'DateTimeRange.Manager';

DateTimeRangeManager.propTypes = {
	children: PropTypes.element,
	startDateTime: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.number,
		PropTypes.string,
	]),
	endDateTime: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.number,
		PropTypes.string,
	]),
	// dateFormat: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default DateTimeRangeManager;
