import React, { useContext } from 'react';

import { DateRangeContext } from '../Context';
import { START_DATE, END_DATE } from '../constants';
import CalendarPicker from '../../pickers/CalendarPicker';

export default function Picker(props) {
	const { startDate, endDate, pickerManagement, inputManagement } = useContext(DateRangeContext);
	const { focusedInput } = inputManagement;
	return [
		focusedInput === START_DATE && <CalendarPicker
			manageFocus
			selectedDate={startDate.value}
			endDate={endDate.value}
			onSubmit={(...args) => pickerManagement.onSubmit(...args, START_DATE)}
			from
			{...props}
		/>,
		focusedInput === END_DATE && <CalendarPicker
			manageFocus
			selectedDate={endDate.value}
			startDate={startDate.value}
			onSubmit={(...args) => pickerManagement.onSubmit(...args, END_DATE)}
			to
			{...props}
		/>,
	].filter(Boolean);
}
Picker.displayName = 'DateRange.Picker';
