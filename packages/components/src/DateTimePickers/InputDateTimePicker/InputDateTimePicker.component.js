import React from 'react';
import PropTypes from 'prop-types';

import InputDatePicker from '../InputDatePicker';
import InputTimePicker from '../InputTimePicker';

import DateTime from '../DateTime';
import { DateTimeContext } from '../DateTime/Context';

import theme from './InputDateTimePicker.scss';

function InputDateTimePicker(props) {
	if (!props.selectedDateTime) {
		// eslint-disable-next-line no-console
		console.warn(
			'Warning: "selectedDateTime" is deprecated and will be removed in the next major version. Use "value" instead please.',
		);
	}
	return (
		<DateTime.Manager
			id={props.id}
			value={props.value || props.selectedDateTime}
			useSeconds={props.useSeconds}
			useUTC={props.useUTC}
			onChange={props.onChange}
		>
			<DateTimeContext.Consumer>
				{({ date, time, onDateChange, onTimeChange }) => (
					<div className={theme['date-time-picker']}>
						<InputDatePicker
							id={`${props.id}-date-picker`}
							onBlur={props.onBlur}
							onChange={onDateChange}
							dateFormat={props.dateFormat}
							value={date}
						/>
						<InputTimePicker
							id={`${props.id}-time-picker`}
							onBlur={props.onBlur}
							onChange={onTimeChange}
							useSeconds={props.useSeconds}
							value={time}
						/>
					</div>
				)}
			</DateTimeContext.Consumer>
		</DateTime.Manager>
	);
}
InputDateTimePicker.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
	selectedDateTime: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.number,
		PropTypes.string,
	]),
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	readOnly: PropTypes.bool,
	dateFormat: PropTypes.string,
	useSeconds: PropTypes.bool,
	useUTC: PropTypes.bool,
};

InputDateTimePicker.defaultProps = {
	dateFormat: 'YYYY-MM-DD',
	useSeconds: false,
	useUTC: false,
	// default behaviour is to forbid empty values
	required: true,
};

export default InputDateTimePicker;
