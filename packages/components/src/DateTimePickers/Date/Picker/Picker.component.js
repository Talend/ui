import React, { useContext } from 'react';

import { DateContext } from '../Context';
import DateTimePicker from '../../pickers/DateTimePicker';

export default function Picker(props) {
	const { datetime, pickerManagement } = useContext(DateContext);
	return (
		<DateTimePicker
			manageFocus
			selection={{
				date: datetime.date,
			}}
			{...pickerManagement}
			{...props}
		/>
	);
}
Picker.displayName = 'Date.Picker';
