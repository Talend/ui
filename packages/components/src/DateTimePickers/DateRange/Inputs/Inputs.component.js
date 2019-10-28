import React, { useContext, useEffect, useRef } from 'react';
import DebounceInput from 'react-debounce-input';

import { DateRangeContext } from '../Context';

function Inputs(props) {
	const { startDate, endDate, inputManagement } = useContext(DateRangeContext);
	let startDateInputRef = useRef(null);
	let endDateInputRef = useRef(null);

	useEffect(() => {
		const { focusedInput } = inputManagement;

		if (startDateInputRef && focusedInput === 'startDate') {
			startDateInputRef.focus();
		}
		if (endDateInputRef && focusedInput === 'endDate') {
			endDateInputRef.focus();
		}
	});

	return [
		<DebounceInput
			autoComplete="off"
			className="form-control"
			debounceTimeout={300}
			type="text"
			value={startDate.textInput}
			style={{ width: 150 }}
			{...inputManagement}
			onFocus={event => inputManagement.onFocus(event, 'startDate')}
			{...props}
			inputRef={ref => {
				props.startInputRef(ref);
				startDateInputRef = ref;
			}}
		/>,
		<DebounceInput
			autoComplete="off"
			className="form-control"
			debounceTimeout={300}
			type="text"
			value={endDate.textInput}
			style={{ width: 150 }}
			{...inputManagement}
			onFocus={event => inputManagement.onFocus(event, 'endDate')}
			{...props}
			inputRef={ref => {
				props.endInputRef(ref);
				endDateInputRef = ref;
			}}
		/>,
	];
}

Inputs.displayName = 'DateRange.Inputs';

export default Inputs;
