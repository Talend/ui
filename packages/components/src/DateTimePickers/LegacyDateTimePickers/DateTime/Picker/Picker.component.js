import React, { useContext } from 'react';

import { DateTimeContext } from '../Context';
import DateTimePicker from '../../pickers/DateTimePicker';

export default function Picker(props) {
	const { datetime, pickerManagement } = useContext(DateTimeContext);
	return (
		<DateTimePicker
			manageFocus
			selection={{
				date: datetime.date,
				time: datetime.time,
			}}
			{...pickerManagement}
			{...props}
		/>
	);
}
Picker.displayName = 'DateTime.Picker';
