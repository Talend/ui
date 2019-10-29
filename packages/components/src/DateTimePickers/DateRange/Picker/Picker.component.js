import React, { useContext } from 'react';

import { DateRangeContext } from '../Context';
import CalendarPicker from '../../pickers/CalendarPicker';

export default function Picker(props) {
	const { startDate, endDate, pickerManagement, inputManagement } = useContext(DateRangeContext);
	const { focusedInput } = inputManagement;
	return (
		<CalendarPicker
			manageFocus
			startDate={startDate.value}
			endDate={endDate.value}
			from={focusedInput === 'startDate'}
			to={focusedInput === 'endDate'}
			{...pickerManagement}
			{...props}
		/>
	);
}
Picker.displayName = 'DateRange.Picker';
