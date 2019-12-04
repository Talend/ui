import React, { useContext } from 'react';

import { DateRangeContext } from '../Context';
import { START_DATE, END_DATE, START_TIME, END_TIME } from '../constants';
import CalendarPicker from '../../pickers/CalendarPicker';
import TimePicker from '../../pickers/TimePicker';

export default function Picker(props) {
	const { startDate, endDate, pickerManagement, startTime, endTime } = useContext(DateRangeContext);
	const { onStartChange, onEndChange, onStartTimeChange, onEndTimeChange } = pickerManagement;
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
		props.focusedInput === START_TIME && (
			<TimePicker textInput={startTime.textInput} onChange={onStartTimeChange} />
		),
		props.focusedInput === END_TIME && (
			<TimePicker textInput={endTime.textInput} onChange={onEndTimeChange} />
		),
	].filter(Boolean);
}
Picker.displayName = 'DateRange.Picker';
