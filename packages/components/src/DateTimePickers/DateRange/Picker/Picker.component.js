import React, { useContext } from 'react';

import { DateRangeContext } from '../Context';
import { START_DATE, END_DATE } from '../constants';
import CalendarPicker from '../../pickers/CalendarPicker';

export default function Picker(props) {
	const { startDate, endDate, pickerManagement } = useContext(DateRangeContext);
	const { onStartChange, onEndChange } = pickerManagement;
	return [
		props.focusedInput === START_DATE && (
			<CalendarPicker
				manageFocus
				selectedDate={startDate.value}
				endDate={endDate.value}
				onSubmit={onStartChange}
				{...props}
			/>
		),
		props.focusedInput === END_DATE && (
			<CalendarPicker
				manageFocus
				selectedDate={endDate.value}
				startDate={startDate.value}
				onSubmit={onEndChange}
				{...props}
			/>
		),
	].filter(Boolean);
}
Picker.displayName = 'DateRange.Picker';
