import React, { useState } from 'react';
import isBefore from 'date-fns/is_before';

import { DateRangeContext } from '../DateRange/Context';

function Manager(props) {
	const [state, setState] = useState({
		focusedInput: null,
		startDate: props.startDate,
		endDate: props.endDate,
	});

	// function onChange(event, payload) {
	// 	const nextState = {};
	// 	if (state.focusedInput === 'startDate') {
	// 		nextState.startDate = payload.date;
	// 		nextState.focusedInput = 'endDate';
	// 	} else if (state.focusedInput === 'endDate') {
	// 		nextState.endDate = payload.date;
	// 	}
	// 	setState(prevState => ({ ...prevState, ...nextState }));
	// 	if (props.onChange) {
	// 		props.onChange(event, { ...state, ...nextState });
	// 	}
	// }

	function onStartChange(event, payload) {
		const nextState = {};
		nextState.startDate = payload.date;
		nextState.focusedInput = 'endDate';

		setState(prevState => ({ ...prevState, ...nextState }));
		if (props.onChange) {
			props.onChange(event, { ...state, ...nextState });
		}
	}

	function onEndChange(event, payload) {
		const nextState = {};

		if (state.startDate && isBefore(payload.date, state.startDate)) {
			nextState.startDate = payload.date;
		} else {
			nextState.endDate = payload.date;
			nextState.focusedInput = null;
		}

		setState(prevState => ({ ...prevState, ...nextState }));
		if (props.onChange) {
			props.onChange(event, { ...state, ...nextState });
		}
	}
	function onFocus(event, field) {
		setState(prevState => ({ ...prevState, focusedInput: field }));
	}
	return (
		<DateRangeContext.Provider
			value={{
				startDate: state.startDate,
				endDate: state.endDate,
				focusedInput: state.focusedInput,
				onStartChange,
				onEndChange,
				onFocus,
			}}
		>
			{props.children}
		</DateRangeContext.Provider>
	);
}

export default Manager;
