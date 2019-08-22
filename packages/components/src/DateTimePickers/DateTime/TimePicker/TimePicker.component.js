import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { DateTimeContext } from '../Context';
import TimePicker from '../../pickers/TimePicker';

export default function Picker(props) {
	const { datetime, pickerManagement, timePickerManagement } = useContext(DateTimeContext);
	return (
		<TimePicker
			manageFocus
			selection={{
				time: datetime.time,
			}}
			textInput={datetime.timeTextInput}
			{...pickerManagement}
			{...timePickerManagement}
			{...props}
			onSubmit={(event, payload) => {
				if (props.onSubmit) {
					props.onSubmit(event, payload);
				}
				timePickerManagement.onSubmit(event, payload);
			}}
		/>
	);
}
Picker.propTypes = {
	onSubmit: PropTypes.func,
};

Picker.displayName = 'DateTime.TimePicker';
