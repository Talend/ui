import React, { useContext } from 'react';

import { DateTimeContext } from '../Context';
import TimePicker from '../../pickers/TimePicker';

export default function Picker(props) {
	const { datetime, pickerManagement } = useContext(DateTimeContext);
	return (
		<TimePicker
			manageFocus
			selection={{
				time: datetime.time,
			}}
			{...pickerManagement}
			{...props}
		/>
	);
}
Picker.displayName = 'DateTime.TimePicker';
