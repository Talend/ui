import React, { useState, useRef, useEffect } from 'react';

import { DateRangeContext } from '../DateRange/Context';

function Manager(props) {
	const [state, setState] = useState({
		focusedInput: null,
		startDate: props.startDate,
		endDate: props.endDate,
	});
	let startRef = useRef(null);
	let endRef = useRef(null);

	useEffect(() => {
		if (state.focusedInput === 'startDate' && startRef) {
			startRef.focus();
		} else if (state.focusedInput === 'endDate' && endRef) {
			endRef.focus();
		}
	});
	function onChange(event, payload) {
		const nextState = {};
		if (state.focusedInput === 'startDate') {
			nextState.startDate = payload.date;
			nextState.focusedInput = 'endDate';
		} else if (state.focusedInput === 'endDate') {
			nextState.endDate = payload.date;
		}
		setState({ ...state, ...nextState });
		if (props.onChange) {
			props.onChange(event, { ...state, ...nextState });
		}
	}
	function onFocus(event, field) {
		setState({ ...state, focusedInput: field });
	}
	return (
		<DateRangeContext.Provider
			value={{
				startDate: state.startDate,
				endDate: state.endDate,
				focusedInput: state.focusedInput,
				setStartRef: ref => (startRef = ref),
				setEndRef: ref => (endRef = ref),
				onChange,
				onFocus,
			}}
		>
			{props.children}
		</DateRangeContext.Provider>
	);
}

export default Manager;
