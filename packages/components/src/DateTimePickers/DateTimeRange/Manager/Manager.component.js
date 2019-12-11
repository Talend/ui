import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DateTimeRangeContext } from '../Context';

function DateTimeRangeManager(props) {
	const initialState = {
		startDateTime: props.startDateTime,
		endDateTime: props.endDateTime,
	};
	const [state, setState] = useState(initialState);
	function onStartChange(event, payload) {
		const nextState = { ...state, startDateTime: payload.datetime };
		setState(nextState);
		props.onChange(nextState);
	}
	function onEndChange(event, payload) {
		const nextState = { ...state, endDateTime: payload.datetime };
		setState(nextState);
		props.onChange(nextState);
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
