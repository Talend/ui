import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { DateTimeContext } from '../Context';
import DateTimePicker from '../../pickers/DateTimePicker';

export default function Picker(props) {
	const { datetime, pickerManagement, datePickerManagement } = useContext(DateTimeContext);
	return (
		<DateTimePicker
			manageFocus
			selection={{
				date: datetime.date,
			}}
			{...pickerManagement}
			{...datePickerManagement}
			{...props}
			onSubmit={(event, payload) => {
				if (props.onSubmit) {
					props.onSubmit(event, payload);
				}
				datePickerManagement.onSubmit(event, payload);
			}}
		/>
	);
}

Picker.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};

Picker.displayName = 'DateTime.Picker';
