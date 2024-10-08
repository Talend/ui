import { useEffect, useState } from 'react';

import { isBefore } from 'date-fns/isBefore';
import { isEqual } from 'date-fns/isEqual';
import PropTypes from 'prop-types';

import getErrorMessage from '../../shared/error-messages';
import { DateTimeRangeContext } from '../Context';

export function DateTimeRangePickerException(code, message) {
	this.message = getErrorMessage(message);
	this.code = code;
}

function DateTimeRangeManager(props) {
	const { onChange, startDateTime, endDateTime } = props;
	const initialState = {
		startDateTime,
		endDateTime,
	};
	const [state, setState] = useState(initialState);
	const [startDateErrors, setStartDateErrors] = useState([]);
	const [endDateErrors, setEndDateErrors] = useState([]);

	useEffect(() => {
		if (!isEqual(state.startDateTime, startDateTime) || !isEqual(state.endDateTime, endDateTime)) {
			setState({ startDateTime, endDateTime });
		}
	}, [startDateTime, endDateTime]);

	function onRangeChange(event, nextState, origin) {
		const errors = [...(nextState.errors || [])];

		if (
			nextState.startDateTime &&
			nextState.endDateTime &&
			!isNaN(nextState.startDateTime) &&
			!isNaN(nextState.endDateTime)
		) {
			if (!isBefore(nextState.startDateTime, nextState.endDateTime)) {
				errors.push(
					new DateTimeRangePickerException(
						'INVALID_RANGE_START_AFTER_END',
						'INVALID_RANGE_START_AFTER_END',
					),
				);
			}
		}
		const payload = {
			...nextState,
			origin,
			errors,
			errorMessage: errors[0] ? errors[0].message : null,
		};
		onChange(event, payload);
	}

	function onStartChange(event, { datetime, errors }) {
		setStartDateErrors(errors);
		const allErrors = [...(errors || []), ...(endDateErrors || [])];
		const nextState = { ...state, startDateTime: datetime, errors: allErrors };
		setState(nextState);
		onRangeChange(event, nextState, 'RANGE_START');
	}

	function onEndChange(event, { datetime, errors }) {
		setEndDateErrors(errors);
		const allErrors = [...(startDateErrors || []), ...(errors || [])];
		const nextState = { ...state, endDateTime: datetime, errors: allErrors };
		setState(nextState);
		onRangeChange(event, nextState, 'RANGE_END');
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
	onChange: PropTypes.func.isRequired,
};

export default DateTimeRangeManager;
