import React from 'react';
import InputDateTimePicker from '../InputDateTimePicker';

export default function InputDateTimeRangePicker(props) {
	return [
		<InputDateTimePicker
			id="my-datetime-picker"
			name="Datetime"
			onChange={props.onChange}
			value={1569340800000}
		/>,
		<InputDateTimePicker
			id="my-datetime-picker"
			name="Datetime"
			onChange={props.onChange}
			value={1569340800000}
		/>,
	];
}
