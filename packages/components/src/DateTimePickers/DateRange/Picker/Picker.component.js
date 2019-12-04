import React, { useContext } from 'react';
import omit from 'lodash/omit';

import { DateRangeContext } from '../Context';
import { START_DATE, END_DATE, START_TIME, END_TIME } from '../constants';
import CalendarPicker from '../../pickers/CalendarPicker';
import TimePicker from '../../pickers/TimePicker';

export default function Picker(props) {
	const { startDate, endDate, pickerManagement, startTime, endTime } = useContext(DateRangeContext);
	const { onStartChange, onEndChange, onTimeChange } = pickerManagement;
	return [
		props.focusedInput === START_DATE && (
			<CalendarPicker
				manageFocus
				selectedDate={startDate.value}
				endDate={endDate.value}
				onSubmit={onStartChange}
				{...omit(props, 'startDate')}
			/>
		),
		props.focusedInput === END_DATE && (
			<CalendarPicker
				manageFocus
				selectedDate={endDate.value}
				startDate={startDate.value}
				onSubmit={onEndChange}
				{...omit(props, 'endDate')}
			/>
		),
		props.focusedInput === START_TIME && (
			<TimePicker
				textInput={startTime.textInput}
				onChange={(...args) => onTimeChange(...args, START_TIME, 'START_PICKER_INPUT')}
			/>
		),
		props.focusedInput === END_TIME && (
			<TimePicker
				textInput={endTime.textInput}
				onChange={(...args) => onTimeChange(...args, END_TIME, 'END_PICKER_INPUT')}
			/>
		),
	].filter(Boolean);
}
Picker.displayName = 'DateRange.Picker';
