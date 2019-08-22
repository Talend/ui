import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { DateTimeContext } from '../Context';
import DateTimePicker from '../../pickers/DateTimePicker';
import TimePicker from '../../pickers/TimePicker';

export default function Picker(props) {
	const {
		datetime,
		pickerManagement,
		datePickerManagement,
		timePickerManagement,
	} = useContext(DateTimeContext);
	const PickerComponent = props.part === 'date' ? DateTimePicker : TimePicker;
	const partPickerManagement = props.part === 'date' ? datePickerManagement : timePickerManagement;
	const onSubmit = (event, payload) => {
		if (props.onSubmit) {
			props.onSubmit(event, payload);
		}
		if (props.part === 'date') {
			datePickerManagement.onSubmit(event, payload);
		} else {
			timePickerManagement.onSubmit(event, payload);
		}
	};
	return (
		<PickerComponent
			manageFocus
			selection={{
				date: datetime.date,
				time: datetime.time,
			}}
			{...pickerManagement}
			{...partPickerManagement}
			{...props}
			onSubmit={onSubmit}
		/>
	);
}

Picker.propTypes = {
	part: PropTypes.oneOf(['date', 'time']),
	onSubmit: PropTypes.func.isRequired,
};

Picker.displayName = 'DateTime.Picker';
