import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { DateTimeContext } from '../Context';
import DateTimePicker from '../../pickers/DateTimePicker';

export default function Picker(props) {
	const { datetime, pickerManagement } = useContext(DateTimeContext);
	const onSubmit = (event, payload) => pickerManagement.onSubmit(event, payload, props.onChange);
	return (
		<DateTimePicker
			manageFocus
			selection={{
				date: datetime.date,
				time: datetime.time,
			}}
			{...pickerManagement}
			{...props}
			onSubmit={onSubmit}
		/>
	);
}

Picker.propTypes = {
	onChange: PropTypes.func,
};

Picker.displayName = 'DateTime.Picker';
