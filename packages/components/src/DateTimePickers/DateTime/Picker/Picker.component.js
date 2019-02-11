import React from 'react';

import { DateTimeContext } from '../Context';
import DateTimePicker from '../../pickers/DateTimePicker';

export default function ContextualPicker(props) {
	return (
		<DateTimeContext.Consumer>
			{({ datetime, pickerManagement }) => (
				<DateTimePicker
					manageFocus
					selection={{
						date: datetime.date,
						time: datetime.time,
					}}
					{...pickerManagement}
					{...props}
				/>
			)}
		</DateTimeContext.Consumer>
	);
}
