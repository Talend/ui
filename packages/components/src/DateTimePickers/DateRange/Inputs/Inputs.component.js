import React, { useContext, useEffect, useRef } from 'react';
import DebounceInput from 'react-debounce-input';

import { DateRangeContext } from '../Context';
import { START_DATE, END_DATE } from '../constants';

import Icon from '../../../Icon';

import theme from './Inputs.scss';

function Inputs(props) {
	const { startDate, endDate, inputManagement } = useContext(DateRangeContext);
	let startDateInputRef = useRef(null);
	let endDateInputRef = useRef(null);

	useEffect(() => {
		const { focusedInput } = inputManagement;

		if (startDateInputRef && focusedInput === START_DATE) {
			startDateInputRef.focus();
		}
		if (endDateInputRef && focusedInput === END_DATE) {
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
			onChange={inputManagement.onChange}
			onFocus={event => inputManagement.onFocus(event, START_DATE)}
			{...props}
			inputRef={ref => {
				props.startInputRef(ref);
				startDateInputRef = ref;
			}}
		/>,
		<span className={theme.arrow}>
			<Icon name="talend-arrow-right" className={theme.icon} />
		</span>,
		<DebounceInput
			autoComplete="off"
			className="form-control"
			debounceTimeout={300}
			type="text"
			value={endDate.textInput}
			style={{ width: 150 }}
			onChange={inputManagement.onChange}
			onFocus={event => inputManagement.onFocus(event, END_DATE)}
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
