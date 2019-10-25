import React, { useContext } from 'react';

import { DateRangeContext } from '../Context';
import CalendarPicker from '../../pickers/CalendarPicker';

export default function Picker(props) {
	const { startDate, endDate, pickerManagement } = useContext(DateRangeContext);
	return (
		<CalendarPicker
			manageFocus
			startDate={startDate.value}
			endDate={endDate.value}
			{...pickerManagement}
			{...props}
		/>
	);
}
Picker.displayName = 'DateRange.Picker';
