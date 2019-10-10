import React, { useContext } from 'react';

import { DateContext } from '../Context';
import CalendarPicker from '../../pickers/CalendarPicker';

export default function Picker(props) {
	const { value, pickerManagement } = useContext(DateContext);
	return (
		<CalendarPicker
			manageFocus
			selectedDate={value.date}
			{...pickerManagement}
			{...props}
		/>
	);
}
Picker.displayName = 'Date.Picker';
